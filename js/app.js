class GameOfLife {
    constructor(boardWidth, boardHeight) {
        this.width = boardWidth;
        this.height = boardHeight;
        this.board = document.getElementById("board");
        this.cells = [];
        this.randomNeighboors = [];
        this.liveCells = [];
        this.x = 0;
        this.y = 0;
        this.currentstate = [];
        this.nextStage = []
    }

    createBoard() {

        this.board.style.width = this.width * 10 + "px"
        this.board.style.height = this.height * 10 + "px"

        let cells = (this.height * this.width)

        for (let i = 0; i < cells; i++) {
            this.board.innerHTML += `<div></div>`
        }
        this.cells = this.board.querySelectorAll("div")
    }

    aliveCellonClick() {
        Array.from(this.cells).forEach((element) => {
            element.addEventListener("mouseover", () => {
                element.classList.add("live")
            })
        })
    }

    calculateIndex(x, y, width) {
        let indeks = x + y * width;
        this.setCellState(indeks)
    }

    setCellState(index) {
        this.cells[index].classList.add("live")
    }

    firstGlider(x, y, width, state) {
        this.calculateIndex(x, y, width, state)
    }


    computeCellNextState() {

        let boardFields = this.board.getElementsByTagName("div");

        Array.from(boardFields).forEach((el) => {
            if (el.classList.contains("live")) {
                this.currentstate.push(1)
            } else {
                this.currentstate.push(0)
            }

        })

        Array.from(this.currentstate).forEach((el, index) => {
            const width = Math.sqrt(this.cells.length);
            this.x = index % width
            this.y = Math.floor(index / width)

            let neighboors = {
                first: {
                    x: this.x - 1,
                    y: this.y - 1
                },
                second: {
                    x: this.x,
                    y: this.y - 1
                },
                third: {
                    x: this.x + 1,
                    y: this.y - 1
                },
                four: {
                    x: this.x - 1,
                    y: this.y
                },
                five: {
                    x: this.x + 1,
                    y: this.y
                },
                six: {
                    x: this.x - 1,
                    y: this.y + 1
                },
                seven: {
                    x: this.x,
                    y: this.y + 1,
                },
                eight: {
                    x: this.x + 1,
                    y: this.y + 1
                }
            }


            let aliveNeighboors = this.checkNeighboors(neighboors, width, this)

            if (aliveNeighboors === 2 || aliveNeighboors === 3) {
                this.nextStage.push(1)
            } else {
                this.nextStage.push(0)
            }

        })
    }

    checkNeighboors(neighboors, width, self) {
        let alive = 0
        Object.values(neighboors).forEach(function (element) {

            let indeks = element.x + element.y * width
            if (self.currentstate[indeks] === 1) {
                alive++
            }
        })
        return alive
    }

    printNextGeneration() {
        Array.from(this.cells).forEach((el, index) => {

            if (this.nextStage[index] === 1) {
                el.classList.contains("live") ? 0 : el.classList.add("live")
            } else if (this.nextStage[index] === 0) {
                el.classList.contains("live") ? el.classList.remove("live") : 0
            }
        })

        this.nextStage = [];
        this.currentstate = []
    }

}

let game = new GameOfLife(60, 60);

game.createBoard()

game.firstGlider(30, 30, 60, "live");
game.firstGlider(31, 30, 60, "live");
game.firstGlider(32, 30, 60, "live");
// game.firstGlider(33, 31, 60, "live");
// game.firstGlider(33, 32, 60, "live");
// game.firstGlider(32, 31, 60, "live");

const play = document.getElementById("play")
const pause = document.getElementById("pause")

play.addEventListener("click", function () {

   let playGame = setInterval(() => {
        game.computeCellNextState()
        game.printNextGeneration()
        game.aliveCellonClick()
    }, 1500);

 pause.addEventListener("click", function(){
    clearInterval(playGame)
})
   
})







