import React from 'react';
import { VehicleProps } from './types';
import { createVehiclePartProps } from './partProps';
import VehicleRealismLayer from './VehicleRealismLayer';
import BlueprintContainer from './BlueprintContainer';
import BlueprintDimensionLayer from './BlueprintDimensionLayer';
import LowPolyLayer from './LowPolyLayer';

const TruckLateralRight: React.FC<VehicleProps> = ({
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
    <BlueprintContainer isActive={!!isBlueprintMode} width="100%" height={250 * (600/600)}>
      <svg
        ref={svgRef}
        viewBox="0 0 600 250"
        width="100%"
        role="img"
        aria-label="Caminhão Lateral Direita"
        className={isBlueprintMode ? 'blueprint-svg' : ''}
      >
        <g className="vehicle-zones">
          {/* Sombra projetada */}
          <ellipse cx="300" cy="225" rx="285" ry="12" fill="#000" opacity="0.35" filter="url(#shadow-filter)" />
          
          {/* Longarinas e Eixos */}
          <g pointerEvents="none">
            <rect x="40" y="170" width="480" height="15" fill="#334155" stroke="#1e293b" strokeWidth="1" />
            <rect x="195" y="178" width="55" height="25" fill="#0f172a" stroke="#1e293b" />
            <path d="M458,185 C458,150 532,150 532,185 L522,185 C522,160 468,160 468,185 Z" fill="#0f172a" />
            <path d="M55,185 C55,145 205,145 205,185 Z" fill="#0f172a" />
            <path d="M63,185 C63,152 197,152 197,185 Z" fill="#1e293b" />
          </g>

          {/* Rodas */}
          <g pointerEvents="none">
            <circle cx="95" cy="180" r="35" fill="url(#radial-wheel)" />
            <circle cx="95" cy="180" r="32" fill="none" stroke="#000" strokeWidth="2" strokeDasharray="5,6" opacity="0.8" />
            <circle cx="95" cy="180" r="18" fill="url(#radial-calota)" stroke="#475569" strokeWidth="1" />
            <circle cx="95" cy="180" r="14" fill="#334155" />
            <circle cx="95" cy="180" r="8" fill="#0f172a" />
          </g>
          <circle {...getPartProps('truck-rr-wheel-rear-2', 'Roda Traseira Direita (Auxiliar)')} cx="95" cy="180" r="35" />

          <g pointerEvents="none">
            <circle cx="165" cy="180" r="35" fill="url(#radial-wheel)" />
            <circle cx="165" cy="180" r="32" fill="none" stroke="#000" strokeWidth="2" strokeDasharray="5,6" opacity="0.8" />
            <circle cx="165" cy="180" r="18" fill="url(#radial-calota)" stroke="#475569" strokeWidth="1" />
            <circle cx="165" cy="180" r="14" fill="#334155" />
            <circle cx="165" cy="180" r="8" fill="#0f172a" />
          </g>
          <circle {...getPartProps('truck-rr-wheel-rear-1', 'Roda Traseira Direita (Tração)')} cx="165" cy="180" r="35" />

          <g pointerEvents="none">
            <circle cx="495" cy="180" r="35" fill="url(#radial-wheel)" />
            <circle cx="495" cy="180" r="32" fill="none" stroke="#000" strokeWidth="2" strokeDasharray="5,6" opacity="0.8" />
            <circle cx="495" cy="180" r="18" fill="url(#radial-calota)" stroke="#475569" strokeWidth="1" />
            <circle cx="495" cy="180" r="12" fill="none" stroke="#1e293b" strokeWidth="2" strokeDasharray="2,3" />
            <circle cx="495" cy="180" r="6" fill="#0f172a" />
          </g>
          <circle {...getPartProps('truck-rr-wheel-front', 'Roda Dianteira Direita')} cx="495" cy="180" r="35" />

          {/* Cabine */}
          <path {...getPartProps('truck-lr-cabin', 'Cabine do Caminhão')} d="M570,120 L570,180 L525,180 C522,160 468,160 465,180 L420,180 L420,72 L515,72 Z" fill="url(#metal-car-blue)" stroke="#1e293b" strokeWidth="1.5" filter="url(#part-shadow)" />
          <path d="M570,120 L570,180 L525,180 C522,160 468,160 465,180 L420,180 L420,72 L515,72 Z" fill="url(#gloss-reflex)" stroke="none" pointerEvents="none" />
          <path d="M558,160 L530,160 L530,172 L558,172 Z M558,142 L530,142 L530,152 L558,152 Z" fill="#475569" stroke="#1e293b" strokeWidth="1" pointerEvents="none" />
          <path d="M490,72 C465,72 422,50 422,35 C422,35 460,42 490,48 Z" fill="url(#metal-car-blue)" opacity="0.9" stroke="#1e293b" strokeWidth="1" pointerEvents="none" />

          <path {...getPartProps('truck-lr-cabin-door', 'Porta da Cabine')} d="M515,82 L432,82 L432,178 L522,178 L522,150 L515,142 Z" fill="url(#metal-car-blue)" stroke="#1e293b" strokeWidth="1" filter="url(#part-shadow)" />
          <path d="M515,82 L432,82 L432,178 L522,178 L522,150 L515,142 Z" fill="url(#gloss-reflex)" stroke="none" pointerEvents="none" />
          <rect x="441" y="128" width="3" height="12" rx="1.5" fill="#0f172a" pointerEvents="none" />

          <path {...getPartProps('truck-lr-cabin-glass', 'Vidro Lateral da Cabine')} d="M560,82 C560,82 515,82 515,82 L515,122 C515,122 555,122 560,112 Z" fill="url(#metal-glass)" opacity="0.85" stroke="#1e293b" strokeWidth="1" filter="url(#part-shadow)" />
          <path d="M560,82 C560,82 515,82 515,82 L515,122 C515,122 555,122 560,112 Z" fill="url(#gloss-reflex)" stroke="none" pointerEvents="none" />
          <path d="M510,82 L445,82 L445,122 L510,122 Z" fill="url(#metal-glass)" opacity="0.85" stroke="#1e293b" strokeWidth="1" pointerEvents="none" />
          <rect x="510" y="82" width="5" height="40" fill="#0f172a" pointerEvents="none" />

          {/* Baú */}
          <g>
            <rect {...getPartProps('truck-lr-cargo-box', 'Baú de Carga')} x="30" y="45" width="380" height="130" rx="4" fill="url(#grad-metal)" stroke="#334155" strokeWidth="1.5" />
            <line x1="32" y1="55" x2="408" y2="55" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" pointerEvents="none" />
            <line x1="32" y1="56" x2="408" y2="56" stroke="rgba(0,0,0,0.15)" strokeWidth="1" pointerEvents="none" />
            <line x1="32" y1="68" x2="408" y2="68" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" pointerEvents="none" />
            <line x1="32" y1="69" x2="408" y2="69" stroke="rgba(0,0,0,0.15)" strokeWidth="1" pointerEvents="none" />
            <line x1="32" y1="81" x2="408" y2="81" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" pointerEvents="none" />
            <line x1="32" y1="82" x2="408" y2="82" stroke="rgba(0,0,0,0.15)" strokeWidth="1" pointerEvents="none" />
            <line x1="32" y1="94" x2="408" y2="94" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" pointerEvents="none" />
            <line x1="32" y1="95" x2="408" y2="95" stroke="rgba(0,0,0,0.15)" strokeWidth="1" pointerEvents="none" />
            <line x1="32" y1="107" x2="408" y2="107" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" pointerEvents="none" />
            <line x1="32" y1="108" x2="408" y2="108" stroke="rgba(0,0,0,0.15)" strokeWidth="1" pointerEvents="none" />
            <line x1="32" y1="120" x2="408" y2="120" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" pointerEvents="none" />
            <line x1="32" y1="121" x2="408" y2="121" stroke="rgba(0,0,0,0.15)" strokeWidth="1" pointerEvents="none" />
            <line x1="32" y1="133" x2="408" y2="133" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" pointerEvents="none" />
            <line x1="32" y1="134" x2="408" y2="134" stroke="rgba(0,0,0,0.15)" strokeWidth="1" pointerEvents="none" />
            <line x1="32" y1="146" x2="408" y2="146" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" pointerEvents="none" />
            <line x1="32" y1="147" x2="408" y2="147" stroke="rgba(0,0,0,0.15)" strokeWidth="1" pointerEvents="none" />
            <line x1="32" y1="159" x2="408" y2="159" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" pointerEvents="none" />
            <line x1="32" y1="160" x2="408" y2="160" stroke="rgba(0,0,0,0.15)" strokeWidth="1" pointerEvents="none" />
            <rect x="30" y="170" width="380" height="5" fill="#dc2626" opacity="0.8" pointerEvents="none" />
            <rect x="30" y="170" width="380" height="5" stroke="#f8fafc" strokeWidth="1.5" strokeDasharray="10,10" opacity="0.8" pointerEvents="none" />
          </g>

          {/* Tanque */}
          <g {...getPartProps('truck-lr-fuel-tank', 'Tanque de Alumínio')}>
            <rect x="260" y="180" width="120" height="28" rx="14" fill="url(#radial-calota)" stroke="#475569" strokeWidth="1" />
            <circle cx="275" cy="186" r="4" fill="#cbd5e1" stroke="#334155" pointerEvents="none" />
            <rect x="290" y="180" width="6" height="28" fill="#1e293b" pointerEvents="none" />
            <rect x="350" y="180" width="6" height="28" fill="#1e293b" pointerEvents="none" />
          </g>

          {/* Retrovisor */}
          <g {...getPartProps('truck-lr-mirror', 'Retrovisor de Caminhão')}>
            <path d="M558,88 L574,88 L574,128 L562,128" fill="none" stroke="#1e293b" strokeWidth="2.5" pointerEvents="none" />
            <rect x="568" y="85" width="10" height="30" rx="3" fill="#0f172a" stroke="#334155" strokeWidth="1" />
            <rect x="569" y="86" width="8" height="28" fill="url(#metal-glass)" opacity="0.75" pointerEvents="none" />
            <rect x="568" y="118" width="10" height="12" rx="2" fill="#0f172a" stroke="#334155" strokeWidth="1" />
            <rect x="569" y="119" width="8" height="10" fill="url(#metal-glass)" opacity="0.75" pointerEvents="none" />
          </g>

          {/* Detalhes */}
          <path d="M570,158 Q568,154 564,155 L562,172 L570,172 Z" fill="#fef08a" opacity="0.9" pointerEvents="none" />
          <circle cx="50" cy="164" r="2.5" fill="#f59e0b" pointerEvents="none" />
          <circle cx="220" cy="164" r="2.5" fill="#f59e0b" pointerEvents="none" />
          <circle cx="395" cy="164" r="2.5" fill="#f59e0b" pointerEvents="none" />
        </g>
        {!isBlueprintMode && <LowPolyLayer width={600} height={250} seed="truck-lateral-right" />}
        <VehicleRealismLayer width={600} height={250} profile="truck" view="lateral" />
        <BlueprintDimensionLayer svgRef={svgRef as React.RefObject<SVGSVGElement>} isActive={!!isBlueprintMode} view="lateral-right" />
      </svg>
    </BlueprintContainer>
  );
};

export default TruckLateralRight;
