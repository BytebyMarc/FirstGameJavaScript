<!doctype html>
<html lang="de">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="style.css">
    <title>FirstGame</title>
</head>
<body>
<div class="canvas-container">
    <canvas id="myCanvas" width="800" height="800"></canvas>
    <div style="display: none" class="overlay" id="overlay">
        <div class="answer" id="answer1"> </div>
        <div class="answer" id="answer2"> </div>
        <div class="answer" id="answer3"> </div>
        <div class="answer" id="answer4"> </div>
    </div>
</div>

<script type="module" src="./main.js"></script> <!-- Skript muss nach dem canvas kommen damit es im DOM verfügbar ist -->
</body>
</html>

<!-- union, difference, instersection, has, add, delet, -->