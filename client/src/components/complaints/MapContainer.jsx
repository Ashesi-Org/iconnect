import React, { useEffect } from 'react';
import * as atlas from 'azure-maps-control';
import 'azure-maps-control/dist/atlas.min.css';

function MapContainer({ pinCoordinates }) {
  useEffect(() => {
    let map = null;

    const initializeMap = () => {
      map = new atlas.Map('map', {
        center: [5.75763, 0.22118],
        zoom: 6,
        authOptions: {
          authType: 'subscriptionKey',
          subscriptionKey: 'Rt6PnQpVtBeFoQ41tnau_zGDoEo4CFE_GpELxNGbYDw',
        },
      });

      const addPin = () => {
        if (pinCoordinates) {
          const pin = new atlas.HtmlMarker({
            position: pinCoordinates,
            color: 'DodgerBlue',
            text: 'My Pin',
          });

          map.markers.add(pin); // Add the pin to the map
        }
      };

      const handleReady = () => {
        addPin();
      };

      map.events.add('ready', handleReady);
    };

    const cleanup = () => {
      if (map) {
        map.markers.clear(); // Clear all the pins from the map
        map.dispose();
      }
    };

    initializeMap();

    return cleanup;
  }, [pinCoordinates]);

  return <div id="map" style={{ width: '32rem', height: '25rem' }} />;
}

export default MapContainer;
