import { Badge } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

interface EmergencyCardProps {
  title: string;
  description: string;
  type: string;
  urgencyLevel: number;
  address: string;
  contactName: string;
  onClick: () => void;
  isSelected: boolean;
  icon: React.ElementType;
  color: string;
}

export default function EmergencyCard({
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
  return (
    <Card
      className={`cursor-pointer transition-all duration-300 ${
        isSelected
          ? "ring-2 ring-primary shadow-lg transform scale-105"
          : "hover:shadow-md hover:scale-102"
      }`}
      onClick={onClick}
    >
      <CardHeader className="flex flex-row items-center gap-4">
        <div
          className={`rounded-full p-2 transition-all duration-300 ${
            isSelected ? "scale-110" : ""
          }`}
          style={{ backgroundColor: color }}
        >
          <Icon className="h-6 w-6 text-white" />
        </div>
        <div className="flex-1">
          <CardTitle className="text-lg">{title}</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground mb-2">{description}</p>
        <p className="text-sm">
          <strong>Type:</strong> {type}
        </p>
        <p className="text-sm">
          <strong>Address:</strong> {address}
        </p>
        <p className="text-sm">
          <strong>Contact:</strong> {contactName}
        </p>
      </CardContent>
    </Card>
  );
}
