$(function() {
  $("#quoteform").validate({
    rules: {
      name: {
        required: true,
      },
      country: {
        required: true,
      },
      phone: {
        required: true,
      },
      email: {
        required: true,
        email: true
      },
      message: {
        required: true,
      },
    },
    onkeyup: true,
    submitHandler: function(form) {
      let data = $("#quoteform").serialize();
      $("#submitbtn").attr("type", "button");
      $("#submitbtn").text("sending...");
      $.ajax({
        type: "post",
        url: quotedata.adminajax + '?nonce=' + quotedata.nonce,
        data: data,
        dataType: 'json',
        success: function(data) {
          if (data.msg == "ok") {
            window.location.href = "/thanks";
          }else{
            alert(data.msg);
          }
        }
      });
    }
  });
});
