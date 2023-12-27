"use client";
// pages/index.tsx
import { useEffect, useState } from "react";

interface CursorPosition {
  x: number;
  y: number;
}

const Cursor: React.FC = () => {
  const [cursorPosition, setCursorPosition] = useState<CursorPosition>({
    x: 0,
    y: 0,
  });

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      const { clientX, clientY } = event;
      setCursorPosition({ x: clientX, y: clientY });
    };

    document.addEventListener("mousemove", handleMouseMove);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div
      className="fixed w-20 h-20 shadow-xl rounded-full pointer-none z-10
      transform -translate-x-1/2 -translate-y-1/2 backdrop-blur-sm"
      style={{
        left: `${cursorPosition.x}px`,
        top: `${cursorPosition.y}px`,
        cursor: "none",
      }}
    ></div>
  );
};

export default Cursor;
