import {useEffect, useRef, useState } from 'react'
import './App.css'
import Pawn from './components/Pawn';
import Teste from './components/Teste';

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

  const [pawns, setPawns] = useState([
    {x: 0, y: 6},
    {x: 7, y: 6}
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

      return hasChanged ? result : prev;
    })

  })

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
                return (_pawn.x + _pawn.y * 8 == index ? <Pawn pawns={pawns} key={_index} xOffset={xOffset}
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
