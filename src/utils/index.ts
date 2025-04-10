import {RequestData} from "../types";
import http from "http";

export function parseRequest(req: http.IncomingMessage): Promise<RequestData> {
    return new Promise((resolve) => {
        // Используем класс URL для удобного разбора
        const requestUrl = new URL(req.url || '', `http://${req.headers.host}`);
        const method = req.method || 'GET';
        const headers = req.headers;

        // Извлекаем параметры через URLSearchParams
        const params: Record<string, string> = {};
        requestUrl.searchParams.forEach((value, key) => {
            params[key] = value;
        });

        let body = '';

        req.on('data', (chunk: any) => {
            body += chunk;
        });

        req.on('end', () => {
            let parsedBody: any;
            try {
                parsedBody = body ? JSON.parse(body) : undefined;
            } catch {
                parsedBody = body;
            }

            resolve({
                method,
                url: requestUrl.pathname,
                pathname: requestUrl.pathname,
                headers,
                params,
                body: parsedBody,
            });
        });
    });
}