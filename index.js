// 1. Add event listener to submit button
// On press, get the text typed by user in both name and quantity inputs
// And add them to your list

var itemsList = [];

document.querySelector("#add-button").addEventListener("click",(e)=>{
    e.preventDefault()
    
    //Get user input
    let itemName = document.getElementById("name").value;
    let quantity = document.getElementById("quantity").value;

    // Create an item object 
    let item = {
        itemName,
        quantity
    }

    // Add item to itemsList array
    itemsList.push(item);

    // Access the list container and add a new entry
let itemsContainer = document.getElementById("items-container");

const childSection = `
    <section id=${item.itemName}>
        <p>Item name : ${item.itemName}</p>
        <p>Quantity : ${item.quantity}</p>
        <p style="display:none" id=${item.itemName}_purchased>Purchased</p>
        <section id="item1_buttons">
            <button  onclick="markAsPurchased(${itemName})">Mark as purchased</button>
            <button type="submit">Edit</button>
        </section>
    </section>
`;
// Add the child section to the parent container
itemsContainer.insertAdjacentHTML('beforeend', childSection);

});


// Handle clear list
document.querySelector("#clear-button").addEventListener("click",(e)=>{

    // Remove all the items in the array
    itemsList = []

    // Remove all nodes in items list conainer
    let itemsContainer = document.getElementById("items-container");

    itemsContainer.replaceChildren();
});

// Mark item as purchased
function markAsPurchased(itemName){
    const itemEl = itemName;
    const name = itemEl.id;
    
    console.log(itemsList)
    // Find the item with this name from the array
    let itemIndex = itemsList.findIndex((_item)=> _item.itemName === name);
    // Mark it as purchased

   itemsList[itemIndex].purchased = true;

   //Show the purchased text
const purchasedTextId = `${name}_purchased`
const purchasedParagraph = document.getElementById(purchasedTextId);
purchasedParagraph.style.display = "block"


    // Find the html child and show purchased indicator
}
