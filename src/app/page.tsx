"use client";

import { useState, useEffect, useMemo } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polygon,
  useMap,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

import {
  Loader2,
  MapPin,
  List,
  Droplet,
  Flame,
  Package,
  Home,
  HelpCircle,
  LucideIcon,
  ShieldAlert,
  AlertTriangle,
  Bell,
} from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { useEmergencies } from "../hooks/useEmergencies";

type EmergencyType =
  | "flood"
  | "fire"
  | "medical"
  | "supplies"
  | "shelter"
  | "other";

interface Emergency {
  id: string;
  title: string;
  description: string;
  type: EmergencyType;
  latitude: number;
  longitude: number;
  urgency_level: number;
  address: string;
  contact_name: string;
  created_at: string;
}

interface EmergencyCardProps {
  title: string;
  description: string;
  type: EmergencyType;
  urgencyLevel: number;
  address: string;
  contactName: string;
  onClick: () => void;
  isSelected: boolean;
  icon: LucideIcon;
  color: string;
}

const emergencyColors: Record<EmergencyType, string> = {
  flood: "#3b82f6",
  fire: "#ef4444",
  medical: "#10b981",
  supplies: "#f59e0b",
  shelter: "#8b5cf6",
  other: "#6b7280",
};

const emergencyIcons: Record<EmergencyType, LucideIcon> = {
  flood: Droplet,
  fire: Flame,
  medical: MapPin,
  supplies: Package,
  shelter: Home,
  other: HelpCircle,
};

const emergencyLabels: Record<EmergencyType, string> = {
  flood: "Inundación",
  fire: "Incendio",
  medical: "Emergencia Médica",
  supplies: "Suministros",
  shelter: "Refugio",
  other: "Otros",
};

// Coordenadas de la Comunidad Valenciana
const valencianCommunityCoords: [number, number][] = [
  [40.7, -0.2], // Noreste
  [40.7, -1.5], // Noroeste
  [37.8, -1.5], // Suroeste
  [37.8, 0.5], // Sureste
];

const centerCoord: [number, number] = [39.484, -0.753];

function EmergencyCard({
  title,
  description,
  type,
  urgencyLevel,
  address,
  contactName,
  onClick,
  isSelected,
  icon: Icon,
  color,
}: EmergencyCardProps) {
  const getUrgencyInfo = (level: number) => {
    if (level >= 8)
      return { icon: ShieldAlert, label: "Alta", color: "destructive" };
    if (level >= 5)
      return { icon: AlertTriangle, label: "Media", color: "warning" };
    return { icon: Bell, label: "Baja", color: "default" };
  };

  const urgencyInfo = getUrgencyInfo(urgencyLevel);
  const UrgencyIcon = urgencyInfo.icon;

  return (
    <Card
      className={`transition-colors hover:bg-accent/40 ${
        isSelected ? "border-primary" : ""
      }`}
      onClick={onClick}
    >
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Icon color={color} />
            <span>{title}</span>
          </div>
          <Badge variant={urgencyInfo.color as "default" | "destructive"}>
            <UrgencyIcon className="w-3 h-3 mr-1" />
            {urgencyInfo.label}
          </Badge>
        </CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-2 text-sm">
        <div>
          <strong>Tipo:</strong> {emergencyLabels[type]}
        </div>
        <div>
          <strong>Dirección:</strong> {address}
        </div>
        <div>
          <strong>Contacto:</strong> {contactName}
        </div>
      </CardContent>
      <CardFooter>
        <Button
          variant="outline"
          className="w-full"
          onClick={(e) => {
            e.stopPropagation();
            onClick();
          }}
        >
          {isSelected ? "Ocultar en mapa" : "Ver en mapa"}
        </Button>
      </CardFooter>
    </Card>
  );
}

interface EmergencyMarkerProps {
  emergency: Emergency;
}

