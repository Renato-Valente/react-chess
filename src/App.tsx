import {useEffect, useRef, useState } from 'react'
import './App.css'
import Pawn from './components/pieces/Pawn';
import King from './components/pieces/King';
import Knight from './components/pieces/Knight';
import Rook from './components/pieces/Rook';
import Bishop from './components/pieces/Bishop';

import PieceProps from './components/pieceProps';
import pieceTypes from './components/pieceTypes';
import Queen from './components/pieces/Queen';

function App() {

  const initialBoard: {empty: boolean, playable: Boolean, attack: Boolean}[] = [];
  for(let i = 0; i < 64; i++){
    initialBoard.push({empty: true, playable: false, attack: false})
  }

  const [board, setBoard] = useState([...initialBoard]);
  const [blackTurn, setBlackTurn] = useState<Boolean>(false);

  const ref = useRef<HTMLDivElement>(null);

  const [pawns, setPawns] = useState<{x: number, y: number, piece: pieceTypes, isBlack: Boolean}[]>([
    {x: 0, y: 0, piece: 'Rook', isBlack: true},
    {x: 7, y: 0, piece: 'Rook', isBlack: true},
    {x: 1, y: 0, piece: 'Knight', isBlack: true},
    {x: 6, y: 0, piece: 'Knight', isBlack: true},
    {x: 2, y: 0, piece: 'Bishop', isBlack: true},
    {x: 5, y: 0, piece: 'Bishop', isBlack: true},
    {x: 3, y: 0, piece: 'Queen', isBlack: true},
    {x: 4, y: 0, piece: 'King', isBlack: true},
    {x: 0, y: 1, piece: 'Pawn', isBlack: true},
    {x: 1, y: 1, piece: 'Pawn', isBlack: true},
    {x: 2, y: 1, piece: 'Pawn', isBlack: true},
    {x: 3, y: 1, piece: 'Pawn', isBlack: true},
    {x: 4, y: 1, piece: 'Pawn', isBlack: true},
    {x: 5, y: 1, piece: 'Pawn', isBlack: true},
    {x: 6, y: 1, piece: 'Pawn', isBlack: true},
    {x: 7, y: 1, piece: 'Pawn', isBlack: true},

    {x: 0, y: 7, piece: 'Rook', isBlack: false},
    {x: 7, y: 7, piece: 'Rook', isBlack: false},
    {x: 1, y: 7, piece: 'Knight', isBlack: false},
    {x: 6, y: 7, piece: 'Knight', isBlack: false},
    {x: 2, y: 7, piece: 'Bishop', isBlack: false},
    {x: 5, y: 7, piece: 'Bishop', isBlack: false},
    {x: 3, y: 7, piece: 'Queen', isBlack: false},
    {x: 4, y: 7, piece: 'King', isBlack: false},
    {x: 0, y: 6, piece: 'Pawn', isBlack: false},
    {x: 1, y: 6, piece: 'Pawn', isBlack: false},
    {x: 2, y: 6, piece: 'Pawn', isBlack: false},
    {x: 3, y: 6, piece: 'Pawn', isBlack: false},
    {x: 4, y: 6, piece: 'Pawn', isBlack: false},
    {x: 5, y: 6, piece: 'Pawn', isBlack: false},
    {x: 6, y: 6, piece: 'Pawn', isBlack: false},
    {x: 7, y: 6, piece: 'Pawn', isBlack: false}
    
  ])

  const [screenSize, setScreenSize] = useState({width: window.innerWidth, height: window.innerHeight});
  const [containerSize] = useState({
    width: 300, height: 300
  })

  useEffect(() => {

    setScreenSize({width: window.innerWidth, height: window.innerHeight});

    window.addEventListener('resize', () => {
      console.log('resize');
      setScreenSize({width: window.innerWidth, height: window.innerHeight})
    })
  }, [])

  useEffect(() => {

    setBoard((prev) => {
      
      let result = prev.map(value => ({...value, empty:true, playable: value.playable}))

      pawns.forEach((value) => {
        const boardIndex = value.x + value.y * 8;
        result[boardIndex].empty = false;
      });

      let hasChanged = false;

      prev.forEach((value, index) => {
        if(value.empty != result[index].empty) {hasChanged = true}
      })

      //to avoid re-render
      return hasChanged ? result : prev;
    })

    console.log('pieces: ', pawns);

  })

  const piecesMap : {[Key in pieceTypes]: React.ComponentType<PieceProps>} = {
    'Pawn': Pawn,
    'King': King,
    'Knight': Knight,
    'Rook': Rook,
    'Bishop': Bishop,
    'Queen': Queen
  }

  const size = {width: containerSize.width / 8, height: containerSize.height / 8};

  return (
    <>
      <div style={{
        width: containerSize.width,
        height: containerSize.height
      }} ref={ref} className="container">
        {board.map((item, index) => {
          const row = Math.floor(index / 8);
          const column = index % 8;
          let color = (column + row)  % 2 == 0 ? '#FCF55F' : '#722F37';
          const xOffset = containerSize.width ? (screenSize.width / 2) - (containerSize.width / 2) : undefined;
          const yOffset = containerSize.height ? (screenSize.height / 2) - (containerSize.height / 2) : undefined;
          return(
            <div key={index} onTouchStart={() => {
            }} style={{
              backgroundColor: color

            }} className="box">
              
            <div style = {{
              width: '100%', height:'100%',backgroundColor: item.attack ? 'rgba(200,80,55,1)' : 'rgba(55,80,130,0.8)',
              display: item.playable ? 'flex' : 'none'
            }}></div>

              {pawns.map((_pawn, _index) => {
                const Component = piecesMap[_pawn.piece];
                return (_pawn.x + _pawn.y * 8 == index ? <Component size={size} pawns={pawns} key={_index} xOffset={xOffset}
                   yOffset={yOffset} isBlack={_pawn.isBlack} setPawns={setPawns} setBoard={setBoard} board={board}
                   pawnIndex={_index} containerSize={containerSize} blackTurn={blackTurn} setBlackTurn={setBlackTurn} /> : '')
              })}
            </div>
          )
        })}
      </div>
    </>
  )
}

export default App
