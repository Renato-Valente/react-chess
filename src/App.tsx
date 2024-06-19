import {useEffect, useRef, useState } from 'react'
import './App.css'
import Pawn from './components/Pawn';
import King from './components/King';
import PieceProps from './components/pieceProps';

function App() {

  const initialBoard: {empty: boolean, playable: Boolean}[] = [];
  for(let i = 0; i < 64; i++){
    initialBoard.push({empty: true, playable: false})
  }

  const [board, setBoard] = useState([...initialBoard]);
  const [blackTurn, setBlackTurn] = useState<Boolean>(false);

  const ref = useRef<HTMLDivElement>(null);

  const [pawns, setPawns] = useState<{x: number, y: number, piece: 'Pawn' | 'King', isBlack: Boolean}[]>([
    {x: 3, y: 6, piece: 'King', isBlack: true},
    {x: 4, y: 6, piece: 'King', isBlack: true},
    {x: 3, y: 1, piece: 'King', isBlack: false},
    {x: 4, y: 1, piece: 'King', isBlack: false}
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

  })

  const piecesMap : {[Key in 'Pawn' | 'King']: React.ComponentType<PieceProps>} = {
    'Pawn': Pawn,
    'King': King
  }

  const size = window.innerWidth > 600 ? {width: 50, height: 50} : {width: 40, height: 40};

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
          color = item.playable ? 'limegreen' : color;
          const xOffset = containerSize.width ? (screenSize.width / 2) - (containerSize.width / 2) : undefined;
          const yOffset = containerSize.height ? (screenSize.height / 2) - (containerSize.height / 2) : undefined;
          return(
            <div key={index} onTouchStart={() => {
            }} style={{
              backgroundColor: item.empty ? color : color

            }} className="box">

              {pawns.map((_pawn, _index) => {
                const Component = piecesMap[_pawn.piece];
                return (_pawn.x + _pawn.y * 8 == index ? <Component size={size} pawns={pawns} key={_index} xOffset={xOffset}
                   yOffset={yOffset} isBlack={_pawn.isBlack} setPawns={setPawns} setBoard={setBoard}
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
