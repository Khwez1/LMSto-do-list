// Declaring variables 
const input = document.getElementById('Ipt')
const output = document.getElementById('Opt')
const btnAdd = document.getElementById('Add-btn')
const btnSort = document.getElementById('Sort-btn')
//To make sure the first character is always in upperCase 

// declaring an array for objects to get pushed into 
let Array = []
//function to add to Array
function addTodo(item) {
    //input validation
    if ((item !== '') && (item?.length > 3)){
    //properties of Object
    const Task = {
    id: Array.length == 0 ? 1 : Array.length + 1,
    name: item,
    createdDate: new Date(),
    completed: false
  };
 // add it to array
 Array.push(Task);    
 addToLocalStorage(todos); // localStorage
 // clear the input box value
 input.value = '';
 }
}
