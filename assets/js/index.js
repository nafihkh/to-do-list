let inputBox = document.getElementById("inputBox");
let addlist = document.getElementById("button-addon2");
let listContainer = document.getElementById("list-container");
let listArr = JSON.parse(localStorage.getItem("storage")) || [];
let conut;

function addList() {
    let listElement = inputBox.value;
    if(listElement ==="")
    {
        alert("Please Enter a Task")
    }
    else 
    {
        count = 0;
        createList(listElement);
        savelist(listElement);
        inputBox.value = "";
    }
}
function createList(listElement) {
    let listItem = document.createElement("li");
    let contentBox = document.createElement("div");
    let textBox = document.createElement("input");
    textBox.setAttribute("id",'checkBox')
    let textItem = document.createElement("label");
    textBox.setAttribute("onchange",'checkcheked()')
    textItem.innerHTML = listElement;
    if(count==1){
        textItem.innerHTML = listElement.text;
    }
    textBox.checked = listElement.status; 
    let Trach = document.createElement("button");
    let trachBin = document.createElement("img");
    listContainer.append(listItem);
    listItem.append(contentBox);
    listItem.append(Trach);
    contentBox.append(textBox);
    contentBox.append(textItem);
    Trach.append(trachBin);
    listItem.classList.add('d-flex','justify-content-between','p-2','list');
    textBox.type = "checkbox"
    textBox.classList.add('me-2','form-check-input','rounded-circle');
    Trach.classList.add('border-0');
    trachBin.src = "assets/images/trash.svg";
    Trach.setAttribute("onclick",'removeItem(event)')
}
function savelist(listElement) {
    let obj = {};
    obj.text = listElement;
    obj.status = false;
    listArr.push(obj);
    localStorage.setItem("storage",JSON.stringify(listArr));
}
function removeItem(event)  {
    const listItem = event.target.closest("li");
    if (listItem) {
        const listText = listItem.querySelector("label").innerText;
        listItem.remove();
        listArr = listArr.filter((x) => x.text !== listText);
        localStorage.setItem("storage", JSON.stringify(listArr));
    }
} 
function checkcheked()
{
    let checkBox = document.querySelectorAll("#checkBox")
    for(let i = 0;i<checkBox.length;i++)
    {
        listArr[i].status = checkBox[i].checked;
    }
    localStorage.setItem("storage",JSON.stringify(listArr));
}
function loadlist(){
    count = 1;
    listArr.forEach(createList);
}
function sort(condition){
    let temp = condition;
    if(temp===null)
    {
        location.reload();
    }
    else {
        listContainer.innerHTML ="";
        conut=1;
        let filterlistArr = listArr.filter((x)=> x.status == (condition));
        filterlistArr.forEach(createList);
    }
}
loadlist();