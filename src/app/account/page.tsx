"use client";
import Breadcrumb from "@/components/BreadCrumb";
import Image from "next/image";
import React, { useState } from "react";

const AccountPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Logging in with", email, password);
  };

  return (
    <div>
      {/* BreadCrumb */}
      <Breadcrumb />

      {/* Login Section */}
      <div className="flex justify-center items-center min-h-screen bg-white px-4">
        <div className="bg-white p-6 sm:p-8 rounded-lg shadow-lg border border-gray-100 w-full max-w-md sm:max-w-lg lg:max-w-xl mt-4 sm:mt-6 lg:mt-0 xl:mt-0">
          <h2 className="text-2xl font-bold text-center mb-2">Login</h2>
          <p className="text-gray-500 text-center mb-4">
            Please login using account details below.
          </p>

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your email"
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your password"
              />
            </div>

            <div className="flex items-center justify-between mb-6">
              <a href="#" className="text-sm text-gray-400 hover:underline">
                Forgot your password?
              </a>
            </div>

            <button
              type="submit"
              className="w-full bg-pink-500 hover:bg-pink-600 text-white py-2 rounded-md text-lg"
            >
              Sign In
            </button>

            <div className="mt-4 text-center text-sm">
              <p>
                Don&apos;t have an account?{" "}
                <a href="#" className="text-blue-600 hover:underline">
                  Create account
                </a>
              </p>
            </div>
          </form>
        </div>
      </div>

      {/* Newsletter Image */}
      <div className="flex justify-center px-4 mt-10 mb-10">
        <div className="w-full max-w-2xl">
          <Image
            src="/newsletter.png"
            alt="Newsletter"
            layout="responsive"
            width={700}
            height={600}
          />
        </div>
      </div>
    </div>
  );
};

export default AccountPage;
