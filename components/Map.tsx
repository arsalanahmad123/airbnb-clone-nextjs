'use client';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { useCountries } from '@/lib/getCountries';
import { icon } from 'leaflet';

export default function Map({ locationValue }: { locationValue: string }) {
    const { getCountryByValue } = useCountries();

    const latLang = getCountryByValue(locationValue)?.latLang;

    const ICON = icon({
        iconUrl:
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT3-7RzVUNlNTP-wB8BbuRlIIJfA4NJWwAIOg&s',
        iconSize: [40, 40],
    });

    return (
        <MapContainer
            scrollWheelZoom={false}
            className="h-[50vh] rounded-lg relative z-0"
            center={latLang ?? [52.505, -0.09]}
            zoom={8}
        >
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={latLang ?? [52.505, -0.09]} icon={ICON} />
        </MapContainer>
    );
}
