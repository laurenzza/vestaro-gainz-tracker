import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  User, 
  Bell, 
  Palette, 
  Shield, 
  Download,
  Upload,
  Save,
  Moon,
  Sun,
  Globe
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Settings = () => {
  const { toast } = useToast();
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [notifications, setNotifications] = useState({
    emailReminders: true,
    portfolioUpdates: true,
    priceAlerts: false,
    weeklyReports: true,
    monthlyAnalysis: true
  });
  
  const [profile, setProfile] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+62 812 3456 7890",
    timezone: "Asia/Jakarta",
    language: "id"
  });

  const handleSaveProfile = () => {
    toast({
      title: "Profil Tersimpan",
      description: "Informasi profil Anda berhasil diperbarui",
    });
  };

  const handleNotificationChange = (key: string, value: boolean) => {
    setNotifications(prev => ({ ...prev, [key]: value }));
    toast({
      title: "Pengaturan Notifikasi",
      description: `${key} ${value ? 'diaktifkan' : 'dinonaktifkan'}`,
    });
  };

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    // In real app, this would update the theme context
    toast({
      title: "Tema Diubah",
      description: `Beralih ke mode ${!isDarkMode ? 'gelap' : 'terang'}`,
    });
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold gradient-text">Pengaturan</h1>
          <p className="text-muted-foreground mt-2">Kelola profil dan preferensi akun Anda</p>
        </div>

        <Tabs defaultValue="profile" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 lg:w-fit">
            <TabsTrigger value="profile" className="flex items-center gap-2">
              <User className="h-4 w-4" />
              <span className="hidden sm:inline">Profil</span>
            </TabsTrigger>
            <TabsTrigger value="notifications" className="flex items-center gap-2">
              <Bell className="h-4 w-4" />
              <span className="hidden sm:inline">Notifikasi</span>
            </TabsTrigger>
            <TabsTrigger value="appearance" className="flex items-center gap-2">
              <Palette className="h-4 w-4" />
              <span className="hidden sm:inline">Tampilan</span>
            </TabsTrigger>
            <TabsTrigger value="security" className="flex items-center gap-2">
              <Shield className="h-4 w-4" />
              <span className="hidden sm:inline">Keamanan</span>
            </TabsTrigger>
          </TabsList>

          {/* Profile Settings */}
          <TabsContent value="profile" className="space-y-6">
            <div className="grid lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <Card className="investment-card">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <User className="h-5 w-5 text-primary" />
                      Informasi Profil
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="flex items-center gap-6">
                      <Avatar className="w-20 h-20">
                        <AvatarImage src="/api/placeholder/80/80" />
                        <AvatarFallback className="text-lg">JD</AvatarFallback>
                      </Avatar>
                      <div className="space-y-2">
                        <Button variant="outline" size="sm">
                          <Upload className="h-4 w-4 mr-2" />
                          Upload Foto
                        </Button>
                        <p className="text-sm text-muted-foreground">
                          JPG, PNG hingga 2MB
                        </p>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Nama Lengkap</Label>
                        <Input
                          id="name"
                          value={profile.name}
                          onChange={(e) => setProfile(prev => ({ ...prev, name: e.target.value }))}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          type="email"
                          value={profile.email}
                          onChange={(e) => setProfile(prev => ({ ...prev, email: e.target.value }))}
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="phone">Nomor Telepon</Label>
                        <Input
                          id="phone"
                          value={profile.phone}
                          onChange={(e) => setProfile(prev => ({ ...prev, phone: e.target.value }))}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="timezone">Zona Waktu</Label>
                        <Select value={profile.timezone} onValueChange={(value) => setProfile(prev => ({ ...prev, timezone: value }))}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Asia/Jakarta">Asia/Jakarta (WIB)</SelectItem>
                            <SelectItem value="Asia/Makassar">Asia/Makassar (WITA)</SelectItem>
                            <SelectItem value="Asia/Jayapura">Asia/Jayapura (WIT)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="language">Bahasa</Label>
                      <Select value={profile.language} onValueChange={(value) => setProfile(prev => ({ ...prev, language: value }))}>
                        <SelectTrigger className="w-full md:w-48">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="id">Bahasa Indonesia</SelectItem>
                          <SelectItem value="en">English</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <Button onClick={handleSaveProfile} className="bg-gradient-primary hover:opacity-90">
                      <Save className="h-4 w-4 mr-2" />
                      Simpan Perubahan
                    </Button>
                  </CardContent>
                </Card>
              </div>

              <div className="space-y-6">
                <Card className="investment-card">
                  <CardHeader>
                    <CardTitle className="text-lg">Statistik Akun</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Bergabung sejak</span>
                      <span className="font-medium">Jan 2024</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Total Transaksi</span>
                      <span className="font-medium">127</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Aset Aktif</span>
                      <span className="font-medium">12</span>
                    </div>
                  </CardContent>
                </Card>

                <Card className="investment-card">
                  <CardHeader>
                    <CardTitle className="text-lg">Data Export</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <Button variant="outline" className="w-full justify-start">
                      <Download className="h-4 w-4 mr-2" />
                      Export ke Excel
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <Download className="h-4 w-4 mr-2" />
                      Export ke PDF
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* Notification Settings */}
          <TabsContent value="notifications" className="space-y-6">
            <Card className="investment-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="h-5 w-5 text-primary" />
                  Pengaturan Notifikasi
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="email-reminders" className="text-base font-medium">Email Pengingat</Label>
                      <p className="text-sm text-muted-foreground">Terima pengingat evaluasi investasi via email</p>
                    </div>
                    <Switch
                      id="email-reminders"
                      checked={notifications.emailReminders}
                      onCheckedChange={(value) => handleNotificationChange('emailReminders', value)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="portfolio-updates" className="text-base font-medium">Update Portfolio</Label>
                      <p className="text-sm text-muted-foreground">Notifikasi perubahan nilai portfolio</p>
                    </div>
                    <Switch
                      id="portfolio-updates"
                      checked={notifications.portfolioUpdates}
                      onCheckedChange={(value) => handleNotificationChange('portfolioUpdates', value)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="price-alerts" className="text-base font-medium">Alert Harga</Label>
                      <p className="text-sm text-muted-foreground">Notifikasi perubahan harga signifikan</p>
                    </div>
                    <Switch
                      id="price-alerts"
                      checked={notifications.priceAlerts}
                      onCheckedChange={(value) => handleNotificationChange('priceAlerts', value)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="weekly-reports" className="text-base font-medium">Laporan Mingguan</Label>
                      <p className="text-sm text-muted-foreground">Ringkasan performa investasi mingguan</p>
                    </div>
                    <Switch
                      id="weekly-reports"
                      checked={notifications.weeklyReports}
                      onCheckedChange={(value) => handleNotificationChange('weeklyReports', value)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="monthly-analysis" className="text-base font-medium">Analisis Bulanan</Label>
                      <p className="text-sm text-muted-foreground">Analisis mendalam performa bulanan</p>
                    </div>
                    <Switch
                      id="monthly-analysis"
                      checked={notifications.monthlyAnalysis}
                      onCheckedChange={(value) => handleNotificationChange('monthlyAnalysis', value)}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Appearance Settings */}
          <TabsContent value="appearance" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              <Card className="investment-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Palette className="h-5 w-5 text-primary" />
                    Tema Aplikasi
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      {isDarkMode ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
                      <div>
                        <Label className="text-base font-medium">Mode Gelap</Label>
                        <p className="text-sm text-muted-foreground">
                          {isDarkMode ? 'Aktif' : 'Nonaktif'} - Tema gelap untuk kenyamanan mata
                        </p>
                      </div>
                    </div>
                    <Switch checked={isDarkMode} onCheckedChange={toggleTheme} />
                  </div>

                  <div className="space-y-3">
                    <Label className="text-base font-medium">Pilihan Tema</Label>
                    <div className="grid grid-cols-3 gap-3">
                      <div className="p-3 border-2 border-primary rounded-lg cursor-pointer">
                        <div className="h-12 bg-gradient-primary rounded mb-2"></div>
                        <p className="text-sm text-center">Default</p>
                      </div>
                      <div className="p-3 border border-border rounded-lg cursor-pointer hover:border-primary/50">
                        <div className="h-12 bg-gradient-to-r from-emerald-500 to-teal-600 rounded mb-2"></div>
                        <p className="text-sm text-center">Hijau</p>
                      </div>
                      <div className="p-3 border border-border rounded-lg cursor-pointer hover:border-primary/50">
                        <div className="h-12 bg-gradient-to-r from-purple-500 to-pink-600 rounded mb-2"></div>
                        <p className="text-sm text-center">Ungu</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="investment-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Globe className="h-5 w-5 text-primary" />
                    Lokalisasi
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label>Format Mata Uang</Label>
                    <Select defaultValue="idr">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="idr">Rupiah (IDR)</SelectItem>
                        <SelectItem value="usd">US Dollar (USD)</SelectItem>
                        <SelectItem value="eur">Euro (EUR)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Format Tanggal</Label>
                    <Select defaultValue="dd-mm-yyyy">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="dd-mm-yyyy">DD/MM/YYYY</SelectItem>
                        <SelectItem value="mm-dd-yyyy">MM/DD/YYYY</SelectItem>
                        <SelectItem value="yyyy-mm-dd">YYYY-MM-DD</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Security Settings */}
          <TabsContent value="security" className="space-y-6">
            <Card className="investment-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-primary" />
                  Keamanan Akun
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div>
                    <Label className="text-base font-medium">Ubah Password</Label>
                    <p className="text-sm text-muted-foreground mb-3">
                      Update password Anda secara berkala untuk keamanan
                    </p>
                    <Button variant="outline">
                      Ubah Password
                    </Button>
                  </div>

                  <div>
                    <Label className="text-base font-medium">Autentikasi Dua Faktor</Label>
                    <p className="text-sm text-muted-foreground mb-3">
                      Tambahkan lapisan keamanan ekstra untuk akun Anda
                    </p>
                    <Button variant="outline">
                      Aktifkan 2FA
                    </Button>
                  </div>

                  <div>
                    <Label className="text-base font-medium">Sesi Aktif</Label>
                    <p className="text-sm text-muted-foreground mb-3">
                      Kelola perangkat yang terhubung ke akun Anda
                    </p>
                    <Button variant="outline">
                      Lihat Sesi
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Settings;