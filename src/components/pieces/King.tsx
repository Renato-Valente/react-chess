
import { useRef } from "react";
import useMovementHandler from "../useMovementHandler";
import useMoves from "../useMoves";
import PieceProps from "../pieceProps";
import black_icon from '../../assets/king.svg';
import white_icon from '../../assets/King-white.svg'

const King = (props: PieceProps) => {


    const {setPawns, setBoard, board, isBlack, blackTurn, setBlackTurn,
         size, xOffset, yOffset, pawnIndex, containerSize, pawns} = props;
    
    const column = useRef(pawns[pawnIndex].x);
    const row = useRef(pawns[pawnIndex].y);
    const pageX = useRef(0);
    const pageY = useRef(0);

    //calculating possible plays
    const {getKingMoves} = useMoves();
    const {plays, attacks} = getKingMoves({board, pawns, pawnIndex});

    const icon = isBlack ? black_icon : white_icon;

    const {touchEnd, touchMove, touchStart} = useMovementHandler({pawns,setPawns,pawnIndex,
        xOffset, yOffset, plays, attacks, setBoard, board, blackTurn, setBlackTurn,
        containerSize, size, column, row, pageX, pageY, isBlack});

    return(
        <div style={{width: size.width, height: size.height}} 
         onTouchMove={touchMove} onTouchEnd={touchEnd} onTouchStart={touchStart} className="pawn">
            <img src={icon} width={size.width} height={size.height} />
         </div>
    )

}

export default King;