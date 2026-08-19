import { HeroSection } from "@/components/home/HeroSection";
import { ProductCatalog } from "@/components/catalog/ProductCatalog";
import { ProofOfWork } from "@/components/portfolio/ProofOfWork";
import { OrderTimelineSection } from "@/components/home/OrderTimelineSection";
import { SizeChartSection } from "@/components/home/SizeChartSection";
import { FAQSection } from "@/components/faq/FAQSection";

export default function Home() {
  return (
    <>
      <HeroSection />
      <ProductCatalog />
      <ProofOfWork />
      <OrderTimelineSection />
      <SizeChartSection />
      <FAQSection />
    </>
  );
}
