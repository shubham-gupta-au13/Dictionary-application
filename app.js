let input = document.querySelector("#input");
let search = document.querySelector("#submit");
let notFound = document.querySelector(".notFound");
let defination = document.querySelector(".def");
let loading = document.querySelector(".load");
let apiKey = "d7dab81c-76ad-42b9-b514-f99c837e3a8a";

search.addEventListener('click',function(e){

    e.preventDefault();
   
    notFound.innerText = "";
    defination.innerText = "";

    //Get input data
    let inputData = input.value;
    console.log(inputData)
    console.log(notFound)
    if(inputData === ""){
        alert("Word is required");
    }
    else{
        getdata(inputData);
    }

    
    
})


async function getdata(inputData){

    loading.style.display = "block";

    const response = await fetch(`https://www.dictionaryapi.com/api/v3/references/sd3/json/${inputData}?key=${apiKey}`);
    const data = await response.json();
    console.log(data);
    console.log(data.length);

    

    // if empty result

    if(!data.length){

        loading.style.display = "none";
        notFound.innerText = "No data found";
        notFound.style.color = "red";
       return

    }

    // if result is suggestion

    if(typeof(data[0]) == "string"){
         
        
        loading.style.display = "none";
        let heading = document.createElement('h3');
        heading.innerText = "Did you mean ?"
        notFound.appendChild(heading);
        data.forEach(element => {

           
            let suggestion = document.createElement("span");
            suggestion.innerText = element;
            notFound.appendChild(suggestion);
            suggestion.classList.add('suggested')
            
        });
        return ;
    }

    // data found
    loading.style.display = "none";
    let def = data[0].shortdef[0];
     defination.innerText = def;

     return;
     
     


    
}
