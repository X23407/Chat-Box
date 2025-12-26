class utility{
    constructor(){
    }

    paraBox(text,mode,widget){
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
}