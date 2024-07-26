const slider = document.querySelector("#slider");
const timer = document.querySelector(".timer");
const startButton = document.querySelector(".start-button");
const resetButton = document.querySelector(".reset-button");
const treeSelect = document.querySelector('.tree-select');
const treeShow = document.querySelector(".tree-show");
const plotsGrid = document.querySelector(".grid-container").children;
const dateText = document.querySelector(".date");

let countdown;
let timeToReset = 10;

const treeList = [
	{
		shape_1: "💛",
		shape_2: "💚",
		shape_3: "💙",
		shape_4: "💜",
		shape_dead: "🖤",
	},
	{
		shape_1: "🟡",
		shape_2: "🟢",
		shape_3: "🔵",
		shape_4: "🟣",
		shape_dead: "⚫",
	},
	{
		shape_1: "🟨",
		shape_2: "🟩",
		shape_3: "🟦",
		shape_4: "🟪",
		shape_dead: "⬛",
	}
]

const plots = [
	{
		isFull: false,
		contain: "",
	},
	{
		isFull: false,
		contain: "",
	},
	{
		isFull: false,
		contain: "",
	},
	{
		isFull: false,
		contain: "",
	},
	{
		isFull: false,
		contain: "",
	},
	{
		isFull: false,
		contain: "",
	},
	{
		isFull: false,
		contain: "",
	},
	{
		isFull: false,
		contain: "",
	},
	{
		isFull: false,
		contain: "",
	},
	{
		isFull: false,
		contain: "",
	},
	{
		isFull: false,
		contain: "",
	},
	{
		isFull: false,
		contain: "",
	},
	{
		isFull: false,
		contain: "",
	},
	{
		contain: "",
	},
	{
		isFull: false,
		contain: "",
	},
	{
		isFull: false,
		contain: "",
	},
	{
		isFull: false,
		contain: "",
	},
	{
		isFull: false,
		contain: "",
	},
	{
		isFull: false,
		contain: "",
	},
	{
		isFull: false,
		contain: "",
	},
	{
		isFull: false,
		contain: "",
	},
	{
		isFull: false,
		contain: "",
	},
	{
		isFull: false,
		contain: "",
	},
	{
		isFull: false,
		contain: "",
	},
	{
		isFull: false,
		contain: "",
	},
];


function showDate() {
	const now = new Date();

	const day = now.getDate();
	const month = now.getMonth() + 1;
	let monthName;
	const year = now.getFullYear();

	switch(month){
		case 1:
			monthName = "January";
			break;
		case 2:
			monthName = "February";
			break;
			case 3:
			monthName = "March";
			break;
		case 4:
			monthName = "April";
			break;
			case 5:
			monthName = "May";
			break;
		case 6:
			monthName = "June";
			break;
			case 7:
			monthName = "July";
			break;
		case 8:
			monthName = "Augest";
			break;
			case 9:
			monthName = "September";
			break;
		case 10:
			monthName = "October";
			break;
			case 11:
			monthName = "Novemember";
			break;
		case 12:
			monthName = "Decemeber";
			break;
	}

	const format = `${monthName} ${day} ${year}`;
	dateText.innerHTML = format;
}


function setTime() {
	let min = slider.value;

	let hour = (Math.floor(min/60)).toString();
	min = (min - hour*60).toString();

	if (hour.length === 1) {
		hour = "0" + hour;
	}

	if (min.length === 1){
		min = "0" + min;
	}

	timer.innerHTML = hour+":"+min+":00";
	selectTree(whichTree(1));
}


function startTimer() {
	let sec = slider.value * 60;
	if (sec===0) {
		return;
	}

	clearInterval(countdown);
	slider.disabled = true;
	startButton.disabled = true;

	countdown = setInterval(() => {
		const state = whichTree(1);
		if (sec<=0) {
			timeToReset = 10;
			resetTimer()
			addTree(state);
			return;
		}
		sec--;
		if (timeToReset > 0) {
			timeToReset--;
		}

		calcTimer(sec);
	}, 1000);
}


