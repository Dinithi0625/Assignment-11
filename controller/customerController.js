import customerModel from "../model/customerModel.js";
import {customer_array} from "../db/database.js";
import {validateEmail, validateMobile} from "../util/Validation.js";

let selected_customer_index = null

console.log("Customer Controller Loaded")

const loadCustomerTable = () => {
    $('#customerTableBody').empty()
    customer_array.map((item, index) => {
        console.log(item);
        let data = `<tr>
        <td>${item.first_name}</td>
        <td>${item.last_name}</td>
        <td>${item.mobile}</td>
        <td>${item.email}</td>
        <td>${item.address}</td>
    </tr>`
        $('#customerTableBody').append(data)

    });
};


$("#add-customer").on("click " ,function (){
    let first_name = $('#firstName').val();
    let last_name = $('#lastName').val();
    let mobile = $('#mobile').val();
    let email = $('#email').val();
    let address = $('#address').val();
    console.log(first_name,last_name,mobile,email,address)

    if (first_name.length===0){
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Invalid First Name!",
        });

    }else if (last_name.length===0){
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Invalid Last Name!",
        });
    }else if (!validateEmail(email)){
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Invalid Email!",
        });
    }
    else if (!validateMobile(mobile)){
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Invalid Mobile!",
        });
    }
    else if (address.length===0){
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Invalid Address!",
        });
    }else {
        let id = customer_array.length+1;
        let customer = new customerModel(id,first_name,last_name,address,mobile,email);

        customer_array.push(customer);

        $('#firstName').val('')
        $('#lastName').val('')
        $('#email').val('')
        $('#mobile').val('')
        $('#address').val('')

        loadCustomerTable()

    }
})


$('#customerTableBody').on('click', 'tr', function (){
    let value = $(this).index()

    let customer = customer_array[value];
    console.log(customer)
    selected_customer_index = value

    let first_name = customer.first_name;
    let last_name = customer.last_name;
    let email = customer.email;
    let tel = customer.mobile;
    let address = customer.address;

    $('#firstName').val(first_name)
    $('#lastName').val(last_name)
    $('#email').val(email)
    $('#mobile').val(tel)
    $('#address').val(address)
})

$('#update-customer').on('click', function (){
    let first_name = $('#firstName').val();
    let last_name = $('#lastName').val();
    let mobile = $('#mobile').val();
    let email = $('#email').val();
    let address = $('#address').val();

    let index = selected_customer_index;
    Swal.fire({
        title: "Do you want to save the changes?",
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: "Save",
        denyButtonText: `Don't save`
    }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
            let customer = new customerModel(customer_array[index].id,first_name,last_name,address,mobile,email);

            customer_array[selected_customer_index] = customer

            $('#firstName').val('')
            $('#lastName').val('')
            $('#email').val('')
            $('#mobile').val('')
            $('#address').val('')

            loadCustomerTable()

            Swal.fire("Saved!", "", "success");
        } else if (result.isDenied) {
            Swal.fire("Changes are not saved", "", "info");
        }
    });



})
$('#delete-customer').on('click', function (){
    let index = selected_customer_index
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
            customer_array.splice(index, 1)
            loadCustomerTable()
            Swal.fire({
                title: "Deleted!",
                text: "Your file has been deleted.",
                icon: "success"
            });
        }
    });

    $('#firstName').val('')
    $('#lastName').val('')
    $('#email').val('')
    $('#mobile').val('')
    $('#address').val('')


})
