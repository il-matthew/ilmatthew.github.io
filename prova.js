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
	
	var columnToWrite=0;
	var iteration =0;
	
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
	
	function diceCombinations(iteration){
		if(numberDicesRolled - iteration == 1){ //caso finale
			for(i=0;i<diceTypeRolled.numCases(numberDicesRolled-1);i++){
				for(j=0;j<diceTypeRolled.diceFaces.length;j++){
					diceResults[(diceFaceToWrite[columnToWrite]+j)][columnToWrite] = diceTypeRolled.diceFaces[j];
				}
				diceFaceToWrite[columnToWrite] = diceFaceToWrite[columnToWrite] + diceTypeRolled.diceFaces.length;
			}	
		}else{
			var blockToWrite= diceTypeRolled.numCases(numberDicesRolled-iteration-1);
			var numTimesToCall = numberTotalPossibilites/diceTypeRolled.numCases(numberDicesRolled-iteration);
			console.log("numTimesToCall: "+numTimesToCall);
			for(k=0;k<numTimesToCall;k++){//quante volte richiamare la funzione
				//ogni faccia del dado
				for(i=0;i<diceTypeRolled.diceFaces.length;i++){
					for(j=0; j<blockToWrite;j++){
						diceResults[(diceFaceToWrite[columnToWrite]+j)][columnToWrite] = diceTypeRolled.diceFaces[i];
						console.log("risultato posizione: ["+(diceFaceToWrite[columnToWrite]+j)+"]["+columnToWrite+"]:"+diceResults[(diceFaceToWrite[columnToWrite]+j)][columnToWrite])
					
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



//scrivi il dado, passa il successvio per quanti scrivere dipende dalla stessa faccia del dado (potenza delle facce del dado)


// create a function that calculates the number of success given a n° of dice rolled and condition of success


//contare i numero di successi critici e il numero di successi normali

//confronto difesa con attacco (se ha fendente e difesa è scudo se ncriticidifesa > n critici attacco, fail altrimenti se n° successi maggiore num successi difesa successo altrimenti fail
//fai funzione per il confronto a prescindere, path del cleave e dello scudo solo se è entrambe le condizioni sono vere