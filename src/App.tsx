import {useEffect, useRef, useState } from 'react'
import './App.css'
import Pawn from './components/Pawn';
import Teste from './components/Teste';
import King from './components/King';

function App() {

  const [board, setBoard] = useState(
    [
    {empty:true},{empty:true},{empty:false},{empty:true},{empty:true},{empty:true},{empty:true},{empty:true},
    {empty:true},{empty:true},{empty:false},{empty:true},{empty:true},{empty:true},{empty:true},{empty:true},
    {empty:true},{empty:true},{empty:true},{empty:true},{empty:true},{empty:true},{empty:true},{empty:true},
    {empty:true},{empty:true},{empty:true},{empty:true},{empty:true},{empty:true},{empty:true},{empty:true},
    {empty:true},{empty:true},{empty:true},{empty:true},{empty:true},{empty:true},{empty:true},{empty:true},
    {empty:true},{empty:true},{empty:true},{empty:true},{empty:true},{empty:true},{empty:true},{empty:true},
    {empty:true},{empty:true},{empty:true},{empty:true},{empty:true},{empty:true},{empty:true},{empty:true},
    {empty:true},{empty:true},{empty:true},{empty:true},{empty:true},{empty:true},{empty:true},{empty:true}
  ])

  const ref = useRef<HTMLDivElement>(null);

  const [pawns, setPawns] = useState<{x: number, y: number, piece: 'Pawn' | 'King'}[]>([
    {x: 0, y: 6, piece: 'Pawn'},
    {x: 7, y: 6, piece: 'King'}
  ])

  const [screenSize, setScreenSize] = useState({width: window.innerWidth, height: window.innerHeight});
  const [containerSize, setContainerSize] = useState({
    width: 400, height: 400
  })

  useEffect(() => {

    setScreenSize({width: window.innerWidth, height: window.innerHeight});

    window.addEventListener('resize', () => {
      console.log('resize');
      setScreenSize({width: window.innerWidth, height: window.innerHeight})
    })
  }, [])

  useEffect(() => {
    console.log('App render ', pawns);

    setBoard((prev) => {
      
      let result = prev.map(value => ({...value, empty:true}))

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

  interface PieceProps {
    pawns: {x: number, y: number}[],
    setPawns: (value: React.SetStateAction<{x: number, y: number, piece: 'Pawn' | 'King'}[]>) => any;
    pawnIndex: number,
    xOffset: number | undefined;
    yOffset: number | undefined;
    containerSize: {width: number, height: number},
}

  const piecesMap : {[Key in 'Pawn' | 'King']: React.ComponentType<PieceProps>} = {
    'Pawn': Pawn,
    'King': King
  }

  return (
    <>
      <div style={{
        width: containerSize.width,
        height: containerSize.height
      }} ref={ref} className="container">
        {board.map((item, index) => {
          const row = Math.floor(index / 8);
          const column = index % 8;
          const color = (column + row)  % 2 == 0 ? 'white' : 'yellowgreen';
          const xOffset = containerSize.width ? (screenSize.width / 2) - (containerSize.width / 2) : undefined;
          const yOffset = containerSize.height ? (screenSize.height / 2) - (containerSize.height / 2) : undefined;
          return(
            <div key={index} onTouchStart={() => {
            }} style={{
              backgroundColor: item.empty ? color : 'red'

            }} className="box">

              {pawns.map((_pawn, _index) => {
                const Component = piecesMap[_pawn.piece];
                return (_pawn.x + _pawn.y * 8 == index ? <Component pawns={pawns} key={_index} xOffset={xOffset}
                   yOffset={yOffset} setPawns={setPawns} pawnIndex={_index} containerSize={containerSize} /> : '')
              })}
            </div>
          )
        })}
      </div>
    </>
  )
}

export default App
