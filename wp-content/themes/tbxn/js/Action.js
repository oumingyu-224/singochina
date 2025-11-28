$(function(){
  // 搜索弹窗
  $(".search_switch").on("click",function(){
    event.stopPropagation();
    $(".search_layer").addClass("active")
  })
  $(".search_close").on("click",function(){
    $(".search_layer").removeClass("active")
  })

  // 返回顶部
  $(window).scroll(function(){
    var docHeight = $(document).height()
    var winHeight = $(window).height();
    var scrollTop = $(window).scrollTop();
    if(scrollTop >= 800){
    	$('.top').fadeIn(500)
    }else{
    	$('.top').fadeOut(500)
    }
    if(scrollTop >= docHeight - winHeight){
      $('.top').addClass('bottom')
    }else{
      $('.top').removeClass('bottom')
    }
  })

  $(".top").on("click",function(){
    $("html,body").animate({"scrollTop":"0"},500)
  })

  // 导航
  $(".head_icon").on("click",function(event){
    event.stopPropagation();
    $(".sidebar_box").addClass("active")
  })

  var pageWidth=$(window).width();
  if(pageWidth > 768){
    // 放大图片
    $(".mask,.img_close").on("click",function(){
      $(".imgPopup_cont").find("img").attr("src","");
      $(".imgPopup").hide();
      $(".imgPopup_screen").removeClass("active")
      exitFullScreen()
    })
    

    $(".imgPopup_zoom").on("click",function(){
      $(".imgPopup_cont").toggleClass("active")
    })

    $(".imgPopup_screen").on("click",function(){
      if(!$(this).hasClass("active")){
        $(this).addClass("active")
        fullScreen()
      } else {
        $(this).removeClass("active")
        exitFullScreen()
      }
    })

    $(document).click(function(e){
      var target = $(e.target);
      if(target.closest(".sidebar_box").length != 0) return;
      $(".sidebar_box").removeClass("active")
    })
  } else {
    $(document).click(function(e){
      var target = $(e.target);
      if(target.closest(".goods_supplier_cont").length != 0) return;
      $(".goods_supplier_cont").hide()
    })
  }

  
  // 全屏
  function fullScreen() {
    var elem = document.body;
    if (elem.webkitRequestFullScreen) {
        elem.webkitRequestFullScreen();
    } else if (elem.mozRequestFullScreen) {
        elem.mozRequestFullScreen();
    } else if (elem.requestFullScreen) {
        elem.requestFullscreen();
    } else {
        notice.notice_show("浏览器不支持全屏API或已被禁用", null, null, null, true, true);
    }
  }

  // 禁止全屏
  function exitFullScreen() {
      var elem = document;
      if (elem.webkitCancelFullScreen) {
          elem.webkitCancelFullScreen();
      } else if (elem.mozCancelFullScreen) {
          elem.mozCancelFullScreen();
      } else if (elem.cancelFullScreen) {
          elem.cancelFullScreen();
      } else if (elem.exitFullscreen) {
          elem.exitFullscreen();
      } else {
          notice.notice_show("浏览器不支持全屏API或已被禁用", null, null, null, true, true);
      }
  }
  

  // 返回顶部
  $(".top").on("click",function(){
    $("html,body").animate({"scrollTop":"0"},500)
  })

  headerFix()
  //头部置顶固定
  function headerFix(){
    var iWSon = document.documentElement.clientWidth;
    var $windowHeight = $(window).height();
    var bodyHeight = $(document.body).height();
    var $headerHeight = $('.header').height();
    $(window).scroll(function(){
      var scrollTop = $(window).scrollTop();
      if(scrollTop >= $headerHeight && bodyHeight > $windowHeight+$headerHeight*2){
        if(iWSon > 1080){
          $('.header').addClass('active');
        }else{
          $('.header').removeClass('active');
        }
      }else{
        $('.header').removeClass('active');
      }
    })
  }

  
  //  出现联系弹窗
   $(".popup_show").on("click",function(){
    $(".contact_popup").show()
  })
  $(".mask,.contact_popup_close").on("click",function(){
    $(".contact_popup").hide()
  })

  // 视频弹窗  视频播放和关闭
  $(".video_show").on("click",function(){
    let activeSrc=$(this).attr("data-src");
    $(".video_promt").show()
    $("#video_iframe").attr("src",activeSrc)
  })

  $(".video_close,.mask").on("click",function(){
    $(".video_promt").hide()
    $("#video_iframe").attr("src","")
  })
  

})


//移动端
//侧边导航
$(function(){
  // 语言点击
  $('.phone_lang_switch').click(function(){
    if($(this).hasClass('active')){
      $(this).removeClass('active');
      $('.lang_nav').css('height','0%');
    }else{
      $(".navbar-menu").removeClass('navbar-true');
      $('.phone_nav').css('height','0%');
      $(this).addClass('active');
      $('.lang_nav').css('height','100%');
    }
  });

  // 产品详情客服
  $(".goods_supplier_phone_icon").on("click",function(){
    event.stopPropagation();
    $(".goods_supplier_cont").show()
  })

  // 菜单点击
  $('.navbar-menu').click(function(){
    if($(this).hasClass('navbar-true')){
      $(this).removeClass('navbar-true');
      $('.phone_nav').css('height','0%');
    }else{
      $(".phone_lang_switch").removeClass('active');
      $('.lang_nav').css('height','0%');
      $(this).addClass('navbar-true');
      $('.phone_nav').css('height','100%');
      
    }
  });


  // 移动端搜索点击
  $('.phone_search').click(function(){
    if($(this).hasClass('active')){
      $(this).removeClass('active');
      $('.phone_search_popup').removeClass("active");
    }else{
      $(this).addClass('active');
      $('.phone_search_popup').addClass("active");
    }
  });

  // 移动端主导航展开
  $(".phone_nav_arrow").on("click",function(){
    $(this).parents(".phone_nav_top").toggleClass("active").siblings().removeClass("active");
    $(this).parents(".phone_nav_top").next().fadeToggle();
    $(this).parents("li").siblings().find(".phone_nav_drop").hide();
  })

   // 移动端主导航展开
   $(".level3_arrow").on("click",function(){
    $(this).parents(".phone_nav_level").toggleClass("active").siblings().removeClass("active");
    $(this).parents(".phone_nav_level_top").next().fadeToggle();
    $(this).parents(".phone_nav_level").siblings().find(".phone_nav_level_list").hide();
  })



})