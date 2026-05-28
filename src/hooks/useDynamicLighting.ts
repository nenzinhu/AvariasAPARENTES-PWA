import { useState, useEffect, useCallback } from 'react';
import * as d3 from 'd3';

interface LightPosition {
  x: number;
  y: number;
}

export const useDynamicLighting = (containerRef: React.RefObject<SVGSVGElement>) => {
  const [lightPos, setLightPosition] = useState<LightPosition>({ x: 50, y: 50 });

  const handleMouseMove = useCallback((event: MouseEvent) => {
    if (!containerRef.current) return;

    const svg = d3.select(containerRef.current);
    const [mx, my] = d3.pointer(event, containerRef.current);
    const node = containerRef.current;
    const { width, height } = node.viewBox.baseVal;

    // Normalizar coordenadas para porcentagem (0-100) para gradientes
    const x = (mx / node.clientWidth) * 100;
    const y = (my / node.clientHeight) * 100;

    // Aplicar interpolação sutil para evitar saltos
    setLightPosition({ x, y });

    // Atualizar variáveis CSS diretamente para máxima performance (evitando re-renders pesados)
    node.style.setProperty('--light-x', `${x}%`);
    node.style.setProperty('--light-y', `${y}%`);
  }, [containerRef]);

  useEffect(() => {
    const node = containerRef.current;
    if (!node) return;

    node.addEventListener('mousemove', handleMouseMove);
    return () => node.removeEventListener('mousemove', handleMouseMove);
  }, [containerRef, handleMouseMove]);

  return lightPos;
};
