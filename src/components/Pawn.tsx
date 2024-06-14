import { useRef } from "react";
import useMovementHandler from "./useMovementHandler";

interface PawnProps {
    pawns: {x: number, y: number}[],
    setPawns: (value: React.SetStateAction<{x: number, y: number}[]>) => any;
    pawnIndex: number,
    xOffset: number | undefined;
    yOffset: number | undefined;
    containerSize: {width: number, height: number},
}


const Pawn = (props: PawnProps) => {


    const {setPawns,xOffset, yOffset, pawnIndex, containerSize, pawns} = props;
    
    const column = useRef(pawns[pawnIndex].x);
    const row = useRef(pawns[pawnIndex].y);
    const pageX = useRef(0);
    const pageY = useRef(0);

    const size = window.innerWidth > 600 ? {width: 30, height: 30} : {width: 20, height: 20};
    
    const {touchEnd, touchMove} = useMovementHandler({setPawns: setPawns, pawnIndex: pawnIndex,
        xOffset: xOffset, yOffset: yOffset,
        containerSize: containerSize, size: size, column: column, row: row, pageX: pageX, pageY: pageY });

    console.log('pawn render ', window.innerWidth);
    return(
        <div style={{width: size.width, height: size.height}} 
         onTouchMove={touchMove} onTouchEnd={touchEnd} className="pawn"></div>
    )

}

export default Pawn;