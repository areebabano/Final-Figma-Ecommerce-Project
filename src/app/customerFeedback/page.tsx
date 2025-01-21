// pages/feedback.tsx
import Breadcrumb from '@/components/BreadCrumb';
import CustomerFeedback from '@/components/CustomerFeedback';

const FeedbackPage: React.FC = () => {
  return (
    <div>
          {/* Breadcrumb */}
      <Breadcrumb />
      <CustomerFeedback />
    </div>
  );
};

export default FeedbackPage;
