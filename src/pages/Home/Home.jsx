/* eslint-disable no-unused-vars */
import { useState } from "react";
import axios from "axios";

const HomePage = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const API_KEY = import.meta.env.VITE_CHATBOT_KEY;
  const API_URL = "https://api.openai.com/v1/chat/completions";

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { role: "user", content: input };
    setMessages([...messages, userMessage]);
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
      setMessages([...messages, userMessage, aiMessage]);
    } catch (error) {
      setMessages([...messages, userMessage, { role: "AI", content: "⚠️ API Error!" }]);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-900 text-white py-10">
      <h1 className="text-3xl font-bold mb-5">Salim Chatbot 🤖</h1>
      <div className="w-full max-w-lg bg-gray-800 rounded-lg p-5 shadow-lg">
        <div className="h-80 overflow-y-auto border-b border-gray-600 pb-4">
          {messages.map((msg, index) => (
            <div key={index} className={`my-2 p-2 rounded ${msg.role === "user" ? "bg-blue-500 ml-auto" : "bg-gray-700"}`}> 
              <strong>{msg.role === "user" ? "You" : "AI"}:</strong> {msg.content}
            </div>
          ))}
        </div>
        <div className="mt-4 flex">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask anything..."
            className="flex-grow p-2 text-black rounded-l-md"
          />
          <button onClick={sendMessage} className="bg-green-500 px-4 py-2 rounded-r-md">Send ➤</button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
