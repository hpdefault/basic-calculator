const display = document.getElementById("display");
let array1 = [];
let array2 = [];
let currentArray = 1; // 1 or 2
let arrayMode = 1; // default: single array

function appendToDisplay(input) {
    display.value += input;
}

function clearDisplay() {
    display.value = "";
    array1.length = 0;
    array2.length = 0;
    currentArray = 1;
    updateArrayDisplay();
}

function calculate() {
    try {
        display.value = eval(display.value);
    } catch (error) {
        display.value = "second input missing";
    }
}

function appendToDisplay2(item) {
    if (arrayMode === 1 || currentArray === 1) {
        array1.push(item);
    } else {
        array2.push(item);
    }
    updateArrayDisplay();
}

//>> array select

function switchMode() {
    arrayMode = parseInt(document.getElementById("arrayMode").value);
    currentArray = 1;
    document.getElementById("toggleArrayBtn").style.display = arrayMode === 2 ? "inline-block" : "none";
    clearDisplay(); // reset both arrays when switching mode
}

function updateArrayDisplay() {
    document.getElementById("activeArrayLabel").innerText = `Using: Array ${currentArray}`;

    const basicArrayOutput = (arrayMode === 1)
        ? `Array: ${array1.join(" ")}`
        : `Array 1: ${array1.join(" ")}<br>Array 2: ${array2.join(" ")}`;
    document.getElementById("BasicArray").innerHTML = basicArrayOutput;
    renderSelectableElements();
}

function toggleActiveArray() {
    if (arrayMode === 2) {
        currentArray = currentArray === 1 ? 2 : 1;
        updateArrayDisplay();
    }
}
//<< array select

function sumArray() {
    let sum = 0;

    if (arrayMode === 1) {
        if (array1.length === 0) {
            display.value = "Array empty";
            return;
        }
        sum = array1.reduce((acc, val) => acc + Number(val), 0);
    } else {
        if (array1.length === 0 && array2.length === 0) {
            display.value = "Both arrays empty";
            return;
        }
        sum = [...array1, ...array2].reduce((acc, val) => acc + Number(val), 0);
    }

    display.value = sum;
}

let selectedItems = new Set(); // stores selected values (as strings)

function renderSelectableElements() {
    const container = document.getElementById("selectionArea");
    container.innerHTML = ""; // clear old buttons

    const elements = arrayMode === 1 ? array1 : [...array1, ...array2];

    elements.forEach((val, index) => {
        const btn = document.createElement("button");
        btn.textContent = val;
        btn.style.margin = "2px";
        btn.style.padding = "5px";
        btn.style.border = "1px solid white";
        btn.style.backgroundColor = selectedItems.has(index) ? "lightgreen" : "black";
        btn.style.color = "white";

        btn.onclick = () => {
            if (selectedItems.has(index)) {
                selectedItems.delete(index);
            } else {
                selectedItems.add(index);
            }
            renderSelectableElements();
        };

        container.appendChild(btn);
    });
}

function sumSelected() {
    const elements = arrayMode === 1 ? array1 : [...array1, ...array2];

    if (selectedItems.size === 0) {
        display.value = "No selection";
        return;
    }

    let sum = 0;
    selectedItems.forEach(index => {
        const val = Number(elements[index]);
        if (!isNaN(val)) {
            sum += val;
        }
    });

    display.value = sum;
}

selectedItems.clear();
document.getElementById("selectionArea").innerHTML = "";