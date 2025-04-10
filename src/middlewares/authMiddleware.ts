import http from "http";
import {notAuthorizedResponse} from "../responses";
import {verifyAccessToken} from "../modules";
import {RequestData, UserData} from "../types";
import {JsonWebTokenError, TokenExpiredError} from "jsonwebtoken";

export function authMiddleware(
    request: RequestData,
    response: http.ServerResponse,
    next: (req: RequestData, res: http.ServerResponse) => void
): void {
    if (!("authorization" in request.headers)) return notAuthorizedResponse(response);

    const authHeader: string | undefined = request.headers["authorization"];
    if (!authHeader) return notAuthorizedResponse(response);

    const token: string = authHeader.replace(/^Bearer\s+/, "");

    try {
        const userData: UserData | false = verifyAccessToken(token);
        if (!userData) return notAuthorizedResponse(response);

        request.userData = userData;
        next(request, response);
    } catch (e) {
        if (e instanceof TokenExpiredError || e instanceof JsonWebTokenError) {
            return notAuthorizedResponse(response, e.message);
        }

        console.error(e);
        notAuthorizedResponse(response);
    }
}