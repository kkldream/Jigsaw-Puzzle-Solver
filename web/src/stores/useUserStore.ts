import {create} from 'zustand'
import Cookies from 'js-cookie';
import {useEffect} from "react";

export interface UserStore {
    userId: string;
    token: string;
    isLogin: () => boolean;
    login: (userId: string, token: string, remember: boolean) => void;
    logout: () => void;
}

export const useUserStore = create<UserStore>()((set, get) => ({
    userId: "",
    token: "",
    isLogin: () => {
        return get().userId !== "" && get().token !== "";
    },
    login: (userId: string, token: string, remember: boolean) => {
        set({userId, token});
        if (remember) {
            Cookies.set('userId', userId, {expires: 7});
            Cookies.set('token', token, {expires: 7});
        }
    },
    logout: () => {
        set({userId: "", token: ""});
        Cookies.remove('userId');
        Cookies.remove('token');
    },
}));

export const useSyncUserFromCookies = () => {
    const login = useUserStore((state) => state.login);

    useEffect(() => {
        const userId = Cookies.get('userId') || "";
        const token = Cookies.get('token') || "";
        if (userId && token) {
            login(userId, token, false); // 如果 cookies 中有資料，更新狀態
        }
    }, [login]);
};
