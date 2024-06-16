
import { useRef } from "react";
import useMovementHandler from "./useMovementHandler";
import icon from '../assets/king.svg';

interface PieceProps {
    pawns: {x: number, y: number}[],
    setPawns: (value: React.SetStateAction<{x: number, y: number, piece:'Pawn' | 'King'}[]>) => any;
    setBoard: (e: React.SetStateAction<{empty: boolean, playable: Boolean}[]>) => any;
    pawnIndex: number,
    xOffset: number | undefined;
    yOffset: number | undefined;
    containerSize: {width: number, height: number};
    size: {width: number, height: number};
}


const King = (props: PieceProps) => {


    const {setPawns, setBoard, size, xOffset, yOffset, pawnIndex, containerSize, pawns} = props;
    
    const column = useRef(pawns[pawnIndex].x);
    const row = useRef(pawns[pawnIndex].y);
    const pageX = useRef(0);
    const pageY = useRef(0);

    //calculating possible plays
    const pos = pawns[pawnIndex];
    const plays: number[] = [];
    if(pos.y - 1 >= 0) plays.push(pos.x + (pos.y - 1) * 8);
    if(pos.y + 1 < 8) plays.push(pos.x + (pos.y + 1) * 8);
    if(pos.x - 1>= 0) plays.push((pos.x - 1) + pos.y * 8);
    if(pos.x + 1 < 8) plays.push((pos.x + 1) + pos.y * 8);

    if(pos.y - 1 >= 0 && pos.x + 1 < 8) plays.push((pos.x+1) + (pos.y-1)*8);
    if(pos.y - 1 >= 0 && pos.x - 1 >=0) plays.push((pos.x-1) + (pos.y-1)*8);
    if(pos.y + 1 < 8 && pos.x + 1 < 8) plays.push((pos.x +1) + (pos.y+1)*8);
    if(pos.y + 1 < 8 && pos.x - 1 >=0) plays.push((pos.x -1) + (pos.y+1)*8);

    const {touchEnd, touchMove, touchStart} = useMovementHandler({setPawns,pawnIndex,
        xOffset, yOffset, plays:plays, setBoard,
        containerSize, size, column, row, pageX, pageY});

    return(
        <div style={{width: size.width, height: size.height}} 
         onTouchMove={touchMove} onTouchEnd={touchEnd} onTouchStart={touchStart} className="pawn">
            <img src={icon} width={size.width} height={size.height} />
         </div>
    )

}

export default King;