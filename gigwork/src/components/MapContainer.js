import React, { useEffect, useState } from 'react';
import markerImg from '../asset/img/marker.png'

const { kakao } = window;

const MapContainer = ({ myloc, makerloc }) => {

    useEffect(() => {
        const container = document.getElementById('myMap'); //지도를 표시할 div
        const options = {
            center: new kakao.maps.LatLng(myloc.lat, myloc.lng),
            level: 6
        };
        const map = new kakao.maps.Map(container, options); //지도를 생성

        const imageSrc = markerImg
        const imageSize = new kakao.maps.Size(40, 40)
        const imageOption = {offset: new kakao.maps.Point(20, 40)}

        const makerImage = new kakao.maps.MarkerImage(imageSrc, imageSize, imageOption)
        const myMarker = new kakao.maps.Marker({
            position: new kakao.maps.LatLng(myloc.lat, myloc.lng),
            image: makerImage
        })
        myMarker.setMap(map)


        const markerPosition = new kakao.maps.LatLng(makerloc.lat, makerloc.lng)

        // 입력받은 위치에 표출할 마커
        const marker = new kakao.maps.Marker({
            position: markerPosition   //지도 중심좌표에 마커를 생성
        });

        myloc!=makerloc&&marker.setMap(map)  //지도에 마커를 표시

    }, [makerloc]);

    return (
        <div id='myMap'></div>
    );
}

export default MapContainer; 