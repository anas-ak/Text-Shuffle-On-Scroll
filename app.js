const randomString = (function() {
    var data = {
        isScrolling: false,
        repeat: 0,
        target: [],
        letters: '*+-/@_$[%!X01&#]',
        originalStrings: '',
        singleLetters: []
    };

    Array.prototype.shuffle = function() {
        var input = this;

        for(var i = input.length-1; i >= 0; i--) {
            
            var randomIndex = Math.floor(Math.random() * (i + 1));
            var itemAtIndex = input[randomIndex];
            input[randomIndex] = input[i];
            input[i] = itemAtIndex;
        }
        return input;
    }

    function checkLength(x) {
        return Array.from(document.querySelectorAll(x)).length > 0;
    }

    function addListener(evt, fx) {
        window.addEventListener(evt, fx);
    }

    function changeLetter(letter) {
        if(letter.textContent != ' ') {
            letter.classList.add('is-changing');
            letter.style.animationDuration = Math.random().toFixed(2) + 's';

            var newChar = data.letters.substr( Math.random() *  data.letters.length, 1);

            letter.textContent = newChar;
            letter.setAttribute('data-txt', newChar);
        }
    }

    function resetLetter(letter, value) {
        letter.classList.remove('is-changing');
        letter.textContent = value;
        letter.setAttribute('data-txt', value);
    }

    //Divide single letters into strings and wrap them into spans
    function divideLetters() {

        data.target.forEach( (element, index) => {
            var text = element.textContent;
            var textDivided = '';
            data.originalStrings = text;

            for(var i=0; i<text.length; i++) {
                textDivided += `<span class= "el-sp el-st-${index}-span-${i}" data-txt="${text.substr(i, 1)}">${text.substr(i, 1)}</span>`;
            }
            element.innerHTML = textDivided;
        });
        data.singleLetters = document.querySelectorAll('.el-sp');
    }

    //Change letters
    function changeLetters() {
        /* THE IMPORTANT BIT */
        if(data.isScrolling) {
            data.singleLetters.forEach(function(el, index) {
                changeLetter(el);
            });
        }
        setTimeout(changeLetters, 10);
    }

    //Reset To Initial Letters
    function resetLetters() {

        var randomArray = [];
        for(var i=0; i<data.singleLetters.length; i++) {
            randomArray.push(i);
        }
        randomArray.shuffle();
        randomArray.forEach(function(el, index) {
            
            setTimeout(function() {
                resetLetter(data.singleLetters[el], data.originalStrings.substring(el, el + 1));    
            }, (index * 20 * (Math.random() * 5))).toFixed(2); 

        });
    }

    // Event Listener for Scroll State
    function updateScrollState() {
        clearTimeout(delay);
        data.isScrolling = true;

        var delay = setTimeout(function() {

            data.isScrolling = false;
            resetLetters();
        }, 300);
    };

    return {
        init: function(selector) {

            if(checkLength(selector)) {

                data.target = Array.from(document.querySelectorAll(selector));

                divideLetters();

                changeLetters();

                addListener('scroll', updateScrollState);
            }
        }
    }


})();

randomString.init('.el-st');