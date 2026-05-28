import React from 'react';
import { VehicleProps } from './types';
import { createVehiclePartProps } from './partProps';
import VehicleRealismLayer from './VehicleRealismLayer';
import BlueprintContainer from './BlueprintContainer';
import BlueprintDimensionLayer from './BlueprintDimensionLayer';
import LowPolyLayer from './LowPolyLayer';

const VanTraseira: React.FC<VehicleProps> = ({
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
        aria-label="Van Traseira"
        className={isBlueprintMode ? 'blueprint-svg' : ''}
      >
        <g className="vehicle-zones">
          {/* Sombra */}
          <ellipse cx="200" cy="275" rx="150" ry="10" fill="rgba(2, 6, 23, 0.55)" filter="blur(8px)" pointerEvents="none" />     

          {/* Pneus */}
          <g pointerEvents="none">
            <rect x="65" y="230" width="28" height="40" rx="3" fill="#0f172a" />
            <rect x="307" y="230" width="28" height="40" rx="3" fill="#0f172a" />
            <rect x="62" y="242" width="34" height="15" fill="#0f172a" opacity="0.9" />
            <rect x="304" y="242" width="34" height="15" fill="#0f172a" opacity="0.9" />
          </g>

          {/* Carroceria */}
          <g {...getPartProps('van-r-body', 'Portas Traseiras / Lataria')}>
            <rect x="50" y="40" width="300" height="205" rx="14" fill="url(#metal-car-blue)" stroke="#090d16" strokeWidth="1.8" />
            <rect x="44" y="65" width="8" height="14" rx="1.5" fill="#0f172a" pointerEvents="none" />
            <rect x="44" y="195" width="8" height="14" rx="1.5" fill="#0f172a" pointerEvents="none" />
            <rect x="348" y="65" width="8" height="14" rx="1.5" fill="#0f172a" pointerEvents="none" />
            <rect x="348" y="195" width="8" height="14" rx="1.5" fill="#0f172a" pointerEvents="none" />
          </g>

          {/* Vidros */}
          <g {...getPartProps('van-r-window-left', 'Vidro Traseiro Esquerdo')}>
            <rect x="65" y="55" width="125" height="65" rx="5" fill="url(#metal-glass)" stroke="#0f172a" strokeWidth="1.5" opacity="0.85" />
            <g pointerEvents="none" opacity="0.3">
              <line x1="70" y1="68" x2="185" y2="68" stroke="#f97316" strokeWidth="0.8" />
              <line x1="70" y1="78" x2="185" y2="78" stroke="#f97316" strokeWidth="0.8" />
              <line x1="70" y1="88" x2="185" y2="88" stroke="#f97316" strokeWidth="0.8" />
              <line x1="70" y1="98" x2="185" y2="98" stroke="#f97316" strokeWidth="0.8" />
              <line x1="70" y1="108" x2="185" y2="108" stroke="#f97316" strokeWidth="0.8" />
            </g>
          </g>

          <g {...getPartProps('van-r-window-right', 'Vidro Traseiro Direito')}>
            <rect x="210" y="55" width="125" height="65" rx="5" fill="url(#metal-glass)" stroke="#0f172a" strokeWidth="1.5" opacity="0.85" />
            <g pointerEvents="none" opacity="0.3">
              <line x1="215" y1="68" x2="330" y2="68" stroke="#f97316" strokeWidth="0.8" />
              <line x1="215" y1="78" x2="330" y2="78" stroke="#f97316" strokeWidth="0.8" />
              <line x1="215" y1="88" x2="330" y2="88" stroke="#f97316" strokeWidth="0.8" />
              <line x1="215" y1="98" x2="330" y2="98" stroke="#f97316" strokeWidth="0.8" />
              <line x1="215" y1="108" x2="330" y2="108" stroke="#f97316" strokeWidth="0.8" />
            </g>
          </g>

          <g pointerEvents="none">
            <line x1="200" y1="40" x2="200" y2="242" stroke="#0f172a" strokeWidth="2.5" />
            <rect x="188" y="145" width="10" height="20" rx="2" fill="#0f172a" stroke="#cbd5e1" strokeWidth="0.5" />
            <circle cx="193" cy="150" r="1.5" fill="#94a3b8" />
          </g>

          {/* Lanternas */}
          <g {...getPartProps('van-r-light-left', 'Lanterna Traseira Esquerda')}>
            <rect x="53" y="130" width="12" height="75" rx="2.5" fill="#121824" stroke="#334155" strokeWidth="1" />
            <rect x="55" y="132" width="8" height="38" rx="1.5" fill="#ef4444" opacity="0.9" pointerEvents="none" />
            <rect x="55" y="172" width="8" height="18" rx="1.5" fill="#f97316" opacity="0.9" pointerEvents="none" />
            <rect x="55" y="192" width="8" height="11" rx="1.5" fill="#f8fafc" opacity="0.9" pointerEvents="none" />
          </g>

          <g {...getPartProps('van-r-light-right', 'Lanterna Traseira Direito')}>
            <rect x="335" y="130" width="12" height="75" rx="2.5" fill="#121824" stroke="#334155" strokeWidth="1" />
            <rect x="337" y="132" width="8" height="38" rx="1.5" fill="#ef4444" opacity="0.9" pointerEvents="none" />
            <rect x="337" y="172" width="8" height="18" rx="1.5" fill="#f97316" opacity="0.9" pointerEvents="none" />
            <rect x="337" y="192" width="8" height="11" rx="1.5" fill="#f8fafc" opacity="0.9" pointerEvents="none" />
          </g>

          {/* Para-choque */}
          <g {...getPartProps('van-r-bumper', 'Para-choque Traseiro')}>
            <path d="M40,240 L360,240 C360,240 355,268 340,268 L60,268 C45,268 40,240 40,240 Z" fill="#1e293b" stroke="#0f172a" strokeWidth="1.8" />
            <rect x="120" y="240" width="160" height="10" fill="#0f172a" pointerEvents="none" />
            <line x1="130" y1="245" x2="270" y2="245" stroke="#334155" strokeWidth="1.5" strokeDasharray="4,4" pointerEvents="none" />
            <g pointerEvents="none">
              <rect x="170" y="248" width="60" height="14" rx="1.5" fill="#f8fafc" stroke="#1e293b" strokeWidth="1" />
              <rect x="171" y="249" width="58" height="3" fill="#3b82f6" />
              <text x="200" y="258" fontFamily="monospace" fontSize="9" fontWeight="900" fill="#000" textAnchor="middle" letterSpacing="1.2">AAA0A00</text>
            </g>
            <rect x="52" y="246" width="16" height="6" rx="1" fill="#ef4444" pointerEvents="none" />
            <rect x="332" y="246" width="16" height="6" rx="1" fill="#ef4444" pointerEvents="none" />
          </g>
        </g>
        {!isBlueprintMode && <LowPolyLayer width={400} height={300} seed="van-rear" />}
        <VehicleRealismLayer width={400} height={300} profile="van" view="rear" />
        <BlueprintDimensionLayer svgRef={svgRef as React.RefObject<SVGSVGElement>} isActive={!!isBlueprintMode} view="rear" />
      </svg>
    </BlueprintContainer>
  );
};

export default VanTraseira;
