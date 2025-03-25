import * as http from 'http';
import dotenv from 'dotenv';
import {route} from "./modules";

dotenv.config();

const server = http.createServer((req: http.IncomingMessage, res: http.ServerResponse) => {
   route(req, res);
});

server.listen(3000, () => {
    console.log('Stared listening http://localhost:3000');
});
