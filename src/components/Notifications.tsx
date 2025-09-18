import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Bell, 
  Check, 
  X, 
  AlertTriangle, 
  TrendingUp, 
  Calendar,
  Settings,
  Trash2,
  Mail
} from "lucide-react";

// Sample notifications data
const notifications = [
  {
    id: 1,
    type: 'reminder',
    title: 'Evaluasi Portfolio Bulanan',
    message: 'Saatnya untuk mengevaluasi performa investasi Anda bulan ini. Portfolio naik 12.5%',
    time: '2 jam yang lalu',
    read: false,
    priority: 'high',
    category: 'evaluation'
  },
  {
    id: 2,
    type: 'price_alert',
    title: 'BBRI.JK Naik 5%',
    message: 'Saham BBRI.JK mengalami kenaikan signifikan 5% dalam 24 jam terakhir',
    time: '4 jam yang lalu',
    read: false,
    priority: 'medium',
    category: 'price'
  },
  {
    id: 3,
    type: 'portfolio_update',
    title: 'Laporan Mingguan Siap',
    message: 'Laporan performa mingguan portfolio Anda sudah tersedia untuk dilihat',
    time: '1 hari yang lalu',
    read: true,
    priority: 'low',
    category: 'report'
  },
  {
    id: 4,
    type: 'reminder',
    title: 'Diversifikasi Portfolio',
    message: 'Anda memiliki 70% investasi dalam saham. Pertimbangkan diversifikasi ke obligasi atau reksadana',
    time: '2 hari yang lalu',
    read: true,
    priority: 'medium',
    category: 'advice'
  },
  {
    id: 5,
    type: 'system',
    title: 'Fitur Baru: Auto-Rebalancing',
    message: 'Coba fitur rebalancing otomatis untuk mengoptimalkan alokasi portfolio Anda',
    time: '3 hari yang lalu',
    read: false,
    priority: 'low',
    category: 'feature'
  }
];

