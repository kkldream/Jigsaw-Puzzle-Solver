"use client";

import SearchResult from "@/app/project/[projectId]/_components/SearchResult";
import {useState} from "react";
import LoadingSpinner from "@/app/_components/LoadingSpinner";
import SimpleGallery from "@/app/_components/Photoswipe";

const completeImageUrl = "https://images.unsplash.com/photo-1582053433976-25c00369fc93?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=512&q=80";
const files = [
    {
        id: "image01",
        time: new Date(1727583185078),
        source: 'https://en.pimg.jp/011/226/869/1/11226869.jpg',
    },
    {
        id: "image02",
        time: new Date(1727582185000),
        source: 'https://img.gogoshop.cloud/598e6646/0REBYaSbgKZ.jpg',
    },
];

export default function Page({params}: { params: { projectId: string } }) {
    const {projectId} = params;
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const [resultImages, setResultImages] = useState<{ name: string; src: string }[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

    async function handleResultImages() {
        setLoading(true);
        await new Promise((resolve) => setTimeout(resolve, 1000));
        setResultImages([
            {
                name: "原始圖",
                src: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8f/Example_image.svg/600px-Example_image.svg.png",
            },
            {
                name: "分布圖",
                src: "https://media.istockphoto.com/id/1316134499/photo/a-concept-image-of-a-magnifying-glass-on-blue-background-with-a-word-example-zoom-inside-the.jpg?s=612x612&w=0&k=20&c=sZM5HlZvHFYnzjrhaStRpex43URlxg6wwJXff3BE9VA=",
            },
        ]);
        setLoading(false);
    }

    function handleHistoryClick() {

    }

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
                                        <ImageViewer id="completeImage" src={completeImageUrl}/>
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
                                        className={`rounded-md px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm
                                                    ${selectedImage === null ? "bg-gray-500" : "bg-indigo-600 hover:bg-indigo-500"} 
                                                    focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600`}
                                        onClick={handleResultImages}
                                        disabled={selectedImage === null}
                                    >
                                        {loading && <LoadingSpinner/>}
                                        開始尋找
                                    </button>
                                </div>
                                <SearchResult resultImages={resultImages}/>
                            </div>

                            <CenterText text={"過去尋找記錄"}/>
                            <div className="overflow-hidden rounded-lg bg-white shadow mb-4">
                                <div className="px-4 py-5 sm:p-6">
                                    <ul role="list"
                                        className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8">
                                        {files.map((file, index) => (
                                            <li key={index}>
                                                <a href="#" onClick={() => handleHistoryClick()}>
                                                    <div
                                                        className="group aspect-h-7 aspect-w-10 overflow-hidden rounded-lg bg-gray-100">
                                                        <img src={file.source}
                                                             className="object-cover group-hover:opacity-75"/>
                                                    </div>
                                                    <p className="mt-2 block truncate text-sm font-medium text-gray-900">{file.time.toLocaleString()}</p>
                                                </a>
                                            </li>
                                        ))}
                                    </ul>
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

export function ImageHeaderText(props: { text: string; }) {
    return (
        <div className="mt-4 mb-2 mx-auto max-w-2xl text-center">
            <p className={`text-2xl sm:text-base font-bold tracking-tight text-gray-900`}>
                {props.text}
            </p>
        </div>
    );
}

export function ImageViewer(props: { id: string; src: string; }) {
    return (
        <div className="group aspect-h-7 aspect-w-10 overflow-hidden rounded-lg bg-gray-100">
            <div className="group-hover:opacity-75">
                <SimpleGallery id={props.id} images={[{largeURL: props.src}]} objectFit="contain"/>
            </div>
        </div>
    );
}
