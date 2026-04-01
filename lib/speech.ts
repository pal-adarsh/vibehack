"use client";

export interface SpeechResult {
  transcript: string;
  confidence: number;
}

type SpeechRecognitionType = typeof window.SpeechRecognition;

function getSpeechRecognitionConstructor(): SpeechRecognitionType | null {
  if (typeof window === "undefined") {
    return null;
  }

  const SpeechRecognitionImpl =
    window.SpeechRecognition ||
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (window as any).webkitSpeechRecognition;

  return SpeechRecognitionImpl ?? null;
}

export function supportsSpeechRecognition(): boolean {
  return Boolean(getSpeechRecognitionConstructor());
}

export function transcribeOnce(language = "en-US"): Promise<SpeechResult> {
  return new Promise((resolve, reject) => {
    const SpeechRecognitionImpl = getSpeechRecognitionConstructor();

    if (!SpeechRecognitionImpl) {
      reject(new Error("Speech recognition is not supported in this browser."));
      return;
    }

    let settled = false;

    const finishWithError = (message: string) => {
      if (!settled) {
        settled = true;
        reject(new Error(message));
      }
    };

    const finishWithResult = (result: SpeechResult) => {
      if (!settled) {
        settled = true;
        resolve(result);
      }
    };

    if (navigator?.mediaDevices?.getUserMedia) {
      navigator.mediaDevices.getUserMedia({ audio: true }).catch(() => {
        // SpeechRecognition will surface a permission error if this fails.
      });
    }

    const recognition = new SpeechRecognitionImpl();
    recognition.lang = language;
    recognition.maxAlternatives = 1;
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onresult = (event: SpeechRecognitionEvent) => {
      const first = event.results[0]?.[0];
      if (!first) {
        finishWithError("No transcript captured.");
        return;
      }

      finishWithResult({ transcript: first.transcript, confidence: first.confidence ?? 0.8 });
      recognition.stop();
    };

    recognition.onend = () => {
      finishWithError("No speech detected. Try speaking closer to the microphone.");
    };

    recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
      if (event.error === "not-allowed") {
        finishWithError("Microphone permission denied.");
        return;
      }

      if (event.error === "no-speech") {
        finishWithError("No speech detected. Try again.");
        return;
      }

      finishWithError(`Speech recognition failed (${event.error}).`);
    };

    try {
      recognition.start();
    } catch {
      finishWithError("Unable to start speech recognition. Retry in a supported browser.");
    }
  });
}

declare global {
  interface Window {
    SpeechRecognition: {
      new (): SpeechRecognition;
    };
    webkitSpeechRecognition: {
      new (): SpeechRecognition;
    };
  }

  interface SpeechRecognition extends EventTarget {
    continuous: boolean;
    interimResults: boolean;
    lang: string;
    maxAlternatives: number;
    onend: (() => void) | null;
    onerror: ((event: SpeechRecognitionErrorEvent) => void) | null;
    onresult: ((event: SpeechRecognitionEvent) => void) | null;
    start(): void;
    stop(): void;
  }

  interface SpeechRecognitionErrorEvent {
    error: string;
    message?: string;
  }

  interface SpeechRecognitionEvent {
    results: ArrayLike<
      ArrayLike<{
        transcript: string;
        confidence: number;
      }>
    >;
  }
}
