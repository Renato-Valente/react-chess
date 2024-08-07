
import pieceTypes from "./pieceTypes"

interface PieceProps {
    pawns: {x: number, y: number, piece: pieceTypes, isBlack:Boolean, captured: Boolean}[];
    setPawns: (value: React.SetStateAction<{x: number, y: number, piece: pieceTypes, isBlack:Boolean, captured: Boolean}[]>) => any;
    setBoard: (e: React.SetStateAction<{empty: boolean, playable: Boolean, attack: Boolean}[]>) => any;
    board: {empty: boolean, playable: Boolean, attack: Boolean}[];
    pawnIndex: number;
    xOffset: number | undefined;
    yOffset: number | undefined;
    containerSize: {width: number, height: number};
    size: {width: number, height: number};
    isBlack: Boolean;
    blackTurn: Boolean;
    setMarked: (value: React.SetStateAction<number[]>) => any;
    setBlackTurn: (value: React.SetStateAction<Boolean>) => any;
}

export default PieceProps;