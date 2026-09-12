import { create } from 'zustand';

interface Location {
  lat: number;
  lng: number;
  address: string;
}

interface AppState {
  currentLocation: Location | null;
  setLocation: (loc: Location) => void;
  isOffline: boolean;
  setOffline: (status: boolean) => void;
}

export const useAppStore = create<AppState>((set) => ({
  currentLocation: null,
  setLocation: (loc) => set({ currentLocation: loc }),
  isOffline: false,
  setOffline: (status) => set({ isOffline: status }),
}));
