import axios from "axios";
import {HOST} from "../const/global.const";

export class ManageToken {

    static async rotateToken() {
        try {
            await this.requestToken(`${HOST}/auth/token/access`, true);
        } catch (error) {
            console.error('access token 재발급에 실패하였습니다. refreshToken재발급 후 다시 요청합니다.');
            await this.retryRotateToken();
        }
    }

    private static async retryRotateToken() {
        try {
            await this.requestToken(`${HOST}/auth/token/refresh`, false);
            await this.requestToken(`${HOST}/auth/token/access`, true);
        } catch (error) {
            console.error(error);
            throw new Error('토큰 재발급에 실패하였습니다.');
        }
    }

    private static async requestToken(url: string, isAccessToken: boolean) {
        const tokenType = isAccessToken ? 'accessToken' : 'refreshToken';
        const headers = this.createAuthorizationHeader();
        const response = await axios.post(url, {}, { headers });

        localStorage.setItem(tokenType, response.data[tokenType]);
    }

    private static createAuthorizationHeader() {
        return {
            Authorization: `Bearer ${this.refreshToken}`
        }
    }

    private static get refreshToken() {
        return localStorage.getItem('refreshToken');
    }
}