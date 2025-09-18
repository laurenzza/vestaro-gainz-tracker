import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  PieChart, 
  Plus,
  ArrowUpRight,
  ArrowDownRight
} from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart as RechartsPieChart, Cell, Pie } from 'recharts';

// Sample data - in real app this would come from API
const investmentData = [
  { month: 'Jan', value: 100000, profit: 5000 },
  { month: 'Feb', value: 110000, profit: 8000 },
  { month: 'Mar', value: 125000, profit: 12000 },
  { month: 'Apr', value: 118000, profit: -2000 },
  { month: 'May', value: 135000, profit: 15000 },
  { month: 'Jun', value: 142000, profit: 18000 },
];

const portfolioData = [
  { name: 'Saham', value: 45, color: 'hsl(var(--success))' },
  { name: 'Obligasi', value: 25, color: 'hsl(var(--primary))' },
  { name: 'Reksadana', value: 20, color: 'hsl(var(--accent))' },
  { name: 'Emas', value: 10, color: 'hsl(var(--warning))' },
];

const recentTransactions = [
  { id: 1, type: 'buy', asset: 'BBRI.JK', amount: 5000000, date: '2024-01-15', profit: 0 },
  { id: 2, type: 'sell', asset: 'TLKM.JK', amount: 3000000, date: '2024-01-14', profit: 500000 },
  { id: 3, type: 'buy', asset: 'BMRI.JK', amount: 2500000, date: '2024-01-13', profit: 0 },
];

const Dashboard = () => {
  const totalValue = 142000000;
  const totalProfit = 18000000;
  const profitPercentage = ((totalProfit / (totalValue - totalProfit)) * 100).toFixed(1);

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold gradient-text">Dashboard Investasi</h1>
            <p className="text-muted-foreground mt-2">Pantau performa investasi Anda secara real-time</p>
          </div>
          <Button className="bg-gradient-primary hover:opacity-90 shadow-investment">
            <Plus className="mr-2 h-4 w-4" />
            Tambah Investasi
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="investment-card hover-lift">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Total Portfolio
              </CardTitle>
              <DollarSign className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                Rp {totalValue.toLocaleString('id-ID')}
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                +2.5% dari bulan lalu
              </p>
            </CardContent>
          </Card>

          <Card className="investment-card profit-card hover-lift">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Total Keuntungan
              </CardTitle>
              <TrendingUp className="h-4 w-4 text-success" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-success">
                Rp {totalProfit.toLocaleString('id-ID')}
              </div>
              <p className="text-xs text-success mt-1 flex items-center">
                <ArrowUpRight className="h-3 w-3 mr-1" />
                +{profitPercentage}% ROI
              </p>
            </CardContent>
          </Card>

          <Card className="investment-card hover-lift">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Performa Bulan Ini
              </CardTitle>
              <PieChart className="h-4 w-4 text-accent" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-accent">
                +12.7%
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Outperforming market
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Line Chart */}
          <Card className="investment-card">
            <CardHeader>
              <CardTitle>Tren Investasi</CardTitle>
              <p className="text-sm text-muted-foreground">
                Perkembangan nilai portfolio dalam 6 bulan terakhir
              </p>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={investmentData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis 
                    dataKey="month" 
                    stroke="hsl(var(--muted-foreground))"
                    fontSize={12}
                  />
                  <YAxis 
                    stroke="hsl(var(--muted-foreground))"
                    fontSize={12}
                    tickFormatter={(value) => `${value/1000}K`}
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'hsl(var(--card))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px'
                    }}
                    formatter={(value: number) => [`Rp ${value.toLocaleString('id-ID')}`, 'Nilai']}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="value" 
                    stroke="hsl(var(--primary))" 
                    strokeWidth={3}
                    dot={{ fill: 'hsl(var(--primary))', strokeWidth: 2, r: 4 }}
                    activeDot={{ r: 6, stroke: 'hsl(var(--primary))', strokeWidth: 2 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Pie Chart */}
          <Card className="investment-card">
            <CardHeader>
              <CardTitle>Alokasi Portfolio</CardTitle>
              <p className="text-sm text-muted-foreground">
                Distribusi investasi berdasarkan jenis aset
              </p>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <RechartsPieChart>
                  <Pie 
                    data={portfolioData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {portfolioData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'hsl(var(--card))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px'
                    }}
                    formatter={(value: number) => [`${value}%`, 'Alokasi']}
                  />
                </RechartsPieChart>
              </ResponsiveContainer>
              
              <div className="grid grid-cols-2 gap-2 mt-4">
                {portfolioData.map((item, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <div 
                      className="w-3 h-3 rounded-full" 
                      style={{ backgroundColor: item.color }}
                    />
                    <span className="text-sm text-muted-foreground">
                      {item.name} ({item.value}%)
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Transactions */}
        <Card className="investment-card">
          <CardHeader>
            <CardTitle>Transaksi Terbaru</CardTitle>
            <p className="text-sm text-muted-foreground">
              Aktivitas investasi dalam 7 hari terakhir
            </p>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentTransactions.map((transaction) => (
                <div key={transaction.id} className="flex items-center justify-between p-4 rounded-lg bg-secondary/50 hover:bg-secondary/70 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      transaction.type === 'buy' ? 'bg-success/20' : 'bg-destructive/20'
                    }`}>
                      {transaction.type === 'buy' ? 
                        <ArrowUpRight className="h-5 w-5 text-success" /> : 
                        <ArrowDownRight className="h-5 w-5 text-destructive" />
                      }
                    </div>
                    <div>
                      <p className="font-medium">{transaction.asset}</p>
                      <p className="text-sm text-muted-foreground">{transaction.date}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">
                      Rp {transaction.amount.toLocaleString('id-ID')}
                    </p>
                    {transaction.profit !== 0 && (
                      <p className={`text-sm ${transaction.profit > 0 ? 'text-success' : 'text-destructive'}`}>
                        {transaction.profit > 0 ? '+' : ''}Rp {transaction.profit.toLocaleString('id-ID')}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;