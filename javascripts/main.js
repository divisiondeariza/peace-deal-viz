(function(){

	d3.text("acuerdo.txt", function(error, text) {
	  if (error) throw error;
	  var wordlist = text.split(/\s/g)
	  				.filter(function(word){
	  					// console.log(Number.isInteger(word));
	  					var blacklist = ["", "de","y", "la", "el", "los", "en", "del", "que", "para", "las", "con", "por", "a", "se",
	  										"lo", "su", "ser", "es", "e", "•", "o", "un", "al"]
	  					return (!Number.isInteger(parseInt(word))) && (blacklist.indexOf(word.toLowerCase()) ==  -1);
	  				})
	  				.map(function(word){
	  					return word.toLowerCase().replace(/[.,\/#!$%\^\*;:{}=_`~()]/g,"");
	  				}); 

	  var frequency_dict = {}
	  wordlist.forEach(function(d){
	  	if(!frequency_dict[d])
	  		frequency_dict[d] = 1;
	  	else
	  		frequency_dict[d] ++;
	  })

	  var frequency_list = [];		
	  for(var key in frequency_dict){
	  	  	frequency_list.push([key, frequency_dict[key]])
	  	  }

	  frequency_list.sort(function(a,b){
	  	return a.size < b.size;
	  })
	  var fill = d3.scale.category20();

	  var svg =d3.select("#sourrounding_div")
	  			.append("canvas")
	  			.attr("id", "canvas")

	  console.log(frequency_list.filter(function(elem){return elem[1] > 5}));

		var div = document.getElementById("sourrounding_div");

		var canvas = document.getElementById("canvas");

		canvas.height = div.offsetHeight;

		canvas.width  = div.offsetWidth;


		var options = 
		{
		  list: frequency_list.filter(function(elem){return elem[1] > 10}),
		  gridSize: 1,  
		  weightFactor: function(size){
		  	return size*0.2;
		  }
		}
		WordCloud(document.getElementById('canvas'), options); 



	});
	
})()
