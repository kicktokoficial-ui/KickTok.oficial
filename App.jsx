import React, { useState } from 'react';
import { 
  Heart, MessageCircle, Share2, Music, Video, Zap, Gift, 
  User, Home, Compass, PlusSquare, Sparkles, Send, Flame 
} from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState('feed');
  const [likeCount, setLikeCount] = useState(12400);
  const [isLiked, setIsLiked] = useState(false);
  const [chatMessages, setChatMessages] = useState([
    { id: 1, user: 'Alex_Gamer', text: '¡Increíble jugada! 🔥', color: '#53fc18' },
    { id: 2, user: 'Maria_Dev', text: 'Sube más contenido así 🚀', color: '#38bdf8' }
  ]);
  const [newMessage, setNewMessage] = useState('');

  const toggleLike = () => {
    setIsLiked(!isLiked);
    setLikeCount(prev => isLiked ? prev - 1 : prev + 1);
  };

  const sendMessage = (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;
    setChatMessages([...chatMessages, {
      id: Date.now(),
      user: 'Tú',
      text: newMessage,
      color: '#53fc18'
    }]);
    setNewMessage('');
  };

  return (
    <div className="flex flex-col h-screen bg-black text-white font-sans overflow-hidden">
      {/* Header Superior estilo Kick */}
      <header className="flex items-center justify-between px-4 py-3 border-b border-zinc-800 bg-zinc-950/80 backdrop-blur z-20">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-[#53fc18] rounded-lg flex items-center justify-center font-extrabold text-black text-xl">
            K
          </div>
          <span className="font-bold text-xl tracking-wider text-[#53fc18]">KickTok</span>
        </div>
        <div className="flex items-center space-x-3">
          <button className="flex items-center space-x-1 bg-[#53fc18] text-black px-3 py-1.5 rounded-full text-xs font-extrabold hover:bg-green-400 transition">
            <Zap className="w-4 h-4 fill-black" />
            <span>EN VIVO</span>
          </button>
        </div>
      </header>

      {/* Contenido Principal */}
      <main className="flex-1 relative bg-zinc-900 overflow-hidden">
        {activeTab === 'feed' && (
          <div className="relative h-full w-full flex flex-col justify-end p-4 bg-gradient-to-t from-black/90 via-black/30 to-transparent">
            {/* Fondo simulado del video/stream */}
            <div className="absolute inset-0 bg-zinc-800 flex items-center justify-center -z-10">
              <div className="text-center text-zinc-500">
                <Video className="w-16 h-16 mx-auto mb-2 opacity-40 animate-pulse text-[#53fc18]" />
                <p className="text-sm">Reproduciendo Stream de KickTok</p>
              </div>
            </div>

            {/* Panel de Interacciones Laterales */}
            <div className="absolute right-3 bottom-20 flex flex-col items-center space-y-5 z-10">
              <button onClick={toggleLike} className="flex flex-col items-center group">
                <div className={`p-3 rounded-full bg-zinc-900/80 backdrop-blur border border-zinc-700/50 ${isLiked ? 'text-red-500' : 'text-white'}`}>
                  <Heart className={`w-7 h-7 ${isLiked ? 'fill-red-500' : ''}`} />
                </div>
                <span className="text-xs font-bold mt-1">{likeCount.toLocaleString()}</span>
              </button>

              <button className="flex flex-col items-center">
                <div className="p-3 rounded-full bg-zinc-900/80 backdrop-blur border border-zinc-700/50">
                  <MessageCircle className="w-7 h-7 text-white" />
                </div>
                <span className="text-xs font-bold mt-1">842</span>
              </button>

              <button className="flex flex-col items-center">
                <div className="p-3 rounded-full bg-zinc-900/80 backdrop-blur border border-zinc-700/50">
                  <Gift className="w-7 h-7 text-[#53fc18]" />
                </div>
                <span className="text-xs font-bold mt-1 text-[#53fc18]">Regalar</span>
              </button>

              <button className="flex flex-col items-center">
                <div className="p-3 rounded-full bg-zinc-900/80 backdrop-blur border border-zinc-700/50">
                  <Share2 className="w-7 h-7 text-white" />
                </div>
                <span className="text-xs font-bold mt-1">Compartir</span>
              </button>
            </div>

            {/* Información del Creador y Chat en Vivo */}
            <div className="max-w-[80%] space-y-3 z-10">
              <div className="flex items-center space-x-2">
                <div className="w-10 h-10 rounded-full border-2 border-[#53fc18] bg-zinc-700 flex items-center justify-center font-bold">
                  KT
                </div>
                <div>
                  <h3 className="font-bold text-sm flex items-center gap-1">
                    @streamer_oficial
                    <span className="bg-[#53fc18] text-black text-[10px] px-1.5 py-0.2 rounded font-extrabold">PRO</span>
                  </h3>
                  <p className="text-xs text-zinc-300">¡Bienvenidos al directo especial! 🚀</p>
                </div>
              </div>

              {/* Chat Flotante */}
              <div className="h-28 overflow-y-auto space-y-1 text-xs bg-black/40 backdrop-blur-md p-2 rounded-xl border border-white/10">
                {chatMessages.map((msg) => (
                  <p key={msg.id} className="truncate">
                    <span className="font-bold" style={{ color: msg.color }}>{msg.user}: </span>
                    <span className="text-zinc-200">{msg.text}</span>
                  </p>
                ))}
              </div>

              {/* Input de Chat rápido */}
              <form onSubmit={sendMessage} className="flex items-center gap-2">
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Enviar mensaje..."
                  className="flex-1 bg-zinc-900/90 border border-zinc-700 rounded-full px-3 py-1.5 text-xs focus:outline-none focus:border-[#53fc18]"
                />
                <button type="submit" className="p-1.5 bg-[#53fc18] text-black rounded-full font-bold">
                  <Send className="w-3.5 h-3.5" />
                </button>
              </form>
            </div>
          </div>
        )}
      </main>

      {/* Menú de Navegación Inferior */}
      <nav className="flex items-center justify-around py-3 bg-zinc-950 border-t border-zinc-800 z-20">
        <button onClick={() => setActiveTab('feed')} className={`flex flex-col items-center ${activeTab === 'feed' ? 'text-[#53fc18]' : 'text-zinc-400'}`}>
          <Home className="w-6 h-6" />
          <span className="text-[10px] mt-1 font-medium">Inicio</span>
        </button>

        <button onClick={() => setActiveTab('explore')} className={`flex flex-col items-center ${activeTab === 'explore' ? 'text-[#53fc18]' : 'text-zinc-400'}`}>
          <Compass className="w-6 h-6" />
          <span className="text-[10px] mt-1 font-medium">Explorar</span>
        </button>

        <button className="flex flex-col items-center text-black">
          <div className="bg-[#53fc18] p-2 rounded-xl shadow-lg shadow-[#53fc18]/20 active:scale-95 transition">
            <PlusSquare className="w-6 h-6" />
          </div>
        </button>

        <button onClick={() => setActiveTab('live')} className={`flex flex-col items-center ${activeTab === 'live' ? 'text-[#53fc18]' : 'text-zinc-400'}`}>
          <Flame className="w-6 h-6" />
          <span className="text-[10px] mt-1 font-medium">Directos</span>
        </button>

        <button onClick={() => setActiveTab('profile')} className={`flex flex-col items-center ${activeTab === 'profile' ? 'text-[#53fc18]' : 'text-zinc-400'}`}>
          <User className="w-6 h-6" />
          <span className="text-[10px] mt-1 font-medium">Perfil</span>
        </button>
      </nav>
    </div>
  );
}
