/*----- constants -----*/
const COLORS = {
    '0': 'white',
    '1': 'red',
    '-1': 'yellow'
  };
  
  /*----- app's state (variables) -----*/
  let board;  // 2D Array where the nested arrays rep the columns
  let turn;  // 1 or -1; 0 for nobody home in that cell
  
  /*----- cached element references -----*/
  const markerEls = [...document.querySelectorAll('#markers > div')];
  
  /*----- event listeners -----*/
  document.getElementById('markers').addEventListener('click', handleDrop);
  document.getElementById('resetBtn').addEventListener('click', init);
  document.getElementById('playAgn').addEventListener('click', init);
  
  /*----- functions -----*/
  init();
  
  
  
  // initialize state, then call render()
  function init() {
    board = [
      [0, 0, 0, 0],  // column 0
      [0, 0, 0, 0],  // column 1
      [0, 0, 0, 0],  // column 2
      [0, 0, 0, 0],  // column 3
      [0, 0, 0, 0],  // column 4
    ];
    turn = 1;
    render();
  }

  
  function render() {
    // Iterate over the column arrays
    board.forEach(function(colArr, colIdx) {
      colArr.forEach(function(cellVal, rowIdx) {
        const cellEl = document.getElementById(`c${colIdx}r${rowIdx}`);
        cellEl.style.backgroundColor = COLORS[cellVal];
      });
    });
    renderMarkers();
  }
  
  // hide/show the markers (hide if no 0's exist in that column)
  function renderMarkers() {
    markerEls.forEach(function(markerEl, colIdx) {
      markerEl.style.visibility = board[colIdx].includes(0) ? 'visible' : 'hidden';
    });
  }
  
  // Update all impacted state, then call render
  function handleDrop(evt) {
    const colIdx = markerEls.indexOf(evt.target);
    if (colIdx === -1) return;
    const colArr = board[colIdx];
    const rowIdx = colArr.indexOf(0);
    colArr[rowIdx] = turn;
    const winner = getWinner(colIdx, rowIdx);
    if (winner != null) {
      console.log(winner);
    } 
    turn *= -1;
    render();
  }
  function countNumVert(colIdx, rowIdx) {
    const player = board[colIdx][rowIdx];
   let count = null;
     //count up
     let idx = rowIdx + 1;
     while (idx < board[colIdx].length && board[colIdx][idx] === player) {
       count++;
       idx++;
     }
     //count down
     idx = rowIdx - 1;
     while (idx >= 0 && board[colIdx][idx] === player) {
       count++;
       idx--;
     }
     
     return count === 3 ? player : null;
   }
   function countNumHorz(colIdx, rowIdx) {
    const player = board[colIdx][rowIdx];
   let count = 1;
     //count right
     let idx = colIdx + 1;
     while (idx < board.length && board[idx][rowIdx] === player) {
       count++;
       idx++;
     }
     //count left
     idx = colIdx - 1;
     while (idx >= 0 && board[idx][rowIdx] === player) {
       count++;
       idx--;
     }
     return count >= 3 ? player : null;
   }
   // console.log(countNumVert(1, 3))
   function getWinner(colIdx, rowIdx) {
     return countNumVert(colIdx, rowIdx)
     || countNumHorz(colIdx, rowIdx)
    //  || checkDiagRight(colIdx, rowIdx)
    //  || checkDiagLeft(colIdx, rowIdx);
   }
  