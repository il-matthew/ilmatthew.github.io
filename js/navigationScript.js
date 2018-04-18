function hideLoader(){
	document.getElementById("loadercontainer").style.display = "none";
	document.getElementById("maincontainer").style.display = "block";
};

function setCleave() {
	var cleaveCheckbox = document.getElementById("hasCleaveCheckbox");

	if (cleaveCheckbox.checked == true) {
		attackHasCleave = true;
	}
	else {
		attackHasCleave = false;
	}
};

function setGuard() {
	var guardCheckbox = document.getElementById("onGuardCheckbox");

	if (guardCheckbox.checked == true) {
		defenceIsOnGuard = true;
	}
	else {
		defenceIsOnGuard = false;
	}
};

function setAttackSmash() {
	attackType = "smash";
	document.getElementById("attacktypesmash").className = "btn btn-primary active";
	document.getElementById("attacktypefury").className = "btn btn-primary";
};

function setAttackFury() {
	attackType = "fury";
	document.getElementById("attacktypesmash").className = "btn btn-primary";
	document.getElementById("attacktypefury").className = "btn btn-primary active";
}

function setDefenceBlock() {
	defenceType = "block";
	document.getElementById("defencetypeblock").className = "btn btn-primary active";
	document.getElementById("defencetypedodge").className = "btn btn-primary";
};

function setDefenceDodge() {
	defenceType = "dodge";
	document.getElementById("defencetypeblock").className = "btn btn-primary";
	document.getElementById("defencetypedodge").className = "btn btn-primary active";
};

function def2Support() {
	defenceSupport2 = true;
	defenceSupport1 = true;
	attackSupport2 = false;
	attackSupport1 = false;
	document.getElementById("attack2support").className = "btn btn-primary";
	document.getElementById("attack1support").className = "btn btn-primary";
	document.getElementById("nonesupport").className = "btn btn-primary";
	document.getElementById("def1support").className = "btn btn-primary";
	document.getElementById("def2support").className = "btn btn-primary active";
};

function def1Support() {
	defenceSupport2 = false;
	defenceSupport1 = true;
	attackSupport2 = false;
	attackSupport1 = false;
	document.getElementById("attack2support").className = "btn btn-primary";
	document.getElementById("attack1support").className = "btn btn-primary";
	document.getElementById("nonesupport").className = "btn btn-primary";
	document.getElementById("def1support").className = "btn btn-primary active";
	document.getElementById("def2support").className = "btn btn-primary";
};

function noneSupport() {
	defenceSupport2 = false;
	defenceSupport1 = false;
	attackSupport2 = false;
	attackSupport1 = false;
	document.getElementById("attack2support").className = "btn btn-primary";
	document.getElementById("attack1support").className = "btn btn-primary";
	document.getElementById("nonesupport").className = "btn btn-primary active";
	document.getElementById("def1support").className = "btn btn-primary";
	document.getElementById("def2support").className = "btn btn-primary";
};

function att1Support() {
	defenceSupport2 = false;
	defenceSupport1 = false;
	attackSupport2 = false;
	attackSupport1 = true;
	document.getElementById("attack2support").className = "btn btn-primary";
	document.getElementById("attack1support").className = "btn btn-primary active";
	document.getElementById("nonesupport").className = "btn btn-primary";
	document.getElementById("def1support").className = "btn btn-primary";
	document.getElementById("def2support").className = "btn btn-primary";
};

function att2Support() {
	defenceSupport2 = false;
	defenceSupport1 = false;
	attackSupport2 = true;
	attackSupport1 = true;
	document.getElementById("attack2support").className = "btn btn-primary active";
	document.getElementById("attack1support").className = "btn btn-primary";
	document.getElementById("nonesupport").className = "btn btn-primary";
	document.getElementById("def1support").className = "btn btn-primary";
	document.getElementById("def2support").className = "btn btn-primary";
};

var numAttackDiceSelector = document.getElementById("numAttackDice");
var numAttackDiceOutputSelector = document.getElementById("selectedDiceAttack");
/*
var slider = new Slider("#numAttackDice", {
	tooltip: 'always'
});
*/


function initialSetting() {
	//set the attack as smash
	setAttackSmash();

	//set the defence as block
	setDefenceBlock();

	//set none support
	noneSupport();
	
};

function resultWriter() {
	numAttackDice = document.getElementById("attacksliderrange").value;
	numDefenceDice = document.getElementById("defencesliderrange").value;
	var result = document.getElementById("calculator-result");
	result.innerHTML = '';
	result.classList.add("resultloader");
	var probabilitySuccess = confrontDiceSuccess(attackDice, numAttackDice, createAttackSuccessMatrix(), defenceDice, numDefenceDice, createDefenseSuccessMatrix());
	probabilitySuccess = probabilitySuccess * 100;
	result.classList.remove("resultloader");
	result.innerHTML = Math.round(probabilitySuccess * 100) / 100;
};