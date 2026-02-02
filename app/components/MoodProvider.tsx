'use client';

import { useEffect } from 'react';
import { moodTheme } from '../lib/data';

export default function MoodProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Remove any existing mood classes
    const moodClasses = ['mood-cynical', 'mood-hopeful', 'mood-manic', 'mood-defeated', 'mood-unhinged', 'mood-exhausted', 'mood-zen', 'mood-bitter'];
    document.body.classList.remove(...moodClasses);

    // Add current mood class
    const moodClass = `mood-${moodTheme.mood}`;
    document.body.classList.add(moodClass);

    // Also set the accent colors as CSS variables for components that need them directly
    document.documentElement.style.setProperty('--mood-primary', getComputedStyle(document.body).getPropertyValue('--accent-primary'));
    document.documentElement.style.setProperty('--mood-secondary', getComputedStyle(document.body).getPropertyValue('--accent-secondary'));
  }, []);

  return <>{children}</>;
}
