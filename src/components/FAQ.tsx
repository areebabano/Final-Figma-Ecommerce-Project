// import React from "react";

// // FAQ data as an array of objects
// const faqData = [
//   {
//     question: "What is your return policy?",
//     answer: "We accept returns within 30 days of purchase. Please ensure the product is in its original condition."
//   },
//   {
//     question: "How can I track my order?",
//     answer: "You can track your order through the link provided in your confirmation email."
//   },
//   {
//     question: "Do you offer international shipping?",
//     answer: "Yes, we ship worldwide. Shipping fees and delivery times may vary by location."
//   }
// ];


// function FAQ() {
//   return (
//     <div>
//       <div className="w-full lg:w-1/2">
//       <h2 className="text-2xl font-bold mb-4">Frequently Asked Questions</h2>
//       <div className="space-y-4">
//         {faqData.map((faq, index) => (
//           <div key={index}>
//             <h3 className="text-lg font-semibold">{faq.question}</h3>
//             <p className="text-gray-600">{faq.answer}</p>
//           </div>
//         ))}
//       </div>
//     </div>
//     </div>
//   )
// }

// export default FAQ

import React from "react";

// FAQ data as an array of objects
const faqData = [
  {
    question: "What is your return policy?",
    answer: "We accept returns within 30 days of purchase. Please ensure the product is in its original condition."
  },
  {
    question: "How can I track my order?",
    answer: "You can track your order through the link provided in your confirmation email."
  },
  {
    question: "Do you offer international shipping?",
    answer: "Yes, we ship worldwide. Shipping fees and delivery times may vary by location."
  }
];

export const FAQ = () => {
  return (
    <div className="w-full lg:w-1/2">
      <h2 className="text-2xl font-bold mb-4 text-[#151875]">Frequently Asked Questions</h2>
      <div className="space-y-4">
        {faqData.map((faq, index) => (
          <div key={index}>
            <h3 className="text-lg font-semibold text-gray-800">{faq.question}</h3>
            <p className="text-gray-400">{faq.answer}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export const HelpCenter = () => {
  return (
    <div className="w-full lg:w-1/2">
      <form className="space-y-4 bg-gray-100 p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-[#151875]">Contact Our Help Center</h2>
      <h2 className="text-xl font-semibold mb-8 text-[#151875]">Ask a Question</h2>
            {/* Name and Email */}
            <div className="flex flex-col sm:flex-row gap-4">
              <input
                type="text"
                placeholder="Your Name"
                className="flex-1 w-full border border-gray-300 p-3 rounded-md"
              />
              <input
                type="email"
                placeholder="Email"
                className="flex-1 w-full border border-gray-300 p-3 rounded-md"
              />
            </div>

            {/* Subject */}
            <input
              type="text"
              placeholder="Subject"
              className="w-full border border-gray-300 p-3 rounded-md"
            />

            {/* Message */}
            <textarea
              placeholder="Type your message"
              rows={5}
              className="w-full border border-gray-300 p-3 rounded-md"
            ></textarea>

            {/* Submit Button */}
            <button
              type="submit"
              className="px-6 py-3 bg-pink-500 text-white rounded-md hover:bg-purple-600 transition"
            >
              Submit
            </button>
          </form>
    </div>
  );
};



// const FAQAndHelpCenter = () => {
//   return (
//     <div className="flex flex-col lg:flex-row items-start gap-8 p-6 max-w-7xl mx-auto">
//       <FAQ />
//       <HelpCenter />
//     </div>
//   );
// };

// export default FAQAndHelpCenter;




