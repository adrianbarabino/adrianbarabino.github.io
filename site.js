$(document).on("ready", start);

function start () {
	$(".lang").on("click", changeLang);
}

function changeLang (info) {
	id = info.currentTarget.id;
	if(id == "es"){
		$("header p").html("Tengo 17 años, soy un aficionado de la fotografía, desarrollo web y el periodismo. Nací un 5 de Agosto de 1995 en Río Gallegos, Santa Cruz, Argentina, donde vivo actualmente. En el 2007 hice mis primeros pasos en el desarrollo web. <br>Hoy trabajo en esto como Freelancer, haciendo trabajos en desarrollo Backend y Frontend. Me dedico especialmente a la programación web.");
	}
}