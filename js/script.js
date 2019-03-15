// create db in local storage
let createdb = () =>{
if('mydata' in localStorage){
    itembtn.click();
    }
  else{
    document.querySelector(".item-list-table-note").style.display = "block";
    let obj={};
    obj.item = [];
    obj.fav =[];
    let dataItem = JSON.stringify(obj);
    let setItem = localStorage.setItem('mydata',dataItem);
	itembtn.click();
  }
}

// Windows Loading
window.addEventListener('load', () => {
	createdb();
});
/*--------------HEADER SECTION------------*/
// nav button;
let shopbtn = document.querySelector('#shopBtn'),
	itembtn = document.querySelector('#itemBtn'),
	mainbody = document.querySelector('.main'),
	shoppage = document.querySelector('.shop-list'),
	itempage = document.querySelector('.item-list-content');
shopbtn.addEventListener('click', () =>{
	mainbody.innerHTML = shoppage.innerHTML;
	let btn = document.querySelector('#shopBtn');
	shopbtn.classList.add("active");
	itembtn.classList.remove("active");
	let dataItem = JSON.parse(localStorage.getItem('mydata'));
	if(dataItem.fav.length == 0){
	var uL = document.querySelector('ul'),
		text = document.createElement('h3');
		text.className = "shop-list-table-note";
		text.textContent = "000";
		text.style.display = "block";
		
		uL.innerHTML = "";
		uL.appendChild(text);
	}
	else{
		loadShoppingList();
	}
	
});
itembtn.addEventListener('click', () =>{
	mainbody.innerHTML = itempage.innerHTML;
	itembtn.classList.add("active");
	shopbtn.classList.remove("active");
	loadTable();
});



/*-------------ITEM LIST------------- */

// show modal add item
let modal = document.querySelector('#add-item-modal'),
	formLabel = document.querySelector('.add-item-form-label'),
    container = document.querySelector('.add-item-container'),
    deleteContainer = document.querySelector('.add-item-delete-container'),
	name = document.querySelector('#iname'),
	price = document.querySelector('#iprice'),
	unit = document.querySelector('#unit'),
    button = document.querySelector('#add-item-saveItem'),
	alertBox = document.querySelector('.add-item-alert'),
	clsModal = document.body.querySelector('#add-item-clsBtn'),
	saveBtn  = document.querySelector('#add-item-saveItem');

// Load item to table
let loadTable = () =>{
  let dataItem = JSON.parse(localStorage.getItem('mydata'));  
  if (dataItem.item.length == 0)
  {
      document.querySelector(".item-list-table-note").style.display = "block";
  }
  else
  {
      document.querySelector(".item-list-table-note").style.display = "none";
  }
  
    let tblBody = document.querySelector("tbody");
    tblBody.innerHtml ="";
    for (let x in dataItem.item) 
    {
      let row = document.createElement("tr");
      row.addEventListener('click',function(){showEdit(this);});
      for(let y in dataItem.item[x] )
      {
        if ( y == "id" || y == "list" || y == "sub")
        {
        }
        else
        {
          let cell = document.createElement("td");
        if (y == "option"){
              let rowId = row.id = dataItem.item[x].id;
              let delBtn = document.createElement("span");
              delBtn.classList.add("item-list-delBtn");
              delBtn.addEventListener('click',function(){confirmDelete(this);});
              delBtn.title="Delete";
              delBtn.textContent = String.fromCharCode(10005);
              cell.appendChild(delBtn);
            }
            else {
              let cellText = document.createTextNode(dataItem.item[x][y]);
              cell.appendChild(cellText);
            }
          row.appendChild(cell);
        }
      } 
    tblBody.appendChild(row);
  }}

// modal background click
clsModal.addEventListener('click',() =>{
  clearText();
  modal.style.display = "none";});
window.onclick = function(event) {
	let shopmodal = document.querySelector('#shop-list-item-modal');
    if (event.target == modal) {
          clearText();
          modal.style.display = "none";
        }
	else if (event.target == shopmodal) {
		  shopmodal.style.display = "none";
	}

}

