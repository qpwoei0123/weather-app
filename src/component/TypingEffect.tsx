import { useState, useEffect } from "react";

export const TypingEffect = ({
  text,
  onComplete,
}: {
  text: string;
  onComplete: () => void;
}) => {
  const [displayedText, setDisplayedText] = useState("");
  const [count, setCount] = useState(0);

  useEffect(() => {
    setDisplayedText("");
    setCount(0);
  }, [text]);

  useEffect(() => {
    if (count < text.length) {
      const typingTimeout = setTimeout(() => {
        setDisplayedText((prevText) => prevText + text[count]);
        setCount((prevCount) => prevCount + 1);
      }, 100);

      return () => {
        clearTimeout(typingTimeout);
      };
    } else {
      onComplete();
    }
  }, [count, text, onComplete]);

  return <h1 className="main-title">{displayedText}</h1>;
};
