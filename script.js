var thiscolor = document.querySelector('#colorPickerMain').value;
var newColor = document.querySelectorAll('.colorPicker');
var baseColor = document.querySelector('#base');
var chosenColors = ['#000000'];
var canvas = document.querySelector('#pixelCanvas');
document.querySelector('input[type="submit"]').addEventListener('click',init);
document.querySelector('#pixelCanvas').addEventListener('mouseover', mousePos);

tools();
setTimeout(exitDialog,800);


function init(event){
	reset();
	createGrid();
	updateFooter();
	colorGrid();
	updateBase();
	updateColors();
	draw();
	selectDrawTool();
	updateRecent();
	updateMostUsed();
	event.preventDefault();
}

// RESETS GRID
function reset(){
	var trow = document.querySelectorAll('#pixelCanvas > tr');
	document.querySelector('#colorPickerMain').value = '#000000';
	if(trow.length!==0)
		{
			for(i=0;i<trow.length;i++){
				document.querySelector('#pixelCanvas').deleteRow(i);
			}
	}

}

// UPDATES GRID SIZE
function createGrid(){	
	var columns = document.querySelector('#input_width').value;
	var rows = document.querySelector('#input_height').value;
	for(var i = 0; i < rows ; i++){
	var row = document.createElement("tr");
		canvas.appendChild(row);		
		for(var j = 0; j < columns ; j++){
			var cell = document.createElement("td");
			row.appendChild(cell);
		}
	}
	baseColor.value = '#ffffff';
	document.querySelector('#pencil').classList.add('selected');
}

// UPDATES BG-COLOR OF GRID
function colorGrid(){
	var cells = document.querySelectorAll('td');
	for (var i = 0; i < cells.length; i++) {
		cells[i].style.background = "#ffffff";
	}
}

// UPDATES THE BASE COLOR
function updateBase(){
	var cells = document.querySelectorAll('td');
	baseColor.addEventListener('change', function(e) {
		console.log(baseColor.value);
		for (var i = 0; i < cells.length; i++) {
			cells[i].style.background = baseColor.value;
		}
	});

}

// UPDATE ALL COLORS OF LEFT SIDE
function updateColors(){
	for (var i = 0; i < newColor.length; i++) {
		newColor[i].addEventListener('click',function(){		
		thiscolor = colorToHex(this.style.backgroundColor);
		if(thiscolor!="")
		chosenColors.unshift(thiscolor);
		document.querySelector('#mostUsed').style.background = mostUsed(chosenColors);
		console.log(chosenColors);
		})
	}
	document.querySelector('#colorPickerMain').addEventListener('change',function(){		
	thiscolor = this.value;
	})
}


// SETS THE MODE
function tools(){
	// Pencil Tool
	document.querySelector('#pencil').addEventListener('click', draw);
	// Eraser Tool
	document.querySelector('#eraser').addEventListener('click', function(event) {
		document.querySelector('table').style.cursor="url('eraser.png'), auto";
		var cells = document.querySelectorAll('td');
		for(var x = 0; x < cells.length ; x++){
			cells[x].setAttribute("draggable",true);
			cells[x].addEventListener('dragover', function(event) {
				this.style.backgroundColor=baseColor.value;
		});
		cells[x].addEventListener('dragstart', function(event){
			event.dataTransfer.setData("text/plain", event.target.id);
			 var curs = new Image(); 
			 curs.src = 'eraser.png';
			 event.dataTransfer.setDragImage(curs, 0, 0);
			});
		}
	});
	// Hue Tool
	document.querySelector('#hueChange').addEventListener('change', function(event) {
		cellLoop("hue-rotate(" , this.value , "deg)",'#grayScale','#inverting');
	});
	// B&W Tool
	document.querySelector('#grayScale').addEventListener('change', function(event) {
		cellLoop("grayscale(",this.value,"%)",'#hueChange','#inverting');		
	});
	// Invert Tool
	document.querySelector('#inverting').addEventListener('change', function(event) {
		cellLoop("invert(",this.value/10,")",'#grayScale','#hueChange');
	});
}


// WILL DRAW USING PENCIL TOOL
function draw(){
	var cells = document.querySelectorAll('td');
	document.querySelector('table').style.cursor="url('pencil.png'), auto";
	for(var x = 0; x < cells.length ; x++){
		cells[x].setAttribute("draggable",true);
		cells[x].addEventListener('dragover', function(event) {
			this.style.backgroundColor=thiscolor;
			event.preventDefault();
		});
		cells[x].addEventListener('dragstart', function(event){
			event.dataTransfer.setData("text/plain", event.target.id);
			 var img = new Image(); 
			 img.src = 'pencil.png';
			 event.dataTransfer.setDragImage(img, 0, 0);
		});
	}
}


