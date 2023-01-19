// Original function: https://fjolt.com/article/html-canvas-how-to-wrap-text
function wrapText(ctx, text, x, y, maxWidth, lineHeight) {
    let words = text.split(' ')
    let line = ''
    let testLine = ''
    let lineArray = []

    for (var n = 0; n < words.length; n++) {
        testLine += `${words[n]} `

        let metrics = ctx.measureText(testLine)
        let testWidth = metrics.width

        if (testWidth > maxWidth && n > 0) {
            lineArray.push([line, x, y])
            y += lineHeight
            line = `${words[n]} `
            testLine = `${words[n]} `
        }
        else {
            line += `${words[n]} `
        }

        if (n === words.length - 1) {
            lineArray.push([line, x, y])
        }
    }

    return lineArray
}

var faceFile = document.getElementById('facefile')
var faceImg = document.getElementById('face')

function updateCanvas()
{
    var c = document.getElementById("dialoguecanvas")
    var ctx = c.getContext("2d")
    ctx.drawImage(document.getElementById('dialoguebg'), 0, 0)
    ctx.drawImage(document.getElementById('face'), 496, 16)
    ctx.font = '20px terminus';
    ctx.fillStyle = '#FFFFFF';
    const text_wrapped = wrapText(ctx, document.getElementById('text-input').value, 20, 30, 608 - 96 - 20, 20)
    text_wrapped.forEach(function (item) {
        ctx.fillText(item[0], item[1], item[2]);
    })
}

faceFile.onchange = evt => {
    const [file] = faceFile.files
    if (file) {
        faceImg.src = URL.createObjectURL(file)
    }
}