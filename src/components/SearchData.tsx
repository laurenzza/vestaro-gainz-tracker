import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Label } from "@/components/ui/label";
import { 
  Search, 
  Filter, 
  Calendar as CalendarIcon,
  ArrowUpRight, 
  ArrowDownRight,
  TrendingUp,
  Download,
  X,
  RefreshCw
} from "lucide-react";
import { cn } from "@/lib/utils";
import { format, subDays, subMonths, startOfYear } from "date-fns";
import { id } from "date-fns/locale";

// Extended sample data for search
const searchData = [
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
    notes: "Bank dengan fundamental kuat",
    sector: "financial"
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
    notes: "Divestasi sebagian untuk rebalancing",
    sector: "telecommunication"
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
    notes: "Investasi diversifikasi",
    sector: "mixed"
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
    notes: "Hedge against inflation",
    sector: "commodity"
  },
  {
    id: 5,
    assetName: "BMRI.JK",
    assetType: "saham",
    amount: 4000000,
    transactionType: "buy",
    date: "2023-12-20",
    currentValue: 4200000,
    profit: 200000,
    profitPercentage: 5.0,
    notes: "Bank BUMN dengan prospek bagus",
    sector: "financial"
  },
  {
    id: 6,
    assetName: "GOTO.JK",
    assetType: "saham",
    amount: 2000000,
    transactionType: "buy",
    date: "2023-11-15",
    currentValue: 1800000,
    profit: -200000,
    profitPercentage: -10.0,
    notes: "Teknologi dengan potensi growth",
    sector: "technology"
  },
  {
    id: 7,
    assetName: "Obligasi Pemerintah 10Y",
    assetType: "obligasi",
    amount: 10000000,
    transactionType: "buy",
    date: "2023-10-01",
    currentValue: 10500000,
    profit: 500000,
    profitPercentage: 5.0,
    notes: "Safe haven investment",
    sector: "government"
  }
];

