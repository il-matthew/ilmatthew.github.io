/*
-define a dice
-define a attack dice
-define a defence dice
-define a function that calculates the number of success (var -> dice, num° dice, what is success)
-create a matrix of all attack combinations
-create a matrix of all defence combinations
-confrot attack results vs defence results
*/

//create a simple dice
function Dice(commonFace, singleFace) {
	this.diceFaces = ["critical", commonFace, commonFace, singleFace, "support1", "support2"]
	this.numCases = function(numberDices) {
		return Math.pow(this.diceFaces.length, numberDices)
	}
}
//create the attack dice
var attackDice = new Dice("smash", "fury");

//create the defence dice
var defenceDice = new Dice("block", "dodge");

//n° attack dice rolled
var numAttackDice;

//n° defence dice rolled
var numDefenceDice;

//type of attack 
var attackType;

//type of defense
var defenceType;

//determine who has support
var defenceSupport2 = false;
var defenceSupport1 = false;
var attackSupport2 = false;
var attackSupport1 = false;

//additional characterstichs cleave and guard
var attackHasCleave = false;
var defenceIsOnGuard = false;


//create a function that rolls the dice results and returns the all possible dice combinations given a specific dice
function rollDiceResults(diceTypeRolled, numberDicesRolled) {

	//total possible results of the rolls of that number of dices
	var numberTotalPossibilites = diceTypeRolled.numCases(numberDicesRolled);

	//store the dice results
	var diceResults = new Array();
	//lazy inizialization of diceResults
	for (i = 0; i < numberTotalPossibilites; i++) {
		if (typeof diceResults[i] === 'undefined') {
			diceResults[i] = new Array(numberDicesRolled);
		}
	}

	//initialize storeage for which column to write
	var columnToWrite = 0;
	//initialize counter for the itration
	var iteration = 0;

	//inizalize the counter for which dice face to write
	var diceFaceToWrite = new Array(diceTypeRolled.diceFaces.length);
	for (i = 0; i < diceFaceToWrite.length; i++) {
		diceFaceToWrite[i] = 0;
	}

	//create a function that returns all possible dice combinations given a n° of dices and a type
	function diceCombinations(iteration) {
		if (numberDicesRolled - iteration == 1) { //caso finale
			for (i = 0; i < diceTypeRolled.numCases(numberDicesRolled - 1); i++) {
				for (j = 0; j < diceTypeRolled.diceFaces.length; j++) {
					diceResults[(diceFaceToWrite[columnToWrite] + j)][columnToWrite] = diceTypeRolled.diceFaces[j];
				}
				diceFaceToWrite[columnToWrite] = diceFaceToWrite[columnToWrite] + diceTypeRolled.diceFaces.length;
			}
		}
		else {
			var blockToWrite = diceTypeRolled.numCases(numberDicesRolled - iteration - 1);
			//determine how many times call the function
			var numTimesToCall = numberTotalPossibilites / diceTypeRolled.numCases(numberDicesRolled - iteration);
			//repeat for every dice face
			for (k = 0; k < numTimesToCall; k++) {
				for (i = 0; i < diceTypeRolled.diceFaces.length; i++) {
					for (j = 0; j < blockToWrite; j++) {
						diceResults[(diceFaceToWrite[columnToWrite] + j)][columnToWrite] = diceTypeRolled.diceFaces[i];
					}
					diceFaceToWrite[columnToWrite] = diceFaceToWrite[columnToWrite] + blockToWrite;
				}
			}
			columnToWrite++;
			iteration++;
			//richiamo la funzione step dopo
			diceCombinations(iteration);
		}
	}
	diceCombinations(iteration);
	return diceResults;

}

var stub_attackSuccessMatrix = ["critical", "smash"];
var stub_defenceSuccessMatrix = ["critical", "block"];

//create the attack matrix of success
function createAttackSuccessMatrix(){
	var attackMatrix = ["critical"];
	attackMatrix.push(attackType);
	if(attackSupport1 == true){
		attackMatrix.push("support1")
	}
	if(attackSupport2 == true){
		attackMatrix.push("support1");
		attackMatrix.push("support2")	
	}

	return attackMatrix;
};

