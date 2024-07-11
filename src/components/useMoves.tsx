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
        if(board[item] && !board[item].empty) {
            const target = pawns.find((pawn) => (pawn.x + pawn.y * 8) == item);
            if(target && target.isBlack != pos.isBlack) attacks.push(item);
        }
    })

    return {plays, attacks}
    }

    const getKingMoves = (args: functionType) => {
        const {board, pawns, pawnIndex} = args;
        const pos = pawns[pawnIndex];
        const plays: number[] = [];
        const attacks: number[] = [];
        if(pos.y - 1 >= 0) plays.push(pos.x + (pos.y - 1) * 8);
        if(pos.y + 1 < 8) plays.push(pos.x + (pos.y + 1) * 8);
        if(pos.x - 1>= 0) plays.push((pos.x - 1) + pos.y * 8);
        if(pos.x + 1 < 8) plays.push((pos.x + 1) + pos.y * 8);
    
        if(pos.y - 1 >= 0 && pos.x + 1 < 8) plays.push((pos.x+1) + (pos.y-1)*8);
        if(pos.y - 1 >= 0 && pos.x - 1 >=0) plays.push((pos.x-1) + (pos.y-1)*8);
        if(pos.y + 1 < 8 && pos.x + 1 < 8) plays.push((pos.x +1) + (pos.y+1)*8);
        if(pos.y + 1 < 8 && pos.x - 1 >=0) plays.push((pos.x -1) + (pos.y+1)*8);
    
        plays.forEach((item) => {
            if(board[item] && !board[item].empty) {
                const target = pawns.find((pawn) => (pawn.x + pawn.y * 8) == item);
                if(target && target.isBlack != pos.isBlack) attacks.push(item);
            }
        })
        return {plays, attacks};
    }

    const getHorintalMoves = (args: functionType) => {
        const {board, pawns, pawnIndex} = args;
        const pos = pawns[pawnIndex];
    const plays: number[] = [];
    const attacks: number[] = [];

    for(let y = pos.y; y < 7; y++) {
        const index = pos.x + (y+1)*8;
        {plays.push(index)}
        if(!(board[index] && board[index].empty)) break; 
        
    }

    for(let y = pos.y; y > 0; y--) {
        const index = pos.x + (y-1)*8;
        {plays.push(index)}
        if(!(board[index] && board[index].empty)) break; 
    }

    for(let x = pos.x; x < 7; x++) {
        const index = (x+1) + (pos.y)*8;
        {plays.push(index)}
        if(!(board[index] && board[index].empty)) break; 
    }

    for(let x = pos.x; x > 0; x--) {
        const index = (x-1) + (pos.y)*8;
        {plays.push(index)}
        if(!(board[index] && board[index].empty)) break; 
    }

    plays.forEach((item) => {
        if(board[item] && !board[item].empty) {
            const target = pawns.find((pawn) => (pawn.x + pawn.y * 8) == item);
            if(target && target.isBlack != pos.isBlack) attacks.push(item);
        }
    })
    return {plays, attacks}
    }
    
    const getDiagonalMoves = (args: functionType) => {
        const {board, pawns, pawnIndex} = args;
        const pos = pawns[pawnIndex];
        const plays: number[] = [];
        const attacks: number[] = [];

        for(let x = pos.x, y = pos.y; x < 7 && y < 7; x++,y++){
            const index = (x+1) + (y+1)*8;
            if(board[index]) plays.push(index);
            if(!board[index] || !board[index].empty) break;
        }

        for(let x = pos.x, y = pos.y; x > 0 && y > 0; x--,y--){
            const index = (x-1) + (y-1)*8;
            if(board[index]) plays.push(index);
            if(!board[index] || !board[index].empty) break;
        }

        for(let x = pos.x, y = pos.y; x > 0 && y < 7; x--,y++){
            const index = (x-1) + (y+1)*8;
            if(board[index]) plays.push(index);
            if(!board[index] || !board[index].empty) break;
        }

        for(let x = pos.x, y = pos.y; x < 7 && y > 0; x++,y--){
            const index = (x+1) + (y-1)*8;
            if(board[index]) plays.push(index);
            if(!board[index] || !board[index].empty) break;
        }

        plays.forEach((item) => {
            if(board[item] && !board[item].empty) {
                const target = pawns.find((pawn) => (pawn.x + pawn.y * 8) == item);
                if(target && target.isBlack != pos.isBlack) attacks.push(item);
            }
        })

        return {plays, attacks};
    }

    const getPawnMoves = (args: functionType) => {
        const {board, pawns, pawnIndex} = args;
        const pos = pawns[pawnIndex];
    const plays: number[] = [];
    const attacks: number[] = [];
    const startRow = pos.isBlack ? 1 : 6;
    const limit = pos.y == startRow ? 2 : 1;
    const direction = pos.isBlack ? 1 : -1;
        
    for(let gap = 1; gap <= limit; gap++) {
        const index = pos.x + (pos.y + (gap*direction))*8;
        if(!board[index] || !board[index].empty) break;
        plays.push(index);
    }

    //let indices = [(pos.x+1) + (pos.y + (direction))*8, (pos.x-1) + (pos.y + (direction))*8];
    let indices :number[] = [];
    if(pos.x < 7) indices.push((pos.x+1) + (pos.y + (direction))*8);
    if(pos.x > 0) indices.push((pos.x-1) + (pos.y + (direction))*8);

    indices.forEach((item) => {
        if(board[item] && !board[item].empty) plays.push(item);
    })
    
    plays.forEach((item) => {
        if(board[item] && !board[item].empty) {
            const target = pawns.find((pawn) => (pawn.x + pawn.y * 8) == item);
            if(target && target.isBlack != pos.isBlack) attacks.push(item);
        }
    })
    return {plays, attacks}
    }

    const getQueenMoves = (args: functionType) => {
        const {board, pawns, pawnIndex} = args;
        const diagonals = getDiagonalMoves({board, pawns, pawnIndex});
        const horizontals = getHorintalMoves({board, pawns, pawnIndex});
        const plays = [...diagonals.plays, ...horizontals.plays];
        const attacks = [...diagonals.attacks, ...horizontals.attacks];

        return {plays, attacks};
    }

    return {getLShapeMoves, getKingMoves, getHorintalMoves, getDiagonalMoves, getPawnMoves, getQueenMoves}
}


export default useMoves;