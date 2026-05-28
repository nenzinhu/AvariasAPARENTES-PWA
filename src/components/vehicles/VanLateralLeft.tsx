import React from 'react';
import { VehicleProps } from './types';
import { createVehiclePartProps } from './partProps';
import VehicleRealismLayer from './VehicleRealismLayer';
import BlueprintContainer from './BlueprintContainer';
import BlueprintDimensionLayer from './BlueprintDimensionLayer';
import LowPolyLayer from './LowPolyLayer';

const VanLateralLeft: React.FC<VehicleProps> = ({
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
    <BlueprintContainer isActive={!!isBlueprintMode} width="100%" height={220 * (600/520)}>
      <svg
        ref={svgRef}
        viewBox="0 0 520 220"
        width="100%"
        role="img"
        aria-label="Van Lateral Esquerda"
        className={isBlueprintMode ? 'blueprint-svg' : ''}
      >
        <g className="vehicle-zones">
          {/* Sombra */}
          <ellipse cx="260" cy="188" rx="220" ry="11" fill="rgba(2, 6, 23, 0.55)" filter="blur(8px)" pointerEvents="none" />
          
          {/* Suspensão */}
          <g pointerEvents="none">
            <rect x="110" y="145" width="20" height="15" fill="#1e293b" />
            <rect x="390" y="145" width="20" height="15" fill="#1e293b" />
          </g>

          {/* Rodas */}
          <g pointerEvents="none">
            <circle cx="120" cy="155" r="32" fill="url(#radial-wheel)" />
            <circle cx="120" cy="155" r="29" fill="none" stroke="#000" strokeWidth="2.2" strokeDasharray="5,5" opacity="0.8" />
            <circle cx="120" cy="155" r="21" fill="url(#radial-calota)" stroke="#475569" strokeWidth="0.8" />
            <path d="M120,155 L120,134 M120,155 L141,155 M120,155 L120,176 M120,155 L99,155 M120,155 L135,140 M120,155 L105,170 M120,155 L135,170 M120,155 L105,140" stroke="#cbd5e1" strokeWidth="1.8" />
            <circle cx="120" cy="155" r="8" fill="#334155" stroke="#1e293b" strokeWidth="1" />
            <circle cx="120" cy="155" r="3" fill="#cbd5e1" />
            
            <circle cx="400" cy="155" r="32" fill="url(#radial-wheel)" />
            <circle cx="400" cy="155" r="29" fill="none" stroke="#000" strokeWidth="2.2" strokeDasharray="5,5" opacity="0.8" />
            <circle cx="400" cy="155" r="21" fill="url(#radial-calota)" stroke="#475569" strokeWidth="0.8" />
            <path d="M400,155 L400,134 M400,155 L421,155 M400,155 L400,176 M400,155 L379,155 M400,155 L415,140 M400,155 L385,170 M400,155 L415,170 M400,155 L385,140" stroke="#cbd5e1" strokeWidth="1.8" />
            <circle cx="400" cy="155" r="8" fill="#334155" stroke="#1e293b" strokeWidth="1" />
            <circle cx="400" cy="155" r="3" fill="#cbd5e1" />
          </g>
          <circle {...getPartProps('van-ll-wheel-front', 'Roda Dianteira Esquerda')} cx="120" cy="155" r="32" />
          <circle {...getPartProps('van-ll-wheel-rear', 'Roda Traseira Esquerda')} cx="400" cy="155" r="32" />

          {/* Teto */}
          <path {...getPartProps('van-ll-roof', 'Teto da Van')} d="M225,50 L465,50 C468,50 472,52 472,56 L472,62 L225,62 Z" fill="url(#metal-car-blue)" filter="url(#part-shadow)" />
          <path d="M225,50 L465,50 C468,50 472,52 472,56 L472,62 L225,62 Z" fill="url(#gloss-reflex)" pointerEvents="none" />

          {/* Soleira */}
          <path {...getPartProps('van-ll-sill', 'Soleira da Van')} d="M152,160 L418,160 L418,168 L152,168 Z" fill="#1e293b" filter="url(#part-shadow)" />
          <path d="M152,160 L418,160 L418,168 L152,168 Z" fill="url(#gloss-reflex)" pointerEvents="none" />

          {/* Para-lamas */}
          <path {...getPartProps('van-ll-fender-front', 'Para-lama Dianteiro')} d="M45,120 L160,120 L160,82 L70,82 C55,82 45,95 45,120 Z" fill="url(#metal-car-blue)" filter="url(#part-shadow)" />
          <path d="M45,120 L160,120 L160,82 L70,82 C55,82 45,95 45,120 Z" fill="url(#gloss-reflex)" pointerEvents="none" />
          <path {...getPartProps('van-ll-fender-rear', 'Para-lama Traseiro')} d="M418,82 L475,82 C480,82 485,92 482,120 L418,120 Z" fill="url(#metal-car-blue)" filter="url(#part-shadow)" />
          <path d="M418,82 L475,82 C480,82 485,92 482,120 L418,120 Z" fill="url(#gloss-reflex)" pointerEvents="none" />

          {/* Porta Dianteira */}
          <g {...getPartProps('van-ll-door-front', 'Porta Dianteira Esquerda')}>
            <path d="M160,82 L255,82 L255,160 L160,160 Z" fill="url(#metal-car-blue)" stroke="#090d16" strokeWidth="1.5" />
            <rect x="238" y="112" width="12" height="5" rx="1" fill="#0f172a" stroke="#cbd5e1" strokeWidth="0.5" pointerEvents="none" />
            <rect x="165" y="98" width="6" height="3" rx="0.5" fill="#f97316" pointerEvents="none" />
          </g>

          {/* Painel Lateral */}
          <g {...getPartProps('van-ll-panel-side', 'Painel Lateral / Porta Corrediça')}>
            <path d="M255,82 L418,82 L418,160 L255,160 Z" fill="url(#metal-car-blue)" stroke="#090d16" strokeWidth="1.5" />
            <line x1="255" y1="120" x2="418" y2="120" stroke="#0f172a" strokeWidth="1.8" pointerEvents="none" opacity="0.6" />
            <rect x="264" y="110" width="5" height="15" rx="1.5" fill="#0f172a" stroke="#cbd5e1" strokeWidth="0.5" pointerEvents="none" />
          </g>

          {/* Vidros */}
          <g {...getPartProps('van-ll-glass-front', 'Vidro Dianteiro')}>
            <path d="M165,82 L165,65 Q165,62 170,62 L220,62 L250,82 Z" fill="url(#metal-glass)" opacity="0.8" stroke="#090d16" strokeWidth="1.2" />
            <line x1="185" y1="62" x2="185" y2="82" stroke="#000" strokeWidth="2.5" pointerEvents="none" />
            <path d="M170,62 L190,62 L195,82 L175,82 Z" fill="#fff" opacity="0.25" pointerEvents="none" />
          </g>

          <g {...getPartProps('van-ll-glass-side', 'Vidro Lateral do Salão')}>
            <path d="M258,82 L258,62 L415,62 L415,82 Z" fill="url(#metal-glass)" opacity="0.85" stroke="#090d16" strokeWidth="1.2" />
            <line x1="335" y1="62" x2="335" y2="82" stroke="#0f172a" strokeWidth="3" pointerEvents="none" />
            <path d="M280,62 L310,62 L300,82 L270,82 Z" fill="#fff" opacity="0.18" pointerEvents="none" />
            <path d="M355,62 L385,62 L375,82 L345,82 Z" fill="#fff" opacity="0.18" pointerEvents="none" />
          </g>

          {/* Retrovisor */}
          <g {...getPartProps('van-ll-mirror', 'Retrovisor Esquerdo')}>
            <path d="M160,86 L148,88 L148,82 Z" fill="#0f172a" />
            <rect x="142" y="72" width="8" height="18" rx="2.5" fill="#1e293b" stroke="#0f172a" strokeWidth="1" />
            <rect x="143" y="73" width="5" height="16" rx="1.5" fill="url(#metal-glass)" opacity="0.75" pointerEvents="none" />
          </g>

          {/* Trilho */}
          <g pointerEvents="none">
            <line x1="255" y1="84" x2="445" y2="84" stroke="#0f172a" strokeWidth="2.5" />
            <line x1="255" y1="84" x2="445" y2="84" stroke="#cbd5e1" strokeWidth="0.8" opacity="0.4" />
          </g>
        </g>
        {!isBlueprintMode && <LowPolyLayer width={520} height={220} seed="van-lateral-left" />}
        <VehicleRealismLayer width={520} height={220} profile="van" view="lateral" />
        <BlueprintDimensionLayer svgRef={svgRef as React.RefObject<SVGSVGElement>} isActive={!!isBlueprintMode} view="lateral-left" />
      </svg>
    </BlueprintContainer>
  );
};

export default VanLateralLeft;