const Notifications = () => {
  const [notificationList, setNotificationList] = useState(notifications);
  const [selectedTab, setSelectedTab] = useState('all');

  const unreadCount = notificationList.filter(n => !n.read).length;

  const markAsRead = (id: number) => {
    setNotificationList(prev => 
      prev.map(notification => 
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
  };

  const markAllAsRead = () => {
    setNotificationList(prev => 
      prev.map(notification => ({ ...notification, read: true }))
    );
  };

  const deleteNotification = (id: number) => {
    setNotificationList(prev => prev.filter(n => n.id !== id));
  };

  const getFilteredNotifications = () => {
    if (selectedTab === 'all') return notificationList;
    if (selectedTab === 'unread') return notificationList.filter(n => !n.read);
    return notificationList.filter(n => n.category === selectedTab);
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'reminder':
        return <Calendar className="h-5 w-5 text-accent" />;
      case 'price_alert':
        return <TrendingUp className="h-5 w-5 text-success" />;
      case 'portfolio_update':
        return <Bell className="h-5 w-5 text-primary" />;
      case 'system':
        return <Settings className="h-5 w-5 text-muted-foreground" />;
      default:
        return <AlertTriangle className="h-5 w-5 text-warning" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-destructive/20 text-destructive border-destructive/20';
      case 'medium':
        return 'bg-warning/20 text-warning border-warning/20';
      case 'low':
        return 'bg-muted text-muted-foreground border-muted';
      default:
        return 'bg-muted text-muted-foreground border-muted';
    }
  };

  const filteredNotifications = getFilteredNotifications();

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold gradient-text flex items-center gap-2">
              <Bell className="h-8 w-8" />
              Notifikasi
              {unreadCount > 0 && (
                <Badge variant="destructive" className="ml-2">
                  {unreadCount}
                </Badge>
              )}
            </h1>
            <p className="text-muted-foreground mt-2">
              Kelola pengingat dan pemberitahuan investasi Anda
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={markAllAsRead} disabled={unreadCount === 0}>
              <Check className="h-4 w-4 mr-2" />
              Tandai Semua Dibaca
            </Button>
            <Button variant="outline">
              <Settings className="h-4 w-4 mr-2" />
              Pengaturan
            </Button>
          </div>
        </div>

        {/* Tabs */}
        <Tabs value={selectedTab} onValueChange={setSelectedTab}>
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="all">Semua</TabsTrigger>
            <TabsTrigger value="unread">
              Belum Dibaca {unreadCount > 0 && `(${unreadCount})`}
            </TabsTrigger>
            <TabsTrigger value="evaluation">Evaluasi</TabsTrigger>
            <TabsTrigger value="price">Harga</TabsTrigger>
            <TabsTrigger value="report">Laporan</TabsTrigger>
            <TabsTrigger value="advice">Saran</TabsTrigger>
          </TabsList>

          <TabsContent value={selectedTab} className="space-y-4">
            {filteredNotifications.length === 0 ? (
              <Card className="investment-card">
                <CardContent className="text-center py-12">
                  <Bell className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Tidak ada notifikasi</h3>
                  <p className="text-muted-foreground">
                    {selectedTab === 'all' 
                      ? 'Semua notifikasi sudah dibaca atau dihapus'
                      : `Tidak ada notifikasi untuk kategori ${selectedTab}`
                    }
                  </p>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-3">
                {filteredNotifications.map((notification) => (
                  <Card 
                    key={notification.id} 
                    className={`investment-card hover-lift cursor-pointer transition-all ${
                      !notification.read ? 'border-l-4 border-l-primary bg-primary/5' : ''
                    }`}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-start gap-4">
                        {/* Icon */}
                        <div className="flex-shrink-0 mt-1">
                          {getNotificationIcon(notification.type)}
                        </div>

                        {/* Content */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2">
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <h3 className={`font-semibold ${!notification.read ? 'text-foreground' : 'text-muted-foreground'}`}>
                                  {notification.title}
                                </h3>
                                <Badge variant="outline" className={getPriorityColor(notification.priority)}>
                                  {notification.priority}
                                </Badge>
                                {!notification.read && (
                                  <div className="w-2 h-2 bg-primary rounded-full" />
                                )}
                              </div>
                              <p className="text-sm text-muted-foreground mb-2">
                                {notification.message}
                              </p>
                              <p className="text-xs text-muted-foreground flex items-center">
                                <Clock className="h-3 w-3 mr-1" />
                                {notification.time}
                              </p>
                            </div>

                            {/* Actions */}
                            <div className="flex items-center gap-1">
                              {!notification.read && (
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    markAsRead(notification.id);
                                  }}
                                  className="h-8 w-8 p-0"
                                >
                                  <Check className="h-4 w-4" />
                                </Button>
                              )}
                              {notification.read && (
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setNotificationList(prev => 
                                    prev.map(n => 
                                      n.id === notification.id ? { ...n, read: false } : n
                                    )
                                  );
                                }}
                                className="h-8 w-8 p-0"
                              >
                                <Mail className="h-4 w-4" />
                              </Button>
                              )}
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  deleteNotification(notification.id);
                                }}
                                className="h-8 w-8 p-0 text-destructive hover:text-destructive"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>

        {/* Quick Actions */}
        <Card className="investment-card">
          <CardHeader>
            <CardTitle className="text-lg">Pengaturan Cepat</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-4">
              <Button variant="outline" className="justify-start">
                <Calendar className="h-4 w-4 mr-2" />
                Atur Pengingat Evaluasi
              </Button>
              <Button variant="outline" className="justify-start">
                <TrendingUp className="h-4 w-4 mr-2" />
                Atur Alert Harga
              </Button>
              <Button variant="outline" className="justify-start">
                <Settings className="h-4 w-4 mr-2" />
                Kelola Notifikasi
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

// Fix: Import Clock icon
import { Clock } from "lucide-react";

export default Notifications;