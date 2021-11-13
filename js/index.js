var modal = document.getElementById('modal');
var modalParent = document.getElementById('modal-parent');
var modalTitle = document.getElementById('modal-title');
var modalText = document.getElementById('modal-text');
var modalCloseButton = document.getElementById('modal-close-button');
var bottomNavBar = document.getElementById('bottom-nav');
var computeSection = document.getElementById('BillDesk-Compute');
var showReceiptButton = document.getElementById('btn-show-receipt');
var emptyCartOverlay = document.getElementById('empty-cart');
var cartParent = document.getElementById('cart-parent');
var receiptView = document.getElementById('receipt-view');
var productAddAndCartView = document.getElementById('product-cart-parent');
var customerName = document.getElementById('customer-name-input');
var customerPhoneNumber = document.getElementById('customer-phone');
var newCustomerButton = document.getElementById('new-customer');
var p = document.getElementById('product-name');
var bottomNavBarTotal = document.getElementById('total-amount');
var receiptTotal = document.getElementById('receipt-total-amount');
//Cart item table
var cartTable = document.getElementById('cart-items-table');
//Boolean for storing reset warning permission status
var emptyCartPermission = false;
var newCustomerPermission = false;

var item = {
    productName:"",
    category:"",
    quantity:1,
    priceForOne:0,
    totalPrice:function() {return this.quantity*this.priceForOne;}
}

let itemTemp;
let items = new Array(item);

//disable right click
document.addEventListener('contextmenu', event => event.preventDefault());

//Disable opening developers menu for security
 document.onkeydown = function(e) {
     if(event.keyCode == 123) {
        return false;
     }
     if(e.ctrlKey && e.shiftKey && e.keyCode == 'I'.charCodeAt(0)) {
        return false;
     }
     if(e.ctrlKey && e.shiftKey && e.keyCode == 'C'.charCodeAt(0)) {
        return false;
     }
     if(e.ctrlKey && e.shiftKey && e.keyCode == 'J'.charCodeAt(0)) {
        return false;
     }
     if(e.ctrlKey && e.keyCode == 'U'.charCodeAt(0)) {
        return false;
     }
}

