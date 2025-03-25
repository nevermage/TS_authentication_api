import http from "http";

export function successResponse(response: http.ServerResponse, data: object): void {
    response.writeHead(200, { 'Content-Type': 'application/json' });
    response.end(JSON.stringify(data));
}