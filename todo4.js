let tbody = document.getElementsByTagName('tbody');
let count = 1;
let total=0;
let currentTheme="light-mode";
let toggle=document.querySelector(".toggle");
let body=document.body;  //this and below both will work
// let body=document.getElementsByTagName("body")[0];

let tfoot=document.getElementById("tfoot");



let name1 = document.getElementById('name');
let age = document.getElementById('age');
let favourite = document.getElementById('favourite');
let submitBtn = document.getElementById('submit');
let editBtn = document.getElementById('edit');
let arrayOfObjects = JSON.parse(localStorage.getItem('Data'));
let clear = document.getElementById('clear');
let dataArray = [];

function renderingDataFromLocalStorage() {
    if (arrayOfObjects === null) {
        tbody[0].insertAdjacentHTML('beforeend', `<tr><td id="empty" colspan="5">Table is Empty</td></tr>`);
    
    
    }
    else if (arrayOfObjects.length !== 0 && arrayOfObjects !== null) {
        tbody[0].innerHTML = '';
    
    
       

        arrayOfObjects.forEach((currentObj,index)=>{
            tbody[0].insertAdjacentHTML('beforeend',`<tr><td>${index+1}</td><td>${currentObj.name}</td><td>${currentObj.age}</td><td>${currentObj.favourite}</td><td><button class="edit">Edit</button><button class="delete">Delete</button></td></tr>`);
            count=index+1;
            count++;
        })
        totalCount();
    
    }
    
    
}
renderingDataFromLocalStorage();

let deleteBtnArray = document.querySelectorAll('.delete');






if (arrayOfObjects === null) {
    dataArray = [];
}
else if (arrayOfObjects.length !== 0) {


    dataArray = arrayOfObjects;


}
// [...tbody[0].children]

function totalCount() {
    total=0;
    if (tbody[0].children.length === 0 || [...tbody[0].children][0].textContent === 'Table is Empty' || tbody[0].innerHTML === '<tr><td colspan="5">List Cleared</td></tr>') {
        total=0;
        
    }else if ([...tbody[0].children].length>=1 && [...tbody[0].children][0].textContent!=='Table is Empty') {
        [...tbody[0].children].forEach(v=>{
            total+=Number(v.children[3].textContent);
        })
    
        
        
    }
    tfoot.children[0].children[1].textContent=total;
    

    
}
totalCount();




function submitBtnFn() {
    total=0;
    submitBtn.addEventListener('click', () => {
        

        if ((tbody[0].innerHTML === '\n            \n            \n        <tr><td id="empty" colspan="5">Table is Empty</td></tr>' || tbody[0].innerHTML === '<tr><td colspan="5">List Cleared</td></tr>')) {
            tbody[0].innerHTML = '';
    
        }
    
    
    
    
    
        let nameValue = name1.value;
        let ageValue = age.value;
        let favouriteValue = favourite.value;
        let dataObj = {
            name: nameValue,
            age: ageValue,
            favourite: favouriteValue
        }
    
        dataArray.push(dataObj);
    
        localStorage.setItem('Data', JSON.stringify(dataArray));
    
    
        tbody[0].innerHTML += `<tr><td>${count++}</td><td>${nameValue}</td><td>${ageValue}</td><td>${favouriteValue}</td><td><button class="edit">Edit</button><button class="delete">Delete</button></td></tr>`;
        refreshSeries();
    
    
        console.log("User Entered: " + JSON.stringify(dataObj));
        name1.value = "";
        age.value = "";
        favourite.value = "";
        console.log(localStorage);
        totalCount();
    
    }
    
    
    
    
    )
    
}
submitBtnFn();



function editFn() {
    tbody[0].addEventListener('click',(event)=>{
        total=0;
        if (event.target.classList.contains('edit')) {
            let rowToEdit=event.target.parentElement.parentElement;
            console.log(rowToEdit.children[1].textContent);
            
            name1.value=rowToEdit.children[1].textContent;
            age.value=rowToEdit.children[2].textContent;
            favourite.value=rowToEdit.children[3].textContent;
            rowToEdit.remove();
            let thisEdit={
                name:rowToEdit.children[1].textContent,
                age:rowToEdit.children[2].textContent,
                favourite:rowToEdit.children[3].textContent
            }
            dataArray=dataArray.filter(item=>!(item.name===thisEdit.name && item.age===thisEdit.age && item.favourite===thisEdit.favourite));
            localStorage.setItem('Data',JSON.stringify(dataArray));

            totalCount();
            
            
        }
    })
    
}
editFn();

function clearFn() {
    clear.addEventListener('click', () => {
        let clearConfirm = confirm("Do You Want To Clear List?")
        if (clearConfirm) {
            localStorage.clear();
            tbody[0].innerHTML = '<tr><td colspan="5">List Cleared</td></tr>';
            
    
        }
    
    })
    
    
}

clearFn();

//deleting a 

function deleteFn() {
    tbody[0].addEventListener('click',(event)=>{
        
        if (event.target.classList.contains('delete')) {
            let rowToDelete=event.target.parentElement.parentElement;
            rowToDelete.remove();
            let thisItem={
                name:rowToDelete.children[1].textContent,
                age:rowToDelete.children[2].textContent,
                favourite:rowToDelete.children[3].textContent

            }
           
            
            console.log(thisItem);
            
            dataArray=dataArray.filter(item=> !(item.name===thisItem.name && item.age===thisItem.age && item.favourite===thisItem.favourite));
            localStorage.setItem('Data',JSON.stringify(dataArray));
            console.log(event.target.parentElement.parentElement);
            
            console.log(` row Deleted...`);
           
            totalCount();
                     
        }
    })
    
}
deleteFn();

function refreshSeries() {

    [...tbody[0].children].forEach((tr,index)=>{
        tr.children[0].textContent=index+1;

    })
   
    
}


toggle.addEventListener('click',()=>{
    let newTheme=currentTheme==="dark-mode"?"light-mode":"dark-mode";
    
    body.className=newTheme;
    currentTheme=newTheme;
})















