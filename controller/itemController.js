import itemModel from '../model/itemModel.js';
import {item_array} from '../db/database.js';

console.log("Item Controller Loaded")

let selected_item_index = null

const loadItemTable = () => {
    $('#itemTableBody').empty()
    item_array.map((item, index) => {
        console.log(item);
        let data = `<tr>
        <td>${item.code}</td>
        <td>${item.description}</td>
        <td>${item.qty}</td>
        <td>${item.unitPrice}</td>
    </tr>`
        $('#itemTableBody').append(data)

    });
};

$("#add-item").on("click", function () {
    let code = $('#itemCode').val();
    let description = $('#description').val();
    let quantity = $('#quantity').val();
    let unitPrice = $('#unitPrice').val();
    console.log("ok",code, description, quantity, unitPrice)

    if (code.length === 0) {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Invalid ID!",
        });

    } else if (description.length === 0) {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Invalid Description!",
        });
    } else if (quantity.length === 0) {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Invalid Quality!",
        });
    } else if (unitPrice.length === 0) {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Invalid Unit Price!",
        });
    } else {
        let id = item_array.length + 1
        let item = new itemModel(id,code, description, quantity, unitPrice);
        console.log("model" ,item)
        item_array.push(item);
        loadItemTable()

        $('#itemCode').val('')
        $('#description').val('')
        $('#quantity').val('')
        $('#unitPrice').val('')
    }
})

$("#itemTableBody").on("click", "tr", function () {
    let value = $(this).index()
    let item = item_array[value]

    console.log(item)

    selected_item_index = value

    let item_code = item.code;
    let description = item.description;
    let quantity = item.qty;
    let unitPrice = item.unitPrice;

    $('#itemCode').val(item_code);
    $('#description').val(description);
    $('#quantity').val(quantity);
    $('#unitPrice').val(unitPrice);
})
$('#update-item').on('click', function () {
    let item_code = $('#itemCode').val();
    let description = $('#description').val();
    let quantity = $('#quantity').val();
    let unitPrice = $('#unitPrice').val();

    Swal.fire({
        title: "Do you want to save the changes?",
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: "Save",
        denyButtonText: `Don't save`
    }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
            console.log(item_code, description, quantity, unitPrice)
            console.log("er",item_array[selected_item_index].id)
            let item = new itemModel(item_array[selected_item_index].id,item_code,description,quantity,unitPrice);

            item_array[selected_item_index] = item

            $('#itemCode').val('')
            $('#description').val('')
            $('#quantity').val('')
            $('#unitPrice').val('')

            loadItemTable()

            Swal.fire("Saved!", "", "success");
        } else if (result.isDenied) {
            Swal.fire("Changes are not saved", "", "info");
        }
    });

})

$('#delete-item').on('click', function (){
    Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
    }).then((result) => {
        if (result.isConfirmed) {
            item_array.splice(selected_item_index, 1)
            loadItemTable()
            Swal.fire({
                title: "Deleted!",
                text: "Your file has been deleted.",
                icon: "success"
            });
        }
    });

    $('#itemCode').val('')
    $('#description').val('')
    $('#quantity').val('')
    $('#unitPrice').val('')

})


