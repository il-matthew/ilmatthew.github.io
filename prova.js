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



//create a function that rolls the dice results and returns the number of results results
function rollDiceResults(diceTypeRolled, numberDicesRolled) {

	//total possible results of the rolls of that number of dices
	var numberTotalPossibilites = diceTypeRolled.numCases(numberDicesRolled);

	//store the dice results
	var diceResults = new Array();

	var iteration = 0;
	var rowToWrite = 0;
	var diceFaceToWrite = new Array();
	//lazy inizialization
	for(i=0;i<numberTotalPossibilites;i++){
		if (typeof diceResults[i] === 'undefined'){
			diceResults[i] = new Array(numberDicesRolled);
		}
	}
	
	
	function rollDice(diceType, iteration, rowPointer) { //TODO insert carryon between operations

		if (numberDicesRolled - iteration == 1) { //it's the last iteration, so it just writes the last dice
			for (i = 0; i < diceType.diceFaces.length; i++) {
				diceResults[rowPointer + i][iteration] = diceType.diceFaces;
			}
		}
		else {
			diceFaceToWrite[iteration] = 0;
			
			for (i = 0; i < diceType.diceFaces.length; i++) { //call the function for each face to write
				var howManyRowsToWrite = diceType.numCases(numberDicesRolled - iteration - 1);
			
				for (j = 0; j < howManyRowsToWrite; j++) {
					diceResults[rowPointer+j][iteration] = diceType.diceFaces[diceFaceToWrite];
				}

				//function calback to move to the other 
				rollDice(diceType, iteration +1, rowPointer + howManyRowsToWrite)
				//richiamo la funzione

				diceFaceToWrite[iteration]++;
				rowPointer = rowPointer + howManyRowsToWrite;
				
			}
		}
	}
	
	rollDice(diceTypeRolled, iteration, rowToWrite);
	return diceResults

}



//scrivi il dado, passa il successvio per quanti scrivere dipende dalla stessa faccia del dado (potenza delle facce del dado)


// create a function that calculates the number of success given a n° of dice rolled and condition of success


//contare i numero di successi critici e il numero di successi normali

//confronto difesa con attacco (se ha fendente e difesa è scudo se ncriticidifesa > n critici attacco, fail altrimenti se n° successi maggiore num successi difesa successo altrimenti fail
//fai funzione per il confronto a prescindere, path del cleave e dello scudo solo se è entrambe le condizioni sono vere