function calcTimer(sec) {
	let hour = Math.floor(sec/3600).toString();
	sec = sec - hour*3600;
	if (hour.length === 1) {
		hour = "0" + hour;
	}

	let min = Math.floor(sec/60).toString();
	sec = (sec - min*60).toString();
	if (min.length === 1){
		min = "0" + min;
	}

	if (sec.length === 1){
		sec = "0" + sec;
	}

	displayTime(hour+":"+min+":"+sec);
}


function resetTimer() {
	if (timeToReset <= 0) {
		addTree(whichTree(0));
	}
	clearInterval(countdown);
	slider.disabled = false;
	startButton.disabled = false;
	slider.value = 0;
	timer.innerHTML = "00:00:00";
	
}


function displayTime(time) {
	timer.innerHTML = time;
}


function whichTree(isAlive) {
	if (isAlive === 1){
		if (slider.value >= 0 && slider.value < 30){
			return 1;
		}
		else if(slider.value >= 30 && slider.value < 60) {
			return 2;
		}
		else if(slider.value >= 60 && slider.value < 90) {
			return 3;
		}
		else if (slider.value >= 90 && slider.value < 120){
			return 4;
		}
	}
	else if (isAlive === 0) {
		return 0; // Dead;
	}

}


function selectTree(state) {
	const treeIndex = treeList.findIndex(obj => 
		Object.values(obj).includes(treeSelect.value)
	)
	if (state === 1){
		treeShow.innerHTML = treeList[treeIndex].shape_1;
	}
	else if(state === 2) {
		treeShow.innerHTML = treeList[treeIndex].shape_2;
	}
	else if(state === 3) {
		treeShow.innerHTML = treeList[treeIndex].shape_3;
	}
	else if (state === 4) {
		treeShow.innerHTML = treeList[treeIndex].shape_4;
	}
	else if (state === 5) {
		treeShow.innerHTML = treeList[treeIndex].shape_dead;
	}
}


function changeTreeSelected() {
		const treeIndex = treeList.findIndex(obj => 
		Object.values(obj).includes(treeSelect.value)
	)
	const state = whichTree(1);

	if (state === 1){
		treeShow.innerHTML = treeList[treeIndex].shape_1;
	}
	else if(state === 2) {
		treeShow.innerHTML = treeList[treeIndex].shape_2;
	}
	else if(state === 3) {
		treeShow.innerHTML = treeList[treeIndex].shape_3;
	}
	else if (state === 4) {
		treeShow.innerHTML = treeList[treeIndex].shape_4;
	}
}


function addTree(state) {
	for (let i=0; i<plots.length; i++) {
		if (plots[i].isFull === false) {
			plots[i].isFull = true;

			const treeIndex = treeList.findIndex(obj =>
				Object.values(obj).includes(treeSelect.value)
			)

			if (state === 1) {
				plots[i].contain = treeList[treeIndex].shape_1;
				plotsGrid[i].innerHTML = treeList[treeIndex].shape_1;
			}
			else if (state === 2) {
				plots[i].contain = treeList[treeIndex].shape_2;
				plotsGrid[i].innerHTML = treeList[treeIndex].shape_2;
			}
			else if (state === 3) {
				plots[i].contain = treeList[treeIndex].shape_3;
				plotsGrid[i].innerHTML = treeList[treeIndex].shape_3;
			}
			else if (state === 4) {
				plots[i].contain = treeList[treeIndex].shape_4;
				plotsGrid[i].innerHTML = treeList[treeIndex].shape_4;
			}
			else if (state === 0) { // Dead
				plots[i].contain = treeList[treeIndex].shape_dead;
				plotsGrid[i].innerHTML = treeList[treeIndex].shape_dead;
			}
			return;
		}
	}
	console.log("all full");
	return;
}


showDate();


startButton.addEventListener("click", startTimer);
resetButton.addEventListener("click", resetTimer);
slider.addEventListener("input", setTime);
treeSelect.addEventListener("input", changeTreeSelected);