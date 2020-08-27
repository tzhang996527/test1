const Watcher = require('./lib/Watcher_v1');
const fs = require('fs');

const watchDir = './node_test/watch';
const processedDir = './node_test/done';

const watcher = new Watcher(watchDir, processedDir);

watcher.on('process', (file) => {
    const watchFile = `${watchDir}/${file}`;
    const processedFile = `${processedDir}/${file.toLowerCase()}`;

    fs.rename(watchFile, processedFile, err => {
        if(err) throw err;
    });
});

watcher.start();