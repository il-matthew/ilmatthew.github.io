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
	//lazy inizialization of diceResults
	for(i=0;i<numberTotalPossibilites;i++){
		if (typeof diceResults[i] === 'undefined'){
			diceResults[i] = new Array(numberDicesRolled);
		}
	}
	
	
	
	//for the for loop, store which iteration is being analyzed
	//var iteration = 0;
	
	//inizialize a storage for where the function left off to write and lazi inizialization
	var rowToWrite = new Array(numberDicesRolled);
	for(i=0;i<numberDicesRolled;i++){
		rowToWrite[i] = 0;
	}
	
	
	
	//inizalize the counter for the dice
	var diceFaceToWrite = new Array(diceTypeRolled.diceFaces.length);
	for(i=0;i<diceFaceToWrite.length;i++){
		diceFaceToWrite[i] = 0;
	}
	
	function diceCombinations(diceTypeRolled, numberDicesRolled, iteration){
		if(numberDicesRolled - iteration == 1){ //se è l'ultim interazione
			for(i=0;i<diceTypeRolled.diceFaces.length;i++){
				var temp = rowToWrite[iteration]+i;
				diceResults[temp][iteration]  = diceTypeRolled.diceFaces[i]
			}
			rowToWrite[iteration]=rowToWrite[iteration]+diceTypeRolled.diceFaces.length;
		}else{
			//determine how long is the block to write
			var blockToWrite = diceTypeRolled.numCases(numberDicesRolled);//considerare iteration
			
			//write the column for the dice
			for(i=0;i<diceTypeRolled.diceFaces.length;i++){
				for(j=0;j<blockToWrite;j++){
					var temp = rowToWrite[iteration]+j;
					diceResults[temp][iteration] = diceTypeRolled.diceFaces[i]
				}
				rowToWrite[iteration]=rowToWrite[iteration]+blockToWrite;
			}
			
			//call n times the function to write the other column
			for(i=0;i<diceTypeRolled.diceFaces.length;i++){
				diceCombinations(diceTypeRolled, numberDicesRolled, iteration+1)
			}
			// quante righe devo scrivere
			//scrivo tutte le righe per tutti i dadi
			//richiamo la funzione n volte, una per ogni faccia del dado scritta
			//scrivo il blo
		}
		
		
	}
	
	/*
	function rollDice(diceType, iteration) { //TODO insert carryon between operations

		if (numberDicesRolled - iteration == 1) { //it's the last iteration, so it just writes the last dice
			for (i = 0; i < diceType.diceFaces.length; i++) {
				diceResults[diceFaceToWrite[iteration] + i][iteration] = diceType.diceFaces[i];
			}
			rowToWrite[iteration] = rowToWrite[iteration] + diceType.diceFaces.length;
			diceFaceToWrite[iteration] = diceFaceToWrite[iteration]+diceType.diceFaces.length;
		}
		else {
			
			for (i = 0; i < diceType.diceFaces.length; i++) { //call the function for each face to write
				var howManyRowsToWrite = diceType.numCases(numberDicesRolled - iteration - 1);
			
				for (j = 0; j < howManyRowsToWrite; j++) {
					diceResults[rowToWrite[iteration]+j][iteration] = diceType.diceFaces[diceFaceToWrite[iteration]];
				}
				
				//remember where to star writing next
				diceFaceToWrite[i] = diceFaceToWrite[i]+howManyRowsToWrite;
				//function calback to move to the other 
				rollDice(diceType, iteration +1, rowToWrite[iteration +1])
				//richiamo la funzione

				diceFaceToWrite[iteration]++;
				rowPointer = rowToWrite;
				
			}
			
		}
	}*/
	
	diceCombinations(diceTypeRolled, numberDicesRolled,0);
	return diceResults;

}



//scrivi il dado, passa il successvio per quanti scrivere dipende dalla stessa faccia del dado (potenza delle facce del dado)


// create a function that calculates the number of success given a n° of dice rolled and condition of success


//contare i numero di successi critici e il numero di successi normali

//confronto difesa con attacco (se ha fendente e difesa è scudo se ncriticidifesa > n critici attacco, fail altrimenti se n° successi maggiore num successi difesa successo altrimenti fail
//fai funzione per il confronto a prescindere, path del cleave e dello scudo solo se è entrambe le condizioni sono vere