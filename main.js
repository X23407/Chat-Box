function paraBox(text,mode,widget){
    let para = document.createElement("p");
    if (mode == "user"){
        para.className = "paraUser";
        lastSender = "user;"
    } else{
        para.className = "paraSystem"
        if (lastSender == "system"){
        }
        lastSender = "system"
    }
    para.innerHTML = text;
    if (widget){
        para.appendChild(widget);
    }
    document.getElementById("para-div").appendChild(para);
}
function distance_calc(dist,mode = "fake"){
    // dist = "dist 56 57 58 59 60 61";
    dist = dist.split(" ");
    newDist = []
    if (dist.length === 7){
        dist.shift();
        for (let num of dist){
            if (Number(num) || Number(num) === 0){
                newDist.unshift(Number(num))
            }else{
                return `"${num}" is not a number, re-enter in proper format <br> *dist x1 y1 z1 x2 y2 z2*`
                console.log("Not a number")
            }}
    }else if (dist.length ===8){
        mode = dist[7]
        dist.splice(7,1);
        console.log(dist)
        dist_real = distance_calc(dist.join(" "),mode);
        return dist_real;
    }
    else {
        return `"Not in correct format, re-enter in proper format <br> *dist x1 y1 z1 x2 y2 z2*`
    }
    
    let x_diff =  newDist[5] - newDist[2];
    let y_diff = newDist[1] - newDist[4];
    let z_diff = newDist[0] - newDist[3];
    if (mode == "fake"){
        dist_real = Math.abs(x_diff) + Math.abs(z_diff);
        dist_real = `${dist_real}. Time : ${dist_real/8}`
    }else{
        dist_real = Math.hypot(x_diff,y_diff,z_diff);
    }
    return `Dist between the two point ${dist.join(" ")} is ${dist_real}`    
}

