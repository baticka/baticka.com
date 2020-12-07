
;(function($) {
	$.fn.fancyTypewriter = function(arg) {
		
		//save options
		var options = $.extend({}, $.fn.fancyTypewriter.defaults, arg);
		
		//save characters, which should be used for the effect
		var chars = [];
		if(options.uppercase) {
			chars = chars.concat(getChars('A', 'Z'));
		}
		if(options.lowercase) {
			chars = chars.concat(getChars('a', 'z'));
		}
		if(options.numbers) {
			chars = chars.concat(getChars('0', '9'));
		}
		if(options.customCharacters) {
			var customChars = options.customCharacters.split(',');
			for(var i in customChars) {
				chars.push(customChars[i]);
			}
		}
		
		function _init(element) {
			var $element = $(element);
	
			if(options.targetText) 
			{
				$element.data({'originText': options.targetText});
			}
			else {
				$element.data({'originText': $element.html()});	
			}			
			if(options.autoPlay) {
				$element.hide();
				_start(element);
			}
			if(options.mouseOver) {
				$element.mouseenter(function(){
				_start(element);
			 });
			}
		};
		
		function _start(element){
			var $element = $(element);
			
			if($element.data('timer')) {
				clearInterval($element.data('timer'));
			}
			var currentCount = 0, counter = 0;
			var targetText = $element.data('originText');
			var totalSteps = options.steps * targetText.length;
			var randomText = "";
			
			var timer = setInterval(function(){
				if($element.is(':hidden')) {
					$element.show();
				}		
				currentCount++;
				if(currentCount % options.steps == 0 && currentCount != 0) {
					counter++;
				}
				var randomArr = [targetText.substr(0, counter)];
				
				//if type is disabled, randomize all letters of the text
				if(!options.type){
					for(var i = counter; i < targetText.length; ++i){
						randomArr.push(chars[_random(0, (chars.length - 1))]);
					}
				}
				
				//if underscore is enabled, set it at the end
				if(options.underScore) {
					 randomArr.push('_');
				}
				
				randomText = randomArr.join("");
				//set html
				$element.html(randomText);
				
				//clear timer and set final text
				if(currentCount == totalSteps) {
					$element.html(targetText);
					clearInterval(timer);
					options.callback();
				}
			}, options.timeBetweenSteps);
			
			//save timer of the element
			$element.data({'timer': timer});	
		};
		
		return this.each(function() {_init(this)});
	};
	
	//returns an arry with characters	
	function getChars(startChar, endChar){
		var startUnicode = startChar.charCodeAt(0);
		var endUnicode = endChar.charCodeAt(0);
		var chars = [];	
		for(var i = startUnicode; i <= endUnicode; ++i) {
			chars.push(String.fromCharCode(i));
		}
		return chars;
	};
	
	//return a random number
	function _random(max, min) {	
		return (Math.floor(Math.random() * (max - min + 1)) + min);
	};
	
	//default settings
	$.fn.fancyTypewriter.defaults = {
		targetText: '', //set a target text
		steps: 1, //the steps for each letter
		timeBetweenSteps: 5, //the time between each step in ms
		autoPlay: true, //start the effect automatically
		underScore: false, // enable/disable an underscore (only when type is true)
		mouseOver: true, //start typeWriter when moving mouse over text
		type: false, //type each letter one after another
		uppercase: true, //use uppercase letters for the effect
		lowercase: true, //use lowercase letters for the effect
		numbers: true, //use numbers for the effect
		customCharacters: '', //use own characters
		callback: function(){} //Called when the effect has ended
	};
	
})(jQuery);