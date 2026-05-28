import type React from 'react';
import { Damage } from '../../types';

export interface VehicleProps {
  damages?: Damage[];
  selectedPartId?: string | null;
  onPartClick?: (partId: string, partName: string) => void;
  onPartHover?: (partId: string, partName: string) => void;
  svgRef?: React.RefObject<SVGSVGElement>;
  isBlueprintMode?: boolean;
}