//clear input text field
let clearText = () =>{
        alertBox.style.display = "none";
        name.style.border ="1px solid #ccc";
        price.style.border ="1px solid #ccc";
        name.value = "";
        price.value = "";
        button.value ="Submit";
        formLabel.textContent = "Add New Item";
        container.style.display = "block";
        deleteContainer.style.display = "none";
	 	name.focus();

}

// Add new Item
//show modal form
let showform = () =>{
	let formLabel = document.querySelector('.add-item-form-label'),
		button = document.querySelector('#saveItem');
    clearText();
    formLabel.textContent = "Add New Item";
    modal.style.display = "block";
}

// click addBtn
saveBtn.addEventListener('click', () => {checktxtbox();})
let checktxtbox = () =>{
  var name = document.querySelector('#iname');
  var price = document.querySelector('#iprice');
  var unit = document.querySelector('#unit');
  var alertBox = document.querySelector('.add-item-alert');
  var message = document.querySelector('#message');
  if(name.value == ""){
    alertBox.style.display = "block";
    message.textContent = "Please input item name.";
    name.style.border ="2px solid #ff6666";
  }
  else if( price.value == ""){
    alertBox.style.display = "block";
    message.textContent = "Please input item price.";
    price.style.border ="2px solid #ff6666";
    name.style.border ="2px solid #90EE90";
  }
  else if(price.value > 999999 || price.value < 1){
    alertBox.style.display = "block";
    message.textContent = "Please input item price from 1 to 999,999";
    price.style.border ="2px solid #ff6666";
    name.style.border ="2px solid #90EE90";
  }
  else{
    addItem();
  }}

// add item in storage
let addItem = () =>{
  var dataItem = JSON.parse(localStorage.getItem('mydata'));
	if (saveBtn.value == "Submit"){
    var id = getId();
    var name = document.querySelector('#iname');
    var price = document.querySelector('#iprice');
    var unit = document.querySelector('#unit');
    var newItem = {};

    newItem.id = id;
    newItem.name = name.value;
    newItem.price = price.value;
    newItem.unit = unit.value;
	newItem.list = [];
	newItem.sub = "";
	newItem.option = "";

    dataItem.item.push(newItem);
    localStorage.setItem('mydata',JSON.stringify(dataItem));
    var tblBody = document.getElementById("item-list-tblBody");
    tblBody.innerHTML = "";
    loadTable();
    clsModal.click();
		}
  else{
    saveEdit();
  }

  }

// get Item Id
let getId = () =>{
  var dataItem = JSON.parse(localStorage.getItem('mydata'));
  var result = dataItem.item.find(look);
  function look(item){
    var input = dataItem.item.length;
    return item.id === input; 
  }
  if (result != null){
    var sum = dataItem.item.length + 1;
    return sum;
    
  }
  else{
    return dataItem.item.length;
    
  }}

// Delete Item
// Show delete Confirmation modal
let confirmDelete = (r) =>{
		
        var i = r.parentNode.parentNode.rowIndex;
        var dataItem = JSON.parse(localStorage.getItem('mydata'));
        var formLabel = document.querySelector('.add-item-form-label');
        var container = document.querySelector('.add-item-container');
        var deletemessage = document.querySelector('.delete-message');
        var deleteContainer = document.querySelector('.add-item-delete-container');
        var modal = document.querySelector('#add-item-modal');
        deletemessage.id = i;
        deletemessage.textContent = dataItem.item[i-1].name;
        // form 
        formLabel.textContent = "Delete Item";
        container.style.display = "none";
        deleteContainer.style.display = "block";
        modal.style.display = "block";
        
}

//click delete button
document.querySelector('#deleteItem').addEventListener('click',() =>{
deleteItem();
clsModal.click();
});

//click cancel button
document.querySelector('#cancel-deleteItem').addEventListener('click', () =>{
  clsModal.click();
});



