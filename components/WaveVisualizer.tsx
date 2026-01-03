
import React, { useEffect, useRef } from 'react';

interface WaveVisualizerProps {
  isConnected: boolean;
  isSpeaking: boolean;
  volume: number; 
  isEmergency: boolean;
}

export const WaveVisualizer: React.FC<WaveVisualizerProps> = ({ isConnected, isSpeaking, volume, isEmergency }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    let animationFrameId: number;
    let offset = 0;

    const render = () => {
        const w = canvas.parentElement?.clientWidth || 300;
        const h = canvas.parentElement?.clientHeight || 300;
        if (canvas.width !== w || canvas.height !== h) {
          canvas.width = w;
          canvas.height = h;
        }
        
        ctx.clearRect(0, 0, w, h);
        
        if (!isConnected) {
            ctx.beginPath();
            ctx.moveTo(0, h/2);
            ctx.lineTo(w, h/2);
            ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
            ctx.lineWidth = 1;
            ctx.stroke();
            return;
        }

        offset += isEmergency ? 8 : 4;
        const midY = h / 2;
        const volScale = (volume / 255);

        const drawWave = (color: string, speed: number, amplitude: number, lineWidth: number, opacity: number) => {
          ctx.beginPath();
          ctx.strokeStyle = color;
          ctx.lineWidth = lineWidth;
          ctx.globalAlpha = opacity;
          
          for (let x = 0; x < w; x++) {
            const freq = (isEmergency ? 0.02 : 0.01) + (volScale * 0.03);
            const y = midY + Math.sin((x + offset * speed) * freq) * (amplitude + (volScale * 140));
            if (x === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
          }
          ctx.stroke();
          ctx.globalAlpha = 1;
        };

        const primaryColor = isEmergency ? '#cc0000' : '#0099cc';
        const secondaryColor = isEmergency ? '#ff4444' : '#ffffff';
        const baseColor = isEmergency ? '#800000' : '#003366';

        drawWave(primaryColor, 1, isEmergency ? 20 : 10, 2.5, 0.8);
        drawWave(secondaryColor, 1.5, 5, 1, 0.2);
        drawWave(baseColor, 0.5, 15, 5, 0.3);

        if (isSpeaking) {
          const coreGrad = ctx.createRadialGradient(w/2, h/2, 0, w/2, h/2, 120 + volScale * 240);
          coreGrad.addColorStop(0, isEmergency ? 'rgba(204, 0, 0, 0.1)' : 'rgba(0, 153, 204, 0.08)');
          coreGrad.addColorStop(1, 'transparent');
          ctx.fillStyle = coreGrad;
          ctx.fillRect(0, 0, w, h);
        }

        animationFrameId = requestAnimationFrame(render);
    };
    
    render();
    return () => cancelAnimationFrame(animationFrameId);
  }, [isConnected, isSpeaking, volume, isEmergency]);
  
  return <canvas ref={canvasRef} className="w-full h-full cursor-default" />;
};
