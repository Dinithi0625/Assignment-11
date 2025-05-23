import {customer_array, item_array, order_array,cart_array,sub_total} from "../db/database.js";
import cartModel from "../model/cartModel.js";
import orderModel from "../model/orderModel.js";

import {validateEmail, validateMobile} from "../util/validation";
import customerModel from "../model/customerModel";

let total = 0;
const selectedId = $(this).val(); // Get the selected value (id)
const selectedText = $("#itemSelect option:selected").text(); // Get the selected text (description)
console.log("Selected ID: ", selectedId);
console.log("Selected Text: ", selectedText);

const loadCart = () => {
    $('#orderItemsList').empty()
    cart_array.map((item, index) => {
        console.log(item);
        let data = `<tr>
        <td>${item.cartItem}</td>
        <td>${item.price}</td>
        <td>${item.quantity}</td>
        <td>${item.total}</td>
    </tr>`
        $('#orderItemsList').append(data)

    });
};
function loadTotal() {
     total = sub_total.reduce(function(sum, number) {
        return sum + number;
    }, 0);
    console.log("TotalSub: ", total);

// Display the sum in the designated span
    $('#subtotal').text(total);
}

function subTotal() {
    let discount = $('#discountInput').val();
    console.log("Discount: ", discount);
    let dis = total * (discount/100);
    let subTotal = total - dis;
    $('#totalAmount').text(subTotal);
}



function getItemPrice() {
    let item_name = $('#itemSelect option:selected').text();
    console.log("Selected item ID: ", item_name);

    let selectedItem = item_array.find(item => item.description === item_name);
    console.log("Selected item: ", selectedItem)

    // Check if the item was found and get the price
    if (selectedItem) {
        console.log(`Price of selected item: ${selectedItem.unitPrice}`);
        return selectedItem.unitPrice;
    } else {
        console.log("Item not found.");
        return null;
    }
}
$("#confirm-discount").on("click " ,function (){
    subTotal();
    console.log("Discount Confirmed");
})

let item_name = null
let qty = null
let customerSelected = null
$("#addItemBtn").on("click " ,function (){
     item_name = $('#itemSelect option:selected').text();
     customerSelected = $('#customerSelect option:selected').text();
     qty = $('#quantitySelect').val();
    let unit_price = getItemPrice();
    let total = qty * unit_price;
    console.log("price",unit_price,"total",total);

    let id = cart_array.length + 1;
    let cart = new cartModel(id,item_name,qty,unit_price,total);
    cart_array.push(cart);
    sub_total.push(total);

    $('#itemSelect').val("");
    $('#qty').val("");
    $('#customerSelect').val("");

    loadCart()
    console.log("Cart Loaded");
    loadTotal()
    console.log("Total Loaded");


})
export function loadCustomers() {
    console.log("Customer Controller Loaded");

    // Clear existing options in the select element
    $("#customerSelect").empty();

        console.log("Customers available.");
        customer_array.map((item) => {
            // Create a new option element
            let option = `<option >${item.first_name}</option>`; // Assuming item has an 'id' property
            console.log(option); // Log the option for debugging
            $("#customerSelect").append(option); // Append option to the select element
        });

}

export function loadItems() {
    console.log("Item Controller Loaded");

    $("#itemSelect").empty();
    item_array.map((item) => {
        // Create a new option element
        let option = `<option >${item.description}</option>`; // Assuming item has an 'id' property
        console.log(option); // Log the option for debugging
        $("#itemSelect").append(option); // Append option to the select element
    });

}

$("#customerSelect").on('click' ,function () {
    loadCustomers();
});
$("#itemSelect").on('click' ,function () {
    loadItems();
});

const formattedDate = currentDate.toLocaleDateString();
console.log(formattedDate);


document.getElementById('placeOrderBtn').addEventListener('click', function () {
    const selectedPaymentMethod = document.querySelector('input[name="paymentMethod"]:checked').value;
    let qty = $('#quantitySelect').val();
    let total = $('#totalAmount').text();
    let discount = $('#discountInput').val();
    console.log(customerSelected,item_name,qty,total,discount,selectedPaymentMethod);

    if (qty===0){
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Invalid Qty!",
        });

    }else if (customerSelected== null){
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Select customer!",
        });
    }else if (item_name== null){
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Select Item!",
        });
    }
    else if (selectedPaymentMethod== null){
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Please Select Payment Method!",
        });
    }else {
        let id = customer_array.length+1;
        let newOrder = new orderModel(id,formattedDate,customerSelected,item_name,qty,selectedPaymentMethod,discount,total);

        order_array.push(newOrder);
        Swal.fire({
            icon: "success",
            title: "Success",
            text: "Order Placed Successfully!",
        });


        $('#itemSelect').val('')
        $('#customerSelect').val('')
        $('#quantitySelect').val('')
        $('#discountInput').val('')
        $('#address').val('')


    }


});


