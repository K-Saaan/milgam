import {create} from 'zustand';
import {persist} from "zustand/middleware";

const useStore = create(
    persist(
        (set, get) => ({
            isLogined: false,
            setIsLogined: (value) => set({isLogined: value})
        }),
        {
            name: 'login state',
        }
    )
)

export default useStore