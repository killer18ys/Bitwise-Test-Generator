(function(){
	var	generateBtn = document.getElementsByClassName("btn-generate")[0],
		resetBtn = document.getElementsByClassName("btn-reset")[0],
		testField = document.getElementById("x-handlebar-template"),
		downloadList = document.getElementById('main-inner'),
		source = document.getElementById("entry-template").innerHTML;



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

	function contextGenerator(count){
		return	{
			testVersion: count,
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

			_6qTestValue: randomHexOrNumGen("hard", 6),
			_6qNumber: randomHexOrNumGen("easy", 1),

			_7qI: randomHexOrNumGen("easy", 4),
			_7qNumber: randomHexOrNumGen("hard", 1),

			_8qValue1: randomHexOrNumGen("easy", 6),
			_8qValue2: randomHexOrNumGen("easy", 6),
			_8qNumber1: randomHexOrNumGen("hard", 1),
			_8qNumber2: randomHexOrNumGen("easy", 1),

			_9qTestValue: randomHexOrNumGen("easy", 6),
			_9qNumber: randomHexOrNumGen("easy", 1),

			_10qTestValue: randomHexOrNumGen("easy", 6),
			_10qNumber: randomHexOrNumGen("easy", 1),


			_11qValue1: randomNumber(100, 1000),
			_11qValue2: randomNumber(100, 1000),
			_11qNumber1: randomHexOrNumGen("hard", 1),
			_11qNumber2: randomHexOrNumGen("easy", 1),

			_12qValue1: randomNumber(100, 1000),
			_12qValue2: randomNumber(1000, 5000),
			_12qNumber1: randomHexOrNumGen("hard", 1),
			_12qNumber2: randomHexOrNumGen("easy", 1),

		}
	}

	function answersGenerator(answers){
		var checkedAnswers = {
			_1q: {a: "none"},
			_2q: {b: "none"},
			_3q: {AND: "none"},
			_4q: {OR: "none"},
			_5q: {XOR: "none"},
			_6q: {a: 0},
			_7q: {left: "none"},
			_8q: {result: "none"},
			_9q: {a: 0, result: 0},
			_10q: {a: "none"},
			_11q: {result: "none"},
			_12q: {result: "none"}
		}
		checkedAnswers._1q.a = (parseInt(answers._1qOrig.substr(2), 16) | (parseInt(answers._1qInsert.substr(2), 16) << answers._1qNumber)).toString(16);
		checkedAnswers._2q.b = (parseInt(answers._2qOrig.substr(2), 16) | (parseInt(answers._2qInsert.substr(2), 16) << answers._2qNumber)).toString(16);
		checkedAnswers._3q.AND = ((parseInt(answers._3qOrig.substr(2), 16) | (parseInt(answers._3qInsert.substr(2), 16) << answers._3qNumber1)) & (parseInt(answers._3qOrig.substr(2), 16) | (parseInt(answers._3qInsert.substr(2), 16) << answers._3qNumber2))).toString(16);
		checkedAnswers._4q.OR = ((parseInt(answers._4qOrig.substr(2), 16) | (parseInt(answers._4qInsert.substr(2), 16) << answers._4qNumber1)) & (parseInt(answers._4qOrig.substr(2), 16) | (parseInt(answers._4qInsert.substr(2), 16) << answers._4qNumber2))).toString(16);
		checkedAnswers._5q.XOR = ((parseInt(answers._5qOrig.substr(2), 16) | (parseInt(answers._5qInsert.substr(2), 16) << answers._5qNumber1)) ^ (parseInt(answers._5qOrig.substr(2), 16) | (parseInt(answers._5qInsert.substr(2), 16) << answers._5qNumber2))).toString(16);
		checkedAnswers._6q.a = (parseInt(answers._6qTestValue.substr(2), 16) & (1 << answers._6qNumber))? 1 : 2; 
		checkedAnswers._7q.left = (parseInt(answers._7qI, 16) | (1 << answers._7qNumber)).toString(16);	
		checkedAnswers._8q.result = ( (parseInt(answers._8qValue1.substr(2), 16) << answers._8qNumber1) ^ (parseInt(answers._8qValue2.substr(2), 16) << answers._8qNumber2)).toString(16);
		checkedAnswers._9q.a = (( result =  parseInt(answers._9qTestValue.substr(2), 16) & parseInt(answers._9qTestValue.substr(2), 16) ^ parseInt(answers._9qTestValue.substr(2), 16) ) | (1 << answers._6qNumber))? 1 : 2; 
		checkedAnswers._9q.result = ((parseInt(answers._9qTestValue.substr(2), 16) & parseInt(answers._9qTestValue.substr(2), 16)) ^ parseInt(answers._9qTestValue.substr(2), 16)).toString(16);	
		checkedAnswers._10q.a = ( (parseInt(answers._10qTestValue.substr(2), 16) & parseInt(answers._10qTestValue.substr(2), 16)) ^ (1 << answers._10qNumber))? 1 : 2; 
		checkedAnswers._11q.result = ((answers._11qValue1 << answers._11qNumber1) ^ (answers._11qValue2 >> answers._11qNumber2)).toString(16);
		checkedAnswers._12q.result = ((answers._12qValue1 << answers._12qNumber1) ^ (answers._12qValue2 >> answers._12qNumber2)).toString(16);

		return checkedAnswers;
	}


//To PDF


//Test
function testToPDF(element, name){
	html2canvas(element, {
	    onrendered: function(canvas) {
			var pdf = new jsPDF('p','pt','a3');
			var imgData = canvas.toDataURL("image/jpeg", 1.0);
			pdf.addImage(imgData, 'JPEG', 0, 0);
			var output = pdf.output('datauristring');
			var p = document.createElement("p");
			p.id = "downloadLink"; 
			p.appendChild(downloadURI(output, name + ".pdf"))
			downloadList.appendChild(p);
	    }
	});
}

//Answers

function answersToPDF(checkedAnswers, name){
	var doc = new jsPDF();

	doc.text(100, 10, 'Answers');

	doc.text(20, 30, '1. a = ' + checkedAnswers._1q.a.toUpperCase());

	doc.text(20, 40, '2. b = ' + checkedAnswers._2q.b.toUpperCase());
	
	doc.text(20, 50, '3. AND = ' + checkedAnswers._3q.AND.toUpperCase());

	doc.text(20, 60, '4. OR = ' + checkedAnswers._4q.OR.toUpperCase());

	doc.text(20, 70, '5. XOR = ' + checkedAnswers._5q.XOR.toUpperCase());

	doc.text(20, 80, '6. a = ' + checkedAnswers._6q.a);

	doc.text(20, 90, '7. left = ' + checkedAnswers._7q.left.toUpperCase());

	doc.text(20, 100, '8. result = ' + ((checkedAnswers._8q.result.indexOf("-") > -1)? checkedAnswers._8q.result.slice(1).toUpperCase(): checkedAnswers._8q.result.toUpperCase()));

	doc.text(20, 110, '9. a = ' + checkedAnswers._9q.a);

	doc.text(40, 110, ', result = ' + checkedAnswers._9q.result.toUpperCase());

	doc.text(20, 120, '10. a = ' + checkedAnswers._10q.a);

	doc.text(20, 130, '11. result = ' + checkedAnswers._11q.result.toUpperCase());

	doc.text(20, 140, '12. result = ' + checkedAnswers._12q.result.toUpperCase());


	var docOutput = doc.output('datauristring');
	var p = document.createElement("p");
	p.id = "downloadLinkAnswers"; 
	p.appendChild(downloadURI(docOutput, name + ".pdf"))
	downloadList.appendChild(p);
}


	if (localStorage['localCount']) {
		var tmp = parseInt(localStorage['localCount']);
		tmp += 1;
		localStorage['localCount'] = tmp.toString();
	}
	else{
		localStorage['localCount'] = "1"
	}

	var count = localStorage['localCount'];

	var template = Handlebars.compile(source);



		context = contextGenerator(count);

		html = template(context);
		testField.innerHTML += html;
		testToPDF(testField, "BitwiseTest_" + count);
		answersToPDF(answersGenerator(context), "Answers_" + count);
		
		setTimeout(function(){
			testField.removeChild(document.getElementById('test-title'));
			testField.removeChild(document.getElementById('test-wrapper'));
		}, 1000);

		generateBtn.addEventListener("click", function(){
			window.location.reload();
		},false);

		resetBtn.addEventListener("click", function(){
			localStorage['localCount'] = "0"
			window.location.reload();
		},false);

}());