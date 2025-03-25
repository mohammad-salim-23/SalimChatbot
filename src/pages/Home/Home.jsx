/* eslint-disable no-unused-vars */
import { useState } from "react";
import axios from "axios";
import aiImg from "../../assets/images/AIChatbot.jpg";

const HomePage = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const API_KEY = import.meta.env.VITE_CHATBOT_KEY;
  const API_URL = "https://api.openai.com/v1/chat/completions";

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { role: "user", content: input };
    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setInput("");

    try {
      const response = await axios.post(
        API_URL,
        {
          model: "gpt-3.5-turbo",
          messages: [...messages, userMessage],
        },
        {
          headers: { Authorization: `Bearer ${API_KEY}` },
        }
      );
      const aiMessage = response.data.choices[0].message;
      setMessages((prevMessages) => [...prevMessages, aiMessage]);
    } catch (error) {
      setMessages((prevMessages) => [
        ...prevMessages,
        { role: "AI", content: "⚠️ API Error!" },
      ]);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-900 text-white py-10 px-4">
      <h1 className="text-4xl font-bold mb-6 text-teal-400 drop-shadow-lg">Salim Chatbot 🤖</h1>
      <div className="w-full max-w-lg bg-gray-800 rounded-xl p-6 shadow-2xl border border-gray-700">
        {/* Image Section */}
        <div className="flex justify-center mb-4">
          <img className="h-60 w-60 object-cover rounded-full shadow-lg border-4 border-teal-500" src={aiImg} alt="AI Chatbot" />
        </div>

        {/* Chat Messages */}
        <div className="h-72 overflow-y-auto border-b border-gray-600 pb-4 space-y-3">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`p-3 rounded-lg text-sm max-w-[80%] ${
                msg.role === "user"
                  ? "bg-teal-500 ml-auto text-white shadow-lg"
                  : "bg-gray-700 text-gray-200"
              }`}
            >
              <strong className="block text-xs mb-1 opacity-75">{msg.role === "user" ? "You" : "AI"}:</strong>
              {msg.content}
            </div>
          ))}
        </div>

        {/* Input Section */}
        <div className="mt-4 flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask anything..."
            className="flex-grow p-3 text-black rounded-md bg-gray-200 outline-none focus:ring-2 focus:ring-green-400"
          />
          <button
            onClick={sendMessage}
            className="bg-green-500 hover:bg-green-600 px-4 py-3 rounded-md text-white font-semibold shadow-md transition-all"
          >
            Send ➤
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
