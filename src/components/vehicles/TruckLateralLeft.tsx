import React from 'react';
import { VehicleProps } from './types';
import { createVehiclePartProps } from './partProps';
import VehicleRealismLayer from './VehicleRealismLayer';
import BlueprintContainer from './BlueprintContainer';
import BlueprintDimensionLayer from './BlueprintDimensionLayer';
import LowPolyLayer from './LowPolyLayer';

const TruckLateralLeft: React.FC<VehicleProps> = ({
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
        aria-label="Caminhão Lateral Esquerda"
        className={isBlueprintMode ? 'blueprint-svg' : ''}
      >
        <g className="vehicle-zones">
          {/* Sombra projetada */}
          <ellipse cx="300" cy="225" rx="285" ry="12" fill="#000" opacity="0.35" filter="url(#shadow-filter)" />
          
          {/* Longarinas e Eixos */}
          <g pointerEvents="none">
            <rect x="80" y="170" width="480" height="15" fill="#334155" stroke="#1e293b" strokeWidth="1" />
            <rect x="350" y="178" width="55" height="25" fill="#0f172a" stroke="#1e293b" />
            <path d="M68,185 C68,150 142,150 142,185 L132,185 C132,160 78,160 78,185 Z" fill="#0f172a" />
            <path d="M395,185 C395,145 545,145 545,185 Z" fill="#0f172a" />
            <path d="M403,185 C403,152 537,152 537,185 Z" fill="#1e293b" />
          </g>

          {/* Rodas */}
          <g pointerEvents="none">
            <circle cx="105" cy="180" r="35" fill="url(#radial-wheel)" />
            <circle cx="105" cy="180" r="32" fill="none" stroke="#000" strokeWidth="2" strokeDasharray="5,6" opacity="0.8" />
            <circle cx="105" cy="180" r="18" fill="url(#radial-calota)" stroke="#475569" strokeWidth="1" />
            <circle cx="105" cy="180" r="12" fill="none" stroke="#1e293b" strokeWidth="2" strokeDasharray="2,3" />
            <circle cx="105" cy="180" r="6" fill="#0f172a" />
          </g>
          <circle {...getPartProps('truck-ll-wheel-front', 'Roda Dianteira Esquerda')} cx="105" cy="180" r="35" />

          <g pointerEvents="none">
            <circle cx="435" cy="180" r="35" fill="url(#radial-wheel)" />
            <circle cx="435" cy="180" r="32" fill="none" stroke="#000" strokeWidth="2" strokeDasharray="5,6" opacity="0.8" />
            <circle cx="435" cy="180" r="18" fill="url(#radial-calota)" stroke="#475569" strokeWidth="1" />
            <circle cx="435" cy="180" r="14" fill="#334155" />
            <circle cx="435" cy="180" r="8" fill="#0f172a" />
          </g>
          <circle {...getPartProps('truck-ll-wheel-rear-1', 'Roda Traseira Esquerda (Tração)')} cx="435" cy="180" r="35" />

          <g pointerEvents="none">
            <circle cx="505" cy="180" r="35" fill="url(#radial-wheel)" />
            <circle cx="505" cy="180" r="32" fill="none" stroke="#000" strokeWidth="2" strokeDasharray="5,6" opacity="0.8" />
            <circle cx="505" cy="180" r="18" fill="url(#radial-calota)" stroke="#475569" strokeWidth="1" />
            <circle cx="505" cy="180" r="14" fill="#334155" />
            <circle cx="505" cy="180" r="8" fill="#0f172a" />
          </g>
          <circle {...getPartProps('truck-ll-wheel-rear-2', 'Roda Traseira Esquerda (Auxiliar)')} cx="505" cy="180" r="35" />

          {/* Cabine */}
          <path {...getPartProps('truck-ll-cabin', 'Cabine do Caminhão')} d="M30,120 L30,180 L75,180 C78,160 132,160 135,180 L180,180 L180,72 L85,72 Z" fill="url(#metal-car-blue)" stroke="#1e293b" strokeWidth="1.5" filter="url(#part-shadow)" />
          <path d="M30,120 L30,180 L75,180 C78,160 132,160 135,180 L180,180 L180,72 L85,72 Z" fill="url(#gloss-reflex)" stroke="none" pointerEvents="none" />
          <path d="M558,160 L530,160 L530,172 L558,172 Z M558,142 L530,142 L530,152 L558,152 Z" fill="#475569" stroke="#1e293b" strokeWidth="1" pointerEvents="none" />
          <path d="M490,72 C465,72 422,50 422,35 C422,35 460,42 490,48 Z" fill="url(#metal-car-blue)" opacity="0.9" stroke="#1e293b" strokeWidth="1" pointerEvents="none" />

          <path {...getPartProps('truck-ll-cabin-door', 'Porta da Cabine')} d="M85,82 L168,82 L168,178 L78,178 L78,150 L85,142 Z" fill="url(#metal-car-blue)" stroke="#1e293b" strokeWidth="1" filter="url(#part-shadow)" />
          <path d="M85,82 L168,82 L168,178 L78,178 L78,150 L85,142 Z" fill="url(#gloss-reflex)" stroke="none" pointerEvents="none" />
          <rect x="156" y="128" width="3" height="12" rx="1.5" fill="#0f172a" pointerEvents="none" />

          <path {...getPartProps('truck-ll-cabin-glass', 'Vidro Lateral da Cabine')} d="M40,82 C40,82 85,82 85,82 L85,122 C85,122 45,122 40,112 Z" fill="url(#metal-glass)" opacity="0.85" stroke="#1e293b" strokeWidth="1" filter="url(#part-shadow)" />
          <path d="M40,82 C40,82 85,82 85,82 L85,122 C85,122 45,122 40,112 Z" fill="url(#gloss-reflex)" stroke="none" pointerEvents="none" />
          <path d="M90,82 L155,82 L155,122 L90,122 Z" fill="url(#metal-glass)" opacity="0.85" stroke="#1e293b" strokeWidth="1" pointerEvents="none" />
          <rect x="85" y="82" width="5" height="40" fill="#0f172a" pointerEvents="none" />

          {/* Baú */}
          <g>
            <rect {...getPartProps('truck-ll-cargo-box', 'Baú de Carga')} x="190" y="45" width="380" height="130" rx="4" fill="url(#grad-metal)" stroke="#334155" strokeWidth="1.5" />
            <line x1="192" y1="55" x2="568" y2="55" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" pointerEvents="none" />
            <line x1="192" y1="56" x2="568" y2="56" stroke="rgba(0,0,0,0.15)" strokeWidth="1" pointerEvents="none" />
            <line x1="192" y1="68" x2="568" y2="68" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" pointerEvents="none" />
            <line x1="192" y1="69" x2="568" y2="69" stroke="rgba(0,0,0,0.15)" strokeWidth="1" pointerEvents="none" />
            <line x1="192" y1="81" x2="568" y2="81" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" pointerEvents="none" />
            <line x1="192" y1="82" x2="568" y2="82" stroke="rgba(0,0,0,0.15)" strokeWidth="1" pointerEvents="none" />
            <line x1="192" y1="94" x2="568" y2="94" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" pointerEvents="none" />
            <line x1="192" y1="95" x2="568" y2="95" stroke="rgba(0,0,0,0.15)" strokeWidth="1" pointerEvents="none" />
            <line x1="192" y1="107" x2="568" y2="107" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" pointerEvents="none" />
            <line x1="192" y1="108" x2="568" y2="108" stroke="rgba(0,0,0,0.15)" strokeWidth="1" pointerEvents="none" />
            <line x1="192" y1="120" x2="568" y2="120" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" pointerEvents="none" />
            <line x1="192" y1="121" x2="568" y2="121" stroke="rgba(0,0,0,0.15)" strokeWidth="1" pointerEvents="none" />
            <line x1="192" y1="133" x2="568" y2="133" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" pointerEvents="none" />
            <line x1="192" y1="134" x2="568" y2="134" stroke="rgba(0,0,0,0.15)" strokeWidth="1" pointerEvents="none" />
            <line x1="192" y1="146" x2="568" y2="146" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" pointerEvents="none" />
            <line x1="192" y1="147" x2="568" y2="147" stroke="rgba(0,0,0,0.15)" strokeWidth="1" pointerEvents="none" />
            <line x1="192" y1="159" x2="568" y2="159" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" pointerEvents="none" />
            <line x1="192" y1="160" x2="568" y2="160" stroke="rgba(0,0,0,0.15)" strokeWidth="1" pointerEvents="none" />
            <rect x="190" y="170" width="380" height="5" fill="#dc2626" opacity="0.8" pointerEvents="none" />
            <rect x="190" y="170" width="380" height="5" stroke="#f8fafc" strokeWidth="1.5" strokeDasharray="10,10" opacity="0.8" pointerEvents="none" />
          </g>

          {/* Tanque */}
          <g {...getPartProps('truck-ll-fuel-tank', 'Tanque de Alumínio')}>
            <rect x="220" y="180" width="120" height="28" rx="14" fill="url(#radial-calota)" stroke="#475569" strokeWidth="1" />
            <circle cx="235" cy="186" r="4" fill="#cbd5e1" stroke="#334155" pointerEvents="none" />
            <rect x="250" y="180" width="6" height="28" fill="#1e293b" pointerEvents="none" />
            <rect x="310" y="180" width="6" height="28" fill="#1e293b" pointerEvents="none" />
          </g>

          {/* Retrovisor */}
          <g {...getPartProps('truck-ll-mirror', 'Retrovisor de Caminhão')}>
            <path d="M42,88 L26,88 L26,128 L38,128" fill="none" stroke="#1e293b" strokeWidth="2.5" pointerEvents="none" />
            <rect x="22" y="85" width="10" height="30" rx="3" fill="#0f172a" stroke="#334155" strokeWidth="1" />
            <rect x="23" y="86" width="8" height="28" fill="url(#metal-glass)" opacity="0.75" pointerEvents="none" />
            <rect x="22" y="118" width="10" height="12" rx="2" fill="#0f172a" stroke="#334155" strokeWidth="1" />
            <rect x="23" y="119" width="8" height="10" fill="url(#metal-glass)" opacity="0.75" pointerEvents="none" />
          </g>

          {/* Detalhes */}
          <path d="M30,158 Q32,154 36,155 L38,172 L30,172 Z" fill="#fef08a" opacity="0.9" pointerEvents="none" />
          <circle cx="205" cy="164" r="2.5" fill="#f59e0b" pointerEvents="none" />
          <circle cx="380" cy="164" r="2.5" fill="#f59e0b" pointerEvents="none" />
          <circle cx="550" cy="164" r="2.5" fill="#f59e0b" pointerEvents="none" />
        </g>
        {!isBlueprintMode && <LowPolyLayer width={600} height={250} seed="truck-lateral-left" />}
        <VehicleRealismLayer width={600} height={250} profile="truck" view="lateral" />
        <BlueprintDimensionLayer svgRef={svgRef as React.RefObject<SVGSVGElement>} isActive={!!isBlueprintMode} view="lateral-left" />
      </svg>
    </BlueprintContainer>
  );
};

export default TruckLateralLeft;
