let TABLE = document.getElementById("table");
let SECOND = document.getElementById("second");
let DIV_MESSAGE = document.getElementById("displayMessageBox");
eventlisteners();
let array_index = [1, 2, 3, 4, 5, 6, 7, 8, 1, 2, 3, 4, 5, 6, 7, 8];
let array_names = ["bird", "lyon", "bunny", "snake", "chicken", "dog", "cat", "horse"];
let clickCount = 2;
let clicked_id_array = [];
let clicked_row_array = [];
let second = 60;
let WIN = 0;
let isTrue = false;

function eventlisteners() {
    window.addEventListener("DOMContentLoaded", shuffleArray);
    TABLE.addEventListener("click", tableController)
}

function shuffleArray() {
    console.log(array_index.sort(() => (Math.random() > .5) ? 1 : -1))
    setTimeout(() => {
        showIMG();
    }, 1000)

}

function showIMG() {

    for (let j = 0; j < 4; j++) {
        Array.from(TABLE.children[j].children).forEach(item => {
            let img = array_names[array_index[parseInt(item.id) - 1] - 1]
            item.style.backgroundImage = `url('./../img/${img}.jpg')`;

        })
    }
    setTimeout(clearIMG, 1500)
    setInterval(timeController, 1000)
}

function clearIMG() {
    for (let j = 0; j < 4; j++) {
        Array.from(TABLE.children[j].children).forEach(item => {
            item.style.backgroundImage = "";
        })
    }
    clickCount = 0;
}

function timeController() {
    if (second > 0) {
        SECOND.textContent = second;
        second -= 1;
    } else {
        UI.displayMessage("alert-danger", "You Lose!", DIV_MESSAGE)
        second = 10;
        setTimeout(() => {
            window.history.go(0);
        }, 200)
    }
}

function tableController(e) {
    let click = e.target;
    let id = parseInt(click.id); //DIV_ID
    let img = array_names[array_index[id - 1] - 1];  //IMG_NAME
    let rowId = parseInt(click.parentElement.id[4])
    if(TABLE.children[rowId - 1].children){
        if (click.style.backgroundImage === "" && (clickCount === 0 || clickCount === 1) && WIN < 7) {
            clickCount += 1;
            clicked_id_array.push(id);
            clicked_row_array.push(rowId);

            Array.from(TABLE.children[rowId - 1].children).forEach(item => {
                if (parseInt(item.id) === id) {
                    item.style.backgroundImage = `url('./../img/${img}.jpg')`;
                }
            })
            if (clickCount === 2) {
                setTimeout(() => {
                    checkBackgroundController(clicked_id_array, clicked_row_array)
                }, 300)
            }
        }
    }


}

function checkBackgroundController(paramsID, paramsROW) {
    let row_1 = paramsROW[paramsROW.length - 1] - 1;
    let row_2 = paramsROW[paramsROW.length - 2] - 1;
    let id_1 = paramsID[paramsID.length - 1];
    let id_2 = paramsID[paramsID.length - 2];

    checkIMG(row_1, row_2, id_1, id_2)

    if (isTrue) {
        isTrue = false;
        clickCount = 0;
        WIN += 1;
        if (WIN === 7) {
            winCondition()
        }
    } else {
        clickCount = 0;
        clearBackground(row_1, id_1)
        clearBackground(row_2, id_2)
    }
}


function winCondition() {
    for (let i = 0; i < 4; i++) {
        Array.from(TABLE.children[i].children).forEach(item => {
            if (item.style.backgroundImage === "") {
                let img = array_names[array_index[parseInt(item.id) - 1] - 1]
                item.style.backgroundImage = `url('./../img/${img}.jpg')`;
            }
        })
    }
    setTimeout(() => {
        UI.displayMessage("alert-success", "You Win!", DIV_MESSAGE)
        setTimeout(() => {
            window.history.go(0);
        }, 2000)
    }, 1000)
}

function checkIMG(row_1, row_2, id_1, id_2) {
    let bg_1, bg_2;
    bg_1 = setBackground(row_1, id_1);
    bg_2 = setBackground(row_2, id_2)

    if (bg_1 === bg_2) isTrue = true;
}

function setBackground(row, id) {
    let bg
    Array.from(TABLE.children[row].children).forEach(item => {
        if (parseInt(item.id) === id) {
            bg = item.style.backgroundImage
        }
    })
    return (bg);
}


function clearBackground(row, id) {
    Array.from(TABLE.children[row].children).forEach(item => {
        if (parseInt(item.id) === id) {
            item.style.backgroundImage = ""
        }
    })
}