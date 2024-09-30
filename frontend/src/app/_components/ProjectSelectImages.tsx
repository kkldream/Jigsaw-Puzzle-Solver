"use client";

import {ResponseBase} from "@/app/api/responseMethod";
import {ApiProjectGet, ProjectItem} from "@/app/api/project/route";
import {useEffect, useState} from "react";
import Link from "next/link";

export default function ProjectSelectImages(props: { max?: number }) {
    const [files, setFiles] = useState<ProjectItem[] | null>(null);
    useEffect(() => {
        fetch(`/api/project?limit=${props.max || 100}`)
            .then(response => response.json())
            .then((data: ResponseBase<ApiProjectGet>) => {
                setFiles(data.result.projects);
            });
    }, [props.max]);
    return (
        <ul role="list"
            className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8">
            {(files ?? []).map((file, index) => (
                <li key={index}>
                    <Link href={`/project/${file.id}`}>
                        <div className="group aspect-h-7 aspect-w-10 overflow-hidden rounded-lg bg-gray-100">
                            <img src={file.imageUrl} className="object-cover group-hover:opacity-75"/>
                        </div>
                        <p className="mt-2 block truncate text-sm font-medium text-gray-900">{file.name}</p>
                    </Link>
                </li>
            ))}
        </ul>
    );
}
