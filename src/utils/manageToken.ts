import axios from "axios";
import {HOST} from "../const/global.const";

export class ManageToken {

    static async rotateToken() {
        try {
            await this.requestToken(`${HOST}/auth/token/access`, true);
        } catch (error) {
            await this.requestToken(`${HOST}/auth/token/refresh`, false);
            await this.requestToken(`${HOST}/auth/token/access`, true);
        }
    }

    private static async requestToken(url: string, isAccessToken: boolean) {
        const tokenType = isAccessToken ? 'accessToken' : 'refreshToken';
        const response = await axios.post(url, {}, {
            headers: {
                Authorization: `Bearer ${this.refreshToken}`
            }
        });

        localStorage.setItem(tokenType, response.data[tokenType]);
    }

    private static get refreshToken() {
        return localStorage.getItem('refreshToken');
    }
}