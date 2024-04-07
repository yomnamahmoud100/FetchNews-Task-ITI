let p = new Promise(function(resolve, reject){
    let usersPromise = fetch("https://jsonplaceholder.typicode.com/users");
    if(usersPromise){
        resolve(usersPromise);
    }else{
        reject("users not found");
    }
})

p.then(usersPromise=>{

   return usersPromise.json();

}).then(usersData=>{

    displayUsernames(usersData);
    getUserPosts(1);
    
}).catch(error =>{

    console.log(error);

});

function displayUsernames(usersData){
    let div = document.createElement("div");
    div.classList.add("button-container");

    usersData.forEach(element => {
        createNewButton(div, element.name, element.id);
    });

    document.body.appendChild(div)
    
}

function createNewButton(div,buttonName, userId){
    let button = document.createElement("button");
    button.classList.add("button");
    button.innerHTML = buttonName;
    button.addEventListener("click", e=>{
        getUserPosts(userId)
    })
    div.appendChild(button);
}


async function getUserPosts(userId){
   
    let userPosts = await (await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`)).json();
    console.log(userPosts);
    displayPosts(userPosts);
}

function displayPosts(userPosts){

    if(document.body.lastElementChild.classList.contains("card-container")){
        document.body.removeChild(document.body.lastElementChild);

    }

    let parentDiv = document.createElement("div");
    parentDiv.classList.add("card-container");

    userPosts.forEach(post => {

        let cardDiv = document.createElement("div");
        cardDiv.classList.add("card");
        parentDiv.appendChild(cardDiv);

        let p = document.createElement("p");
        p.innerHTML = post.title;
        cardDiv.appendChild(p);      
    });
    

    document.body.appendChild(parentDiv);
    
}

