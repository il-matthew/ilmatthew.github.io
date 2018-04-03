function setCleave(){
	var cleaveCheckbox = document.getElementById("hasCleaveCheckbox");
	
	if(cleaveCheckbox.checked==true){
		attackHasCleave = true;
	}else{
		attackHasCleave = false;
	}
}

function setGuard(){
	var guardCheckbox = document.getElementById("onGuardCheckbox");

	if(guardCheckbox.checked==true){
		defenceIsOnGuard = true;
	}else{
		defenceIsOnGuard = false;
	}
}

function setAttackSmash(){
	attackType = "smash";
}

function setAttackFury(){
	attackType = "fury";
}

function setDefenceBlock() {
	defenceType = "block";
}

function setDefenceDodge(){
	defenceType = "dodge";
}

function def2Support(){
	defenceSupport2 = true;
	defenceSupport1 = true;
	attackSupport2 = false;
	attackSupport1 = false;
}

function def1Support(){
	defenceSupport2 = false;
	defenceSupport1 = true;
	attackSupport2 = false;
	attackSupport1 = false;
}

function noneSupport(){
	defenceSupport2 = false;
	defenceSupport1 = false;
	attackSupport2 = false;
	attackSupport1 = false;
}

function att1Support(){
	defenceSupport2 = false;
	defenceSupport1 = false;
	attackSupport2 = false;
	attackSupport1 = true;
}

function att2Support(){
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
function initialSetting(){
	//set the attack as smash
	document.getElementById("attacktypesmash").checked = true;
	setAttackSmash();
	
	//set the defence as block
	document.getElementById("defencetypeblock").checked = true;
	setDefenceBlock();
	
	//set none support
	document.getElementById("nonesupport").checked = true;
	noneSupport();
	
	//hide the p for the result
	//document.getElementById("calculator-wrapper").style.visibility = "hidden"
}



function resultWriter(){
	//attackType = getAttackType();
	console.log(attackType);
	//defenceDice = getDefenceType();
	numAttackDice = document.getElementById("numAttackDice").value;
	numDefenceDice = document.getElementById("numDefenceDice").value;
	document.getElementById("calculator-wrapper").style.visibility = "visible"
	var probabilitySuccess = confrontDiceSuccess(attackDice, numAttackDice, createAttackSuccessMatrix(),defenceDice,numDefenceDice,createDefenseSuccessMatrix());
	probabilitySuccess = probabilitySuccess * 100;
	document.getElementById("calculator-result").innerHTML = Math.round(probabilitySuccess*100)/100 + " %";
}