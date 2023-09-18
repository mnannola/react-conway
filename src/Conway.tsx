import { useState } from "react";
import { boardTick } from "./utilities/boardTick";
import { useInterval } from "./hooks/useInterval";

const BOARD_ROW_COUNT = 25;

function initializeBoardState(): boolean[][] {
  return Array.from(Array(BOARD_ROW_COUNT), () => Array(BOARD_ROW_COUNT).fill(false));
}

function ConwaySquare({
    isToggled,
    row,
    col,
    toggleSquare,
  }: {
    isToggled: boolean;
    row: number;
    col: number;
    toggleSquare: (row: number, col: number) => void;
  }) {
    let baseClasses = "flex flex-row space-x-3 border border-black w-6 h-6";
    if (isToggled) {
        baseClasses = baseClasses.concat(' bg-yellow-300');
    }
    
    return (
        <div className={baseClasses} onClick={() => toggleSquare(row,col)}>      
        </div>
    )
}

function ConwayBoard() {
    // Use 2d array to keep track of board state.
    const [boardState, setBoardState ] = useState(() => initializeBoardState());
    const [isPlaying, setIsPlaying ] = useState(false);
    useInterval(() => {
        setBoardState(boardTick)
    },
    isPlaying ? 1000 : null)

    function toggleSquare(row: number, col: number) {
        const copyBoardState = [...boardState];
        copyBoardState[row][col] = !copyBoardState[row][col];
        setBoardState(copyBoardState);
    }

    const rows = boardState.map((row, i) => (
        <div className="flex flex-row">
            {row.map((square, j) => <ConwaySquare isToggled={square} row={i} col={j} toggleSquare={toggleSquare}/>)}
        </div>
    ));
    
    return (        
        <div className="board">
            <button 
                className="bg-red-500 py-2 px-4 my-2 rounded"
                onClick={() => setBoardState(initializeBoardState())}>clear</button>
            <div>
                {rows}
            </div>
            <div className="flex flex-row items-stretch">
                <button
                    className="bg-blue-400 py-2 px-4 my-2 mx-2 rounded"
                    onClick={() => setBoardState(boardTick)}
                    >next round</button>

                {!isPlaying && <button 
                    className="bg-green-400 py-2 px-4 my-2 mx-2 rounded"
                    onClick={() => setIsPlaying(true)}
                    >play</button>}

                {isPlaying && <button
                    className="bg-red-400 py-2 px-4 my-2 mx-2 rounded"
                    onClick={() => setIsPlaying(false)}>stop</button>}
            </div>
            
        </div>
    )
}

export { ConwayBoard };