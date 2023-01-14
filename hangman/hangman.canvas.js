    function paint() {
        const canvas = document.querySelector('#canvas');
        if (!canvas.getContext) {
            return 0;
        }
        let gameBase = canvas.getContext('2d');

        // set fill and stroke styles
        gameBase.fillStyle = 'white';
        gameBase.strokeStyle = 'white';

        // draw game rectangle with stroke and fill
        gameBase.strokeRect(0, 0, 500, 300);
        gameBase.fillRect(1, 1, 498, 298);

         // draw post
        gameBase.beginPath();
        gameBase.strokeStyle = 'green';
        gameBase.moveTo(150, 50);
        gameBase.lineTo(150, 280);
        gameBase.lineTo(180, 280);
        gameBase.lineTo(180, 80);
        gameBase.lineTo(300, 80);
        gameBase.lineTo(300, 50);
        gameBase.lineTo(150, 50);
        gameBase.stroke();

        // draw man
        gameBase.strokeStyle = 'red';
        gameBase.moveTo(300, 80);
        if (triesLeft <= 5) {
            gameBase.lineTo(300, 150);
            gameBase.stroke();
        } 
        if (triesLeft <= 4) {
            gameBase.lineTo(250, 200);
            gameBase.stroke();
        }
        if (triesLeft <= 3) {
            gameBase.moveTo(300, 150);
            gameBase.lineTo(350, 200);
            gameBase.stroke();
        }
        if (triesLeft <= 2) {
            gameBase.moveTo(300, 150);
            gameBase.lineTo(300, 250);
            gameBase.stroke();
        }
        if (triesLeft <= 1) {
            gameBase.lineTo(250, 300);
            gameBase.stroke();
        }
        if (triesLeft <= 0) {
            gameBase.moveTo(300, 250);
            gameBase.lineTo(350, 300);
            gameBase.stroke();
        }
    }  