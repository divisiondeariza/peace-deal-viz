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
	  	  	frequency_list.push({"text":key, "size":frequency_dict[key]*0.5})
	  	  }

	  frequency_list.sort(function(a,b){
	  	return a.size < b.size
	  })
	  var fill = d3.scale.category20();

	  console.log(frequency_list);

	d3.layout.cloud().size([1000, 1000])
	        .words(frequency_list.slice(1,300))
 			//.rotate(function() { return ~~(Math.random() * 2) * 90; })
 			.spiral("archimedean")
	        .fontSize(function(d) { return d.size; })
	        .on("end", draw)
	        .start();
/*
	function draw(words) {
	    d3.select("#chart").append("svg")
	            .attr("width", 850)
	            .attr("height", 850)
	            .attr("class", "wordcloud")
	            .append("g")
	            // without the transform, words words would get cutoff to the left and top, they would
	            // appear outside of the SVG area
	            .attr("transform", "translate(320,200)")
	            .selectAll("text")
	            .data(words)
	            .enter().append("text")
	            .style("font-size", function(d) { return d.size + "px"; })
	            .style("fill", function(d, i) { return "#222"; })
	            .attr("transform", function(d) {
	                return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
	            })
	            .text(function(d) { return d.text; });
	}*/

    //Draw the word cloud
    function draw(words) {
 	    var svg = d3.select("#chart").append("svg")
	            .attr("width", 2000)
	            .attr("height",2000)
	            .attr("class", "wordcloud")
	            .attr("transform", "translate(250,250)");

        var cloud = svg.selectAll("g text")
                        .data(words, function(d) { return d.text; })

        //Entering words
        cloud.enter()
            .append("text")
            .style("font-family", "Impact")
            .style("fill", function(d, i) { return fill(i); })
            .attr("text-anchor", "middle")
            .attr('font-size', 1)
            .text(function(d) { return d.text; });

        //Entering and existing words
        cloud
            .transition()
                .duration(600)
                .style("font-size", function(d) { return d.size + "px"; })
                .attr("transform", function(d) {
                    return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
                })
                .style("fill-opacity", 1);

        //Exiting words
        cloud.exit()
            .transition()
                .duration(200)
                .style('fill-opacity', 1e-6)
                .attr('font-size', 1)
                .remove();
    }

	});
	
})()
