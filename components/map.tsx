import { FC, useEffect, useRef, useState, useCallback } from 'react';

type Point = {
  lat: number;
  lng: number;
alt: number;
  acc: number;
  label: string;
};

const points: Point[] = [
  { lat: 51.22075269192945, lng: 4.409898604878598, alt: 52, acc:1, label: 'Point 0' },
  { lat: 51.22085269192944, lng: 4.409998604778598, alt: 52, acc:1, label: 'Point 1' },
  { lat: 51.22065269192943, lng: 4.409798604678598, alt: 52, acc:1, label: 'Point 2' },
  { lat: 51.22075269192942, lng: 4.410098604578598, alt: 52, acc:1, label: 'Point 3' },
  { lat: 51.22085269192941, lng: 4.409798604478598, alt: 52, acc:1, label: 'Point 4' },
  { lat: 51.22065269192940, lng: 4.409998604378598, alt: 52, acc:1, label: 'Point 5' },
];

const compassDirections = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW', 'N'];


const MapView: FC = () => {
  const [initialPosition, setInitialPosition] = useState<Point>({ lat: 0, lng: 0, alt: 0, acc:100, label: 'You' });
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [direction, setDirection] = useState<string>('');

  const convertAlphaToDirection = (alpha: number) => {
    const index = Math.round(alpha / 45);
    return compassDirections[index];
  };

  useEffect(() => {
    const handleOrientation = (event: DeviceOrientationEvent) => {
      const { alpha } = event;
      if (alpha !== null) {
        setDirection(convertAlphaToDirection(alpha));
      }
    };

    window.addEventListener('deviceorientation', handleOrientation, true);
    return () => {
      window.removeEventListener('deviceorientation', handleOrientation, true);
    };
  }, []);

  const drawMap = useCallback(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        points.forEach(point => {
        const { x, y } = convertCoordsToCanvas(point.lat, point.lng);
        drawPoint(ctx, x, y, 'blue');
        });

        const userCoords = convertCoordsToCanvas(initialPosition.lat, initialPosition.lng);
        drawPoint(ctx, userCoords.x, userCoords.y, 'red');
      }
    }
  }, [initialPosition]);
    


    const convertCoordsToCanvas = (lat: number, lng: number) => {
    const canvas = canvasRef.current;
    if (canvas) {
        const ctx = canvas.getContext('2d');
        if (ctx) {
        const padding = 80; // Adjust this value for more or less padding
        const width = canvas.width - 2 * padding;
        const height = canvas.height - 2 * padding;

        const min_x = points.reduce((min, p) => p.lng < min ? p.lng : min, points[0].lng);
        const max_x = points.reduce((max, p) => p.lng > max ? p.lng : max, points[0].lng);
        const min_y = points.reduce((min, p) => p.lat < min ? p.lat : min, points[0].lat);
        const max_y = points.reduce((max, p) => p.lat > max ? p.lat : max, points[0].lat);

        const x = padding + (lng - min_x) / (max_x - min_x) * width;
        const y = padding + (lat - min_y) / (max_y - min_y) * height;
        return { x, y };
        }
    }
    return { x: 0, y: 0 };
    };

  const drawPoint = (ctx: CanvasRenderingContext2D, x: number, y: number, color: string) => {
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(x, y, 5, 0, 2 * Math.PI);
    ctx.fill();
  };

    const success = (position: GeolocationPosition) => {
      console.log(position);
        setInitialPosition({
        lat: position.coords.latitude,
        lng: position.coords.longitude,
            alt: position.coords.altitude || 0,
        acc: position.coords.accuracy,
        label: 'You'
        });
  };

  const error = () => {
    console.log('Unable to retrieve your location');
  };

  const options: PositionOptions = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0,
  };

  useEffect(() => {
    navigator.geolocation.watchPosition(success, error, options);
  }, []);

  useEffect(() => {
    drawMap();
  }, [initialPosition, drawMap]);

  useEffect(() => {
    const handleResize = () => {
      drawMap();
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [drawMap]);

  return (
    <div className="mx-auto max-w-2xl px-4 flex flex-col">
          <canvas
              className='border-2 border-gray-500 bg-gray-800 rounded-md'
              ref={canvasRef} width={400} height={400}></canvas>
      <span>Latitude: {initialPosition.lat}</span>
      <span>Longitude: {initialPosition.lng}</span>
          <span>Altitude: {initialPosition.alt}</span>
          <span>Accuracy: {initialPosition.acc}</span>
            <span>Direction: {direction}</span>
    </div>
  );
};

export default MapView;
