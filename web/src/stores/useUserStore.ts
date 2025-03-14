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
        if (remember) {
            Cookies.set('userId', userId, {expires: 7});
            Cookies.set('token', token, {expires: 7});
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
