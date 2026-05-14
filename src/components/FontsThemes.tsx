import { useState, useRef } from "react";
import type { Theme } from "../types";

interface ThemesFontsPanelProps {
    theme: Theme;
    font: string;
    onThemeChange: (theme: Theme) => void;
    onFontChange:(font: string)=>void;
}

export const themes: { value: Theme; label: string, artist: string }[] = [
        { value: 'Car', label: 'Rain', artist: 'TuneZoro - Pixabay' },
        { value: 'Forest', label: 'Forest', artist: 'cryptoblender - Pixabay' },
        { value: 'Jazz', label: 'Chill', artist: 'Freepik - Magnific ' },
        { value: 'Upbeat', label: 'Vibe', artist: '' },
    ];

export const fonts: { value: string; label: string; family: string }[] = [
  { value: 'inter', label: 'Inter', family: "'Inter', sans-serif" },
  { value: 'playfair', label: 'Playfair', family: "'Playfair Display', serif" },
  { value: 'mono', label: 'Mono', family: "'JetBrains Mono', monospace" },
  { value: 'roboto', label: 'Roboto', family: "'Roboto', sans-serif" },
];

export function ThemesFontsPanel({
    theme,
    onThemeChange,
    font,
    onFontChange
}: ThemesFontsPanelProps) {
    const [activeTab, setActiveTab] = useState<'Themes' | 'Fonts'>('Themes');
    const videoRefs = useRef<Record<string, HTMLVideoElement | null>>({});
    


    return (
        <div className="fixed top-24 right-6 w-72 backdrop-blur-md bg-white/10 rounded-2xl p-6 border border-white/20 shadow-2xl">

            <div className="flex gap-2 mb-6">
                <button
                    onClick={() => setActiveTab('Themes')}
                    className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${activeTab === 'Themes' ? 'bg-white/30 border-2 border-white/50' : 'bg-white/5 border-2 border-white/10 hover:bg-white/15'}`}>
                    Themes
                </button>
                <button
                    onClick={() => setActiveTab('Fonts')}
                    className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${activeTab === 'Fonts' ? 'bg-white/30 border-2 border-white/50' : 'bg-white/5 border-2 border-white/10 hover:bg-white/15'}`}>
                    Fonts
                </button>
            </div>

            {activeTab === 'Themes' && (
                <div className="space-y-6">
                    <div>
                        <label className="block text-sm font-light opacity-70 mb-3">Theme</label>
                        <div className="grid grid-cols-2 gap-2">
                            {themes.map((t) => (
                                <button
                                    key={t.value}
                                    onClick={() => onThemeChange(t.value)}
                                    className={`relative overflow-hidden rounded-lg border-2 transition-all duration-200 ${
                                        theme === t.value
                                            ? 'border-white/50 ring-2 ring-white/30'
                                            : 'border-white/10 hover:border-white/30'
                                    }`}
                                    style={{ aspectRatio: '16/9' }}
                                >
                                    <video
                                        ref={(el) => { videoRefs.current[t.value] = el; }}
                                        src={`/${t.value}.mp4`}
                                        autoPlay
                                        loop
                                        muted
                                        playsInline
                                        className="absolute inset-0 w-full h-full object-cover"
                                    />
                                    
                                    <div className="absolute inset-0 bg-black/20 flex items-end p-1.5">
                                        <span className="text-white text-xs font-medium drop-shadow">
                                            {t.label}
                                        </span>
                                    </div>
                                    
                                    {theme === t.value && (
                                        <div className="absolute top-1.5 right-1.5 w-4 h-4 rounded-full bg-white/90 flex items-center justify-center">
                                            <svg className="w-2.5 h-2.5 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                            </svg>
                                        </div>
                                    )}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {activeTab === 'Fonts' && (
                <div className="space-y-2">
        {fonts.map((f) => (
            <button
                key={f.value}
                onClick={() => onFontChange(f.value)}
                className={`w-full px-4 py-3 rounded-lg border-2 text-left transition-all duration-200 ${
                    font === f.value
                        ? 'bg-white/30 border-white/50'
                        : 'bg-white/5 border-white/10 hover:bg-white/15'
                }`}
            >
                <span style={{ fontFamily: f.family }} className="text-lg">
                    12:34
                </span>
                <span className="block text-xs opacity-60 mt-0.5">{f.label}</span>
            </button>
        ))}
                </div>
            )}
        </div>
    );
}