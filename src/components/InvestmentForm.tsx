import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Calendar, DollarSign, TrendingUp, Save } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const InvestmentForm = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    assetName: '',
    assetType: '',
    amount: '',
    transactionType: 'buy',
    date: '',
    notes: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.assetName || !formData.amount || !formData.date) {
      toast({
        title: "Error",
        description: "Mohon lengkapi semua field yang wajib diisi",
        variant: "destructive"
      });
      return;
    }

    // Simulate saving
    toast({
      title: "Berhasil!",
      description: "Transaksi investasi berhasil dicatat",
      variant: "default"
    });

    // Reset form
    setFormData({
      assetName: '',
      assetType: '',
      amount: '',
      transactionType: 'buy',
      date: '',
      notes: ''
    });
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-3xl font-bold gradient-text mb-2">Catat Transaksi Investasi</h1>
          <p className="text-muted-foreground">
            Tambahkan transaksi investasi baru ke dalam portfolio Anda
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Form */}
          <div className="lg:col-span-2">
            <Card className="investment-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <DollarSign className="h-5 w-5 text-primary" />
                  Detail Transaksi
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="assetName">Nama Aset *</Label>
                      <Input
                        id="assetName"
                        placeholder="e.g., BBRI.JK, Emas Antam"
                        value={formData.assetName}
                        onChange={(e) => handleInputChange('assetName', e.target.value)}
                        className="focus:ring-primary"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="assetType">Jenis Aset</Label>
                      <Select value={formData.assetType} onValueChange={(value) => handleInputChange('assetType', value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Pilih jenis aset" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="saham">Saham</SelectItem>
                          <SelectItem value="obligasi">Obligasi</SelectItem>
                          <SelectItem value="reksadana">Reksadana</SelectItem>
                          <SelectItem value="emas">Emas</SelectItem>
                          <SelectItem value="crypto">Cryptocurrency</SelectItem>
                          <SelectItem value="properti">Properti</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="amount">Jumlah Investasi *</Label>
                      <Input
                        id="amount"
                        type="number"
                        placeholder="0"
                        value={formData.amount}
                        onChange={(e) => handleInputChange('amount', e.target.value)}
                        className="focus:ring-primary"
                      />
                      <p className="text-xs text-muted-foreground">Dalam Rupiah (IDR)</p>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="transactionType">Jenis Transaksi</Label>
                      <Select value={formData.transactionType} onValueChange={(value) => handleInputChange('transactionType', value)}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="buy">Beli</SelectItem>
                          <SelectItem value="sell">Jual</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="date">Tanggal Transaksi *</Label>
                      <Input
                        id="date"
                        type="date"
                        value={formData.date}
                        onChange={(e) => handleInputChange('date', e.target.value)}
                        className="focus:ring-primary"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="notes">Catatan</Label>
                    <Textarea
                      id="notes"
                      placeholder="Tambahkan catatan atau analisis..."
                      value={formData.notes}
                      onChange={(e) => handleInputChange('notes', e.target.value)}
                      className="min-h-[100px] focus:ring-primary"
                    />
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full bg-gradient-primary hover:opacity-90 shadow-investment"
                    size="lg"
                  >
                    <Save className="mr-2 h-4 w-4" />
                    Simpan Transaksi
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Preview & Tips */}
          <div className="space-y-6">
            {/* Transaction Preview */}
            <Card className="investment-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <TrendingUp className="h-5 w-5 text-success" />
                  Preview
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Aset:</span>
                  <span className="font-medium">{formData.assetName || '-'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Jenis:</span>
                  <span className="font-medium capitalize">{formData.assetType || '-'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Jumlah:</span>
                  <span className="font-medium">
                    {formData.amount ? `Rp ${parseInt(formData.amount).toLocaleString('id-ID')}` : '-'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Transaksi:</span>
                  <span className={`font-medium capitalize ${
                    formData.transactionType === 'buy' ? 'text-success' : 'text-destructive'
                  }`}>
                    {formData.transactionType === 'buy' ? 'Beli' : 'Jual'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Tanggal:</span>
                  <span className="font-medium">{formData.date || '-'}</span>
                </div>
              </CardContent>
            </Card>

            {/* Tips */}
            <Card className="investment-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Calendar className="h-5 w-5 text-accent" />
                  Tips Investasi
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div className="p-3 bg-success/10 rounded-lg border-l-4 border-success">
                  <p className="font-medium text-success mb-1">Diversifikasi</p>
                  <p className="text-muted-foreground">Jangan taruh semua telur dalam satu keranjang. Diversifikasi portfolio Anda.</p>
                </div>
                <div className="p-3 bg-primary/10 rounded-lg border-l-4 border-primary">
                  <p className="font-medium text-primary mb-1">Riset</p>
                  <p className="text-muted-foreground">Selalu lakukan riset mendalam sebelum berinvestasi pada aset baru.</p>
                </div>
                <div className="p-3 bg-warning/10 rounded-lg border-l-4 border-warning">
                  <p className="font-medium text-warning mb-1">Jangka Panjang</p>
                  <p className="text-muted-foreground">Investasi terbaik adalah yang dilakukan dengan perspektif jangka panjang.</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvestmentForm;