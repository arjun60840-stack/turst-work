import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface ThemeState {
  theme: 'dark' | 'light';
  toggleTheme: () => void;
  setTheme: (theme: 'dark' | 'light') => void;
}

export const useThemeStore = create<ThemeState>()(
  persist(
    (set, get) => ({
      theme: 'dark',
      toggleTheme: () => {
        const nextTheme = get().theme === 'dark' ? 'light' : 'dark';
        if (typeof document !== 'undefined') {
          if (nextTheme === 'light') {
            document.documentElement.classList.add('light');
            document.documentElement.classList.remove('dark');
            document.body.classList.add('light');
            document.body.classList.remove('dark');
          } else {
            document.documentElement.classList.add('dark');
            document.documentElement.classList.remove('light');
            document.body.classList.add('dark');
            document.body.classList.remove('light');
          }
        }
        set({ theme: nextTheme });
      },
      setTheme: (theme) => {
        if (typeof document !== 'undefined') {
          if (theme === 'light') {
            document.documentElement.classList.add('light');
            document.documentElement.classList.remove('dark');
            document.body.classList.add('light');
            document.body.classList.remove('dark');
          } else {
            document.documentElement.classList.add('dark');
            document.documentElement.classList.remove('light');
            document.body.classList.add('dark');
            document.body.classList.remove('light');
          }
        }
        set({ theme });
      },
    }),
    {
      name: 'worktrust-theme-preference',
    }
  )
);
