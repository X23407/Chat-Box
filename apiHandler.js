class apiHandler{
    constructor(){
        
    }

    async dictionary(word){
        word = "Hello";
        let response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
        let data = await response.json();
        console.log(data)
    }
}

