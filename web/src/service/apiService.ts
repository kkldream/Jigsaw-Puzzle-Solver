import {ResponseBase} from "@/app/api/responseMethod";
import {ApiProjectGet, ApiProjectPost, ProjectItem} from "@/app/api/project/route";
import {ApiSolvePost} from "@/app/api/solve/route";
import {ApiAccountTokenGet} from "@/app/api/account/token/route";
import {ApiAccountLoginGet} from "@/app/api/account/login/route";

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
            },
        },
    },
    solve: {
        POST: async (token: string, projectId: string, base64: string): Promise<ResponseBase<ApiSolvePost>> => {
            const res = await fetch(`/api/solve`, {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({token, projectId, base64}),
            });
            return await res.json();
        },
    },
    account: {
        token: {
            GET: async (): Promise<ResponseBase<ApiAccountTokenGet>> => {
                const res = await fetch("/api/account/token", {
                    cache: "no-store",
                });
                return await res.json();
            },
        },
        login: {
            POST: async (token: string, username: string, password: string): Promise<ResponseBase<ApiAccountLoginGet>> => {
                console.log({token, username, password});
                const res = await fetch("/api/account/login", {
                    method: "POST",
                    body: JSON.stringify({token, username, password}),
                });
                return await res.json();
            },
        },
    },
};

export default api;
