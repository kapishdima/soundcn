"use client";

import { useEffect, useRef, useState } from "react";

interface UseTypewriterOptions {
  words: string[];
  typeSpeed?: number;
  eraseSpeed?: number;
  pauseAfterType?: number;
  pauseAfterErase?: number;
}

export function useTypewriter({
  words,
  typeSpeed = 75,
  eraseSpeed = 40,
  pauseAfterType = 2800,
  pauseAfterErase = 400,
}: UseTypewriterOptions) {
  const [text, setText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const wordsRef = useRef(words);
  wordsRef.current = words;

  useEffect(() => {
    if (words.length === 0) return;

    let timer: ReturnType<typeof setTimeout>;
    let wordIndex = 0;
    let charIndex = 0;
    let erasing = false;

    function jitter(base: number) {
      return base * (0.7 + Math.random() * 0.6);
    }

    function step() {
      const w = wordsRef.current;
      if (w.length === 0) return;

      const currentWord = w[wordIndex % w.length];

      if (!erasing) {
        // Typing forward
        if (charIndex < currentWord.length) {
          charIndex++;
          setText(currentWord.slice(0, charIndex));
          setIsTyping(true);
          timer = setTimeout(step, jitter(typeSpeed));
        } else {
          // Finished typing — pause, then erase
          setIsTyping(false);
          timer = setTimeout(() => {
            erasing = true;
            setIsTyping(true);
            step();
          }, pauseAfterType);
        }
      } else {
        // Erasing
        if (charIndex > 0) {
          charIndex--;
          setText(currentWord.slice(0, charIndex));
          timer = setTimeout(step, jitter(eraseSpeed));
        } else {
          // Finished erasing — advance word, pause, then type
          erasing = false;
          wordIndex = (wordIndex + 1) % w.length;
          setIsTyping(false);
          timer = setTimeout(() => {
            step();
          }, pauseAfterErase);
        }
      }
    }

    // Initial delay before starting
    timer = setTimeout(step, pauseAfterErase);

    return () => clearTimeout(timer);
    // Only re-run if the config values change, not on every words array ref
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [words.length, typeSpeed, eraseSpeed, pauseAfterType, pauseAfterErase]);

  return { text, isTyping };
}
