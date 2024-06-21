
import { useRef } from "react";
import useMovementHandler from "../useMovementHandler";
import PieceProps from "../pieceProps";
import black_icon from '../../assets/bishop-black.svg';
import white_icon from '../../assets/bishop-white.svg';

const Bishop = (props: PieceProps) => {

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

    for(let x = pos.x, y = pos.y; x < 7 && y < 7; x++,y++){
        const index = (x+1) + (y+1)*8;
        if(board[index]) plays.push(index);
        if(!board[index] || !board[index].empty) break;
    }

    for(let x = pos.x, y = pos.y; x > 0 && y > 0; x--,y--){
        const index = (x-1) + (y-1)*8;
        if(board[index]) plays.push(index);
        if(!board[index] || !board[index].empty) break;
    }

    for(let x = pos.x, y = pos.y; x > 0 && y < 7; x--,y++){
        const index = (x-1) + (y+1)*8;
        if(board[index]) plays.push(index);
        if(!board[index] || !board[index].empty) break;
    }

    for(let x = pos.x, y = pos.y; x < 7 && y > 0; x++,y--){
        const index = (x+1) + (y-1)*8;
        if(board[index]) plays.push(index);
        if(!board[index] || !board[index].empty) break;
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

export default Bishop;