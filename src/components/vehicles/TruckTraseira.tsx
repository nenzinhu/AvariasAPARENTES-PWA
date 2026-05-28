import React from 'react';
import { VehicleProps } from './types';
import { createVehiclePartProps } from './partProps';
import VehicleRealismLayer from './VehicleRealismLayer';
import BlueprintContainer from './BlueprintContainer';
import BlueprintDimensionLayer from './BlueprintDimensionLayer';
import LowPolyLayer from './LowPolyLayer';

const TruckTraseira: React.FC<VehicleProps> = ({
  damages = [],
  selectedPartId,
  onPartClick,
  onPartHover,
  svgRef,
  isBlueprintMode,
}) => {
  const getPartProps = (id: string, name: string) =>
    createVehiclePartProps({
      id,
      name,
      damages,
      selectedPartId,
      onPartClick,
      onPartHover,
    });

  return (
    <BlueprintContainer isActive={!!isBlueprintMode} width="100%" height={300 * (600/400)}>
      <svg
        ref={svgRef}
        viewBox="0 0 400 300"
        width="100%"
        role="img"
        aria-label="Caminhão Traseira"
        className={isBlueprintMode ? 'blueprint-svg' : ''}
      >
        <g className="vehicle-zones">
          {/* Sombra projetada */}
          <ellipse cx="200" cy="282" rx="165" ry="10" fill="#000" opacity="0.35" filter="url(#shadow-filter)" />
          
          {/* Quadro Traseiro */}
          <g {...getPartProps('truck-r-box-frame', 'Portas do Baú / Traseira')}>
            <rect x="50" y="30" width="300" height="210" rx="4" fill="url(#grad-metal)" stroke="#334155" strokeWidth="2" />
            <line x1="200" y1="30" x2="200" y2="240" stroke="#1e293b" strokeWidth="3" />
            <line x1="145" y1="30" x2="145" y2="240" stroke="#cbd5e1" strokeWidth="4.5" />
            <line x1="145" y1="30" x2="145" y2="240" stroke="#64748b" strokeWidth="1.5" />
            <line x1="255" y1="30" x2="255" y2="240" stroke="#cbd5e1" strokeWidth="4.5" />
            <line x1="255" y1="30" x2="255" y2="240" stroke="#64748b" strokeWidth="1.5" />
            <rect x="135" y="150" width="20" height="12" rx="2" fill="#0f172a" />
            <rect x="245" y="150" width="20" height="12" rx="2" fill="#0f172a" />
            <rect x="47" y="60" width="6" height="12" fill="#1e293b" />
            <rect x="47" y="130" width="6" height="12" fill="#1e293b" />
            <rect x="47" y="200" width="6" height="12" fill="#1e293b" />
            <rect x="347" y="60" width="6" height="12" fill="#1e293b" />
            <rect x="347" y="130" width="6" height="12" fill="#1e293b" />
            <rect x="347" y="200" width="6" height="12" fill="#1e293b" />
            <rect x="52" y="222" width="144" height="15" fill="#f59e0b" stroke="#dc2626" strokeWidth="2" strokeDasharray="16,16" />
            <rect x="204" y="222" width="144" height="15" fill="#f59e0b" stroke="#dc2626" strokeWidth="2" strokeDasharray="16,16" />
          </g>

          {/* Rodas */}
          <g pointerEvents="none">
            <rect x="70" y="235" width="24" height="15" rx="3" fill="#0f172a" />
            <rect x="96" y="235" width="24" height="15" rx="3" fill="#0f172a" />
            <rect x="280" y="235" width="24" height="15" rx="3" fill="#0f172a" />
            <rect x="306" y="235" width="24" height="15" rx="3" fill="#0f172a" />
            <rect x="66" y="215" width="60" height="22" fill="#0f172a" opacity="0.9" />
            <rect x="274" y="215" width="60" height="22" fill="#0f172a" opacity="0.9" />
          </g>

          {/* Para-choque */}
          <rect {...getPartProps('truck-r-bumper', 'Para-choque Traseiro')} x="40" y="245" width="320" height="22" rx="3" fill="#1e293b" stroke="#0f172a" strokeWidth="1.5" />
          <rect x="42" y="247" width="316" height="6" stroke="#ef4444" strokeWidth="2.5" strokeDasharray="10,12" fill="none" opacity="0.8" pointerEvents="none" />

          {/* Lanternas */}
          <g {...getPartProps('truck-r-light-left', 'Lanterna Traseira Esquerda')}>
            <rect x="60" y="250" width="50" height="12" rx="2" fill="#0f172a" stroke="#334155" strokeWidth="1" />
            <rect x="62" y="252" width="20" height="8" fill="#ef4444" pointerEvents="none" />
            <rect x="82" y="252" width="14" height="8" fill="#f59e0b" pointerEvents="none" />
            <rect x="96" y="252" width="12" height="8" fill="#f8fafc" pointerEvents="none" />
          </g>
          <g {...getPartProps('truck-r-light-right', 'Lanterna Traseira Direita')}>
            <rect x="290" y="250" width="50" height="12" rx="2" fill="#0f172a" stroke="#334155" strokeWidth="1" />
            <rect x="292" y="252" width="12" height="8" fill="#f8fafc" pointerEvents="none" />
            <rect x="304" y="252" width="14" height="8" fill="#f59e0b" pointerEvents="none" />
            <rect x="318" y="252" width="20" height="8" fill="#ef4444" pointerEvents="none" />
          </g>

          {/* Placa */}
          <g pointerEvents="none">
            <rect x="175" y="250" width="50" height="13" rx="1.5" fill="#f8fafc" stroke="#1e293b" strokeWidth="1" />
            <rect x="176" y="251" width="48" height="3" fill="#3b82f6" />
            <text x="200" y="260" fontFamily="monospace" fontSize="8" fontWeight="bold" fill="#000" textAnchor="middle" letterSpacing="1">AAA0A00</text>
          </g>
        </g>
        {!isBlueprintMode && <LowPolyLayer width={400} height={300} seed="truck-rear" />}
        <VehicleRealismLayer width={400} height={300} profile="truck" view="rear" />
        <BlueprintDimensionLayer svgRef={svgRef as React.RefObject<SVGSVGElement>} isActive={!!isBlueprintMode} view="rear" />
      </svg>
    </BlueprintContainer>
  );
};

export default TruckTraseira;
