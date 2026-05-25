import { Link } from 'react-router-dom';
import PageWrapper from '../components/layout/PageWrapper';

export default function NotFoundPage() {
  return (
    <PageWrapper>
      <div className="text-center py-24">
        <div className="text-6xl mb-4">🔢</div>
        <h1 className="text-3xl font-bold text-on-surface mb-2">Page not found</h1>
        <p className="text-on-surface-muted mb-6">The calculator you're looking for doesn't exist.</p>
        <Link to="/" className="calc-btn inline-block">Go back home</Link>
      </div>
    </PageWrapper>
  );
}
