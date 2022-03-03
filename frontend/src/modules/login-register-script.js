import {serverConnection} from './server-communication.js';
import { dadosGlobais } from './global-data.js'

$(document).ready(function(){
    let usernameRegisterError = false;
    let usernameLoginError = false;
    let passwordRegisterError = false;
    let passwordLoginError = false;
    let namepetRegisterError = false;

    function validateUsernameRegister() {
        const usernameValue = $('#username_reg').val();
        if (usernameValue.length == '') {
            $('#usercheckregister').show();
            usernameRegisterError = true;
        } else if(!(/^[a-zA-Z]\w{2,14}$/.test(usernameValue))) {
            $('#usercheckregister').show();
            $('#usercheckregister').html("**Os usuários devem ter no mínimo 3 caracteres e no máximo 15 caracteres.");
            usernameRegisterError = true;
        } else {
            usernameRegisterError = false;
            $('#usercheckregister').hide();
        }
        return false;
    }
    function validatePasswordRegister() {
        const passwordValue = $('#password_reg').val();
        if (passwordValue.length == '') {
            $('#passcheckregister').show();
            passwordRegisterError = true;
        } else if(!(/^[a-zA-z0-9]{3,8}$/.test(passwordValue))){
            $('#passcheckregister').show();
            $('#passcheckregister').html("**As senhas devem ter no mínimo 3 caracteres e no máximo 8 caracteres.");
            $('#passcheckregister').css("color", "red");
            passwordRegisterError = true;
        } else {
            passwordRegisterError = false;
            $('#passcheckregister').hide();
        }
        return false;
    }
    function validateNamepetRegister() {
        const namepetValue = $("#namepet_reg").val();
        if (namepetValue.length == '') {
            $('#namecheckregister').show();
            namepetRegisterError = true;
        } else if(!(/^[a-zA-Z]\w{2,14}$/.test(namepetValue))) {
            $('#namecheckregister').show();
            $('#namecheckregister').html("**Os pets devem ter no mínimo 3 caracteres e no máximo 15 caracteres.");
            $('#namecheckregister').css("color", "red");
            namepetRegisterError = true;
        } else {
            namepetRegisterError = false;
            $('#namecheckregister').hide();
        }
        return false;
    }
    function validateUsernameLogin() {
        const usernameValue = $('#username_log').val();
        if (usernameValue.length == '') {
            $('#userchecklogin').show();
            usernameLoginError = true;
        } else if(!(/^[a-zA-Z]\w{2,14}$/.test(usernameValue))) {
            $('#userchecklogin').show();
            $('#userchecklogin').html("**Os usuários devem ter no mínimo 3 caracteres e no máximo 15 caracteres.");
            usernameLoginError = true;
        } else {
            usernameLoginError = false;
            $('#userchecklogin').hide();
        }
        return false;
    }
    function validatePasswordLogin() {
        const passwordValue = $('#password_log').val();
        if (passwordValue.length == '') {
            $('#passchecklogin').show();
            passwordLoginError = true;
        }  else if(!(/^[a-zA-z0-9]{3,8}$/.test(passwordValue))) {
            $('#passchecklogin').show();
            $('#passchecklogin').html("**As senhas devem ter no mínimo 3 caracteres e no máximo 8 caracteres.");
            $('#passchecklogin').css("color", "red");
            passwordLoginError = true;
        } else {
            passwordLoginError = false;
            $('#passchecklogin').hide();
        }
        return false;
    }

    $(".register").hide();
    $(".login_li").addClass("active");
    $(".register_li").click(function(){
        $(this).addClass("active");
        $(".login_li").removeClass("active");
        $(".register").show();
        $(".login").hide();
    });
    $(".login_li").click(function(){
        $(this).addClass("active");
        $(".register_li").removeClass("active");
        $(".login").show();
        $(".register").hide();
    });

    $('#usercheckregister').hide();   
    $('#username_reg').keyup(function () {
        validateUsernameRegister();
    });
    $('#userchecklogin').hide();   
    $('#username_log').keyup(function () {
        validateUsernameLogin();
    });
    $('#passcheckregister').hide();
    $('#password_reg').keyup(function () {
        validatePasswordRegister();
    });
    $('#passchecklogin').hide();
    $('#password_log').keyup(function () {
        validatePasswordLogin();
    });
    $('#namecheckregister').hide();
    $("#namepet_reg").keyup(function () {
        validateNamepetRegister();
    });
    // add enter button functionality
    document.body.addEventListener('keypress', function(event) {
        if (event.key == 'Enter' && $(".login_li").hasClass("active")) {
            $("#btn_login").click();
        } else if (event.key == 'Enter' && $(".register_li").hasClass("active")) {
            $("#btn_register").click()
        }
    });

    $("#btn_register").click(async function(){
        validateUsernameRegister();
        validatePasswordRegister();
        validateNamepetRegister();
        if ((usernameRegisterError == false) && (passwordRegisterError == false) && (namepetRegisterError == false)){
            try{
                await serverConnection.register($("#username_reg").val(), $("#password_reg").val(), $("#namepet_reg").val());
                alert("Usuário cadastrado.")
            }catch(e){
                alert(e);
            }
        }else{
            alert("Por favor verifique os campos.");
        } 
    });
    $("#btn_login").click(async function(){
        validateUsernameLogin();
        validatePasswordLogin();
        if((usernameLoginError == false) && (passwordLoginError == false)){
            try{
                const {user, pet} = await serverConnection.login($("#username_log").val(), $("#password_log").val());
                localStorage.setItem('user_id', String(user.id));
                localStorage.setItem('pet_id', String(pet.id));
                dadosGlobais.setCurrentPet(pet)
                dadosGlobais.setCurrentUser(user)
                window.location.replace('/');
            }catch(e){
                alert(e);
            }
        }else{
            alert("Por favor verifique os campos.");
        } 
    });
});


