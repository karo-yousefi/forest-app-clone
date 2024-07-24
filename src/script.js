const slider = document.querySelector("#slider");
const text = document.querySelector(".text");
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

showDate();

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

	text.innerHTML = hour+":"+min+":00";
	changeTreeShow();
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
		if (sec<=0) {
			timeToReset = 10;
			resetTimer()
			addTree(1);
			return;
		}
		sec--;
		if (timeToReset > 0) {
			timeToReset--;
		}
		console.log(timeToReset);

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
		addTree(0);
	}
	clearInterval(countdown);
	slider.disabled = false;
	startButton.disabled = false;
	slider.value = 0;
	text.innerHTML = "00:00:00";
	
}


function displayTime(time) {
	text.innerHTML = time;
}


function changeTreeShow() {
	const treeIndex = treeList.findIndex(obj => 
		Object.values(obj).includes(treeSelect.value)
	)

	if (slider.value >= 0 && slider.value < 30){
		treeShow.innerHTML = treeList[treeIndex].shape_1;
	}
	else if(slider.value >= 30 && slider.value < 60) {
		treeShow.innerHTML = treeList[treeIndex].shape_2;
	}
	else if(slider.value >= 60 && slider.value < 120) {
		treeShow.innerHTML = treeList[treeIndex].shape_3;
	}
	else {
		treeShow.innerHTML = treeList[treeIndex].shape_4;
	}
}

function addTree(status) {
	for (let i=0; i<plots.length; i++) {
		if (plots[i].isFull === false) {
			plots[i].isFull = true;
			if (status === 1) {
				plots[i].contain = treeShow.innerHTML;
				plotsGrid[i].innerHTML = treeShow.innerHTML;
			}
			else if (status ===0) {
				const treeIndex = treeList.findIndex(obj => 
					Object.values(obj).includes(treeSelect.value)
				)
				plots[i].contain = treeList[treeIndex].shape_dead;
				plotsGrid[i].innerHTML = treeList[treeIndex].shape_dead;
			}

			return;
		}
	}
	console.log("all full");
	return;
}

startButton.addEventListener("click", startTimer);
resetButton.addEventListener("click", resetTimer);
slider.addEventListener("input", setTime);
treeSelect.addEventListener("input", changeTreeShow);