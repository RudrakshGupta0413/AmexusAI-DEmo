"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Upload, Send, FileSpreadsheet, CheckCircle, AlertCircle } from "lucide-react"

// Map questions to their corresponding image paths
const messageImageMap: Record<string, string> = {
  "What is the average price per unit for the commodity : SAFETY GOGGLES across the plants? Show me a visualization.":
    "/plant_price_comparison_2017937.0.png",
  "Plot the average unit price variation across different vendors for WELD LEG GUARD in the database.":
    "/vendor_price_comparison_2055798.0.png",
  "What is the variation of purchase order counts across all the months present in the database?":
    "/monthly_po_count.png",
  "Plot the movement in stock amount for HS DIESEL?": "/output.png",
}

// Predefined responses for specific questions
const predefinedResponses: Record<string, string> = {
  "What is the average price per unit for the commodity : SAFETY GOGGLES across the plants? Show me a visualization.":
    "Based on the data, the average price per unit for SAFETY GOGGLES varies significantly across plants. Plant C has the highest average price at $12.45 per unit, while Plant A has the lowest at $8.20 per unit. Here's the visualization:",

  "Plot the average unit price variation across different vendors for WELD LEG GUARD in the database.":
    "I've analyzed the price variation for WELD LEG GUARD across vendors. Vendor XYZ offers the most competitive price at $45.30 per unit, while Vendor ABC charges the highest at $62.75 per unit. Here's the visualization:",

  "What is the variation of purchase order counts across all the months present in the database?":
    "The purchase order count shows seasonal variation with peaks in March and September. The lowest activity is in December with only 42 purchase orders. Here's the monthly distribution:",

  "Plot the movement in stock amount for HS DIESEL?":
    "The stock levels for HS DIESEL show a declining trend over the past quarter with occasional restocking. The current stock is at 65% of maximum capacity. Here's the stock movement chart:",
}

type Message = {
  id: number
  text: string
  isUser: boolean
  isLoading?: boolean
  imagePath?: string
}

type FileStatus = "none" | "uploading" | "success" | "error" | "processing"

