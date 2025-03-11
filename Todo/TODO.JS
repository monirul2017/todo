
// TRY AGAIN //

const submitBtn = document.getElementById("submit");

if (submitBtn) {

submitBtn.addEventListener("click",function(){
    // get input value
    const input = document.getElementById("input");
    const inputValue = input.value ;
    input.value = ""
    // create new list
    const newlist = {
        id:Date.now(),
        text:inputValue,
        status:0,
    }

    setValueLocalStorage(newlist)
    creatItems(newlist)
    removeLocalStorage()
    // displayItem()
})
    
}

function getElementLocalstorage(){
    let listContainer = [];
    const previousData = localStorage.getItem("listContainer");
    if(previousData){
        listContainer = JSON.parse(previousData)
    }return listContainer;
}


function setValueLocalStorage(newlist){
    const previousData = getElementLocalstorage();
    previousData.push(newlist)
    // console.log(previousData)
    localStorage.setItem("listContainer",JSON.stringify(previousData))

}

// create items
function creatItems(element){
    const continer = document.getElementById("list-container");
// list
    const li = document.createElement("li");
    li.innerText = element.text;
    li.setAttribute("id",element.id)

    // span 
    const span = document.createElement('span');
    span.classList.add("cross")
    const txt = document.createTextNode("✘");
    span.appendChild(txt)
    li.appendChild(span)
    continer.appendChild(li)
}

// display list-item 
function displayItem(){
    const allitems = getElementLocalstorage();
    // console.log(allitems)
    for (const element of allitems) {
        creatItems(element)
    }
}

displayItem()

// create dynamic class 
function dynamicClass(){

    const allList = document.querySelectorAll("li");

    allList.forEach(item => {
    // console.log(item)
    item.addEventListener("click",function(){

        const itemParent = item.getAttribute("id");
        const itemId =parseFloat( itemParent)
        // console.log(itemId)
        const allobj = getElementLocalstorage();
        // console.log(allobj)
        const updated = allobj.map(element => {
            // console.log(element)
            const elementId = element.id;
            if (itemId === elementId) {
                const changed = {...element, status:element.status ? 0 :1}
                if (changed.status) {
                    item.classList.add("complete")
                }else{
                    item.classList.remove("complete")
                }return changed;
        
                
            }return element;
            
        })

        localStorage.setItem("listContainer",JSON.stringify(updated))
    })

    })
}

dynamicClass()



// remove form locastorage
function removeLocalStorage(){
    const crossIcon = document.querySelectorAll(".cross");
    crossIcon.forEach(icon => {
        icon.addEventListener("click",function(){
            const iconParent = icon.parentElement;
            const iconParentId =parseFloat(iconParent.getAttribute('id'))
            const allobject = getElementLocalstorage();
          const updated = allobject.filter(item => item.id !==iconParentId)      

            localStorage.setItem("listContainer",JSON.stringify(updated))
            // console.log(updated)
            iconParent.remove()
        })

    })
}

removeLocalStorage()

