
import { useRef } from "react";
import useMovementHandler from "../useMovementHandler";
import useMoves from "../useMoves";
import PieceProps from "../pieceProps";
import black_icon from '../../assets/knight-black.svg';
import white_icon from '../../assets/knight-white.svg'

const Knight = (props: PieceProps) => {


    const {setPawns, setBoard, board, isBlack, blackTurn, setBlackTurn,
         size, xOffset, yOffset, pawnIndex, containerSize, pawns} = props;
    
    const column = useRef(pawns[pawnIndex].x);
    const row = useRef(pawns[pawnIndex].y);
    const pageX = useRef(0);
    const pageY = useRef(0);

    //calculating possible plays
    const {getLShapeMoves} = useMoves();
    const result = getLShapeMoves({board, pawns, pawnIndex});
    const {plays, attacks} = result;

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

export default Knight;