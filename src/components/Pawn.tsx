import { useRef, useState } from "react";

interface PawnProps {
    //setPlayer: (value: React.SetStateAction<{x: number, y: number}>) => any;
    pawns: {x: number, y: number}[],
    setPawns: (value: React.SetStateAction<{x: number, y: number}[]>) => any;
    pawnIndex: number,
    xOffset: number | undefined;
    yOffset: number | undefined;
    containerSize: {width: number, height: number},
}


const Pawn = (props: PawnProps) => {
    const size = window.innerWidth > 600 ? {width: 30, height: 30} : {width: 20, height: 20};
    const {setPawns,xOffset, yOffset, pawnIndex, containerSize, pawns} = props;

    const column = useRef(pawns[pawnIndex].x);
    const row = useRef(pawns[pawnIndex].y);
    const pageX = useRef(0);
    const pageY = useRef(0);

    const boxSize = {width: containerSize.width / 8, height: containerSize.height / 8}
    const touchMove = (e: React.TouchEvent<HTMLDivElement>) => {
        
        if(!xOffset || !yOffset) return;

        const newPageX = e.touches[0].pageX;
        const newPageY = e.touches[0].pageY;

        pageX.current = ((newPageX - xOffset) > 0 && (newPageX) < (containerSize.width + xOffset)) ? 
        newPageX : pageX.current;
        pageY.current = ((newPageY - yOffset) > 0 && newPageY < (containerSize.height + yOffset)) ? 
        newPageY : pageY.current; 
        
        const containerX = pageX.current - xOffset;
        const containerY = pageY.current - yOffset;
        //console.log('moving: ', containerX);
        column.current = (Math.floor(containerX / boxSize.width));
        row.current = (Math.floor(containerY / boxSize.height));
        
        e.currentTarget.style.left = `${pageX.current}px`;
        e.currentTarget.style.top = `${pageY.current}px`;
    }

    const touchEnd = (e: React.TouchEvent<HTMLDivElement>) => {
        e.currentTarget.style.position = 'absolute';
        const container_x = column.current * boxSize.width + boxSize.width / 2;
        const container_y = row.current * boxSize.height + boxSize.height / 2;
        //e.currentTarget.style.position = 'static';
        if(!xOffset || !yOffset) return;
        e.currentTarget.style.left = `${container_x + xOffset - size.width / 2}px`;
        e.currentTarget.style.top = `${container_y + yOffset - size.height / 2}px`;

        setPawns((prev) => {
            let result = [...prev];
            result[pawnIndex] = {x: column.current, y: row.current};
            return result;
        })
    }

    console.log('pawn render ', window.innerWidth);
    return(
        <div style={{width: size.width, height: size.height}} 
         onTouchMove={touchMove} onTouchEnd={touchEnd} className="pawn"></div>
    )

}

export default Pawn;