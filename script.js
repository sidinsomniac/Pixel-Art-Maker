document.querySelector('input[type="submit"]').addEventListener('click',createGrid);
var thiscolor = document.querySelector('#colorPickerMain').value;
var newColor = document.querySelectorAll('.colorPicker');
var chosenColors = ['#000000'];



function createGrid(event){
	reset();
	updateGrid();
	updateColors();
	draw();	
	updateRecent();
	updateMostUsed();
	event.preventDefault();
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
		cells[x].addEventListener('dragstart', dragstart_handler);
	}
}

// SETS DRAG IMAGE
function dragstart_handler(event) {
 event.dataTransfer.setData("text/plain", event.target.id);
 var img = new Image(); 
 img.src = 'curshit.png';
 event.dataTransfer.setDragImage(img, 0, 30);
}

// UPDATES GRID SIZE
function updateGrid(){	
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

// UPDATE RECENT USED COLORS
function updateRecent(){	
	var recent = document.querySelectorAll('.recents');
	var newColor = document.querySelector('#colorPickerMain');
	newColor.addEventListener('change', function(e) {
		chosenColors.unshift(this.value);
		console.log(chosenColors);
		for(var i=0;i<recent.length;i++){
			recent[i].style.background = chosenColors[i];
		}
	});
}

function updateColors(){
	for (var i = 0; i < newColor.length; i++) {
		newColor[i].addEventListener('click',function(){		
		thiscolor = this.style.background;
		})
	}

	document.querySelector('#colorPickerMain').addEventListener('change',function(){		
	thiscolor = this.value;
	})
}

function updateMostUsed(){
		document.querySelector('#colorPickerMain').addEventListener('change', function(){
		document.querySelector('#mostUsed').style.background = mostUsed(chosenColors);
	});
}

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

