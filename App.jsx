import React, { useState, useRef } from 'react';
import {
  Heart,
  MessageCircle,
  Share2,
  Music,
  User,
  Compass,
  PlusSquare,
  Sparkles,
  Send,
  LogOut,
  Lock,
  Mail,
  UserCheck
} from 'lucide-react';

const MOCK_CLIPS = [
  {
    id: 1,
    streamer: '@streamer_oficial',
    title: '¡Bienvenidos al directo! Rompiéndola en KickTok ⚡',
    likesCount: 1240,
    comments: [
      { id: 1, user: 'Alex_Gamer', text: '¡Increíble jugada!' },
      { id: 2, user: 'Maria_Dev', text: 'Sube más clips así 🚀' }
    ]
  },
  {
    id: 2,
    streamer: '@pro_gamer_99',
    title: 'Racha de victorias en la última partida 🔥',
    likesCount: 3580,
    comments: [
      { id: 1, user: 'CarlosK', text: 'Brutal ese movimiento' },
      { id: 2, user: 'Lucia_Vlc', text: 'Enséñame a jugar así porfa' }
    ]
  },
  {
    id: 3,
    streamer: '@kick_latam',
    title: 'Momentos divertidos del stream de ayer 🎮😂',
    likesCount: 8920,
    comments: [
      { id: 1, user: 'Javier98', text: 'Me morí de risa con esta parte' }
    ]
  }
];

export default function App() {
  // Estado de autenticación
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [authMode, setAuthMode] = useState('login'); // 'login' o 'register'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');

  // Estados principales de la app
  const [activeTab, setActiveTab] = useState('clips');
  const [currentClipIndex, setCurrentClipIndex] = useState(0);
  const [clips, setClips] = useState(MOCK_CLIPS);
  const [isLiked, setIsLiked] = useState(false);
  const [newMessage, setNewMessage] = useState('');

  // Referencias para gestos táctiles (Swipe Up/Down)
  const touchStartY = useRef(0);
  const touchEndY = useRef(0);

  const currentClip = clips[currentClipIndex];

  const handleAuthSubmit = (e) => {
    e.preventDefault();
    if (authMode === 'register' && !username.trim()) {
      alert('Por favor ingresa un nombre de usuario');
      return;
    }
    if (!email.trim() || !password.trim()) {
      alert('Por favor completa todos los campos');
      return;
    }
    // Simulamos éxito de sesión / registro
    setIsLoggedIn(true);
  };

  const handleTouchStart = (e) => {
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchMove = (e) => {
    touchEndY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = () => {
    if (!touchStartY.current || !touchEndY.current) return;
    const distance = touchStartY.current - touchEndY.current;
    const minSwipeDistance = 50;

    if (distance > minSwipeDistance) {
      if (currentClipIndex < clips.length - 1) {
        setCurrentClipIndex(prev => prev + 1);
        setIsLiked(false);
      }
    } else if (distance < -minSwipeDistance) {
      if (currentClipIndex > 0) {
        setCurrentClipIndex(prev => prev - 1);
        setIsLiked(false);
      }
    }
    touchStartY.current = 0;
    touchEndY.current = 0;
  };

  const toggleLike = () => {
    setIsLiked(!isLiked);
    setClips(prevClips => {
      const updated = [...prevClips];
      updated[currentClipIndex].likesCount += isLiked ? -1 : 1;
      return updated;
    });
  };

  const sendMessage = (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    setClips(prevClips => {
      const updated = [...prevClips];
      updated[currentClipIndex].comments.push({
        id: Date.now(),
        user: username || 'TÚ',
        text: newMessage
      });
      return updated;
    });
    setNewMessage('');
  };

  // 1. PANTALLA DE INICIO DE SESIÓN / CREAR CUENTA
  if (!isLoggedIn) {
    return (
      <div className="flex flex-col h-screen bg-black text-white font-sans justify-center px-6 select-none">
        <div className="max-w-sm w-full mx-auto space-y-6">
          <div className="text-center space-y-2">
            <div className="w-16 h-16 rounded-2xl bg-[#00FF66] flex items-center justify-center font-black text-black text-3xl mx-auto shadow-[0_0_20px_#00FF66]">
              K
            </div>
            <h1 className="text-2xl font-black tracking-wider text-[#00FF66]">KickTok</h1>
            <p className="text-xs text-zinc-400">La comunidad de streaming y clips en vivo</p>
          </div>

          {/* Selector de modo */}
          <div className="flex bg-zinc-900 p-1 rounded-xl border border-zinc-800">
            <button
              type="button"
              onClick={() => setAuthMode('login')}
              className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${
                authMode === 'login' ? 'bg-[#00FF66] text-black shadow-[0_0_10px_#00FF66]' : 'text-zinc-400'
              }`}
            >
              Iniciar Sesión
            </button>
            <button
              type="button"
              onClick={() => setAuthMode('register')}
              className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${
                authMode === 'register' ? 'bg-[#00FF66] text-black shadow-[0_0_10px_#00FF66]' : 'text-zinc-400'
              }`}
            >
              Crear Cuenta
            </button>
          </div>

          <form onSubmit={handleAuthSubmit} className="space-y-4">
            {authMode === 'register' && (
              <div className="space-y-1">
                <label className="text-xs text-zinc-400 font-medium">Nombre de usuario</label>
                <div className="relative flex items-center">
                  <UserCheck className="absolute left-3 w-4 h-4 text-zinc-500" />
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="TuTagDeStreamer"
                    className="w-full bg-zinc-900 border border-zinc-800 text-white text-xs pl-9 pr-3 py-3 rounded-xl focus:outline-none focus:border-[#00FF66]"
                  />
                </div>
              </di