//create the defence matrix of success
function createDefenseSuccessMatrix(){
	var defenceMatrix = ["critical"];
	if(attackHasCleave == true){
		if(defenceType == "dodge"){
			defenceMatrix.push("dodge");
		}

	}else{
		defenceMatrix.push(defenceType);
		if(defenceIsOnGuard == true){
			if(defenceType == "block"){
				defenceMatrix.push("dodge");
			}else{
				defenceMatrix.push("block");
			}
		}
	}

	if(defenceSupport1 == true){
		defenceMatrix.push("support1")
	}
	if(defenceSupport2 == true){
		//defenceMatrix.push("support1");
		defenceMatrix.push("support2")	
	}

	return defenceMatrix;
}

function rollDiceSuccesses(diceTypeRolled, numberDicesRolled, successMatrix) {

	function Success(criticalSuccessCounted, totalSuccessCounted) {
		this.criticalSuccess = criticalSuccessCounted;
		this.totalSuccess = totalSuccessCounted;
	}

	var numberRows = diceTypeRolled.numCases(numberDicesRolled);
	var numberColumns = numberDicesRolled;
	var successMatrixPassed = successMatrix;
	var numCicles = successMatrixPassed.length;


	var rowToWrite = 0;
	//create the matrix for the successes
	var matrixSuccess = [];
	//initialize the matrix of results
	var matrixCombination = rollDiceResults(diceTypeRolled, numberDicesRolled);

	for (i = 0; i < numberRows; i++) {
		var totalCriticalSuccess = 0;
		var totalSuccess = 0;
		for (j = 0; j < numberColumns; j++) {
			for (k = 0; k < numCicles; k++) {
				if (matrixCombination[i][j] == successMatrixPassed[k]) {
					//check if critical success
					if (matrixCombination[i][j] == diceTypeRolled.diceFaces[0]) {
						totalCriticalSuccess++;
						totalSuccess++;
					}
					else {
						totalSuccess++;
					}
				}
			}
		}
		if (totalSuccess != 0) {
			var temp = new Success(totalCriticalSuccess, totalSuccess)
			//matrixSuccess.push(temp);
			matrixSuccess[rowToWrite] = temp;
			rowToWrite++;
		}
	}
	return matrixSuccess;
}

var temporanea = rollDiceSuccesses(attackDice, 2, stub_attackSuccessMatrix);

function confrontDiceSuccess(attackDiceType, attackDiceRolled, attackSuccessMatrix, defenseDiceType, defenseDiceRolled, defenceSuccessMatrix){
	//store the attack Matrix success
	var attackDiceSuccess = rollDiceSuccesses(attackDiceType,attackDiceRolled,attackSuccessMatrix);
	
	//store the defense Matrix success
	var defenseDiceSuccess = rollDiceSuccesses(defenseDiceType,defenseDiceRolled,defenceSuccessMatrix);
	
	//variable to store the total success of the attack
	var totalAttackDiceSuccess = 0;
	
	for(i=0;i<attackDiceSuccess.length;i++){
		for(j=0;j<defenseDiceSuccess.length;j++){
			if(attackDiceSuccess[i].criticalSuccess > defenseDiceSuccess[j].criticalSuccess){
				totalAttackDiceSuccess++
			}else{
				if(attackDiceSuccess[i].criticalSuccess == defenseDiceSuccess[j].criticalSuccess && attackDiceSuccess[i].totalSuccess > defenseDiceSuccess[j].totalSuccess){
					totalAttackDiceSuccess++
				}
			}
		}
	}
	//get the result from the failed defense rolls
	totalAttackDiceSuccess = totalAttackDiceSuccess + ((defenseDiceType.numCases(defenseDiceRolled)-defenseDiceSuccess.length)*attackDiceSuccess.length);
	
	return totalAttackDiceSuccess/( attackDiceType.numCases(attackDiceRolled) * defenseDiceType.numCases(defenseDiceRolled));
}



//var results = confrontDiceSuccess(attackDice, numAttackDice, createAttackSuccessMatrix(),defenceDice,numDefenceDice,createDefenseSuccessMatrix());
//se l'attacco ha cleave gli scudi non sono successi

//scrivi il dado, passa il successvio per quanti scrivere dipende dalla stessa faccia del dado (potenza delle facce del dado)


// create a function that calculates the number of success given a n° of dice rolled and condition of success


//contare i numero di successi critici e il numero di successi normali

//confronto difesa con attacco (se ha fendente e difesa è scudo se ncriticidifesa > n critici attacco, fail altrimenti se n° successi maggiore num successi difesa successo altrimenti fail
//fai funzione per il confronto a prescindere, path del cleave e dello scudo solo se è entrambe le condizioni sono vere