import {ImageViewer} from "@/app/_components/ImageViewer";
import {ProjectItem} from "@/app/api/project/route";
import {ChangeEvent} from "react";
import ImageHeaderText from "@/app/project/[projectId]/_components/ImageHeaderText";
import NextImg from "next/image";

export default function UploadGrid(props: {
    projectDoc: ProjectItem | null;
    uploadImageFile: File | null;
    handleInputFile: (e: ChangeEvent<HTMLInputElement>) => void;
}) {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 px-6">
            <div className="flex flex-col">
                <ImageHeaderText text={"參考完整拼圖"}/>
                <div className="flex-grow">
                    <ImageViewer src={props.projectDoc?.image.url ?? ""} alt=""/>
                </div>
            </div>
            <div className="flex flex-col">
                <ImageHeaderText text={"上傳部分拼圖"}/>
                <div className="flex-grow">
                    <div className="relative block w-full h-full">
                        <label
                            htmlFor="file-upload"
                            className="relative block w-full rounded-lg border-2 border-dashed border-gray-300 text-center hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 cursor-pointer"
                        >
                            {props.uploadImageFile ? (
                                <div
                                    className="group aspect-h-7 aspect-w-10 overflow-hidden rounded-lg bg-gray-100">
                                    <NextImg className="object-contain group-hover:opacity-75"
                                             src={URL.createObjectURL(props.uploadImageFile)}
                                             fill
                                             alt="uploadImageFile"/>
                                </div>
                            ) : (
                                <div>
                                    <span
                                        className="m-8 block text-sm font-semibold text-gray-900">Upload a picture</span>
                                </div>
                            )}
                        </label>
                        <input
                            id="file-upload"
                            type="file"
                            accept="image/*"
                            className="hidden"
                            capture="environment"
                            onChange={props.handleInputFile}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
