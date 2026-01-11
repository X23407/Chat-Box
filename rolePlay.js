function rolePlay(){
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
            let hobbies = ["play","danc","music","sing","sport","read","writ","cook","art","paint","sketch","cod","video edit","edit"];
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
            let valid = ["yes","yup",'yeah','defin']
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
                state = "ageCalc";
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
            break
        case "end":
            paraBox(`The program has ended here (sadly)....`)
            paraBox("If you need any help from me just type 'help' ")
    }
}

function matchMaker(phrase){
    phrase = phrase.toLowerCase();
    phrase = phrase.split(" ")
    if (phrase.includes("dict")){
        //removing dict from list
        // phrase.splice(phrase.indexOf("dict"),1)
        // phrase.remove()
        // console.log(phrase);
        
        let activeClass = new dictDictHandler();
        activeClass.intitiater(phrase)
        // paraBox(activeClass.intitiater(phrase));
        return true
    }
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

async function pkmnDetail(pkmn) {
    try{
        pkmn = pkmn.split(" ")[1];
        let response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pkmn}`);
        // let response = await fetch(`https://pokeapi.co/api/v2/ability/imposter`);
        let data = await response.json();
        if (!response.ok){
            throw new Error("No such pokemon exist")
        }
        let para = document.createElement("p");
        para.className = "paraSystem";
        para.innerHTML = `The detail about <span class="code">${pkmn}</span> is here below..`;
        lastSender = "system";
        let label = document.createElement("h3");
        label.innerHTML = pkmn;
        label.style.textAlign = "center"
        para.appendChild(label)
        let img = document.createElement("img");
        img.src = data['sprites']["front_default"] 
        img.style.marginLeft = "2vw"
        img.style.border = "solid 2px black"
        img.style.marginBottom = "3vh"
        para.appendChild(img)
        let img2 = document.createElement("img");
        img2.style.border = "2px solid black";
        img2.src =  data['sprites']["front_shiny"]
        img2.style.marginLeft = "2vw"
        img2.style.marginBottom = "3vh"
        para.appendChild(img2);
        // let detailDiv = document.createElement("div");
        // detailDiv.style.border = "solid 2px black";
        // detailDiv.style.maxWidth = "30vw"
        // para.appendChild(detailDiv)


        document.getElementById("para-div").appendChild(para);
        console.log(data)
    }catch(error){
        let para = document.createElement("p");
        para.className = "paraSystem";
        para.innerHTML = `No pokemon with name <span class = "code">'${pkmn}'</span> exist!`
        document.getElementById("para-div").appendChild(para);

    }
    
}

function personalInfo(userInput = "pinfo github") {
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
        "map" : "https://x23407.github.io/Map/",
        "typefast" : "https://x23407.github.io/TypeFast/index.html",
        "html notes" :"https://x23407.github.io/HTML-Notes/",
        "array practices" : "https://x23407.github.io/array-practice/",
        "to so web" : "https://to-do-7845b.web.app/"
    }
    let avail_optn = {}
    console.log(Object.keys(linkObj))
    let text = ""
    for (let key of Object.keys(linkObj)){
        if (key.includes(userInput)){
            avail_optn[key] = linkObj[key]
        }
    }
    // if (userInput == ""){
    //     userInput = "_";
    // }
    if (Object.keys(avail_optn).length == 1){
        text += `Here is the link for your search <span class="code">${userInput}</span>`;
    } else if(Object.keys(avail_optn).length == 0){
        text += `No link for ${userInput} was found`;
    } else if(userInput == ""){
        text += `Total ${Object.keys(avail_optn).length} links are available `;
    } else {
        text += `Total ${Object.keys(avail_optn).length} result was found for your query <span class="code">${userInput}</span>`;
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
        let widget = document.createElement("a")
        widget.href = value;
        widget.innerHTML = value;
        widget.style.color = "blue";
        widget.onclick = function(event){
            event.preventDefault();
            window.open(value,"_blanc")
        }
        para.appendChild(widget)
    }
    
    text += "<br> https//x23407.github.io/Name-normal/"
    console.log(avail_optn)
    console.log(Object.keys(avail_optn).length)
    document.getElementById("para-div").appendChild(para);
    // if (avail_optn.length)

}
function linker(userInput = "link map") {
    // userInput = "am"
    userInput = userInput.trim();
    userInput = userInput.split(" ");
    userInput.shift();
    userInput = userInput.join(" ");
    console.log(userInput)
    let linkObj =  {
        "github" : "https://github.com/x23407",
        "linkedin" : "https://www.linkedin.com/in/yatish-kumar-ray-9a6577390/",
    }
    let avail_optn = {}
    console.log(Object.keys(linkObj))
    let text = ""
    for (let key of Object.keys(linkObj)){
        if (key.includes(userInput)){
            avail_optn[key] = linkObj[key]
        }
    }
    // if (userInput == ""){
    //     userInput = "_";
    // }
    if (Object.keys(avail_optn).length == 1){
        text += `Here is the link for your search <span class="code">${userInput}</span>`;
    } else if(Object.keys(avail_optn).length == 0){
        text += `No link for ${userInput} was found`;
    } else if(userInput == ""){
        text += `Total ${Object.keys(avail_optn).length} links are available `;
    } else {
        text += `Total ${Object.keys(avail_optn).length} result was found for your query <span class="code">${userInput}</span>`;
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
        let widget = document.createElement("a")
        widget.href = value;
        widget.innerHTML = value;
        widget.style.color = "blue";
        widget.onclick = function(event){
            event.preventDefault();
            window.open(value,"_blanc")
        }
        para.appendChild(widget)
    }
    
    text += "<br> https//x23407.github.io/Name-normal/"
    console.log(avail_optn)
    console.log(Object.keys(avail_optn).length)
    document.getElementById("para-div").appendChild(para);
    // if (avail_optn.length)

}

