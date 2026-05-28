import React from 'react';
import { VehicleProps } from './types';
import { createVehiclePartProps } from './partProps';
import VehicleRealismLayer from './VehicleRealismLayer';
import BlueprintContainer from './BlueprintContainer';
import BlueprintDimensionLayer from './BlueprintDimensionLayer';
import LowPolyLayer from './LowPolyLayer';

const BusTraseira: React.FC<VehicleProps> = ({
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
    <BlueprintContainer isActive={!!isBlueprintMode} width="100%" height={300 * (600/350)}>
      <svg
        ref={svgRef}
        viewBox="0 0 350 300"
        width="100%"
        role="img"
        aria-label="Ônibus Traseira"
        className={isBlueprintMode ? 'blueprint-svg' : ''}
      >
        <g className="vehicle-zones">
          {/* Sombra */}
          <ellipse cx="175" cy="282" rx="145" ry="10" fill="rgba(2, 6, 23, 0.55)" filter="blur(8px)" pointerEvents="none" />
          
          {/* Pneus */}
          <g pointerEvents="none">
            <rect x="46" y="240" width="18" height="40" rx="3" fill="#0f172a" />
            <rect x="65" y="240" width="18" height="40" rx="3" fill="#0f172a" />
            <rect x="267" y="240" width="18" height="40" rx="3" fill="#0f172a" />
            <rect x="286" y="240" width="18" height="40" rx="3" fill="#0f172a" />
            <rect x="42" y="245" width="45" height="24" fill="#090d16" opacity="0.9" />
            <rect x="263" y="245" width="45" height="24" fill="#090d16" opacity="0.9" />
          </g>

          {/* Painel Traseiro */}
          <rect {...getPartProps('bus-r-body', 'Painel Traseiro')} x="40" y="20" width="270" height="250" rx="22" fill="url(#grad-metal)" />

          {/* Vidro */}
          <g {...getPartProps('bus-r-window', 'Vidro Traseiro')}>
            <path d="M52,35 L298,35 L298,75 L52,75 Z" fill="url(#metal-glass)" opacity="0.9" stroke="#0f172a" strokeWidth="1.8" />
            <path d="M75,35 L105,35 L85,75 L55,75 Z" fill="#ffffff" opacity="0.12" pointerEvents="none" />
            <path d="M210,35 L240,35 L220,75 L190,75 Z" fill="#ffffff" opacity="0.12" pointerEvents="none" />
          </g>

          <g pointerEvents="none" opacity="0.7">
            <rect x="52" y="85" width="246" height="8" rx="2" fill="#0f172a" />
            <rect x="52" y="96" width="246" height="8" rx="2" fill="#0f172a" />
          </g>

          {/* Tampa do Motor */}
          <g {...getPartProps('bus-r-engine-cover', 'Tampa do Motor / Grade')}>
            <rect x="70" y="165" width="210" height="80" rx="8" fill="url(#grad-metal)" stroke="#1e293b" strokeWidth="2" />
            <rect x="85" y="175" width="180" height="42" rx="4" fill="#0f172a" stroke="#334155" strokeWidth="1.2" />
            <line x1="90" y1="181" x2="260" y2="181" stroke="#1e293b" strokeWidth="2" pointerEvents="none" />
            <line x1="90" y1="187" x2="260" y2="187" stroke="#1e293b" strokeWidth="2" pointerEvents="none" />
            <line x1="90" y1="193" x2="260" y2="193" stroke="#1e293b" strokeWidth="2" pointerEvents="none" />
            <line x1="90" y1="199" x2="260" y2="199" stroke="#1e293b" strokeWidth="2" pointerEvents="none" />
            <line x1="90" y1="205" x2="260" y2="205" stroke="#1e293b" strokeWidth="2" pointerEvents="none" />
            <line x1="90" y1="211" x2="260" y2="211" stroke="#1e293b" strokeWidth="2" pointerEvents="none" />
            <circle cx="175" cy="235" r="4.5" fill="#334155" stroke="#e2e8f0" strokeWidth="0.5" pointerEvents="none" />
          </g>

          {/* Lanternas */}
          <g {...getPartProps('bus-r-light-left', 'Lanterna Traseira Esquerda')}>
            <rect x="46" y="125" width="16" height="85" rx="3" fill="#121824" stroke="#334155" strokeWidth="1" />
            <rect x="48" y="128" width="12" height="42" rx="1.5" fill="#ef4444" opacity="0.9" pointerEvents="none" />
            <rect x="48" y="172" width="12" height="20" rx="1.5" fill="#f97316" opacity="0.9" pointerEvents="none" />
            <rect x="48" y="194" width="12" height="12" rx="1.5" fill="#f8fafc" opacity="0.9" pointerEvents="none" />
          </g>
          <g {...getPartProps('bus-r-light-right', 'Lanterna Traseira Direita')}>
            <rect x="288" y="125" width="16" height="85" rx="3" fill="#121824" stroke="#334155" strokeWidth="1" />
            <rect x="290" y="128" width="12" height="42" rx="1.5" fill="#ef4444" opacity="0.9" pointerEvents="none" />
            <rect x="290" y="172" width="12" height="20" rx="1.5" fill="#f97316" opacity="0.9" pointerEvents="none" />
            <rect x="290" y="194" width="12" height="12" rx="1.5" fill="#f8fafc" opacity="0.9" pointerEvents="none" />
          </g>

          {/* Para-choque */}
          <g {...getPartProps('bus-r-bumper', 'Para-choque Traseiro')}>
            <path d="M40,246 L310,246 C310,246 310,270 300,272 L50,272 C40,272 40,246 40,246 Z" fill="#0f172a" stroke="#1e293b" strokeWidth="1.5" />
            <rect x="52" y="252" width="22" height="6" rx="1" fill="#ef4444" pointerEvents="none" />
            <rect x="276" y="252" width="22" height="6" rx="1" fill="#ef4444" pointerEvents="none" />
            <g pointerEvents="none">
              <rect x="145" y="250" width="60" height="15" rx="1.5" fill="#f8fafc" stroke="#1e293b" strokeWidth="1" />
              <rect x="146" y="247" width="58" height="3" fill="#3b82f6" />
              <text x="175" y="261" fontFamily="monospace" fontSize="9" fontWeight="900" fill="#000" textAnchor="middle" letterSpacing="1.2">AAA0A00</text>
            </g>
            <circle cx="110" cy="265" r="5" fill="#1e293b" stroke="#cbd5e1" strokeWidth="1.2" pointerEvents="none" />
          </g>
        </g>
        {!isBlueprintMode && <LowPolyLayer width={350} height={300} seed="bus-rear" />}
        <VehicleRealismLayer width={350} height={300} profile="bus" view="rear" />
        <BlueprintDimensionLayer svgRef={svgRef as React.RefObject<SVGSVGElement>} isActive={!!isBlueprintMode} view="rear" />
      </svg>
    </BlueprintContainer>
  );
};

export default BusTraseira;
