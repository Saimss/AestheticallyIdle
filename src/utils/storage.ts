import type { Preferences } from '../types';

const STORAGE_KEY = 'aesthetically_idle_preferences';

const defaultPreferences: Preferences = {
    clockFormat: '12hr',
    theme: 'light',
    showSeconds: true,
};

export function getStoredPreferences(): Preferences {
    try{
        const stored = localStorage.getItem(STORAGE_KEY);
        if(stored){
            return JSON.parse(stored) as Preferences;}
    }catch(error){
        console.log('Error loading preferences:', error);
    }
    return defaultPreferences;
}

export function storePreferences(preferences: Preferences): void {
    try{
        localStorage.setItem(STORAGE_KEY, JSON.stringify(preferences));
    }catch(error){
        console.log('Error saving preferences:', error);
    }
}