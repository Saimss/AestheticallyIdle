import { useState } from "react";
import type { Theme } from "../types";

interface ThemesFontsPanelProps {
    theme: Theme;
    onThemeChange: (theme: Theme) => void;
}

export default function ThemesFontsPanel({
    theme,           
    onThemeChange,
}: ThemesFontsPanelProps) {
    const [activeTab, setActiveTab] = useState<'Themes' | 'Fonts'>('Themes'); 

    const themes: { value: Theme; label: string }[] = [
        { value: 'light', label: 'Light' },
        { value: 'dark', label: 'Dark' },
        { value: 'minimal', label: 'Minimal' },
        { value: 'ocean', label: 'Ocean' },
        { value: 'winter', label: 'Winter' },
        { value: 'spring', label: 'Spring' },
    ];

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
                                    className={`py-2 rounded-lg font-medium ${theme === t.value ? 'bg-white/30 border-2 border-white/50' : 'bg-white/5 border-2 border-white/10 hover:bg-white/10'}`}>
                                    {t.label}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {activeTab === 'Fonts' && (
                <div className="space-y-2">
                    <p className="text-sm font-light opacity-70">Font options coming soon...</p>
                </div>
            )}
        </div>
    );
}