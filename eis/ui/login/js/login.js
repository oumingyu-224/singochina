$(document).ready(function() {

    $('.btn_login_submit').click(function() {
        if ($("[name=j_username]").val() == "" || $("[name=j_password]").val() == "") {
            $("#error_message").text(globali18n.prop("common_js_alert_18"));
            return false;
        }
    });

    $("input[name='j_username']").focus();
});