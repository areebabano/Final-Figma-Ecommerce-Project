import Breadcrumb from "@/components/BreadCrumb";
import {FAQ} from "@/components/FAQ";
import {HelpCenter} from "@/components/FAQ";

const FAQAndHelpCenter = () => {
    return (
      <div>
        {/* breadcrumb  */}
        <Breadcrumb/>
        <div className="flex flex-col lg:flex-row items-start gap-8 p-6 max-w-7xl mx-auto px-20">
        <FAQ />
        <HelpCenter />
      </div>
      </div>
    );
  };
  
  export default FAQAndHelpCenter;