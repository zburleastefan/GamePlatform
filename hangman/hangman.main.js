    let arrayLen = wordArray.length;
    randomWord = Math.floor(Math.random() * (arrayLen - 1)) + 1;
    const alphabetArray = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];

    let triesLeft = 6;
    let winCouter = 0;
    document.getElementById("livesLeft").innerHTML = "Tries left: " + triesLeft;
    document.getElementById("hint").innerHTML = "Hint: " + wordArray[randomWord].hint;

    for (let i = 0; i < alphabetArray.length; ++i) {
 
        const node = document.createElement("button");
        node.id = i;
        const textnode = document.createTextNode(alphabetArray[i]);
        node.appendChild(textnode);
        document.getElementById("alphabet").appendChild(node);

        // On click event (event listener)
        node.addEventListener("click", function() {
            document.getElementById(i).disabled = true;
            let charExists = 0;
            for (let j = 0; j < wordArray[randomWord].word.length; ++j) {
                if (document.getElementById(i).innerHTML == wordArray[randomWord].word[j]) {
                    lineArray[j] = document.getElementById(i).innerHTML;
                    document.getElementById("line" + j).innerHTML = lineArray[j];
                    ++charExists;
                }
            }
            if (charExists == 0) {
                --triesLeft;
                paint();
            } else {
                winCouter += charExists;
            }
            console.log(winCouter);

            if (triesLeft == 0) {
                disableAlphabet();
                popUp("Game Over!");

                // apears reset game button
                document.getElementById("resetButton").removeAttribute("hidden");
                document.getElementById("backToGamePlatform").removeAttribute("hidden");
                
            }
            if (winCouter == wordArray[randomWord].word.length) {
                disableAlphabet();
                popUp("Congratulation, you Won!");

                // apears reset game button
                document.getElementById("resetButton").removeAttribute("hidden");
                document.getElementById("backToGamePlatform").removeAttribute("hidden");
            }

            document.getElementById("livesLeft").innerHTML = "Tries left: " + triesLeft;
        });
    }

    let lineArray = [];
    for (let i = 0; i < wordArray[randomWord].word.length; ++i) {
        lineArray.push(' _ ');
        let line = document.createElement("a");
        line.id = "line" + i;
        let lineNode = document.createTextNode(lineArray[i]);
        line.appendChild(lineNode);
        document.getElementById("lines").appendChild(line);
    }

    function disableAlphabet() {
        for (let k = 0; k < alphabetArray.length; ++k) {
            document.getElementById(k).disabled = true;
        }
    }

    function popUp(popTxt) {
        document.getElementById("myPopup").innerHTML = popTxt;
    }