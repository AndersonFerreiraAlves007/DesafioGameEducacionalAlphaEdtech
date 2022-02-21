import {serverConnection} from './server-communication.js';
import { dadosGlobais } from './global-data.js'

$(document).ready(function(){
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
    $("#btn_register").click(async function(){
        try{
            await serverConnection.register($("#username_reg").val(), $("#password_reg").val(), $("#namepet_reg").val());
        }catch(e){
            alert(e);
        }
    });
    $("#btn_login").click(async function(){
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
    });
});

