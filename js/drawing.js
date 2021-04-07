var canvas;
var context;
function init(){
    canvas = document.getElementById('canvas');
    context = canvas.getContext("2d");
    context.fillStyle = '#fff';
    context.lineWidth = 10;
    context.fillRect(0, 0, canvas.width, canvas.height);

    context.lineCap = "round";
    var paint = false;
    var left = canvas.offsetLeft;
    var top = canvas.offsetTop;

    canvas.addEventListener('mousedown', function(e){
        if(e.button == 0){
            paint = true;
            context.beginPath();
            context.moveTo(e.pageX-left, e.pageY-top);
        } else {
            paint = false;
        }
    });

    canvas.addEventListener('mousemove', function(e){
        if(paint){
            context.lineTo(e.pageX-left, e.pageY-top);
            context.stroke();
        }
    });

    canvas.addEventListener('mouseup', function(e){
        if(e.button != 0){
            paint = true;
        } else {
            paint = false;
            context.lineTo(e.pageX-left, e.pageY-top);
            context.stroke();
            context.closePath();
        }
    });

    document.getElementById('canvas');
}

async function makeImage(){
    canvas.toBlob(function(blob) {
        var file = new File([blob], 'test.jpg', { type: 'image/jpeg' });
        var xhr = new XMLHttpRequest();
        var formData = new FormData();
        formData.append('file', file);
        xhr.open('POST', 'receiver.php');
        xhr.addEventListener('load', e => {
            console.log(e, formData);
        });
        xhr.send(formData);
    }, 'image/jpeg');
}

function clearCanvas(){
    context.fillStyle = '#fff';
    context.fillRect(0, 0, canvas.width, canvas.height);
}