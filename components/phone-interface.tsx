"use client";

import { useState, useEffect } from "react";
import { Phone, PhoneOff } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Message {
  text: string;
  sender: "user" | "ai";
  delay?: number;
}

const messages: Message[] = [
  { text: "Client is speaking...", sender: "user", delay: 3000 },
  { text: "मैं एमेक्सस एआई की ओर से एक वेंडर सोर्सिंग एजेंट हूँ, जो न्यूनतम कीमत पर उत्पादों की खरीद के लिए रिवर्स बिडिंग में विशेषज्ञता रखती हूँ। मेरा काम उपयोगकर्ता से आवश्यकताएँ समझना, विक्रेताओं से संपर्क करना, और सबसे अच्छा सौदा तय करना है। आज मैं आपकी कैसे मदद कर सकती हूँ?", sender: "ai", delay: 2000 },
  { text: "Client is speaking...", sender: "user", delay: 4000 },
  { text: "मैं आपके क्षेत्र में उच्च गुणवत्ता वाले नट्स और बोल्ट्स के भरोसेमंद विक्रेता की तलाश कर रही हूँ।", sender: "ai", delay: 2500 },
  { text: "Client is speaking...", sender: "user", delay: 4000 },
  { text: "मुझे आपके क्षेत्र में नट्स और बोल्ट्स के विक्रेता मिल गए हैं। अब मैं प्रत्येक विक्रेता से एक-एक करके संपर्क करूंगी ताकि नट्स और बोल्ट्स की पूरी जानकारी और उनकी कीमत प्राप्त कर सकूं। जल्द ही मैं आपको सबसे बेहतरीन सौदे की जानकारी दूंगी!", sender: "ai", delay: 3500 },
  { text: "Client is speaking...", sender: "user", delay: 5000 },
  { text: "नमस्ते अमित, मुझे बीस नट्स और बोल्ट्स की आवश्यकता है। क्या आप नट्स और बोल्ट्स का विवरण और प्रति यूनिट कीमत प्रदान कर सकते हैं? कृपया जल्द से जल्द जानकारी साझा करें।", sender: "ai", delay: 4500 },
];

export default function PhoneInterface() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isCallActive, setIsCallActive] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);

  useEffect(() => {
    if (isCallActive) {
      handleMessageFlow();
    }
  }, [currentIndex, isCallActive]);

  const handleMessageFlow = () => {
    if (currentIndex >= messages.length) {
      setIsCallActive(false); // Stop the call if all messages are done
      return;
    }

    const currentMessage = messages[currentIndex];
    if (!currentMessage) return; // Prevent accessing undefined properties

    const delay = currentMessage.delay || 2000; // Default delay

    if (currentMessage.sender === "ai") {
      speakText(currentMessage.text, delay);
    } else {
      setTimeout(() => setCurrentIndex((prev) => prev + 1), delay);
    }
  };

  const speakText = (text: string, delay: number) => {
    setIsSpeaking(true);
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "hi-IN";

    utterance.onend = () => {
      setIsSpeaking(false);
      setTimeout(() => {
        setCurrentIndex((prevIndex) => prevIndex + 1);
      }, delay);
    };

    speechSynthesis.speak(utterance);
  };

  const handleCall = () => {
    setIsCallActive(true);
    setCurrentIndex(0);
  };

  const handleEndCall = () => {
    setIsCallActive(false);
    setCurrentIndex(0);
    speechSynthesis.cancel();
  };

  return (
    <div className="mt-8 w-full max-w-xs mx-auto">
      <div className="bg-gray-900 rounded-xl overflow-hidden border border-gray-800 shadow-lg">
        <div className="p-6 bg-gray-800 flex flex-col items-center">
          <div className="w-16 h-16 rounded-full bg-gray-700 mb-4 flex items-center justify-center">
            <span className="text-2xl">🎙️</span>
          </div>
          <div className="text-center">
            <h3 className="font-medium text-lg">Voice AI Assistant</h3>
            <p className="text-gray-400 text-sm">{isCallActive ? "In Call" : "Ready to Call"}</p>
          </div>
          {isCallActive && currentIndex < messages.length && (
            <div className="mt-4 text-green-500 font-mono">{messages[currentIndex]?.text}</div>
          )}
        </div>
        <div className="p-4 flex justify-center gap-8">
          <Button onClick={handleCall} disabled={isCallActive} className={`rounded-full w-16 h-16 ${isCallActive ? "bg-gray-700" : "bg-green-600 hover:bg-green-700"}`}>
            <Phone className="h-6 w-6" />
          </Button>
          <Button onClick={handleEndCall} disabled={!isCallActive} className={`rounded-full w-16 h-16 ${!isCallActive ? "bg-gray-700" : "bg-red-600 hover:bg-red-700"}`}>
            <PhoneOff className="h-6 w-6" />
          </Button>
        </div>
      </div>
      {isCallActive && currentIndex < messages.length && messages[currentIndex]?.sender === "user" && (
        <div className="absolute top-10 left-1/2 transform -translate-x-1/2 bg-blue-500 text-white px-4 py-2 rounded-md shadow-md animate-bounce">
          Client is speaking...
        </div>
      )}
    </div>
  );
}
