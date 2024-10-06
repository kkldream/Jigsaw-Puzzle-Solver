import {ChangeEvent, Fragment, useMemo, useState} from 'react'
import {Dialog, Transition} from '@headlessui/react'
import {imageFileToBase64Url} from "@/service/base64Service";
import {useRouter} from 'next/navigation'
import {ImageViewer} from "@/app/_components/ImageViewer";
import api from "@/service/apiService";
import LoadingSpinner from "@/app/_components/LoadingSpinner";

export default function NewProjectModel(props: {
    open: boolean;
    setOpen: (value: (((prevState: boolean) => boolean) | boolean)) => void;
}) {
    const router = useRouter();
    const [projectName, setProjectName] = useState<string>("");
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [uploadLoading, setUploadLoading] = useState<boolean>(false);
    const checkCanUpload = useMemo(() => projectName !== "" && imageFile !== null, [projectName, imageFile]);

    function handleInputFile(e: ChangeEvent<HTMLInputElement>) {
        if (e.target.files && e.target.files[0])
            setImageFile(e.target.files[0]);
    }

    async function handleButtonClick(isOk: boolean) {
        setUploadLoading(true);
        if (isOk) {
            if (!checkCanUpload) throw new Error("Invalid input");
            const res = await api.project.POST(projectName, await imageFileToBase64Url(imageFile as File));
            if (res.success) {
                router.push(`/project/${res.result.projectId}`);
                return;
            }
        }
        props.setOpen(false);
        setProjectName("");
        setImageFile(null);
        setUploadLoading(false);
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
                                            建立新的專案
                                        </Dialog.Title>
                                        <div className="mt-2">
                                            <div className="relative">
                                                <label
                                                    htmlFor="name"
                                                    className="absolute -top-2 left-2 inline-block bg-white px-1 text-xs font-medium text-gray-900"
                                                >
                                                    專案名稱
                                                </label>
                                                <input
                                                    type="text"
                                                    name="name"
                                                    id="name"
                                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                    onChange={(e) => setProjectName(e.target.value)}
                                                />
                                            </div>
                                        </div>
                                        <div className="mt-2">
                                            <p className="text-sm text-gray-500">
                                                為你的專案取一個獨特的名稱，以方便後續能夠快速找到你的專案。
                                            </p>
                                        </div>
                                        <div className="mt-3">
                                            <div className="relative block w-full h-full">
                                                <label
                                                    htmlFor="file-upload"
                                                    className="relative block w-full rounded-lg border-2 border-dashed border-gray-300 text-center hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 cursor-pointer"
                                                >
                                                    {imageFile ?
                                                        <ImageViewer src={URL.createObjectURL(imageFile)} alt=""/>
                                                        : <span
                                                            className="m-8 block text-sm font-semibold text-gray-900">上傳完整拼圖</span>}
                                                </label>
                                                <input
                                                    id="file-upload"
                                                    type="file"
                                                    accept="image/*"
                                                    className="hidden"
                                                    onChange={handleInputFile}
                                                />
                                            </div>
                                        </div>
                                        <div className="mt-2">
                                            <p className="text-sm text-gray-500">
                                                1. 上傳一張完整拼圖的照片，越清楚查找的效果越好。<br/>
                                                2. 過大的提高解析度不一定會更清楚，反而可能讓查找效率降低。<br/>
                                                3. 若拼圖片數過多，用拍攝的效果會不好，建議用掃描的方式。
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
                                    <button
                                        type="button"
                                        className={`inline-flex w-full justify-center rounded-md px-3 py-2 text-sm font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 sm:col-start-2
                                                    ${(!checkCanUpload || uploadLoading) ? "bg-gray-500" : "bg-indigo-600 hover:bg-indigo-500"}`}
                                        onClick={() => handleButtonClick(true)}
                                        disabled={!checkCanUpload || uploadLoading}
                                    >
                                        {uploadLoading && <LoadingSpinner/>}
                                        確定
                                    </button>
                                    <button
                                        type="button"
                                        className={`mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 sm:col-start-1 sm:mt-0
                                                    ${uploadLoading ? "" : "hover:bg-gray-50"}`}
                                        onClick={() => handleButtonClick(false)}
                                        disabled={uploadLoading}
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
