import {Map} from "react-kakao-maps-sdk";
import {useEffect, useRef, useState} from "react";

const KakaoMap: React.FC<{ location: string }> = ({location}) => {
    const [mapOptions, setMapOptions] = useState({
        center: {
            lat: 0,
            lng: 0,
        },
        level: 3,
    })
    const mapRef = useRef<kakao.maps.Map>(null);

    useEffect(() => {
        const geocorder = new kakao.maps.services.Geocoder();
        geocorder.addressSearch(location, (results, status) => {
            if (status === kakao.maps.services.Status.OK && mapRef.current) {
                const result = results[0];
                setMapOptions(prevState => ({
                    ...prevState,
                    center: {
                        lat: +result.y,
                        lng: +result.x,
                    },
                }));
            }

        })
    }, [location]);

    return (
        <Map
            center={mapOptions.center}
            level={mapOptions.level}
            style={{width: "100%", height: "260px"}}
            ref={mapRef}
        />
    )
}

export default KakaoMap;