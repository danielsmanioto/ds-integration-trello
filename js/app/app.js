const token = "8d4eda0550b6faa78eae88d8af6766940303faa55c2f2819fe208d3634b70ded";//"83797a3b565950857ac034cbc5f3932681f1ddb26b34c569dd2cce816358552f";
const key = "8345d6cab257ea036e0c13f8442e96f0";

let board = {
	id_board : "5e08d46f29eff3528ddc3594",
	card_id : "5e08d47987204578f2e34b01"
}


/**
*  Return o token autenticate to Trello
*  Generate token in https://trello.com/app-key
*/
function getToken() {
	return token;	
}

/**
* Return the key of access Trello  
* References: https://trello.com/app-key
*/
function getKey() {
	return key;
}

/**
*  Return full access key 
*/
function getAccessValid() {
	return '?key=' + key + '&token=' + token;
}

$(function(){
	
	/**
	* Autenticate
	*/
	Trello.authorize({
	  type: 'popup',
	  name: 'Trello Integrationl',
	  scope: {
	    read: 'true',
	    write: 'true' },
	  expiration: 'never',
	  success: function(){

	  },
	  error: function() {

	  }
	});

	/**
	* Create a new card
	*/
	$("#create-new-card").click(function(){
		var newCard = 
		{
		  idList: board.card_id,	
		  name: $("#card-name").val(), 
		  desc: $("#card-desc").val(),
		  pos: "top", 
		  due: null
		};

		Trello.post('/cards/' + getAccessValid(), 
			newCard, 
			function(){
				alert("Card criado com sucesso");
			}, 
			function(){

			}); 
	});

});
