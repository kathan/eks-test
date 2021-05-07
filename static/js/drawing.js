let canvas;
let context;
let result;
function init(){
    canvas = document.getElementById('canvas');
    context = canvas.getContext("2d");
    result = document.getElementById('result');

    context.fillStyle = '#fff';
    context.lineWidth = 4;
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

// async function makeImage(){
//     const worker = Tesseract.createWorker({
//         logger: m => console.log(m)
//     });
//     canvas.toBlob(async function(blob) {
//         await worker.load();
//         await worker.loadLanguage('eng');
//         await worker.initialize('eng');
//         await worker.setParameters({
//             tessedit_pageseg_mode: 2,
//         });

//         const { data: { text } } = await worker.recognize(blob);
//         result.innerHTML = text;
//         await worker.terminate();
//     }, 'image/jpeg');
// }

async function makeImage(){
    canvas.toBlob(async function(blob) {
         const { data: { text } } = await Tesseract.recognize(
            blob,
            'eng',
            {
                tessedit_char_whitelist: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
                tessedit_pageseg_mode: 8,
                logger: m => console.log(m) 
            }
        );
        result.innerHTML = text;
        console.log(text);
    }, 'image/jpeg');
}
// async function makeImage(){
//     canvas.toBlob(function(blob) {
//         var file = new File([blob], 'test.jpg', { type: 'image/jpeg' });
//         var xhr = new XMLHttpRequest();
//         var formData = new FormData();
//         formData.append('file', file);
//         xhr.open('POST', 'ocr');
//         xhr.addEventListener('load', e => {
//             console.log(e, formData);
//         });
//         xhr.send(formData);
//     }, 'image/jpeg');
// }

function clearCanvas(){
    context.fillStyle = '#fff';
    context.fillRect(0, 0, canvas.width, canvas.height);
}