

var itemsList = [];
var itemToEditIndex = null;

document.querySelector("#add-button").addEventListener("click", (e) => {
    e.preventDefault()

    //Get user input
    let itemName = document.getElementById("name").value;
    let quantity = document.getElementById("quantity").value;

    // Preven duplicates
    const itemExists = itemsList.find((_item) => _item.itemName === itemName);

    if(itemExists){
        alert("This item exists");
        return
    }

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
        <p id=itemNameP${itemName}>Item name : ${item.itemName}</p>
        <p id=itemQuantityP${itemName}>Quantity : ${item.quantity}</p>
        <p style="display:none" id="itemPurchasedP${item.itemName}">Purchased</p>
        <section id="item1_buttons">
            <button  onclick="markAsPurchased(${itemName})">Mark as purchased</button>
            <button  onclick="showPopup(${itemName})">Edit</button>
        </section>
    </section>
`;
    // Add the child section to the parent container
    itemsContainer.insertAdjacentHTML('beforeend', childSection);

    // Clear the form
    const form = document.getElementById("items_form");
    form.reset();
});


// Handle clear list
document.querySelector("#clear-button").addEventListener("click", (e) => {

    // Remove all the items in the array
    itemsList = []

    // Remove all nodes in items list conainer
    let itemsContainer = document.getElementById("items-container");

    itemsContainer.replaceChildren();
});

// Mark item as purchased
function markAsPurchased(itemName) {
    
    const itemEl = itemName;
    const name = itemEl.id;

    console.log(itemsList)
    // Find the item with this name from the array
    let itemIndex = itemsList.findIndex((_item) => _item.itemName === name);
    // Mark it as purchased

    itemsList[itemIndex].purchased = true;

    //Show the purchased text
    const purchasedTextId = `itemPurchasedP${name}`
    const purchasedParagraph = document.getElementById(purchasedTextId);
    purchasedParagraph.style.display = "block"
}


const openPopup = document.getElementById("openPopup");
const closePopup = document.getElementById("closePopup");

// Open the popup
function showPopup(itemName) {
    const itemEl = itemName;
    const name = itemEl.id;

    // Find the item with this name from the array
    const itemIndex = itemsList.findIndex((_item) => _item.itemName === name)
    let itemObject = itemsList[itemIndex];

itemToEditIndex = itemIndex;

    // Set the inputs values
    const editItemName = document.getElementById("edit_itemName")
    editItemName.value = itemObject.itemName;

    const editItemQuantity = document.getElementById("edit_quantity")
    editItemQuantity.value = itemObject.quantity;

    const editItemPurchased = document.getElementById("edit_purchased")
    editItemPurchased.checked = itemObject.purchased;

    const popup = document.getElementById("popup");

    popup.style.display = "flex";

}

function hidePopup() {
    const popup = document.getElementById("popup");
    popup.style.display = "none";
}


// Close the popup when clicking outside of it
window.addEventListener("click", (event) => {
    const popup = document.getElementById("popup");

    if (event.target === popup) {
        popup.style.display = "none";
    }
});

// Handle form submission
const form = document.getElementById("itemForm");
form.addEventListener("submit", (event) => {
    event.preventDefault(); // Prevent form from refreshing the page
    const itemName = document.getElementById("edit_itemName").value;
    const quantity = document.getElementById("edit_quantity").value;
    const purchased = document.getElementById("edit_purchased").checked;

    const itemToEdit = itemsList[itemToEditIndex]
    itemsList[itemToEditIndex] = { itemName, quantity, purchased }


   // Update the item DOM
   const itemNameP = document.getElementById(`itemNameP${itemToEdit.itemName}`);
   itemNameP.innerHTML = `Item name : ${itemName}`;

   const itemQuantityP = document.getElementById(`itemQuantityP${itemToEdit.itemName}`);
   itemQuantityP.innerHTML = `Item quantity : ${quantity}`;

   const itemPurchasedP = document.getElementById(`itemPurchasedP${itemToEdit.itemName}`);
   itemPurchasedP.innerHTML = `${purchased ? 'Purschased' : ''}`;


    // Close the popup after saving
    popup.style.display = "none";
    form.reset(); // Clear form fields
});
