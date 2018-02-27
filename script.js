var thiscolor = document.querySelector('#colorPickerMain').value;
var newColor = document.querySelectorAll('.colorPicker');
var baseColor = document.querySelector('#base');
var chosenColors = ['#000000'];
document.querySelector('input[type="submit"]').addEventListener('click',init);

mode();

function init(event){
	reset();
	createGrid();
	updateBase();
	updateColors();
	draw();	
	updateRecent();
	updateMostUsed();
	event.preventDefault();
}

// RESETS GRID
function reset(){
	var trow = document.querySelectorAll('#pixelCanvas > tr');
	if(trow.length!==0)
		{
			for(i=0;i<trow.length;i++){
				document.querySelector('#pixelCanvas').deleteRow(i);
			}
		document.querySelector('input[type="submit"]').textContent="bitch";
	}

}

// UPDATES GRID SIZE
function createGrid(){	
	var canvas = document.querySelector('#pixelCanvas');
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


function mode(){
	var tableCanvas = document.querySelector('table');
	document.querySelector('#pencil').addEventListener('click', function(event) {
			tableCanvas.style.cursor="url('pencil.png'), auto";
			draw();
	});
	document.querySelector('#eraser').addEventListener('click', function(event) {
			tableCanvas.style.cursor="url('eraser.png'), auto";
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
			 event.dataTransfer.setDragImage(curs, 0, 30);
		});
	}
});
}



// WILL DRAW USING PENCIL TOOL
function draw(){
	var cells = document.querySelectorAll('td');
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
			 event.dataTransfer.setDragImage(img, 0, 30);
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
	if(this.value==="Create Grids")
		this.value="Clear Grids";
	else if(this.value==="Reset Grids")
		this.value="Clear Grids";
}


// CONVERTS RGB VALUES TO HEX
function colorToHex(rgb) {
    rgb = rgb.match(/^rgba?[\s+]?\([\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?/i);
 return (rgb && rgb.length === 4) ? "#" +
  ("0" + parseInt(rgb[1],10).toString(16)).slice(-2) +
  ("0" + parseInt(rgb[2],10).toString(16)).slice(-2) +
  ("0" + parseInt(rgb[3],10).toString(16)).slice(-2) : '';
};

