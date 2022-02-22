const ajax = new XMLHttpRequest(); //xmlhttprequest가 제공하는 도구를 ajax상수(const)에 담는다.
const content = document.createElement('div');
const container = document.getElementById("root")
const newsURL = 'https://api.hnpwa.com/v0/news/1.json'
const contentURL = 'https://api.hnpwa.com/v0/item/@id.json'
const store = {
    currentPage : 1,
}

function getData(url){
    ajax.open('GET', url,false);
    ajax.send();
    return JSON.parse(ajax.response)
}

ajax.open('GET', newsURL,false);
ajax.send();

function newsFeed() {
    const newsFeed = getData(newsURL); // json형식으로 변환
    const newsList = [];

    newsList.push('<ul>')
for(let i = (store.currentPage -1) * 10 ; i < store.currentPage*10 ; i++){

    newsList.push(
    `<li>
        <a href ="#/show/${newsFeed[i].id}">
            ${newsFeed[i].title}(${newsFeed[i].comments_count}) 
        </a>
    </li>
    `)
}
newsList.push("</ul>")
newsList.push(`
    <div>
        <a href="#/page/${store.currentPage > 1? store.currentPage - 1 : 1}">이전페이지</a>
        <a href="#/page/${store.currentPage + 1}">다음페이지</a>
    </div>
`)
container.innerHTML = newsList.join("")
}

function newsDetail(){
    const id = location.hash.substring(7);
    const newsContents = getData(contentURL.replace('@id',id));
    const title_head = document.createElement("h1")

    container.innerHTML = `
    <h1>${newsContents.title}</h1>
    <div>
        <a href ="#/page/${store.currentPage}">목록으로</a>
    </div>
    `
}

function router(){
    const routePath = location.hash;

    if(routePath ===""){ // #위치에 이것하나만 있을때 빈값으로 인식한다.
        newsFeed()
    }else if(routePath.indexOf('#/page/') >= 0){
        store.currentPage = Number(routePath.substring(7))
        newsFeed()
    }else {
        newsDetail()
    }
}

window.addEventListener("hashchange",router)

router()