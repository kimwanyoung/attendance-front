import { useKakaoLoader as useKakaoLoaderOrigin } from "react-kakao-maps-sdk"

export default function useKakaoLoader() {
    useKakaoLoaderOrigin({
        appkey: process.env.REACT_APP_KAKAO_API_KEY ? process.env.REACT_APP_KAKAO_API_KEY : "",
        libraries: ["clusterer", "drawing", "services"],
    })
}