"use client";

import ProjectSelectImages from "@/app/components/ProjectSelectImages";
import SearchResult from "@/app/project/[projectId]/_components/SearchResult";
import {useState} from "react";

const completeImageUrl = "https://images.unsplash.com/photo-1582053433976-25c00369fc93?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=512&q=80";

export default function Page({params}: { params: { projectId: string } }) {
    const {projectId} = params;
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    return (
        <div className="py-12 sm:py-16 lg:pb-40">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto max-w-2xl text-center">
                    <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                        Project {projectId}
                    </h1>
                </div>
                <div className="mt-8 flow-root sm:mt-12">
                    <div
                        className="-m-2 rounded-xl bg-gray-900/5 p-2 ring-1 ring-inset ring-gray-900/10 lg:-m-4 lg:rounded-2xl lg:p-2">

                        <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                            <CenterText text={"尋找拼圖位置"}/>
                            <div className="overflow-hidden rounded-lg bg-white shadow">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 px-6">
                                    <div>
                                        <ImageHeaderText text={"參考完整拼圖"}/>
                                        <Image src={completeImageUrl}/>
                                    </div>
                                    <div>
                                        <ImageHeaderText text={"上傳部分拼圖"}/>
                                        <UploadPicture selectedImage={selectedImage}
                                                       setSelectedImage={setSelectedImage}/>
                                    </div>
                                </div>

                                <div className="mt-4 flex justify-center">
                                    <button
                                        type="button"
                                        className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                    >
                                        開始尋找
                                    </button>
                                </div>
                                <SearchResult/>
                            </div>

                            <CenterText text={"拼圖尋找記錄"}/>
                            <div className="overflow-hidden rounded-lg bg-white shadow mb-4">
                                <div className="px-4 py-5 sm:p-6">
                                    <ProjectSelectImages/>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

function UploadPicture({selectedImage, setSelectedImage}: {
    selectedImage: string | null;
    setSelectedImage: (value: (((prevState: (string | null)) => (string | null)) | string | null)) => void;
}) {
    const onSelectedImage = (e) => {
        if (e.target.files && e.target.files[0]) {
            setSelectedImage(URL.createObjectURL(e.target.files[0]));
        }
    };
    return (
        <div className="relative block w-full h-full">
            <label
                htmlFor="file-upload"
                className="relative block w-full rounded-lg border-2 border-dashed border-gray-300 text-center hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 cursor-pointer"
            >
                {selectedImage ? <Image src={selectedImage}/> : (
                    <div>
                        <span className="m-8 block text-sm font-semibold text-gray-900">Upload a picture</span>
                    </div>
                )}
            </label>
            <input
                id="file-upload"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={onSelectedImage}
            />
        </div>
    );
}

function CenterText({text}) {
    return (
        <div className="mt-6 mb-4 mx-auto max-w-2xl text-center">
            <p className={`text-2xl sm:text-xl font-bold tracking-tight text-gray-900`}>
                {text}
            </p>
        </div>
    );
}

export function ImageHeaderText({text}) {
    return (
        <div className="mt-4 mb-2 mx-auto max-w-2xl text-center">
            <p className={`text-2xl sm:text-base font-bold tracking-tight text-gray-900`}>
                {text}
            </p>
        </div>
    );
}

export function Image({src}) {
    return (
        <div className="group aspect-h-7 aspect-w-10 overflow-hidden rounded-lg bg-gray-100">
            <img src={src} className="object-contain group-hover:opacity-75"/>
        </div>
    );
}
