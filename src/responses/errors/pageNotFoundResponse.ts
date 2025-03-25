import * as http from 'http';

export function pageNotFoundResponse(response: http.ServerResponse): void {
    response.writeHead(404, { 'Content-Type': 'application/json' });
    response.end(JSON.stringify({ message: 'Page not found' }));
}