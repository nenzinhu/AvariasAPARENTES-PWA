import type React from 'react';
import type { Damage } from '../../types';
import type { VehicleProps } from './types';

type VehiclePartProps = React.SVGProps<SVGElement> & {
  'data-name': string;
};

interface CreateVehiclePartPropsArgs {
  id: string;
  name: string;
  damages: Damage[];
  selectedPartId?: VehicleProps['selectedPartId'];
  onPartClick?: VehicleProps['onPartClick'];
  onPartHover?: VehicleProps['onPartHover'];
}

const severityLabel: Record<string, string> = {
  low: 'leve',
  medium: 'media',
  high: 'grave',
};

export const createVehiclePartProps = ({
  id,
  name,
  damages,
  selectedPartId,
  onPartClick,
  onPartHover,
}: CreateVehiclePartPropsArgs): VehiclePartProps => {
  const damage = damages.find((d) => d.partId === id);
  const severityClass = damage ? `damage-${damage.severity}` : '';
  const selectedClass = selectedPartId === id ? 'selected' : '';

  const activate = () => onPartClick?.(id, name);
  const preview = () => onPartHover?.(id, name);

  return {
    id,
    role: 'button',
    tabIndex: 0,
    'aria-label': damage
      ? `${name} com avaria ${severityLabel[damage.severity] ?? damage.severity}`
      : name,
    'aria-pressed': selectedPartId === id,
    'data-name': name,
    className: `part ${selectedClass} ${severityClass}`.trim(),
    onClick: activate,
    onMouseEnter: preview,
    onFocus: preview,
    onKeyDown: (event) => {
      if (event.key !== 'Enter' && event.key !== ' ') return;
      event.preventDefault();
      activate();
    },
  };
};
