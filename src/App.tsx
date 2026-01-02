import { useState, useEffect } from 'react'
import{Settings, X} from 'lucide-react'
import Clock from './components/Clock.tsx'
import SettingsPanel from './components/SettingsPanel.tsx'
import type { ClockFormat, Theme } from './types'
import { getStoredPreferences, storePreferences } from './utils/storage'
import Snowfall from 'react-snowfall'


function App() {
    const [currenttime, setCurrentTime] = useState<Date>(new Date());
    const [showSettings, setShowSettings] = useState<boolean>(false);
    const [clockFormat, setClockFormat] = useState<ClockFormat>('12hr');
    const [theme, setTheme] = useState<Theme>('dark');
    const [showSeconds, setShowSeconds] = useState<boolean>(true);


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
    
    
    return ()=> clearInterval(interval); 
    }, []);

    useEffect(() => {
        storePreferences({
            clockFormat,
            theme,
            showSeconds,
        });
    }, [clockFormat, theme, showSeconds]);
  
const themes = {
    light: 'bg-[linear-gradient(90deg,rgba(237,214,192,1)_0%,rgba(224,203,186,1)_41%,rgba(247,210,158,1)_80%)] text-black',
    dark: 'bg-gray-900 text-gray-100',
    minimal: 'bg-[linear-gradient(90deg,rgba(240,198,175,1)_0%,rgba(240,204,168,1)_95%)] text-gray-900',
    ocean: 'bg-blue-900 text-blue-100',
    winter: 'bg-[linear-gradient(90deg,rgba(66,66,201,1)_0%,rgba(87,150,199,1)_44%,rgba(113,161,208,1)_71%,rgba(101,83,237,1)_100%)] text-white',
    spring: 'bg-[linear-gradient(90deg,rgba(245,221,184,1)_0%,rgba(194,134,194,1)_41%,rgba(250,157,208,1)_100%)] text-green-900',
};
  return (
    <div className = {`min-h-screen flex items-center justify-center transition-all duration-500 ${themes[theme]}`}>
      {theme === 'winter' && <Snowfall />}
      {theme === 'spring' && <Snowfall />}
      <Clock time={currenttime} format={clockFormat} showSeconds={showSeconds} />
      <button
        onClick={() => setShowSettings(!showSettings)}
        className="fixed top-6 right-6 p-3 rounded-full backdrop-blur-sm bg-white/10 hover:bg-white/20 transition-all duration-300 border border-white/20"
        aria-label='Settings'>
           {showSettings ? <X size={24} /> : <Settings size={24} />}
        </button>

      {showSettings && (
        <SettingsPanel
            clockFormat={clockFormat}
            theme={theme}
            showSeconds={showSeconds}
            onClockFormatChange={setClockFormat}
            onThemeChange={setTheme}
            onShowSecondsChange={setShowSeconds}
        />
      )}
    </div>
  )
}

export default App
