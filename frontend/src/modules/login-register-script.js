import {serverConnection} from './server-communication.js';
import { dadosGlobais } from './global-data.js'

$(document).ready(function(){
    let usernameRegisterError = true;
    let usernameLoginError = true;
    let passwordRegisterError = true;
    let passwordLoginError = true;
    let namepetRegisterError = true;

    function validateUsernameRegister() {
        let usernameValue = $('#username_reg').val();
        if (usernameValue.length == '') {
            $('#usercheckregister').show();
            usernameRegisterError = false;
            return false;
        }
        else if((usernameValue.length < 3) || (usernameValue.length > 30)) {
            $('#usercheckregister').show();
            $('#usercheckregister').html("**Os usuários devem ter no mínimo 3 caracteres e no máximo 30 caracteres.");
            usernameRegisterError = false;
            return false;
        }
        else {
            usernameRegisterError = true;
            $('#usercheckregister').hide();
            return true;
        }
    }
    function validatePasswordRegister() {
        let passwordValue = $('#password_reg').val();
        if (passwordValue.length == '') {
            $('#passcheckregister').show();
            passwordRegisterError = false;
            return false;
        }
        if ((passwordValue.length < 3) || (passwordValue.length > 30)) {
            $('#passcheckregister').show();
            $('#passcheckregister').html("**As senhas devem ter no mínimo 3 caracteres e no máximo 30 caracteres.");
            $('#passcheckregister').css("color", "red");
            passwordRegisterError = false;
            return false;
        } else {
            passwordRegisterError = true;
            $('#passcheckregister').hide();
            return true;
        }
    }
    function validateNamepetRegister() {
        let namepetValue = $("#namepet_reg").val();
        if (namepetValue.length == '') {
            $('#namecheckregister').show();
            namepetRegisterError = false;
            return false;
        }
        if ((namepetValue.length < 3) || (namepetValue.length > 30)) {
            $('#namecheckregister').show();
            $('#namecheckregister').html("**Os pets devem ter no mínimo 3 caracteres e no máximo 30 caracteres.");
            $('#namecheckregister').css("color", "red");
            namepetRegisterError = false;
            return false;
        } else {
            namepetRegisterError = true;
            $('#namecheckregister').hide();
            return true;
        }
    }
    function validateUsernameLogin() {
        let usernameValue = $('#username_log').val();
        if (usernameValue.length == '') {
            $('#userchecklogin').show();
            usernameLoginError = false;
            return false;
        }
        else if((usernameValue.length < 3) ||(usernameValue.length > 30)) {
            $('#userchecklogin').show();
            $('#userchecklogin').html("**Os usuários devem ter no mínimo 3 caracteres e no máximo 30 caracteres.");
            usernameLoginError = false;
            return false;
        }
        else {
            usernameLoginError = true;
            $('#userchecklogin').hide();
            return true;
        }
    }
    function validatePasswordLogin() {
        let passwordValue = $('#password_log').val();
        if (passwordValue.length == '') {
            $('#passchecklogin').show();
            passwordLoginError = false;
            return false;
        }
        if ((passwordValue.length < 3) || (passwordValue.length > 30)) {
            $('#passchecklogin').show();
            $('#passchecklogin').html("**As senhas devem ter no mínimo 3 caracteres e no máximo 30 caracteres.");
            $('#passchecklogin').css("color", "red");
            passwordLoginError = false;
            return false;
        } else {
            passwordLoginError = true;
            $('#passchecklogin').hide();
            return true;
        }
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

    $("#btn_register").click(async function(){
        validateUsernameRegister();
        validatePasswordRegister();
        validateNamepetRegister();
        if ((usernameRegisterError == true) && (passwordRegisterError == true) && (namepetRegisterError == true)){
            try{
                await serverConnection.register($("#username_reg").val(), $("#password_reg").val(), $("#namepet_reg").val());
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
        if((usernameLoginError == true) && (passwordLoginError == true)){
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

