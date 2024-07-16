import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useStore = create(
  persist(
    (set) => ({
      // 기존 상태 및 액션
      isLogined: false,
      setIsLogined: (value) => set({ isLogined: value }),

      adminLogined: false,
      setAdminLogined: (value) => set({ adminLogined: value }),

      // 새로운 상태 및 액션
      selectedRegion: '광화문·덕수궁',
      setSelectedRegion: (region) => set({ selectedRegion: region }),

      mapCenter: { lat: 37.5365, lng: 126.9780 },
      setMapCenter: (center) => set({ mapCenter: center }),
    }),
    {
      name: 'app-state', // 로컬 스토리지에 저장될 상태의 이름
    }
  )
);

export default useStore;