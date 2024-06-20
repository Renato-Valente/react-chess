import { useRef } from "react";
import useMovementHandler from "./useMovementHandler";
import PieceProps from "./pieceProps";


const Pawn = (props: PieceProps) => {


    const {setPawns, setBoard, isBlack, size, xOffset, yOffset,
         pawnIndex, containerSize, pawns, blackTurn, setBlackTurn} = props;
    
    const column = useRef(pawns[pawnIndex].x);
    const row = useRef(pawns[pawnIndex].y);
    const pageX = useRef(0);
    const pageY = useRef(0);
    
    const {touchEnd, touchMove, touchStart} = useMovementHandler({setPawns, pawnIndex,
        xOffset, yOffset, plays: [22,13], attacks:[0,3], setBoard, isBlack, blackTurn, setBlackTurn,
        containerSize, size, column, row, pageX, pageY });

    return(
        <div style={{width: size.width, height: size.height}} 
         onTouchMove={touchMove} onTouchEnd={touchEnd} onTouchStart={touchStart} className="pawn"></div>
    )

}

export default Pawn;