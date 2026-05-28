import React from 'react';
import * as d3 from 'd3';

interface VehicleRealismLayerProps {
  width: number;
  height: number;
  profile: 'car' | 'moto' | 'truck' | 'bus' | 'van';
  view: 'lateral' | 'front' | 'rear';
}

const profileDensity: Record<VehicleRealismLayerProps['profile'], number> = {
  car: 1,
  moto: 0.55,
  truck: 1.25,
  bus: 1.35,
  van: 1.1,
};

const viewCurve: Record<VehicleRealismLayerProps['view'], number> = {
  lateral: 0.34,
  front: 0.48,
  rear: 0.44,
};

const VehicleRealismLayer: React.FC<VehicleRealismLayerProps> = ({ width, height, profile, view }) => {
  const density = profileDensity[profile];
  const curveLift = viewCurve[view] * height;
  const x = d3.scaleLinear().domain([0, 1]).range([width * 0.08, width * 0.92]);
  const y = d3.scaleLinear().domain([0, 1]).range([height * 0.16, height * 0.82]);

  const beltLine = d3
    .line<[number, number]>()
    .x((point) => x(point[0]))
    .y((point) => y(point[1]))
    .curve(d3.curveCatmullRom.alpha(0.5));

  const reflectionLines = d3.range(0, Math.ceil(4 * density)).map((index) => {
    const offset = index * 0.055;
    return (
      beltLine([
        [0.08, 0.2 + offset],
        [0.28, 0.14 + offset * 0.65],
        [0.56, 0.18 + offset * 0.4],
        [0.88, 0.12 + offset * 0.45],
      ]) ?? ''
    );
  });

  const panelLines = d3.range(1, Math.ceil(5 * density)).map((index) => {
    const px = width * (index / Math.ceil(6 * density));
    const path = d3.path();
    path.moveTo(px, curveLift);
    path.bezierCurveTo(px + width * 0.015, height * 0.5, px - width * 0.018, height * 0.68, px, height * 0.78);
    return path.toString();
  });

  const fasteners = d3.range(0, Math.ceil(10 * density)).map((index) => ({
    cx: width * (0.12 + index * (0.76 / Math.max(1, Math.ceil(10 * density) - 1))),
    cy: height * (view === 'lateral' ? 0.76 : 0.62 + (index % 2) * 0.04),
  }));

  return (
    <g className="vehicle-realism-layer" pointerEvents="none" aria-hidden="true">
      <ellipse
        cx={width / 2}
        cy={height * 0.92}
        rx={width * (view === 'lateral' ? 0.42 : 0.33)}
        ry={height * 0.045}
        fill="#020617"
        opacity="0.22"
        filter="url(#shadow-filter)"
      />

      {reflectionLines.map((path, index) => (
        <path
          key={`reflection-${index}`}
          d={path}
          className="vehicle-reflection-line"
          opacity={0.22 - index * 0.025}
        />
      ))}

      {panelLines.map((path, index) => (
        <path
          key={`panel-${index}`}
          d={path}
          className="vehicle-panel-line"
          opacity={view === 'lateral' ? 0.24 : 0.15}
        />
      ))}

      {fasteners.map((point, index) => (
        <circle
          key={`fastener-${index}`}
          cx={point.cx}
          cy={point.cy}
          r={Math.max(1.2, Math.min(width, height) * 0.006)}
          className="vehicle-fastener"
        />
      ))}

      <path
        d={`M ${width * 0.14} ${height * 0.28} C ${width * 0.36} ${height * 0.1}, ${width * 0.62} ${height * 0.13}, ${width * 0.86} ${height * 0.27}`}
        className="vehicle-glass-sheen"
      />
    </g>
  );
};

export default VehicleRealismLayer;
