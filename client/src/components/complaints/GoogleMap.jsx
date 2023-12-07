import React, { useEffect, useRef } from 'react';

const GoogleMap = ({ place }) => {
  const mapRef = useRef(null);

  useEffect(() => {
    const googleMapScript = document.createElement('script');
    googleMapScript.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyDlV1SphAlw5YPrtcAOFJRNWvSR4LC21CU&libraries=places`;
    window.document.body.appendChild(googleMapScript);

    googleMapScript.addEventListener('load', () => {
      const map = new window.google.maps.Map(mapRef.current, {
        center: { lat: 5.75763, lng: -0.22118 },
        zoom: 19,
        mapTypeId: 'satellite',
        mapTypeControl: true,
        
      });

       const marker = new window.google.maps.Marker({
               position: { lat: 5.75763, lng: -0.22118 },
              map: map,
              title: "Ashesi University",
            });

      const geocoder = new window.google.maps.Geocoder();

      const geocodePlace = (placeName) => {
        geocoder.geocode({ address: placeName }, (results, status) => {
          if (status === 'OK') {
            const location = results[0].geometry.location;
            const marker = new window.google.maps.Marker({
              position: location,
              map: map,
              title: placeName,
            });
            map.setCenter(location);
          } else {
            console.error('Geocode was not successful for the following reason:', status);
          }
        });
      };

      geocodePlace("Fab Lab 203");
    });
  }, [place]);

  return <div ref={mapRef} style={{ width: '100%', height: '400px' }}></div>;
};

export default GoogleMap;
