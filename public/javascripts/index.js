// random integer generator
function randomInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// vue components
Vue.component("letter-button", {
props: ["letter", "gameOver"],
template: "<button class='keyboard-row-letter' :id='letter' :disabled='disabled' @click='clicked()'>{{ letter }}</button>",
data: function() {
    return {
        disabled: false
    };
},
methods: {
    clicked: function() {
        this.disabled = true;
        this.$emit("check");
    }
},
watch: {
    gameOver: function(newValue) {
        this.disabled = newValue;
    }
}
})

// main vue instance
var app = new Vue({
el: "#app",
data: {
    letters: [
        ["A", "Á", "B", "C", "D", "E", "É", "F", "G", "H"], 
        ["I", "Í", "J", "K", "L", "M", "N", "O", "Ó", "Ö"],
        ["Ő", "P", "Q", "R", "S", "T", "U", "Ú", "Ü", "Ű"],
        ["V", "W", "X", "Y", "Z"],
    ],
    words: [
        "JAVA", 
        "PHP", 
        "FRONTEND", 
        "BACKEND", 
        "NODEJS", 
        "OBJECT", 
        "DELEGATE", 
        "OFFICIAL", 
        "AGGREGATE", 
        "PARADIGM",
        "OPTIMALIZATION", 
        "BÁNHELYIBALÁZS",
        "NÉMETHTAMÁS",
        "EASTEREGG",
        "AJAX",
        "MANIFEST",
        "PRODUCT",
        "DEVELOPMENT",
        "PUMPÁLÓLEMMA",
        "TRIVIÁLIS",
        "SOLID",
        "LARAVEL",
        "JAVASPRING",
        "VUEJS"
    ],
    currentWord: "",
    wordDivs: [],
    guesses: 0,
    gameOver: false,
    lose: false,
    canvas: "",
    ctx: ""
},
methods: {
    // gallow draw
    drawGallows: function(ctx) {
        ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        ctx.fillStyle = "#FF9800";
        ctx.strokeStyle = "#FF9800";
        ctx.beginPath();
        // left side
        ctx.moveTo(this.canvas.width / 10, this.canvas.height / 10);
        ctx.lineTo(this.canvas.width / 10, this.canvas.height * 0.95);
        // bottom part
        ctx.lineTo(this.canvas.width * 0.8, this.canvas.height * 0.95);
        // upper part
        ctx.moveTo(this.canvas.width / 10, this.canvas.height / 10);
        ctx.lineTo(this.canvas.width * 0.4, this.canvas.height / 10);
        // gallow
        ctx.lineTo(this.canvas.width * 0.4, this.canvas.height / 5);
        ctx.stroke();
        ctx.closePath();
    },
    // wordDivs fill with empty strings
    makeBlanks: function() {
        for (var i = 0; i < this.currentWord.length; i++) {
            this.wordDivs.push("");
        }
    },
    // build human
    updateCanvas: function(ctx) {
        // head
        if (this.guesses === 0) {
            ctx.beginPath();
            ctx.arc(this.canvas.width * 0.4, (this.canvas.height / 5) + 20, 20, 0, 2 * Math.PI);
            ctx.stroke();
            ctx.closePath();
        } 
        // trunk
        else if (this.guesses === 1) {
            ctx.beginPath();
            ctx.moveTo(this.canvas.width * 0.4, (this.canvas.height / 5) + 40);
            ctx.lineTo(this.canvas.width * 0.4, this.canvas.height / 2);
            ctx.stroke();
            ctx.closePath();
        }
        // right leg
        else if (this.guesses === 2) {
            ctx.beginPath();
            ctx.moveTo(this.canvas.width * 0.4, this.canvas.height / 2);
            ctx.lineTo((this.canvas.width * 0.4) + 30, this.canvas.height * 0.7);
            ctx.stroke();
            ctx.closePath();
        }
        // left leg
        else if (this.guesses === 3) {
            ctx.beginPath();
            ctx.moveTo(this.canvas.width * 0.4, this.canvas.height / 2);
            ctx.lineTo((this.canvas.width * 0.4) - 30, this.canvas.height * 0.7);
            ctx.stroke();
            ctx.closePath();
        }
        // right arm
        else if (this.guesses === 4) {
            ctx.beginPath();
            ctx.moveTo(this.canvas.width * 0.4, (this.canvas.height / 5) + 55);
            ctx.lineTo((this.canvas.width * 0.4) + 35, (this.canvas.height / 2) + 10);
            ctx.stroke();
            ctx.closePath();
        } 
        // left arm
        else if (this.guesses === 5) {
            ctx.beginPath();
            ctx.moveTo(this.canvas.width * 0.4, (this.canvas.height / 5) + 55);
            ctx.lineTo((this.canvas.width * 0.4) - 35, (this.canvas.height / 2) + 10);
            ctx.stroke();
            ctx.closePath();
        }
        // mouth
        else if (this.guesses === 6) {
            ctx.beginPath();
            ctx.fillStyle = '#FF9800';
            ctx.ellipse((this.canvas.width * 0.4), (this.canvas.height / 4), 10, 15, 0, 0, Math.PI);
            ctx.fill();
            ctx.closePath();
        }
        // left eye
        else if (this.guesses === 7) {
            ctx.beginPath();
            ctx.fillRect(this.canvas.width * 0.4 - 8, this.canvas.height / 4 - 8, 5, 5);
            ctx.fill();
            ctx.closePath();
        }
        // right eye
        else if (this.guesses === 8) {
            ctx.beginPath();
            ctx.fillRect(this.canvas.width * 0.4 + 8, this.canvas.height / 4 - 8, 5, 5);
            ctx.fill();
            ctx.closePath();
            // game over
            ctx.font = "24px Roboto, sans-serif";
            ctx.fillText("Game Over", this.canvas.width * 0.4 - 30, this.canvas.height * 0.9);
            this.gameOver = true;
            this.lose = true;
            // show the given word
            for (var i = 0; i < this.currentWord.length; i++) {
                Vue.set(this.wordDivs, i, this.currentWord[i]);
            }
        }
        this.guesses++
    },
    // clicked letter checking
    check: function(letter) {
        if (!this.gameOver) {
            var guessCorrect = false;
            // check if word contains the letter
            for (var i = 0; i < this.currentWord.length; i++) {
                if (letter == this.currentWord[i]) {
                    Vue.set(this.wordDivs, i, letter);
                    guessCorrect = true;
                }
            }
            // if no other empty string in the word - you win!
            if (!this.wordDivs.some(function(value) {return value == ""})) {
                this.gameOver = true;
                this.ctx.font = "24px Roboto, sans-serif";
                this.ctx.fillText("You Win!", this.canvas.width * 0.4 - 30, this.canvas.height * 0.9);
            }
            // if guess was incorrect update canvas
            if (!guessCorrect) {
                this.updateCanvas(this.ctx);
            }
        }
    },
    // re-initializes the game
    restart: function() {
        this.gameOver = false;
        this.lose = false;
        this.guesses = 0;
        this.wordDivs.splice(0);
        this.drawGallows(this.ctx);
        this.makeBlanks();
    },
    // chooses a new word and resets the game when 'play again' is clicked
    playAgain: function() {
        this.currentWord = this.words[randomInteger(0, this.words.length - 1)];
        this.restart();
    }
},
// identify the canvas element and initialize it, draw the gallows, choose a word, and draw the blanks.
mounted: function() {
    this.canvas = document.getElementById("board-canvas");
    this.canvas.width = document.getElementById("board").offsetWidth;
    this.canvas.height = document.getElementById("board").offsetHeight;
    this.ctx = this.canvas.getContext("2d");
    this.ctx.lineWidth = 2;
    this.drawGallows(this.ctx);
    this.currentWord = this.words[randomInteger(0, this.words.length - 1)];
    this.makeBlanks();
}
});