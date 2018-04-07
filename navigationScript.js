var attackSlider = new Slider("#numAttackDiceSlider", {
		tooltip: 'always'
});

function setCleave() {
	var cleaveCheckbox = document.getElementById("hasCleaveCheckbox");

	if (cleaveCheckbox.checked == true) {
		attackHasCleave = true;
	}
	else {
		attackHasCleave = false;
	}
}

function setGuard() {
	var guardCheckbox = document.getElementById("onGuardCheckbox");

	if (guardCheckbox.checked == true) {
		defenceIsOnGuard = true;
	}
	else {
		defenceIsOnGuard = false;
	}
}

function setAttackSmash() {
	attackType = "smash";
	document.getElementById("attacktypesmash").className = "btn btn-primary active";
	document.getElementById("attacktypefury").className = "btn btn-primary";
}

function setAttackFury() {
	attackType = "fury";
	document.getElementById("attacktypesmash").className = "btn btn-primary";
	document.getElementById("attacktypefury").className = "btn btn-primary active";
}

function setDefenceBlock() {
	defenceType = "block";
	document.getElementById("defencetypeblock").className = "btn btn-primary active";
	document.getElementById("defencetypedodge").className = "btn btn-primary";
}

function setDefenceDodge() {
	defenceType = "dodge";
	document.getElementById("defencetypeblock").className = "btn btn-primary";
	document.getElementById("defencetypedodge").className = "btn btn-primary active";
}

function def2Support() {
	defenceSupport2 = true;
	defenceSupport1 = true;
	attackSupport2 = false;
	attackSupport1 = false;
}

function def1Support() {
	defenceSupport2 = false;
	defenceSupport1 = true;
	attackSupport2 = false;
	attackSupport1 = false;
}

function noneSupport() {
	defenceSupport2 = false;
	defenceSupport1 = false;
	attackSupport2 = false;
	attackSupport1 = false;
}

function att1Support() {
	defenceSupport2 = false;
	defenceSupport1 = false;
	attackSupport2 = false;
	attackSupport1 = true;
}

function att2Support() {
	defenceSupport2 = false;
	defenceSupport1 = false;
	attackSupport2 = true;
	attackSupport1 = true;
}
/*
function getAttackType(){
	if(document.getElementById("attacktypecheckboxsmash").checked){
		return "smash";
	}
	if(document.getElementById("attacktypecheckboxfury").checked){	
		return "fury";
	}
}

function getDefenceType(){
	if(document.getElementById("defencetypecheckboxblock").checked){
		return "block";
	}

	if(document.getElementById("defencetypecheckboxdodge").checked){
		return "dodge";
	}
}
*/

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
	document.getElementById("nonesupport").checked = true;
	noneSupport();

	//hide the p for the result
	//document.getElementById("calculator-wrapper").style.visibility = "hidden"
}





function resultWriter() {
	//attackType = getAttackType();
	console.log(attackType);
	//defenceDice = getDefenceType();
	numAttackDice = ;
	numDefenceDice = document.getElementById("numDefenceDice").value;
	document.getElementById("calculator-wrapper").style.visibility = "visible"
	var probabilitySuccess = confrontDiceSuccess(attackDice, numAttackDice, createAttackSuccessMatrix(), defenceDice, numDefenceDice, createDefenseSuccessMatrix());
	probabilitySuccess = probabilitySuccess * 100;
	document.getElementById("calculator-result").innerHTML = Math.round(probabilitySuccess * 100) / 100 + " %";
}