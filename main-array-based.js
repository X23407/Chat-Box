function paraBox(text,mode){
    let para = document.createElement("p");
    if (mode == "system"){
        para.className = "paraSystem";
    } else{
        para.className = "paraUser"
    }
    para.innerHTML = text;
    document.getElementById("para-div").appendChild(para);
}
function intro(){
    paraBox("Hi, Whats your name?","system")
}
intro()
let i = 0;
const List = [
    "What's Your name",
    "What a nice name,What is your hobby",
    "intresting!, My hobby is to waste user time!"
]
// paraBox("Test")
// let para = document.createElement("p");
// para.innerHTML = `
//     This is a javascript generated paragraph...
//     This is a mutable text. This can be generated using java script.`;
// para.className = "paraSystem"
// document.getElementById("para-div").appendChild(para);

// let userPara = document.createElement("p");
// userPara.innerHTML = `
//     This is a demo of user side link for message. It is alos generated
//     using javascript!`
// userPara.className = "paraUser";
// document.getElementById("para-div").appendChild(userPara)

let userInput = document.createElement("textarea");
userInput.id = "uInput";
userInput.className = "user-input";
userInput.type = "text";
document.getElementById("input-div").appendChild(userInput);
userInput.placeholder = "Type your message here..."
userInput.addEventListener("keyup",(event) =>
{
    if (event.key === "Enter"){
        paraBox(userInput.value);
        i ++;
        paraBox(List[i],"system");
        // paraBox("Whats your hobby???","system")
        userInput.value = "";
    }
})


// Sdocument.body.appendChild(para)
// document.body.appendChild(para)