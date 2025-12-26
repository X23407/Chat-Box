class dictDictHandler{
    constructor(){
        this.main = "dict";
        this.prevData = false;
        this.breakLoop = false;
        this.dataFound = []
        this.data2 = {
            "/pw FishyCrops" :{
                "diamond" : ["b - 35"],
                "iron" : 0.25,
            },
            "/pw lilshop" : {
                "note" : "Villager-trading free"
            },
            "pw entei":{
                "note" : "buy stuff",
                "cost" : {
                    "hopper" : 5,
                    "enter chet" : 10,
                }
            },
            "/pw arcton":{
                "Beacon" : 1200
            },
            "pw Mnh" : {

            },
            "pw jit" : {

            },
            "pw flea":{
                "note":["cheap wood 0.1 "]
            },
            "/pw mela":{
                "Note":["cheap bonemeal","cheap froglight","cheap everything!"]
            }
        }
        this.dataq = [
            ["/pw mela","Cheap Froglight,bonemeal etc","Also mob grinder without loot"],
            ["/pw flea","cheap wood 0.1"]
        ]
        this.data = {
            "starter-trading-join":{
                "data":["-65 71 337","-222 69 337","-273 69 285","-281 69 285","-281 72 169","-286 72 169","-286 71 -132"],
                "chunk":["-1,0","-1,-1"],"style":{"color":"black","line_style":[],"line_width":3,"value":150}},
            "trading-village-join":{
                "data":["-240 71 -132","-286 71 -132","-286 71 -253"],
                "chunk":["-1,0"],
                "style":{"color":"black","line_style":[],"line_width":3,"value":150}},
            "village-pumpkin":{
                "data":["-286 71 -264","-286 71 -254","-281 71 -254","-281 74 -768","-272 79 -768","-271 68 -987"],
                "chunk":["-1,0"],
                "style":{"color":"blue","line_style":[],"line_width":3,"value":150}},
            "pumpkin-monument":{
                "data":["-263 63 -1009","-292 63 -1246"],
                "chunk":["-1,1"],
                "style":{"color":"blue","line_style":[],"line_width":3,"value":150}},
            "starter-esaten-post-01":{
                "data":["-35 71 369","-20 69 408","13 68 440","28 71 458","29 72 476","72 79 504","135 85 515","475 109 515","597 93 512"],
                "chunk":["0,-1","-1,-1"],
                "style":{"color":"purple","line_style":[],"line_width":3,"value":150}},
            "golden-y":{
                "data":["165 88 516","176 86 524","184 83 536","186 77 552","184 83 536","190 85 526","202 88 520","209 88 514"],
                "chunk":["0,-1"],
                "style":{"color":"purple","line_style":[],"line_width":3,"value":150}},
            "eastern-post-01-village":{
                "data":["597 93 512","601 109 211"],
                "chunk":["0,-1"],
                "style":{"color":"black","line_style":[],"line_width":3,"value":150}},
            "name" : "Apple"
            }
            this.matchFound = []
        
    }

    intitiater(phrase){
        //phrase here is in form of list of words
        this.phraseOg = phrase.join(" ");
        phrase.shift()// remopving intiatinf word say dict
        // console.log(this.phraseOg);
        this.searchMain(phrase,this.data);
        this.paraBox("Header",this.matchFound)
        console.log(JSON.stringify(this.matchFound))
        
        return
        let  prevPhrase = phrase
        //Round 1
        // console.log(this.typeChcker(phrase));
        let data = this.data;
        let search = this.mainSearcher(data,phrase);
        let logic = this.logicChecker(search);
        if (logic){
            return logic
        }
        //Round 2
        //the search found is single and we have to continue more;
        console.log("_---RoUnD-2------____")
        phrase = search[0];
        data = Object.values(search[1])[0];
        console.log(data)
        search = this.mainSearcher(data,phrase);
        logic = this.logicChecker(search);
        if (logic){
            return logic
        }
        //Round 3
        console.log("_---RoUnD-3------____")
        phrase = search[0];
        data = Object.values(search[1])[0];
        console.log(data)
        search = this.mainSearcher(data,phrase);
        logic = this.logicChecker(search);
        if (logic){
            return logic
        }
        return
        let prevdata = data //should me modified thus last
        //round 2
        search = this.mainSearcher(search[0],search[1]);
        console.log(search)
        data = search[0];
        phrase = search[1]
        if (!data){
            return `No data found based on search \n\n${phrase}\n\n\nThis is the closest result we could find based on ${prevPhrase.join(" ")} <br>n\n${this.prettyPrint(prevdata)}`
        }
        if (phrase.length == 0){
            return this.prettyPrint(data)
        }
        prevdata = data;
        prevPhrase = phrase;
        console.log(search);
        //round 3
        search = this.mainSearcher(search[0],search[1]);
        if (!search[0]){
            return `No data found based on search \n\n${phrase}`
        }
        if (search[1].length == 0){
            return search[0]
        }
        console.log(search);
        // round 4
        search = this.mainSearcher(search[0],search[1]);
        if (!search[0]){
            return `No data found based on search \n\n${phrase}`
        }
        if (search[1].length == 0){
            return search[0]
        }
        console.log(search);
    }

    dictkeyChecker(dict,phrase){
        // checks if the phrase contain any of the key present in the dict
        // phrase = "apple"
        let avail = []
        for (let key in dict){
            if (phrase[0].includes(key)|| key.includes(phrase[0])){
                let search = {};
                search[key] = dict[key]
                // phrase.splice(phrase.indexOf(key),1);
                avail.unshift(search)
                // return [dict[key],phrase]
            }
        }
        console.log(this.typeChcker(phrase));
        phrase.shift()
        console.log(this.typeChcker(phrase));
        
        avail.unshift(phrase)
        console.log(avail);
        // (avail)
        return avail
    }

    listChecker(phrase,list){
        let avail = [];
        console.log(JSON.stringify(list))
        for (let data of list){
            console.log(JSON.stringify(data))
            if (this.typeChcker(data) === "list"){
                for (let i of data){
                    console.log(i);
                    console.log(list)
                    console.log(phrase[0]);
                    if (i.includes(phrase[0]) || phrase[0].includes(i)){
                        let search = {};
                        search[i] = data;
                        avail.unshift(search);
                        console.log(`Search found`)
                    }
                }
            }
        }
        avail.unshift(phrase);
        return avail
    }

    logicChecker(search){
        console.log(search); 
        // this.phrase = ["a[[","ssdd",123]
        console.log(this.phraseOg);
        if (search.length == 1){
            if (!this.prevData){
                this.paraBox(`No Data Found based on your serach<br><br>"${this.phraseOg}"`);
                return true
            }else{
                this.paraBox(`No Data Found based on your serach. The closest data that i was able to find is below<br><br>"${this.phraseOg}"<br>`,this.prevData);
                return true
            }
        }else if (search.length == 2){
            if (search[0].length != 0){
                this.prevData = search;
                return false
            }
            let text = `Here your data based on your search "${this.phraseOg}" <br><br>`;
            //removing phrase
            search.shift( )
            this.paraBox(text,search);
            return true
        }
        else{
            if (search[0].length != 0){
                let phrase =JSON.parse(JSON.stringify(search[0]));
                search.shift();
                let avail = [];
                console.log("____-------Multiple----------______---")
                for (let i of search){
                    let core = JSON.parse(JSON.stringify(phrase))
                    console.log(JSON.stringify(core))
                    console.log(JSON.stringify(i))
                    console.log(JSON.stringify((Object.values(i)[0])))
                    let data = this.mainSearcher(Object.values(i)[0],core);
                    if (data.length ==2){
                        avail.unshift(data)
                    }
                }
                // avail.unshift(phrase);
                let text = `There multiple data found based on search word "${this.phraseOg}" <br><br>`;
                // search.shift( )
                this.paraBox(text,avail[1]);
                console.log(avail)
                return true//this.logicChecker(avail);
                
                console.log(avail)
                //multiple search
            }
            //length of word is greater than2
            let text = `There multiple data found based on search word "${this.phraseOg}" <br><br>`;
            search.shift( )
            this.paraBox(text,search);
            return true
            for (let data of search){
                text += this.prettyPrint(data);
                text += '<br><br>'
            }
            return text
        }
    }

    typeChcker(phrase){
        // console.log(`Inside ${typeof(phrase)}`);
        if (typeof(phrase) === "object"){
            //return true for both list and dict
            if (Array.isArray(phrase)){
                //return true only for list/array
                return "list"
            }else{
                return "dict"
            }
        }else {
            return "str"
        }
    }

    mainSearcher(data,phrase){
        //Search = [data,phrase]
        if (phrase.length != 0){
            //checking for 2nd phrase
            let type = this.typeChcker(data)
            console.log(type);
            if (type === "list"){
                let search = this.listChecker(phrase,data)
                // data is a list
                // no logic for now
                return search
            }else if (type == "dict"){
                //data is a dict
                let search = this.dictkeyChecker(data,phrase)
                return search
            }else{
                //data is string
                return [data,[]];
            }
        }else{
            console.log("else part");
            return [JSON.stringify(data),[]]
        }
    }

    prettyPrint(data){
        // console.log("pp");
        
        if (typeof(data) == "object"){
            return JSON.stringify(data);
        }else{
            return data
        }
    }

    dictPrinter(dict,parent,spacing){
        for (let i in dict){
            let header = document.createElement("span");
            header.innerHTML = spacing+i;
            header.style.fontWeight = "bold";
            parent.appendChild(header);
            parent.appendChild(document.createElement("br"));
            let content = document.createElement("para");
            content.style.display = "none";
            parent.appendChild(content);
            let isShown = false
            header.onclick = (e) =>{
                if (!isShown){
                    content.style.display = "block";
                    isShown = true
                }else{
                    content.style.display = "none";
                    isShown = false;
                }
                
            }
            if (this.typeChcker(dict[i]) == "dict"){
                // spacing += "&nbsp;&nbsp";
                spacing += "- "
                let ctx = document.createElement("span");
                ctx.style.fontWeight = "normal";
                ctx.innerHTML = ` : Object (${Object.keys(dict[i]).length})`;
                header.appendChild(ctx)
                // let key = Object.keys(dict[i]);
                // console.log(key);
                this.dictPrinter(dict[i],content,spacing)
            } else if (this.typeChcker(dict[i]) === "list"){
                // spacing += "- "
                let ctx = document.createElement("span");
                header.appendChild(ctx);
                ctx.innerHTML = `: Array (${dict[i].length})`
                ctx.style.fontWeight = "normal";
                let text = ""
                for (let ii of dict[i]){
                    text += spacing+ " -"+ ii + "<br>"
                }
                if (dict[i].length == 0){
                    ctx.innerHTML = `: []`
                    }
                content.innerHTML = text;
                // header.innerHTML = spacing + i + `: ${dict[i].length}`
            } else{
                //type is str
                console.log(dict[i]);              
                if (String(dict[i]).length <= 20){
                    let ctx = document.createElement("span");
                    ctx.innerHTML = `:  ${dict[i]}`;
                    ctx.style.fontWeight = "normal"
                    header.appendChild(ctx)
                }
            }
            console.log("runnung");
            
        }
    }

    paraBox(header,text){
        // text = [{"Golden-y":{
        //         "data":["165 88 516","176 86 524","184 83 536","186 77 552","184 83 536","190 85 526","202 88 520","209 88 514"],
        //         "chunk":["0,-1"],
        //         "style":{"color":"purple","line_style":[],"line_width":3,"value":150}}}]
        // console.log(text);        
        let para = document.createElement("p");
        para.className = "paraSystem";
        para.innerHTML = header;

        //checking for logic of content of text
        if (text){
            for (let i of text){
                if (this.typeChcker(i) == "dict"){
                    this.dictPrinter(i,para,"")
                }
                para.appendChild(document.createElement("br"))
        }}
        

        document.getElementById("para-div").appendChild(para)
    }

    searchInDict(phrase,dict){
        // console.log(phrase)
        // let avail = []
        for (let key in dict){
            let search = {}
            if (key.includes(phrase) || phrase.includes(key)){
                search[key] = dict[key];
                this.matchFound.unshift(search)
                // return search;
            }
        }
        // return []
        // return avail
    }
    
    searchMain(phrase,data){
        console.log(phrase)
        if (this.breakLoop){
            return "break"
        }
        let search = false
        if (this.typeChcker(data) === "dict"){
            search = this.searchInDict(phrase[0],data)
        }else if (this.typeChcker(data) === "list"){
            // let search = this
        }else{
            //string
        }
        // phrase = phrase.shift();
        phrase.shift()
        if (phrase.length == 0){
            console.log(phrase);
            console.log("NO PHRASE");
            console.log(search)
            this.breakLoop = true;
            // this.matchFound.unshift(search)
            return
        }
        // search is a list containg dictionary as element [{},{},{}]
        if (search.length ==0){
            if (this.prevData){
                this.breakLoop = true;
                return 
            }else{
                this.breakLoop = true;
                return `No data found`
            }
        }
        // else{
        //     // data = Object.values(search);
        //     this.prevData = JSON.parse(JSON.stringify(this.matchFound));
        //     this.matchFound = [];
        //     for (let search of this.prevData){

        //     }
        //     for (let i of data){
        //         console.log(i)
        //     }
        // }
        data = Object.values(search)[0]
        this.searchMain(phrase,data)
    }
}