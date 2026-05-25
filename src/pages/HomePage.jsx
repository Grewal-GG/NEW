import PageWrapper from '../components/layout/PageWrapper';
import HeroSection from '../components/home/HeroSection';
import CategoryGrid from '../components/home/CategoryGrid';

export default function HomePage() {
  return (
    <PageWrapper>
      <HeroSection />
      <section>
        <h2 className="text-xl font-bold text-on-surface mb-6">Browse Categories</h2>
        <CategoryGrid />
      </section>
    </PageWrapper>
  );
}
