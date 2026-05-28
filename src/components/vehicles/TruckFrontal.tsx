import React from 'react';
import { VehicleProps } from './types';
import { createVehiclePartProps } from './partProps';
import VehicleRealismLayer from './VehicleRealismLayer';
import BlueprintContainer from './BlueprintContainer';
import BlueprintDimensionLayer from './BlueprintDimensionLayer';
import LowPolyLayer from './LowPolyLayer';

const TruckFrontal: React.FC<VehicleProps> = ({
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
        aria-label="Caminhão Frontal"
        className={isBlueprintMode ? 'blueprint-svg' : ''}
      >
        <g className="vehicle-zones">
          {/* Sombra projetada */}
          <ellipse cx="200" cy="282" rx="165" ry="10" fill="#000" opacity="0.35" filter="url(#shadow-filter)" />
          
          {/* Defletor Superior */}
          <path {...getPartProps('truck-f-deflector', 'Defletor Superior / Teto')} d="M95,20 L305,20 C315,20 318,32 300,55 L100,55 C82,32 85,20 95,20 Z" fill="url(#metal-car-blue)" stroke="#1e293b" strokeWidth="1.5" filter="url(#part-shadow)" />
          <path d="M95,20 L305,20 C315,20 318,32 300,55 L100,55 C82,32 85,20 95,20 Z" fill="url(#gloss-reflex)" stroke="none" pointerEvents="none" />
          <rect x="130" y="24" width="12" height="4" fill="#fb923c" rx="1" pointerEvents="none" />
          <rect x="200" y="24" width="12" height="4" fill="#fb923c" rx="1" pointerEvents="none" />
          <rect x="270" y="24" width="12" height="4" fill="#fb923c" rx="1" pointerEvents="none" />

          {/* Parabrisa */}
          <g {...getPartProps('truck-f-windshield', 'Parabrisa Dianteiro')}>
            <rect x="75" y="65" width="250" height="75" rx="10" fill="url(#metal-glass)" opacity="0.85" stroke="#1e293b" strokeWidth="1.5" />
            <path d="M76,66 C120,70 280,70 324,66 L324,75 L76,75 Z" fill="#0f172a" opacity="0.4" pointerEvents="none" />
            <line x1="120" y1="135" x2="155" y2="105" stroke="#000" strokeWidth="2.5" pointerEvents="none" />
            <line x1="155" y1="105" x2="185" y2="108" stroke="#000" strokeWidth="1.5" pointerEvents="none" />
            <line x1="220" y1="135" x2="255" y2="105" stroke="#000" strokeWidth="2.5" pointerEvents="none" />
            <line x1="255" y1="105" x2="285" y2="108" stroke="#000" strokeWidth="1.5" pointerEvents="none" />
          </g>

          {/* Grade */}
          <g {...getPartProps('truck-f-grille', 'Grade Frontal Principal')}>
            <rect x="95" y="148" width="210" height="92" rx="8" fill="#0f172a" stroke="#334155" strokeWidth="1.5" />
            <rect x="105" y="158" width="190" height="6" fill="#cbd5e1" rx="2" pointerEvents="none" />
            <rect x="105" y="174" width="190" height="6" fill="#cbd5e1" rx="2" pointerEvents="none" />
            <rect x="105" y="190" width="190" height="6" fill="#cbd5e1" rx="2" pointerEvents="none" />
            <circle cx="200" cy="182" r="10" fill="#cbd5e1" stroke="#475569" strokeWidth="1.5" pointerEvents="none" />
            <polygon points="196,182 200,175 204,182 200,189" fill="#1e293b" pointerEvents="none" />
          </g>

          {/* Faróis */}
          <g {...getPartProps('truck-f-light-left', 'Farol Dianteiro Esquerdo')}>
            <rect x="48" y="243" width="48" height="24" rx="4" fill="#0f172a" stroke="#334155" strokeWidth="1.5" />
            <rect x="52" y="246" width="30" height="18" rx="2" fill="url(#metal-glass)" opacity="0.9" pointerEvents="none" />
            <circle cx="62" cy="255" r="5" fill="#fef08a" opacity="0.9" pointerEvents="none" />
            <circle cx="74" cy="255" r="5" fill="#fef08a" opacity="0.9" pointerEvents="none" />
            <path d="M50,262 L92,262" stroke="#38bdf8" strokeWidth="2" strokeLinecap="round" pointerEvents="none" />
          </g>
          <g {...getPartProps('truck-f-light-right', 'Farol Dianteiro Direito')}>
            <rect x="304" y="243" width="48" height="24" rx="4" fill="#0f172a" stroke="#334155" strokeWidth="1.5" />
            <rect x="318" y="246" width="30" height="18" rx="2" fill="url(#metal-glass)" opacity="0.9" pointerEvents="none" />
            <circle cx="328" cy="255" r="5" fill="#fef08a" opacity="0.9" pointerEvents="none" />
            <circle cx="340" cy="255" r="5" fill="#fef08a" opacity="0.9" pointerEvents="none" />
            <path d="M308,262 L350,262" stroke="#38bdf8" strokeWidth="2" strokeLinecap="round" pointerEvents="none" />
          </g>

          {/* Retrovisores */}
          <g {...getPartProps('truck-f-mirror-left', 'Retrovisor Principal Esquerdo')}>
            <path d="M78,80 Q35,68 45,95" fill="none" stroke="#1e293b" strokeWidth="3.5" />
            <rect x="38" y="85" width="14" height="42" rx="3" fill="#0f172a" stroke="#334155" />
            <rect x="40" y="87" width="10" height="38" fill="url(#metal-glass)" opacity="0.75" pointerEvents="none" />
          </g>
          <g {...getPartProps('truck-f-mirror-right', 'Retrovisor Principal Direito')}>
            <path d="M322,80 Q365,68 355,95" fill="none" stroke="#1e293b" strokeWidth="3.5" />
            <rect x="348" y="85" width="14" height="42" rx="3" fill="#0f172a" stroke="#334155" />
            <rect x="350" y="87" width="10" height="38" fill="url(#metal-glass)" opacity="0.75" pointerEvents="none" />
          </g>

          {/* Para-choque */}
          <path {...getPartProps('truck-f-bumper', 'Para-choque Dianteiro')} d="M40,240 L360,240 L350,272 L50,272 Z" fill="url(#metal-car-blue)" stroke="#1e293b" strokeWidth="1.5" filter="url(#part-shadow)" />
          <path d="M40,240 L360,240 L350,272 L50,272 Z" fill="url(#gloss-reflex)" stroke="none" pointerEvents="none" />
          
          <g pointerEvents="none">
            <rect x="175" y="248" width="50" height="15" rx="1.5" fill="#f8fafc" stroke="#1e293b" strokeWidth="1" />
            <rect x="176" y="249" width="48" height="3" fill="#3b82f6" />
            <text x="200" y="260" fontFamily="monospace" fontSize="8" fontWeight="bold" fill="#000" textAnchor="middle" letterSpacing="1">AAA0A00</text>
            <rect x="90" y="248" width="16" height="8" rx="1" fill="#fef08a" opacity="0.8" />
            <rect x="294" y="248" width="16" height="8" rx="1" fill="#fef08a" opacity="0.8" />
          </g>
        </g>
        {!isBlueprintMode && <LowPolyLayer width={400} height={300} seed="truck-front" />}
        <VehicleRealismLayer width={400} height={300} profile="truck" view="front" />
        <BlueprintDimensionLayer svgRef={svgRef as React.RefObject<SVGSVGElement>} isActive={!!isBlueprintMode} view="front" />
      </svg>
    </BlueprintContainer>
  );
};

export default TruckFrontal;