const SearchData = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [filterTransaction, setFilterTransaction] = useState("all");
  const [filterSector, setFilterSector] = useState("all");
  const [dateFrom, setDateFrom] = useState<Date | undefined>(undefined);
  const [dateTo, setDateTo] = useState<Date | undefined>(undefined);
  const [amountMin, setAmountMin] = useState("");
  const [amountMax, setAmountMax] = useState("");
  const [sortBy, setSortBy] = useState("date");
  const [sortOrder, setSortOrder] = useState("desc");

  // Quick filter presets
  const applyQuickFilter = (filter: string) => {
    const today = new Date();
    switch (filter) {
      case 'today':
        setDateFrom(today);
        setDateTo(today);
        break;
      case 'week':
        setDateFrom(subDays(today, 7));
        setDateTo(today);
        break;
      case 'month':
        setDateFrom(subMonths(today, 1));
        setDateTo(today);
        break;
      case 'quarter':
        setDateFrom(subMonths(today, 3));
        setDateTo(today);
        break;
      case 'year':
        setDateFrom(startOfYear(today));
        setDateTo(today);
        break;
    }
  };

  const clearFilters = () => {
    setSearchTerm("");
    setFilterType("all");
    setFilterTransaction("all");
    setFilterSector("all");
    setDateFrom(undefined);
    setDateTo(undefined);
    setAmountMin("");
    setAmountMax("");
  };

  // Advanced filtering logic
  const filteredData = searchData.filter(item => {
    const matchesSearch = item.assetName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.notes.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesType = filterType === "all" || item.assetType === filterType;
    const matchesTransaction = filterTransaction === "all" || item.transactionType === filterTransaction;
    const matchesSector = filterSector === "all" || item.sector === filterSector;
    
    const itemDate = new Date(item.date);
    const matchesDateFrom = !dateFrom || itemDate >= dateFrom;
    const matchesDateTo = !dateTo || itemDate <= dateTo;
    
    const matchesAmountMin = !amountMin || item.amount >= parseInt(amountMin);
    const matchesAmountMax = !amountMax || item.amount <= parseInt(amountMax);
    
    return matchesSearch && matchesType && matchesTransaction && matchesSector && 
           matchesDateFrom && matchesDateTo && matchesAmountMin && matchesAmountMax;
  }).sort((a, b) => {
    let aValue, bValue;
    
    switch (sortBy) {
      case 'date':
        aValue = new Date(a.date).getTime();
        bValue = new Date(b.date).getTime();
        break;
      case 'amount':
        aValue = a.amount;
        bValue = b.amount;
        break;
      case 'profit':
        aValue = a.profit;
        bValue = b.profit;
        break;
      case 'name':
        aValue = a.assetName.toLowerCase();
        bValue = b.assetName.toLowerCase();
        break;
      default:
        return 0;
    }
    
    if (sortOrder === 'asc') return aValue > bValue ? 1 : -1;
    return aValue < bValue ? 1 : -1;
  });

  const totalResults = filteredData.length;
  const totalInvestment = filteredData.reduce((sum, item) => sum + item.amount, 0);
  const totalCurrentValue = filteredData.reduce((sum, item) => sum + item.currentValue, 0);
  const totalProfit = totalCurrentValue - totalInvestment;

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

  const activeFiltersCount = [
    searchTerm,
    filterType !== "all" && filterType,
    filterTransaction !== "all" && filterTransaction,
    filterSector !== "all" && filterSector,
    dateFrom,
    dateTo,
    amountMin,
    amountMax
  ].filter(Boolean).length;

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold gradient-text flex items-center gap-2">
              <Search className="h-8 w-8" />
              Pencarian Data
            </h1>
            <p className="text-muted-foreground mt-2">
              Cari dan filter transaksi investasi dengan kriteria yang fleksibel
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={clearFilters} disabled={activeFiltersCount === 0}>
              <X className="h-4 w-4 mr-2" />
              Hapus Filter ({activeFiltersCount})
            </Button>
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Export Hasil
            </Button>
          </div>
        </div>

        {/* Search Results Summary */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="investment-card">
            <CardContent className="p-4">
              <div className="text-sm text-muted-foreground">Hasil</div>
              <div className="text-xl font-bold">{totalResults} transaksi</div>
            </CardContent>
          </Card>
          <Card className="investment-card">
            <CardContent className="p-4">
              <div className="text-sm text-muted-foreground">Total Investasi</div>
              <div className="text-xl font-bold">Rp {totalInvestment.toLocaleString('id-ID')}</div>
            </CardContent>
          </Card>
          <Card className="investment-card">
            <CardContent className="p-4">
              <div className="text-sm text-muted-foreground">Nilai Saat Ini</div>
              <div className="text-xl font-bold">Rp {totalCurrentValue.toLocaleString('id-ID')}</div>
            </CardContent>
          </Card>
          <Card className="investment-card profit-card">
            <CardContent className="p-4">
              <div className="text-sm text-muted-foreground">Total P&L</div>
              <div className={`text-xl font-bold flex items-center ${totalProfit >= 0 ? 'text-success' : 'text-destructive'}`}>
                {totalProfit >= 0 ? <TrendingUp className="h-4 w-4 mr-1" /> : <ArrowDownRight className="h-4 w-4 mr-1" />}
                {totalProfit >= 0 ? '+' : ''}Rp {totalProfit.toLocaleString('id-ID')}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Advanced Search Filters */}
        <Card className="investment-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Filter className="h-5 w-5 text-primary" />
              Filter Pencarian
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Quick Filters */}
            <div>
              <Label className="text-sm font-medium mb-3 block">Filter Cepat</Label>
              <div className="flex flex-wrap gap-2">
                {['today', 'week', 'month', 'quarter', 'year'].map((filter) => (
                  <Button
                    key={filter}
                    variant="outline"
                    size="sm"
                    onClick={() => applyQuickFilter(filter)}
                    className="capitalize"
                  >
                    {filter === 'today' ? 'Hari Ini' :
                     filter === 'week' ? '7 Hari' :
                     filter === 'month' ? '1 Bulan' :
                     filter === 'quarter' ? '3 Bulan' : '1 Tahun'}
                  </Button>
                ))}
              </div>
            </div>

            {/* Search and Basic Filters */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Cari nama aset atau catatan..."
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

              <Select value={filterSector} onValueChange={setFilterSector}>
                <SelectTrigger>
                  <SelectValue placeholder="Sektor" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Semua Sektor</SelectItem>
                  <SelectItem value="financial">Keuangan</SelectItem>
                  <SelectItem value="technology">Teknologi</SelectItem>
                  <SelectItem value="telecommunication">Telekomunikasi</SelectItem>
                  <SelectItem value="commodity">Komoditas</SelectItem>
                  <SelectItem value="government">Pemerintah</SelectItem>
                  <SelectItem value="mixed">Campuran</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Date Range and Amount Range */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <Label className="text-sm font-medium">Rentang Tanggal</Label>
                <div className="flex gap-2">
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "flex-1 justify-start text-left font-normal",
                          !dateFrom && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {dateFrom ? format(dateFrom, "dd MMM yyyy", { locale: id }) : "Dari tanggal"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={dateFrom}
                        onSelect={setDateFrom}
                        initialFocus
                        className="pointer-events-auto"
                      />
                    </PopoverContent>
                  </Popover>

                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "flex-1 justify-start text-left font-normal",
                          !dateTo && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {dateTo ? format(dateTo, "dd MMM yyyy", { locale: id }) : "Sampai tanggal"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={dateTo}
                        onSelect={setDateTo}
                        initialFocus
                        className="pointer-events-auto"
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>

              <div className="space-y-3">
                <Label className="text-sm font-medium">Rentang Jumlah (IDR)</Label>
                <div className="flex gap-2">
                  <Input
                    type="number"
                    placeholder="Min"
                    value={amountMin}
                    onChange={(e) => setAmountMin(e.target.value)}
                  />
                  <Input
                    type="number"
                    placeholder="Max"
                    value={amountMax}
                    onChange={(e) => setAmountMax(e.target.value)}
                  />
                </div>
              </div>
            </div>

            {/* Sort Options */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-sm font-medium">Urutkan berdasarkan</Label>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="date">Tanggal</SelectItem>
                    <SelectItem value="amount">Jumlah Investasi</SelectItem>
                    <SelectItem value="profit">Keuntungan</SelectItem>
                    <SelectItem value="name">Nama Aset</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-medium">Urutan</Label>
                <Select value={sortOrder} onValueChange={setSortOrder}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="desc">Terbesar ke Terkecil</SelectItem>
                    <SelectItem value="asc">Terkecil ke Terbesar</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Search Results */}
        <Card className="investment-card">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Hasil Pencarian ({totalResults} item)</span>
              <Button variant="outline" size="sm">
                <RefreshCw className="h-4 w-4 mr-2" />
                Refresh
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filteredData.map((item) => (
                <div key={item.id} className="p-4 rounded-lg border bg-secondary/20 hover:bg-secondary/40 transition-colors">
                  <div className="grid grid-cols-1 lg:grid-cols-6 gap-4 items-center">
                    {/* Asset Info */}
                    <div className="lg:col-span-2">
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                          item.transactionType === 'buy' ? 'bg-success/20' : 'bg-destructive/20'
                        }`}>
                          {item.transactionType === 'buy' ? 
                            <ArrowUpRight className="h-5 w-5 text-success" /> : 
                            <ArrowDownRight className="h-5 w-5 text-destructive" />
                          }
                        </div>
                        <div>
                          <p className="font-semibold">{item.assetName}</p>
                          <div className="flex items-center gap-2 mt-1">
                            <Badge variant="outline" className={getAssetTypeColor(item.assetType)}>
                              {item.assetType}
                            </Badge>
                            <span className="text-sm text-muted-foreground">
                              {format(new Date(item.date), "dd MMM yyyy", { locale: id })}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Investment Amount */}
                    <div className="text-center lg:text-left">
                      <p className="text-sm text-muted-foreground">Modal</p>
                      <p className="font-semibold">Rp {item.amount.toLocaleString('id-ID')}</p>
                    </div>

                    {/* Current Value */}
                    <div className="text-center lg:text-left">
                      <p className="text-sm text-muted-foreground">Nilai Saat Ini</p>
                      <p className="font-semibold">Rp {item.currentValue.toLocaleString('id-ID')}</p>
                    </div>

                    {/* Profit/Loss */}
                    <div className="text-center lg:text-left">
                      <p className="text-sm text-muted-foreground">P&L</p>
                      <div className={`font-semibold ${item.profit >= 0 ? 'text-success' : 'text-destructive'}`}>
                        <p>{item.profit >= 0 ? '+' : ''}Rp {item.profit.toLocaleString('id-ID')}</p>
                        <p className="text-sm">({item.profitPercentage >= 0 ? '+' : ''}{item.profitPercentage}%)</p>
                      </div>
                    </div>

                    {/* Sector */}
                    <div className="text-center lg:text-right">
                      <p className="text-sm text-muted-foreground">Sektor</p>
                      <Badge variant="secondary" className="capitalize">
                        {item.sector}
                      </Badge>
                    </div>
                  </div>
                  
                  {/* Notes */}
                  {item.notes && (
                    <div className="mt-3 pt-3 border-t border-border/50">
                      <p className="text-sm text-muted-foreground">
                        <span className="font-medium">Catatan:</span> {item.notes}
                      </p>
                    </div>
                  )}
                </div>
              ))}

              {filteredData.length === 0 && (
                <div className="text-center py-12">
                  <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                    <Search className="h-8 w-8 text-muted-foreground" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">Tidak ada data ditemukan</h3>
                  <p className="text-muted-foreground">Coba ubah kriteria pencarian atau filter Anda</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SearchData;