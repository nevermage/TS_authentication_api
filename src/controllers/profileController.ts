import * as http from 'http';
import {successResponse} from "../responses";
import {RequestDataAuthenticated} from "../types";

export function profileController(request: RequestDataAuthenticated, response: http.ServerResponse) {
    successResponse(response, request.userData);
}
