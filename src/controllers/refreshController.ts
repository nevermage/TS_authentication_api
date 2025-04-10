import * as http from 'http';
import {notAuthorizedResponse, successResponse} from "../responses";
import {RequestData, UserData} from "../types";
import {generateAccessToken, verifyRefreshToken} from "../modules";
import {JsonWebTokenError, TokenExpiredError} from "jsonwebtoken";

export function refreshController(request: RequestData, response: http.ServerResponse): void {
    const cookieHeader = request.headers['cookie'];
    if (!cookieHeader) {
        return notAuthorizedResponse(response, 'No refresh token provided')
    }

    const refreshToken = cookieHeader?.split('=')[1];
    if (!refreshToken) {
        return notAuthorizedResponse(response, 'No refresh token provided');
    }

    try {
        const userData: UserData = verifyRefreshToken(refreshToken);
        const token: string = generateAccessToken(userData);
        successResponse(response, { token });
    } catch (e) {
        if (e instanceof JsonWebTokenError || e instanceof TokenExpiredError) {
            return notAuthorizedResponse(response, e.message)
        }

        return notAuthorizedResponse(response);
    }
}
