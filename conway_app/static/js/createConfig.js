const BOARD_LEN = 940;
const BOARD_WID = 1265;
let GRID = [];
let DOM_GRID = [];
let DIR_ARR = [[-1, -1], [-1, 0], [-1, 1], [0, -1], [0, 1], [1, -1], [1, 0], [1, 1]];
	
function livingNeighborUpdate(cell) {
	let r = cell.getAttribute("row");
	let c = cell.getAttribute("col");

	DIR_ARR.forEach(ele => {
		let nri = parseInt(r) + ele[0];
		let nci = parseInt(c) + ele[1];
		if (isValidPosition(nri, nci)) {
			let domNeighbor = DOM_GRID[nri][nci];
			if (hasLivingNeighbor(DOM_GRID[nri][nci])) {
				if (!domNeighbor.classList.contains("alive")) {
					domNeighbor.classList.add("adjacent");
				}
			}
			else {
				domNeighbor.classList.remove("adjacent")
			}
		}
	})

	return false;
}

function hasLivingNeighbor(cell) {
	let r = cell.getAttribute("row");
	let c = cell.getAttribute("col");

	let hasLivingNeighbor = false;
	DIR_ARR.forEach(ele => {
		let nri = parseInt(r) + ele[0];
		let nci = parseInt(c) + ele[1];
		if (isValidPosition(nri, nci)) {
			if (GRID[nri][nci]) {
				hasLivingNeighbor = true;
			}
		}
	})
	return hasLivingNeighbor;
}

function isValidPosition(row, col) {
	if (row < 0 || col < 0) {
		return false;
	}

	if (row >= GRID.length || col >= GRID[0].length) {
		return false;
	}
	return true;
}

function cellClicked(cell) {
	let r = cell.getAttribute("row");
	let c = cell.getAttribute("col");

	GRID[r][c] = !GRID[r][c];

	if (GRID[r][c]) {
		cell.classList.add("alive");
		cell.classList.remove("adjacent");
	}
	else {
		cell.classList.remove("alive")
		if (hasLivingNeighbor(cell)) {
			cell.classList.add("adjacent")
		}
	}

	livingNeighborUpdate(cell);
}

function createCell(gridLen, gridWid) {

}

function createGameZone(gridLen, gridWid) {
	let gameZone = document.createElement("div");
	gameZone.classList.add("game-zone");

	let board = createBoard(gridLen, gridWid);

	let boardBar = createBoardBar();

	gameZone.append(board);
	gameZone.append(boardBar);

	return gameZone;
}

function createCell(numRow, ele, gridLen, gridWid) {
	let square = document.createElement("div");
	square.classList.add("cell");
	square.setAttribute("row", numRow);
	square.setAttribute("col", ele);
	square.addEventListener('click', function() {
		cellClicked(this);
	});

	squareHeight = Math.trunc(BOARD_LEN/gridLen);
	squareHeight = Math.trunc(squareHeight/BOARD_LEN * 100);
	square.style.height = squareHeight + "%";

	squareWidth = Math.trunc(BOARD_WID/gridWid);
	squareWidth = Math.trunc(squareWidth/BOARD_WID * 100);
	square.style.width = squareWidth + "%";

	return square;
}

function createBoard(gridLen, gridWid) {
	let board = document.createElement("div");
	board.classList.add("board");

	for (let numRow = 0; numRow < gridLen; numRow++) {
		let newRow = [];
		let domRow = []
		for (let ele = 0; ele < gridWid; ele++) {
			newRow.push(false);
			let square = createCell(numRow, ele, gridLen, gridWid);
			domRow.push(square);
			board.append(square);
		}
		GRID.push(newRow);
		DOM_GRID.push(domRow);
	}

	console.log(GRID)
	console.log(DOM_GRID)

	return board;
}

function createBoardBar() {
	let boardBar = document.createElement("div");
	boardBar.classList.add("board-bar");

	let nextBtnLink = document.createElement("a");
	nextBtnLink.setAttribute("href", "");

	let nextBtn = document.createElement("div");
	nextBtn.classList.add("white-btn");
	nextBtn.classList.add("next-btn");
	nextBtn.innerHTML = "Next";

	nextBtnLink.appendChild(nextBtn);

	let startBtnLink = document.createElement("a");
	startBtnLink.setAttribute("href", "");

	let startBtn = document.createElement("div");
	startBtn.classList.add("white-btn");
	startBtn.classList.add("start-btn");
	startBtn.innerHTML = "Start";

	startBtnLink.appendChild(startBtn);

	boardBar.appendChild(nextBtnLink);
	boardBar.appendChild(startBtnLink);

	return boardBar;
}

