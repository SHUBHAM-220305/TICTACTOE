let boxes=document.querySelectorAll(".box");
let resetbtn=document.querySelector(".reset");
let reset=document.querySelector(".reset");
let message=document.querySelector(".message");
let msg=document.querySelector("#msg");
let cnt=0;
let winners=false;

let turnO=true;

const winpatterns=[
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

const resetgame = () => {
    turnO=true;
    enbaleboxes();
    message.classList.add("hide");
    cnt=0;
    winners=false;
}

boxes.forEach((box)=>{
    box.addEventListener("click",()=>{
        if(turnO){
            box.innerText="O";
            turnO=false;
        }
        else{
            box.innerText="X";
            turnO=true;
        }
        box.disabled=true;
        checkwinner();
        checktie();
    });
});

const checktie = () => {
    for(let box of boxes){
        if(box.disabled===true){
            cnt=cnt+1;
            if(winners===false){
                if(cnt===9){
                    msg.innerText=`Tie`;
                    message.classList.remove("hide");
                    disableboxes();
                }
            }
        }
        else{
            cnt=0;
        }
    }
}

const disableboxes = () => {
    for(let box of boxes){
        box.disabled=true;
    }
}

const enbaleboxes = () => {
    for(let box of boxes){
        box.disabled=false;
        box.innerText="";
    }
}

const showwinner = (winner) => {
    msg.innerText=`Congratulations, Winner is ${winner} .`;
    message.classList.remove("hide");
    disableboxes();
}

const checkwinner = () => {
    for(pattern of winpatterns){
        let pos1=boxes[pattern[0]].innerText;
        let pos2=boxes[pattern[1]].innerText;
        let pos3=boxes[pattern[2]].innerText;

        if(pos1!="" && pos2!="" && pos3!=""){
            if(pos1===pos2 && pos2===pos3){
                winners=true;
                showwinner(pos1);
            } 
        }
    }
};

reset.addEventListener("click",resetgame);