function boardTick(boardState: boolean[][]): boolean[][] {
    const clonedBoardState = boardState.map(row => row.slice());
    // Loop through each square
    for (let i = 0; i < boardState.length; i++) {
        for (let j = 0; j < boardState[i].length; j++) {
            const isAlive = boardState[i][j];

            const aliveCount = getAliveCount(i, j, boardState);
            if (isAlive) {         
                if (aliveCount > 1 && aliveCount < 4) {
                    // square stays alive
                    clonedBoardState[i][j] = true;
                }
                else {
                    clonedBoardState[i][j] = false;
                }
            } else {
                // current square is dead
                // it's alive if it has 3 live neighbors
                clonedBoardState[i][j] = aliveCount === 3;
            }
        }
    }
    return clonedBoardState;
}

function getAliveCount(i: number, j: number, boardState: boolean[][]) {
    const squareStatus: boolean[] = [];
    
    for (let iRow = i-1; iRow < i+2; iRow++) {
        for (let jRow = j-1; jRow < j+2; jRow++) {
            if (iRow === i && jRow === j) {
                continue;
            }
            pushSquareStatus(iRow, jRow, squareStatus, boardState);
        }
    }    

    const aliveCount = squareStatus.reduce((acc, cur) => {
        const squareAliveCount = cur ? 1 : 0;
        return acc + squareAliveCount;
    }, 0);    
    return aliveCount;
}
function pushSquareStatus(i: number, j:number, squareStatus: boolean[], boardState: boolean[][]) {
    squareStatus.push(getSquareValue(i,j,boardState));
}
function getSquareValue(i: number, j: number, boardState: boolean[][]): boolean {
    const squareValue = !!boardState?.[i]?.[j];    
    return squareValue;
} 

export { boardTick };