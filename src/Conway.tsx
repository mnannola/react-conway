import { useState } from "react";
import { boardTick } from "./utilities/boardTick";
import { useInterval } from "./hooks/useInterval";
import { Button } from "./components/Button";

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
    const baseClasses = 
        `${isToggled ? 'bg-yellow-300' : '' } flex flex-row space-x-3 border border-black w-6 h-6`;
    
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
        <div className="flex flex-row flex-nowrap">
            {row.map((square, j) => <ConwaySquare isToggled={square} row={i} col={j} toggleSquare={toggleSquare}/>)}
        </div>
    ));
    
    return (
        <div className="flex flex-col p-2">
            <div className="flex flex-row">
                <Button 
                        text="next" 
                        bgColor="bg-blue-400" 
                        handleClick={() => setBoardState(boardTick)} />

                {!isPlaying && <Button
                    text="play"
                    bgColor="bg-green-400"
                    handleClick={() => setIsPlaying(true)}/>}

                {isPlaying && <Button
                    text="stop"
                    bgColor="bg-red-400"
                    handleClick={() => setIsPlaying(false)}/>}

                <Button
                    text="clear"
                    bgColor="bg-red-500"
                    handleClick={() => setBoardState(initializeBoardState())}/>
            </div>            
            <div className="w-[600px] h-[600px] overflow-scroll">
                {rows}
            </div>            
        </div>               
    )
}

export { ConwayBoard };