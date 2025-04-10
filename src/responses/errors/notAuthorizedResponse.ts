import * as http from 'http';

export function notAuthorizedResponse(response: http.ServerResponse, message?: string): void {
    response.writeHead(401, { 'Content-Type': 'application/json' });
    response.end(JSON.stringify({ message: message ?? 'Not authorized' }));
}