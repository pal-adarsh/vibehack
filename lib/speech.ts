"use client";

export interface SpeechResult {
  transcript: string;
  confidence: number;
}

type SpeechRecognitionType = typeof window.SpeechRecognition;

function getSpeechRecognition(): SpeechRecognitionType | null {
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
  return Boolean(getSpeechRecognition());
}

export function transcribeOnce(language = "en-US"): Promise<SpeechResult> {
  return new Promise((resolve, reject) => {
    const SpeechRecognitionImpl = getSpeechRecognition();

    if (!SpeechRecognitionImpl) {
      reject(new Error("Speech recognition is not supported in this browser."));
      return;
    }

    const recognition = new SpeechRecognitionImpl();
    recognition.lang = language;
    recognition.maxAlternatives = 1;
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onresult = (event: SpeechRecognitionEvent) => {
      const first = event.results[0]?.[0];
      if (!first) {
        reject(new Error("No transcript captured."));
        return;
      }

      resolve({ transcript: first.transcript, confidence: first.confidence ?? 0.8 });
    };

    recognition.onerror = () => reject(new Error("Speech recognition failed."));
    recognition.start();
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
    onerror: (() => void) | null;
    onresult: ((event: SpeechRecognitionEvent) => void) | null;
    start(): void;
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
