import {serverConnection} from './server-communication.js';
import { dadosGlobais } from './global-data.js'
import { sendNotification } from './notification.js'
import { setCookie } from '../utils/cookies.js'

const loggedUserId = localStorage.getItem('user_id');

if (loggedUserId) {
    window.location.replace('/game.html');
}

async function login(login, password) {
    const {user, pet, token} = await serverConnection.login(login, password);
    localStorage.setItem('user_id', String(user.id));
    localStorage.setItem('pet_id', String(pet.id));
    dadosGlobais.setCurrentPet(pet)
    dadosGlobais.setCurrentUser(user)
    setCookie('access_token', token, 1)
    window.location.replace('/game.html');
}

$(document).ready(function(){

    const userAgentString = navigator.userAgent;

    // Detect Chrome
    let chromeAgent = userAgentString.indexOf("Chrome") > -1;

    // Detect Internet Explorer
    let IExplorerAgent = userAgentString.indexOf("MSIE") > -1 || userAgentString.indexOf("rv:") > -1;

    // Detect Firefox
    let firefoxAgent = userAgentString.indexOf("Firefox") > -1;

    // Detect Safari
    let safariAgent = userAgentString.indexOf("Safari") > -1;
    // Discard Safari since it also matches Chrome
    if ((chromeAgent) && (safariAgent)) safariAgent = false;

    // Detect Opera
    let operaAgent = userAgentString.indexOf("OP") > -1;
    // Discard Chrome since it also matches Opera        
    if ((chromeAgent) && (operaAgent)) chromeAgent = false;



    if(safariAgent){
        $(`
            <div style="width:100%; height:100vh; z-index:3000; background:#FFB100; position: absolute; padding-top: 25vh">
                <p style="text-align: center; text-transform: uppercase; font-family: 'Bubblegum Sans', cursive;
                color: white; font-size: 32px; margin-bottom: 32px;">
                    Atenção!
                </p>

                <p style="text-align: center; text-transform: uppercase; font-family: 'Bubblegum Sans', cursive;
                color: white; font-size: 22px; margin-bottom: 20px;">
                    Para uma experiência de uso adequada, solicitamos que acesse o jogo por meio de um dos seguintes
                    navegadores:
                    <a href="https://www.mozilla.org/pt-BR/firefox/new/">Firefox</a> ou
                    <a href="https://www.google.com/intl/pt-BR/chrome/">Chrome</a>.
                </p>

                <p style="text-align: center; text-transform: uppercase; font-family: 'Bubblegum Sans', cursive;
                color: white; font-size: 22px;">
                    Para uma ótima experiência em dispositivos móveis, indicamos que o jogo seja executado como
                    um app nativo, por meio da opção de instalação de seu navegador.
                </p>
            </div>
        `).insertBefore('.wrapper');

    }else{
        let usernameRegisterError = false;
        let usernameLoginError = false;
        let passwordRegisterError = false;
        let passwordLoginError = false;
        let namepetRegisterError = false;

        function validateUsernameRegister() {
            const usernameValue = $('#username_reg').val().trim().replace(/\s+/, ' ');
            if (usernameValue.length == '') {
                $('#usercheckregister').show();
                usernameRegisterError = true;
            } else if(!(/^[a-zA-Z]\w{2,14}$/.test(usernameValue))) {
                $('#usercheckregister').show();
                $('#usercheckregister').html("Mín 3, máx 15 caracteres alfanuméricos, e deve começar com uma letra.");
                usernameRegisterError = true;
            } else {
                usernameRegisterError = false;
                $('#usercheckregister').hide();
            }
            return false;
        }
        function validatePasswordRegister() {
            const passwordValue = $('#password_reg').val().trim().replace(/\s+/, ' ');
            if (passwordValue.length == '') {
                $('#passcheckregister').show();
                passwordRegisterError = true;
            } else if(!(/^[a-zA-z0-9]{3,10}$/.test(passwordValue))){
                $('#passcheckregister').show();
                $('#passcheckregister').html("Mín 3, máx 10 caracteres alfanuméricos.");
                $('#passcheckregister').css("color", "red");
                passwordRegisterError = true;
            } else {
                passwordRegisterError = false;
                $('#passcheckregister').hide();
            }
            return false;
        }
        function validateNamepetRegister() {
            const namepetValue = $("#namepet_reg").val().trim().replace(/\s+/, ' ');
            if (namepetValue.length == '') {
                $('#namecheckregister').show();
                namepetRegisterError = true;
            } else if(!(/^[a-zA-Z][\w ]{2,49}$/.test(namepetValue))) {
                $('#namecheckregister').show();
                $('#namecheckregister').html("Mín 3, máx 50 caracteres alfanuméricos ou espaços, e deve começar com uma letra).");
                $('#namecheckregister').css("color", "red");
                namepetRegisterError = true;
            } else {
                namepetRegisterError = false;
                $('#namecheckregister').hide();
            }
            return false;
        }
        function validateUsernameLogin() {
            const usernameValue = $('#username_log').val().trim().replace(/\s+/, ' ');
            if (usernameValue.length == '') {
                $('#userchecklogin').show();
                usernameLoginError = true;
            } else if(!(/^[a-zA-Z]\w{2,14}$/.test(usernameValue))) {
                $('#userchecklogin').show();
                $('#userchecklogin').html("Mín 3, máx 15 caracteres alfanuméricos, e deve começar com uma letra.");
                usernameLoginError = true;
            } else {
                usernameLoginError = false;
                $('#userchecklogin').hide();
            }
            return false;
        }
        function validatePasswordLogin() {
            const passwordValue = $('#password_log').val().trim().replace(/\s+/, ' ');
            if (passwordValue.length == '') {
                $('#passchecklogin').show();
                passwordLoginError = true;
            }  else if(!(/^[a-zA-z0-9]{3,10}$/.test(passwordValue))) {
                $('#passchecklogin').show();
                $('#passchecklogin').html("Mín 3, máx 10 caracteres alfanuméricos.");
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
                    await serverConnection.register($("#username_reg").val().trim().replace(/\s+/, ' '), $("#password_reg").val().trim().replace(/\s+/, ' '), $("#namepet_reg").val().trim().replace(/\s+/, ' '));
                    await login($("#username_reg").val().trim().replace(/\s+/, ' '), $("#password_reg").val().trim().replace(/\s+/, ' '))
                    sendNotification('success', "Usuário cadastrado.", 3)
                }catch(e){
                    sendNotification('error', e, 3)
                }
            }else{
                sendNotification('warning', 'Por favor verifique os campos.', 3)
            } 
        });
        $("#btn_login").click(async function(){
            validateUsernameLogin();
            validatePasswordLogin();
            if((usernameLoginError == false) && (passwordLoginError == false)){
                try{
                    await login($("#username_log").val().trim().replace(/\s+/, ' '), $("#password_log").val().trim().replace(/\s+/, ' '))
                }catch(e){
                    sendNotification('error', e, 3)
                }
            }else{
                sendNotification('warning', 'Por favor verifique os campos.', 3)
            } 
        });
    }
});


