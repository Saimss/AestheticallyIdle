export type ClockFormat = '12hr' | '24hr';
export type Theme = 'light' | 'dark' | 'ocean' | 'minimal'| 'winter' | 'spring';

export  interface Preferences {
    clockFormat: ClockFormat;
    theme: Theme;
    showSeconds: boolean;
    
}   