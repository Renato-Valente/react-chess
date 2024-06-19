import { useRef } from "react";

interface prospType {
    setPawns: (e: React.SetStateAction<{x: number, y: number, piece: 'Pawn' | 'King', isBlack: Boolean}[]>) => any;
    setBoard: (e: React.SetStateAction<{empty: boolean, playable: Boolean}[]>) => any;
    pawnIndex: number;
    xOffset: number | undefined;
    yOffset: number | undefined;
    containerSize: {width: number, height: number};
    size: {width: number, height: number};
    column: React.MutableRefObject<number>;
    row: React.MutableRefObject<number>;
    pageX: React.MutableRefObject<number>;
    pageY: React.MutableRefObject<number>;
    plays: number[];
    isBlack: Boolean;
    blackTurn: Boolean;
    setBlackTurn: (value: React.SetStateAction<Boolean>) => any;
}

const useMovementHandler = (props: prospType) => {

    const {setPawns, setBoard, isBlack, plays, pawnIndex, xOffset, yOffset, 
        containerSize, size, column, row, pageX, pageY, blackTurn, setBlackTurn} = props;
    const boxSize = {width: containerSize.width / 8, height: containerSize.height / 8}
    const startPosition = useRef({column: 0, row: 0});

    const touchEnd = (e: React.TouchEvent<HTMLDivElement>) => {

        if(isBlack != blackTurn) return;

        setBoard((prev) => {
            let result = [...prev];
            console.log(isBlack ? 'Black' : 'White');
            
            if(!prev[column.current + row.current * 8].playable) {
                console.log('not possible!');
                console.log(' ');
                row.current = startPosition.current.row;
                column.current = startPosition.current.column;
            }

            plays.forEach((item) => {
                result[item].playable = false;
            })

            return result;
        })
        e.currentTarget.style.position = 'absolute';
        const container_x = column.current * boxSize.width + boxSize.width / 2;
        const container_y = row.current * boxSize.height + boxSize.height / 2;
        //e.currentTarget.style.position = 'static';
        if(!xOffset || !yOffset) return;
        e.currentTarget.style.left = `${container_x + xOffset - size.width / 2}px`;
        e.currentTarget.style.top = `${container_y + yOffset - size.height / 2}px`;

        setPawns((prev) => {
            let result = [...prev];
            result[pawnIndex] = {x: column.current, y: row.current,
                piece: result[pawnIndex].piece, isBlack: result[pawnIndex].isBlack};
            return result;
        })
          
        setBlackTurn((prev) => {
            const changed = !(column.current == startPosition.current.column && 
                row.current == startPosition.current.row)
            return changed ? !prev : prev;
         });
        

    }

    const touchStart = () => {
        
        if(isBlack != blackTurn) return;

        startPosition.current = {column: column.current, row: row.current}; 
        console.log(`touchStart: ${startPosition.current.row} ${startPosition.current.column}`);
        setBoard((prev) => {
            let result = [...prev];
            plays.forEach((item) => {
                result[item].playable = true;
            })

            return result;
        })
    }

    const touchMove = (e: React.TouchEvent<HTMLDivElement>) => {
        
        if(!xOffset || !yOffset || (isBlack != blackTurn)) return;

        const newPageX = e.touches[0].pageX;
        const newPageY = e.touches[0].pageY;

        pageX.current = ((newPageX - xOffset) > 0 && (newPageX) < (containerSize.width + xOffset)) ? 
        newPageX : pageX.current;
        pageY.current = ((newPageY - yOffset) > 0 && newPageY < (containerSize.height + yOffset)) ? 
        newPageY : pageY.current; 
        
        const containerX = pageX.current - xOffset;
        const containerY = pageY.current - yOffset;

        column.current = (Math.floor(containerX / boxSize.width));
        row.current = (Math.floor(containerY / boxSize.height));
        
        e.currentTarget.style.left = `${pageX.current}px`;
        e.currentTarget.style.top = `${pageY.current}px`;
    }

    return {touchMove ,touchEnd, touchStart}

}


export default useMovementHandler;