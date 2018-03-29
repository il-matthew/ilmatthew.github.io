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
function Dice (commonFace, singleFace){
	this.diceFaces = ["critical", commonFace, commonFace, singleFace, "support1", "support2"]
	this.numCases = function(){
		return Math.pow(this.diceFaces.length, numberDices)
	}
}
//create the attack dice
var attackDice = new Dice("smash", "fury");

//create the defence dice
var defenceDice =  new Dice("block", "dodge");

/*
function rollDice2(diceType, numRoll){
	var diceRolls = [][]
	for(i=0;i<diceType.numCases(numRoll){
		for(j=0;j<diceType.diceFaces.length;j++){
			diceRolls[i][j]
		}
	}
}
*/




//create a function that rolls the dice results and returns the number of results results
function rollDiceResults(diceTypeRolled, numberDicesRolled) {

	//total possible results of the rolls of that number of dices
	var totalPossibilites = diceTypeRolled.numCases(numberDicesRolled);

	//store the dice results
	var diceResults = new Array();

	
	function rollDice(diceType, iteration, array) {
		if (iteration == 1) {
			//return the base case
			for (i = 0; i < diceType.diceFaces.length; i++) {
				array[i] = (diceType.diceFaces[i]);
			}
		} else {
			//continue
			for (i = 0; i < diceType.diceFaces.length; i++) {

				array[][i] = diceType.diceFaces[i];
				rollDice(diceType, iteration - 1, tempResult);
			}

		}
	}
	
	
	for (i = 0; i < numberDicesRolled; i++) {
		rollDice(diceTypeRolled, numberDicesRolled, diceResults);
	}

}
	
//scrivi il dado, passa il successvio per quanti scrivere dipende dalla stessa faccia del dado (potenza delle facce del dado)


// create a function that calculates the number of success given a n° of dice rolled and condition of success


//contare i numero di successi critici e il numero di successi normali

//confronto difesa con attacco (se ha fendente e difesa è scudo se ncriticidifesa > n critici attacco, fail altrimenti se n° successi maggiore num successi difesa successo altrimenti fail
//fai funzione per il confronto a prescindere, path del cleave e dello scudo solo se è entrambe le condizioni sono vere