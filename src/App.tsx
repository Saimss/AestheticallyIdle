import { useState, useEffect, useRef } from 'react'
import { Settings, X, Palette } from 'lucide-react'
import Clock from './components/Clock.tsx'
import SettingsPanel from './components/SettingsPanel.tsx'
import {ThemesFontsPanel} from './components/FontsThemes.tsx'
import type { ClockFormat, Theme } from './types'
import { getStoredPreferences, storePreferences } from './utils/storage'
import MusicPlayer from './components/MusicPlayer.tsx'
import { themes, fonts } from './components/FontsThemes.tsx'




function App() {
    const [currenttime, setCurrentTime] = useState<Date>(new Date());
    const [showSettings, setShowSettings] = useState<boolean>(false);
    const [showThemes, setShowThemes] = useState<boolean>(false);
    const [clockFormat, setClockFormat] = useState<ClockFormat>('12hr');
    const [theme, setTheme] = useState<Theme>('Forest');
    const [showSeconds, setShowSeconds] = useState<boolean>(true);
    const [musicUrl, setMusicUrl] = useState<string | null>(null);
    const bgVideoRef = useRef<HTMLVideoElement>(null);
    const currentArtist = themes.find(t => t.value === theme)?.artist;
    const [font, setFont] = useState('inter');
    const selectedFontFamily = fonts.find(f => f.value === font)?.family ?? 'sans-serif';

    useEffect(() => {
        const preferences = getStoredPreferences();
        setClockFormat(preferences.clockFormat);
        setTheme(preferences.theme);
        setShowSeconds(preferences.showSeconds);
    }, []);
    
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);
        return () => clearInterval(interval); 
    }, []);

    useEffect(() => {
        storePreferences({ clockFormat, theme, showSeconds });
    }, [clockFormat, theme, showSeconds]);


     useEffect(() => {
        const video = bgVideoRef.current;
        if (!video) return;
        video.style.opacity = '0';
        video.src = `/${theme}.mp4`;
        video.load();
        video.play().then(() => {
            video.style.opacity = '1';
        });
    }, [theme]);


    return (
        <div className="relative min-h-screen flex items-center justify-center overflow-hidden text-white">

            <video
                ref={bgVideoRef}
                src={`/${theme}.mp4`}
                autoPlay
                loop
                muted
                playsInline
                className="absolute inset-0 w-full h-full object-cover transition-opacity duration-700"
                style={{ zIndex: 0 }}
            />

            <div style={{zIndex: 10, fontFamily: selectedFontFamily}} className="fixed bottom-6 left-6 z-50 text-white/70 text-sm">
              <Clock time={currenttime} format={clockFormat} showSeconds={showSeconds} />
            </div>
            
            <button
                onClick={() => { setShowSettings(!showSettings); setShowThemes(false); }}
                className="fixed top-6 right-6 p-3 rounded-full backdrop-blur-sm bg-white/10 hover:bg-white/20 transition-all duration-300 border border-white/20"
                aria-label='Settings'>
                {showSettings ? <X size={24} /> : <Settings size={24} />}
            </button>
            <button
                onClick={() => { setShowThemes(!showThemes); setShowSettings(false); }}
                className="fixed top-6 right-20 p-3 rounded-full backdrop-blur-sm bg-white/10 hover:bg-white/20 transition-all duration-300 border border-white/20"
                aria-label='Themes & Fonts'>
                {showThemes ? <X size={24} /> : <Palette size={24} />}
            </button>

            {showSettings && (
                <SettingsPanel
                    clockFormat={clockFormat}
                    showSeconds={showSeconds}
                    onClockFormatChange={setClockFormat}
                    onShowSecondsChange={setShowSeconds}
                    onMusicChange={setMusicUrl}
                />
            )}

            {showThemes && (
                <ThemesFontsPanel
                    theme={theme}
                    onThemeChange={setTheme}
                    font= {font}
                    onFontChange={setFont}
                />
            )}

           <div className="fixed top-4 left-4 z-50 text-white/70 text-sm">
                Credits: {currentArtist}
            </div>
            <MusicPlayer src={musicUrl} />
        </div>
    )
}

export default App