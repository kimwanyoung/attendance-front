import axios from "axios";
import {HOST} from "../const/global.const";
import {FormEvent} from "react";

const rotateAccessToken = async () => {
    const refreshToken = localStorage.getItem('refreshToken');
    if(!refreshToken) {
        throw new Error('리프레시 토큰이 존재하지 않습니다.');
    }

    const response = await axios.post(`${HOST}/auth/token/access`, {}, {
        headers: {
            Authorization: `Bearer ${refreshToken}`
        }
    });

    const {accessToken} = response.data;
    localStorage.setItem('accessToken', accessToken);
    return accessToken;
}

const retryRequest = async (err: unknown, retryMethod: any, event?: FormEvent) => {
    if(axios.isAxiosError(err) && err.response?.status === 401) {
        try {
            await rotateAccessToken();
            await retryMethod(event);
        } catch (err) {
            console.error('Falid to rotate access token', err);
        }
    } else {
        console.error(err);
    }
}

export {rotateAccessToken, retryRequest};