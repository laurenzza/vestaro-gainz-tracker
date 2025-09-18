import { Button } from "@/components/ui/button";
import { ArrowRight, TrendingUp, Shield, BarChart3 } from "lucide-react";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-hero overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-10" />
      
      <div className="container mx-auto px-6 text-center text-primary-foreground relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* Main Title */}
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            <span className="block">Kelola Investasi</span>
            <span className="block gradient-text">dengan Mudah</span>
          </h1>
          
          <p className="text-xl md:text-2xl mb-8 text-primary-foreground/80 max-w-2xl mx-auto leading-relaxed">
            Vestaro membantu Anda mencatat, mengelola, dan memantau investasi 
            dengan dashboard yang intuitif dan fitur analisis yang powerful.
          </p>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Button 
              size="lg" 
              className="bg-card text-card-foreground hover:bg-card/90 shadow-investment text-lg px-8 py-4 h-auto hover-lift"
            >
              Mulai Investasi
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              className="border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/10 text-lg px-8 py-4 h-auto hover-lift"
            >
              Lihat Demo
            </Button>
          </div>
          
          {/* Feature Cards */}
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="bg-card/20 backdrop-blur-sm rounded-xl p-6 text-center hover-lift">
              <div className="w-16 h-16 bg-success rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="h-8 w-8 text-success-foreground" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Tracking Investasi</h3>
              <p className="text-primary-foreground/70">
                Pantau perkembangan investasi Anda dengan grafik yang mudah dipahami
              </p>
            </div>
            
            <div className="bg-card/20 backdrop-blur-sm rounded-xl p-6 text-center hover-lift">
              <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center mx-auto mb-4">
                <BarChart3 className="h-8 w-8 text-accent-foreground" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Dashboard Analitik</h3>
              <p className="text-primary-foreground/70">
                Analisis mendalam dengan visualisasi data yang komprehensif
              </p>
            </div>
            
            <div className="bg-card/20 backdrop-blur-sm rounded-xl p-6 text-center hover-lift">
              <div className="w-16 h-16 bg-warning rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8 text-warning-foreground" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Aman & Terpercaya</h3>
              <p className="text-primary-foreground/70">
                Data investasi Anda disimpan dengan aman dan dapat diakses kapan saja
              </p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Decorative Elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-accent/20 rounded-full blur-xl" />
      <div className="absolute bottom-20 right-10 w-32 h-32 bg-success/20 rounded-full blur-xl" />
      <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-warning/20 rounded-full blur-xl" />
    </section>
  );
};

export default Hero;