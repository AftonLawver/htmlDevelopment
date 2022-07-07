function submitForm() {
    if (validateName() && validateEmail()) {
        document.getElementById("paragraph").innerHTML = "Form submitted.";
    }
}

function validateName() {
    var regName = /^[a-zA-Z]+ [a-zA-Z]+$/;
    var name = document.getElementById('name').value;
    if(!regName.test(name)) {
        alert('Please enter your full name (first & last name).');
        document.getElementById('name').focus();
        return false;
    }else {
        return true;
    }
}

function validateEmail() {
    var regEmail = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
    var emailAddress = document.getElementById('email').value;
    if (!regEmail.test(emailAddress)) {
        alert("Please enter a valid email address.");
        document.getElementById('email').focus();
        return false;
    }else {
        return true;
    }
}

function scrollToTop() {
    window.scrollTo({top: 0, behavior: 'smooth'});
}

var dict = {};
var counter = 0;

function showCanvasGameBoard() {
    iterations = 0;

    const canvas = document.getElementById('canvas');
    canvas.style.visibility = 'visible';

    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth * 0.4;
    canvas.height = window.innerHeight * 0.4;

    window.addEventListener('resize', function() {
        canvas.width = window.innerWidth * 0.4;
        canvas.heigth = window.innerHeight * 0.4;
    });
    const mouse = {
        x: null,
        y: null,
    };
    var rect = canvas.getBoundingClientRect();

    canvas.addEventListener('click', function(event){
        mouse.x = event.x - rect.left.toFixed();
        mouse.y = event.y - rect.top.toFixed();
        var status = document.getElementById('status');
        status.innerHTML = mouse.x + " | " + mouse.y;
        storeCoordinate(mouse.x, mouse.y, dict);
        counter ++;
        document.getElementById("clicks").innerHTML = counter;
        if (counter == 4) {
            event.stopImmediatePropagation();
            document.getElementById("clicks").innerHTML = "Sorry no more clicks";
            for (const [key, value] of Object.entries(dict))
            {

                var intKey = parseInt(key);
                var intValue = parseInt(value);
                drawShape(key, value);
                iterations++;
                if (iterations == 4) {
                    document.getElementById("clicks").innerHTML = "Broke out of for loop.";
                    break;

                }

                // figure out how to save all values of shapes (color, stroke color, x, y, width, height, etc).
            }
            //save the canvas
        }
    });

    canvas.addEventListener('click', clickEffect);

    canvas.addEventListener('mousemove', function(event) {
        var mouseX = event.clientX - rect.left.toFixed();
        var mouseY = event.clientY - rect.top.toFixed();
        var status = document.getElementById('status');
        status.innerHTML = mouseX + " | " + mouseY;
    });
}

function copyCanvas() {
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    var imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    ctx.putImageData()
}

function saveCanvas() {
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    var imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
}

function pasteCanvas(image) {
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    ctx.putImageData(image, 0, 0);
}

function drawShape(x,y) {
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');

    chooseColor();
    var shape = Math.floor(Math.random() * 6) + 1;
    document.getElementById('points').innerHTML = shape;
    if (shape == 1) {
        // line
        ctx.beginPath();
        ctx.moveTo(x,y);
        ctx.lineTo(Math.floor(Math.random() * 200), Math.floor(Math.random() * 200));
        ctx.lineWidth = 8;
        ctx.stroke();
    }
    else if (shape == 2) {
        // oval
        ctx.beginPath();
        ctx.ellipse(x, y, 50, 80, Math.PI/4, 0, 2 * Math.PI);
        ctx.fill();
    }
    else if (shape == 3) {
        // rectangle
        ctx.fillRect(x, y, 100, 72);
    }
    else if (shape == 4) {
        // circle
        ctx.beginPath();
        ctx.arc(x, y, 50, 0, Math.PI * 2);
        ctx.fill();
    }
    else if (shape == 5) {
        // triangle
        ctx.beginPath();
        ctx.moveTo(100,100);
        ctx.lineTo(150, 150);
        ctx.lineTo(50, 150);
        ctx.lineTo(100,100);
        ctx.fill();
    }

    else if (shape == 6) {
        // square
        ctx.fillRect(x, y, 5, 50);
    }

}

function chooseColor() {
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    const randomColor = Math.floor(Math.random() * (7 - 1 + 1)) + 1; //random number between 1-7
    let color="red";
    if (randomColor === 1)
    {
        //keep default color
    }
    else if (randomColor === 2)
    {
        color="yellow";
    }
    else if (randomColor === 3)
    {
        color="orange";
    }
    else if (randomColor === 4)
    {
        color="green";
    }
    else if (randomColor === 5)
    {
        color="cyan";
    }
    else if (randomColor === 6)
    {
        color="blue";
    }
    else {
        color="purple";
    }
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
}

function hidePlayButton() {
    const playButton = document.getElementById('play-button');
    playButton.hidden = true;
}

function showRestartButton() {
    const restartButton = document.getElementById('restart-button');
    restartButton.style.visibility = "visible";
    restartButton.hidden = false;
}

function showStopButton() {
    const stopButton = document.getElementById('stop-button');
    stopButton.style.visibility = "visible";
    stopButton.hidden = false;
}

function showPlayButton() {
    const playButton = document.getElementById('play-button');
    playButton.hidden = false;
    document.getElementById('stop-button').hidden = true;
    document.getElementById('restart-button').hidden = true;

}

function clearCanvas() {
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth * 0.4;
    canvas.height = window.innerHeight * 0.4;
    ctx.clearRect(0 , 0, canvas.width, canvas.height);
}

function stopGame() {
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    showPlayButton();
    clearCanvas();
    counter = 0;

}

function clickEffect(e){
    var d=document.createElement("div");
    d.className="clickEffect";
    d.style.top=e.clientY+"px";d.style.left=e.clientX+"px";
    document.body.appendChild(d);
    d.addEventListener('animationend',function(){d.parentElement.removeChild(d);}.bind(this));
}


// function showCanvasGameBoard() {
//
//
//     var canvasBoard = document.getElementById('canvas');
//     canvasBoard.style.visibility = 'visible';
//     var ctx = canvasBoard.getContext('2d');
//     var BB = canvasBoard.getBoundingClientRect();
//
//
//
//     canvasBoard.addEventListener('click', function(event) {
//         var mouseX = event.clientX - BB.left.toFixed();
//         var mouseY = event.clientY - BB.top.toFixed();
//         var status = document.getElementById('status');
//         status.innerHTML = mouseX+" | "+mouseY;
//         // storeCoordinate(mouseX, mouseY, dict);
//         drawShape(mouseX, mouseY);
//     });
// }

// function drawShape(xCoordinate, yCoordinate) {
//     var canvas = document.getElementById("canvas");
//     var ctx = canvas.getContext("2d");
//     ctx.strokeStyle = 'orange';
//     ctx.strokeRect(xCoordinate, yCoordinate, 30, 30);
//         // ctx.fillRect(xCoordinate-15, yCoordinate-15, 30, 20);
// }

function storeCoordinate(xVal, yVal, dict) {
    dict[xVal] = yVal;
}

function getCoordinates(dict) {
    for (const [key, value] of Object.entries(dict)) {
        document.getElementById("points").innerHTML = key+", "+value;
    }
}


function showCanvasGameInstructions() {
    var canvasInstructions = document.getElementById('canvas-instructions');
    canvasInstructions.style.visibility = 'visible';
}





