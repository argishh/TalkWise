'use client';
import { useState, useEffect, useRef } from "react";

export default function SpeakerAudioTranscription() {
  const [transcription, setTranscription] = useState("");
  const [isListening, setIsListening] = useState(false);
  const deepgramSocket = useRef(null);
  const mediaRecorderRef = useRef(null);
  const videoRef = useRef(null);
  const streamRef = useRef(null);

  useEffect(() => {
    if (!isListening) return;

    const startTranscription = async () => {
      try {
        setTranscription("");

        // Capture system audio through screen sharing
        const stream = await navigator.mediaDevices.getDisplayMedia({
          audio: true,
          video: true // Required for browser compatibility
        });
        streamRef.current = stream;

        // Show captured tab in video element
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }

        // Create audio-only stream
        const audioStream = new MediaStream(stream.getAudioTracks());

        // Connect to Deepgram
        deepgramSocket.current = new WebSocket("wss://api.deepgram.com/v1/listen", [
          "token",
          "74089877a973ac8d61cafa5e1be080a920764e8b"
        ]);

        deepgramSocket.current.onopen = () => {
          mediaRecorderRef.current = new MediaRecorder(audioStream, {
            mimeType: "audio/webm"
          });

          mediaRecorderRef.current.ondataavailable = (event) => {
            if (event.data.size > 0 && deepgramSocket.current.readyState === WebSocket.OPEN) {
              deepgramSocket.current.send(event.data);
            }
          };

          mediaRecorderRef.current.start(1000);
        };

        deepgramSocket.current.onmessage = (event) => {
          try {
            const result = JSON.parse(event.data);
            const transcript = result.channel?.alternatives[0]?.transcript;
            if (transcript) {
              setTranscription(prev => `${prev} ${transcript}`.trim());
            }
          } catch (err) {
            console.error("Error parsing transcription:", err);
          }
        };

      } catch (error) {
        console.error("Audio capture failed:", error);
      }
    };

    startTranscription();

    return () => {
      deepgramSocket.current?.close();
      mediaRecorderRef.current?.stop();
      streamRef.current?.getTracks().forEach(track => track.stop());
    };
  }, [isListening]);

  return (
    <div className="p-6 bg-white min-w-[500px] rounded-2xl shadow-xl max-w-2xl mx-auto border border-gray-100 transition-all duration-300 hover:shadow-2xl">
      {/* Captured tab preview */}
      {isListening && (
        <video
          ref={videoRef}
          autoPlay
          playsInline
          muted
          className="w-full mb-4 rounded-lg border border-gray-200"
        />
      )}

      <div className="flex items-center gap-3 mb-6">
        <div className={`p-3 rounded-full ${isListening ? 'bg-purple-100' : 'bg-gray-100'}`}>
          <svg 
            className={`w-6 h-6 ${isListening ? 'text-purple-600' : 'text-gray-400'}`} 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth="2" 
              d="M15.536 8.464a5 5 0 010 7.072M12.062 12a2 2 0 012.828-2.828M17.657 6.343a8 8 0 010 11.314M8.464 15.536a5 5 0 010-7.072M5.636 5.636a9 9 0 000 12.728"
            />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-gray-800">
          Shared Tab Transcription
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
              {isListening ? "Capturing system audio..." : "Ready to capture audio"}
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
              : "bg-purple-500 hover:bg-purple-600 text-white"
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
                d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
              />
            )}
          </svg>
          {isListening ? "Stop Capture" : "Start Capture"}
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
          <div className="h-2 w-2 bg-purple-500 rounded-full animate-pulse"></div>
          <span>Capturing system audio</span>
        </div>
      )}
    </div>
  );
}