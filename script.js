// empty = 0
// wall = 1
// pacman = 3
// ghosts = 4
// pill = 5
// WARP = 6
class Game {
    constructor() {
        this.map = [
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 2, 2, 2, 2, 5, 2, 2, 2, 2, 2, 2, 2, 2, 2, 5, 2, 2, 2, 1],
            [1, 2, 1, 1, 1, 1, 2, 1, 2, 1, 1, 2, 1, 2, 1, 1, 1, 1, 2, 1],
            [1, 2, 1, 2, 2, 2, 2, 1, 2, 2, 2, 2, 1, 2, 2, 2, 2, 1, 2, 1],
            [1, 2, 1, 2, 1, 1, 1, 1, 2, 1, 1, 2, 1, 1, 1, 1, 2, 1, 2, 1],
            [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1],
            [1, 1, 1, 2, 1, 2, 1, 1, 1, 0, 11, 0, 0, 1, 2, 1, 2, 1, 1, 1],
            [1, 6, 6, 2, 1, 2, 1, 0, 0, 0, 0, 0, 1, 1, 2, 1, 2, 6, 6, 1],
            [1, 1, 1, 2, 1, 2, 1, 0, 8, 7, 4, 9, 0, 1, 2, 1, 2, 1, 1, 1],
            [1, 1, 1, 2, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 2, 1, 1, 1],
            [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1],
            [1, 2, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 2, 1],
            [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3, 0, 2, 2, 2, 2, 2, 2, 2, 1],
            [1, 0, 2, 1, 1, 1, 1, 1, 1, 2, 2, 1, 1, 1, 1, 1, 1, 2, 1, 1],
            [1, 0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1],
            [1, 0, 1, 2, 1, 1, 1, 1, 2, 1, 1, 2, 0, 0, 1, 1, 2, 1, 2, 1],
            [1, 0, 0, 2, 5, 2, 2, 1, 2, 2, 2, 2, 1, 2, 2, 5, 2, 1, 2, 1],
            [1, 1, 1, 1, 1, 1, 2, 1, 2, 1, 1, 2, 1, 2, 1, 1, 1, 1, 2, 1],
            [1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
        ];
        this.board = document.querySelector(".game-board");
        this.pacmanCord = {
            i: 12,
            j: 10
        };
        this.ghostCord = {
            i: 8,
            j: 10
        };
        this.modal = document.querySelector(".modal");
        this.reload = document.querySelector(".reload")
        this.gameStatus = document.querySelector(".game-status");
        this.pacmanImg = null;
        this.speed = 40;
        this.pacman = null;
        this.ghost = null;
        this.empty = null;
        this.eaten = null;
        this.cherry = null;
        this.intervalId = null;
        this.scoreBoard = document.querySelector(".score");
        this.ghostSpeed = 500;
        this.handleKeyDown = null;
        this.gameOverId = null;
    }
    drawBoard() {
        for (let i = 0; i < this.map.length; i++) {
            for (let j = 0; j < this.map[i].length; j++) {
                if (this.map[i][j] === 1) {
                    const wall = document.createElement("div");
                    wall.classList.add("wall", "size-of");
                    this.board.appendChild(wall);
                } else if (this.map[i][j] === 3) {
                    const pacman = document.createElement("div");
                    const img = document.createElement("img");
                    img.src = "./images/pacman.gif";
                    pacman.appendChild(img);
                    pacman.classList.add("pacman", "size-of");
                    this.board.appendChild(pacman);
                } else if (this.map[i][j] === 4) {
                    const ghost = document.createElement("div");
                    const img = document.createElement("img");
                    img.src = "./images/ghost1.gif";
                    img.classList.add("ghost-img");
                    ghost.appendChild(img);
                    ghost.classList.add("ghost", "size-of");
                    this.board.appendChild(ghost);
                } else if (this.map[i][j] === 5) {
                    const pill = document.createElement("div");
                    const img = document.createElement("img");
                    img.src = "./images/cher1.png";
                    pill.appendChild(img);
                    pill.classList.add("pill", "size-of");
                    this.board.appendChild(pill);
                } else {
                    const empty = document.createElement("div");
                    const scorePill = document.createElement("div");
                    scorePill.classList.add("score-pill");
                    empty.appendChild(scorePill);
                    empty.classList.add("empty", "size-of");
                    this.board.appendChild(empty);
                }
            }
        }
    }
    selectElements() {
        this.pacman = document.querySelector(".pacman");
        this.empty = document.querySelectorAll(".empty");
        this.eaten = document.querySelectorAll(".eaten");
        this.ghost = document.querySelector(".ghost");
        this.cherry = document.querySelectorAll(".pill")
        this.ghostImg = document.querySelector(".ghost-img");
    }
    movePacman() {
        let top = 0;
        let left = 0;
        this.handleKeyDown = (e) => {
            this.pacmanWin();
            let pacmanY = this.pacmanCord.i;
            let pacmanX = this.pacmanCord.j;
            if (e.code === "KeyW") {
                pacmanY -= 1;
                if (pacmanY >= 0 && this.map[pacmanY][pacmanX] !== 1) {
                    top -= this.speed;
                    this.pacmanCord.i = pacmanY;
                }
            } else if (e.code === "KeyS") {
                pacmanY += 1;
                if (pacmanY < this.map.length && this.map[pacmanY][pacmanX] !== 1) {
                    top += this.speed;
                    this.pacmanCord.i = pacmanY;
                }
            } else if (e.code === "KeyA") {
                pacmanX -= 1;
                if (pacmanX >= 0 && this.map[pacmanY][pacmanX] !== 1) {
                    left -= this.speed;
                    this.pacmanCord.j = pacmanX;
                }
            } else if (e.code === "KeyD") {
                pacmanX += 1;
                if (pacmanX < this.map[0].length && this.map[pacmanY][pacmanX] !== 1) {
                    left += this.speed;
                    this.pacmanCord.j = pacmanX;
                }
            }
            this.pacman.style.transform = `translate(${left}px,${top}px)`;
            this.checkCollisionPacmanPills();
            this.pacmanCollosionWithCherry();
            this.gameOver();
            this.pacmanWin();
            // console.log(this.pacmanCord);
        };

        document.addEventListener("keydown", this.handleKeyDown);
    }
    checkCollisionPacmanPills() {
        this.empty.forEach(elem => {
            const pacmanRect = this.pacman.getBoundingClientRect();
            const emptyRect = elem.getBoundingClientRect();
            if (pacmanRect.left < emptyRect.right &&
                pacmanRect.right > emptyRect.left &&
                pacmanRect.top < emptyRect.bottom &&
                pacmanRect.bottom > emptyRect.top) {
                elem.classList.add("eaten");
                elem.innerHTML = "";
                this.selectElements();
                this.scoreBoard.innerHTML = `Your Score ${this.eaten.length}`
                // console.log(this.eaten.length);
            }
        })
    }
    pacmanCollosionWithCherry() {
        this.cherry.forEach(elem => {
            const pacmanRect = this.pacman.getBoundingClientRect();
            const cherryRect = elem.getBoundingClientRect();
            if (
                pacmanRect.left < cherryRect.right &&
                pacmanRect.right > cherryRect.left &&
                pacmanRect.top < cherryRect.bottom &&
                pacmanRect.bottom > cherryRect.top
            ) {
                console.log("Eat cherry");
                elem.innerHTML = "";
                clearInterval(this.intervalId);
                this.ghostImg.src = "./images/error.gif";
                setTimeout(this.ghostMovement.bind(this), 5000);
            }
        })
    }
    gameOver() {
        const pacmanRect = this.pacman.getBoundingClientRect();
        const ghostRect = this.ghost.getBoundingClientRect();
        if (ghostRect.left < pacmanRect.right &&
            ghostRect.right > pacmanRect.left &&
            ghostRect.top < pacmanRect.bottom &&
            ghostRect.bottom > pacmanRect.top) {
            console.log("You Lose");
            clearInterval(this.intervalId);
            document.removeEventListener("keydown", this.handleKeyDown);
            this.modal.style.display = "block";
        }
        // clearInterval(this.gameOverId);
    }
    pacmanWin() {
        if (this.eaten.length === 201) {
            console.log("You Win");
            clearInterval(this.intervalId);
            document.removeEventListener("keydown", this.handleKeyDown);
            this.modal.style.display = "block";
            this.gameStatus.innerHTML = "You Win";
        };
    }
    ghostMovement() {
        this.ghostImg.src = "./images/ghost1.gif";
        let left = 0;
        let top = 0;
        this.intervalId = setInterval(() => {
            const ghostRect = this.ghost.getBoundingClientRect();
            const pacmanRect = this.pacman.getBoundingClientRect();
            const dx = pacmanRect.left - ghostRect.left;
            const dy = pacmanRect.top - ghostRect.top;
            const isAtLeftBoundary = ghostRect.left <= 0;
            const isAtRightBoundary = ghostRect.right >= this.board.offsetWidth;
            const isAtTopBoundary = ghostRect.top <= 0;
            const isAtBottomBoundary = ghostRect.bottom >= this.board.offsetHeight;

            if (Math.abs(dx) > Math.abs(dy)) {
                left += dx > 0 ? this.speed : -this.speed;

                if (left < 0 && !isAtLeftBoundary) {
                    this.ghost.style.transform = `translate(${left}px, ${top}px)`;
                } else if (left > 0 && !isAtRightBoundary) {
                    this.ghost.style.transform = `translate(${left}px, ${top}px)`;
                }
            } else {
                top += dy > 0 ? this.speed : -this.speed;

                // Check top and bottom boundaries
                if (top < 0 && !isAtTopBoundary) {
                    this.ghost.style.transform = `translate(${left}px, ${top}px)`;
                } else if (top > 0 && !isAtBottomBoundary) {
                    this.ghost.style.transform = `translate(${left}px, ${top}px)`;
                }
            }
            this.gameOver();
            // console.log(left, top);
        }, this.ghostSpeed);
    }
    reloadGame() {
        this.reload.addEventListener("click", () => {
            location.reload();
            console.log('clicked');
        })
    }
    main() {
        this.drawBoard();
        this.selectElements();
        this.movePacman();
        this.ghostMovement();
        this.reloadGame();
    }
}
const game = new Game();
game.main();