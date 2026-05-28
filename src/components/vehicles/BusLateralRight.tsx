import React from 'react';
import { VehicleProps } from './types';
import { createVehiclePartProps } from './partProps';
import VehicleRealismLayer from './VehicleRealismLayer';
import BlueprintContainer from './BlueprintContainer';
import BlueprintDimensionLayer from './BlueprintDimensionLayer';
import LowPolyLayer from './LowPolyLayer';

const BusLateralRight: React.FC<VehicleProps> = ({
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
    <BlueprintContainer isActive={!!isBlueprintMode} width="100%" height={220 * (600/600)}>
      <svg
        ref={svgRef}
        viewBox="0 0 600 220"
        width="100%"
        role="img"
        aria-label="Ônibus Lateral Direita"
        className={isBlueprintMode ? 'blueprint-svg' : ''}
      >
        <g className="vehicle-zones">
          {/* Sombra */}
          <ellipse cx="300" cy="200" rx="275" ry="12" fill="rgba(2, 6, 23, 0.55)" filter="blur(8px)" pointerEvents="none" />
          
          {/* Rodas */}
          <g pointerEvents="none">
            <circle cx="480" cy="165" r="31" fill="url(#radial-wheel)" />
            <circle cx="480" cy="165" r="28" fill="none" stroke="#000" strokeWidth="2.5" strokeDasharray="6,6" opacity="0.8" />
            <circle cx="480" cy="165" r="20" fill="url(#radial-calota)" stroke="#475569" strokeWidth="1" />
            <circle cx="480" cy="165" r="14" fill="#1e293b" />
            <circle cx="480" cy="165" r="10" fill="none" stroke="#e2e8f0" strokeWidth="2" strokeDasharray="3,3" />
            <circle cx="480" cy="165" r="4" fill="#cbd5e1" />
          </g>
          <circle {...getPartProps('bus-rr-wheel-front', 'Roda Dianteira Direita')} cx="480" cy="165" r="31" />

          <g pointerEvents="none">
            <circle cx="125" cy="165" r="31" fill="#090d16" />
            <circle cx="118" cy="165" r="31" fill="url(#radial-wheel)" />
            <circle cx="118" cy="165" r="28" fill="none" stroke="#000" strokeWidth="2.5" strokeDasharray="6,6" opacity="0.8" />
            <circle cx="118" cy="165" r="20" fill="url(#radial-calota)" stroke="#475569" strokeWidth="1" />
            <rect x="113" y="160" width="10" height="10" rx="2" fill="#334155" stroke="#1e293b" strokeWidth="1" />
            <circle cx="118" cy="165" r="4" fill="#cbd5e1" />
          </g>
          <circle {...getPartProps('bus-rr-wheel-rear-1', 'Roda Traseira Direita (Tração)')} cx="118" cy="165" r="31" />

          <g pointerEvents="none">
            <circle cx="185" cy="165" r="31" fill="url(#radial-wheel)" />
            <circle cx="185" cy="165" r="28" fill="none" stroke="#000" strokeWidth="2.5" strokeDasharray="6,6" opacity="0.8" />
            <circle cx="185" cy="165" r="20" fill="url(#radial-calota)" stroke="#475569" strokeWidth="1" />
            <circle cx="185" cy="165" r="14" fill="#1e293b" />
            <circle cx="185" cy="165" r="10" fill="none" stroke="#e2e8f0" strokeWidth="2" strokeDasharray="3,3" />
            <circle cx="185" cy="165" r="4" fill="#cbd5e1" />
          </g>
          <circle {...getPartProps('bus-rr-wheel-rear-2', 'Roda Traseira Direita (Auxiliar)')} cx="185" cy="165" r="31" />

          {/* Carroceria */}
          <path {...getPartProps('bus-lr-body', 'Carroceria / Lateral')} d="M560,30 L50,30 C42,30 38,35 38,42 L38,162 C38,168 42,172 50,172 L92,172 Q92,135 128,135 Q164,135 164,172 L205,172 Q205,135 240,135 Q275,135 275,172 L454,172 Q454,135 490,135 Q526,135 526,172 L555,172 C559,172 560,168 560,162 L560,42 C560,35 559,30 560,30 Z" fill="url(#grad-metal)" filter="url(#part-shadow)" />
          <path d="M560,30 L50,30 C42,30 38,35 38,42 L38,162 C38,168 42,172 50,172 L92,172 Q92,135 128,135 Q164,135 164,172 L205,172 Q205,135 240,135 Q275,135 275,172 L454,172 Q454,135 490,135 Q526,135 526,172 L555,172 C559,172 560,168 560,162 L560,42 C560,35 559,30 560,30 Z" fill="url(#gloss-reflex)" pointerEvents="none" />

          <g pointerEvents="none">
            <rect x="40" y="32" width="518" height="63" rx="8" fill="#0f172a" opacity="0.9" />
            <line x1="38" y1="95" x2="560" y2="95" stroke="#94a3b8" strokeWidth="2.5" />
            <line x1="40" y1="130" x2="558" y2="130" stroke="#1e293b" strokeWidth="1.5" />
            <rect x="47" y="115" width="28" height="42" rx="3" fill="#121824" stroke="#334155" strokeWidth="1" />
            <line x1="50" y1="120" x2="72" y2="120" stroke="#1e293b" strokeWidth="1.5" />
            <line x1="50" y1="125" x2="72" y2="125" stroke="#1e293b" strokeWidth="1.5" />
            <line x1="50" y1="130" x2="72" y2="130" stroke="#1e293b" strokeWidth="1.5" />
            <line x1="50" y1="135" x2="72" y2="135" stroke="#1e293b" strokeWidth="1.5" />
            <line x1="50" y1="140" x2="72" y2="140" stroke="#1e293b" strokeWidth="1.5" />
            <line x1="50" y1="145" x2="72" y2="145" stroke="#1e293b" strokeWidth="1.5" />
            <line x1="50" y1="150" x2="72" y2="150" stroke="#1e293b" strokeWidth="1.5" />
            <circle cx="160" cy="130" r="2.5" fill="#f97316" />
            <circle cx="280" cy="130" r="2.5" fill="#f97316" />
            <circle cx="400" cy="130" r="2.5" fill="#f97316" />
            <circle cx="520" cy="130" r="2.5" fill="#f97316" />
            <path d="M560,162 L555,172 L528,172 L528,165" fill="#1e293b" stroke="#090d16" strokeWidth="1" />
            <path d="M38,162 L50,172 L90,172 L90,165" fill="#1e293b" stroke="#090d16" strokeWidth="1" />
          </g>

          {/* Janelas */}
          <g {...getPartProps('bus-lr-windows', 'Janelas dos Passageiros')}>
            <path d="M55,36 L508,36 L508,62 L55,62 Z" fill="url(#metal-glass)" opacity="0.85" stroke="#1e293b" strokeWidth="1" />
            <path d="M210,100 L445,100 L445,124 L210,124 Z" fill="url(#metal-glass)" opacity="0.85" stroke="#1e293b" strokeWidth="1" />
            
            <g pointerEvents="none">
              <line x1="135" y1="36" x2="135" y2="62" stroke="#0f172a" strokeWidth="2.5" />
              <line x1="210" y1="36" x2="210" y2="62" stroke="#0f172a" strokeWidth="2.5" />
              <line x1="285" y1="36" x2="285" y2="62" stroke="#0f172a" strokeWidth="2.5" />
              <line x1="360" y1="36" x2="360" y2="62" stroke="#0f172a" strokeWidth="2.5" />
              <line x1="435" y1="36" x2="435" y2="62" stroke="#0f172a" strokeWidth="2.5" />
              <line x1="290" y1="100" x2="290" y2="124" stroke="#0f172a" strokeWidth="2.5" />
              <line x1="370" y1="100" x2="370" y2="124" stroke="#0f172a" strokeWidth="2.5" />
              <path d="M490,36 L518,36 L488,62 L460,62 Z" fill="#ffffff" opacity="0.15" />
              <path d="M340,36 L378,36 L348,62 L310,62 Z" fill="#ffffff" opacity="0.15" />
              <path d="M190,36 L228,36 L198,62 L160,62 Z" fill="#ffffff" opacity="0.15" />
              <path d="M410,100 L438,100 L418,124 L390,124 Z" fill="#ffffff" opacity="0.15" />
              <path d="M290,100 L318,100 L298,124 L270,124 Z" fill="#ffffff" opacity="0.15" />
            </g>
          </g>

          {/* Parabrisa */}
          <g {...getPartProps('bus-lr-windshield', 'Parabrisa Dianteiro (Lateral)')}>
            <path d="M558,36 L510,36 L510,92 L548,92 C554,92 558,88 558,80 Z" fill="url(#metal-glass)" opacity="0.85" stroke="#1e293b" strokeWidth="1.2" />
            <path d="M555,38 L512,38 L512,90 L548,90 C553,90 555,86 555,80 Z" fill="none" stroke="#000" strokeWidth="1.5" opacity="0.5" pointerEvents="none" />
            <path d="M556,36 L536,36 L548,92 L568,92 Z" fill="#ffffff" opacity="0.25" pointerEvents="none" />
          </g>

          {/* Porta */}
          <g {...getPartProps('bus-lr-door', 'Porta de Passageiros')}>
            <rect x="142" y="96" width="38" height="74" rx="4" fill="url(#grad-metal)" stroke="#0f172a" strokeWidth="2" />
            <rect x="146" y="100" width="13" height="30" rx="2" fill="url(#metal-glass)" stroke="#000" strokeWidth="1.2" opacity="0.85" />
            <rect x="163" y="100" width="13" height="30" rx="2" fill="url(#metal-glass)" stroke="#000" strokeWidth="1.2" opacity="0.85" />
            <rect x="146" y="135" width="13" height="24" rx="2" fill="url(#metal-glass)" stroke="#000" strokeWidth="1.2" opacity="0.85" />
            <rect x="163" y="135" width="13" height="24" rx="2" fill="url(#metal-glass)" stroke="#000" strokeWidth="1.2" opacity="0.85" />
            <line x1="161" y1="96" x2="161" y2="170" stroke="#0f172a" strokeWidth="1.5" pointerEvents="none" />
            <rect x="159" y="130" width="4" height="8" rx="1" fill="#475569" pointerEvents="none" />
          </g>

          {/* Bagageiro */}
          <g {...getPartProps('bus-lr-luggage', 'Bagageiro / Portas de Carga')}>
            <rect x="380" y="130" width="70" height="36" rx="2" fill="url(#grad-metal)" stroke="#1e293b" strokeWidth="1.5" />
            <rect x="306" y="130" width="70" height="36" rx="2" fill="url(#grad-metal)" stroke="#1e293b" strokeWidth="1.5" />
            <rect x="232" y="130" width="70" height="36" rx="2" fill="url(#grad-metal)" stroke="#1e293b" strokeWidth="1.5" />
            <rect x="410" y="134" width="10" height="4" rx="1" fill="#0f172a" stroke="#cbd5e1" strokeWidth="0.5" pointerEvents="none" />
            <rect x="336" y="134" width="10" height="4" rx="1" fill="#0f172a" stroke="#cbd5e1" strokeWidth="0.5" pointerEvents="none" />
            <rect x="262" y="134" width="10" height="4" rx="1" fill="#0f172a" stroke="#cbd5e1" strokeWidth="0.5" pointerEvents="none" />
          </g>
        </g>
        {!isBlueprintMode && <LowPolyLayer width={600} height={220} seed="bus-lateral-right" />}
        <VehicleRealismLayer width={600} height={220} profile="bus" view="lateral" />
        <BlueprintDimensionLayer svgRef={svgRef as React.RefObject<SVGSVGElement>} isActive={!!isBlueprintMode} view="lateral-right" />
      </svg>
    </BlueprintContainer>
  );
};

export default BusLateralRight;
