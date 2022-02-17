import {serverConnection} from '../modules/server-communication.js';
$(document).ready(function(){
    $(".login").hide();
    $(".register_li").addClass("active");
    $(".login_li").click(function(){
        $(this).addClass("active");
        $(".register_li").removeClass("active");
        $(".login").show();
        $(".register").hide();
    });
    $(".register_li").click(function(){
        $(this).addClass("active");
        $(".login_li").removeClass("active");
        $(".register").show();
        $(".login").hide();
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
            const {user} = await serverConnection.login($("#username_log").val(), $("#password_log").val());
            localStorage.setItem('user_id', String(user.id));
            window.location.replace('/');
        }catch(e){
            alert(e);
        }
    });
});

