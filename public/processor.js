class AudioProcessor extends AudioWorkletProcessor {
    process(inputs) {
      const input = inputs[0]; // Get audio input
  
      if (input.length > 0) {
        const audioData = input[0]; // Get the first channel
        this.port.postMessage(audioData); // Send audio data to the main thread
      }
      return true; // Keep processing
    }
  }
  
  registerProcessor("audio-processor", AudioProcessor);
  