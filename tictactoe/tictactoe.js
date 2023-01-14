    let clickNr = 0;
    let gameOver = 0;
    const winPattern = [
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9],
        [1, 4, 7],
        [2, 5, 8],
        [3, 6, 9],
        [1, 5, 9],
        [3, 5, 7]
    ];

    let xPattern = [];
    let oPattern = [];

    // creating 9 areas to click on
    for (let i = 1; i < 10; ++i) {
        // create click area
        const clickArea = document.createElement("button");
        clickArea.setAttribute("id", i);
        clickArea.setAttribute("class", "clickArea");
        createButton(i, "grey", clickArea);
    
        // user 1 & user 2
        const user1 = document.createTextNode("X");
        const user2 = document.createTextNode("0");

        // create hidden display
        const displayXorO = document.createElement("h2");
        displayXorO.hidden = "hidden";
        displayXorO.setAttribute("id", "text" + i);
        displayXorO.setAttribute("class", "xAndO");
        displayXorO.setAttribute("style", "color: red; display: flex; place-items: center; align-content: center; justify-content: center; text-align: center;");
        
        let textId = displayXorO.id;

        // add eventListener
        document.getElementById("grid").appendChild(clickArea);
        document.getElementById(i).appendChild(displayXorO);

        clickArea.addEventListener("click", function ticTacToe() {
            let element = document.getElementById(textId);
            element.removeAttribute("hidden");

            // add the text node to the newly created area and colors it black or white on click
            if (displayXorO.firstChild == null && clickNr % 2 == 0) {
                createChild(user1, displayXorO);  
            } else if (displayXorO.firstChild == null && clickNr % 2 != 0) {
                createChild(user2, displayXorO);
            }

            // check the winner
            if (textId == ("text" + i)) {
                if (document.getElementById(textId).innerHTML == "X") {
                    createButton(i, "white")
                    clickOnButton(xPattern, i);
                } else {
                    createButton(i, "black")
                    clickOnButton(oPattern, i);
                }
                
                // checking if one of the players win
                for (let line = 0; line < 8; ++line) {
                    let xWins = 0, oWins = 0;
                    for (let column = 0; column < 3; ++column) {
                        for (let j = 0; j < xPattern.length; ++j) {
                            if (xPattern[j] == winPattern[line][column]) {
                                ++xWins;
                            } 
                            if (oPattern[j] == winPattern[line][column]) {
                                ++oWins;
                            } 
                        }
                        
                        if (xWins == 3 || oWins == 3) {       
                            let player;
                            if (xWins == 3) {   // X wins
                                player = "X";
                            } else {            // 0 wins
                                player = "0";
                            }
                            document.getElementById("popArea").innerHTML = player + " wins!";
                            endGame();
                        } else if (clickNr == 9 && gameOver == 0) {     // draw
                            document.getElementById("popArea").innerHTML = "Draw!";
                            endGame();
                        }
                    }
                }    
            }
        });
    }     

    function endGame() {
        // disable all the buttons
        for (let k = 1; k < 10; ++k) {
            document.getElementById(k).setAttribute("disabled", "true");
        }
        gameOver = 1;

        // apears reset game button
        document.getElementById("resetButton").removeAttribute("hidden");
        document.getElementById("backToGamePlatform").removeAttribute("hidden");
    }

    // disable clicked button
    function clickOnButton(pattern, i) {
        pattern.push(i);
        document.getElementById(i).setAttribute("disabled", "true");
    }

    // color buttons on click
    function createButton(i, color, area) {
        if (color == "black") {
            document.getElementById(i).setAttribute("style", "background-color: black; width: 80px; height: 80px; border: 2px double; border-radius: 25px; box-shadow: 5px 10px;");
        } else if (color == "white") {
            document.getElementById(i).setAttribute("style", "background-color: white; width: 80px; height: 80px; border: 2px double; border-radius: 25px; box-shadow: 5px 10px;");
        } else {
            area.setAttribute("style", "background-color: grey; width: 80px; height: 80px; border: 2px double; border-radius: 25px; box-shadow: 5px 10px;");
        }
    }

    function createChild(user, displayXorO) {
        displayXorO.appendChild(user);
        ++clickNr;
    }