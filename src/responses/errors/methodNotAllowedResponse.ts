import * as http from 'http';

export function methodNotAllowedResponse(response: http.ServerResponse): void {
    response.writeHead(405, { 'Content-Type': 'application/json' });
    response.end(JSON.stringify({ message: 'Method not allowed' }));
}