"use client";

import {Fragment, useEffect, useState} from 'react'
import {Dialog, Transition} from '@headlessui/react'
import LoadingSpinner from "@/app/_components/LoadingSpinner";
import {useUserStore} from "@/stores/useUserStore";
import api from "@/service/apiService";

export default function LoginModel(props: {
    open: boolean;
    setOpen: (value: (((prevState: boolean) => boolean) | boolean)) => void;
}) {
    const userStore = useUserStore();
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);

    const checkInputOk = username !== "" && password !== "";

    useEffect(() => {
        setUsername("");
        setPassword("");
    }, [props.open]);

    async function handleButtonClick(isOk: boolean) {
        setLoading(true);
        if (!checkInputOk) throw new Error("Invalid input");
        try {
            if (isOk) {
                const tokenRes = await api.account.token.GET();
                console.log(tokenRes);
                if (!tokenRes.success) throw new Error(tokenRes.error?.message);
                const token = tokenRes.result.authToken;
                const loginRes = await api.account.login.POST(token, username, password);
                console.log("loginRes", loginRes);
                if (!loginRes.success) {
                    userStore.logout();
                    alert("帳號密碼錯誤！");
                    throw new Error(loginRes.error?.message);
                }
                const userId = loginRes.result.userId;
                userStore.login(userId, token);
            }
        } finally {
            props.setOpen(false);
            setLoading(false);
        }
    }

    return (
        <Transition.Root show={props.open} as={Fragment}>
            <Dialog as="div" className="relative z-10" onClose={props.setOpen}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"/>
                </Transition.Child>

                <div className="fixed inset-0 z-10 overflow-y-auto">
                    <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            enterTo="opacity-100 translate-y-0 sm:scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        >
                            <Dialog.Panel
                                className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
                                <div>
                                    <div className="text-center">
                                        <Dialog.Title as="h3"
                                                      className="text-base font-semibold leading-6 text-gray-900">
                                            登入
                                        </Dialog.Title>
                                        <div className="mt-8">
                                            <div className="relative">
                                                <label
                                                    htmlFor="name"
                                                    className="absolute -top-2 left-2 inline-block bg-white px-1 text-xs font-medium text-gray-900"
                                                >
                                                    帳號
                                                </label>
                                                <input
                                                    type="text"
                                                    name="name"
                                                    id="name"
                                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                    onChange={(e) => setUsername(e.target.value)}
                                                />
                                            </div>
                                        </div>
                                        <div className="mt-2">
                                            <p className="text-sm text-gray-500">
                                                Julo Julo Julo Julo Julo Julo Julo。
                                            </p>
                                        </div>
                                        <div className="mt-8">
                                            <div className="relative">
                                                <label
                                                    htmlFor="name"
                                                    className="absolute -top-2 left-2 inline-block bg-white px-1 text-xs font-medium text-gray-900"
                                                >
                                                    密碼
                                                </label>
                                                <input
                                                    type="text"
                                                    name="name"
                                                    id="name"
                                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                    onChange={(e) => setPassword(e.target.value)}
                                                />
                                            </div>
                                        </div>
                                        <div className="mt-2">
                                            <p className="text-sm text-gray-500">
                                                Julo Julo Julo Julo Julo Julo Julo Julo Julo。
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-5 sm:mt-8 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
                                    <button
                                        type="button"
                                        className={`inline-flex w-full justify-center rounded-md px-3 py-2 text-sm font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 sm:col-start-2
                                                    ${(!checkInputOk || loading) ? "bg-gray-500" : "bg-indigo-600 hover:bg-indigo-500"}`}
                                        onClick={() => handleButtonClick(true)}
                                        disabled={!checkInputOk || loading}
                                    >
                                        {loading && <LoadingSpinner/>}
                                        確定
                                    </button>
                                    <button
                                        type="button"
                                        className={`mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 sm:col-start-1 sm:mt-0
                                                    ${loading ? "" : "hover:bg-gray-50"}`}
                                        onClick={() => handleButtonClick(false)}
                                        disabled={loading}
                                    >
                                        取消
                                    </button>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition.Root>
    )
}
