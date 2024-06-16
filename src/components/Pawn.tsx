import { useRef } from "react";
import useMovementHandler from "./useMovementHandler";

interface PieceProps {
    pawns: {x: number, y: number}[],
    setPawns: (value: React.SetStateAction<{x: number, y: number, piece: 'Pawn' | 'King'}[]>) => any;
    setBoard: (e: React.SetStateAction<{empty: boolean, playable: Boolean}[]>) => any;
    pawnIndex: number,
    xOffset: number | undefined;
    yOffset: number | undefined;
    containerSize: {width: number, height: number};
    size: {width: number, height: number};
}


const Pawn = (props: PieceProps) => {


    const {setPawns, setBoard, size, xOffset, yOffset, pawnIndex, containerSize, pawns} = props;
    
    const column = useRef(pawns[pawnIndex].x);
    const row = useRef(pawns[pawnIndex].y);
    const pageX = useRef(0);
    const pageY = useRef(0);
    
    const {touchEnd, touchMove, touchStart} = useMovementHandler({setPawns: setPawns, pawnIndex: pawnIndex,
        xOffset: xOffset, yOffset: yOffset, plays: [22,13], setBoard,
        containerSize: containerSize, size: size, column: column, row: row, pageX: pageX, pageY: pageY });

    return(
        <div style={{width: size.width, height: size.height}} 
         onTouchMove={touchMove} onTouchEnd={touchEnd} onTouchStart={touchStart} className="pawn"></div>
    )

}

export default Pawn;