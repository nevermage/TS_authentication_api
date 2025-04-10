import {UserData} from "../types";
import {comparePasswords} from "./passwordManager";

const jwt = require('jsonwebtoken');

const users: Record<string, string> = { // of course for learning purposes only
    'user': '$2b$10$Cyw2QrS.9mPXTtIuQGP7u.bFsRSlYJIGri6WkIa/iGqWq6IRpj1Ra',
    'admin': '$2b$10$PiHVfGHEgLMcWTfQ367Af.AzBU8dBVlLb5tjL9K6BiB3j.JPx4S5.',
};

export async function login(username: string, password: string): Promise<UserData | false> {
    if (!Object.keys(users).includes(username)) {
        return false;
    }

    if (await comparePasswords(password, users[username])) {
        return {username: username};
    }

    return false;
}

export function generateAccessToken(userData: UserData): string {
    return jwt.sign({userData: userData}, process.env.ACCESS_SECRET, { expiresIn: process.env.ACCESS_EXPIRES_IN });
}

export function generateRefreshToken(userData: UserData): string {
    return jwt.sign({userData: userData}, process.env.REFRESH_SECRET, { expiresIn: process.env.REFRESH_EXPIRES_IN });
}

export function verifyAccessToken(token: string): UserData {
    const jwtPayload = jwt.verify(token, process.env.ACCESS_SECRET);
    return jwtPayload.userData;
}

export function verifyRefreshToken(token: string): UserData {
    const jwtPayload = jwt.verify(token, process.env.REFRESH_SECRET);
    return jwtPayload.userData;
}