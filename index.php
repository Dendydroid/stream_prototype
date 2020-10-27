<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Streaming Test</title>
    <style>
        /*#video{*/
            /*transform: rotate(-90deg);*/
        /*}*/
    </style>
</head>
<body>

<h1>Camera</h1>

<video id="stream_video" width="640" height="480" autoplay></video>

<img id="partner_video" src="" alt="">
<!--<button id="snap">Snap Photo</button>-->
<!--<canvas id="stream_canvas" width="640" height="480"></canvas>-->

<!--<canvas id="partner_canvas" width="640" height="480"></canvas>-->

<script src="https://code.jquery.com/jquery-3.5.1.min.js" integrity="sha256-9/aliU8dGd2tb6OSsuzixeV4y/faTqgFtohetphbbj0=" crossorigin="anonymous"></script>
<script src="js/socket.js"></script>
<script src="js/camera.js"></script>
</body>
</html>