import { useState } from "react";
import Card from "../components/common/Card";
import Button from "../components/common/Button";
import SectionHeader from "../components/common/SectionHeader";

const starterPrompts = [
  "How much did I spend on food this month?",
  "What category takes most of my money?",
  "How can I reduce my spending?",
  "Compare this month and last month.",
];

export default function AIInsightsPage() {
  const [prompt, setPrompt] = useState("");
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content: "Hello. I can help summarize spending, explain trends, and suggest next steps once the AI backend route is expanded.",
    },
  ]);

  function sendPrompt(customPrompt) {
    const finalPrompt = customPrompt || prompt;
    if (!finalPrompt.trim()) return;
    setMessages((prev) => [
      ...prev,
      { role: "user", content: finalPrompt },
      {
        role: "assistant",
        content: "This frontend is ready for the finance assistant UI. Connect it to a backend chat endpoint to get live answers based on the current user’s financial data.",
      },
    ]);
    setPrompt("");
  }

  return (
    <div className="space-y-6">
      <SectionHeader title="AI Assistant" subtitle="Ask questions about your spending, savings, and trends" />
      <Card title="Suggested Prompts" subtitle="Tap one to quickly test the assistant UI">
        <div className="flex flex-wrap gap-3">
          {starterPrompts.map((item) => (
            <button key={item} onClick={() => sendPrompt(item)} className="rounded-full border border-slate-700 px-4 py-2 text-sm text-slate-200 hover:bg-slate-800">
              {item}
            </button>
          ))}
        </div>
      </Card>
      <Card title="Conversation" subtitle="Assistant UI ready for backend integration">
        <div className="space-y-4">
          {messages.map((message, index) => (
            <div key={index} className={`rounded-2xl p-4 text-sm ${message.role === "assistant" ? "bg-slate-900 text-slate-200 border border-slate-800" : "bg-emerald-400 text-slate-950"}`}>
              {message.content}
            </div>
          ))}
        </div>
        <div className="mt-4 flex flex-col gap-3 sm:flex-row">
          <input value={prompt} onChange={(e) => setPrompt(e.target.value)} placeholder="Ask about your finances..." className="flex-1 rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-white" />
          <Button onClick={() => sendPrompt()}>Send</Button>
        </div>
      </Card>
    </div>
  );
}