export function DataCleaningInterface() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Hello! I'm the Data Cleaning Agent. Upload an Excel file and I'll help you clean and process your data.",
      isUser: false,
    },
  ])
  const [inputText, setInputText] = useState("")
  const [fileStatus, setFileStatus] = useState<FileStatus>("none")
  const [fileName, setFileName] = useState("")
  const fileInputRef = useRef<HTMLInputElement>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({})

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = () => {
    if (!inputText.trim() && fileStatus !== "success") return

    // Add user message
    const newMessage: Message = {
      id: messages.length + 1,
      text: inputText,
      isUser: true,
    }

    setMessages((prev) => [...prev, newMessage])

    // Check if this message has a predefined response and image
    const imagePath = messageImageMap[inputText]
    const response = predefinedResponses[inputText]

    if (response) {
      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          {
            id: prev.length + 1,
            text: response,
            isUser: false,
            imagePath: imagePath,
          },
        ])
      }, 1000)
    } else if (fileStatus === "success") {
      // Generic response for when a file is uploaded
      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          {
            id: prev.length + 1,
            text: "I've analyzed your file. What specific information would you like to extract or visualize?",
            isUser: false,
          },
        ])
      }, 1000)
    } else {
      // Generic response
      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          {
            id: prev.length + 1,
            text: "I need an Excel file to help with data cleaning. Please upload a file using the button below.",
            isUser: false,
          },
        ])
      }, 1000)
    }

    setInputText("")
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Check if file is Excel
    const isExcel = file.name.endsWith(".xlsx") || file.name.endsWith(".xls") || file.name.endsWith(".csv")

    if (!isExcel) {
      setMessages((prev) => [
        ...prev,
        {
          id: messages.length + 1,
          text: `Please upload an Excel file (.xlsx, .xls) or CSV file.`,
          isUser: false,
        },
      ])
      return
    }

    setFileStatus("uploading")
    setFileName(file.name)

    // Add file upload message
    setMessages((prev) => [
      ...prev,
      {
        id: messages.length + 1,
        text: `Uploading ${file.name}...`,
        isUser: true,
      },
    ])

    // Simulate upload delay
    setTimeout(() => {
      setFileStatus("success")

      setMessages((prev) => [
        ...prev,
        {
          id: messages.length + 2,
          text: `File "${file.name}" uploaded successfully. What would you like me to do with this data?`,
          isUser: false,
        },
      ])
    }, 1500)
  }

  const triggerFileUpload = () => {
    fileInputRef.current?.click()
  }

  const handleImageError = (id: number) => {
    setImageErrors((prev) => ({ ...prev, [id]: true }))
  }

  return (
    <div className="mt-8 w-full max-w-3xl mx-auto">
      <div className="bg-gray-900 rounded-xl overflow-hidden border border-gray-800 shadow-lg flex flex-col h-[800px]">
        {/* Chat header */}
        <div className="p-4 bg-gray-800 flex items-center gap-3 border-b border-gray-700">
          <div className="w-10 h-10 rounded-full  flex items-center justify-center">
            {/* <FileSpreadsheet className="h-5 w-5" /> */}
            <img src="/intelligence.png" alt="Chat Icon" className="w-full h-full object-cover" />
          </div>
          <div>
            <h3 className="font-medium">Data Cleaning Agent</h3>
            <p className="text-xs text-gray-400">Excel & CSV processing</p>
          </div>
        </div>

        {/* Chat messages */}
        <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-3">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`max-w-[85%] p-3 rounded-lg ${
                msg.isUser ? "bg-green-600 text-white ml-auto" : "bg-gray-800 text-gray-100 mr-auto"
              }`}
            >
              {msg.isLoading ? (
                <div className="flex items-center gap-2">
                  <div className="animate-spin h-4 w-4 border-2 border-gray-300 border-t-white rounded-full"></div>
                  {msg.text}
                </div>
              ) : (
                <>
                  <div>{msg.text}</div>
                  {msg.imagePath && !imageErrors[msg.id] && (
                    <div className="mt-3 relative">
                      <img
                        src={msg.imagePath || "/placeholder.svg"}
                        alt="Data visualization"
                        className="rounded-md border border-gray-700 max-w-full"
                        onError={() => handleImageError(msg.id)}
                        onLoad={scrollToBottom}
                      />
                    </div>
                  )}
                  {msg.imagePath && imageErrors[msg.id] && (
                    <div className="mt-3 p-4 bg-gray-700 rounded-md border border-gray-600 text-center">
                      <p className="text-sm text-gray-300">Chart visualization could not be loaded</p>
                    </div>
                  )}
                </>
              )}
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* File status indicator */}
        {fileStatus !== "none" && (
          <div
            className={`px-4 py-2 text-sm flex items-center gap-2 ${
              fileStatus === "error"
                ? "bg-red-900/30 text-red-300"
                : fileStatus === "success"
                  ? "bg-green-900/30 text-green-300"
                  : fileStatus === "processing"
                    ? "bg-blue-900/30 text-blue-300"
                    : "bg-gray-800 text-gray-300"
            }`}
          >
            {fileStatus === "uploading" && (
              <>
                <div className="animate-spin h-3 w-3 border-2 border-gray-300 border-t-white rounded-full"></div>
                <span>Uploading {fileName}...</span>
              </>
            )}
            {fileStatus === "success" && (
              <>
                <CheckCircle className="h-3 w-3" />
                <span>{fileName} uploaded</span>
              </>
            )}
            {fileStatus === "error" && (
              <>
                <AlertCircle className="h-3 w-3" />
                <span>Error uploading file</span>
              </>
            )}
            {fileStatus === "processing" && (
              <>
                <div className="animate-spin h-3 w-3 border-2 border-gray-300 border-t-white rounded-full"></div>
                <span>Processing {fileName}...</span>
              </>
            )}
          </div>
        )}

        {/* Input area */}
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
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileUpload}
            className="hidden"
            accept=".xlsx,.xls,.csv"
          />
          <Button
            size="icon"
            onClick={triggerFileUpload}
            className="rounded-full bg-gray-700 hover:bg-gray-600"
            title="Upload Excel file"
          >
            <Upload className="h-4 w-4" />
          </Button>
          <Button size="icon" onClick={handleSendMessage} className="rounded-full bg-green-600 hover:bg-green-700">
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}

