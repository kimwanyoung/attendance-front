import axios from "axios";
import {HOST} from "../const/global.const";

export class ManageToken {
    private static refreshToken = localStorage.getItem('refreshToken');

    static async rotateToken() {
        console.log('rotating...');
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
}