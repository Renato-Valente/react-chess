
import { useRef } from "react";
import useMovementHandler from "../useMovementHandler";
import useMoves from "../useMoves";
import PieceProps from "../pieceProps";
import black_icon from '../../assets/pawn-black.svg';
import white_icon from '../../assets/pawn-white.svg';

const Pawn = (props: PieceProps) => {

    const {setPawns, setBoard, board, isBlack, blackTurn, setBlackTurn,
         size, xOffset, yOffset, pawnIndex, containerSize, pawns, setMarked} = props;
    
    const column = useRef(pawns[pawnIndex].x);
    const row = useRef(pawns[pawnIndex].y);
    const pageX = useRef(0);
    const pageY = useRef(0);

    //calculating possible plays
    const {getPawnMoves} = useMoves();
    const {plays, attacks} = getPawnMoves({board, pawns, pawnIndex})

    const icon = isBlack ? black_icon : white_icon;
    
    const {touchEnd, touchMove, touchStart} = useMovementHandler({pawns,setPawns,pawnIndex,
        xOffset, yOffset, plays, attacks, setBoard,board, blackTurn, setBlackTurn,
        containerSize, size, column, row, pageX, pageY, isBlack, setMarked});

    return(
        <div style={{width: size.width, height: size.height}} 
         onPointerDown={touchStart} onMouseMove={touchMove} onMouseUp={touchEnd} onPointerLeave={touchEnd}
         onTouchMove={touchMove} onTouchEnd={touchEnd} onTouchStart={touchStart} className="pawn">
            <img draggable={false} src={icon} width={size.width} height={size.height} />
         </div>
    )
}

export default Pawn;