"use client"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { VoiceControls } from "./voice-controls"
import { Send } from "lucide-react"

export function AdvancedDemo() {
  const [messages, setMessages] = useState<{ text: string; isUser: boolean }[]>([])
  const [inputText, setInputText] = useState("")
  const synth = useRef<SpeechSynthesis | null>(null)
  const utterance = useRef<SpeechSynthesisUtterance | null>(null)

  // Initialize speech synthesis
  if (typeof window !== "undefined" && !synth.current) {
    synth.current = window.speechSynthesis
    utterance.current = new SpeechSynthesisUtterance()
  }

  const handleSendMessage = () => {
    if (!inputText.trim()) return

    // Add user message
    setMessages((prev) => [...prev, { text: inputText, isUser: true }])

    // Generate AI response based on input
    const aiResponse = generateResponse(inputText)
    setMessages((prev) => [...prev, { text: aiResponse, isUser: false }])

    // Speak the response
    if (synth.current && utterance.current) {
      utterance.current.text = aiResponse
      synth.current.speak(utterance.current)
    }

    setInputText("")
  }

  const handleSpeechResult = (text: string) => {
    setInputText(text)
  }

  // Simple response generator
  const generateResponse = (input: string): string => {
    input = input.toLowerCase()

    if (input.includes("hello") || input.includes("hi")) {
      return "Hello! How can I assist you today?"
    } else if (input.includes("how are you")) {
      return "I'm doing well, thank you for asking! How can I help you?"
    } else if (input.includes("weather")) {
      return "I don't have access to real-time weather data, but I'd be happy to discuss other topics!"
    } else if (input.includes("name")) {
      return "I'm your Voice AI assistant. How can I help you today?"
    } else if (input.includes("thank")) {
      return "You're welcome! Is there anything else I can help with?"
    } else {
      return "That's an interesting question. I'm a demo voice AI assistant with limited capabilities, but I'm here to help!"
    }
  }

  return (
    <div className="w-full max-w-md mx-auto bg-gray-900 rounded-lg overflow-hidden border border-gray-800">
      <div className="p-4 bg-gray-800 flex justify-between items-center">
        <h3 className="font-medium">Voice AI Conversation</h3>
        <VoiceControls onSpeechResult={handleSpeechResult} />
      </div>

      <div className="h-80 overflow-y-auto p-4 flex flex-col gap-3">
        {messages.length === 0 ? (
          <div className="text-center text-gray-500 my-auto">Start a conversation with the Voice AI</div>
        ) : (
          messages.map((msg, index) => (
            <div
              key={index}
              className={`max-w-[80%] p-3 rounded-lg ${
                msg.isUser ? "bg-green-600 text-white ml-auto" : "bg-gray-800 text-gray-100 mr-auto"
              }`}
            >
              {msg.text}
            </div>
          ))
        )}
      </div>

      <div className="p-3 border-t border-gray-800 flex gap-2">
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Type your message..."
          className="flex-1 bg-gray-800 border border-gray-700 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-green-500"
          onKeyDown={(e) => {
            if (e.key === "Enter") handleSendMessage()
          }}
        />
        <Button size="icon" onClick={handleSendMessage} className="rounded-full bg-green-600 hover:bg-green-700">
          <Send className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}