// show detail for edit
let showEdit = (y) =>{
        var formLabel = document.querySelector('.add-item-form-label');
        if(formLabel.textContent == "Delete Item"){
          return;
        }
        var x = y.rowIndex;
        --x;
        var dataItem = JSON.parse(localStorage.getItem('mydata'));
        var formLabel = document.querySelector('.add-item-form-label');
        var deleteContainer = document.querySelector('.add-item-delete-container');
        formLabel.textContent = "Update Item";
        container.style.display = "block";
        deleteContainer.style.display = "none";
        formLabel.id = x;
        var button = document.querySelector('#add-item-saveItem');
        button.value ="Update";
        var name = document.querySelector('#iname');
        var price = document.querySelector('#iprice');
        var unit = document.querySelector('#unit');
        name.value = dataItem.item[x].name;
        price.value = dataItem.item[x].price;
        unit.value = dataItem.item[x].unit;
        var modal = document.querySelector('#add-item-modal');
        modal.style.display = "block";

      }

//save update
let saveEdit = () => {
        var dataItem = JSON.parse(localStorage.getItem('mydata'));
        var formLabel = document.querySelector('.add-item-form-label');
        var keyId = formLabel.id;
        var name = document.querySelector('#iname');
        var price = document.querySelector('#iprice');
        var unit = document.querySelector('#unit');
        var updateItem = dataItem.item[keyId];
        updateItem.name = name.value;
        updateItem.price = price.value;
        updateItem.unit = unit.value;
        updateItem = new Array;
        updateItem.splice(1,3, updateItem.name, updateItem.price, updateItem.unit);
        localStorage.setItem('mydata',JSON.stringify(dataItem));
        var tbl = document.querySelector('#item-list-tblBody').rows;
        var cell = tbl[keyId].cells;
        cell[0].innerHTML= name.value;
        cell[1].innerHTML= price.value;
        cell[2].innerHTML= unit.value;
        clsModal.click();}


/*-------------- SHOP LIST ----------------- */

var a1, b1;//global variable for updating & deleteing shop list item

let favItemSaveCancel = document.body.querySelector('#add-item-saveItem-Cancel'),
	itemTable = document.querySelector('.shop-list-products'),
	favAddForm = document.querySelector('.shop-list-item-container-add'),
	favItemSaveId = document.body.querySelector('#shop-list-item-container-add-iname'),
    favItemQuantity = document.body.querySelector('#shop-list-item-container-add-quantity'),
	clsShopModal = document.body.querySelector('#shop-list-item-clsBtn'),
    shopmodal = document.querySelector('#shop-list-item-modal');

// Load shop list
let loadShoppingList = () =>{
    let dataItem = JSON.parse(localStorage.getItem('mydata'));
    for(let i =0; i<dataItem.fav.length; i++){
        let uL = document.querySelector('ul'),
            list = document.createElement('li'),
			link = document.createElement('a');
		    
		let delBtn = document.createElement("span");
            delBtn.classList.add("shop-list-delBtn");
            delBtn.addEventListener('click',function(){confirmFavDelete();});
            delBtn.title="Delete";
            delBtn.textContent = String.fromCharCode(10005);
		link.textContent = dataItem.fav[i].name;
        let output = uL.appendChild(list).appendChild(link).appendChild(delBtn);
		link.id = dataItem.fav[i].id;
		link.addEventListener('click', () => {
			let listTitle = document.querySelector('.shop-list-table-title');
			listTitle.id = i;
			let tableshow = document.querySelector('.shop-list-content');
			tableshow.style.display = "block";
			listTitle.textContent = dataItem.fav[i].name;
			loadShoppingListItems();
	});
    }
};

