import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Satellite, Activity } from "lucide-react";

interface RegionData {
  id: string;
  name: string;
  state: string;
  ndvi: number;
  rainfall: number;
  soilMoisture: number;
  status: "healthy" | "warning" | "critical";
}

const SatelliteMap = () => {
  const regions: RegionData[] = [
    {
      id: "1",
      name: "Ifo Zone",
      state: "Ogun",
      ndvi: 0.75,
      rainfall: 85,
      soilMoisture: 78,
      status: "healthy",
    },
    {
      id: "2",
      name: "Ado-Odo",
      state: "Ogun",
      ndvi: 0.68,
      rainfall: 72,
      soilMoisture: 65,
      status: "warning",
    },
    {
      id: "3",
      name: "Abeokuta North",
      state: "Ogun",
      ndvi: 0.52,
      rainfall: 45,
      soilMoisture: 42,
      status: "critical",
    },
    {
      id: "4",
      name: "Kaduna Central",
      state: "Kaduna",
      ndvi: 0.82,
      rainfall: 92,
      soilMoisture: 88,
      status: "healthy",
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "healthy":
        return "bg-vegetation text-vegetation-foreground";
      case "warning":
        return "bg-harvest text-harvest-foreground";
      case "critical":
        return "bg-destructive text-destructive-foreground";
      default:
        return "bg-muted ";
    }
  };

  return (
    <Card className="p-6 shadow-earth bg-[#1A1D23] text-white">
      <div className="flex items-center space-x-2 mb-6">
        <Satellite className="w-5 h-5 text-sky" />
        <h3 className="text-lg font-semibold">Satellite Monitoring Regions</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {regions.map((region) => (
          <div
            key={region.id}
            className="p-4 border rounded-lg hover:shadow-glow transition-all duration-300 cursor-pointer"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center space-x-2">
                <MapPin className="w-4 h-4 text-sky" />
                <div>
                  <h4 className="font-medium ">{region.name}</h4>
                  <p className="text-sm ">{region.state} State</p>
                </div>
              </div>
              <Badge className={getStatusColor(region.status)}>
                {region.status}
              </Badge>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm ">NDVI Index</span>
                <div className="flex items-center space-x-2">
                  <div className="w-16 h-2 bg-muted rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-vegetation"
                      style={{ width: `${region.ndvi * 100}%` }}
                    />
                  </div>
                  <span className="text-sm font-medium">{region.ndvi.toFixed(2)}</span>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm ">Rainfall</span>
                <div className="flex items-center space-x-2">
                  <div className="w-16 h-2 bg-muted rounded-full overflow-hidden">
                    <div
                      className="h-full bg-sky"
                      style={{ width: `${region.rainfall}%` }}
                    />
                  </div>
                  <span className="text-sm font-medium">{region.rainfall}%</span>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm ">Soil Moisture</span>
                <div className="flex items-center space-x-2">
                  <div className="w-16 h-2 bg-muted rounded-full overflow-hidden">
                    <div
                      className="h-full bg-soil"
                      style={{ width: `${region.soilMoisture}%` }}
                    />
                  </div>
                  <span className="text-sm font-medium">{region.soilMoisture}%</span>
                </div>
              </div>
            </div>

            <div className="mt-3 pt-3 border-t">
              <div className="flex items-center space-x-1 text-xs ">
                <Activity className="w-3 h-3" />
                <span>Last updated: 2 hours ago</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default SatelliteMap;