
import React, { useEffect, useRef } from 'react';

interface WaveVisualizerProps {
  isConnected: boolean;
  isSpeaking: boolean;
  volume: number; 
}

export const WaveVisualizer: React.FC<WaveVisualizerProps> = ({ isConnected, isSpeaking, volume }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    let animationFrameId: number;
    let phase = 0;

    const render = () => {
        const w = canvas.parentElement?.clientWidth || 300;
        const h = canvas.parentElement?.clientHeight || 300;
        if (canvas.width !== w || canvas.height !== h) {
          canvas.width = w;
          canvas.height = h;
        }
        
        const centerX = w / 2;
        const centerY = h / 2;
        const baseRadius = Math.min(w, h) * 0.25;
        const volScale = (volume / 255);
        
        ctx.clearRect(0, 0, w, h);
        
        if (!isConnected) {
            ctx.beginPath();
            ctx.arc(centerX, centerY, baseRadius, 0, Math.PI * 2);
            ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
            ctx.setLineDash([2, 8]);
            ctx.stroke();
            return;
        }

        phase += isSpeaking ? 0.04 + volScale * 0.05 : 0.01;

        // Simplified Organic Rings
        for (let i = 0; i < 3; i++) {
          ctx.beginPath();
          const r = baseRadius + (i * 20) + (isSpeaking ? volScale * 40 : 0);
          
          for (let angle = 0; angle < Math.PI * 2; angle += 0.05) {
            const distortion = Math.sin(angle * (4 + i) + phase) * (isSpeaking ? volScale * 30 : 5);
            const x = centerX + Math.cos(angle) * (r + distortion);
            const y = centerY + Math.sin(angle) * (r + distortion) * 0.7; 
            
            if (angle === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
          }
          
          ctx.closePath();
          ctx.strokeStyle = isSpeaking 
            ? `rgba(56, 189, 248, ${0.8 - (i * 0.2)})` 
            : `rgba(255, 255, 255, ${0.1 - (i * 0.03)})`;
          ctx.lineWidth = 2;
          ctx.stroke();
        }

        // Plasma Core
        const coreR = 10 + (isSpeaking ? volScale * 25 : 0);
        const coreGrad = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, coreR * 2);
        coreGrad.addColorStop(0, '#fff');
        coreGrad.addColorStop(0.5, '#0ea5e9');
        coreGrad.addColorStop(1, 'transparent');
        
        ctx.beginPath();
        ctx.arc(centerX, centerY, coreR * 1.5, 0, Math.PI * 2);
        ctx.fillStyle = coreGrad;
        ctx.fill();
        
        animationFrameId = requestAnimationFrame(render);
    };
    
    render();
    return () => cancelAnimationFrame(animationFrameId);
  }, [isConnected, isSpeaking, volume]);
  
  return <canvas ref={canvasRef} className="w-full h-full" />;
};
