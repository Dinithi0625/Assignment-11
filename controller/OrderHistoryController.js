import { order_array } from "../db/database.js";

const loadOrderTable = () => {
    console.log("Loading History Table");
    $('#orderHistory').empty();

    order_array.forEach((item) => {
        console.log("Order Item:", item);
        let data = `<tr>
            <td>${item.id}</td>
            <td>${item.customer}</td>
            <td>${item.item}</td> <!-- Removed item() -->
            <td>${item.qty}</td> <!-- Removed qty() -->
            <td>${item.paymentMethod}</td>
            <td>${item.discount}</td>
            <td>${item.total}</td>
        </tr>`;
        $('#orderHistory').append(data);
    });
};

// Ensure the DOM is ready before attaching events
$(document).ready(() => {
    console.log("DOM is fully loaded");

    // Attach click event to the refresh button
    $("#refresh").on("click", function () {
        console.log("Refresh button clicked");
        loadOrderTable();
    });

    // Optionally auto-load the table on page load
    loadOrderTable();
});
