let camera = {
    width: 640,
    height: 640,
    streaming: false,
    video: document.getElementById('stream_video'),
    photo: null,
    start_button: null,
    FPS: 30,
};

let canvas = document.getElementById('stream_canvas');
let context = canvas.getContext('2d');

let lastFrame = "";

let err = false;

connection.onerror = error => {
    err = true;
    console.log(`WebSocket error: ${error}`)
};

let partner_canvas = document.getElementById("partner_canvas");
let partner_context = partner_canvas.getContext("2d");

let frame = new Image();

connection.onmessage = e => {
    let data = JSON.parse(e.data);
    if(data.user === user_id)
    {
        frame.src = data.frame;
        partner_context.drawImage(frame, 0, 0);
    }
};

connection.onopen = () => {

};

if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
    navigator.mediaDevices.getUserMedia({video: true, audio: false}).then(function (stream) {

        camera.video.srcObject = stream;

        camera.video.addEventListener('play', function () {
            let $this = this;
            (function loop() {
                if (!$this.paused && !$this.ended) {
                    context.drawImage($this, 0, 0); // drawing our camera
                    if(!err)
                    {
                        lastFrame = JSON.stringify(
                            { // sending frame
                                user:user_id,
                                frame:canvas.toDataURL(),
                            }
                        );
                        connection.send(lastFrame);
                    }

                    setTimeout(loop, 1000 / camera.FPS);
                }
            })();
        }, 0);

        //video.src = window.URL.createObjectURL(stream);
        camera.video.play();
    });
}
