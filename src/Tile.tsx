import React from 'react';
import { TileData } from './Board';

type Props = {
  id: number;
  image: string;
  flipped: boolean;
  handleTileClick: (tile: TileData) => void;
  disabled: boolean;
};

const Tile: React.FC<Props> = ({ id, image, flipped, handleTileClick, disabled }) => {
  const handleClick = () => {
    if (!disabled) {
      handleTileClick({ id, image, flipped });
    }
  };

  return (
    <div className={`tile ${flipped ? 'flipped' : ''}`} onClick={handleClick}>
      <div className="tile-inner">
        <div className="tile-front" />
        <div className="tile-back">
          <img src={image} alt="" />
        </div>
      </div>
    </div>
  );
};

export default Tile;