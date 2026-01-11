class main{
    constructor(){
        this.u = new utility()
        this.curIndex = -1; 
        this.history = JSON.parse(localStorage.getItem("history")) || ["cd name"]
        this.textArea = document.getElementById("uInput")
        this.textArea.addEventListener("keydown",(event) =>
        {
            if (event.key === "Enter" && !event.shiftKey){
                event.preventDefault();
                if (this.textArea.value == ""){
                    return;
                }
                let text = this.textArea.value;
                text = text.split('\n')
                text = text.join('<br>')
                this.u.paraBox(text,"user");
                this.handler(text);
                this.textArea.style.height = `${2}lh`;
                if (this.textArea.value !== this.history[0]){
                    this.history.unshift(this.textArea.value)
                    if(this.history.length>5){
                        this.history.pop()
                        // alert("poping")
                    }
                    localStorage.setItem("history",JSON.stringify(this.history))
                    this.curIndex = -1;
                }
                this.textArea.value = "";
            }
            else if (event.key === "Enter" && event.shiftKey){
                this.textArea.style.height = `${this.textArea.scrollHeight+20}px`;
            }else if(event.key == "ArrowUp"){
                // alert(adf)
                event.preventDefault()
                if (this.curIndex+1 > this.history.length-1) return;
                this.curIndex ++;
                let up = this.history[this.curIndex]
                this.textArea.value = up;
            }else if(event.key == "ArrowDown"){
                // alert(adf)
                event.preventDefault()
                this.curIndex --;
                if (this.curIndex <0){
                    this.curIndex = 0;
                } 
                let up = this.history[this.curIndex]
                this.textArea.value = up;
                // event.preventDefault()
            }
        })

        //giving a greeting
        this.simulate()

    }

    greeter(){
        let name = localStorage.getItem("name") || "Yatish";
        this.u.paraBox(`Hello ${name}!`)
    }

    cleaner(){
        let div = document.getElementById("para-div")
        console.log(div.children)
        while (div.childElementCount){
            div.children[0].remove();
        }
        this.greeter();
    }

    ageCalculator(text){
        let p = /^\d{2,4}[-/]{1}\d{2}[-/]{1}\d{2,4}$/
        if (!p.test(text)){
            this.u.paraBox(`
                Enter your Birthday in proper format <br>
                <span class="code">dd-mm-yyyy</span> or 
                <span class="code">yyyy-mm-dd</span> <br>`)
                return
        }
            text = text.split("-");
            if (text.length ===3){
                if (text[0].length ==4){
                    text = text.join("-")
                }else if (text[0].length ==2){
                    text =text[2]+ "-" + text[1] + "-" + text[0];
                }
            }
            
            let bday_real = new Date(text)
            console.log(text)
            let now = new Date();
            if (bday_real.getDate() === now.getDate() && bday_real.getMonth() == now.getMonth()){
                this.u.paraBox(`Happy Birthday Buddy!!!`)
            }
            let age = now.getFullYear() - bday_real.getFullYear();
            let month = now.getMonth() - bday_real.getMonth();
            let day = now.getDate() - bday_real.getDate();
            if (now.getMonth() - bday_real.getMonth() < 0 || (now.getMonth() - bday_real.getMonth() == 0 && now.getDate()- bday_real.getDate()<0)){
                age --;
                month += 12;
            }
            if (day < 0){
                month --;
                day += 30;
            }
            let days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]
            let week_day = days[bday_real.getDay()]
            this.u.paraBox(`Your age is ${age} year ${month} Month and ${day} days<br>You were born on<span class='code'> ${week_day}</span>.`)
            if (age <0){
                this.u.paraBox(`Wow you are from future!!!,<br>What a great man who is alive before being birth.`)
            }else if (age == 0){
                this.u.paraBox(`Comepition has really became hard, a child who is just born know How to type!!!`)
            }
    }

    week_day(text){
        let p = /^\d{2,4}[-/]{1}\d{2}[-/]{1}\d{2,4}$/
        if (!p.test(text)){
            this.u.paraBox(`
                Enter your date in proper format <br>
                <span class="code">dd-mm-yyyy</span> or 
                <span class="code">yyyy-mm-dd</span> <br>`)
                return
        }
        let og = text;
        text = text.split("-");
        if (text.length ===3){
            if (text[0].length ==4){
                text = text.join("-")
            }else if (text[0].length ==2){
                text =text[2]+ "-" + text[1] + "-" + text[0];
            }
        }
        
        let date = new Date(text)
        let days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]
        let week_day = days[date.getDay()]
        this.u.paraBox(`The day on <span class='code'> ${og}</span> is <span class='code'> ${week_day}</span>.`)
    }

    today(){
        let today = new Date()
        let date = `${today.getDate()}-${today.getMonth()+1}-${today.getFullYear()}`
        let days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]
        let week_day = days[today.getDay()]
        this.u.paraBox(`The date is <span class='code'> ${date}</span> and the day is <span class='code'> ${week_day}</span>.`)
        console.log(date)
    }


    simulate(){
        console.log(this.history);
        let history = []
        for (let i=0;i<this.history.length;i++){
            if (this.history[i] == "clear") break;
            history.push(this.history[i]);
        }
        // count = 4;
        console.log(history);
        if (history.length == 0){
            this.greeter();
            return;
        }
        let limit = history.length -1
        for (let i=0;i<=limit;i++){
            let text = history[limit - i]
            // text = text.split('\n')
            // text = text.join('<br>')
            this.u.paraBox(text,"user");
            this.handler(text);
        }
    }

    changeName(newName){
        let name = newName.split(" ")
        if (name.length <3){
            this.u.paraBox(`Enter name in proper format<br><br> cd name <b>NewName</b><br>
                <br> cd name -i <b>NewName</b> <br>`)
            return
        }
        if (name[2] == "-i"){
            let lastname = localStorage.getItem("name")
            localStorage.setItem("name",name[3])
            // localStorage.setItem("name",name)
            this.u.paraBox(`Name succesfully changed from ${lastname} to <b>${name[3]}</b>`)
        }else{
            name = name[2]
            name = name[0].toUpperCase() + name.substring(1,name.length).toLowerCase()
            let lastname = localStorage.getItem("name")
            localStorage.setItem("name",name)
            this.u.paraBox(`Name succesfully changed from ${lastname} to <b>${name}</b>`)
        }
    }

    handler(userInput = "Dummy"){
        // userInput =userInput.toLowerCase();
        if (userInput.toLowerCase() === "help"){
            console.log("triggering help");
            this.u.paraBox(`
                <div class = "heading">
                TYPE
                </div>
                <ul style="list-style:none; padding:0; font-family:Arial, sans-serif; font-size:16px; line-height:1.6;">
                <li><b>1. Help :</b> <span style="color:#16a085;">To get Help</span></li>
                <li><b>2. Clear :</b> <span style="color:#16a085;">To Restart</span></li>
                <li><b>3. Info :</b> <span style="color:#16a085;">To get Info About me!</span></li>
                <li><b>4. Calculator :</b> <span style="color:#16a085;">Type normal expression like <code>25*5</code> and see the magic!</span></li>
                <li><b>5. Link searcher :</b> <span style="color:#16a085;">Search <code>link name_to_search</code></span></li>
                <li><b>6. Age calculator :</b> <span style="color:#16a085;">Type <code>age DD-MM-YYYY</code>, e.g. 
                <code>age 18-07-2007</code></span></li>
                </ul> <br>
                `)
                
            return
        }
        else if (userInput.toLowerCase() === "info"){
            this.u.paraBox(`

                this is just a demo for a chat box. Feel free to give your feedback, but unfornuately i cant remember your feedback!`)
                return
        }else if (userInput.startsWith("cd name")){
            this.changeName(userInput)
        }else if (userInput.toLowerCase() == "today"){
            this.today()
        }else if (userInput.startsWith("day")){
            userInput = userInput.split(" ");
            this.week_day(userInput[1])
            return
        }else if(userInput.toLowerCase() === "clear"){
            // window.location.reload();
            this.cleaner();
            // this.handler();
            return
        } else if(userInput.includes("dist")){
            this.u.paraBox(`${distance_calc(userInput)}`)
            return;
        }else if(userInput.includes("link")){
            personalInfo(userInput);
            return
        }else if(userInput.includes("pinfo")){
            linker(userInput);
            return
            // this.u.paraBox()
        }else if(userInput.includes("length")){
            userInput = userInput.split(" ");
            this.u.paraBox(`The length of <span class = "code">${userInput[1]}</span> is <span class = "code">${userInput[1].length} </span>`);
            return
        }else if(userInput.includes("rev")){
            userInput = userInput.split(" ");
            userInput = userInput[1]
            let og = userInput
            userInput = userInput.split("")
            userInput.reverse()
            userInput = userInput.join("")
            this.u.paraBox(`The reverse of <span class = "code">${og}</span> is <span class = "code">${userInput}</span>`);
            return
        }else if (userInput.includes("age ")){
            userInput = userInput.split(" ");
            this.ageCalculator(userInput[1])
            return
        }else if (userInput.includes("pkmn")){
            pkmnDetail(userInput);
            return
        }else{
            try {
                let text = eval(userInput);
                if (text == userInput || !userInput || state == "ageCalc"){
                    throw new Error("A solo number")
                }
                this.u.paraBox(eval(userInput))
                return
            }
            catch (error){
            }        
        }
        if (userInput.includes("list")){
            for (i in listDict){
                if (userInput.includes(i)){
                    this.u.paraBox(listDict[i]);
                }
            }
        }        
    }
}
// let u = new utility()
// let paraBox = u.paraBox 

var state = "greet";
let lastSender = "system"



/* Creatiing user input text area*/
let input_bpx = document.createElement("textarea");
input_bpx.id = "uInput";
input_bpx.className = "user-input";

/*Disabling the auto complete and auto capitaliation on phone*/
input_bpx.autocapitalize = "off";
input_bpx.autocomplete = "off";
input_bpx.spellcheck = false;

{/* <textarea autocapitalize="off" spellCheck="false" autoComplete="off" /> */}

input_bpx.type = "text";
document.getElementById("input-div").appendChild(input_bpx);
input_bpx.placeholder = "Type your message here...";

/*--------Binding user input ------*/
let m = new main()

