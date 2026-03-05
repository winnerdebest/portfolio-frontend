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

    const timeout = setTimeout(() => {
      if (!isDeleting) {
        if (currentText.length < fullText.length) {
          setCurrentText(fullText.substring(0, currentText.length + 1));
        } else {
          setTimeout(() => setIsDeleting(true), 2000);
        }
      } else {
        if (currentText.length > 0) {
          setCurrentText(fullText.substring(0, currentText.length - 1));
        } else {
          setIsDeleting(false);
          setCurrentIndex((prev) => (prev + 1) % texts.length);
        }
      }
    }, isDeleting ? 50 : 150);

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