// Load List of Shopping list(side nav)
let loadShoppingListItems = () =>{
	let dataItem = JSON.parse(localStorage.getItem('mydata'));
	let favItemheader = document.body.querySelector('.shop-list-table-title');
	let tblBody = document.querySelector("tbody#shop-list-tblBody");
    tblBody.innerHTML = "";
	//check if theres item in shopping list.
	let count = JSON.stringify(dataItem.item);
	if(count.indexOf(favItemheader.textContent) == -1)
		{
			document.querySelector('.shop-list-table-note').style.display = "block";
		}
	else
		{
			document.querySelector('.shop-list-table-note').style.display = "none";
		}
	let totalItem = 0,
		totalPrice = 0;
	
for( let x in dataItem.item)
	{
	  	let newRow = tblBody.insertRow(tblBody.rows.length);
		
		for(var z in dataItem.item[x].list)
		{				
			let favItemheader = document.body.querySelector('.shop-list-table-title');
			if(dataItem.item[x].list[z].listname == favItemheader.textContent)
				{				
					let newTdproduct = newRow.insertCell(0);
					let newTdpriceunit = newRow.insertCell(1);
					let newTdquantity = newRow.insertCell(2);
					let newTdsubtotal = newRow.insertCell(3);
					let newTdoption = newRow.insertCell(4);
					let delBtn = document.createElement("span");
              		delBtn.classList.add("item-list-delBtn");
              		delBtn.addEventListener('click',function(){confirmFavDelete(newTdproduct, newTdquantity);});
              		delBtn.title="Delete";
              		delBtn.textContent = String.fromCharCode(10005);
					newTdproduct.innerHTML = dataItem.item[x].name;
					newTdpriceunit.innerHTML = dataItem.item[x].price + '/' + dataItem.item[x].unit;
					newTdquantity.innerHTML = dataItem.item[x].list[z].quantity;
					newTdquantity.id = z;
					newTdproduct.id = x;
					let subTotal = dataItem.item[x].list[z].quantity * dataItem.item[x].price;
					newTdsubtotal.innerHTML = subTotal;
					newTdoption.appendChild(delBtn);
					totalItem++;
					totalPrice += subTotal;
					
				
						newRow.addEventListener('click', () => {
						if(formLabel.textContent == "Delete Item"){
						  return;
						}
						
						let itemName = document.querySelector('#shop-list-item-container-add-iname'),
						quantity = document.querySelector('#shop-list-item-container-add-quantity');
						itemName.value = newRow.childNodes[0].innerHTML;
						quantity.value = newRow.childNodes[2].innerHTML;
						showItemListUpdate(newTdquantity.id, newTdproduct.id);
						});
				}
		  
		}
	}
	let totalItemDisplay = document.createElement('span');
	let totalDisplay = document.querySelector('.shop-list-table-note');
	if(totalItem != 0){
		
		totalDisplay.style.display = "block";
		totalDisplay.style.color = "#fff";
		
		totalItemDisplay.style.float = "left";
		totalItemDisplay.textContent = "Total Item/s: " + totalItem;
		totalDisplay.textContent = "Total Price: Php " + totalPrice;
		totalDisplay.style.textAlign = "right";
		totalDisplay.appendChild(totalItemDisplay);
	}
	else{
		totalDisplay.textContent = "No Item Available";
		totalDisplay.style.color = "#ff6666";
		totalDisplay.style.textAlign = "center";
		totalItemDisplay.style.display = "none";
	}
}

// Shop List Item Update
let showItemListUpdate = (a,b) =>{
	let formLabel = document.querySelector('.add-item-form-label');
        if(formLabel.textContent == "Delete Item from List"){
          return;
        }
	let shopmodal = document.querySelector('#shop-list-item-modal'),
		itemTable = document.querySelector('.shop-list-products'),
		favAddForm = document.querySelector('.shop-list-item-container-add'),
		labelQuant = document.querySelector('.shop-list-item-form-label'),
		cancelBtn = document.querySelector('#add-item-saveItem-Cancel'),
		saveBtn = document.querySelector('.favItemSave'),
		formTitle = document.querySelector('.shop-list-item-form-label');
		document.querySelector('.shop-list-products-note').style.display = "none";
			shopmodal.style.display = "block";
			itemTable.style.display = "none";
			favAddForm.style.display = "block";
			saveBtn.value = "Update";
			cancelBtn.style.display = "none";
			formTitle.textContent = "Update Item Quantity";
	a1 = a;
	b1 = b;
	
	
}

