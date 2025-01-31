'use client';
import { useState, useEffect, useRef } from "react";

export default function MicrophoneAudioTranscription() {
  const [transcription, setTranscription] = useState("");
  const [isListening, setIsListening] = useState(true);
  const deepgramSocket = useRef(null);
  const mediaRecorderRef = useRef(null);

  useEffect(() => {
    if (!isListening) return;

    const startTranscription = async () => {
      try {
        setTranscription(""); 

        // Get audio stream from microphone
        const stream = await navigator.mediaDevices.getUserMedia({ 
          audio: {
            echoCancellation: true,
            noiseSuppression: true,
            autoGainControl: true
          }
        });

        // Initialize WebSocket connection to Deepgram
        deepgramSocket.current = new WebSocket("wss://api.deepgram.com/v1/listen", ["token", "74089877a973ac8d61cafa5e1be080a920764e8b"]);

        deepgramSocket.current.onopen = () => {

          // Initialize MediaRecorder to capture audio chunks
          mediaRecorderRef.current = new MediaRecorder(stream, { 
            mimeType: "audio/webm" 
          });

          mediaRecorderRef.current.ondataavailable = (event) => {
            if (event.data.size > 0 && deepgramSocket.current.readyState === WebSocket.OPEN) {
              deepgramSocket.current.send(event.data);
            }
          };

          mediaRecorderRef.current.start(1000); // Send chunks every second
        };

        // Handle transcription data from Deepgram
        deepgramSocket.current.onmessage = (event) => {
          try {
            const result = JSON.parse(event.data);
            if (result.channel?.alternatives[0]?.transcript && result.is_final) {
              setTranscription(prev => `${prev} ${result.channel.alternatives[0].transcript}`.trim());
            }
          } catch (err) {
            console.error("Error parsing response:", err);
          }
        };

        // Handle WebSocket errors
        deepgramSocket.current.onerror = (error) => 
          console.error("WebSocket Error:", error);

      } catch (error) {
        console.error("Error accessing microphone:", error);
      }
    };

    startTranscription();

    return () => {
      // Cleanup when stopping transcription
      if (deepgramSocket.current) {
        deepgramSocket.current.close();
      }
      if (mediaRecorderRef.current) {
        mediaRecorderRef.current.stop();
        // Stop all media tracks
        mediaRecorderRef.current.stream?.getTracks().forEach(track => track.stop());
      }
    };
  }, [isListening]);

  return (
    <div className="p-6 min-w-[500px] bg-white rounded-2xl shadow-xl max-w-2xl mx-auto border border-gray-100 transition-all duration-300 hover:shadow-2xl">
      <div className="flex items-center gap-3 mb-6">
        <div className={`p-3 rounded-full ${isListening ? 'bg-green-100' : 'bg-red-100'}`}>
          <svg 
            className={`w-6 h-6 ${isListening ? 'text-green-600' : 'text-red-600'}`} 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth="2" 
              d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
            />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-gray-800">
          Your Audio Transcription
        </h2>
      </div>

      <div className="p-4 h-64 overflow-y-auto border-2 border-dashed border-gray-200 rounded-xl bg-gray-50/50 transition-colors duration-300 hover:border-gray-300">
        {transcription ? (
          <p className="text-gray-700 text-lg leading-relaxed whitespace-pre-wrap font-medium animate-fadeIn">
            {transcription}
          </p>
        ) : (
          <div className="h-full flex items-center justify-center">
            <p className="text-gray-400 italic text-center">
              {isListening ? "Listening for speech..." : "Transcription paused"}
            </p>
          </div>
        )}
      </div>

      <div className="mt-6 flex gap-3">
        <button
          onClick={() => setIsListening(!isListening)}
          className={`flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all duration-200 ${
            isListening 
              ? "bg-red-500 hover:bg-red-600 text-white"
              : "bg-emerald-500 hover:bg-emerald-600 text-white"
          }`}
        >
          <svg 
            className="w-5 h-5" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            {isListening ? (
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth="2" 
                d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            ) : (
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth="2" 
                d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
              />
            )}
          </svg>
          {isListening ? "Pause Transcription" : "Start Transcription"}
        </button>

        <button
          onClick={() => setTranscription("")}
          className="px-4 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl font-semibold transition-all duration-200 flex items-center gap-2"
        >
          <svg 
            className="w-5 h-5" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth="2" 
              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
            />
          </svg>
          Clear
        </button>
      </div>

      {isListening && (
        <div className="mt-4 flex items-center gap-2 text-sm text-gray-500">
          <div className="h-2 w-2 bg-green-500 rounded-full animate-pulse"></div>
          <span>Live transcription active</span>
        </div>
      )}
    </div>
  );
}