function EmergencyMarker({ emergency }: EmergencyMarkerProps) {
  const map = useMap();

  useEffect(() => {
    map.setView([emergency.latitude, emergency.longitude], 10);
  }, [map, emergency]);

  const type = emergency.type;
  const iconPaths: Record<EmergencyType, string> = {
    flood: "M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z",
    fire: "M12 2c0 6-3 8-3 12a3 3 0 1 0 6 0c0-4-3-6-3-12",
    medical: "M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 1 1 16 0",
    supplies:
      "M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z",
    shelter: "M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z",
    other:
      "M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10zm0-14v4m0 4h.01",
  };

  const icon = L.divIcon({
    className: "custom-icon",
    html: `
      <div style="
        background-color: ${emergencyColors[type]};
        width: 30px;
        height: 30px;
        border-radius: 50%;
        border: 2px solid white;
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: 0 2px 4px rgba(0,0,0,0.2);
      ">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="${iconPaths[type]}"/>
        </svg>
      </div>
    `,
    iconSize: [30, 30],
    iconAnchor: [15, 15],
    popupAnchor: [0, -15],
  });

  return (
    <Marker position={[emergency.latitude, emergency.longitude]} icon={icon}>
      <Popup>
        <div className="font-semibold">{emergency.title}</div>
        <div className="text-sm text-gray-600">{emergency.address}</div>
      </Popup>
    </Marker>
  );
}

export default function HomePage() {
  const { data: emergencies, error, isLoading } = useEmergencies();
  const [selectedEmergency, setSelectedEmergency] = useState<Emergency | null>(
    null,
  );
  const [activeTab, setActiveTab] = useState("map");

  const sortedEmergencies = useMemo(() => {
    return emergencies?.sort((a, b) => b.urgency_level - a.urgency_level) || [];
  }, [emergencies]);

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <Alert variant="destructive" className="mx-auto mt-4 max-w-2xl">
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>{error.message}</AlertDescription>
      </Alert>
    );
  }

  const handleEmergencySelect = (emergencyId: string) => {
    const emergency = sortedEmergencies.find((e) => e.id === emergencyId);
    setSelectedEmergency(emergency === selectedEmergency ? null : emergency);
    setActiveTab("map");
  };

  return (
    <div className="flex flex-col h-screen bg-background">
      <header className="w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="w-full px-4 flex h-14 items-center">
          <h1 className="mr-4 hidden md:flex text-xl font-semibold">
            Unidos Emergency Response
          </h1>
          <h1 className="mr-4 md:hidden text-lg font-semibold">Unidos</h1>
        </div>
      </header>

      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className="flex-grow flex flex-col w-full"
      >
        <div className="w-full border-b px-4 py-2">
          <TabsList className="w-full flex justify-center space-x-2">
            <TabsTrigger
              value="map"
              className="flex-1 inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow"
            >
              <MapPin className="h-4 w-4 mr-2" />
              Map View
            </TabsTrigger>
            <TabsTrigger
              value="list"
              className="flex-1 inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow"
            >
              <List className="h-4 w-4 mr-2" />
              Emergencies
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="map" className="flex-grow p-0">
          <div className="h-full">
            <MapContainer
              center={centerCoord}
              zoom={8}
              style={{ height: "100%", width: "100%" }}
              zoomControl={false}
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <Polygon
                positions={valencianCommunityCoords}
                pathOptions={{
                  color: "blue",
                  fillColor: "blue",
                  fillOpacity: 0.2,
                }}
              />
              {selectedEmergency && (
                <EmergencyMarker
                  key={selectedEmergency.id}
                  emergency={selectedEmergency}
                />
              )}
            </MapContainer>
          </div>
        </TabsContent>

        <TabsContent value="list" className="flex-grow">
          <ScrollArea className="h-full p-4">
            <div className="space-y-4 max-w-4xl mx-auto">
              {sortedEmergencies.map((emergency) => (
                <EmergencyCard
                  key={emergency.id}
                  title={emergency.title}
                  description={emergency.description}
                  type={emergency.type}
                  urgencyLevel={emergency.urgency_level}
                  address={emergency.address}
                  contactName={emergency.contact_name}
                  onClick={() => handleEmergencySelect(emergency.id)}
                  isSelected={selectedEmergency?.id === emergency.id}
                  icon={emergencyIcons[emergency.type]}
                  color={emergencyColors[emergency.type]}
                />
              ))}
            </div>
          </ScrollArea>
        </TabsContent>
      </Tabs>
    </div>
  );
}
