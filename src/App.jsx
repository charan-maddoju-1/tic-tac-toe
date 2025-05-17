// import {useEffect,useState} from "react"
// //import "./styles.css"
// //import "./index.css"
// import confetti from "canvas-confetti";


// function Square({value,squareClick,bgColor}){
//     //return <button style={value==="X"?{color:"#bf8106"}:{color:"#22305e"}} className="square" onClick={squareClick} >{value}</button>
//     return <button style={{color:value==="X"?"#bf8106":"#22305e",backgroundColor:bgColor}} className="square" onClick={squareClick} >{value}</button>
// }


// function BoardElements({squares,handleClick,status,newColor}){
//     return(
//         <div>
//             <div>
//                 <p> {status} </p>
//             </div>
//             <div className="board-row">
//                 <Square value={squares[0]} squareClick={()=>handleClick(0)} bgColor={newColor[0]} />
//                 <Square value={squares[1]} squareClick={()=>handleClick(1) } bgColor={newColor[1]} />
//                 <Square value={squares[2]} squareClick={()=>handleClick(2) } bgColor={newColor[2]} />
//             </div>
//             <div className="board-row">
//                 <Square value={squares[3]} squareClick={()=>handleClick(3) } bgColor={newColor[3]} />
//                 <Square value={squares[4]} squareClick={()=>handleClick(4) } bgColor={newColor[4]} />
//                 <Square value={squares[5]} squareClick={()=>handleClick(5) } bgColor={newColor[5]} />
//             </div>
//             <div className="board-row">
//                 <Square value={squares[6]} squareClick={()=>handleClick(6) } bgColor={newColor[6]} />
//                 <Square value={squares[7]} squareClick={()=>handleClick(7) } bgColor={newColor[7]} />
//                 <Square value={squares[8]} squareClick={()=>handleClick(8) } bgColor={newColor[8]} />
//             </div>
//         </div>
//     )
// }

// function Board(props){
//     const {squares,nextX,onPlay,backColors}=props;
//     function handleClick(i){
//         if(findWinner(squares)||squares[i]){
//             return;
//         }
//         const newSquares=squares.slice();
//         nextX? newSquares[i]="X":newSquares[i]="O";
        
//         onPlay(newSquares);
//     }

//     let newColors=backColors.slice();
//     const win=findWinner(squares);
//     let winPath=[-1,-1,-1];
//     let status;
//     if(!win){
//         status=`Next Player : ${nextX?"X":"O"}`;
//     }
//     else{
//         status="winner : "+win.winner;
//         winPath=win.winnerPath;  
//         for(let i=0;i<winPath.length;i++){
//             newColors[winPath[i]]="#03ff4a";
//         }
//     }

//     return(
//         <BoardElements squares={squares} status={status} handleClick={handleClick} newColor={newColors} />
//     )
// }

// export default function App(){
//     const [historySquaresList,setHistorySquares]=useState([Array(9).fill(null)]);
//     const [nextX,setNextX]=useState(true);
//     const [currentMove,setCurrentMove]=useState(0);
//     //const [backColor,setbackColor]=useState(Array(9).fill("white"));
//     const backColors=Array(9).fill("white");


//     // Trigger confetti only once per win
//     const winInfo = findWinner(currentSquares);
//     useEffect(() => {
//     if (winInfo) {
//         confetti({
//         particleCount: 150,
//         spread: 70,
//         origin: { y: 0.6 }
//         });
//     }
//     }, [winInfo]);


//     const currentSquares=historySquaresList[currentMove];

//     function handlePlay(newSquares){
//         const currentHistory=[...historySquaresList.slice(0,currentMove+1),newSquares];
//         setCurrentMove(currentHistory.length-1);
//         setHistorySquares(currentHistory);
//         setNextX(!nextX);
//     }

//     const moves=historySquaresList.map((squares,move)=>{
//         let content;
//         if(move>0){
//             content=`Go to ${move} move`
//         }
//         else{
//             content=`Go to start`
//         }
//         return (
//             <li key={move}>
//                 <button onClick={()=>jumpTo(move)}>{content}</button>
//             </li>
//         );
//     })
//     function jumpTo(nextmove){
//         setCurrentMove(nextmove);
//         setNextX(nextmove%2===0);
//     }
//     return (
//         <div >
//             <h1> TIC TAC TOE</h1>
//             <Board squares={currentSquares} nextX={nextX} onPlay={handlePlay} backColors={backColors} />
//             <div>
//                 <ul>
//                     {moves}  
//                 </ul>
//             </div>
            
            
//         </div>
//     )
// } 

