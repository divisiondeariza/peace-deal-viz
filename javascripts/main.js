(function(){

	d3.text("acuerdo.txt", function(error, text) {
	  if (error) throw error;
	  var wordlist = text.split(/\s/g)
	  				.filter(function(word){
	  					// console.log(Number.isInteger(word));
	  					return !Number.isInteger(parseInt(word));
	  				})
	  				.map(function(word){
	  					return word.toLowerCase();
	  				}); 

	  var frequency_dict = {}
	  wordlist.forEach(function(d){
	  	//console.log(d)
	  	if(!frequency_dict[d])
	  		frequency_dict[d] = 1;
	  	else
	  		frequency_dict[d] ++;
	  })

	  var frequency_list = [];		
	  for(var key in frequency_dict){
	  	  	frequency_list.push({"text":key, "size":frequency_dict[key] })
	  	  }
	  console.log(frequency_list)
	});
	
})()
