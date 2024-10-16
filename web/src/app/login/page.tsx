"use client";

import React, {FormEvent, useCallback, useState} from 'react';
import {useRouter, useSearchParams} from "next/navigation";
import api from "@/service/apiService";
import {useUserStore} from "@/stores/useUserStore";

export default function Page() {
    const searchParams = useSearchParams();
    const from = searchParams.get('from');
    const router = useRouter();
    const userStore = useUserStore();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [remember, setRemember] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = useCallback(async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setError('');
        try {
            const tokenRes = await api.account.token.POST();
            if (!tokenRes.success) {
                setError("發生錯誤，請稍後再試。");
                console.error("Login error:", tokenRes.error?.message);
                return;
            }
            const token = tokenRes.result.authToken;
            const loginRes = await api.account.login.POST(token, username, password);
            if (!loginRes.success) {
                setError("登入失敗，請檢查您的用戶名和密碼。");
                return;
            }
            const userId = loginRes.result.userId;
            userStore.login(userId, token, remember);
            router.push(from ?? "/");
        } catch (err) {
            setError("發生錯誤，請稍後再試。");
            console.error("Login error:", err);
        }
    }, [username, password, remember, from, router, userStore]);

    return (
        <div className="flex min-h-full flex-1 flex-col justify-center py-12 sm:px-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <h2 className="mt-6 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                    登入你的帳戶
                </h2>
            </div>
            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]">
                <div className="bg-white px-6 py-12 shadow sm:rounded-lg sm:px-12">
                    <form className="space-y-6" onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">
                                用戶名
                            </label>
                            <div className="mt-2">
                                <input
                                    id="username"
                                    name="username"
                                    type="text"
                                    autoComplete="username"
                                    required
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                                密碼
                            </label>
                            <div className="mt-2">
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    autoComplete="current-password"
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>

                        <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                <input
                                    id="remember-me"
                                    name="remember-me"
                                    type="checkbox"
                                    checked={remember}
                                    onChange={(e) => setRemember(e.target.checked)}
                                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                />
                                <label htmlFor="remember-me" className="ml-3 block text-sm leading-6 text-gray-900">
                                    記住我
                                </label>
                            </div>
                            <div className="text-sm leading-6">
                                <button type="button"
                                        className="font-semibold text-indigo-600 hover:text-indigo-500"
                                        onClick={() => {
                                            alert("(´。＿。｀)")
                                        }}>
                                    忘記密碼？
                                </button>
                            </div>
                        </div>

                        <div>
                            <button
                                type="submit"
                                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                                登入
                            </button>
                        </div>
                        {error && (
                            <div className="text-red-600 text-sm mb-4">{error}</div>
                        )}
                    </form>
                </div>
            </div>
        </div>
    );
}
