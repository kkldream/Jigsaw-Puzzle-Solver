import {ResponseBase} from "@/app/api/responseMethod";
import {ApiProjectGet, ApiProjectPost, ProjectItem} from "@/app/api/project/route";
import {ApiSolvePost} from "@/app/api/solve/route";

const api = {
    project: {
        GET: async (limit: number = 100): Promise<ResponseBase<ApiProjectGet>> => {
            const res = await fetch(`/api/project?limit=${limit}`);
            return await res.json();
        },
        POST: async (name: string, base64Url: string): Promise<ResponseBase<ApiProjectPost>> => {
            const res = await fetch('/api/project', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({name, base64Url}),
            });
            return await res.json();
        },
        projectId: {
            GET: async (projectId: string): Promise<ResponseBase<ProjectItem>> => {
                const res = await fetch(`/api/project/${projectId}`);
                return await res.json();
            }
        }
    },
    solve: {
        POST: async (projectId: string, base64: string): Promise<ResponseBase<ApiSolvePost>> => {
            const res = await fetch(`/api/solve`, {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({projectId, base64}),
            });
            return await res.json();
        },
    },
};

export default api;
