var globali18n;
var I18nUtil = {}
I18nUtil.initAllElement = function() {

    $("span[data-i18n='local']").each(function (index, row) {
        $(row).html($.i18n.prop($(row)
            .attr("data-text")));
    });
    $("select option[data-i18n='local']").each(
        function (index, row) {
            $(row).html($.i18n.prop($(row)
                .attr("data-text")));
        });
    $("title[data-i18n='local']").each(function (index, row) {
        $(row).html($.i18n.prop($(row)
            .attr("data-text")));
    });
    $("input[data-i18n='local']").each(function (index, row) {
        $(row).attr("placeholder",
            $.i18n.prop($(row).attr("data-text")));
    });
    $("textarea[data-i18n='local']").each(function (index, row) {
        $(row).attr("placeholder", $.i18n.prop($(row).attr("data-text")));
    });
    // 国际化登陆页面的登陆按钮，#在这里为了标识为特殊要国际化的
    $("input[data-i18n='#login']").each(function (index, row) {
        $(row).attr("value",
            $.i18n.prop($(row).attr("data-text")));
    });
	$("a[data-i18n='local']").each(function (index, row) {
		$(row).attr('title', $.i18n.prop($(row)
				.attr("data-text")));
	});
	$("div[data-i18n='local']").each(function (index, row) {
		$(row).html($.i18n.prop($(row)
			.attr("data-text")));
	});
}
I18nUtil.initLangOnChangeLang = function() {
	jQuery.i18n.properties({
		name : 'localization',
		path : '/eis/ui/common/i18n/',
		mode : 'map',
		language : this.getLang(),
		callback : function() {
			globali18n = $.i18n;
			I18nUtil.initAllElement();
		}
	});
}
I18nUtil.initLang = function() {
	if (globali18n) {
		this.initAllElement();
	} else {
		I18nUtil.initLangOnChangeLang();
	}
}
I18nUtil.getLang = function() {
	var arr, reg = new RegExp("(^| )mtm_lang=([^;]*)(;|$)");
	if (arr = document.cookie.match(reg)) {
		return (arr[2]);// 返回数组中的第三个，是什么不确定，可能就是(;|$)
	} else {
		return "en";// 如果没有找到，就默认是中文
	}
}
I18nUtil.getSprasLang = function(){
	if (this.getLang() == 'zh') {
		return '1';
	} else {
		return 'E';
	}
}
I18nUtil.getProp = function(key, params) {
	var expression = globali18n.prop(key)
	return I18nUtil.format(expression, params);
}
I18nUtil.format = function(expression, params) {
    if (! params || params.length == 0){
        return expression;
    }
    for (var i = 0; i < params.length; i++) {
        var re = new RegExp('\\{' + i + '\\}', 'gm');
        expression = expression.replace(re, params[i]);
    }
    return expression;
}
/**
 * 初始化指定节点下的对应元素国际化标签
 * @param parentDomObj
 * @param tags
 */
I18nUtil.translate = function(parentDomObj, tags) {
	for(var i = 0; i<tags.length; i++){
		var tag = tags[i];
		var elements = parentDomObj.find(tag + '[data-i18n="local"]');
		if ('span'===tag || 'option' === tag || 'label'  === tag ){
			elements.each(function(index, element){
				$(element).html($.i18n.prop($(element).attr("data-text")));
			});
		} else if('input' ===tag) {
			elements.each(function(index, element){
				$(element).attr('placeholder', $.i18n.prop($(element).attr("data-text")));
			});
		} else if('a' ===tag) {
			elements.each(function(index, element){
				$(element).attr('title', $.i18n.prop($(element).attr("data-text")));
			});
		}
	}
}

/**
 * 设置过期时间，将信息写到cookie
 * @param lang
 */
I18nUtil.changeLang = function(lang) {
	var Days = 7;
	var exp = new Date();// 过期时间
	exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000);
	document.cookie = "mtm_lang=" + escape(lang) + ";expires="
		+ exp.toGMTString() + ";path=/";
	this.initLangOnChangeLang();
}

$(function() {
	if (! I18nUtil.getLang() || 'undefined'==I18nUtil.getLang()) {
		I18nUtil.changeLang('en');
	}
	$("#langchang a").click(function(oEvent) {
        I18nUtil.changeLang($(this).attr("data-i18n-language"));
	});
    I18nUtil.initLang();
});

I18nUtil.initLangByDom = function(dom) {
	if (!globali18n) {
		jQuery.i18n.properties({
			name : 'localization',
			path : '/singob2cmtm/_ui/i18n/',
			mode : 'map',
			language : this.getLang(),
			callback : function() {
				globali18n = $.i18n;
				initByDom(dom);
			}
		});
	}else{
		initByDom(dom);
	}
	function initByDom(dom){
		var _dom = $(dom);
		_dom.find("span[data-i18n='local']").each(function (index, row) {
			$(row).html($.i18n.prop($(row).attr("data-text")));
		});
		_dom.find("select option[data-i18n='local']").each(
			function (index, row) {
				$(row).html($.i18n.prop($(row).attr("data-text")));
			});
		_dom.find("title[data-i18n='local']").each(function (index, row) {
			$(row).html($.i18n.prop($(row).attr("data-text")));
		});
		_dom.find("input[data-i18n='local']").each(function (index, row) {
			$(row).attr("placeholder", $.i18n.prop($(row).attr("data-text")));
		});
		// 国际化登陆页面的登陆按钮，#在这里为了标识为特殊要国际化的
		_dom.find("input[data-i18n='#login']").each(function (index, row) {
			$(row).attr("value", $.i18n.prop($(row).attr("data-text")));
		});
		_dom.find("a[data-i18n='local']").each(function (index, row) {
			$(row).attr('title', $.i18n.prop($(row).attr("data-text")));
		});
		_dom.find("div[data-i18n='local']").each(function (index, row) {
			$(row).html($.i18n.prop($(row).attr("data-text")));
		});
	}
}
