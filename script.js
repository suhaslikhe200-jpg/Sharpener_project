const firstForm = document.querySelector('#expense');
const ulList = document.querySelector('ul');
window.addEventListener("DOMContentLoaded", () => {
    const localStorageObj = localStorage;
    const localcontextKeys = Object.keys(localStorageObj);

    for (let i = 0; i < localcontextKeys.length; i++) {
        const key = localcontextKeys[i];
       
        const userDetailsString = localStorageObj[key];
        

        const userDetailsObj = JSON.parse(userDetailsString);
         
        displayUser(userDetailsObj);
    }
});
firstForm.addEventListener('submit', function (event) {
    event.preventDefault();

    const price = event.target.amount.value;
    const description = event.target.desc.value;
    const category = event.target.options.value;

    const obj = { price, description, category };
    
    // Using description as the key to avoid price collisions
  localStorage.setItem(description, JSON.stringify(obj));

    displayUser(obj);
    event.target.reset();
});
function displayUser(userData) {
    const newli = document.createElement('li');
    const deleteBtn = document.createElement('button');
    const editBtn = document.createElement('button');

    newli.textContent = `${userData.price} - ${userData.description} - ${userData.category} `;
    
    deleteBtn.textContent = 'Delete';
    editBtn.textContent = 'Edit';

    // DELETE LOGIC
    deleteBtn.onclick = () => {
        localStorage.removeItem(userData.description);
        newli.remove();
    };

    // EDIT LOGIC
    editBtn.onclick = () => {
        // 1. Send data back to form inputs
       document.querySelector('#amount').value = userData.price;
        document.querySelector('#desc').value = userData.description;
        document.querySelector('#options').value = userData.category;

        // 2. Remove the old entry
        localStorage.removeItem(userData.description);
        newli.remove();
    };

    newli.appendChild(deleteBtn);
    newli.appendChild(editBtn);
    ulList.appendChild(newli);
}