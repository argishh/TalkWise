import SpeakerAudioTranscription from "./components/SpeakerAudioTranscription";
import MicrophoneAudioTranscription from "./components/MicrophoneAudioTranscription";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-4">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
              TalkWise
            </span>
          </h1>
          <p className="text-lg text-gray-600">
            Real-time meeting assistant
          </p>
        </div>

        {/* Cards Container */}
        <div className="flex flex-col md:flex-row gap-0 justify-center items-stretch min-h-[500px] bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
            <SpeakerAudioTranscription />
            <MicrophoneAudioTranscription />
        </div>


        {/* Footer Note */}
        <p className="text-center text-gray-500 mt-12 text-sm">
          Note: System audio transcription requires browser permissions for screen sharing
        </p>
      </div>
    </div>
  );
}