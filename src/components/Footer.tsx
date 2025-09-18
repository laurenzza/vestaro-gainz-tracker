import { Button } from "@/components/ui/button";
import { 
  Mail, 
  Phone, 
  MapPin, 
  Facebook, 
  Twitter, 
  Instagram, 
  Linkedin,
  TrendingUp,
  Heart,
  ExternalLink
} from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-card border-t border-border mt-auto">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand & Description */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-gradient-primary rounded-full flex items-center justify-center">
                <TrendingUp className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="text-2xl font-bold gradient-text">Vestaro</span>
            </div>
            
            <p className="text-muted-foreground mb-6 max-w-md">
              Platform manajemen investasi terpercaya yang membantu Anda mencatat, 
              mengelola, dan memantau investasi dengan mudah dan aman.
            </p>

            <div className="space-y-3">
              <div className="flex items-center gap-3 text-sm">
                <Mail className="h-4 w-4 text-primary" />
                <a href="mailto:support@vestaro.app" className="text-muted-foreground hover:text-primary transition-colors">
                  support@vestaro.app
                </a>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Phone className="h-4 w-4 text-primary" />
                <a href="tel:+628001234567" className="text-muted-foreground hover:text-primary transition-colors">
                  +62 800 123 4567
                </a>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <MapPin className="h-4 w-4 text-primary" />
                <span className="text-muted-foreground">
                  Jakarta, Indonesia
                </span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4">Fitur</h3>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Dashboard Investasi
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Pencatatan Transaksi
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Analisis Portfolio
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Laporan & Grafik
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Notifikasi & Reminder
                </a>
              </li>
            </ul>
          </div>

          {/* Support & Legal */}
          <div>
            <h3 className="font-semibold mb-4">Bantuan & Legal</h3>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Pusat Bantuan
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Tutorial & Panduan
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  FAQ
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-1">
                  Kebijakan Privasi
                  <ExternalLink className="h-3 w-3" />
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-1">
                  Syarat & Ketentuan
                  <ExternalLink className="h-3 w-3" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-border my-8"></div>

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span>© {currentYear} Vestaro. Dibuat dengan</span>
            <Heart className="h-4 w-4 text-red-500 fill-red-500" />
            <span>untuk investor Indonesia</span>
          </div>

          {/* Social Media */}
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground mr-2">Ikuti kami:</span>
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
              <Facebook className="h-4 w-4" />
              <span className="sr-only">Facebook</span>
            </Button>
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
              <Twitter className="h-4 w-4" />
              <span className="sr-only">Twitter</span>
            </Button>
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
              <Instagram className="h-4 w-4" />
              <span className="sr-only">Instagram</span>
            </Button>
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
              <Linkedin className="h-4 w-4" />
              <span className="sr-only">LinkedIn</span>
            </Button>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="mt-6 p-4 bg-warning/10 rounded-lg border border-warning/20">
          <p className="text-xs text-muted-foreground text-center">
            <strong className="text-warning">Disclaimer:</strong> Vestaro adalah aplikasi pencatatan investasi. 
            Semua keputusan investasi adalah tanggung jawab pengguna. 
            Selalu lakukan riset mendalam sebelum berinvestasi.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;