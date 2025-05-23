import LoginModel  from "../model/login";

$('#login').on('click', function() {
    const username = $('#username').val();
    const password = $('#password').val();

    if (username && password) {
        $('#loginForm').hide();
        $('#dashboard').show();
    }
})
