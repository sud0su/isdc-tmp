

$(document).ready(function () {
    $(".dropdown-content>li>a").css("color", "#b71c1c");

    $("#vis_pwd").click(function() {
        var input_pwd = $("#id_password1");
        var re_pwd = $("#id_password2");
        if (input_pwd.attr("type") == "password") {
            input_pwd.attr("type", "text");
            re_pwd.attr("type", "text");
            $("#vis_pwd").html("visibility");
        } else {
            input_pwd.attr("type", "password");
            re_pwd.attr("type", "password");
            $("#vis_pwd").html("visibility_off");
        }
    });

    $("#vis_pwd_login").click(function() {
        var input_pwd_login = $("#id_password");
        if (input_pwd_login.attr("type") == "password") {
            input_pwd_login.attr("type", "text");
            $("#vis_pwd_login").html("visibility");
        } else {
            input_pwd_login.attr("type", "password");
            $("#vis_pwd_login").html("visibility_off");
        }
    });

    // $('.materialize-select').formSelect();
    $('select').formSelect();
    $('.sidenav-left').sidenav();
    $('.collapsible').collapsible();
    $('.collapsible.expandable').collapsible({
        accordion: false
    });
    $('.parallax').parallax();
    $('.carousel').carousel();
    $('.tabs').tabs();
    $('.sidenav-right').sidenav({
        edge: 'right',
        onOpenStart: function(el) {
            console.log(el);
            console.log($('.sidenav-overlay'));
        }
    });
    $('.datepicker').datepicker({
        container: 'body'
    });

    $(".product-menu").closest(".page-wrapper").addClass("container-sidenav-right");
    $(".btn-sidenav-right").on("click", function(){
        // $("body").toggleClass("menuclose");
        $(".page-wrapper").toggleClass("menuclose");
        $(".product-menu").closest(".page-wrapper").toggleClass("container-sidenav-right");
    });
    $(".filter-menu-close").on("click",function(){
        $('.sidenav-right').sidenav('close');
        // $("body").removeClass("menuclose");
    });
    // $('.modal').modal();
    $('.modal').modal({
        // dismissible: true
    });

    $('.dropdown-trigger').dropdown();
    $('.tooltipped').tooltip();
    M.updateTextFields();

    $('#id_resource-time').timepicker({
        onCloseEnd : function(){
            var datetime_metadata = $('#id_resource-date_first').val() + ' ' + $('#id_resource-time').val();
            console.log(datetime_metadata);
            $('#id_resource-date').val(datetime_metadata);
        }
    });
    $('#id_resource-date_first').datepicker({
        format: 'yyyy-mm-dd',
        onClose: function(){
            $('#id_resource-time').timepicker('open');
        }
    });
    $('#id_resource-date').click(function () {
        $('#id_resource-date_first').datepicker('open');
    });

    $('.filter_date').datepicker({
        container: 'body',
        format: 'yyyy-mm-dd'
    });

    $("#search_input").focus(function(){
        $(this).parent().addClass('mobile-search');
        $('.search-close').removeClass('hide');
    }).blur(function(){
        $(this).parent().removeClass("mobile-search");
        $(this).val('');
        $('.search-close').addClass('hide');
    });

    // Trimming breadcrumb on mobile device
    if($('.breadcrumb-universal').width() < 700) {
        console.log($('.breadcrumb-universal').width());
        var breadcrumb_length = $('.breadcrumb-universal a').length;
        // while($('.breadcrumb-universal').width() > 700) {    
            // $('.breadcrumb-universal a').eq(breadcrumb_length-2).remove();
        // }
        console.log(breadcrumb_length);
        // $('.breadcrumb-universal a:first').after('<a class="breadcrumb dropdown-trigger" href="#" data-target="dropdown_breadcrumb_trim">...</a>');
        if (breadcrumb_length > 2 && breadcrumb_length-2 != 0) {
                console.log(breadcrumb_length > 2);
                console.log(breadcrumb_length-2 != 0);
                console.log(breadcrumb_length);
            for (i = 1; i <= breadcrumb_length-2; i++) {
                console.log(i);
                console.log($('.breadcrumb-universal a').eq(i));
                $('<li/>').appendTo('#dropdown_breadcrumb_trim');
                // $('.breadcrumb-universal a').eq(i).remove();
                console.log($('.breadcrumb-universal a.breadcrumb').eq(i).appendTo('#dropdown_breadcrumb_trim li').eq(i));
                // console.log($('.breadcrumb-universal a').eq(i).removeClass('breadcrumb'));
            }
            $('.breadcrumb-universal a:first').after('<a class="breadcrumb dropdown-trigger" href="#" data-target="dropdown_breadcrumb_trim">...</a>');
            console.log($('.breadcrumb.dropdown-trigger'));
            $('#dropdown_breadcrumb_trim li a').removeClass('breadcrumb');
            $('.breadcrumb.dropdown-trigger').dropdown({
                'coverTrigger': false
            });
        }
    }
});