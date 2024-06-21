
import { useRef } from "react";
import useMovementHandler from "../useMovementHandler";
import PieceProps from "../pieceProps";
import black_icon from '../../assets/pawn-black.svg';
import white_icon from '../../assets/pawn-white.svg';

const Pawn = (props: PieceProps) => {

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
    const startRow = isBlack ? 1 : 6;
    const limit = pos.y == startRow ? 2 : 1;
    const direction = isBlack ? 1 : -1;
        
    for(let gap = 1; gap <= limit; gap++) {
        const index = pos.x + (pos.y + (gap*direction))*8;
        if(!board[index] || !board[index].empty) break;
        plays.push(index);
    }

    const indices = [(pos.x+1) + (pos.y + (direction))*8, (pos.x-1) + (pos.y + (direction))*8];

    indices.forEach((item) => {
        if(board[item] && !board[item].empty) plays.push(item);

    })
    

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

export default Pawn;