import { useState } from "react";
import { Calendar, Download, Filter, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { KpiCards } from "@/components/dashboard/KpiCards";
import { PerformanceCharts } from "@/components/dashboard/PerformanceCharts";
import { CampaignTable } from "@/components/dashboard/CampaignTable";

const Dashboard = () => {
  const [timeRange, setTimeRange] = useState("7d");
  const [refreshing, setRefreshing] = useState(false);

  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1000);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Campaign Analytics</h1>
              <p className="text-muted-foreground">Real-time performance insights and KPI monitoring</p>
            </div>
            
            <div className="flex items-center gap-4">
              <Select value={timeRange} onValueChange={setTimeRange}>
                <SelectTrigger className="w-32">
                  <Calendar className="mr-2 h-4 w-4" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="24h">Last 24h</SelectItem>
                  <SelectItem value="7d">Last 7 days</SelectItem>
                  <SelectItem value="30d">Last 30 days</SelectItem>
                  <SelectItem value="90d">Last 90 days</SelectItem>
                </SelectContent>
              </Select>
              
              <Button variant="outline" size="sm">
                <Filter className="mr-2 h-4 w-4" />
                Filters
              </Button>
              
              <Button 
                variant="outline" 
                size="sm" 
                onClick={handleRefresh}
                disabled={refreshing}
              >
                <RefreshCw className={`mr-2 h-4 w-4 ${refreshing ? 'animate-spin' : ''}`} />
                Refresh
              </Button>
              
              <Button size="sm">
                <Download className="mr-2 h-4 w-4" />
                Export
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-6 space-y-6">
        {/* KPI Overview */}
        <section>
          <h2 className="text-xl font-semibold mb-4 text-foreground">Key Performance Indicators</h2>
          <KpiCards timeRange={timeRange} />
        </section>

        {/* Performance Charts */}
        <section>
          <h2 className="text-xl font-semibold mb-4 text-foreground">Performance Trends</h2>
          <PerformanceCharts timeRange={timeRange} />
        </section>

        {/* Campaign Performance Table */}
        <section>
          <h2 className="text-xl font-semibold mb-4 text-foreground">Campaign Performance</h2>
          <Card className="p-6">
            <CampaignTable />
          </Card>
        </section>
      </main>
    </div>
  );
};

export default Dashboard;