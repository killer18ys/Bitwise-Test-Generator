(function(){
	var numberOfQuestions = document.getElementsByClassName("input-test-number")[0],
		generateBtn = document.getElementsByClassName("btn-generate")[0]
		hardQuestions = document.getElementById("hardQuestions"),
		testField = document.getElementById("x-handlebar-template");


	function randomHexGen(difficulty){
		if (difficulty == "easy") {
			var letters = '0F'.split(''),
				hex = '0x';
			for (var i = 0; i < 6; i++) {
				hex += letters[Math.floor(Math.random() * 2)];
			}
			return hex;
		}
		else if(difficulty == "hard"){
			var letters = '0123456789abcdef'.split(''),
				hex = '0x';
			for (var i = 0; i < 6; i++) {
				hex += letters[Math.floor(Math.random() * 16)];
			}
			return hex;
		}
	}

	function downloadURI(uri, name) {
	  var link = document.createElement("a");
	  link.download = name;
	  link.href = uri;
	  link.click();
	  link.innerHTML = name;
	  return link
	}

	function contextGenerator(){}



//To PDF

function toPDF(element, name){
	html2canvas(element, {
	    onrendered: function(canvas) {
			var pdf = new jsPDF();
			var imgData = canvas.toDataURL("image/jpeg", 1.0);
			pdf.addImage(imgData, 'JPEG', 0, 0);
			var output = pdf.output('datauristring');
			
			document.body.appendChild(downloadURI(output, name + ".pdf"));
	    }
	});
}




//Handlebar Template

var source = document.getElementById("entry-template").innerHTML,
	template = Handlebars.compile(source),

	context = [{
		name: "Gosho",
		date: "2014"
	},{
		name: "Pesho",
		date: "2015"
	}];

	html = template({
		context:context
	})

	testField.innerHTML += html;



//Main

	toPDF(testField, "test");









}());