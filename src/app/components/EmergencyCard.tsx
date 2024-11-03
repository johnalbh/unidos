import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from '../../../components/ui/card';

interface EmergencyCardProps {
  title: string;
  description: string | null;
  type?: string;
  urgencyLevel?: number;
  address?: string | null;
  contactName?: string;
}

export default function EmergencyCard({
  title,
  description,
  type = 'other',
  urgencyLevel = 1,
  address,
  contactName,
}: EmergencyCardProps) {
  return (
    <Card className="transition-shadow hover:shadow-lg">
      <CardHeader className="space-y-1">
        <div className="flex items-start justify-between">
          <CardTitle className="text-xl">{title}</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        {description && (
          <p className="mb-4 text-sm text-gray-600">{description}</p>
        )}
        {address && (
          <p className="flex items-center gap-2 text-sm">
            <span className="text-gray-500">📍</span>
            {address}
          </p>
        )}
        {contactName && (
          <p className="mt-2 flex items-center gap-2 text-sm">
            <span className="text-gray-500">👤</span>
            {contactName}
          </p>
        )}
      </CardContent>
    </Card>
  );
}
