import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send, Bot, User } from "lucide-react";

interface Message {
  id: string;
  content: string;
  sender: "user" | "ai";
  timestamp: Date;
}

const ChatInterface = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content: "Hello! I'm AgroIntel AI, your trusted agricultural investment assistant. I analyze satellite data to help you make smarter commodity trading decisions. What would you like to know about today?",
      sender: "ai",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput("");

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: getAIResponse(input),
        sender: "ai",
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, aiResponse]);
    }, 1000);
  };

  const getAIResponse = (userInput: string): string => {
    const lowerInput = userInput.toLowerCase();
    
    if (lowerInput.includes("cassava") && lowerInput.includes("ogun")) {
      return "✅ Satellite scans from June–July show a 12% drop in vegetative health (NDVI index) across central Ogun due to dry spells.\n\n🌧️ Rainfall is 23% below seasonal norms, delaying planting cycles.\n\n🌱 Expect a **lower-than-average cassava yield**, which could raise prices by ~8–12% by Q4 if trend continues.\n\n📍 Suggest watching **Ifo and Ado-Odo zones**, which retain better soil moisture and may become supply hubs.\n\nWould you like alerts if the NDVI index drops again next month?";
    }
    
    if (lowerInput.includes("maize") || lowerInput.includes("corn")) {
      return "🌽 Current maize outlook shows promising NDVI readings across major growing regions. Soil moisture levels are 15% above average, suggesting strong yield potential. Rainfall patterns indicate favorable conditions through harvest season.";
    }
    
    if (lowerInput.includes("rice")) {
      return "🌾 Rice cultivation zones showing mixed signals - northern regions experiencing optimal water levels while southern areas face 8% moisture deficit. Satellite imagery suggests potential 5-7% yield variance across regions.";
    }
    
    return "I understand you're interested in agricultural investment insights. I can analyze satellite data for various crops including cassava, maize, rice, and more. Please specify which crop and region you'd like me to analyze, and I'll provide detailed insights on vegetation health, rainfall patterns, and yield predictions.";
  };

  return (
    <Card className="h-[500px] flex flex-col shadow-earth bg-[#1A1D23] text-white">
      <div className="p-4 border-b bg-gradient-vegetation text-vegetation-foreground">
        <div className="flex items-center space-x-2">
          <Bot className="w-5 h-5" />
          <h3 className="font-semibold">AI Assistant</h3>
        </div>
      </div>
      
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex items-start space-x-3 animate-fade-up ${
                message.sender === "user" ? "flex-row-reverse space-x-reverse" : ""
              }`}
            >
              <div className={`flex items-center justify-center w-8 h-8 rounded-full ${
                message.sender === "ai" 
                  ? "bg-gradient-vegetation text-vegetation-foreground" 
                  : "bg-gradient-growth text-harvest-foreground"
              }`}>
                {message.sender === "ai" ? (
                  <Bot className="w-4 h-4" />
                ) : (
                  <User className="w-4 h-4" />
                )}
              </div>
              
              <div className={`max-w-[80%] rounded-lg p-3 ${
                message.sender === "ai"
                  ? "bg-muted text-foreground"
                  : "bg-primary text-primary-foreground"
              }`}>
                <p className="text-sm whitespace-pre-line">{message.content}</p>
                <span className="text-xs opacity-70 mt-2 block">
                  {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
      
      <div className="p-4 border-t">
        <div className="flex space-x-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about crop conditions, yields, or market insights..."
            onKeyPress={(e) => e.key === "Enter" && handleSend()}
            className="flex-1"
          />
          <Button onClick={handleSend} size="icon" className="bg-vegetation hover:bg-vegetation/90">
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default ChatInterface;