import { useState } from "react";
import type { ClockFormat } from "../types";
import { Music } from "lucide-react";
import { Play } from "lucide-react";

interface SettingsPanelProps {
    clockFormat: ClockFormat;
    showSeconds: boolean;
    onClockFormatChange: (format: ClockFormat) => void;
    onShowSecondsChange: (show: boolean) => void;
    onMusicChange: (url: string | null) => void;
}

const TRACKS = [
    { id: 1, title: "Crickets", artist: "SoundReality", url: "/Crickets.mp3" },
    { id: 2, title: "Firewood", artist: "MindMist", url: "/Fire.mp3" },
    { id: 3, title: "HipHop", artist: "Lofi", url: "/LofiHipHop.mp3" },
    { id: 4, title: "Jazz", artist: "Lofi", url: "/LofiJazz.mp3" },
    { id: 5, title: "Upbeat", artist: "Lofi", url: "/LofiUpbeat.mp3" },
    { id: 6, title: "Rain", artist: "JCI-21", url: "/RainAndThunder.mp3" },
];

export default function SettingsPanel({
    clockFormat,
    showSeconds,
    onClockFormatChange,
    onShowSecondsChange,
    onMusicChange,
}: SettingsPanelProps) {
    const [activeTab, setActiveTab] = useState<'settings' | 'music'>('settings');
    const [selectedTrack, setSelectedTrack] = useState<number | null>(null);

    return (
        <div className="fixed top-24 right-6 w-72 backdrop-blur-md bg-white/10 rounded-2xl p-6 border border-white/20 shadow-2xl">

            
            <div className="flex gap-2 mb-6">
                <button
                    onClick={() => setActiveTab('settings')}
                    className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${activeTab === 'settings' ? 'bg-white/30 border-2 border-white/50' : 'bg-white/5 border-2 border-white/10 hover:bg-white/15'}`}>
                    Settings
                </button>
                <button
                    onClick={() => setActiveTab('music')}
                    className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${activeTab === 'music' ? 'bg-white/30 border-2 border-white/50' : 'bg-white/5 border-2 border-white/10 hover:bg-white/15'}`}>
                    Music
                </button>
            </div>

            
            {activeTab === 'settings' && (
                <div className="space-y-6">
                    <div>
                        <label className="block text-sm font-light opacity-70 mb-3">Clock Format</label>
                        <div className="flex gap-2">
                            <button
                                onClick={() => onClockFormatChange('12hr')}
                                className={`flex-1 py-2 rounded-lg font-medium ${clockFormat === '12hr' ? 'bg-white/30 border-2 border-white/50' : 'bg-white/5 border-2 border-white/10 hover:bg-white/15'}`}>
                                12hr
                            </button>
                            <button
                                onClick={() => onClockFormatChange('24hr')}
                                className={`flex-1 py-2 rounded-lg font-medium ${clockFormat === '24hr' ? 'bg-white/30 border-2 border-white/50' : 'bg-white/5 border-2 border-white/10 hover:bg-white/15'}`}>
                                24hr
                            </button>
                        </div>
                    </div>

                    <div>
                        <label className="flex items-center justify-between cursor-pointer group">
                            <span className="text-sm font-light opacity-70">Show Seconds</span>
                            <div className="relative">
                                <input
                                    type="checkbox"
                                    checked={showSeconds}
                                    onChange={(e) => onShowSecondsChange(e.target.checked)}
                                    className="sr-only"
                                />
                                <div className={`w-12 h-6 rounded-full ${showSeconds ? 'bg-white/40' : 'bg-white/10'} transition-all duration-200`}>
                                    <div className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform duration-200 ${showSeconds ? 'transform translate-x-6' : ''}`} />
                                </div>
                            </div>
                        </label>
                    </div>

                </div>
            )}

            
            {activeTab === 'music' && (
                <div className="space-y-2">
                    <p className="text-sm font-light opacity-70 mb-3">Select a track to play</p>
                    {TRACKS.map((track) => (
                        <button
                            key={track.id}
                            onClick={() => {
                                const newId = track.id === selectedTrack ? null : track.id;
                                setSelectedTrack(newId);
                                onMusicChange(newId ? track.url : null);
                            }}
                            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all duration-200 border-2 ${selectedTrack === track.id ? 'bg-white/30 border-white/50' : 'bg-white/5 border-white/10 hover:bg-white/15'}`}>
                            <span className="text-lg">{selectedTrack === track.id ? <Music/> : <Play/>}</span>
                            <div>
                                <p className="text-sm font-medium">{track.title}</p>
                                <p className="text-xs opacity-60">{track.artist}</p>
                            </div>
                        </button>
                    ))}
                    <p className="text-xs opacity-40 text-center pt-2">Music by pixabay - pixabay.com</p>
                </div>
            )}
        </div>
    );
}