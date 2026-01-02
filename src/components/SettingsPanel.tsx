import type { ClockFormat, Theme } from "../types";

interface SettingsPanelProps {
    clockFormat: ClockFormat;
    theme: Theme;
    showSeconds: boolean;
    onClockFormatChange: (format: ClockFormat) => void;
    onThemeChange: (theme: Theme) => void;
    onShowSecondsChange: (show: boolean) => void;
    
}

export default function SettingsPanel({
    clockFormat,
    theme,
    showSeconds,
    onClockFormatChange,
    onThemeChange,
    onShowSecondsChange,
    
}: SettingsPanelProps) {
    const themes : {value : Theme , label : string}[] = [
        {value: 'light', label: 'Light'},
        {value: 'dark', label: 'Dark'},
        {value: 'minimal', label: 'Minimal'},
        {value: 'ocean', label: 'Ocean'}, 
        {value: 'winter', label: 'Winter'},
        {value: 'spring', label: 'Spring'},
    ];

    return(
        <div className ="fixed top-24 right-6 w-72 backdrop-blur-md bg-white/10 rounded-2xl p-6 border border-white/20 shadow-2xl">
            <h2 className="text-xl font-light mb-6 tracking-wide">Settings</h2>

            <div className = "space-y-6">
                <div>
                    <label className="block text-sm font-light opacity-70 mb-3">Clock Format</label>
                    <div className = "flex gap-2">
                        <button
                        onClick={() => onClockFormatChange('12hr')}
                        className = {`flex-1 py-2 rounded-lg font-medium ${clockFormat === '12hr' ? 'bg-white/30 border-2 border-white/50' : 'bg-white/5 border-2 border-white/10 hover:bg-white/15'}`}>
                            12hr
                        </button>
                        <button
                        onClick={() => onClockFormatChange('24hr')}
                        className = {`flex-1 py-2 rounded-lg font-medium ${clockFormat === '24hr' ? 'bg-white/30 border-2 border-white/50' : 'bg-white/5 border-2 border-white/10 hover:bg-white/15'}`}>
                            24hr
                        </button>

                    </div>

                </div>

                <div>
                    <label className="flex items-center justify-between cursor-pointer group">
                        <span className = "text-sm font-light opacity-70">
                            Show Seconds
                        </span>
                        <div className="relative">
                            <input
                                type="checkbox"
                                checked={showSeconds}
                                onChange={(e) => onShowSecondsChange(e.target.checked)}
                                className="sr-only"
                            />
                            <div className={`w-12 h-6 rounded-full ${showSeconds ? 'bg-white/40' : 'bg-white/10'} transition-all duration-200`}>
                                <div className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform duration-200 ${showSeconds ? 'transform translate-x-6' : ''}`}>
                                </div>
                            </div>
                        </div>
                    </label>
                </div>
                <div>
                    <label className="block text-sm font-light opacity-70 mb-3">
                        Theme
                    </label>
                    <div className = "grid grid-cols-2 gap-2">
                        {themes.map((t) => (
                            <button
                                key={t.value}
                                onClick={() => onThemeChange(t.value)}
                                className = {`py-2 rounded-lg font-medium ${theme === t.value ? 'bg-white/30 border-2 border-white/50' : 'bg-white/5 border-2 border-white/10 hover:bg-white/10'}`}>
                                    {t.label}
                                </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}