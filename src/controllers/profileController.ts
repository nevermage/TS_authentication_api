import * as http from 'http';
import {successResponse} from "../responses";
import {RequestData, UserData} from "../types";

export function profileController(request: RequestData, response: http.ServerResponse) {
    successResponse(response, request.userData as UserData);
}
