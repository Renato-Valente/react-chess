import pieceTypes from "./pieceTypes";

const useMoves = () => {
    interface functionType {
        board: {empty: boolean, playable: Boolean, attack: Boolean}[];
        pawns: {x: number, y: number, piece: pieceTypes, isBlack:Boolean}[];
        pawnIndex: number;
    }
    const getLShapeMoves : (args: functionType) => {plays:number[], attacks:number[]} = (args) => {       
    const {board, pawns, pawnIndex} = args;
    const pos = pawns[pawnIndex];        
    const plays: number[] = [];
    const attacks: number[] = [];

    if(pos.x -1 >= 0 && pos.y - 2 >=0) plays.push((pos.x-1) + (pos.y-2)*8);
    if(pos.x + 1<8 && pos.y - 2 >= 0) plays.push((pos.x+1) + (pos.y-2)*8);
    if(pos.x -1 >= 0 && pos.y + 2 < 8) plays.push((pos.x-1) + (pos.y+2)*8);
    if(pos.x + 1<8 && pos.y + 2 < 8) plays.push((pos.x+1) + (pos.y+2)*8);

    if(pos.x -2 >=0 && pos.y -1 >=0) plays.push((pos.x-2) + (pos.y-1)*8);
    if(pos.x +2 <8 && pos.y -1 >=0) plays.push((pos.x+2) + (pos.y-1)*8);
    if(pos.x -2 >=0 && pos.y +1 <8) plays.push((pos.x-2) + (pos.y+1)*8);
    if(pos.x +2 <8 && pos.y +1 < 8) plays.push((pos.x+2) + (pos.y+1)*8);

    plays.forEach((item) => {
        if(!board[item].empty) {
            const target = pawns.find((pawn) => (pawn.x + pawn.y * 8) == item);
            if(target && target.isBlack != pos.isBlack) attacks.push(item);
        }
    })

    return {plays, attacks}
    }

    return {getLShapeMoves}
}

export default useMoves;