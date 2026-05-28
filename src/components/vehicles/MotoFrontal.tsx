import React from 'react';
import { VehicleProps } from './types';
import { createVehiclePartProps } from './partProps';
import VehicleRealismLayer from './VehicleRealismLayer';
import BlueprintContainer from './BlueprintContainer';
import BlueprintDimensionLayer from './BlueprintDimensionLayer';
import LowPolyLayer from './LowPolyLayer';

const MotoFrontal: React.FC<VehicleProps> = ({
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
    <BlueprintContainer isActive={!!isBlueprintMode} width="100%" height={300 * (600/300)}>
      <svg
        ref={svgRef}
        viewBox="0 0 300 300"
        width="100%"
        role="img"
        aria-label="Moto Frontal"
        className={isBlueprintMode ? 'blueprint-svg' : ''}
      >
        <g className="vehicle-zones">
          {/* Sombra projetada do veículo */}
          <ellipse cx="150" cy="275" rx="80" ry="10" fill="#000" opacity="0.35" filter="url(#shadow-filter)" />
          
          {/* Guidão Dianteiro */}
          <g {...getPartProps('moto-f-handlebars', 'Guidão Dianteiro')}>
            <path d="M60,65 Q150,85 240,65" fill="none" stroke="#475569" strokeWidth="5" strokeLinecap="round" />
            <rect x="58" y="58" width="22" height="8" rx="2" fill="#0f172a" transform="rotate(-10, 60, 65)" pointerEvents="none" />
            <rect x="220" y="58" width="22" height="8" rx="2" fill="#0f172a" transform="rotate(10, 240, 65)" pointerEvents="none" />
            <path d="M70,68 L50,62" stroke="#cbd5e1" strokeWidth="2.5" pointerEvents="none" />
            <path d="M230,68 L250,62" stroke="#cbd5e1" strokeWidth="2.5" pointerEvents="none" />
            <rect x="135" y="70" width="30" height="15" rx="3" fill="#1e293b" stroke="#475569" strokeWidth="1.5" />
            <rect x="138" y="72" width="24" height="11" fill="url(#metal-glass)" opacity="0.8" pointerEvents="none" />
          </g>

          {/* Espelhos */}
          <g pointerEvents="none">
            <path d="M90,70 Q80,50 82,42" fill="none" stroke="#475569" strokeWidth="2" />
            <ellipse cx="82" cy="42" rx="12" ry="7" fill="#1e293b" stroke="#475569" strokeWidth="1.5" transform="rotate(-20, 82, 42)" />
            <ellipse cx="81" cy="42" rx="10" ry="5" fill="url(#metal-glass)" opacity="0.6" transform="rotate(-20, 82, 42)" />
            <path d="M210,70 Q220,50 218,42" fill="none" stroke="#475569" strokeWidth="2" />
            <ellipse cx="218" cy="42" rx="12" ry="7" fill="#1e293b" stroke="#475569" strokeWidth="1.5" transform="rotate(20, 218, 42)" />
            <ellipse cx="219" cy="42" rx="10" ry="5" fill="url(#metal-glass)" opacity="0.6" transform="rotate(20, 218, 42)" />
          </g>

          {/* Farol */}
          <g {...getPartProps('moto-f-headlight', 'Farol Dianteiro')}>
            <ellipse cx="150" cy="100" rx="26" ry="24" fill="#0f172a" stroke="#475569" strokeWidth="2" />
            <ellipse cx="150" cy="100" rx="22" ry="20" fill="url(#metal-glass)" opacity="0.9" />
            <circle cx="150" cy="100" r="12" fill="#fef08a" opacity="0.8" />
            <circle cx="150" cy="100" r="5" fill="#fff" />
            <circle cx="150" cy="100" r="20" fill="none" stroke="#38bdf8" strokeWidth="1.5" opacity="0.5" />
          </g>

          {/* Piscas */}
          <g {...getPartProps('moto-f-turn-left', 'Sinalizador Dianteiro Esquerdo')}>
            <line x1="124" y1="100" x2="98" y2="100" stroke="#1e293b" strokeWidth="4.5" />
            <polygon points="98,97 90,100 98,103" fill="#fb923c" stroke="#d97706" strokeWidth="0.5" />
            <circle cx="94" cy="100" r="1.5" fill="#fff" pointerEvents="none" />
          </g>
          <g {...getPartProps('moto-f-turn-right', 'Sinalizador Dianteiro Direito')}>
            <line x1="176" y1="100" x2="202" y2="100" stroke="#1e293b" strokeWidth="4.5" />
            <polygon points="202,97 210,100 202,103" fill="#fb923c" stroke="#d97706" strokeWidth="0.5" />
            <circle cx="206" cy="100" r="1.5" fill="#fff" pointerEvents="none" />
          </g>

          {/* Para-lama */}
          <path {...getPartProps('moto-f-fender', 'Para-lama Frontal')} d="M120,205 C120,185 180,185 180,205 L186,220 C186,220 170,225 150,225 C130,225 114,220 114,220 Z" fill="url(#metal-moto-dark)" stroke="#1e293b" strokeWidth="1" filter="url(#part-shadow)" />
          <path d="M120,205 C120,185 180,185 180,205 L186,220 C186,220 170,225 150,225 C130,225 114,220 114,220 Z" fill="url(#gloss-reflex)" pointerEvents="none" />

          {/* Garfo */}
          <g {...getPartProps('moto-f-forks', 'Garfo / Amortecedores')}>
            <line x1="126" y1="115" x2="126" y2="245" stroke="#fbbf24" strokeWidth="6.5" />
            <line x1="174" y1="115" x2="174" y2="245" stroke="#fbbf24" strokeWidth="6.5" />
            <line x1="126" y1="205" x2="126" y2="255" stroke="#475569" strokeWidth="4.5" pointerEvents="none" />
            <line x1="174" y1="205" x2="174" y2="255" stroke="#475569" strokeWidth="4.5" pointerEvents="none" />
            <rect x="120" y="85" width="60" height="6" rx="1" fill="#1e293b" pointerEvents="none" />
            <rect x="120" y="112" width="60" height="7" rx="1" fill="#1e293b" pointerEvents="none" />
          </g>

          {/* Roda Dianteira */}
          <g pointerEvents="none">
            <rect x="135" y="210" width="30" height="65" rx="15" fill="url(#radial-wheel)" />
            <rect x="138" y="210" width="24" height="65" rx="12" fill="none" stroke="#1e293b" strokeWidth="1" />
            <path d="M150,215 L150,270" stroke="#000" strokeWidth="2.5" strokeDasharray="8,6" opacity="0.8" />
            <path d="M142,225 L148,230 M158,225 L152,230 M142,245 L148,250 M158,245 L152,250" stroke="#000" strokeWidth="2" opacity="0.8" />
            <circle cx="150" cy="255" r="10" fill="#cbd5e1" stroke="#475569" strokeWidth="1" />
            <circle cx="150" cy="255" r="4" fill="#0f172a" />
          </g>
          <rect {...getPartProps('moto-ff-wheel', 'Roda Dianteira')} x="135" y="210" width="30" height="65" rx="15" />
        </g>
        {!isBlueprintMode && <LowPolyLayer width={300} height={300} seed="moto-front" />}
        <VehicleRealismLayer width={300} height={300} profile="moto" view="front" />
        <BlueprintDimensionLayer svgRef={svgRef as React.RefObject<SVGSVGElement>} isActive={!!isBlueprintMode} view="front" />
      </svg>
    </BlueprintContainer>
  );
};

export default MotoFrontal;
