export type BaseResponse<T> = SuccessResponse<T> | ErrorResponse;

export type SuccessResponse<T> = {
    success: true;
    data: T;
}

export type ErrorResponse = {
    success: false;
    message: string;
}

export function isSuccessResponse<T>(response: BaseResponse<T>): response is SuccessResponse<T> {
    return response.success;
}
export function isErrorResponse<T>(response: BaseResponse<T>): response is ErrorResponse {
    return !response.success;
}