// Shop Item List
let loadItemList = () =>{
	let shopmodal = document.querySelector('#shop-list-item-modal');
  	let dataItem = JSON.parse(localStorage.getItem('mydata'));
	let favItemheader = document.body.querySelector('.shop-list-table-title');
  	if (dataItem.item.length == 0)
  		{
      		document.querySelector(".shop-list-products-note").style.display = "block";
  		}
  	else
  		{
      		document.querySelector(".shop-list-products-note").style.display = "none";
  		}
    	let productList = document.querySelector(".shop-list-products");
    	productList.innerHTML = "";
		let count = 0;
    	for (let x in dataItem.item) 
    		{
      			var row = document.createElement("li");
				row.classList.add("shop-item-list");
      	 		row.addEventListener('click',() =>{
				let itemName = document.querySelector('#shop-list-item-container-add-iname'),
					saveBtn = document.querySelector('.favItemSave'),
					quantity = document.querySelector('#shop-list-item-container-add-quantity');
				itemName.value = dataItem.item[x].name;
		  		itemName.className = dataItem.item[x].id;
				quantity.value = "";
		  		let itemTable = document.querySelector('.shop-list-products'),
			  	favAddForm = document.querySelector('.shop-list-item-container-add');
		  		itemTable.style.display = "none";
		  		favAddForm.style.display = "block";
				saveBtn.value = "Save";
			});
			let look = JSON.stringify(dataItem.item[x].list);
			
			if(look.indexOf(favItemheader.textContent) == -1)
				{
					count = count + 1;
					
					let cellText = document.createTextNode(dataItem.item[x].name);
					row.appendChild(cellText);
					productList.appendChild(row);
					
				}
				
      		}
	if(count == 0){
		document.querySelector(".shop-list-products-note").style.display = "block";
	}
  }
	
// back to products list
let showItemList = () =>{
	let shopmodal = document.querySelector('#shop-list-item-modal'),
		itemTable = document.querySelector('.shop-list-products'),
		favAddForm = document.querySelector('.shop-list-item-container-add');
		shopmodal.style.display = "block";
		itemTable.style.display = "block";
		favAddForm.style.display = "none";
		favItemSaveCancel.style.display="block";
		loadItemList();
}

// close products list
clsShopModal.addEventListener('click',() =>{
  shopmodal.style.display = "none";
});
// Click Cancel Button Fav Item
favItemSaveCancel.addEventListener('click', () =>{
	 
	itemTable.style.display = "block";
	favAddForm.style.display = "none";
});

// save to fav list
let favItemSave = () => {
	let dataItem = JSON.parse(localStorage.getItem('mydata')),
	    favItemheader = document.body.querySelector('.shop-list-table-title'),
		favfrmLabel = document.body.querySelector('.shop-list-item-form-label'),
	    saveBtn = document.querySelector('.favItemSave'),
		shopmodal = document.querySelector('#shop-list-item-modal'),
		newItem = {};
	if(saveBtn.value == "Save"){
		newItem.quantity = favItemQuantity.value;
		newItem.listname = favItemheader.textContent;
		dataItem.item[favItemSaveId.className].list.push(newItem);
		localStorage.setItem('mydata',JSON.stringify(dataItem));
		itemTable.style.display = "block";
		favAddForm.style.display = "none";
	}
	else{
		console.log(dataItem.item[b1].list[a1].quantity);
       
        
        let updateQuantity = document.querySelector('#shop-list-item-container-add-quantity');
        let updateFavItem = dataItem.item[b1].list[a1];
        updateFavItem.quantity = updateQuantity.value;
        updateFavItem = new Array;
        updateFavItem.splice(0,1, updateFavItem.quantity);
        localStorage.setItem('mydata',JSON.stringify(dataItem));
        //var tbl = document.querySelector('#shop-list-tblBody').rows;
       // var cell = tbl[keyId].cells;
       // cell[2].innerHTML= unit.value;
		shopmodal.style.display = "none";
	}
	
	loadItemList();
	loadShoppingListItems();
}

