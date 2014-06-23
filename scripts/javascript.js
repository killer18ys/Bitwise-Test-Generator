(function(){
	var numberOfQuestions = document.getElementsByClassName("input-test-number")[0],
		generateBtn = document.getElementsByClassName("btn-generate")[0],
		testField = document.getElementById("x-handlebar-template"),
		downloadList = document.getElementById('download-list-ul');

	function randomNumber(min, max){
		return Math.floor(Math.random() * (max - min) + min);
	}

	function randomHexOrNumGen(difficulty, hexNumberLength){
		if(hexNumberLength == 1 && difficulty == "easy"){
			while(true){
				var num = randomNumber(2, 11);
				if (num % 2 == 0) {
					return num;
				}
			}
		}else if(hexNumberLength == 1 && difficulty == "hard"){
			while(true){
				var num = randomNumber(2, 11);
				if (num % 2 != 0) {
					return num;
				}
			}
		}

		if (difficulty == "easy") {
			var letters = '0F'.split(''),
				hex = '0x';
			for (var i = 0; i < hexNumberLength; i++) {
				hex += letters[Math.floor(Math.random() * 2)];
			}
			return hex;
		}
		else if(difficulty == "hard"){
			var letters = '0123456789ABCDEF'.split(''),
				hex = '0x';
			for (var i = 0; i < hexNumberLength; i++) {
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

	function contextGenerator(){

	}



//To PDF

function toPDF(element, name){
	html2canvas(element, {
	    onrendered: function(canvas) {
			var pdf = new jsPDF('p','pt','a3');
			var imgData = canvas.toDataURL("image/jpeg", 1.0);
			pdf.addImage(imgData, 'JPEG', 0, 0);
			var output = pdf.output('datauristring');
			var li = document.createElement("li");
			li.appendChild(downloadURI(output, name + ".pdf"))
			downloadList.appendChild(li);
	    }
	});
}




//Handlebar Template

var source = document.getElementById("entry-template").innerHTML,
	template = Handlebars.compile(source),

	testFieldContext = {
		testVersion: 1,
		_1qOrig: randomHexOrNumGen("easy", 4),
		_1qInsert: randomHexOrNumGen("easy", 4),
		_1qNumber: randomHexOrNumGen("easy", 1),

		_2qOrig: randomHexOrNumGen("easy", 4),
		_2qInsert: randomHexOrNumGen("easy", 4),
		_2qNumber: randomHexOrNumGen("hard", 1),

		_3qOrig: randomHexOrNumGen("easy", 4),
		_3qInsert: randomHexOrNumGen("easy", 4),
		_3qNumber1: randomHexOrNumGen("easy", 1),
		_3qNumber2: randomHexOrNumGen("easy", 1),

		_4qOrig: randomHexOrNumGen("easy", 4),
		_4qInsert: randomHexOrNumGen("easy", 4),
		_4qNumber1: randomHexOrNumGen("hard", 1),
		_4qNumber2: randomHexOrNumGen("hard", 1),

		_5qOrig: randomHexOrNumGen("easy", 4),
		_5qInsert: randomHexOrNumGen("easy", 4),
		_5qNumber1: randomHexOrNumGen("hard", 1),
		_5qNumber2: randomHexOrNumGen("hard", 1),

		_6qTestValue: randomHexOrNumGen("hard", 8),
		_6qNumber: randomHexOrNumGen("easy", 1),

		_7qI: randomHexOrNumGen("easy", 4),
		_7qNumber: randomHexOrNumGen("hard", 1),

		_8qValue1: randomHexOrNumGen("easy", 8),
		_8qValue2: randomHexOrNumGen("easy", 8),
		_8qNumber1: randomHexOrNumGen("hard", 1),
		_8qNumber2: randomHexOrNumGen("easy", 1),

		_9qTestValue: randomHexOrNumGen("easy", 8),
		_9qNumber: randomHexOrNumGen("easy", 1),

		_10qTestValue: randomHexOrNumGen("easy", 8),
		_10qNumber: randomHexOrNumGen("easy", 1),


		_11qValue1: randomNumber(100, 1000),
		_11qValue2: randomNumber(100, 1000),
		_11qNumber1: randomHexOrNumGen("hard", 1),
		_11qNumber2: randomHexOrNumGen("easy", 1),

		_12qValue1: randomNumber(100, 1000),
		_12qValue2: randomNumber(1000, 5000),
		_12qNumber1: randomHexOrNumGen("hard", 1),
		_12qNumber2: randomHexOrNumGen("easy", 1),

	};

	html = template(testFieldContext)

	testField.innerHTML += html;



//Main

	toPDF(testField, "test");




}());