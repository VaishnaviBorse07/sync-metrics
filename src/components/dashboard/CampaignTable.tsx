import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { MoreHorizontal, ArrowUpRight, ArrowDownRight, Minus } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

interface Campaign {
  id: string;
  name: string;
  status: "active" | "paused" | "completed";
  impressions: number;
  clicks: number;
  ctr: number;
  cpc: number;
  spend: number;
  conversions: number;
  roas: number;
  change: number;
}

const campaigns: Campaign[] = [
  {
    id: "1",
    name: "Q4 Holiday Campaign",
    status: "active",
    impressions: 245680,
    clicks: 7890,
    ctr: 3.21,
    cpc: 1.24,
    spend: 9784,
    conversions: 392,
    roas: 4.2,
    change: 12.5
  },
  {
    id: "2", 
    name: "Black Friday Promo",
    status: "active",
    impressions: 189430,
    clicks: 6125,
    ctr: 3.23,
    cpc: 1.18,
    spend: 7227,
    conversions: 318,
    roas: 3.8,
    change: -2.1
  },
  {
    id: "3",
    name: "Brand Awareness Drive",
    status: "paused",
    impressions: 156890,
    clicks: 4201,
    ctr: 2.68,
    cpc: 1.45,
    spend: 6091,
    conversions: 189,
    roas: 2.4,
    change: -8.3
  },
  {
    id: "4",
    name: "Product Launch Campaign", 
    status: "active",
    impressions: 312450,
    clicks: 10987,
    ctr: 3.52,
    cpc: 1.12,
    spend: 12305,
    conversions: 567,
    roas: 5.1,
    change: 18.7
  },
  {
    id: "5",
    name: "Retargeting Campaign",
    status: "completed",
    impressions: 98760,
    clicks: 3456,
    ctr: 3.50,
    cpc: 0.98,
    spend: 3387,
    conversions: 245,
    roas: 4.7,
    change: 6.2
  }
];

const getStatusBadge = (status: Campaign["status"]) => {
  const variants = {
    active: "default",
    paused: "secondary", 
    completed: "outline"
  } as const;

  const colors = {
    active: "bg-dashboard-positive/10 text-dashboard-positive",
    paused: "bg-warning/10 text-warning", 
    completed: "bg-muted text-muted-foreground"
  };

  return (
    <Badge variant={variants[status]} className={colors[status]}>
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </Badge>
  );
};

const getChangeIcon = (change: number) => {
  if (change > 0) return <ArrowUpRight className="h-3 w-3 text-dashboard-positive" />;
  if (change < 0) return <ArrowDownRight className="h-3 w-3 text-dashboard-negative" />;
  return <Minus className="h-3 w-3 text-muted-foreground" />;
};

const getChangeColor = (change: number) => {
  if (change > 0) return "text-dashboard-positive";
  if (change < 0) return "text-dashboard-negative";
  return "text-muted-foreground";
};

export const CampaignTable = () => {
  const formatNumber = (num: number) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num.toLocaleString();
  };

  const formatCurrency = (num: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(num);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-foreground">Active Campaigns</h3>
          <p className="text-sm text-muted-foreground">Monitor and manage your campaign performance</p>
        </div>
        <Button>Create Campaign</Button>
      </div>

      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[200px]">Campaign</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Impressions</TableHead>
              <TableHead className="text-right">Clicks</TableHead>
              <TableHead className="text-right">CTR</TableHead>
              <TableHead className="text-right">CPC</TableHead>
              <TableHead className="text-right">Spend</TableHead>
              <TableHead className="text-right">Conversions</TableHead>
              <TableHead className="text-right">ROAS</TableHead>
              <TableHead className="text-right">Change</TableHead>
              <TableHead className="w-[50px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {campaigns.map((campaign) => (
              <TableRow key={campaign.id} className="hover:bg-muted/50">
                <TableCell className="font-medium">
                  <div>
                    <div className="font-semibold text-foreground">{campaign.name}</div>
                    <div className="text-sm text-muted-foreground">ID: {campaign.id}</div>
                  </div>
                </TableCell>
                <TableCell>
                  {getStatusBadge(campaign.status)}
                </TableCell>
                <TableCell className="text-right font-mono">
                  {formatNumber(campaign.impressions)}
                </TableCell>
                <TableCell className="text-right font-mono">
                  {formatNumber(campaign.clicks)}
                </TableCell>
                <TableCell className="text-right font-mono">
                  {campaign.ctr.toFixed(2)}%
                </TableCell>
                <TableCell className="text-right font-mono">
                  {formatCurrency(campaign.cpc)}
                </TableCell>
                <TableCell className="text-right font-mono">
                  {formatCurrency(campaign.spend)}
                </TableCell>
                <TableCell className="text-right font-mono">
                  {campaign.conversions.toLocaleString()}
                </TableCell>
                <TableCell className="text-right font-mono">
                  {campaign.roas.toFixed(1)}x
                </TableCell>
                <TableCell className="text-right">
                  <div className={`flex items-center justify-end gap-1 ${getChangeColor(campaign.change)}`}>
                    {getChangeIcon(campaign.change)}
                    <span className="text-sm font-medium">
                      {campaign.change > 0 ? '+' : ''}{campaign.change.toFixed(1)}%
                    </span>
                  </div>
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="bg-popover">
                      <DropdownMenuItem>View Details</DropdownMenuItem>
                      <DropdownMenuItem>Edit Campaign</DropdownMenuItem>
                      <DropdownMenuItem>Duplicate</DropdownMenuItem>
                      <DropdownMenuItem className="text-destructive">
                        Pause Campaign
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};