function linker(userInput = "link map") {
    // userInput = "am"
    userInput = userInput.trim();
    userInput = userInput.split(" ");
    userInput.shift();
    userInput = userInput.join(" ");
    console.log(userInput)
    let linkObj =  {
        "map-advance" : "https://x23407.github.io/Map-advance/",
        "flashcard" : "https://x23407.github.io/FlashCard/",
        "name-normal" : "https://x23407.github.io/Name-normal/",
        "name-Expansion" : "https://x23407.github.io/Name-Expansion/",
        "map" : "https://x23407.github.io/Map/"
    }
    let avail_optn = {}
    console.log(Object.keys(linkObj))
    let text = ""
    for (let key of Object.keys(linkObj)){
        if (key.includes(userInput)){
            avail_optn[key] = linkObj[key]
        }
    }
    if (Object.keys(avail_optn).length == 1){
        text += `Here is the link for your search ${userInput}`;
    } else if(Object.keys(avail_optn).length == 0){
        text += `No link for ${userInput} was found`;
    } else {
        text += `Total ${Object.keys(avail_optn).length} result was found for your query "${userInput}"`;
    }
    let para = document.createElement("p");
    para.className = "paraSystem"
    lastSender = "system"
    para.innerHTML = text;

    //adding link
    for (let key in avail_optn){
        let value = avail_optn[key];//https://www.youtube.com/
        let header = document.createElement("span");
        header.style.fontWeight = "bold"
        header.innerHTML = `<br><br>>> ${key}<br>`
        para.appendChild(header)
        let widget = document.createElement("span");
        widget.style.color = "blue";
        widget.onclick = function(){
            window.open(value,"_blanc")
        }
        widget.innerHTML = `${value}`;
        para.appendChild(widget);
    }
    
    text += "<br> https//x23407.github.io/Name-normal/"
    console.log(avail_optn)
    console.log(Object.keys(avail_optn).length)
    document.getElementById("para-div").appendChild(para);
    // if (avail_optn.length)

}
var state = "greet";
let lastSender = "system"
function handler(userInput = "Dummy"){
    userInput =userInput.toLowerCase();
    if (userInput.toLowerCase() === "help"){
        console.log("triggering help");
        paraBox(`
            TYPE <br>
            1.Help: To get Help<br>
            2.Restart: To Restart<br>
            3.Info: To get Info About me!<br>
            4.Calculator : Type normal expression like 25*5 and see the magic! <br>
            5.Link searcher : Search link name_to_search <br>
            6.age calculator : type "age DD-MM-YYYY" , for example age 18-07-2007 
            `)
            
        return
    } else if (userInput.toLowerCase() === "info"){
        paraBox(`
            this is just a demo for a chat box. Feel free to give your feedback, but unfornuately i cant remember your feedback!`)
            return
    }else if(userInput.toLowerCase() === "restart"){
        state = "greet";
        handler();
        return
    } else if(userInput.includes("dist")){
        paraBox(`${distance_calc(userInput)}`)
        return;
    }else if(userInput.includes("link")){
        linker(userInput);
        return
        // paraBox()
    }else if (userInput.includes("age ")){
        userInput = userInput.split(" ");
        state = "ageCalc";
        handler(userInput[1])
        return
    }else{
        try {
            let text = eval(userInput);
            if (text == userInput || !userInput || state == "ageCalc"){
                throw new Error("A solo number")
            }
            paraBox(eval(userInput))
            return
        }
        catch (error){
        }        
    }
    console.log(userInput.toLowerCase())
    switch (state){
        case "greet":
            paraBox("Hi,What your name?","system");
            state = "askname";
            break;
        case "askname":
            let name = userInput;
            paraBox(`Hello ${userInput},What your hobby?`,"system");
            state = "hobby";
            break;
        case "hobby":
            let hobbies = ["play","danc","music","sing","sport","read","write","cook","art","paint","sketch","cod"];
            userInput = userInput.toLowerCase()
            for (let hobby of hobbies){
                if (userInput.includes(hobby)){
                    paraBox(`${hobby}ing is a great hobby! Would you like to know about my hobby?`)
                    state = "aiHobby"
                    return;
                }}
            paraBox(
                `Can you explain me you hobby in deatils? I did't understood it <br><br> '${userInput}'`
            )
            state = "validateHobby"
            return
        case "aiHobby":
            let valid = ["yes","yup"]
            for (let optn of valid){
                if (userInput.includes(optn)){
                    paraBox(
                        `Thanks for asking!!!<br> My hobby is to talk to awesome people like you.`
                    )
                    state = "bdayAsker";
                    handler("dsdm")
                    return
                }
            }
            paraBox("Not a big deal! Have a nice day.");
            paraBox("ohh wait!");
            state = "bdayAsker";
            handler("dsdm")
            break;
        case 'validateHobby':
            if (userInput.length >= 15){
                paraBox("Thanks For explaining it to me ,I know got to know about it(a little bit!)<br>Would you like to know about my hobby?");
                state = "aiHobby";
                return
            } else {
                paraBox("Never Mind, would you like to know about my hobby?");
                state = "aiHobby";
                break
            }
        case 'bdayAsker':
            let bday = document.createElement("input")
            bday.type = "date"
            bday.style.backgroundColor = "antiquewhite";
            bday.style.borderRadius = "10px"
            bday.onchange = function(){
                handler(bday.value);
            }
            paraBox(
                `What your birth date. Either type in format DD-MM-YYYY or feel free to use the below box <br>
                `,"1",bday)
            state = "ageCalc";
            break;
        case 'ageCalc':
            if (userInput.length  < 10){
                paraBox("Enter your bday in proper format")
                return

            }
            userInput = userInput.split("-");
            if (userInput.length ===3){
                if (userInput[0].length ==4){
                    userInput = userInput.join("-")
                }else if (userInput[0].length ==2){
                    userInput =userInput[2]+ "-" + userInput[1] + "-" + userInput[0];
                }
            }
            let bday_real = new Date(userInput)
            console.log(userInput)
            let now = new Date();
            if (bday_real.getDate() === now.getDate() && bday_real.getMonth() == now.getMonth()){
                paraBox(`Happy Birthday Buddy!!!`)
            }
            let age = now.getFullYear() - bday_real.getFullYear();
            if (now.getMonth() - bday_real.getMonth() < 0 || (now.getMonth() - bday_real.getMonth() == 0 && now.getDate()- bday_real.getDate()<0)){
                age --;
            }
            paraBox(`Your age is ${age}`)
            if (age <0){
                paraBox(`Wow you are from future!!!,<br>What a great man who is alive before being birth.`)
            }else if (age == 0){
                paraBox(`Comepition has really became hard, a child who is just born know How to type!!!`)
            }
            state = "end"
        case "end":
            paraBox(`The program has ended here (sadly)....`)
    }
}
function intro(){
    paraBox("Hi, Whats your name?","system")
}


handler(state)
let userInput = document.createElement("textarea");
userInput.id = "uInput";
userInput.className = "user-input";
userInput.type = "text";
document.getElementById("input-div").appendChild(userInput);
userInput.placeholder = "Type your message here..."
userInput.addEventListener("keypress",(event) =>
{
    if (event.key === "Enter"){
        event.preventDefault();
        paraBox(userInput.value,"user");
        // state = "askname";
        handler(userInput.value);
        // paraBox("Whats your hobby???","system")
        userInput.value = "";
        // userInput.value = "link name"
    }
})
// userInput.value = "link name"

// linker()
