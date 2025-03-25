import {login, generateAccessToken, generateRefreshToken, verifyRefreshToken} from "../modules";
import * as http from 'http';
import {badRequestResponse, notAuthorizedResponse, successResponse} from "../responses";
import {RequestData, UserData} from "../types";
import {ValidationError} from "../errors/validationError";


export async function loginController(request: RequestData, response: http.ServerResponse) {
    try {
        if (!('username' in request.params && 'password' in request.params)) {
            throw new ValidationError('username and password are required fields');
        }

        const userData: UserData | false = await login(request.params['username'], request.params['password']);

        if (userData) {
            const accessToken: string = generateAccessToken(userData);
            const refreshToken: string = generateRefreshToken(userData);

            response.setHeader('Set-Cookie', `refreshToken=${refreshToken}`);
            successResponse(response, { accessToken });
        } else {
            notAuthorizedResponse(response);
        }
    } catch (e) {
        if (e instanceof ValidationError) {
            return badRequestResponse(response, e.message);
        }

        console.error(e);
        notAuthorizedResponse(response);
    }
}