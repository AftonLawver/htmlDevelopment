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
        if (counter == 3) {
            document.querySelector("#canvas").addEventListener("click", function(event) {
                document.getElementById("clicks").innerHTML = "Sorry no more clicks";
                for (const [key, value] of Object.entries(dict)) {
                    var intKey = parseInt(key);
                    var intValue = parseInt(value);
                    ctx.fillStyle = 'blue';
                    ctx.beginPath();
                    ctx.arc(intKey, intValue, 50, 0, Math.PI * 2);
                    ctx.fill();
                }
            });
        }
    });
    canvas.addEventListener('mousemove', function(event) {
        var mouseX = event.clientX - rect.left.toFixed();
        var mouseY = event.clientY - rect.top.toFixed();
        var status = document.getElementById('status');
        status.innerHTML = mouseX + " | " + mouseY;
    });
}

function drawShapes() {
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    for (const [key, value] of Object.entries(dict)) {
        var intKey = parseInt(key);
        var intValue = parseInt(value);
        ctx.fillStyle = 'blue';
        ctx.beginPath();
        ctx.arc(intKey, intValue, 50, 0, Math.PI * 2);
        ctx.fill();
    }


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