// UPDATE RECENT USED COLORS
function updateRecent(){	
	var recent = document.querySelectorAll('.recents');
	var newColor = document.querySelector('#colorPickerMain');
	newColor.addEventListener('change', function(e) {
		if(thiscolor!="")
		chosenColors.unshift(this.value);
		console.log(chosenColors);
		for(var i=0;i<recent.length;i++){
			recent[i].style.background = chosenColors[i];
		}
	});
}

// UPDATE MOST USED COLOR
function updateMostUsed(){
		document.querySelector('#colorPickerMain').addEventListener('change', function(){
		document.querySelector('#mostUsed').style.background = mostUsed(chosenColors);
	});
}

// FINDS MOST FRQUENT ELEMENT IN CHOSENCOLORS
function mostUsed(arr1){
	var mf = 1;
	var m = 0;
	var item;
	for (var i=0; i<arr1.length; i++)
	{
	        for (var j=i; j<arr1.length; j++)
	        {
	                if (arr1[i] == arr1[j])
	                 m++;
	                if (mf<m)
	                {
	                  mf=m; 
	                  item = arr1[i];
	                }
	        }
	        m=0;
	}
	return item;
	}


// CHANGE TEXT CONTENT ON CLICK
document.querySelector('input[type="submit"]').addEventListener('click',changeText);
function changeText(){
	if(this.value==="New Canvas")
		this.value="Remove Canvas";
	else if(this.value==="Remove Canvas")
		this.value="New Canvas";
}

// CONVERTS RGB VALUES TO HEX
function colorToHex(rgb) {
    rgb = rgb.match(/^rgba?[\s+]?\([\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?/i);
 return (rgb && rgb.length === 4) ? "#" +
  ("0" + parseInt(rgb[1],10).toString(16)).slice(-2) +
  ("0" + parseInt(rgb[2],10).toString(16)).slice(-2) +
  ("0" + parseInt(rgb[3],10).toString(16)).slice(-2) : '';
};

// LOOPING THROUGH TD TO CHANGE FILTER STYLE
function cellLoop(a,b,c,e,f){
	var cells = document.querySelectorAll('td');
		for(var x = 0; x < cells.length ; x++){
			cells[x].style.filter = a + b + c;
			}		
	document.querySelector(e).value='0';
	document.querySelector(f).value='0';
}


 // LOCATE MOUSE POSITION
function mousePos(event){
	var rect = document.querySelector("#pixelCanvas > tr:nth-child(1) > td:nth-child(1)").getBoundingClientRect();
	var x = event.pageX - Math.floor(rect.left);
    var y = event.pageY - Math.floor(rect.top);
    document.querySelector('#horizontal').textContent = ` ${x}px `;
    document.querySelector('#vertical').textContent = ` ${y}px`;
}



function updateFooter(){
	var tableR = canvas.getBoundingClientRect();
	var topR = Math.ceil(tableR.top);
	var rightR = Math.ceil(tableR.right);
	var bottomR = Math.ceil(tableR.bottom);
	var leftR = Math.ceil(tableR.left);
	var columns = document.querySelector('#input_width').value;
	var rows = document.querySelector('#input_height').value;
    document.querySelector('#rowDisp').textContent = rows;
    document.querySelector('#colDisp').textContent = columns;
    document.querySelector('#htDisp').textContent = bottomR-topR - 1;
    document.querySelector('#wtDisp').textContent = rightR-leftR - 1;
}


// SHOW CURRENT DRAWING TOOL SELECTION
function selectDrawTool(){
	var pencil = document.querySelector('#pencil');
	var eraser = document.querySelector('#eraser');
	selectors(pencil,eraser);
	}
function selectors(a,b){
		a.addEventListener('click', function(e) {
			b.classList.remove('selected');
			this.classList.add('selected');
		});
		b.addEventListener('click', function(e) {
			a.classList.remove('selected');
			this.classList.add('selected');
		});
}


// TO EXIT INITIAL DIALOG BOX
function exitDialog(){
	document.querySelector('section').style.display = "block";
	var exiting = document.querySelectorAll('.openMain');
for (var i = 0; i < exiting.length; i++) {
	exiting[i].addEventListener('click',function(){
		document.querySelector('section').style.display='none';
	})
}
}