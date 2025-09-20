import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from "recharts";

interface PerformanceChartsProps {
  timeRange: string;
}

const impressionsData = [
  { date: "Mon", impressions: 48000, clicks: 1536, conversions: 72 },
  { date: "Tue", impressions: 52000, clicks: 1664, conversions: 83 },
  { date: "Wed", impressions: 45000, clicks: 1440, conversions: 68 },
  { date: "Thu", impressions: 58000, clicks: 1856, conversions: 91 },
  { date: "Fri", impressions: 62000, clicks: 1984, conversions: 97 },
  { date: "Sat", impressions: 38000, clicks: 1216, conversions: 57 },
  { date: "Sun", impressions: 41000, clicks: 1312, conversions: 62 }
];

const campaignPerformance = [
  { name: "Social Media", spend: 4200, revenue: 12600 },
  { name: "Search Ads", spend: 6800, revenue: 20400 },
  { name: "Display", spend: 3200, revenue: 8960 },
  { name: "Email", spend: 1500, revenue: 6000 },
  { name: "Video", spend: 5100, revenue: 14280 }
];

const conversionSources = [
  { name: "Organic Search", value: 32, color: "hsl(217, 91%, 60%)" },
  { name: "Paid Ads", value: 28, color: "hsl(142, 71%, 45%)" },
  { name: "Social Media", value: 18, color: "hsl(48, 96%, 53%)" },
  { name: "Direct", value: 12, color: "hsl(266, 85%, 58%)" },
  { name: "Email", value: 10, color: "hsl(0, 84%, 60%)" }
];

export const PerformanceCharts = ({ timeRange }: PerformanceChartsProps) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Impressions & Clicks Trend */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-semibold">Impressions & Clicks Trend</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={impressionsData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis 
                dataKey="date" 
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
              />
              <YAxis 
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
              />
              <Tooltip 
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "8px"
                }}
              />
              <Area 
                type="monotone" 
                dataKey="impressions" 
                stackId="1" 
                stroke="hsl(var(--primary))" 
                fill="hsl(var(--primary) / 0.2)" 
              />
              <Area 
                type="monotone" 
                dataKey="clicks" 
                stackId="2" 
                stroke="hsl(var(--accent))" 
                fill="hsl(var(--accent) / 0.2)" 
              />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Conversion Rate Over Time */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-semibold">Conversion Rate Trend</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={impressionsData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis 
                dataKey="date" 
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
              />
              <YAxis 
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
              />
              <Tooltip 
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "8px"
                }}
              />
              <Line 
                type="monotone" 
                dataKey="conversions" 
                stroke="hsl(var(--dashboard-positive))" 
                strokeWidth={3}
                dot={{ fill: "hsl(var(--dashboard-positive))", strokeWidth: 2, r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Campaign ROI Comparison */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-semibold">Campaign ROI Comparison</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={campaignPerformance}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis 
                dataKey="name" 
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
              />
              <YAxis 
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
              />
              <Tooltip 
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "8px"
                }}
              />
              <Bar dataKey="spend" fill="hsl(var(--destructive) / 0.8)" radius={[4, 4, 0, 0]} />
              <Bar dataKey="revenue" fill="hsl(var(--dashboard-positive))" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Traffic Sources */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-semibold">Conversion Sources</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={conversionSources}
                cx="50%"
                cy="50%"
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              >
                {conversionSources.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "8px"
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
};