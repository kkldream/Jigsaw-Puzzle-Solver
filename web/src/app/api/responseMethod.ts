export interface ResponseBase<T> {
    time: Date;
    success: boolean;
    result: T;
    error: null | {
        name: string;
        message: string;
        stack: string;
    };
}

export function ResponseSuccess<T = null>(result: T) {
    const res: ResponseBase<T> = {
        time: new Date(),
        success: true,
        result: result,
        error: null,
    };
    return Response.json(res);
}

export function ResponseFail(err: Error | string | unknown) {
    const error: Error = err instanceof Error ? err : typeof err === "string" ? new Error(err) : new Error("Unknown error");
    const res: ResponseBase<null> = {
        time: new Date(),
        success: false,
        result: null,
        error: {
            name: error.name,
            message: error.message,
            stack: error.stack || "",
        },
    };
    return Response.json(res);
}
