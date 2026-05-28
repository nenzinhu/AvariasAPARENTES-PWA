import React, { useEffect, useState, useRef } from 'react';
import * as d3 from 'd3';

interface BlueprintDimensionLayerProps {
  svgRef: React.RefObject<SVGSVGElement>;
  isActive: boolean;
  view: string;
}

const BlueprintDimensionLayer: React.FC<BlueprintDimensionLayerProps> = ({
  svgRef,
  isActive,
  view,
}) => {
  const [dimensions, setDimensions] = useState<{ width: number; height: number; x: number; y: number } | null>(null);
  const layerRef = useRef<SVGGElement>(null);

  useEffect(() => {
    if (!isActive || !svgRef.current) {
      setDimensions(null);
      return;
    }

    const updateDimensions = () => {
      const svg = svgRef.current;
      if (!svg) return;

      try {
        // Find the zones container
        const zones = svg.querySelector('.vehicle-zones') as SVGGElement;
        if (zones) {
          const bbox = zones.getBBox();
          // Validation: only set if we have meaningful numbers
          if (bbox.width > 0 && bbox.height > 0) {
            setDimensions({
              width: bbox.width,
              height: bbox.height,
              x: bbox.x,
              y: bbox.y,
            });
          }
        }
      } catch (e) {
        console.warn('BlueprintDimensionLayer: Failed to get BBox', e);
      }
    };

    // Initial calculation
    updateDimensions();

    // Re-calculate if view changes
    const timer = setTimeout(updateDimensions, 150);
    return () => clearTimeout(timer);
  }, [isActive, svgRef, view]);

  useEffect(() => {
    if (!isActive || !dimensions || !layerRef.current) {
      d3.select(layerRef.current).selectAll('*').remove();
      return;
    }

    const g = d3.select(layerRef.current);
    g.selectAll('*').remove();

    const { x, y, width, height } = dimensions;
    
    // Final safety check for NaN or non-finite numbers
    if (!isFinite(x) || !isFinite(y) || !isFinite(width) || !isFinite(height)) return;

    const padding = 35;
    const arrowSize = 6;

    // --- Width Dimension (Horizontal) ---
    const yPos = y + height + padding;
    
    const hGroup = g.append('g').attr('class', 'dim-group-h');

    // Main line
    hGroup.append('line')
      .attr('class', 'dim-line')
      .attr('x1', x)
      .attr('y1', yPos)
      .attr('x2', x + width)
      .attr('y2', yPos);

    // Extension lines
    hGroup.append('line')
      .attr('class', 'dim-line')
      .attr('x1', x)
      .attr('y1', y + height + 5)
      .attr('x2', x)
      .attr('y2', yPos + 5);

    hGroup.append('line')
      .attr('class', 'dim-line')
      .attr('x1', x + width)
      .attr('y1', y + height + 5)
      .attr('x2', x + width)
      .attr('y2', yPos + 5);

    // Arrows
    hGroup.append('path')
      .attr('class', 'dim-arrow')
      .attr('d', `M${x},${yPos} l${arrowSize},-${arrowSize/2} l0,${arrowSize} z`);

    hGroup.append('path')
      .attr('class', 'dim-arrow')
      .attr('d', `M${x+width},${yPos} l-${arrowSize},-${arrowSize/2} l0,${arrowSize} z`);

    // Label
    const scale = view.includes('lateral') ? 9.2 : 4.8;
    const displayValue = Math.round(width * scale);
    
    hGroup.append('text')
      .attr('class', 'dim-text')
      .attr('x', x + width / 2)
      .attr('y', yPos - 8)
      .text(`${displayValue} mm`);

    // --- Height Dimension (Vertical) ---
    const xPos = x - padding;
    const vGroup = g.append('g').attr('class', 'dim-group-v');

    vGroup.append('line')
      .attr('class', 'dim-line')
      .attr('x1', xPos)
      .attr('y1', y)
      .attr('x2', xPos)
      .attr('y2', y + height);

    // Extension lines
    vGroup.append('line')
      .attr('class', 'dim-line')
      .attr('x1', x - 5)
      .attr('y1', y)
      .attr('x2', xPos - 5)
      .attr('y2', y);

    vGroup.append('line')
      .attr('class', 'dim-line')
      .attr('x1', x - 5)
      .attr('y1', y + height)
      .attr('x2', xPos - 5)
      .attr('y2', y + height);

    // Arrows
    vGroup.append('path')
      .attr('class', 'dim-arrow')
      .attr('d', `M${xPos},${y} l-${arrowSize/2},${arrowSize} l${arrowSize},0 z`);

    vGroup.append('path')
      .attr('class', 'dim-arrow')
      .attr('d', `M${xPos},${y+height} l-${arrowSize/2},-${arrowSize} l${arrowSize},0 z`);

    // Label
    const displayHeight = Math.round(height * scale);
    vGroup.append('text')
      .attr('class', 'dim-text')
      .attr('x', xPos - 12)
      .attr('y', y + height / 2)
      .attr('transform', `rotate(-90, ${xPos - 12}, ${y + height / 2})`)
      .text(`${displayHeight} mm`);

  }, [isActive, dimensions, view]);

  return <g ref={layerRef} pointerEvents="none" />;
};

export default BlueprintDimensionLayer;
