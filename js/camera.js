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

const user_id = 1;

let lastFrame = "";

let err = false;
let partner_video = document.querySelector("#partner_video");

connection.onerror = error => {
    err = true;
    console.log(`WebSocket error: ${error}`)
};

connection.onmessage = e => {
    e.data = JSON.parse(e.data);
    if(e.data.user === user_id)
    {
        partner_video.src = e.data.frame;
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
