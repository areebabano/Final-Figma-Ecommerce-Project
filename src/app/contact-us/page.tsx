'use client';

import Image from 'next/image';
import Breadcrumb from '@/components/BreadCrumb';

const Contact = () => {
  return (
    <div>
      {/* Breadcrumb */}
      <Breadcrumb />

      {/* First Section */}
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-20 py-12 flex flex-col lg:flex-row items-start gap-8">
        {/* Left Section */}
        <div className="flex-1">
          <h1 className="text-2xl font-bold text-[#151875] mb-4">Information About us</h1>
          <p className="text-gray-400 leading-relaxed mb-6">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mattis neque ultrices mattis aliquam, malesuada diam est. Malesuada sem tristique amet erat vitae eget dolor lobortis. Accumsan faucibus vitae lobortis quis bibendum quam.
          </p>
          <div className="flex gap-2">
            <div className="w-3 h-3 rounded-full bg-purple-700"></div>
            <div className="w-3 h-3 rounded-full bg-pink-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-400"></div>
          </div>
        </div>

        {/* Right Section */}
        <div className="flex-1">
          <h1 className="text-2xl font-bold text-[#151875] mb-4">Contact Ways</h1>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-gray-400">
            <li className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-purple-700"></span>
              <p>Tel: 877-67-88-99 <br /> E-Mail: shop@store.com</p>
            </li>
            <li className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-pink-500"></span>
              <p>Support Forum <br /> For over 24hr</p>
            </li>
            <li className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-yellow-400"></span>
              <p>20 Margaret st, London <br /> Great britain, 3NM98-LK</p>
            </li>
            <li className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-green-400"></span>
              <p>Free standard shipping <br /> on all orders.</p>
            </li>
          </ul>
        </div>
      </div>

      <hr className="my-12 border-gray-300" />

      {/* Second Section */}
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-20 py-10 flex flex-col lg:flex-row items-start gap-8">
        {/* Left Section */}
        <div className="flex-1">
          <h1 className="text-2xl font-bold text-[#151875] mb-4">Get in Touch</h1>
          <p className="text-gray-400 leading-relaxed mb-8">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mattis neque ultrices tristique amet erat vitae eget dolor los vitae lobortis quis bibendum quam.
          </p>

          {/* Contact Form */}
          <form className="space-y-6">
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

        {/* Right Section */}
        <div className="flex-1">
          <Image
            src="/contact.png" // Replace with your image path
            alt="Contact Us"
            width={500}
            height={500}
            className="w-full h-auto"
          />
        </div>
      </div>
    </div>
  );
};

export default Contact;
