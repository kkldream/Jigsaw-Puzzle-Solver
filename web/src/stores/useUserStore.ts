import {create} from 'zustand'
import Cookies from 'js-cookie';
import {useEffect} from "react";

export interface UserStore {
    userId: string;
    token: string;
    isLogin: boolean;
    login: (userId: string, token: string, remember: boolean) => void;
    logout: () => void;
}

export const useUserStore = create<UserStore>()((set) => ({
    userId: "",
    token: "",
    isLogin: false,
    login: (userId: string, token: string, remember: boolean) => {
        set({userId, token, isLogin: true});
        const isDev = process.env.NODE_ENV === 'development';
        // 本機 dev：一律寫入 cookie（較長效期），方便測試不必勾「記住我」；正式環境維持僅 remember 時寫入
        if (remember || isDev) {
            const expires = isDev ? 365 : 7;
            Cookies.set('userId', userId, {expires});
            Cookies.set('token', token, {expires});
        }
    },
    logout: () => {
        set({userId: "", token: "", isLogin: false});
        Cookies.remove('userId');
        Cookies.remove('token');
    },
}));

export const useSyncUserFromCookies = () => {
    const userLogin = useUserStore(state => state.login);
    useEffect(() => {
        const userId = Cookies.get('userId') || "";
        const token = Cookies.get('token') || "";
        if (userId !== "" && token !== "") {
            userLogin(userId, token, false);
        }
    }, [userLogin]);
};
