import {create} from 'zustand'

export interface UserStore {
    userId: string;
    token: string;
    isLogin: boolean;
    login: (userId: string, token: string) => void;
    logout: () => void;
}

export const useUserStore = create<UserStore>()(set => ({
    userId: "",
    token: "",
    get isLogin() {
        return this.userId !== "" && this.token !== "";
    },
    login: (userId: string, token: string) => set({userId, token}),
    logout: () => set({userId: "", token: ""}),
}));
