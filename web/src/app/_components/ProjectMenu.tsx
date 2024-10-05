"use client";

import {ProjectItem} from "@/app/api/project/route";
import {useEffect, useState} from "react";
import {ImageViewer} from "@/app/_components/ImageViewer";
import api from "@/service/apiService";

export default function ProjectMenu(props: { max?: number }) {
    const [projects, setProjects] = useState<ProjectItem[] | null>(null);

    useEffect(() => {
        api.project.GET(props.max).then((data) => {
            setProjects(data.result.projects);
        });
    }, [props.max]);

    return projects ? (
        <ul role="list"
            className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8">
            {projects.map(project => (
                <li key={project.id}>
                    <div>
                        <ImageViewer src={project.imageUrl}
                                     alt={project.name}
                                     href={`/project/${project.id}`}/>
                        <p className="mt-2 block truncate text-sm font-medium text-gray-900">{project.name}</p>
                    </div>
                </li>
            ))}
        </ul>
    ) : (
        <div className="text-center">專案載入中...</div>
    );
}
