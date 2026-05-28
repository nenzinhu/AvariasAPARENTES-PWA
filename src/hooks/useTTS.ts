import { useState, useCallback } from 'react';

export type TTSEngine = 'google-cloud' | 'native' | 'responsive' | 'puter';

interface TTSOptions {
  engine: TTSEngine;
  gender: 'male' | 'female';
  rate: number;
  pitch: number;
  volume: number;
  voiceLocal?: string;
}

export const useTTS = () => {
  const [options, setOptions] = useState<TTSOptions>({
    engine: 'google-cloud',
    gender: 'female',
    rate: 1.0,
    pitch: 1.0,
    volume: 1.0,
  });

  const speak = useCallback((text: string) => {
    const { engine, gender, rate, pitch, volume, voiceLocal } = options;

    if (engine === 'google-cloud') {
      const url = `https://translate.google.com/translate_tts?ie=UTF-8&tl=pt-BR&client=tw-ob&q=${encodeURIComponent(text)}`;
      const audio = new Audio(url);
      audio.volume = volume;
      audio.playbackRate = rate;
      audio.play().catch(() => speakNative(text, rate, pitch, voiceLocal));
    } else if (engine === 'native') {
      speakNative(text, rate, pitch, voiceLocal);
    } else {
      // Fallback to native for now
      speakNative(text, rate, pitch, voiceLocal);
    }
  }, [options]);

  const speakNative = (text: string, rate: number, pitch: number, voiceName?: string) => {
    if (!('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'pt-BR';
    utterance.rate = rate;
    utterance.pitch = pitch;
    utterance.volume = options.volume;

    if (voiceName) {
      const voices = window.speechSynthesis.getVoices();
      const voice = voices.find(v => v.name === voiceName);
      if (voice) utterance.voice = voice;
    }

    window.speechSynthesis.speak(utterance);
  };

  return {
    options,
    setOptions,
    speak
  };
};
