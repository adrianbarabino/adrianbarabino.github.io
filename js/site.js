function start () {
	$(".lang").on("click", changeLang);
	$("#jobs li a").attr("href", "javascript:void(0);");
	$("#jobs li a[rel]").overlay();
	$("[data-translate]").jqTranslate('index');
	$('#jobs').movingBoxes({
	startPanel   : 1,      // start with this panel
	reducedSize  : 0.8,    // non-current panel size: 80% of panel size
	wrap         : true,   // if true, the panel will "wrap" (it really rewinds/fast forwards) at the ends
	buildNav     : true,   // if true, navigation links will be added
	navFormatter : function(){ return "&#9679;"; } // function which returns the navigation text for each panel
	});

}

$(document).on("ready", start);



function changeLang (info) {
	id = info.currentTarget.id;
	if(id == "es"){
		$("[data-translate]").jqTranslate('index', {
			forceLang: "es"
		});
	}else{
		$("[data-translate]").jqTranslate('index', {
			forceLang: "en"
		});		
	}
}