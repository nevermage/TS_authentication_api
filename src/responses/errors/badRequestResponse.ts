import * as http from 'http';

export function badRequestResponse(response: http.ServerResponse, message?: string): void {
    response.writeHead(400, { 'Content-Type': 'application/json' });
    response.end(JSON.stringify({ message: message ?? 'Bad request' }));
}