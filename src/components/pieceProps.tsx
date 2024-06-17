
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

export default PieceProps;