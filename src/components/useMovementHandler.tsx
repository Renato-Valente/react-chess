import { useRef } from "react";
import pieceTypes from "./pieceTypes";

interface prospType {
    setPawns: (e: React.SetStateAction<{x: number, y: number, piece: pieceTypes,
    isBlack: Boolean}[]>) => any;
    setBoard: (e: React.SetStateAction<{empty: boolean, playable: Boolean, attack: Boolean}[]>) => any;
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
    attacks: number[];
    isBlack: Boolean;
    blackTurn: Boolean;
    setBlackTurn: (value: React.SetStateAction<Boolean>) => any;
}

const useMovementHandler = (props: prospType) => {

    const {setPawns, setBoard, isBlack, plays, pawnIndex, xOffset, yOffset, attacks,
        containerSize, size, column, row, pageX, pageY, blackTurn, setBlackTurn} = props;
    const boxSize = {width: containerSize.width / 8, height: containerSize.height / 8}
    const startPosition = useRef({column: 0, row: 0});

    const touchStart = (e: React.TouchEvent<HTMLDivElement>) => {
        if(isBlack != blackTurn) return;
        e.currentTarget.style.zIndex = '999';

        startPosition.current = {column: column.current, row: row.current}; 
        console.log(`touchStart: ${startPosition.current.row} ${startPosition.current.column}`);
        setBoard((prev) => {
            let result = [...prev];
            plays.forEach((item) => {
                result[item].playable = true;
            })
            attacks.forEach((item) => {
                result[item].attack = true;
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

    const touchEnd = (e: React.TouchEvent<HTMLDivElement>) => {

        if(isBlack != blackTurn) return;
        e.currentTarget.style.zIndex = '0';
        //to check if the piece to be deleted (in case of attack) 
        //has index bigger than the current piece
        let isLess = false;

        setBoard((prev) => {
            let result = [...prev];
            console.log(isBlack ? 'Black' : 'White');
            
            const boardIndex = column.current + row.current * 8;
            if(!result[boardIndex].playable) {
                console.log('not possible!');
                console.log(' ');
                row.current = startPosition.current.row;
                column.current = startPosition.current.column;
            }
            else{
                if(!result[boardIndex].empty) {
                    if(result[boardIndex].attack) {
                        console.log('capture');
                        setPawns((_prev) => {
                            let _result = [..._prev];
                            const index = _result.findIndex((item) => (item.x + item.y *8) == boardIndex);
                            _result.splice(index, 1);
                            isLess = index < pawnIndex;
                            return _result;
                        })
                    } else{
                        console.log('friendly fire!');
                        console.log(' ');
                        row.current = startPosition.current.row;
                        column.current = startPosition.current.column;
                    }
                }
            }

            plays.forEach((item) => {
                result[item].playable = false;
            })
            attacks.forEach((item) => {
                result[item].attack = false;
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
            const index = isLess ? pawnIndex - 1 : pawnIndex;
            result[index] = {x: column.current, y: row.current,
            piece: result[index].piece, isBlack: result[index].isBlack};
            return result;
        })
          
        setBlackTurn((prev) => {
            const changed = !(column.current == startPosition.current.column && 
                row.current == startPosition.current.row)
            return changed ? !prev : prev;
         });
        

    }

    return {touchMove ,touchEnd, touchStart}

}




export default useMovementHandler;