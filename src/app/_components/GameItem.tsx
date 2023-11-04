'use client'

// components/GameItem.tsx
import React, { useState } from 'react';
import ItemTooltip from './ItemToolTip';

type Props = {
  src: string;
  alt: string;
  itemStats: string;
};

const GameItem: React.FC<Props> = ({ src, alt, itemStats }) => {
  const [showTooltip, setShowTooltip] = useState(false);
  const [mouseX, setMouseX] = useState(0);
  const [mouseY, setMouseY] = useState(0);

  const handleMouseEnter = () => setShowTooltip(true);
  const handleMouseLeave = () => setShowTooltip(false);
  const handleMouseMove = (e: React.MouseEvent) => {
    setMouseX(e.clientX + 10); // 10px offset for cursor
    setMouseY(e.clientY + 10);
  };

  return (
    <div className="relative">
      <img
        src={src}
        alt={alt}
        className="cursor-pointer"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onMouseMove={handleMouseMove}
      />
      {showTooltip && (
        <ItemTooltip itemStats={itemStats} mouseX={mouseX} mouseY={mouseY} />
      )}
    </div>
  );
};

export default GameItem;
