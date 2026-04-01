"use client";

import { useEffect, useRef, useState } from "react";

import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";

type Soundscape = "off" | "lofi" | "rain" | "white";

export function AmbientPlayer() {
  const [active, setActive] = useState<Soundscape>("off");
  const contextRef = useRef<AudioContext | null>(null);
  const sourceRef = useRef<Array<AudioBufferSourceNode | OscillatorNode>>([]);
  const gainRef = useRef<GainNode | null>(null);

  useEffect(() => {
    return () => {
      sourceRef.current.forEach((source) => {
        try {
          source.stop();
        } catch {
          // no-op
        }
        source.disconnect();
      });
      gainRef.current?.disconnect();
      contextRef.current?.close().catch(() => undefined);
    };
  }, []);

  const ensureContext = async () => {
    if (!contextRef.current) {
      const Context = window.AudioContext || (window as typeof window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
      if (!Context) {
        throw new Error("Web Audio is not supported in this browser.");
      }
      contextRef.current = new Context();
    }

    if (contextRef.current.state === "suspended") {
      await contextRef.current.resume();
    }

    return contextRef.current;
  };

  const stop = () => {
    sourceRef.current.forEach((source) => {
      try {
        source.stop();
      } catch {
        // Source may have already stopped.
      }
      source.disconnect();
    });

    gainRef.current?.disconnect();
    sourceRef.current = [];
    gainRef.current = null;
    setActive("off");
  };

  const play = async (kind: Exclude<Soundscape, "off">) => {
    stop();

    const context = await ensureContext();
    const gain = context.createGain();
    gain.gain.value = kind === "white" ? 0.08 : 0.12;
    gain.connect(context.destination);
    gainRef.current = gain;

    if (kind === "lofi") {
      const osc = context.createOscillator();
      osc.type = "triangle";
      osc.frequency.value = 165;
      const lfo = context.createOscillator();
      const lfoGain = context.createGain();
      lfo.frequency.value = 0.35;
      lfoGain.gain.value = 12;
      lfo.connect(lfoGain);
      lfoGain.connect(osc.frequency);
      osc.connect(gain);
      lfo.connect(gain);
      osc.start();
      lfo.start();
      sourceRef.current = [osc, lfo];
      setActive(kind);
      return;
    }

    const bufferSize = context.sampleRate * 2;
    const noiseBuffer = context.createBuffer(1, bufferSize, context.sampleRate);
    const output = noiseBuffer.getChannelData(0);

    for (let i = 0; i < bufferSize; i += 1) {
      const white = Math.random() * 2 - 1;
      output[i] = kind === "rain" ? white * (0.4 + Math.random() * 0.6) : white;
    }

    const noise = context.createBufferSource();
    noise.buffer = noiseBuffer;
    noise.loop = true;

    const filter = context.createBiquadFilter();
    if (kind === "rain") {
      filter.type = "bandpass";
      filter.frequency.value = 900;
    } else {
      filter.type = "lowpass";
      filter.frequency.value = 1800;
    }

    noise.connect(filter);
    filter.connect(gain);
    noise.start();

    sourceRef.current = [noise];
    setActive(kind);
  };

  return (
    <Card className="space-y-3">
      <p className="text-xs uppercase tracking-[0.16em] text-ink-muted">Ambient Soundscapes</p>
      <div className="flex flex-wrap gap-2">
        <Button variant={active === "lofi" ? "primary" : "secondary"} onClick={() => play("lofi")}>
          Lo-fi
        </Button>
        <Button variant={active === "rain" ? "primary" : "secondary"} onClick={() => play("rain")}>
          Rain
        </Button>
        <Button variant={active === "white" ? "primary" : "secondary"} onClick={() => play("white")}>
          White Noise
        </Button>
        <Button variant="ghost" onClick={stop}>
          Stop
        </Button>
      </div>
    </Card>
  );
}
