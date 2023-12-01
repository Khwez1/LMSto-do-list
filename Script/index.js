const Form = document.getElementById('Form');
const Input = document.getElementById('Ipt');
const itemsList = document.getElementById('list-of-items');
const sort = document.getElementById("Srt");
// array
let Array = [];
// debugger
// eventListener on form, and listen for submit event
Form.addEventListener('submit', (event)=>{
  // prevent the page from reloading when submitting the form
  event.preventDefault();
  addTask(Input.value); 
});

// function that adds the Tasks
function addTask(item) {
  // if item is not empty
  item = item.charAt(0).toUpperCase()+item.slice(1)
  if ((item !== '') && (item?.length > 3)) {
    // completed properties
    const Task = {
      id: Array.length == 0 ? 1 : Array.length + 1,
      name: item,
      createdDate: new Date(),
      completed: false
    };
    // add it to array
    Array.push(Task);    
    addToLocalStorage(Array); // localStorage
    // clear the input box value
    Input.value = '';
  }
}

// function to render given Array to screen
function displayArray(Array) {
  // declare everything inside <ul> as a string
  itemsList.innerHTML = '';
  // run through each item inside Array
  Array.forEach(function(item) {
    // check if the item is completed
    const Done = item.completed ? 'Done': null;
    // list element
    const liTag = document.createElement('li');
    // <li class="item"> </li>
    liTag.setAttribute('class', 'item');
    liTag.setAttribute('data-key', item.id);
    // line through a completed item
    if (item.completed === true) {
      liTag.classList.add('Done');
    }

    liTag.innerHTML = `
      <input type="checkbox" class="checkbox" ${Done}>
      ${item.name}
      <button class="delete-button">X</button>
    `;
    itemsList.append(liTag);
  });

}

// function to add Array to local storage
function addToLocalStorage(Array) {
  // conver the array to string then store it.
  localStorage.setItem('Array', JSON.stringify(Array));
  // render them to screen
  displayArray(Array);
}

function getFromLocalStorage() {
  const refer = localStorage.getItem('Array');
  // if refer exists
  if (refer) {
    // converts back to array and store it in Array array
    Array = JSON.parse(refer);
    displayArray(Array);
  }
}

// function to add a toggle effect to the value to completed and not completed
function toggle(id) {
  Array.forEach(function(item) {
    // use == not ===, because here types are different. One is number and other is string
    if (item.id == id) {
      // toggle the value
      item.completed = !item.completed;
    }
  });

  addToLocalStorage(Array);
}

// deletes item from Task list
function deleteTask(id) {
  // filters out the <li> with the id and updates the Array array
  Array = Array.filter(function(item) {
    // Using != and not !==, because types are different here. One is a number and the other is a string
    return item.id != id;
  });

  // update the localStorage
  addToLocalStorage(Array);
}

// initially get everything from localStorage
getFromLocalStorage();

// addEventListener <ul>.
itemsList.addEventListener('click', function(event) {
  if (event.target.type === 'checkbox') {
    toggle(event.target.parentElement.getAttribute('data-key'));
  }

  // delete-button
  if (event.target.classList.contains('delete-button')) {
    deleteTask(event.target.parentElement.getAttribute('data-key'));
  }
});

// sort an array
sort.addEventListener("click", ()=>{
  let sorted = JSON.parse(localStorage.getItem("Array"))?.sort((a, b) => {
    if(a.name.toLowerCase() < b.name.toLowerCase() ) return -1;
    if(a.name.toLowerCase() > b.name.toLowerCase() ) return 1;
    return 0;
  });
  displayArray(sorted);
})