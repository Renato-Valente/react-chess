import { useRef } from "react";
import pieceTypes from "./pieceTypes";
import useMoves from "./useMoves";

interface prospType {
    pawns: {x: number, y: number, piece: pieceTypes, isBlack: Boolean}[]
    setPawns: (e: React.SetStateAction<{x: number, y: number, piece: pieceTypes,
    isBlack: Boolean}[]>) => any;
    board: {empty: boolean, playable: Boolean, attack: Boolean}[];
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
    setMarked: (value: React.SetStateAction<number[]>) => any;
    setBlackTurn: (value: React.SetStateAction<Boolean>) => any;
}

interface functionType {
    board: {empty: boolean, playable: Boolean, attack: Boolean}[];
    pawns: {x: number, y: number, piece: pieceTypes, isBlack:Boolean}[];
    pawnIndex: number;
}
const {getLShapeMoves, getKingMoves, getHorintalMoves,
    getDiagonalMoves, getPawnMoves, getQueenMoves} = useMoves();
const piecesMap : {[Key in pieceTypes]: (args: functionType) => {plays:number[], attacks:number[]}} = {
    'Bishop': getDiagonalMoves,
    'King': getKingMoves,
    'Knight': getLShapeMoves,
    'Pawn': getPawnMoves,
    'Rook': getHorintalMoves,
    'Queen': getQueenMoves
}

const useMovementHandler = (props: prospType) => {

    const {pawns, setMarked, setPawns, setBoard, isBlack, plays, pawnIndex, xOffset, yOffset, attacks,
        containerSize, board, column, row, pageX, pageY, blackTurn, setBlackTurn} = props;
    const boxSize = {width: containerSize.width / 8, height: containerSize.height / 8}
    const startPosition = useRef({column: 0, row: 0});
    const isMoving = useRef(false);

    const touchStart = (e: React.TouchEvent<HTMLDivElement> | React.MouseEvent<HTMLDivElement>) => {
        if(isBlack != blackTurn) return;
        console.log('touchstart')
        isMoving.current = true;
        const X = ('touches' in e) ? e.touches[0].pageX : e.pageX;
        const Y = ('touches' in e) ? e.touches[0].pageY : e.pageY;
        const newPageX = X - boxSize.width/2;
        const newPageY = Y - boxSize.height/2;
        e.currentTarget.style.zIndex = '999';
        e.currentTarget.style.position = 'absolute';
        e.currentTarget.style.transitionDuration = '0s';
        e.currentTarget.style.left = `${newPageX}px`;
        e.currentTarget.style.top = `${newPageY}px`;
        
        startPosition.current = {column: column.current, row: row.current}; 
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
        setMarked([]);
    }

    const touchMove = (e: React.TouchEvent<HTMLDivElement> | React.MouseEvent<HTMLDivElement>) => {
        if(!xOffset || !yOffset || (isBlack != blackTurn) || !isMoving.current) return;
        const newPageX = ('touches' in e) ? e.touches[0].pageX : e.pageX;
        const newPageY = ('touches' in e) ? e.touches[0].pageY : e.pageY;
        /* const newPageX = X - boxSize.width/2;
        const newPageY = Y - boxSize.height/2; */

        pageX.current = ((newPageX - xOffset) > 0 && (newPageX) < (containerSize.width + xOffset)) ? 
        newPageX : pageX.current;
        pageY.current = ((newPageY - yOffset) > 0 && newPageY < (containerSize.height + yOffset)) ? 
        newPageY : pageY.current; 
        
        const containerX = pageX.current - xOffset;
        const containerY = pageY.current - yOffset;

        column.current = (Math.floor(containerX / boxSize.width));
        row.current = (Math.floor(containerY / boxSize.height));
        
        e.currentTarget.style.left = `${pageX.current - boxSize.width/2}px`;
        e.currentTarget.style.top = `${pageY.current - boxSize.height/2}px`;
    }

    const touchEnd = (e: React.TouchEvent<HTMLDivElement> | React.MouseEvent<HTMLDivElement>) => {
        if(!isMoving.current) return;
        isMoving.current = false;

        if(isBlack != blackTurn) return;
        e.currentTarget.style.zIndex = '0';
        //to check if the piece to be deleted (in case of attack) 
        //has index bigger than the current piece
        let isLess = false;
        let newBoard : {
            empty: boolean;
            playable: Boolean;
            attack: Boolean;
        }[] = [];

        let newPawns : {
            x: number;
            y: number;
            piece: pieceTypes;
            isBlack: Boolean;
        }[] = [...pawns];

        const newMarked: number[] = [];

        const boardIndex = column.current + row.current * 8;
        if(!board[boardIndex].playable) {
            console.log('not possible!');
            console.log(' ');
            row.current = startPosition.current.row;
            column.current = startPosition.current.column;
        }
        else{
            if(!board[boardIndex].empty) {
                if(board[boardIndex].attack) {
                    console.log('capture');
                    const index = newPawns.findIndex((item) => (item.x + item.y*8) == boardIndex);
                    newPawns.splice(index, 1);
                    isLess = index < pawnIndex;
                } else{
                    console.log('friendly fire!');
                    console.log(' ');
                    row.current = startPosition.current.row;
                    column.current = startPosition.current.column;
                }
            }
        }

        //e.currentTarget.style.position = 'static';
        e.currentTarget.style.transitionDuration = '0.5s';
        e.currentTarget.style.zIndex = '0';

        for(let i = 0; i < 64; i++) {
            newBoard.push({empty: true, playable: false, attack: false})
        }

        setPawns((prev) => {
            let result = [...newPawns];
            const index = isLess ? pawnIndex - 1 : pawnIndex;
            result[index] = {x: column.current, y: row.current,
            piece: result[index].piece, isBlack: result[index].isBlack};

            //CHECKING FOR CHECKS
            result.forEach((item) => {
                const _index = item.x + (item.y*8);
                newBoard[_index].empty = false;
            })

            //get all enemy attack moves based on newBoard
            //and see if they match with the kings position
            let check = false;
            const king = result.find((item) => (item.piece == 'King' && item.isBlack == isBlack));
            if (!king) return prev;
            const kingIndex = king.x + (king.y) * 8;
            
            result.forEach((item, index) => {
                if(item.isBlack == isBlack) return;
                const moves = piecesMap[item.piece]({board: newBoard, pawns: result, pawnIndex: index});
                moves.attacks.forEach((atk) => {if(atk == kingIndex) {
                    check = true;
                    const pieceIndex = item.x + (item.y*8);
                    newMarked.push(pieceIndex);
                }})
                
            })
            if(check) {
                row.current = startPosition.current.row;
                column.current = startPosition.current.column;
                if(pawns[pawnIndex].piece != 'King') newMarked.push(kingIndex);
                    console.log('retornando prev');
                    return prev;
            }

            console.log('retornando result')
            return result;
        })
        if(!xOffset || !yOffset) return;
        e.currentTarget.style.left = `${column.current * boxSize.width + xOffset}px`;
        e.currentTarget.style.top = `${row.current * boxSize.height + yOffset}px`;
        
        setBoard(newBoard);
        setMarked(newMarked);
        setBlackTurn((prev) => {
            //console.log('pawns: ', pawns);
            const changed = !(column.current == startPosition.current.column && 
                row.current == startPosition.current.row)
            return changed ? !prev : prev;
         });
    }

    return {touchMove ,touchEnd, touchStart}

}




export default useMovementHandler;