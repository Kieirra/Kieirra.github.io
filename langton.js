class Langton {

    constructor() {
        this.grid = document.getElementById("grid");
        this.ctx = this.grid.getContext('2d');
        this.grid = new Grid(100, 100, this.grid);
        this.iteration = 0;
    }

    play() {
        this.update();
    }

    update() {
        this.ctx.clearRect(0, 0, this.grid.width, this.grid.height);
        this.ctx.beginPath();

        this.grid.update();
        this.grid.update();
        this.grid.update();
        this.grid.update();
        this.grid.draw(this.ctx);

        requestAnimationFrame(this.update.bind(this));
    }
}

class Grid {

    constructor(width, height, canvas) {
        this.width = width;
        this.height = height;
        this.cellSize = {
            width: canvas.width / width,
            height: canvas.height / height
        }

        this.cells = this.initGrid();

        this.ant = new Ant(this.width / 2, this.height / 2, this.cellSize.width, this.cellSize.height);
    }

    initGrid() {
        const cells = [];
        for (let x = 0; x < this.width; x++) {
            cells[x] = [];
            for (let y = 0; y < this.height; y++) {
                cells[x][y] = new Cell(x, y, this.cellSize.width, this.cellSize.height);
            }
        }
        return cells;
    }

    update() {
        const antCell = this.cells[this.ant.x][this.ant.y];
        if (antCell.color === "white") {
            antCell.color = "black";
            this.ant.rotateRight();
            this.ant.move();
        } else {
            antCell.color = "white";
            this.ant.rotateLeft();
            this.ant.move();
        }
    }

    draw(ctx) {
        for (let x = 0; x < this.width; x++) {
            for (let y = 0; y < this.height; y++) {
                this.cells[x][y].draw(ctx);
            }
        }
        this.ant.draw(ctx);
    }

}


class Cell {
    constructor(x, y, width, height) {
        this.color = "white";
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }

    draw(ctx) {
        ctx.fillStyle = this.color;
        ctx.strokeStyle = "black";
        // ctx.strokeRect(this.x * this.width, this.y * this.height, this.width, this.height);
        ctx.fillRect(this.x * this.width, this.y * this.height, this.width, this.height);
    }
}

class Ant {
    constructor(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.ANT = {
            UP: 0,
            RIGHT: 1,
            DOWN: 2,
            LEFT: 3
        }
        this.direction = this.ANT.UP;
    }

    move() {
        switch (this.direction) {
            case this.ANT.UP:
                this.x -= 1;
                break;
            case this.ANT.RIGHT:
                this.y += 1;
                break;
            case this.ANT.DOWN:
                this.x += 1;
                break;
            case this.ANT.LEFT:
                this.y -= 1;
                break;
        }
    }

    rotateRight() {
        this.direction = (this.direction + 1) % 4;
    }

    rotateLeft() {
        this.direction = (4 + this.direction - 1) % 4;
    }

    draw(ctx) {
        ctx.fillStyle = "red";
        ctx.fillRect(this.x * this.width, this.y * this.height, this.width, this.height);
    }
}



