import { create } from 'zustand';
import { persist } from 'zustand/middleware';

/**
 * 1. ClassName: useStore
 * 2. FileName : store.js
 * 3. Package  : -
 * 4. Comment  : zustand로 상태 관리
 * 5. 작성자   : boreum
 * 6. 작성일   : 2024. 07. 09
 **/
const useStore = create(
  persist(
    (set) => ({
      // 기존 상태 및 액션: boreum
      isLogined: false,
      setIsLogined: (value) => set({ isLogined: value }),

      adminLogined: false,
      setAdminLogined: (value) => set({ adminLogined: value }),

      // 새로운 상태 및 액션: mijin
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