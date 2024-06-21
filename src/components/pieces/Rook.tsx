
import { useRef } from "react";
import useMovementHandler from "../useMovementHandler";
import PieceProps from "../pieceProps";
import black_icon from '../../assets/rook-black.svg';
import white_icon from '../../assets/rook-white.svg'

const Rook = (props: PieceProps) => {


    const {setPawns, setBoard, board, isBlack, blackTurn, setBlackTurn,
         size, xOffset, yOffset, pawnIndex, containerSize, pawns} = props;
    
    const column = useRef(pawns[pawnIndex].x);
    const row = useRef(pawns[pawnIndex].y);
    const pageX = useRef(0);
    const pageY = useRef(0);

    //calculating possible plays
    const pos = pawns[pawnIndex];
    const plays: number[] = [];
    const attacks: number[] = [];

    for(let y = pos.y; y < 7; y++) {
        const index = pos.x + (y+1)*8;
        {plays.push(index)}
        if(!(board[index] && board[index].empty)) break; 
        
    }

    for(let y = pos.y; y > 0; y--) {
        const index = pos.x + (y-1)*8;
        {plays.push(index)}
        if(!(board[index] && board[index].empty)) break; 
    }

    for(let x = pos.x; x < 7; x++) {
        const index = (x+1) + (pos.y)*8;
        {plays.push(index)}
        if(!(board[index] && board[index].empty)) break; 
    }

    for(let x = pos.x; x > 0; x--) {
        const index = (x-1) + (pos.y)*8;
        {plays.push(index)}
        if(!(board[index] && board[index].empty)) break; 
    }

    plays.forEach((item) => {
        if(!board[item].empty) {
            const target = pawns.find((pawn) => (pawn.x + pawn.y * 8) == item);
            if(target && target.isBlack != isBlack) attacks.push(item);
        }
    })

    const icon = isBlack ? black_icon : white_icon;

    const {touchEnd, touchMove, touchStart} = useMovementHandler({setPawns,pawnIndex,
        xOffset, yOffset, plays, attacks, setBoard, blackTurn, setBlackTurn,
        containerSize, size, column, row, pageX, pageY, isBlack});

    return(
        <div style={{width: size.width, height: size.height}} 
         onTouchMove={touchMove} onTouchEnd={touchEnd} onTouchStart={touchStart} className="pawn">
            <img src={icon} width={size.width} height={size.height} />
         </div>
    )

}

export default Rook;