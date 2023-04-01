import React, { useState, useEffect } from "react";
import Tile from "./Tile";

export type TileData = {
  id: number;
  image: string;
  flipped: boolean;
};

const Board: React.FC = () => {
  const [tiles, setTiles] = useState<TileData[]>([]);
  const [flippedTiles, setFlippedTiles] = useState<TileData[]>([]);
  const [matchedTiles, setMatchedTiles] = useState<number[]>([]);
  const [moves, setMoves] = useState<number>(0);

  const urlPath =
    window.location.pathname.length > 1 ? window.location.pathname : "";

  const generateTiles = () => {
    let images = [
      "jana.png",
      "steven.png",
      "emily.png",
      "ondrej.jpg",
      "filipe.jpg",
      "dejan.jpg",
      "corstian.jpg",
      "george.jpg",
      "luca.jpeg",
      "marina.jpg",
      "barry.jpg",
      "tom.jpg",
      "peter.jpg",
      "victoria.jfif",
      "rick.jfif",
    ];
    images = [...images, ...images];
    images = images.map((i) => urlPath + "/images/" + i);

    const shuffledImages = shuffle(images);
    const newTiles = shuffledImages.map((image, index) => ({
      id: index,
      image: image,
      flipped: false,
    }));
    setTiles(newTiles);
  };

  const shuffle = (array: any[]) => {
    const shuffledArray = [...array];
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [
        shuffledArray[j],
        shuffledArray[i],
      ];
    }
    return shuffledArray;
  };

  const handleTileClick = (tile: TileData) => {
    if (!tile.flipped && flippedTiles.length < 2) {
      setFlippedTiles([...flippedTiles, tile]);
      setTiles(
        tiles.map((t) => {
          if (t.id === tile.id) {
            return { ...t, flipped: true };
          }
          return t;
        })
      );
    }
  };

  useEffect(() => {
    generateTiles();
  }, []);

  const reset = () => {
    location.reload();
  };

  useEffect(() => {
    const [tile1, tile2] = flippedTiles;
    if (flippedTiles.length === 2) {
      setMoves(moves + 1);
      if (tile1.image === tile2.image) {
        setMatchedTiles([...matchedTiles, tile1.id, tile2.id]);
        setFlippedTiles([]);
      } else {
        setTimeout(() => {
          setTiles(
            tiles.map((t) => {
              if (t.id === tile1.id || t.id === tile2.id) {
                return { ...t, flipped: false };
              }
              return t;
            })
          );
          setFlippedTiles([]);
        }, 1000);
      }
    }
  }, [flippedTiles]);

  console.log(tiles);
  const finished = tiles.every((tile) => tile.flipped);
  console.log(finished);

  return (
    <>
      {finished ? (
        <div className="congrats">
          You finished the game in {moves} moves! Can you beat that score?&nbsp;&nbsp;
          <button onClick={reset}>Shuffle tiles</button>
        </div>
      ) : (
        <div className="moves">Moves: {moves}</div>
      )}
      <div className="board">
        {tiles.map((tile) => (
          <Tile
            key={tile.id}
            id={tile.id}
            image={tile.image}
            flipped={tile.flipped}
            handleTileClick={handleTileClick}
            disabled={matchedTiles.includes(tile.id)}
          />
        ))}
      </div>
    </>
  );
};

export default Board;
