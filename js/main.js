(function(){
	var i;
	// var total = 500;
	var totalpeople = 32875;
	var othernumber = 100;
	var numbers = {'man':0,'woman':0, 
						'highlight': {'man':0,
									'woman':0}

					};
	var man = '<img class = "figure animated bounceIn" src = "img/man.svg">';
	var woman = '<img class = "figure animated bounceIn" src = "img/woman.svg">';
	var hwoman = '<img class = "figure animated bounceIn" src = "img/woman-h.svg">';
	var hman = '<img class = "figure animated bounceIn" src = "img/man-h.svg">';
	var hwork = '<img class = "figure work animated bounceIn" src = "img/work-h.svg">';
	var work = '<img class = "figure work animated bounceIn" src = "img/work.svg">';

	var com = 'For every 100 people, there '

	var usingnum = {};

	var s;

	$('#reset').on('click',function(){
		$('#menu').css({'display':'block'})
		$('#results').css({'display':'none'});
	})

	d3.csv ('data/racegender.csv', function(error, racegender){
		d3.csv ('data/rolegender.csv', function(error, role){
			$('#submit').on('click',function(){
				domath();
				bakeresults();
			});

			racegender.forEach(function(d){
				d.roundp = Math.round(d.percentage_16).toString();
				d.usingp = (Math.round(d.percentage_16 * 10)/10).toString();
				d.usingrace = d.race;
			})

			function domath(){
				numbers = {'man':0,'woman':0, 
						'highlight': {'man':0,
									'woman':0}}
				gender = $('#gender').val();
				race = $('#race').val();
				usingnum = _.findWhere(racegender,{'race':race,'gender':gender})
				numbers.man = _.findWhere(racegender,{'race':'Total','gender':'Male'}).roundp
				numbers.woman = _.findWhere(racegender,{'race':'Total','gender':'Female'}).roundp
				if (usingnum.gender==='Male'){
					numbers.highlight.man = Number(usingnum.roundp)
					numbers.man = numbers.man-numbers.highlight.man;
					usingnum.usinggender = 'Male'
				}

				if (usingnum.gender==='Female'){
					numbers.highlight.woman = Number(usingnum.roundp)
					numbers.woman = numbers.woman-numbers.highlight.woman;
					usingnum.usinggender = 'Female';
				}

				if (usingnum.gender==='Total'){
					runtotalcal();
				}

			}
			
			function bakeresults (){
				$('#visual').html('');
				$('#commentary').html('');
				var gender = $('#gender').val();
				var race = $('#race').val();
				usingnum = _.findWhere(racegender,{'race':race,'gender':gender})
				$('#menu').css({'display':'none'})
				$('#results').css({'display':'block'});

				if (gender == 'Total' && race == 'Total'){
					$('#visual').html('');
					$('#commentary').html('');
					var sentence = "Since you didn't choose an option, here is a fact. <span>For every 100 newsrooms, </span><span class = 'highlight'>77</span> have at least one woman among top three editors. That is a 14 percent increase from 2015."
					var tweet = 'For every 100 newsrooms, 63 have at least one woman among top three editors.'
					$('#commentary').append(sentence)
					for (i = 1; i<=77; i++){
						$('#visual').append(hwork);
					}
					for (i = 1; i<=23; i++){
						$('#visual').append(work);
					}

					var tweettext = "https://twitter.com/intent/tweet?" + "url=http://www.poynter.org/news/mediawire/361641/interactive-find-out-how-diverse-the-newspaper-industry-is/&via=poynter&text="+tweet;

				$('#hyperlink').attr('href',tweettext)

				} else {

				if (usingnum.percentage_16 < 1){
					usingnum.roundp = Math.round(usingnum.percentage_16 * 10) / 10;;
				}

					// $('.figure').addClass('animated bounceIn')
				for (i = 1; i<=numbers.highlight.woman; i++){
					$('#visual').append(hwoman);
				}
				for (i = 1; i<=numbers.highlight.man; i++){
					$('#visual').append(hman);
				}

				for (i = 1; i<=numbers.man; i++){
					$('#visual').append(man);
				}
				for (i = 1; i<=numbers.woman; i++){
					$('#visual').append(woman);
				}

				if (usingnum.roundp == '1'){
					if (race = 'Asian'){
						var isare = 'are';
						s = 's'
					} else {
					var isare = 'is';
					s = ''
					}
				} else {
					var isare = 'are';
					s = 's'
				}

				if (usingnum.gender=='Total'){
					if (usingnum.gender=='Total' && isare == 'are'){
						usingnum.usinggender='people';
					} else{
						if (usingnum.gender=='Total' && isare == 'is'){
						usingnum.usinggender='person';
						}
					}
					s = ''
					
				} 

				if (usingnum.race=='Total'){
					usingnum.usingrace=''
				}

				var sentence = '<span>'+com+'</span>'+isare+' '+ '<span class = "highlight">'+usingnum.usingp +' '+usingnum.usingrace+' '+usingnum.usinggender.toLowerCase()+s+'</span> in American newsrooms.'
				var tweet = com + isare + ' ' + usingnum.usingp +' '+usingnum.usingrace+' '+usingnum.usinggender.toLowerCase()+s+' in American newsrooms.'
				$('#commentary').append(sentence)

				var tweettext = "https://twitter.com/intent/tweet?" + "url=http://www.poynter.org/news/mediawire/361641/interactive-find-out-how-diverse-the-newspaper-industry-is/&via=poynter&text="+tweet;

				$('#hyperlink').attr('href',tweettext)

				}
				
				
			}

			function runtotalcal(){

				numbers.highlight.man = Number(_.findWhere(racegender,{'race':usingnum.race,'gender':'Male'}).roundp)
				numbers.highlight.woman = Number(_.findWhere(racegender,{'race':usingnum.race,'gender':'Female'}).roundp)
				numbers.man = numbers.man-numbers.highlight.man;
				numbers.woman = numbers.woman-numbers.highlight.woman;

				if (race == 'Asian'){
					numbers.highlight.woman = numbers.highlight.woman +1
					numbers.woman = numbers.woman - 1
				}
			}

		});
	});

}).call(this);