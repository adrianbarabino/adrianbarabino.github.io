var request = "";
var works_json = "";

function open_work (info) {
	$("#workscontainer").slideDown();
	$($(this).attr("rel")).slideDown();
}
function start () {
	$(".lang").on("click", changeLang);
	$("[data-translate]").jqTranslate('index');
	request = $.getJSON("trabajos.json", function (data) {
		works_json = data;
		console.log(works_json);
		$.each(works_json, function (i, val) {
			$("#works").append('<li><a href="http://'+val.url+'" rel="#'+val.tag+'"><img src="/images/works/thumb/'+val.tag+'.jpg" alt=""><span>'+val.nombre+' ('+val.fecha+')</span></a></li>')
			$("#workscontainer").append('<div class="work" style="display:none;" id="'+val.tag+'">\n<figure>\n	<img src="/images/works/medium/'+val.tag+'.jpg" />\n</figure>\n<div class="details">\n  <h3>'+val.nombre+'</h3>\n  <h4>'+val.url+'</h4>\n  <span>Año</span>'+val.fecha+'<br>\n  <span>Mi trabajo ahí:</span>\n  <ul>\n  </ul>\n</div>\n</div>');
			$.each(val.trabajo, function (i, trabajo) {
				$("div#"+val.tag+" div ul").append("<li>"+trabajo+"</li>");
			})
			
		})
		$("#works li a").on("click", open_work);
		$('#works').movingBoxes({
		startPanel   : 1,      // start with this panel
		reducedSize  : 0.8,    // non-current panel size: 80% of panel size
		wrap         : true,   // if true, the panel will "wrap" (it really rewinds/fast forwards) at the ends
		buildNav     : true,   // if true, navigation links will be added
		navFormatter : function(){ return "&#9679;"; } // function which returns the navigation text for each panel
		});
		setTimeout(function () {

			$("#works li a").attr("href", "javascript:void(0);");
		}, 500);
		
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