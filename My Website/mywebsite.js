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
        alert("Please enter a valid email address.")
        document.getElementById('email').focus();
        return false;
    }else {
        return true;
    }
}

function scrollToTop() {
    window.scrollTo(0, 0);
}

function showCanvasGameBoard() {
    var canvasBoard = document.getElementById('canvas')
    canvasBoard.style.visibility = 'visible';
}

function showCanvasGameInstructions() {
    var canvasInstructions = document.getElementById('canvas-instructions')
    canvasInstructions.style.visibility = 'visible';
}

function getMousePosition(event) {
    guessX = 0;
    guessY = 0;
    var x = event.offsetX;
    var y = event.offsetY;
    guessX = x;
    guessY = y;
    document.write();
    document.write('<FONT COLOR="white">', guessX, guessY);

}