// show Input fields side nav bar shop
let showinputlist =  () => {
	let addshoplistBtn = document.querySelector('.shop-list-sidenav-head-add');
	addshoplistBtn.classList.toggle("shop-list-input-active");
	document.querySelector('#list-input').value = "";
	
	let panel = document.querySelector('.shop-list-input');
	if (panel.style.maxHeight){
      panel.style.maxHeight = null;
		addshoplistBtn.textContent = "+";
    } else {
      panel.style.maxHeight = panel.scrollHeight + "px";
		addshoplistBtn.textContent = String.fromCharCode(8211);
    } 
}

// Stop Bubble event;
let addfav = (event) =>{
	event.preventDefault();
	if (event.keyCode === 13) {
		
	var dataItem = JSON.parse(localStorage.getItem('mydata'));
	var id = getId2();
	var name = document.querySelector('#list-input');
	var newItem = {};
	newItem.id = id;
	newItem.name = name.value;
		if(name.value == ""){
			let tooltip = document.querySelector(".tooltiptext");
			tooltip.style.visibility= "visible";
			tooltip.style.opacity = 1;
			setTimeout(hidden, 3000)
			function hidden(){
				
				tooltip.style.opacity = 0;
				tooltip.style.visibility= "hidden";
			}
		}
	else{
	dataItem.fav.push(newItem);
	localStorage.setItem('mydata', JSON.stringify(dataItem));
	var uL = document.querySelector('ul');
	uL.innerHTML = "";
	loadShoppingList();
	name.value = "";
	name.focus();
	}
	}
};

//generate fav id
let getId2 = () =>{
  var dataItem = JSON.parse(localStorage.getItem('mydata'));
  var result = dataItem.fav.find(look);
  function look(fav){
    var input = dataItem.item.length;
    return fav.id === input; 
  }
  if (result != null){
    var sum = dataItem.fav.length + 1;
    return sum;
    
  }
  else{
    return dataItem.fav.length;
    
  }}

// delete fav Item
let confirmFavDelete = (r, u) =>{
        let i = r.parentNode.parentNode.rowIndex;
        let dataItem = JSON.parse(localStorage.getItem('mydata'));
        let formLabel = document.querySelector('.add-item-form-label');
        let container = document.querySelector('.add-item-container');
        let deletemessage = document.querySelector('.delete-message');
        let deleteContainer = document.querySelector('.add-item-delete-container');
        var modal = document.querySelector('#add-item-modal');
        deletemessage.id = i;
        deletemessage.textContent = r.textContent;
        // form 
        formLabel.textContent = "Delete Item from List";
		
        container.style.display = "none";
        deleteContainer.style.display = "block";
        modal.style.display = "block";
	a1 = u.id;
	b1 = r.id;
        
}

//Delete Item in Storage & Fav List
let deleteItem = () =>{
		let formLabel = document.querySelector('.add-item-form-label');
	if(formLabel.textContent == "Delete Item")
	{
        let deletemessage = document.querySelector('.delete-message');
        let i = deletemessage.id;
        let dataItem = JSON.parse(localStorage.getItem('mydata'));
        let newi= i - 1;
        dataItem.item.splice(newi,1);
        localStorage.setItem('mydata',JSON.stringify(dataItem));
        let tblBody = document.getElementById("item-list-tblBody");
        tblBody.innerHTML = "";
        loadTable();
	}
	else{
		let dataItem = JSON.parse(localStorage.getItem('mydata'));
		dataItem.item[b1].list.splice(a1, 1);
		localStorage.setItem('mydata',JSON.stringify(dataItem));
		let tblBody = document.getElementById("shop-list-tblBody");
        tblBody.innerHTML = "";
		loadShoppingListItems();
	}
}