// function findWinner(squares){
//     let boardIndexArray=[
//         [0,1,2],
//         [3,4,5],
//         [6,7,8],
//         [0,3,6],
//         [1,4,7],
//         [2,5,8],
//         [0,4,8],
//         [2,4,6]
//     ]
//     for(let i=0;i<8;i++){
//         const a=boardIndexArray[i][0],b=boardIndexArray[i][1],c=boardIndexArray[i][2];
//         if(squares[a]&&squares[a]===squares[b]&&squares[b]===squares[c]){           
//             return {winner:squares[a],winnerPath:boardIndexArray[i]};

//         }
//     }
//     return null;
// }

import {useEffect,useState} from "react"
import "./index.css"
import confetti from "canvas-confetti";

function Square({ value, squareClick, bgColor, extraClass }) {
  return (
    <button
      style={{ color: value === "X" ? "#9c0268" : "#22305e", backgroundColor: bgColor }}
      className={`square ${extraClass}`}
      onClick={squareClick}
    >
      {value}
    </button>
  );
}

function BoardElements({ squares, handleClick, status, newColor, winPath,extraClass }) {
  return (
    <div className="board">
      <div>
        <p className={`player-status ${extraClass}`}>{status}</p>
      </div>
      {[0, 3, 6].map((rowStart) => (
        <div key={rowStart} className="board-row">
          {[0, 1, 2].map((i) => {
            const index = rowStart + i;
            return (
              <Square
                key={index}
                value={squares[index]}
                squareClick={() => handleClick(index)}
                bgColor={newColor[index]}
                extraClass={winPath.includes(index) ? "win" : ""}
              />
            );
          })}
        </div>
      ))}
    </div>
  );
}

function Board({ squares, nextX, onPlay, backColors }) {
  function handleClick(i) {
    if (findWinner(squares) || squares[i]) {
      return;
    }
    const newSquares = squares.slice();
    newSquares[i] = nextX ? "X" : "O";
    onPlay(newSquares);
  }

  let newColors = backColors.slice();
  const win = findWinner(squares);
  let winPath = [];
  let status;

  if (!win) {
    status = `Next Player : ${nextX ? "X" : "O"}`;
  } else {
    status = "Winner : " + win.winner;
    winPath = win.winnerPath;
    for (let i = 0; i < winPath.length; i++) {
      newColors[winPath[i]] = "#03ff4a";
    }
  }

  return (
    <div className="board-container">
      <BoardElements
        squares={squares}
        status={status}
        handleClick={handleClick}
        newColor={newColors}
        winPath={winPath}
        extraClass={win?"winner":""}
      />
    </div>
    
  );
}

export default function App() {
  const [historySquaresList, setHistorySquares] = useState([Array(9).fill(null)]);
  const [nextX, setNextX] = useState(true);
  const [currentMove, setCurrentMove] = useState(0);

  const backColors = Array(9).fill("white");
  const currentSquares = historySquaresList[currentMove];

    // Trigger confetti only once per win
    const winInfo = findWinner(currentSquares);
    useEffect(() => {
    if (winInfo) {
        confetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.6 }
        });
    }
    }, [winInfo]);

  function handlePlay(newSquares) {
    const currentHistory = [...historySquaresList.slice(0, currentMove + 1), newSquares];
    setHistorySquares(currentHistory);
    setCurrentMove(currentHistory.length - 1);
    setNextX(!nextX);
  }

  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
    setNextX(nextMove % 2 === 0);
  }

  const moves = historySquaresList.map((squares, move) => {
    const description = move ? `Go to move ${move}` : "Go to start";
    return (
      <li className="list-item" key={move}>
        <button className="move-button" onClick={() => jumpTo(move)} style={{backgroundColor:move===0&&"#09ad5b",color:move===0&&"white"}}>{description}</button>
      </li>
    );
  });

  return (
    <div className="body-container">
      <h1 className="header">TIC TAC TOE</h1>
      <div className="game-container">
        <Board squares={currentSquares} nextX={nextX} onPlay={handlePlay} backColors={backColors} />
        <ul className="list-container">{moves}</ul>
        
        
      </div>
    </div>
  );
}

function findWinner(squares) {
  const boardIndexArray = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  for (let i = 0; i < 8; i++) {
    const [a, b, c] = boardIndexArray[i];
    if (squares[a] && squares[a] === squares[b] && squares[b] === squares[c]) {
      return { winner: squares[a], winnerPath: boardIndexArray[i] };
    }
  }
  return null;
}
