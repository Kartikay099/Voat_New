import { useState } from "react";
import StudentProfile from "./StudentProfile";
import SchedulePage from "./SchedulePage";
import ApplyForJobs from "./ApplyForJobs";
import Jobapplied from "./JobApplied";
import { MessageCircle, X, Send } from "lucide-react";
import { useNotifications } from "../contexts/NotificationContext";

import { Outlet } from "react-router-dom";

export default function StudentDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([
    { id: 1, text: "Hello! How can I help you today?", sender: "bot" },
  ]);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [showScheduleFromNotifications, setShowScheduleFromNotifications] =
    useState(false);

  const { notifications, markAsRead, markAllAsRead } = useNotifications();

  const unreadCount = notifications.filter((n) => !n.read).length;

  const handleViewAllNotifications = () => {
    setNotificationsOpen(false);
    setShowScheduleFromNotifications(true);
  };

  const handleSendMessage = () => {
    if (message.trim() === "") return;
    const newMessage = {
      id: messages.length + 1,
      text: message,
      sender: "user",
    };

    setMessages([...messages, newMessage]);
    setMessage("");

    setTimeout(() => {
      const botResponse = {
        id: messages.length + 2,
        text: "Thanks for your message! We'll get back to you soon.",
        sender: "bot",
      };
      setMessages((prev) => [...prev, botResponse]);
    }, 1000);
  };

  const formatNotificationTime = (date) => {
    if (!date) return "";
    const now = new Date();
    const diffHours = Math.floor((now - date) / (1000 * 60 * 60));

    if (diffHours < 24)
      return `${diffHours} hour${diffHours !== 1 ? "s" : ""} ago`;
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  };

  return (
    <main className="flex-1 overflow-auto p-4 md:p-8 bg-[#F5F9FD] relative">
      <Outlet />
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
        {chatOpen && (
          <div className="w-80 h-96 bg-white rounded-t-lg shadow-xl flex flex-col border border-gray-200">
            <div className="bg-[#0F52BA] text-white p-3 rounded-t-lg flex justify-between items-center">
              <h3 className="font-medium">Support Chat</h3>
              <button
                onClick={() => setChatOpen(false)}
                className="p-1 rounded-full hover:bg-[#1565C0] transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            <div className="flex-1 p-3 overflow-y-auto space-y-2">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${
                    msg.sender === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-xs p-2 rounded-lg ${
                      msg.sender === "user"
                        ? "bg-[#0F52BA] text-white"
                        : "bg-gray-200 text-gray-800"
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
            </div>

            <div className="p-3 border-t border-gray-200">
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                  placeholder="Type your message..."
                  className="flex-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#0F52BA]"
                />
                <button
                  onClick={handleSendMessage}
                  className="p-2 bg-[#0F52BA] text-white rounded-lg hover:bg-[#1565C0] transition-colors"
                >
                  <Send size={18} />
                </button>
              </div>
            </div>
          </div>
        )}

        <button
          onClick={() => setChatOpen(!chatOpen)}
          className="p-4 bg-[#0F52BA] text-white rounded-full shadow-lg hover:bg-[#1565C0] transition-colors flex items-center justify-center"
        >
          {chatOpen ? <X size={24} /> : <MessageCircle size={24} />}
        </button>
      </div>
    </main>
  );
}
