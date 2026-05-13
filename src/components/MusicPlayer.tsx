import { useRef, useState, useEffect } from "react";
import { Volume2, VolumeX } from 'lucide-react'

export default function MusicPlayer({ src }: { src: string | null }) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isMuted, setIsMuted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    if (src) {
      audio.src = src;
      audio.load();
      audio.play().catch((err) => setError(err.message));
    } else {
      audio.pause();
    }
  }, [src]);

  const toggle = () => {
    const audio = audioRef.current;
    if (!audio || !src) return;
    audio.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  return (
    <div className="fixed bottom-6 right-6">
      <audio ref={audioRef} loop />
      <div className="backdrop-blur-sm bg-white/10 border border-white/20 rounded-xl overflow-hidden">
        <button
          onClick={toggle}
          disabled={!src}
          className={`p-3 transition-all duration-300 hover:bg-white/20 disabled:opacity-30 disabled:cursor-not-allowed ${isMuted ? 'bg-white/25' : ''}`}
          aria-label={isMuted ? "Unmute" : "Mute"}>
          {isMuted ? <VolumeX size={24} /> : <Volume2 size={24} />}
        </button>
      </div>
    </div>
  );
}