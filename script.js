// function createGrid(e) {
// 	$('tr').remove();	
// 	var grids = $('#pixelCanvas');
// 	var rows = $('#input_height').val();
// 	var columns = $('#input_width').val();	
// 	for (i = 0; i < rows; i++) {
// 	grids.append('<tr></tr>');
// 	}
// 	for (j = 0; j < columns; j++) {
// 	$('tr').append('<td></td>');
// 	}
// 	cell = grids.find('td');
	
// 	// on click of td, flip the color of td.
// 	cell.click(function() {
// 		var color = $("#colorPicker").val();
// 		$(this).css('background-color',color);
// 	});
	
// 	e.preventDefault();	
// }


// $('input[type="submit"]').on('click',createGrid);

	

function createGrid(event){
	reset();
	updateGrid();
	draw();	
	event.preventDefault();
}



function draw(){
	var newColor = document.querySelector('#colorPicker');
	var cells = document.querySelectorAll('td');
	for(var x = 0; x < cells.length ; x++){
		cells[x].setAttribute("draggable",true);
		cells[x].addEventListener('dragover', function(event) {
			this.style.backgroundColor=newColor.value;
			event.preventDefault();
			event.dataTransfer.effectAllowed= 'copyMove';
            event.dataTransfer.dropEffect= 'move';
			return false;
		});
	}
}

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


document.querySelector('input[type="submit"]').addEventListener('click',createGrid);