import React from 'react';
import SmallCard from './Card';
import ChemImg from '../../assets/atom.png'

const GridContainer = ({data}) => {

    const generateSmallCards = (rowCount, columnCount) => {
        const cards = [];
        for (let i = 0; i < rowCount; i++) {
          for (let j = 0; j < columnCount; j++) {
            cards.push(<SmallCard imageSrc={ChemImg} text={"Atom Structure"} key={`${i}-${j}`} />);
          }
        }
        return cards;
      };

  return (
        <div className="grid grid-cols-4 gap-4 h-auto flex-shrink-0 p-5 w-full rounded-xl bg-app-background-2 shadow-grid_shadow">
             {generateSmallCards(4, 7)}
      </div>
  );
};

export default GridContainer;
