import fs from "fs";
import createHttpError from "http-errors";
import { JwtPayload, sign } from "jsonwebtoken";
import path from "path";
import { CONFIG } from "../config";

export class TokenService {

    generateAccessToken(payload: JwtPayload) {
        let privateKey: Buffer
        try {
            privateKey = fs.readFileSync(path.join(__dirname, '../../certs/private.pem'))
        } catch (error) {
            const err = createHttpError(500, 'Error while reading private key')
            throw err
        }

        const accessToken = sign(payload, privateKey, {
            algorithm: 'RS256',
            expiresIn: '1h',
            issuer: 'auth-service'
        })
        return accessToken
    }

    generateRefreshToken(payload: JwtPayload) {
        const refreshToken = sign(payload, CONFIG.REFRESH_TOKEN_SECRET!, {
            algorithm: 'HS256',
            expiresIn: '1y',
            issuer: 'auth-service',
            jwtid: String(payload.id)
        })
        return refreshToken
    }

}