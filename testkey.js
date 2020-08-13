
var keypress = require('keypress');
let currentkey = ''
// make `process.stdin` begin emitting "keypress" events
keypress(process.stdin);

// listen for the "keypress" event
process.stdin.on('keypress', function (ch, key) {
    if (key && key.ctrl && key.name == 'c') {
        process.stdin.pause();
        process.exit();
    }else{
        currentkey=key.name;
        console.log('Key pressed: '+currentkey)
    }
});

process.stdin.setRawMode(true);
process.stdin.resume();

