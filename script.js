const numRows = 8;
const numCols = 8;
const numMines = 10;
 
const gameBoard =
    document.getElementById(
        "gameBoard"
    );
let board = [];
 
function initializeBoard() {
    for (let i = 0; i < numRows; i++) {
        board[i] = [];
        for (
            let j = 0;
            j < numCols;
            j++
        ) {
            board[i][j] = {
                isMine: false,
                revealed: false,
                count: 0,
            };
        }
    }
 
    let minesPlaced = 0;
    while (minesPlaced < numMines) {
        const row = Math.floor(
            Math.random() * numRows
        );
        const col = Math.floor(
            Math.random() * numCols
        );
        if (!board[row][col].isMine) {
            board[row][
                col
            ].isMine = true;
            minesPlaced++;
        }
    }

    for (let i = 0; i < numRows; i++) {
        for (
            let j = 0;
            j < numCols;
            j++
        ) {
            if (!board[i][j].isMine) {
                let count = 0;
                for (
                    let dx = -1;
                    dx <= 1;
                    dx++
                ) {
                    for (
                        let dy = -1;
                        dy <= 1;
                        dy++
                    ) {
                        const ni =
                            i + dx;
                        const nj =
                            j + dy;
                        if (
                            ni >= 0 &&
                            ni <
                                numRows &&
                            nj >= 0 &&
                            nj <
                                numCols &&
                            board[ni][
                                nj
                            ].isMine
                        ) {
                            count++;
                        }
                    }
                }
                board[i][j].count =
                    count;
            }
        }
    }
}
 
function revealCell(row, col) {
    if (
        row < 0 ||
        row >= numRows ||
        col < 0 ||
        col >= numCols ||
        board[row][col].revealed
    ) {
        return;
    }
 
    board[row][col].revealed = true;
 
    if (board[row][col].isMine) {
        alert(
            "Spēle beigusies, tu uzkāpi uz mīnas !");
            window.location.reload();
    } else if (
        board[row][col].count === 0
    ) {
        for (
            let dx = -1;
            dx <= 1;
            dx++
        ) {
            for (
                let dy = -1;
                dy <= 1;
                dy++
            ) {
                revealCell(
                    row + dx,
                    col + dy
                );
            }
        }
    }
 
    renderBoard();
}
 
function renderBoard() {
    gameBoard.innerHTML = "";
 
    for (let i = 0; i < numRows; i++) {
        for (
            let j = 0;
            j < numCols;
            j++
        ) {
            const cell =
                document.createElement(
                    "div"
                );
            cell.className = "cell";
            if (board[i][j].revealed) {
                cell.classList.add(
                    "revealed"
                );
                if (
                    board[i][j].isMine
                ) {
                    cell.classList.add(
                        "mine"
                    );
                    cell.textContent =
                        "????";
                } else if (
                    board[i][j].count >
                    0
                ) {
                    cell.textContent =
                        board[i][
                            j
                        ].count;
                }
            }
            cell.addEventListener(
                "click",
                () => revealCell(i, j)
            );
            gameBoard.appendChild(cell);
        }
        gameBoard.appendChild(
            document.createElement("br")
        );
    }
}
 
initializeBoard();
renderBoard();

function aprēķināt() {
  let cena = document.getElementById("cena").value;
  let platiba = document.getElementById("platiba").value;
  
  if (cena && platiba) {
      let pakas = Math.ceil(platiba / 1.8);
      let kopējāCena = cena * pakas;
      
      document.getElementById("rezultāts").innerText = `Jums būs nepieciešamas ${pakas} pakas. Kopējā cena: ${kopējāCena} €`;
  } else {
      document.getElementById("rezultāts").innerText = "Lūdzu, ievadiet abus datus!";
  }
}

function displayDateTime() {
  var now = new Date();
  var dateString = now.toDateString();
  var timeString = now.toLocaleTimeString();
  var timeZoneString = now.toTimeString().match(/\((.*)\)/)[1];

  document.getElementById('date').innerHTML = dateString;
  document.getElementById('time').innerHTML = timeString;
  document.getElementById('timezone').innerHTML = timeZoneString;
}