var i = 0;  // dots counter
var waitTime = setInterval(function() {
    process.stdout.clearLine();  // clear current text
    process.stdout.cursorTo(0);  // move cursor to beginning of line
    i = (i + 1) % 4;
    var dots = new Array(i + 1).join(".");
    process.stdout.write("Waiting" + dots);  // write text
}, 100);
setTimeout(function() {
    clearInterval(waitTime);
    process.stdout.write('\u001B[2J\u001B[0;0f');
    console.log('Done!');
    console.log('');
},2000);
