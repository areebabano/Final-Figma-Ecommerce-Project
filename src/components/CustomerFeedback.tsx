"use client";
import React, { useState } from "react";

// Define the feedback interface
interface Feedback {
  name: string;
  email: string;
  rating: number;
  comments: string;
}

const CustomerFeedback: React.FC = () => {
  // Initial dummy feedback data
  const initialFeedbackList: Feedback[] = [
    {
      name: "John Doe",
      email: "john.doe@example.com",
      rating: 4,
      comments: "Great product, really loved it!",
    },
    {
      name: "Jane Smith",
      email: "jane.smith@example.com",
      rating: 5,
      comments: "Amazing service, will definitely return.",
    },
    {
      name: "Samuel Green",
      email: "samuel.green@example.com",
      rating: 3,
      comments: "Good, but room for improvement.",
    },
  ];

  // Store all feedback entries
  const [feedbackList, setFeedbackList] = useState<Feedback[]>(initialFeedbackList);
  const [feedback, setFeedback] = useState<Feedback>({
    name: "",
    email: "",
    rating: 0,
    comments: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFeedback((prevFeedback) => ({
      ...prevFeedback,
      [name]: value,
    }));
  };

  const handleRatingChange = (rating: number) => {
    setFeedback((prevFeedback) => ({
      ...prevFeedback,
      rating,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Add new feedback to the list
    setFeedbackList((prevFeedbackList) => [...prevFeedbackList, feedback]);
    // Reset the form fields
    setFeedback({ name: "", email: "", rating: 0, comments: "" });
  };

  return (
    <div className="max-w-5xl mx-auto p-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
        {/* Left Side - Previous Feedback List */}
        <div className="p-6 rounded-xl space-y-4 bg-gray-50 shadow-md">
          <h2 className="text-center text-2xl font-bold text-[#151875]">Hear from Our Happy Customers</h2>
          <p className="text-center text-md text-gray-500 mb-6">We're grateful for your feedback! Here's what others have shared about their experience with us.</p>
          {feedbackList.length === 0 ? (
            <p className="text-center text-gray-500">No feedback submitted yet.</p>
          ) : (
            feedbackList.map((feedback, index) => (
              <div key={index} className="border-l-4 border-purple-500 p-4 rounded-md shadow-md bg-white mb-4">
                <p className="font-semibold text-lg text-[#151875]">{feedback.name}</p>
                <p className="text-sm text-gray-500">{feedback.email}</p>
                <p className="mt-2 text-yellow-500">{Array(feedback.rating).fill("★").join("")}</p>
                <p className="mt-2 text-gray-600">{feedback.comments}</p>
              </div>
            ))
          )}
        </div>

        {/* Right Side - Feedback Form */}
        <div className="p-8 bg-[#F4F4FC] rounded-xl shadow-lg">
          <h2 className="text-center text-2xl font-bold mb-2 text-[#151875]">Customer Feedback</h2>
          <p className="text-center text-md text-gray-500 mb-6">We value your opinion! Please leave your feedback below.</p>
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="flex flex-col">
              <input
                type="text"
                placeholder="Your Name"
                className="flex-1 w-full border border-gray-300 p-4 rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                name="name"
                value={feedback.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="flex flex-col">
            <input
                type="email"
                placeholder="Your Email"
                className="flex-1 w-full border border-gray-300 p-4 rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                name="email"
                value={feedback.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="flex flex-col">
              <div className="flex gap-2 cursor-pointer">
                {[1, 2, 3, 4, 5].map((star) => (
                  <span
                    key={star}
                    onClick={() => handleRatingChange(star)}
                    className={`text-3xl transition duration-200 ${star <= feedback.rating ? 'text-yellow-400' : 'text-gray-300'} hover:text-yellow-300`}
                  >
                    ★
                  </span>
                ))}
              </div>
            </div>
            <div className="flex flex-col">
              <textarea
                id="comments"
                name="comments"
                value={feedback.comments}
                onChange={handleChange}
                className="w-full border border-gray-300 p-4 rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="Share your thoughts..."
                required
              />
            </div>
             {/* Submit Button */}
             <button
              type="submit"
              className="px-6 py-3 bg-pink-500 text-white rounded-md hover:bg-purple-600 transition"
            >
              Submit Feedback
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CustomerFeedback;

