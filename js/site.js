// Feature detect + local reference
var storage,
    fail,
    uid;
try {
  uid = new Date;
  (storage = window.localStorage).setItem(uid, uid);
  fail = storage.getItem(uid) != uid;
  storage.removeItem(uid);
  fail && (storage = false);
} catch(e) {}


var request = "";
var works_json = "";
var work_is_open;
work_is_open = false;

	function go_to_bottom (info){
		var n = $(document).height();
	    $('html, body').animate({ scrollTop: n },'50');
	}
	function open_work (info) {
		var actual_work = this;
		console.log(work_is_open);
		if(work_is_open){
				$("#workscontainer .active").slideUp(400, function () {
					$($(actual_work).attr("rel")).slideDown();
					$("#workscontainer .active").removeClass("active");
					$($(actual_work).attr("rel")).addClass("active");

				});
				
		}else{
			$("#workscontainer").slideDown(400, function () {
				$("#workscontainer_inner").fadeIn(400, function () {
					$($(actual_work).attr("rel")).slideDown();
					$("#workscontainer").css({"min-height": "270px"});
					$($(actual_work).attr("rel")).addClass("active");
					go_to_bottom();
				});
			});
			
		}
		
		work_is_open = true;
	}
function close_work (argument) {
	$(".work").slideUp(400, function () {
	$("#workscontainer_inner").fadeOut(400, function () {
		$("#workscontainer").slideUp();
		$("#workscontainer").css({"min-height": "0"});
		$("#workscontainer .active").removeClass("active");
	})});
	
	work_is_open = false;
}
function start () {
	$(".lang").on("click", changeLang);
	$("[data-translate]").jqTranslate('index');
	if (storage.works) {
		works_json = JSON.parse(storage.works);
		$.each(works_json, function (i, val) {
			$("#works").append('<li><a href="http://'+val.url+'" rel="#'+val.tag+'"><img src="/images/works/thumb/'+val.tag+'.jpg" alt=""><span>'+val.nombre+' ('+val.fecha+')</span></a></li>')
			$("#workscontainer_inner").append('<div class="work" style="display:none;" id="'+val.tag+'"><div class="close"></div>\n<figure>\n	<img src="/images/works/medium/'+val.tag+'.jpg" />\n</figure>\n<div class="details">\n  <h3>'+val.nombre+'</h3>\n  <h4>'+val.url+'</h4>\n  <span class="datew">'+val.fecha+'</span><br>\n  <span>Mi trabajo ahí:</span>\n  <ul>\n  </ul>\n</div>\n</div>');
			$.each(val.trabajo, function (i, trabajo) {
				$("div#"+val.tag+" div ul").append("<li>"+trabajo+"</li>");
			})
			
		})

		$("#works li a").on("click", open_work);
		$(".work .close").on("click", close_work);
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
		console.log("No hice llamada AJAX ya que tengo todo en mi LocalStorage!");
	}else{
		console.log("Voy a hacer una llamar AJAX porque mi localstorage esta vacio o no tengo!");
		
		request = $.getJSON("trabajos.json", function (data) {
			works_json = data;
			console.log(works_json);
			$.each(works_json, function (i, val) {
				$("#works").append('<li><a href="http://'+val.url+'" rel="#'+val.tag+'"><img src="/images/works/thumb/'+val.tag+'.jpg" alt=""><span>'+val.nombre+' ('+val.fecha+')</span></a></li>')
				$("#workscontainer_inner").append('<div class="work" style="display:none;" id="'+val.tag+'"><div class="close"></div>\n<figure>\n	<img src="/images/works/medium/'+val.tag+'.jpg" />\n</figure>\n<div class="details">\n  <h3>'+val.nombre+'</h3>\n  <h4>'+val.url+'</h4>\n  <span class="datew">'+val.fecha+'</span><br>\n  <span>Mi trabajo ahí:</span>\n  <ul>\n  </ul>\n</div>\n</div>');
				$.each(val.trabajo, function (i, trabajo) {
					$("div#"+val.tag+" div ul").append("<li>"+trabajo+"</li>");
				})
				
			})
			if (storage) {
				storage.setItem('works', JSON.stringify(works_json));
			}
			$("#works li a").on("click", open_work);
			$(".work .close").on("click", close_work);
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