import React, { useMemo } from 'react';

type Point = { x: number; y: number };

export interface LowPolyLayerProps {
  width: number;
  height: number;
  seed: string;
  opacity?: number;
  cellSize?: number;
  inset?: number;
  clipPathId?: string;
}

function hashStringToUint32(input: string): number {
  let hash = 2166136261;
  for (let index = 0; index < input.length; index += 1) {
    hash ^= input.charCodeAt(index);
    hash = Math.imul(hash, 16777619);
  }
  return hash >>> 0;
}

function mulberry32(seed: number) {
  return () => {
    let t = (seed += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function clamp(value: number, min: number, max: number) {
  return Math.max(min, Math.min(max, value));
}

function hsl(h: number, s: number, l: number) {
  const hh = ((h % 360) + 360) % 360;
  return `hsl(${hh} ${clamp(s, 0, 100)}% ${clamp(l, 0, 100)}%)`;
}

function pointsToString(points: Point[]) {
  return points.map((p) => `${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(' ');
}

const LowPolyLayer: React.FC<LowPolyLayerProps> = ({
  width,
  height,
  seed,
  opacity = 0.22,
  cellSize,
  inset,
  clipPathId,
}) => {
  const clipId = useMemo(
    () => clipPathId ?? `lowpoly-clip-${hashStringToUint32(seed).toString(16)}`,
    [clipPathId, seed],
  );
  const polygons = useMemo(() => {
    const minDim = Math.min(width, height);
    const size = cellSize ?? clamp(minDim / 8.5, 18, 44);
    const margin = inset ?? Math.max(10, Math.round(size * 0.55));
    const jitter = size * 0.33;

    const rand = mulberry32(hashStringToUint32(seed));
    const columns = Math.ceil((width - margin * 2) / size);
    const rows = Math.ceil((height - margin * 2) / size);

    const grid: Point[][] = Array.from({ length: rows + 1 }, (_, row) =>
      Array.from({ length: columns + 1 }, (_, col) => {
        const baseX = margin + col * size;
        const baseY = margin + row * size;
        const dx = (rand() - 0.5) * jitter;
        const dy = (rand() - 0.5) * jitter;
        return {
          x: clamp(baseX + dx, margin, width - margin),
          y: clamp(baseY + dy, margin, height - margin),
        };
      }),
    );

    const baseHue = 215;
    const baseSat = 78;

    const polys: Array<{ points: string; fill: string; opacity: number }> = [];
    for (let row = 0; row < rows; row += 1) {
      for (let col = 0; col < columns; col += 1) {
        const p00 = grid[row][col];
        const p10 = grid[row][col + 1];
        const p01 = grid[row + 1][col];
        const p11 = grid[row + 1][col + 1];

        const flip = rand() > 0.5;
        const triA = flip ? [p00, p10, p11] : [p00, p10, p01];
        const triB = flip ? [p00, p11, p01] : [p10, p11, p01];

        const shadeA = 42 + (rand() - 0.5) * 22;
        const shadeB = 42 + (rand() - 0.5) * 22;
        const hueA = baseHue + (rand() - 0.5) * 16;
        const hueB = baseHue + (rand() - 0.5) * 16;
        const opA = 0.85 + rand() * 0.15;
        const opB = 0.85 + rand() * 0.15;

        polys.push({ points: pointsToString(triA), fill: hsl(hueA, baseSat, shadeA), opacity: opA });
        polys.push({ points: pointsToString(triB), fill: hsl(hueB, baseSat, shadeB), opacity: opB });
      }
    }

    return { polys, margin };
  }, [width, height, seed, cellSize, inset]);

  return (
    <g className="vehicle-lowpoly-layer" pointerEvents="none" aria-hidden="true" opacity={opacity}>
      {!clipPathId && (
        <defs>
          <clipPath id={clipId}>
            <rect
              x={polygons.margin}
              y={polygons.margin}
              width={Math.max(0, width - polygons.margin * 2)}
              height={Math.max(0, height - polygons.margin * 2)}
              rx={Math.max(8, polygons.margin * 0.35)}
              ry={Math.max(8, polygons.margin * 0.35)}
            />
          </clipPath>
        </defs>
      )}
      <g clipPath={`url(#${clipId})`} style={{ mixBlendMode: 'multiply' }}>
        {polygons.polys.map((poly, index) => (
          <polygon
            key={`${seed}-${index}`}
            points={poly.points}
            fill={poly.fill}
            opacity={poly.opacity}
            shapeRendering="crispEdges"
          />
        ))}
      </g>
    </g>
  );
};

export default LowPolyLayer;
