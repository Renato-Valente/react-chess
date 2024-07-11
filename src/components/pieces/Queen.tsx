
import { useEffect, useRef } from "react";
import useMovementHandler from "../useMovementHandler";
import PieceProps from "../pieceProps";
import black_icon from '../../assets/queen-black.svg';
import white_icon from '../../assets/queen-white.svg';
import useMoves from "../useMoves";

const Queen = (props: PieceProps) => {

    const {setPawns, setBoard, board, isBlack, blackTurn, setBlackTurn,
         size, xOffset, yOffset, pawnIndex, containerSize, setMarked, pawns} = props;
    
    const column = useRef(pawns[pawnIndex].x);
    const row = useRef(pawns[pawnIndex].y);
    const pageX = useRef(0);
    const pageY = useRef(0);

    //calculating possible plays
    const {getDiagonalMoves, getHorintalMoves} = useMoves();
    const diagonals = getDiagonalMoves({board, pawns, pawnIndex});
    const horizontals = getHorintalMoves({board, pawns, pawnIndex});

    const plays = [...diagonals.plays, ...horizontals.plays];
    const attacks = [...diagonals.attacks, ...horizontals.attacks];

    const icon = isBlack ? black_icon : white_icon;

    const {touchEnd, touchMove, touchStart} = useMovementHandler({pawns,setPawns,pawnIndex,
        xOffset, yOffset, plays, attacks, setBoard, board, blackTurn, setBlackTurn,
        containerSize, size, column, row, pageX, pageY, isBlack, setMarked});
        const ref = useRef<HTMLDivElement>(null);

        useEffect(() => {
            if(!ref.current || !xOffset || !yOffset) return;
            const pawn = pawns[pawnIndex];
            column.current = pawn.x;
            row.current = pawn.y;
            ref.current.style.left = `${pawn.x * size.width + xOffset}px`;
            ref.current.style.top = `${pawn.y * size.height + yOffset}px`;
        }, [pawns]);

        if(!xOffset || !yOffset) return;
        return(
            <div ref={ref} style={{
                position: 'absolute',
                left: `${column.current * size.width + xOffset}px`,
                top: `${row.current * size.height + yOffset}px`,
                width: size.width, height: size.height,
            }}
            onPointerDown={touchStart} onMouseMove={touchMove} onMouseUp={touchEnd} onPointerLeave={touchEnd}
             onTouchMove={touchMove} onTouchEnd={touchEnd} onTouchStart={touchStart} className="pawn">
                <img draggable={false} src={icon} width={size.width} height={size.height} />
             </div>
        )
}

export default Queen;