export interface ResponseBase<T> {
    success: boolean;
    result: T;
    error: null | {
        name: string;
        message: string;
        stack: string;
    };
}

export function ResponseSuccess<T>(result: T) {
    const res: ResponseBase<T> = {
        success: true,
        result: result,
        error: null,
    };
    return Response.json(res);
}

export function ResponseFail(err: Error) {
    const res: ResponseBase<null> = {
        success: false,
        result: null,
        error: {
            name: err.name,
            message: err.message,
            stack: err.stack || "",
        },
    };
    return Response.json(res);
}
