import React, { useState } from 'react';
import { Share2, Copy, ChevronDown, ChevronUp } from 'lucide-react';
import { Header } from './Header';

export const Videos: React.FC = () => {
  const [playingVideoIdx, setPlayingVideoIdx] = useState<number | null>(null);
  const [expandedVideoIdx, setExpandedVideoIdx] = useState<number | null>(null);
  
  const videos = [
    {
      id: 'VIjKagjinSA',
      si: 'umfbZItERbd-lX7p',
      title: 'Guia de Inspeções de Saúde para concessão de Benefícios para Agentes Médico-Periciais',
      duration: '10:45',
      description: 'Orientações detalhadas sobre as Inspeções de Saúde para a concessão de benefícios previstos na Marinha do Brasil, focado em normativas e procedimentos.',
    },
    {
      id: 'VIjKagjinSA',
      si: 'wYsKTM5VQ63c8FFJ',
      title: 'Aspectos Normativos e Técnicos das Inspeções de Saúde para Concessão de Benefícios',
      duration: '8:30',
      description: 'Vídeo complementar detalhando procedimentos legais, médicos e normativas vigentes sobre doenças previstas em lei aplicáveis ao contexto da Marinha.',
    }
  ];

  const handlePlayVideo = (idx: number) => {
    setPlayingVideoIdx(idx);
  };
  
  const toggleExpand = (idx: number) => {
    setExpandedVideoIdx(expandedVideoIdx === idx ? null : idx);
  };

  const shareVideo = async (id: string) => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: 'Vídeo da Marinha',
          url: `https://youtube.com/watch?v=${id}`
        });
      } else {
        await navigator.clipboard.writeText(`https://youtube.com/watch?v=${id}`);
        alert('Link copiado para a área de transferência!');
      }
    } catch (err) {
      console.error(err);
    }
  };

  const copyLink = async (id: string) => {
    try {
      await navigator.clipboard.writeText(`https://youtube.com/watch?v=${id}`);
      alert('Link copiado para a área de transferência!');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="flex flex-col h-full bg-gray-50">
      <Header title="Vídeos" />
      <div className="p-4 space-y-6 overflow-y-auto w-full max-w-full">
        {videos.map((video, idx) => (
          <div key={idx} className="bg-white rounded-2xl shadow-[0px_1px_2px_0px_rgba(0,0,0,0.3),0px_1px_3px_1px_rgba(0,0,0,0.15)] overflow-hidden flex flex-col w-full">
            {/* Imagem do Vídeo */}
            <div className="w-full aspect-video bg-black relative">
              {playingVideoIdx === idx ? (
                <iframe 
                  className="w-full h-full"
                  src={`https://www.youtube.com/embed/${video.id}?si=${video.si}&autoplay=1`} 
                  title={video.title}
                  frameBorder="0" 
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                  referrerPolicy="strict-origin-when-cross-origin" 
                  allowFullScreen
                ></iframe>
              ) : (
                <div 
                  className="absolute inset-0 cursor-pointer group flex items-center justify-center bg-gray-900"
                  onClick={() => handlePlayVideo(idx)}
                >
                  <img 
                    src={`https://img.youtube.com/vi/${video.id}/hqdefault.jpg`} 
                    alt={`Thumbnail de ${video.title}`} 
                    className="absolute inset-0 w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors" />
                  <div className="relative z-10 w-12 h-12 bg-black/60 rounded-full flex items-center justify-center backdrop-blur-sm group-hover:bg-red-600 transition-colors">
                    <svg className="w-6 h-6 text-white fill-current ml-1" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                  </div>
                </div>
              )}
            </div>

            {/* Content Area - Material Design 3 */}
            <div 
              className="p-4 flex flex-col cursor-pointer hover:bg-gray-50 transition-colors"
              onClick={() => toggleExpand(idx)}
            >
              <div className="flex justify-between items-start">
                <div className="flex-1 pr-2">
                  {/* Headline */}
                  <h3 className="text-sm font-heading font-medium text-gray-900">
                    {video.title}
                  </h3>
                  
                  {/* Subhead */}
                  <div className="flex items-center text-sm font-body text-gray-600 mt-1">
                    <span>{video.duration}</span>
                  </div>
                </div>
                <div className="pt-1 text-gray-500">
                  {expandedVideoIdx === idx ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
                </div>
              </div>
              
              {/* Expandable Area */}
              {expandedVideoIdx === idx && (
                <div className="mt-3 animate-fade-in cursor-default" onClick={(e) => e.stopPropagation()}>
                  {/* Supporting text */}
                  <p className="text-sm font-body text-gray-700 leading-relaxed bg-blue-50/50 p-3 rounded-lg border border-blue-100">
                    {video.description}
                  </p>
                  
                  {/* Actions */}
                  <div className="flex justify-end items-center gap-1 mt-2">
                    <button 
                      onClick={() => copyLink(video.id)}
                      className="p-2 rounded-full hover:bg-navy/10 text-navy transition-colors focus:outline-none flex items-center justify-center w-10 h-10"
                      aria-label="Copiar link"
                      title="Copiar link"
                    >
                      <Copy size={20} />
                    </button>
                    <button 
                      onClick={() => shareVideo(video.id)}
                      className="p-2 rounded-full hover:bg-navy/10 text-navy transition-colors focus:outline-none flex items-center justify-center w-10 h-10"
                      aria-label="Compartilhar"
                      title="Compartilhar"
                    >
                      <Share2 size={20} />
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
