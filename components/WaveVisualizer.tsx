
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
        const baseRadius = Math.min(w, h) * 0.28;
        const volScale = (volume / 255);
        
        ctx.clearRect(0, 0, w, h);
        
        if (!isConnected) {
            ctx.beginPath();
            ctx.arc(centerX, centerY, baseRadius, 0, Math.PI * 2);
            ctx.strokeStyle = 'rgba(15, 23, 42, 0.05)';
            ctx.setLineDash([4, 12]);
            ctx.lineWidth = 1;
            ctx.stroke();
            return;
        }

        phase += isSpeaking ? 0.04 : 0.005;

        // Render layered organic waves in Blue
        for (let i = 0; i < 4; i++) {
          ctx.beginPath();
          ctx.setLineDash([]);
          const r = baseRadius + (i * 15) + (isSpeaking ? volScale * 60 : 0);
          
          for (let angle = 0; angle < Math.PI * 2; angle += 0.02) {
            const freq = (i + 1) * 2;
            const distortion = Math.sin(angle * freq + phase * (1 + i * 0.2)) * (isSpeaking ? volScale * 45 : 4);
            const x = centerX + Math.cos(angle) * (r + distortion);
            const y = centerY + Math.sin(angle) * (r + distortion) * 0.85; 
            
            if (angle === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
          }
          
          ctx.closePath();
          
          const opacity = isSpeaking 
            ? Math.max(0.2, (1 - i * 0.25) * (volScale * 1.5))
            : (0.15 - i * 0.03);
            
          ctx.strokeStyle = `rgba(37, 99, 235, ${opacity})`;
          ctx.lineWidth = isSpeaking ? 2 : 1;
          ctx.stroke();
        }

        // Clean Intelligence Core
        const coreR = 10 + (isSpeaking ? volScale * 35 : 2);
        const coreGrad = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, coreR * 3);
        
        if (isSpeaking) {
          coreGrad.addColorStop(0, 'rgba(37, 99, 235, 0.8)');
          coreGrad.addColorStop(0.3, 'rgba(37, 99, 235, 0.2)');
          coreGrad.addColorStop(1, 'transparent');
        } else {
          coreGrad.addColorStop(0, 'rgba(37, 99, 235, 0.1)');
          coreGrad.addColorStop(1, 'transparent');
        }
        
        ctx.beginPath();
        ctx.arc(centerX, centerY, coreR * 4, 0, Math.PI * 2);
        ctx.fillStyle = coreGrad;
        ctx.fill();
        
        animationFrameId = requestAnimationFrame(render);
    };
    
    render();
    return () => cancelAnimationFrame(animationFrameId);
  }, [isConnected, isSpeaking, volume]);
  
  return <canvas ref={canvasRef} className="w-full h-full" />;
};
