import { TrendingUp, TrendingDown, Users, MousePointer, DollarSign, Target } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface KpiCardProps {
  title: string;
  value: string;
  change: string;
  trend: "up" | "down" | "neutral";
  icon: React.ReactNode;
}

const KpiCard = ({ title, value, change, trend, icon }: KpiCardProps) => {
  const getTrendColor = () => {
    switch (trend) {
      case "up": return "text-dashboard-positive";
      case "down": return "text-dashboard-negative";
      default: return "text-dashboard-neutral";
    }
  };

  const TrendIcon = trend === "up" ? TrendingUp : trend === "down" ? TrendingDown : Target;

  return (
    <Card className="transition-all duration-200 hover:bg-card-hover hover:shadow-lg group">
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <p className="text-3xl font-bold text-foreground">{value}</p>
            <div className="flex items-center space-x-1">
              <TrendIcon className={`h-4 w-4 ${getTrendColor()}`} />
              <span className={`text-sm font-medium ${getTrendColor()}`}>
                {change}
              </span>
            </div>
          </div>
          <div className="p-3 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
            {icon}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

interface KpiCardsProps {
  timeRange: string;
}

export const KpiCards = ({ timeRange }: KpiCardsProps) => {
  const kpis = [
    {
      title: "Total Impressions",
      value: "2.4M",
      change: "+12.5% vs last period",
      trend: "up" as const,
      icon: <Users className="h-6 w-6 text-primary" />
    },
    {
      title: "Click-Through Rate",
      value: "3.2%",
      change: "+0.8% vs last period", 
      trend: "up" as const,
      icon: <MousePointer className="h-6 w-6 text-primary" />
    },
    {
      title: "Cost Per Click",
      value: "$1.24",
      change: "-8.2% vs last period",
      trend: "up" as const,
      icon: <DollarSign className="h-6 w-6 text-primary" />
    },
    {
      title: "Conversion Rate",
      value: "4.7%",
      change: "-2.1% vs last period",
      trend: "down" as const,
      icon: <Target className="h-6 w-6 text-primary" />
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {kpis.map((kpi, index) => (
        <KpiCard key={index} {...kpi} />
      ))}
    </div>
  );
};