function createEtcZone() {
	let etcZone = document.createElement("div");
	etcZone.classList.add("etc-zone");

	let form = document.createElement("form");

	let titleLabel = document.createElement("label");
	titleLabel.classList.add("title-label")
	titleLabel.setAttribute("for", "title-input-label");
	titleLabel.innerHTML = "Title";

	let titleInput = document.createElement("input");
	titleInput.setAttribute("type", "text");
	titleInput.setAttribute("id", "title-input");
	titleInput.setAttribute("name", "title-input");
	titleInput.setAttribute("maxlength", "200");

	let saveLink = document.createElement("a");
	saveLink.setAttribute("href", "");

	let saveBtn = document.createElement("div");
	saveBtn.classList.add("purple-btn");
	saveBtn.classList.add("save-btn");
	saveBtn.innerHTML = "Save";

	saveLink.appendChild(saveBtn);
	form.appendChild(titleLabel);
	form.appendChild(titleInput);
	form.appendChild(saveLink);
	etcZone.appendChild(form);

	return etcZone;
}

function createRulesZone() {
	let rulesZone = document.createElement("div");
	rulesZone.classList.add("rules-zone");

	let rulesLabel = document.createElement("div");
	rulesLabel.classList.add("rules-label");
	rulesLabel.innerHTML = "Rules:"

	let rulesDescrip = document.createElement("div");
	rulesDescrip.classList.add("rules-descrip");

	let ruleP = document.createElement("p");
	ruleP.innerHTML = "1. Each alive cell with one or no neighbors dies, as if by solitude.";
	rulesDescrip.appendChild(ruleP);

	ruleP = document.createElement("p");
	ruleP.innerHTML = "2. Each alive cell with four or more neighbors dies, as if by overpopulation.";
	rulesDescrip.appendChild(ruleP);

	ruleP = document.createElement("p");
	ruleP.innerHTML = "3. Each alive cell with two or three neighbors survives.";
	rulesDescrip.appendChild(ruleP);

	ruleP = document.createElement("p");
	ruleP.innerHTML = "4. Each empty cell with three neighbors becomes populated.";
	rulesDescrip.appendChild(ruleP);

	rulesZone.appendChild(rulesLabel);
	rulesZone.appendChild(rulesDescrip);

	return rulesZone
}

function createInfoZone() {
	let infoZone = document.createElement("div");
	infoZone.classList.add("info-zone");

	let etc = createEtcZone();
	let rules = createRulesZone();

	infoZone.appendChild(etc);
	infoZone.appendChild(rules);

	return infoZone;
}

function createSimZone(gridLen, gridWid) {
	let simSetup = document.querySelector(".sim-setup");
	let simZoneParent = simSetup.parentNode;

	let simZone = document.createElement("div");
	simZone.classList.add("sim-zone")

	let gameZone = createGameZone(gridLen, gridWid);
	let infoZone = createInfoZone();

	simZone.appendChild(gameZone);
	simZone.appendChild(infoZone);
	simZoneParent.appendChild(simZone);

	setupSave();
}

function createInputError() {
	let setupZone = document.querySelector(".setup-input");
	let errZone = document.createElement("div");
	errZone.classList.add("err-zone");
	errZone.innerHTML = "Something went wrong! Your inputs must be between 3 and 30. Try again.";

	setupZone.appendChild(errZone);
}

function validInput(value) {
	if (isNaN(value) || value < 3 || value > 30) {
		return false;
	}
	return true;
}

function createConfig() {
	GRID = [];
	DOM_GRID = [];
	let gridLen = document.querySelector("#grid-len").value;
	let gridWid = document.querySelector("#grid-wid").value;
	
	gridLen = parseInt(gridLen);
	let lenOk = validInput(gridLen);
	gridWid = parseInt(gridWid);
	let widOk = validInput(gridWid);

	let simZone = document.querySelector(".sim-zone");
	let errZone = document.querySelector(".err-zone");
	if (lenOk && widOk) {
		if (errZone !== null) {
			errZone.parentNode.removeChild(errZone)
		}

		if (simZone === null) {
			createSimZone(gridLen, gridWid);
		}
		else {
			simZone.parentNode.removeChild(simZone);
			createSimZone(gridLen, gridWid);
		}
	}
	else {
		if (simZone !== null) {
			simZone.parentNode.removeChild(simZone);
		}

		if (errZone !== null) {
			errZone.parentNode.removeChild(errZone);
		}

		createInputError();
	}
}

function setupApply() {
	let applyBtn = document.querySelector(".apply-btn");
	applyBtn.addEventListener("click", createConfig);
}

function saveConfig() {
	let titleInput = document.querySelector("#title-input").value;
	console.log(titleInput);
}

function setupSave() {
	let saveBtn = document.querySelector(".save-btn");
	saveBtn.addEventListener("click", saveConfig);
}

setupApply();