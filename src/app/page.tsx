import {
  Header,
  HeroSection,
  StatsSection,
  FeaturesSection,
  GallerySection,
  CTASection,
  Footer,
} from "@/components/landing";

export default function Home() {
  return (
    <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden">
      <Header />
      <HeroSection />
      <StatsSection />
      <FeaturesSection />
      <GallerySection />
      <CTASection />
      <Footer />
    </div>
  );
}
