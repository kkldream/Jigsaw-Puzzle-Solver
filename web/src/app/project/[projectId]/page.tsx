"use client";

import SearchResult from "@/app/project/[projectId]/_components/SearchResult";
import {ChangeEvent, useEffect, useState} from "react";
import LoadingSpinner from "@/app/_components/LoadingSpinner";
import {ResponseBase} from "@/app/api/responseMethod";
import {ApiSolvePost, SolveItem} from "@/app/api/solve/route";
import {ProjectItem} from "@/app/api/project/route";
import {ImageViewer} from "@/app/_components/ImageViewer";

export default function Page({params}: { params: { projectId: string } }) {
    const {projectId} = params;
    const [projectDoc, setProjectDoc] = useState<{
        name: string;
        imageUrl: string;
    }>({name: "", imageUrl: ""});
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const [resultImages, setResultImages] = useState<SolveItem[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        fetch(`/api/project/${projectId}`)
            .then(response => response.json())
            .then((data: ResponseBase<ProjectItem>) => {
                setProjectDoc({
                    name: data.result.name,
                    imageUrl: data.result.imageUrl,
                });
            });
    }, [projectId]);

    async function handleResultImages() {
        setLoading(true);
        if (!selectedImage) throw new Error("selectedImage is null");
        const blob = await fetch(selectedImage).then((r) => r.blob());
        const selectedImageBase64 = await new Promise<string>((resolve) => {
            const reader = new FileReader();
            reader.onload = () => resolve((reader.result as string).split(',')[1]);
            reader.readAsDataURL(blob);
        });
        const res = await (await fetch(`/api/solve`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                projectId: projectId,
                base64: selectedImageBase64,
            }),
        })).json() as ResponseBase<ApiSolvePost>;
        console.log(res);
        setResultImages(res.result.solves);
        setLoading(false);
    }

    return (
        <div className="py-12 sm:py-16 lg:pb-40">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto max-w-2xl text-center">
                    <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                        {projectDoc.name || "載入中..."}
                    </h1>
                </div>
                <div className="mt-8 flow-root sm:mt-12">
                    <div
                        className="-m-2 rounded-xl bg-gray-900/5 p-2 ring-1 ring-inset ring-gray-900/10 lg:-m-4 lg:rounded-2xl lg:p-2">
                        <div className="mx-auto mb-8 max-w-7xl sm:px-6 lg:px-8">
                            <CenterText text={"尋找拼圖位置"}/>
                            <div className="overflow-hidden rounded-lg bg-white shadow">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 px-6">
                                    <div className="flex flex-col">
                                        <ImageHeaderTextAsd text={"參考完整拼圖"}/>
                                        <div className="flex-grow">
                                            <ImageViewer src={projectDoc.imageUrl} alt=""/>
                                        </div>
                                    </div>
                                    <div className="flex flex-col">
                                        <ImageHeaderTextAsd text={"上傳部分拼圖"}/>
                                        <div className="flex-grow">
                                            <UploadPicture selectedImage={selectedImage}
                                                           setSelectedImage={setSelectedImage}/>
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-4 flex justify-center">
                                    <button
                                        type="button"
                                        className={`rounded-md px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm
                                                    ${(selectedImage === null || loading) ? "bg-gray-500" : "bg-indigo-600 hover:bg-indigo-500"} 
                                                    focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600`}
                                        onClick={handleResultImages}
                                        // disabled={selectedImage === null || loading}
                                    >
                                        {loading && <LoadingSpinner/>}
                                        開始尋找
                                    </button>
                                </div>
                                <SearchResult resultImages={resultImages}/>
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
    const onSelectedImage = (e: ChangeEvent<HTMLInputElement>) => {
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
                {selectedImage ? (
                    <div className="group aspect-h-7 aspect-w-10 overflow-hidden rounded-lg bg-gray-100">
                        <img src={selectedImage} className="object-contain group-hover:opacity-75"/>
                    </div>
                ) : (
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
                capture="environment"
                onChange={onSelectedImage}
            />
        </div>
    );
}

function CenterText(props: { text: string; }) {
    return (
        <div className="mt-6 mb-4 mx-auto max-w-2xl text-center">
            <p className={`text-2xl sm:text-xl font-bold tracking-tight text-gray-900`}>
                {props.text}
            </p>
        </div>
    );
}

function ImageHeaderTextAsd(props: { text: string; }) {
    return (
        <div className="mt-4 mb-2 mx-auto max-w-2xl text-center">
            <p className={`text-2xl sm:text-base font-bold tracking-tight text-gray-900`}>
                {props.text}
            </p>
        </div>
    );
}