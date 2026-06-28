/**
 * speechRecognition.js
 * A production-ready wrapper around the browser's Web Speech API for real-time transcription.
 */

export class SpeechRecognitionService {
  constructor() {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    this.recognition = SpeechRecognition ? new SpeechRecognition() : null;
    this.isListening = false;

    if (this.recognition) {
      this.recognition.continuous = true;
      this.recognition.interimResults = true;
      this.recognition.lang = 'en-US';
    }
  }

  /**
   * Check if the browser supports Speech Recognition.
   * @returns {boolean}
   */
  isSupported() {
    return !!this.recognition;
  }

  /**
   * Starts capturing speech and converting to text.
   * @param {function} onResult - Called with (finalTranscript, interimTranscript)
   * @param {function} onError - Called when a speech recognition error occurs
   * @param {function} onEnd - Called when recording session finishes
   */
  start(onResult, onError, onEnd) {
    if (!this.recognition) {
      if (onError) onError("Web Speech API is not supported in this browser. Please try Chrome or Edge.");
      return false;
    }

    if (this.isListening) return true;

    let finalTranscript = '';

    this.recognition.onresult = (event) => {
      let interimTranscript = '';
      
      for (let i = event.resultIndex; i < event.results.length; ++i) {
        const result = event.results[i];
        if (result.isFinal) {
          finalTranscript += result[0].transcript + ' ';
        } else {
          interimTranscript += result[0].transcript;
        }
      }

      onResult(finalTranscript.trim(), interimTranscript.trim());
    };

    this.recognition.onerror = (event) => {
      console.error("Speech Recognition Error:", event.error);
      if (onError) onError(event.error);
    };

    this.recognition.onend = () => {
      this.isListening = false;
      if (onEnd) onEnd();
    };

    try {
      this.recognition.start();
      this.isListening = true;
      return true;
    } catch (error) {
      console.error("Failed to start speech recognition:", error);
      if (onError) onError(error.message || "Could not start audio listener.");
      this.isListening = false;
      return false;
    }
  }

  /**
   * Stops the active speech recording capture.
   */
  stop() {
    if (this.recognition && this.isListening) {
      try {
        this.recognition.stop();
        this.isListening = false;
      } catch (error) {
        console.error("Failed to stop speech recognition:", error);
      }
    }
  }
}
