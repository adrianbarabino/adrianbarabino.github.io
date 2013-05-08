var request = "";
var works_json = "";

function start () {
	$(".lang").on("click", changeLang);
	$("#jobs li a").attr("href", "javascript:void(0);");
	$("[data-translate]").jqTranslate('index');
	$("#jobs li a[rel]").overlay();
	request = $.getJSON("http://adrianbarabino.com.ar/github/trabajos.json", function (data) {
		works_json = data;
		console.log(works_json);
		$.each(works_json, function (i, val) {
			$("#jobs").append('<li><a href="http://'+val.url+'" rel="#'+val.tag+'"><img src="/images/works/thumb/'+val.tag+'.jpg" alt=""><span>'+val.nombre+' ('+val.fecha+')</span></a></li>')
			$("#container").after('<div class="simple_overlay" id="'+val.tag+'">\n  <figure>\n  	<img src="/images/works/medium/'+val.tag+'.jpg" />\n  </figure>\n \n  <div class="details">\n    <h3>'+val.nombre+'</h3>\n    <h4>'+val.url+'</h4>\n    <span>Año</span>'+val.fecha+'<br>\n    <span>Mi trabajo ahí:</span>\n    <ul>\n    	\n    </ul>\n  </div>\n</div>');
			$.each(val.trabajo, function (i, trabajo) {
				$("div#"+val.tag+" div ul").append("<li>"+trabajo+"</li>");
			})
			
		})
	});
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