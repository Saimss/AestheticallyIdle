export type ClockFormat = '12hr' | '24hr';
export type Theme = 'Car' | 'Forest' | 'Jazz'| 'Upbeat';


export  interface Preferences {
    clockFormat: ClockFormat;
    theme: Theme;
    showSeconds: boolean;
}   
