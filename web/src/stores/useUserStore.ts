import {create} from 'zustand'
import Cookies from 'js-cookie';
import {useEffect} from "react";

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
    login: (userId: string, token: string) => {
        set({userId, token});
        Cookies.set('userId', userId, {expires: 7});
        Cookies.set('token', token, {expires: 7});
    },
    logout: () => {
        set({userId: "", token: ""});
        Cookies.remove('userId');
        Cookies.remove('token');
    },
}));

export const useSyncUserFromCookies = () => {
    const setUser = useUserStore((state) => state.login);

    useEffect(() => {
        const userId = Cookies.get('userId') || "";
        const token = Cookies.get('token') || "";
        if (userId && token) {
            setUser(userId, token); // 如果 cookies 中有資料，更新狀態
        }
    }, [setUser]);
};
