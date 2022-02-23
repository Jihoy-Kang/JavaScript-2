document.getElementById("root").innerHTML = "haha"

const url = "http://api.hnpwa.com/v0/news/1.json";
const ajax = new XMLHttpRequest();
let newsTitle = []

ajax.open("get",url,false)
ajax.send()

const newsFeed = JSON.parse(ajax.response);

console.log(newsFeed)

let ul = document.createElement("ul")
for(let i = 0 ; i < 10 ; i++){
    newsTitle += `<li>${newsFeed[i].title}</li>`;
    
}

document.getElementById("root").innerHTML = `<ul>${newsTitle}</ul>`