"use client";

import SearchResult from "@/app/project/[projectId]/_components/SearchResult";
import {ChangeEvent, useEffect, useState} from "react";
import LoadingSpinner from "@/app/_components/LoadingSpinner";
import api from "@/service/apiService";
import {base64ToBase64Url, imageFileToBase64} from "@/service/base64Service";
import {SolveUrlItem} from "@/app/project/[projectId]/_type/SolveUrlItem";
import {ProjectItem} from "@/app/api/project/route";
import UploadGrid from "@/app/project/[projectId]/_components/UploadGrid";

export default function Page({params}: { params: { projectId: string } }) {
    const {projectId} = params;
    const [projectDoc, setProjectDoc] = useState<ProjectItem | null>(null);
    const [uploadImageFile, setUploadImageFile] = useState<File | null>(null);
    const [resultImages, setResultImages] = useState<SolveUrlItem[]>([]);
    const [searchLoading, setSearchLoading] = useState<boolean>(false);

    useEffect(() => {
        api.project.projectId.GET(projectId).then((res) => {
            setProjectDoc(res.result);
        });
    }, [projectId]);

    function handleInputFile(e: ChangeEvent<HTMLInputElement>) {
        if (e.target.files && e.target.files[0])
            setUploadImageFile(e.target.files[0]);
    }

    async function handleSearch() {
        setSearchLoading(true);
        try {
            if (!uploadImageFile) throw new Error("uploadImageFile is null");
            const res = await api.solve.POST(projectId, await imageFileToBase64(uploadImageFile));
            setResultImages(res.result.solves.map(item => ({
                name: item.name,
                base64Url: base64ToBase64Url(item.base64),
            })));
        } finally {
            setSearchLoading(false);
        }
    }

    return (
        <div className="py-12 sm:py-16 lg:pb-40">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto max-w-2xl text-center">
                    <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                        {projectDoc?.name || "載入中..."}
                    </h1>
                </div>
                <div className="mt-8 flow-root sm:mt-12">
                    <div
                        className="-m-2 rounded-xl bg-gray-900/5 p-2 ring-1 ring-inset ring-gray-900/10 lg:-m-4 lg:rounded-2xl lg:p-2">
                        <div className="mx-auto mb-8 max-w-7xl sm:px-6 lg:px-8">
                            <CenterText text={"尋找拼圖位置"}/>
                            <div className="overflow-hidden rounded-lg bg-white shadow">
                                <UploadGrid projectDoc={projectDoc}
                                            uploadImageFile={uploadImageFile}
                                            handleInputFile={handleInputFile}/>
                                <div className="mt-4 flex justify-center">
                                    <button
                                        type="button"
                                        className={`rounded-md px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm
                                                    ${(uploadImageFile === null || searchLoading) ? "bg-gray-500" : "bg-indigo-600 hover:bg-indigo-500"} 
                                                    focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600`}
                                        onClick={handleSearch}
                                        disabled={uploadImageFile === null || searchLoading}
                                    >
                                        {searchLoading && <LoadingSpinner/>}
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

function CenterText(props: { text: string; }) {
    return (
        <div className="mt-6 mb-4 mx-auto max-w-2xl text-center">
            <p className={`text-2xl sm:text-xl font-bold tracking-tight text-gray-900`}>
                {props.text}
            </p>
        </div>
    );
}
