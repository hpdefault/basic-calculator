const display = document.getElementById("display");


function appendToDisplay(input){
    display.value += input;
}

function clearDisplay(){
    display.value = "";
    arrAppend = [];
    document.getElementById("BasicArray").innerHTML = "";
}

function calculate(){
    try{
        display.value = eval(display.value);
    }
    catch(error){
        display.value = "second input missing"
    }
}



var arrAppend = [];
function appendToDisplay2(item) {
    arrAppend.push(item);
    document.getElementById("BasicArray").innerHTML = arrAppend;
}

function sumArray() {
    if (arrAppend.length === 0) {
        display.value = "Array empty";
        return;
    }
    // Convert strings to numbers and sum
    const sum = arrAppend.reduce((acc, val) => acc + Number(val), 0);
    display.value = sum;
}