function setCleave(){
	var cleaveCheckbox = document.getElementById("hasCleave");
	
	if(cleaveCheckbox.checked==true){
		attackHasCleave = true;
	}else{
		attackHasCleave = false;
	}
}

function setGuard(){
	var guardCheckbox = document.getElementById("onGuard");

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
	attackType = "smash";
}

function setDefenceBlock() {
	defenceType = "block";
}

function setDefenceDodge(){
	defenceType = "dodge";
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
	


function resultWriter(){
	//attackType = getAttackType();
	console.log(attackType);
	//defenceDice = getDefenceType();
	numAttackDice = document.getElementById("numAttackDice").value;
	numDefenceDice = document.getElementById("numDefenceDice").value;
	document.getElementById("calculator-result").innerHTML = confrontDiceSuccess(attackDice, numAttackDice, createAttackSuccessMatrix(),defenceDice,numDefenceDice,createDefenseSuccessMatrix());
}