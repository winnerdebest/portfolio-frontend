"use client";

import React, { useState, useEffect } from 'react';

interface TypeWriterProps {
  texts: string[];
}

const TypeWriter: React.FC<TypeWriterProps> = ({ texts }) => {
  const [currentText, setCurrentText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (!texts || texts.length === 0) return;

    const fullText = texts[currentIndex];

    // Determine the delay based on the current state
    let delay = isDeleting ? 50 : 100;
    if (!isDeleting && currentText === fullText) {
      delay = 2000; // Pause at the end of the word
    } else if (isDeleting && currentText === '') {
      delay = 500; // Pause before typing the next word
    }

    const timeout = setTimeout(() => {
      if (!isDeleting && currentText !== fullText) {
        setCurrentText(fullText.substring(0, currentText.length + 1));
      } else if (isDeleting && currentText !== '') {
        setCurrentText(fullText.substring(0, currentText.length - 1));
      } else if (!isDeleting && currentText === fullText) {
        setIsDeleting(true);
      } else if (isDeleting && currentText === '') {
        setIsDeleting(false);
        setCurrentIndex((prev) => (prev + 1) % texts.length);
      }
    }, delay);

    return () => clearTimeout(timeout);
  }, [currentText, isDeleting, currentIndex, texts]);

  return (
    <span>
      {currentText}
      <span
        className="cursor-blink inline-block ml-0.5"
        style={{
          width: '3px',
          height: '1em',
          background: '#E8651A',
          verticalAlign: 'text-bottom',
        }}
      />
    </span>
  );
};

export default TypeWriter;