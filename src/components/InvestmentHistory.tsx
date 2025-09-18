import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { 
  Search, 
  Filter, 
  ArrowUpRight, 
  ArrowDownRight, 
  Calendar,
  TrendingUp,
  Download,
  Eye
} from "lucide-react";

// Sample investment history data
const investmentHistory = [
  {
    id: 1,
    assetName: "BBRI.JK",
    assetType: "saham",
    amount: 5000000,
    transactionType: "buy",
    date: "2024-01-15",
    currentValue: 5250000,
    profit: 250000,
    profitPercentage: 5.0,
    notes: "Bank dengan fundamental kuat"
  },
  {
    id: 2,
    assetName: "TLKM.JK", 
    assetType: "saham",
    amount: 3000000,
    transactionType: "sell",
    date: "2024-01-14",
    currentValue: 3500000,
    profit: 500000,
    profitPercentage: 16.67,
    notes: "Divestasi sebagian untuk rebalancing"
  },
  {
    id: 3,
    assetName: "Reksadana Saham ABC",
    assetType: "reksadana", 
    amount: 2500000,
    transactionType: "buy",
    date: "2024-01-13",
    currentValue: 2375000,
    profit: -125000,
    profitPercentage: -5.0,
    notes: "Investasi diversifikasi"
  },
  {
    id: 4,
    assetName: "Emas Antam 1gr",
    assetType: "emas",
    amount: 1000000,
    transactionType: "buy", 
    date: "2024-01-10",
    currentValue: 1080000,
    profit: 80000,
    profitPercentage: 8.0,
    notes: "Hedge against inflation"
  },
  {
    id: 5,
    assetName: "BMRI.JK",
    assetType: "saham",
    amount: 4000000,
    transactionType: "buy",
    date: "2024-01-08",
    currentValue: 4200000,
    profit: 200000,
    profitPercentage: 5.0,
    notes: "Bank BUMN dengan prospek bagus"
  },
];

