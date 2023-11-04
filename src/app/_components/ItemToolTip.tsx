// components/ItemTooltip.tsx
import React from 'react';

type Props = {
  itemStats: string;
  mouseX: number;
  mouseY: number;
};

const ItemTooltip: React.FC<Props> = ({ itemStats, mouseX, mouseY }) => {
  return (
    <div
      className="absolute p-2 bg-white border shadow-lg"
      style={{ top: mouseY, left: mouseX }}
    >
      {itemStats}
    </div>
  );
};

export default ItemTooltip;
