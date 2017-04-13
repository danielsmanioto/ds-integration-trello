const token = "83797a3b565950857ac034cbc5f3932681f1ddb26b34c569dd2cce816358552f";
const key = "8345d6cab257ea036e0c13f8442e96f0";

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
	  name: 'Vida de casal',
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
	* get boards
	*/
	function getBoards(){
		Trello.get('/member/me/boards' + getAccessValid(), 
			function(jsonData) {
				 //Preenche combo
				 var $select = $('#board-id');
				 $select.empty();
				 
				 $(jsonData).each(function (index, o) {    
				    var $option = $("<option/>").attr("value", o.id).text(o.name);
				    $select.append($option);
				});

			}, 
			function(error) {
		  		alert("Erro ao buscar o quadro do trello");
			}
		);
	}
	getBoards();

	/**
	* get board title list
	*/
	$("#board-id").change(function(){
		var idBoard = $("#board-id").val();
		Trello.get('/boards/' + idBoard+ '/lists' + getAccessValid(), 		
			function(jsonData) {
				//Preenche combo
				 var $select = $('#card-id');
				 $select.empty();

				 $(jsonData).each(function (index, o) {    
				    var $option = $("<option/>").attr("value", o.id).text(o.name);
				    $select.append($option);
				});

			}, 
			function(error) {
		  		alert("Erro ao buscar os boards do trello");
			}
		);
	});

	/**
	* Create a new card
	*/
	$("#create-new-card").click(function(){
		var newCard = 
		{
		  idList: $("#card-id").val(),	
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
