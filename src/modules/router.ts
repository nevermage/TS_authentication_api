import http from "http";
import {loginController, profileController} from "../controllers";
import {methodNotAllowedResponse} from "../responses";
import {authMiddleware} from "../middlewares/authMiddleware";
import {RequestData} from "../types";
import {parseRequest} from "../utils";
import {refreshController} from "../controllers/refreshController";

export async function route(req: http.IncomingMessage, response: http.ServerResponse): Promise<void> {
    const request: RequestData = await parseRequest(req);

    switch (request.pathname) {
        case '/login':
            if (req.method !== 'POST') {
                return methodNotAllowedResponse(response);
            }

            await loginController(request, response);
            break;
        case '/profile':
            if (req.method !== 'GET') {
                return methodNotAllowedResponse(response);
            }

            authMiddleware(request, response, profileController);
            break;
        case '/refresh':
            if (req.method !== 'GET') {
                return methodNotAllowedResponse(response);
            }

            refreshController(request, response);
            break;
        default:
            response.writeHead(404, { 'Content-Type': 'text/plain' })
            response.end('Page not found');
    }
}
