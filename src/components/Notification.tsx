import React from "react";
import { FaCheckCircle } from "react-icons/fa"; // Import tick icon

interface NotificationProps {
  message: string;
  type: "success" | "error";
}

const Notification: React.FC<NotificationProps> = ({ message, type }) => {
  const notificationStyles = {
    success: "bg-white text-pink-600 border-2 border-purple-600",
    error: "bg-red-600 text-white",
  };

  return (
    <div
      className={`fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-6 mb-4 rounded-lg shadow-xl ${notificationStyles[type]} transition-all duration-300 z-50 max-w-lg w-full animate-fadeIn`}
      style={{ maxWidth: "400px" }}
    >
      <div className="flex items-center space-x-2">
        <p className="font-semibold text-xl">{message}</p>
        <FaCheckCircle className="text-4xl text-green-600" />
      </div>
    </div>
  );
};

export default Notification;
