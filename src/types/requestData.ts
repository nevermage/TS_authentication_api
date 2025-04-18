import * as http from 'http';
import {UserData} from "./userData";

export interface RequestData {
    method: string;
    url: string;
    pathname: string;
    headers: http.IncomingHttpHeaders;
    params: Record<string, string>;
    body?: object;
    userData?: UserData;
}