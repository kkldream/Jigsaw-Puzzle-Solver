"use client";

import ProjectMenu from "@/app/_components/ProjectMenu";
import NewProjectModel from "@/app/_components/NewProjectModel";
import {useState} from "react";
import {useUserStore} from "@/stores/useUserStore";

export default function Page() {
    const userStore = useUserStore();
    const [modelShow, setModelShow] = useState<boolean>(false);
    return (
        <>
            <div className="py-12 sm:py-16 lg:pb-40">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="mx-auto max-w-2xl text-center">
                        <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">
                            All Projects
                        </h1>
                        <p className="mt-6 text-lg leading-8 text-gray-600">
                            Julo Julo Julo Julo Julo Julo Julo Julo Julo Julo Julo Julo Julo Julo Julo Julo.
                        </p>
                        <div className="mt-10 flex items-center justify-center gap-x-6">
                            <button
                                className={`rounded-md px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600
                                            ${!userStore.isLogin ? "bg-gray-500" : "bg-indigo-600 hover:bg-indigo-500"}`}
                                onClick={() => setModelShow(true)}
                                disabled={!userStore.isLogin}
                            >
                                New Project
                            </button>
                        </div>
                    </div>
                    <div className="mt-16 flow-root sm:mt-24">
                        <div
                            className="-m-2 rounded-xl bg-gray-900/5 p-2 ring-1 ring-inset ring-gray-900/10 lg:-m-4 lg:rounded-2xl lg:p-4">
                            <ProjectMenu/>
                        </div>
                    </div>
                </div>
            </div>
            <NewProjectModel open={modelShow} setOpen={setModelShow}/>
        </>
    );
}
