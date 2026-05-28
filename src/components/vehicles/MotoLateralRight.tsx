import React from 'react';
import { VehicleProps } from './types';
import { createVehiclePartProps } from './partProps';
import VehicleRealismLayer from './VehicleRealismLayer';
import BlueprintContainer from './BlueprintContainer';
import BlueprintDimensionLayer from './BlueprintDimensionLayer';
import LowPolyLayer from './LowPolyLayer';

const MotoLateralRight: React.FC<VehicleProps> = ({
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
    <BlueprintContainer isActive={!!isBlueprintMode} width="100%" height={250 * (600/500)}>
      <svg
        ref={svgRef}
        viewBox="0 0 500 250"
        width="100%"
        role="img"
        aria-label="Moto Lateral Direita"
        className={isBlueprintMode ? 'blueprint-svg' : ''}
      >
        <g className="vehicle-zones">
          {/* Sombra projetada do veículo */}
          <ellipse cx="250" cy="215" rx="180" ry="12" fill="#000" opacity="0.35" filter="url(#shadow-filter)" />

          {/* Roda Dianteira Detalhada */}
          <g pointerEvents="none">
            <circle cx="100" cy="160" r="46" fill="url(#radial-wheel)" />
            <circle cx="100" cy="160" r="41" fill="none" stroke="#1e293b" strokeWidth="1.5" />
            <circle cx="100" cy="160" r="43" fill="none" stroke="#000" strokeWidth="2.5" strokeDasharray="6,8" opacity="0.85" />
            <circle cx="100" cy="160" r="30" fill="#cbd5e1" stroke="#94a3b8" strokeWidth="0.5" />
            <circle cx="100" cy="160" r="26" fill="none" stroke="#64748b" strokeWidth="1.5" strokeDasharray="3,4" />
            <path d="M82,140 A30,30 0 0,1 74,155 L68,152 A36,36 0 0,0 78,135 Z" fill="#ef4444" />
            <circle cx="100" cy="160" r="23" fill="none" stroke="#cbd5e1" strokeWidth="2.5" />
            <circle cx="100" cy="160" r="19" fill="url(#radial-calota)" />
            <path d="M100,160 L100,138 M100,160 L80,150 M100,160 L88,176 M100,160 L112,176 M100,160 L120,150" stroke="#cbd5e1" strokeWidth="2" strokeLinecap="round" />
            <circle cx="100" cy="160" r="6" fill="#475569" />
          </g>
          <circle {...getPartProps('moto-rr-wheel-front', 'Roda Dianteira')} cx="100" cy="160" r="46" />

          {/* Garfo Dianteiro */}
          <g pointerEvents="none">
            <line x1="110" y1="145" x2="138" y2="40" stroke="#fbbf24" strokeWidth="6.5" strokeLinecap="round" />
            <line x1="100" y1="160" x2="112" y2="135" stroke="#e2e8f0" strokeWidth="4.5" strokeLinecap="round" />
            <line x1="135" y1="42" x2="142" y2="42" stroke="#475569" strokeWidth="3" />
          </g>

          {/* Guidão */}
          <path {...getPartProps('moto-lr-handlebars', 'Guidão')} d="M138,40 L155,34 L165,35" fill="none" stroke="#475569" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" filter="url(#part-shadow)" />
          <path d="M138,40 L155,34 L165,35" fill="none" stroke="#cbd5e1" strokeWidth="2" strokeLinecap="round" pointerEvents="none" />

          {/* Retrovisor */}
          <g {...getPartProps('moto-lr-mirror', 'Espelho Retrovisor Direito')}>
            <path d="M148,36 Q158,22 156,14" fill="none" stroke="#475569" strokeWidth="2" pointerEvents="none" />
            <ellipse cx="156" cy="14" rx="10" ry="6" fill="#1e293b" stroke="#475569" strokeWidth="1" transform="rotate(15, 156, 14)" />
            <ellipse cx="157" cy="14" rx="8" ry="4" fill="url(#metal-glass)" opacity="0.7" pointerEvents="none" transform="rotate(15, 156, 14)" />
          </g>

          {/* Radiador */}
          <rect x="158" y="80" width="12" height="35" rx="2" fill="#1e293b" stroke="#475569" strokeWidth="1" pointerEvents="none" />
          <line x1="161" y1="84" x2="161" y2="111" stroke="#cbd5e1" strokeWidth="1" strokeDasharray="1,1" pointerEvents="none" />
          <line x1="165" y1="84" x2="165" y2="111" stroke="#cbd5e1" strokeWidth="1" strokeDasharray="1,1" pointerEvents="none" />

          {/* Roda Traseira */}
          <g pointerEvents="none">
            <circle cx="400" cy="160" r="46" fill="url(#radial-wheel)" />
            <circle cx="400" cy="160" r="41" fill="none" stroke="#1e293b" strokeWidth="1.5" />
            <circle cx="400" cy="160" r="43" fill="none" stroke="#000" strokeWidth="2.5" strokeDasharray="6,8" opacity="0.85" />
            <circle cx="400" cy="160" r="26" fill="#cbd5e1" stroke="#94a3b8" strokeWidth="0.5" />
            <circle cx="400" cy="160" r="22" fill="none" stroke="#64748b" strokeWidth="1" strokeDasharray="2,3" />
            <path d="M412,145 A26,26 0 0,0 418,158 L424,155 A32,32 0 0,1 416,140 Z" fill="#ef4444" />
            <circle cx="400" cy="160" r="23" fill="none" stroke="#cbd5e1" strokeWidth="2.5" />
            <circle cx="400" cy="160" r="19" fill="url(#radial-calota)" />
            <path d="M400,160 L400,138 M400,160 L420,150 M400,160 L412,176 M400,160 L388,176 M400,160 L380,150" stroke="#cbd5e1" strokeWidth="2" strokeLinecap="round" />
            <circle cx="400" cy="160" r="6" fill="#475569" />
          </g>
          <circle {...getPartProps('moto-rr-wheel-rear', 'Roda Traseira')} cx="400" cy="160" r="46" />

          {/* Suspensão Traseira */}
          <g pointerEvents="none">
            <path d="M400,160 L280,150 L300,115 Z" fill="#334155" stroke="#1e293b" strokeWidth="1.5" />
            <rect x="308" y="100" width="12" height="40" rx="3" fill="#fbbf24" stroke="#d97706" strokeWidth="1" transform="rotate(30, 308, 100)" />
            <path d="M325,105 L305,115" stroke="#1e293b" strokeWidth="2" />
            <path d="M322,110 L302,120" stroke="#1e293b" strokeWidth="2" />
            <path d="M319,115 L299,125" stroke="#1e293b" strokeWidth="2" />
          </g>

          {/* Chassi */}
          <g pointerEvents="none">
            <path d="M350,75 L300,60 L230,115 L280,150 Z" fill="none" stroke="#0f172a" strokeWidth="4" strokeLinejoin="round" />
            <path d="M350,75 L280,115 M300,60 L280,150" stroke="#0f172a" strokeWidth="3" />
          </g>

          {/* Motor */}
          <g {...getPartProps('moto-lr-engine', 'Tampa do Motor Direita')}>
            <rect x="215" y="105" width="85" height="60" rx="8" fill="#1e293b" stroke="#334155" strokeWidth="1.5" />
            <line x1="220" y1="115" x2="295" y2="115" stroke="#475569" strokeWidth="2" pointerEvents="none" />
            <line x1="220" y1="123" x2="295" y2="123" stroke="#475569" strokeWidth="2" pointerEvents="none" />
            <line x1="220" y1="131" x2="295" y2="131" stroke="#475569" strokeWidth="2" pointerEvents="none" />
            <line x1="220" y1="139" x2="295" y2="139" stroke="#475569" strokeWidth="2" pointerEvents="none" />
            <circle cx="240" cy="148" r="18" fill="#334155" stroke="#475569" strokeWidth="1" />
            <circle cx="240" cy="148" r="14" fill="#0f172a" pointerEvents="none" />
            <circle cx="240" cy="148" r="8" fill="none" stroke="#ef4444" strokeWidth="1.5" pointerEvents="none" />
          </g>

          {/* Carenagem */}
          <path {...getPartProps('moto-lr-fairing', 'Carenagem Lateral Direita')} d="M310,75 L215,75 L225,115 L290,115 Z M215,75 L170,78 L180,115 L225,115 Z" fill="url(#metal-moto-dark)" stroke="#1e293b" strokeWidth="1" filter="url(#part-shadow)" /> 
          <path d="M310,75 L215,75 L225,115 L290,115 Z M215,75 L170,78 L180,115 L225,115 Z" fill="url(#gloss-reflex)" pointerEvents="none" />
          <path d="M280,85 L240,85 L250,92 L285,92 Z" fill="#ef4444" opacity="0.85" pointerEvents="none" />

          {/* Tanque */}
          <path {...getPartProps('moto-lr-fuel-tank', 'Tanque de Combustível')} d="M325,75 C310,40 250,38 188,50 C175,52 168,65 175,75 C190,95 260,105 325,75 Z" fill="url(#metal-moto-dark)" stroke="#1e293b" strokeWidth="1.5" filter="url(#part-shadow)" />
          <path d="M325,75 C310,40 250,38 188,50 C175,52 168,65 175,75 C190,95 260,105 325,75 Z" fill="url(#gloss-reflex)" pointerEvents="none" />
          <path d="M280,55 C265,55 255,62 255,72 C275,78 290,68 280,55 Z" fill="#1e293b" opacity="0.9" pointerEvents="none" />

          {/* Assento */}
          <path {...getPartProps('moto-lr-seat', 'Assento')} d="M330,75 C290,75 260,78 245,75 C260,95 315,100 348,80 L332,75 Z" fill="#0f172a" stroke="#1e293b" strokeWidth="1" filter="url(#part-shadow)" />
          <path d="M330,75 C290,75 260,78 245,75 C260,95 315,100 348,80 L332,75 Z" fill="url(#gloss-reflex)" pointerEvents="none" />
          <path d="M362,82 C350,70 328,70 322,74 L348,80 Z" fill="#111827" stroke="#1e293b" strokeWidth="1" pointerEvents="none" />

          {/* Escapamento */}
          <g {...getPartProps('moto-lr-exhaust', 'Escapamento Principal')}>
            <path d="M290,145 Q295,182 250,185 L180,180" fill="none" stroke="#94a3b8" strokeWidth="5" strokeLinecap="round" pointerEvents="none" />
            <path d="M290,145 Q295,182 250,185 L180,180" fill="none" stroke="#cbd5e1" strokeWidth="2.5" strokeLinecap="round" pointerEvents="none" />
            <path d="M185,181 L90,142 C85,140 78,143 80,150 L88,162 C90,166 97,166 102,165 L185,181 Z" fill="#111827" stroke="#334155" strokeWidth="1" />
            <rect x="144" y="158" width="6" height="20" fill="#94a3b8" transform="rotate(23, 144, 158)" pointerEvents="none" />
            <ellipse cx="86" cy="151" rx="3" ry="6" fill="#334155" transform="rotate(23, 86, 151)" pointerEvents="none" />   
          </g>

          {/* Para-lama Dianteiro */}
          <path {...getPartProps('moto-lr-fender-front', 'Para-lama Dianteiro')} d="M135,122 C130,110 105,108 75,116 L78,126 C100,118 120,122 125,132 Z" fill="url(#metal-moto-dark)" stroke="#1e293b" strokeWidth="1" filter="url(#part-shadow)" />      
          <path d="M135,122 C130,110 105,108 75,116 L78,126 C100,118 120,122 125,132 Z" fill="url(#gloss-reflex)" pointerEvents="none" />

          {/* Detalhes */}
          <path d="M375,83 L368,80 L366,88 Z" fill="#f87171" stroke="#dc2626" strokeWidth="0.5" pointerEvents="none" />      
          <path d="M156,48 C156,48 162,55 158,62 L153,60 Z" fill="#fef08a" opacity="0.9" pointerEvents="none" />
        </g>
        {!isBlueprintMode && <LowPolyLayer width={500} height={250} seed="moto-lateral-right" />}
        <VehicleRealismLayer width={500} height={250} profile="moto" view="lateral" />
        <BlueprintDimensionLayer svgRef={svgRef as React.RefObject<SVGSVGElement>} isActive={!!isBlueprintMode} view="lateral-right" />
      </svg>
    </BlueprintContainer>
  );
};

export default MotoLateralRight;