function openModal() {
    modalParent.style.display="flex";
    modalParent.style.animationName="openModalBackground";
    modal.style.animationName="openModal";
}
function closeModal() {
    modalParent.style.animationName="closeModalBackground";
    modal.style.animationName="closeModal";
    setTimeout(function(){ modalParent.style.display="none" }, 200);
}
function modalDataManage(opNnum) {
    switch (opNnum) {
        case 0:
            modalTitle.innerHTML="Services"
            modalText.innerHTML="This is the first launch of BillDesk we'll be coming up with the new services and features in the next updates"
            break;

        case 1:
            modalTitle.innerHTML="Developers"
            modalText.innerHTML="&nbsp;&nbsp;&nbsp;Sairaj Mane <br><br>&nbsp;&nbsp;&nbsp;Pratiksha Shinde"
        break;

        case 2:
            modalTitle.innerHTML="About us"
            modalText.innerHTML="We are beginners in developers community and enthusiasts in web development. This mini web based software is developed as the academics’ microproject, coming up with the realtime application of javascript under the Guidance of  <strong>Mr. S. P. Emekar</strong>. Your feedbacks are awaited..."
        break;

        case 3:
            modalTitle.innerHTML="Privacy Policies"
            modalText.innerHTML="Billdesk is an open source software for calculating the billing amounts at merchant side. It is strictly recommended to be implementted for fair use only. All rights are reserved by the developers."
            break;
    }
    openModal()
}
function addDateToReceipt() {
    var currentdate = new Date(); 
    var datetime = currentdate.getDate() + "/"
                + (currentdate.getMonth()+1)  + "/" 
                + currentdate.getFullYear() + " - "  
                + currentdate.getHours() + ":"  
                + currentdate.getMinutes() + ":" 
                + currentdate.getSeconds();
    document.getElementById('date-time').innerHTML=datetime;
}
function validateAndSetMerchant() {
    var merchant = document.getElementById('landing-view-merchant-name').value;
    var category = document.getElementById('landing-view-category-name').value;

    if(merchant != "" && category !="") {
        //Merchant Name Apply
        document.getElementById('merchant-name').innerHTML=merchant;
        document.getElementById('receipt-head-merchant').innerHTML=merchant;

        //Category Apply
        document.getElementById('category-name').innerHTML=category;
        document.getElementById('receipt-head-category').innerHTML=category;

        //Show customer details view
        showComputeSection();
        computeSection.scrollIntoView({ behavior: 'smooth', block:'start' });

        //Hide landing view after 0.26 seconds
        setTimeout(() => {
            document.getElementById('landing-view').style.display="none";
        }, 260);
        document.getElementById('customer-name-input').focus();
    }
    else {
        alert("Please enter valid Merchant name and Category");
        merchant="";
        category="";
    }
}
function showComputeSection() {
    computeSection.style.display="block";
}
function validateAndSetCustomer() {
    if(customerName.value!=""&&customerPhoneNumber.value!="") {
        document.getElementById('customer-name').innerHTML=customerName.value;
        document.getElementById('customer-phone-number').innerHTML=customerPhoneNumber.value;
        manageProductAddAndCartVisisbility(true);
        allowCustomerDetails(false);
        enableNewCustomerButton(true);

    }
    else {
        alert("Customer details can't be empty !");
    }
}
function allowCustomerDetails(state) {
    var disabled = customerName.disabled;
    if(state) {
        if (disabled) {
            customerName.disabled = false;
            customerPhoneNumber.disabled = false;
        }
    }
    else {
        if (disabled) {

        }
        else {
            customerName.disabled = true;
            customerPhoneNumber.disabled = true;
        }
    }
}
function enableNewCustomerButton(state) {
    var disabled = newCustomerButton.disabled;
    if(state) {
        if(disabled) {
            newCustomerButton.disabled = false;
        }
    }
    else {
        if(disabled) {}
        else {
            newCustomerButton.disabled = true;
        }
    }
}
function manageBottomNavBarVisibility(state) {
    if(state) {
        bottomNavBar.style.display="flex";
    }
    else {
        bottomNavBar.style.display="none";
    }
}
function manageEmptyCartOverlayVisibility(state) {
    if(state) {
        emptyCartOverlay.style.display="flex";
    }
    else {
        emptyCartOverlay.style.display="none";
    }
}
function manageCartVisibility(state) {
    if(state) {
        cartParent.style.display="block";
    }
    else {
        cartParent.style.display="none";
    }
}
function manageReceiptVisibility(state) {
    if(state) {
        receiptView.style.display="block";
    }
    else {
        receiptView.style.display="none";
    }
}
//Check if user pressed enter in last input of product details
function checkIfEnterPressed(event) {
    if (event.keyCode === 13) {
        event.preventDefault();
        addProductToCart();
      }
}
//Add items to the items array nd make navbar, cart visible
function addProductToCart() {
    tempProductName = document.getElementById('product-name').value;
    tempCategory = document.getElementById('product-category').value;
    tempPriceForOne = document.getElementById('product-price').value;
    tempQuantities = document.getElementById('product-quantities').value;
    if(tempProductName!="" && tempPriceForOne!="" && tempQuantities!="") {
        const itemTemp = Object.create(item);
        itemTemp.productName=tempProductName;
        itemTemp.category=tempCategory;
        itemTemp.quantity=tempQuantities;
        itemTemp.priceForOne=tempPriceForOne;
        if (itemTemp.priceForOne>=0) {
            //Add temp element to cart
            items.push(itemTemp);
            //render right cart
            popFromCart();
            pushToCart();
            //reset text boxes for next products
            resetProductDetails();  
            //document.getElementById('product-name').focus;
    
            manageEmptyCartOverlayVisibility(false);
            manageCartVisibility(true);
            manageBottomNavBarVisibility(true);
            renderTotal();
        }
        else {
            alert("Oops, you entered wrong product details!")
            resetProductDetails();
        }
    }
    else {
        alert("Oops, you entered wrong product details!")
        resetProductDetails();
    }
}
function resetProductDetails() {
    document.getElementById('product-name').value="";
    document.getElementById('product-category').value="";
    document.getElementById('product-price').value="";
    document.getElementById('product-quantities').value="1";
    p.focus();
}
//Add items to the right cart
function pushToCart() {

    //render cart items
    for (let index = 1; index < items.length; index++) {
        
        //Html row element
        var tempRowData = document.getElementById('itemDummyParent').innerHTML;
        const element = items[index];

        //Adding row to table
        var row = cartTable.insertRow(0);
        var cell = row.insertCell(0);
        cell.innerHTML = tempRowData;

        //Remove absolute position
        var tempRow= document.querySelector("#cart-items-table tbody tr td #item-id");
        tempRow.removeAttribute('style');

        //Enter all values
        document.querySelector("#cart-items-table tbody tr td #item-id #item-product-name-category-id #item-product-name-id").innerHTML=element.productName;
        document.querySelector("#cart-items-table tbody tr td #item-id #item-product-name-category-id #item-category-id").innerHTML=element.category;
        document.querySelector("#cart-items-table tbody tr td #item-id  #item-quantity-id").innerHTML=element.quantity;
        document.querySelector("#cart-items-table tbody tr td #item-id #item-total-price-id").innerHTML=element.totalPrice();

        //remove all ids
        document.querySelector("#cart-items-table tbody tr td #item-id #item-product-name-category-id #item-product-name-id").removeAttribute('id');
        document.querySelector("#cart-items-table tbody tr td #item-id #item-product-name-category-id #item-category-id").removeAttribute('id');
        document.querySelector("#cart-items-table tbody tr td #item-id  #item-quantity-id").removeAttribute('id');
        document.querySelector("#cart-items-table tbody tr td #item-id #item-total-price-id").removeAttribute('id');
    }
}
//Remove all items from cart
function popFromCart() {
    var rowCount = cartTable.rows.length;
    for (var i = rowCount-1; i > -1; i--) {
        cartTable.deleteRow(i);
    }
    p.focus;
}
//Removes all items from items array
function emptyCart(state) {
    if(state==1) {
        if(emptyCartPermission==true) {
        emptyCart();
        popFromCart();
        }
        else {
            var ask = confirm("You'll loose all the bill records of current customer ! This warning won't be displayed again for better experience");
            if(ask==true) {
                emptyCart();
                emptyCartPermission=true;
            }
        }
    }

    else {
    manageEmptyCartOverlayVisibility(true);
    manageCartVisibility(false);
    manageBottomNavBarVisibility(false);
    while(items.length > 1) {
        items.pop();
    }
    popFromCart();
    renderTotal();
    hideReceipt();
}
}
//Render receipt and bring it to view
function showReceipt() {
    if(showReceiptButton.innerText=="Show receipt") {
        addDateToReceipt();
        for (let index = 1; index < items.length; index++) {
            var table = document.getElementById("receipt-table");
            var row = table.insertRow(index);
            var cell1 = row.insertCell(0);
            var cell2 = row.insertCell(1);
            var cell3 = row.insertCell(2);
            var cell4 = row.insertCell(3);
            cell1.innerHTML = items[index].productName;
            //Check if price is zero, if zero set to Free
            if (items[index].priceForOne==0) {
                cell2.innerHTML = "Free";
            }
            else {
                cell2.innerHTML = items[index].priceForOne;
            }
            cell3.innerHTML = items[index].quantity;
            cell4.innerHTML = items[index].totalPrice();
        }
        showReceiptButton.innerText="Hide receipt";
        manageReceiptVisibility(true);
        receiptView.scrollIntoView({ behavior: 'smooth', block:'start' });
    }
    else hideReceipt();
}
//New customer set everything to default
function newCustomer() {
    //Make items array empty
    if (newCustomerPermission==true) {
        emptyCart();
        allowCustomerDetails(true);
        enableNewCustomerButton(false);
        hideReceipt();
        manageProductAddAndCartVisisbility(false);
        document.getElementById('customer-name-input').value="";
        document.getElementById('customer-phone').value="";
        document.getElementById('customer-name-input').focus();
    }
    else {
        var tempPermission = confirm("You'll loose all current customer details ! Do you want to proceed ? This warning won't be shown again for better experience !");
        if (tempPermission==true) {
            newCustomerPermission=true;
            newCustomer();
        }
    }

}
function hideReceipt() {
    var table = document.getElementById("receipt-table");
    showReceiptButton.innerText="Show receipt";
    manageReceiptVisibility(false);
    var rowCount = table.rows.length;
    for (var i = rowCount - 1; i > 0; i--) {
        table.deleteRow(i);
    }
    p.focus;
}
function printReceipt() 
{
    addDateToReceipt();
    document.getElementById('receipt-view-head').style.display="none";
    var divContents = document.getElementById("receipt-view").innerHTML;
    var printWindow = window.open('', '', 'height=1000px,width=1000px');  
    printWindow.document.write('<html><head><style>#receipt { display: block; margin: auto; background: #F9F9F9; border-radius: 30px; width: 950px; margin-top: 40px; padding-bottom: 25px; } #receipt-head { padding: 37px; display: flex; align-items: center; } #receipt-head svg { height: 64px; width: 64px; padding: 30px; background: #EDEEEF; border-radius: 28px; margin-right: 30px; } #receipt-head-merchant-category p:nth-child(1) { font-family: "Poppins",sans-serif; font-size: 34px; font-weight: 900; width: 540.60px; margin:0px 0px;} #receipt-head-merchant-category p:nth-child(2) { font-family: "Poppins",sans-serif; font-size: 24px; font-weight: 500; width: 540.60px; margin:0px 0px;} .receipt-head-vacant { width: 0px; } #date-time { font-family: Poppins; font-style: normal; font-weight: 500; font-size: 14px; line-height: 21px; color: #B2B2B2; } #receipt-table { border: 0; margin: 0px 37px; } #receipt-table-header-row { background: #E0E0E0; height: 45px; font-family: "Poppins",sans-serif; font-style: normal; font-weight: 400; font-size: 16px; line-height: 27px; color: #000000; } #receipt-table-header-row th { font-weight: 600; border-radius: 5px; } tbody tr { height: 40px; } tbody tr td { text-align: center; font-family: "Poppins"; background: #f3f3f3; border-radius: 5px; overflow-wrap: break-word; } .receipt-total-div { width: 950px; display: flex; justify-content: end; align-items: center; margin-top: 25px; padding: 0px 37px; } .receipt-total-div p { font-family: Poppins; font-style: normal; font-weight: bold; font-size: 20px; line-height: 36px; color: #2990EF; margin-right:100px;} #receipt-total-amount::before { content: "₹"; font-family: sans-serif; } .receipt-customer-name-contact { margin-left: 37px; margin-top: -30px; margin-bottom: 10px; display: flex; font-family: "Poppins", sans-serif; } .receipt-customer-name-contact p{ overflow-wrap: break-word; font-size: 20px; } .receipt-customer-name-contact p #title { font-size: 20px; font-weight: 500; } #customer-name { margin-right: 20px; }</style><title>Print receipt</title>');  
    printWindow.document.write('</head><body>');  
    printWindow.document.write(divContents);
    printWindow.document.write('</body></html>');
    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
    document.getElementById('receipt-view-head').style.display="flex";
    printWindow.close(); 
}
//Hide or view the product and cart
function manageProductAddAndCartVisisbility(state) {
    if(state) {
        productAddAndCartView.style.display="flex";
        productAddAndCartView.scrollIntoView({behavior: "smooth",block:'center'});
    }
    else {
        productAddAndCartView.style.display="none";
    }
    setTimeout(() => {
        p.focus();
    }, 240);
}
//Hide receipt when any input in product details is focused
function checkNdHideReceipt() {
    if(receiptView.style.display=="none") { }
    else { hideReceipt();}
}
//Render total at all places
function renderTotal() {
    var total = 0;
    items.forEach(element => {
        total += element.totalPrice();
    });
    bottomNavBarTotal.innerText=total;
    receiptTotal.innerText=total;
}
//Check screen width and proceed
function checkScreenWidthProceed() {
    var contentHiderSec = document.getElementById('web-hider');
    if (window.innerWidth <= 1096) {
        contentHiderSec.style.display='flex';
    }
    else {
        contentHiderSec.style.display='none';
    }
}