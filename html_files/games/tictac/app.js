let boxes= document.querySelectorAll(".box");
let resetBtn= document.querySelector("#reset-btn");
let playAgainBtn = document.querySelector("#play-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");

let turnO = true; //player X , player O

const winPatterns = [
    [0,1,2],
    [0,3,6],
    [0,4,8],
    [1,4,7],
    [2,5,8],
    [2,4,6],
    [3,4,5],
    [6,7,8]
];

const resetGame = () => {
    turnO = true;
    enableBoxes();
    msgContainer.classList.add("hide");
}

boxes.forEach((box) =>{
    box.addEventListener("click", () =>{
        console.log("box was clicked");
        if(turnO) {
            box.innerText = "O"
            turnO= false;
        }
        else{
            box.innerText = "X"
            turnO= true;
        }
        box.disabled = true;
        CheckWinner();
    })
})

const disableBoxes = () => {
    for (let box of boxes){
        box.disabled = true;
    }
}
const enableBoxes = () => {
    for (let box of boxes){
        box.disabled = false;
        box.innerText = "";
    }
}

const showWinner = (winner) => {
    msg.innerText = `Congratulations, Winner is ${winner}`;
    msgContainer.classList.remove("hide");
    disableBoxes();
}


const CheckWinner = () =>{
    for (let a of winPatterns){
        let pos1Val = boxes[a[0]].innerText;
        let pos2Val = boxes[a[1]].innerText;
        let pos3Val = boxes[a[2]].innerText;
       
        if (pos1Val != "" && pos2Val != "" && pos3Val != "") {
            if (pos1Val == pos2Val && pos2Val == pos3Val){
                console.log("WINNER", pos1Val);
                showWinner(pos1Val);
            }
        }
    }
        // console.log( a[0], a[1], a[2]);
        // console.log( 
        //     boxes[a[0]].innerText, 
        //     boxes[a[1]].innerText, 
        //     boxes[a[2]].innerText
        // );
}

playAgainBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);