const InvestmentHistory = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [filterTransaction, setFilterTransaction] = useState("all");
  const [selectedPeriod, setSelectedPeriod] = useState("all");

  // Filter logic
  const filteredHistory = investmentHistory.filter(item => {
    const matchesSearch = item.assetName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === "all" || item.assetType === filterType;
    const matchesTransaction = filterTransaction === "all" || item.transactionType === filterTransaction;
    
    // Simple period filter (in real app, this would be more sophisticated)
    let matchesPeriod = true;
    if (selectedPeriod !== "all") {
      const itemDate = new Date(item.date);
      const now = new Date();
      const daysDiff = (now.getTime() - itemDate.getTime()) / (1000 * 3600 * 24);
      
      switch (selectedPeriod) {
        case "7days":
          matchesPeriod = daysDiff <= 7;
          break;
        case "30days":
          matchesPeriod = daysDiff <= 30;
          break;
        case "90days":
          matchesPeriod = daysDiff <= 90;
          break;
      }
    }
    
    return matchesSearch && matchesType && matchesTransaction && matchesPeriod;
  });

  const totalInvestment = filteredHistory.reduce((sum, item) => sum + item.amount, 0);
  const totalCurrentValue = filteredHistory.reduce((sum, item) => sum + item.currentValue, 0);
  const totalProfit = totalCurrentValue - totalInvestment;
  const totalProfitPercentage = totalInvestment > 0 ? ((totalProfit / totalInvestment) * 100).toFixed(1) : 0;

  const getAssetTypeColor = (type: string) => {
    const colors = {
      saham: "bg-success/20 text-success border-success/20",
      reksadana: "bg-primary/20 text-primary border-primary/20", 
      emas: "bg-warning/20 text-warning border-warning/20",
      crypto: "bg-accent/20 text-accent border-accent/20",
      obligasi: "bg-muted text-muted-foreground border-muted",
    };
    return colors[type as keyof typeof colors] || colors.obligasi;
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold gradient-text">Riwayat Investasi</h1>
            <p className="text-muted-foreground mt-2">Pantau semua transaksi dan performa investasi Anda</p>
          </div>
          <Button variant="outline" className="hover-lift">
            <Download className="mr-2 h-4 w-4" />
            Export Data
          </Button>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="investment-card">
            <CardContent className="p-4">
              <div className="text-sm text-muted-foreground">Total Investasi</div>
              <div className="text-xl font-bold">
                Rp {totalInvestment.toLocaleString('id-ID')}
              </div>
            </CardContent>
          </Card>
          
          <Card className="investment-card">
            <CardContent className="p-4">
              <div className="text-sm text-muted-foreground">Nilai Saat Ini</div>
              <div className="text-xl font-bold">
                Rp {totalCurrentValue.toLocaleString('id-ID')}
              </div>
            </CardContent>
          </Card>
          
          <Card className="investment-card profit-card">
            <CardContent className="p-4">
              <div className="text-sm text-muted-foreground">Total Keuntungan</div>
              <div className={`text-xl font-bold ${totalProfit >= 0 ? 'text-success' : 'text-destructive'}`}>
                {totalProfit >= 0 ? '+' : ''}Rp {totalProfit.toLocaleString('id-ID')}
              </div>
            </CardContent>
          </Card>
          
          <Card className="investment-card">
            <CardContent className="p-4">
              <div className="text-sm text-muted-foreground">ROI</div>
              <div className={`text-xl font-bold flex items-center ${Number(totalProfitPercentage) >= 0 ? 'text-success' : 'text-destructive'}`}>
                {Number(totalProfitPercentage) >= 0 ? <TrendingUp className="h-4 w-4 mr-1" /> : <ArrowDownRight className="h-4 w-4 mr-1" />}
                {totalProfitPercentage}%
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card className="investment-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Filter className="h-5 w-5 text-primary" />
              Filter & Pencarian
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Cari nama aset..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              
              <Select value={filterType} onValueChange={setFilterType}>
                <SelectTrigger>
                  <SelectValue placeholder="Jenis Aset" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Semua Jenis</SelectItem>
                  <SelectItem value="saham">Saham</SelectItem>
                  <SelectItem value="reksadana">Reksadana</SelectItem>
                  <SelectItem value="emas">Emas</SelectItem>
                  <SelectItem value="crypto">Crypto</SelectItem>
                  <SelectItem value="obligasi">Obligasi</SelectItem>
                </SelectContent>
              </Select>
              
              <Select value={filterTransaction} onValueChange={setFilterTransaction}>
                <SelectTrigger>
                  <SelectValue placeholder="Jenis Transaksi" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Semua Transaksi</SelectItem>
                  <SelectItem value="buy">Beli</SelectItem>
                  <SelectItem value="sell">Jual</SelectItem>
                </SelectContent>
              </Select>
              
              <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
                <SelectTrigger>
                  <SelectValue placeholder="Periode" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Semua Periode</SelectItem>
                  <SelectItem value="7days">7 Hari Terakhir</SelectItem>
                  <SelectItem value="30days">30 Hari Terakhir</SelectItem>
                  <SelectItem value="90days">90 Hari Terakhir</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Investment History Table */}
        <Card className="investment-card">
          <CardHeader>
            <CardTitle>Daftar Transaksi ({filteredHistory.length} item)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filteredHistory.map((investment) => (
                <div key={investment.id} className="p-4 rounded-lg border bg-secondary/20 hover:bg-secondary/40 transition-colors">
                  <div className="grid grid-cols-1 lg:grid-cols-6 gap-4 items-center">
                    {/* Asset Info */}
                    <div className="lg:col-span-2">
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                          investment.transactionType === 'buy' ? 'bg-success/20' : 'bg-destructive/20'
                        }`}>
                          {investment.transactionType === 'buy' ? 
                            <ArrowUpRight className="h-5 w-5 text-success" /> : 
                            <ArrowDownRight className="h-5 w-5 text-destructive" />
                          }
                        </div>
                        <div>
                          <p className="font-semibold">{investment.assetName}</p>
                          <div className="flex items-center gap-2 mt-1">
                            <Badge variant="outline" className={getAssetTypeColor(investment.assetType)}>
                              {investment.assetType}
                            </Badge>
                            <span className="text-sm text-muted-foreground flex items-center">
                              <Calendar className="h-3 w-3 mr-1" />
                              {investment.date}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Investment Amount */}
                    <div className="text-center lg:text-left">
                      <p className="text-sm text-muted-foreground">Modal</p>
                      <p className="font-semibold">Rp {investment.amount.toLocaleString('id-ID')}</p>
                    </div>

                    {/* Current Value */}
                    <div className="text-center lg:text-left">
                      <p className="text-sm text-muted-foreground">Nilai Saat Ini</p>
                      <p className="font-semibold">Rp {investment.currentValue.toLocaleString('id-ID')}</p>
                    </div>

                    {/* Profit/Loss */}
                    <div className="text-center lg:text-left">
                      <p className="text-sm text-muted-foreground">Keuntungan</p>
                      <div className={`font-semibold ${investment.profit >= 0 ? 'text-success' : 'text-destructive'}`}>
                        <p>{investment.profit >= 0 ? '+' : ''}Rp {investment.profit.toLocaleString('id-ID')}</p>
                        <p className="text-sm">({investment.profitPercentage >= 0 ? '+' : ''}{investment.profitPercentage}%)</p>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex justify-center lg:justify-end">
                      <Button variant="ghost" size="sm" className="hover-lift">
                        <Eye className="h-4 w-4 mr-1" />
                        Detail
                      </Button>
                    </div>
                  </div>
                  
                  {/* Notes */}
                  {investment.notes && (
                    <div className="mt-3 pt-3 border-t border-border/50">
                      <p className="text-sm text-muted-foreground">
                        <span className="font-medium">Catatan:</span> {investment.notes}
                      </p>
                    </div>
                  )}
                </div>
              ))}

              {filteredHistory.length === 0 && (
                <div className="text-center py-12">
                  <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                    <Search className="h-8 w-8 text-muted-foreground" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">Tidak ada data ditemukan</h3>
                  <p className="text-muted-foreground">Coba ubah filter atau kata kunci pencarian Anda</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default InvestmentHistory;