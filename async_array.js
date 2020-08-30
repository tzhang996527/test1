
const fs = require('fs');
const requst = require('request');
const htmlparser = require('htmlparser');
const { request } = require('http');

const configFileName = './listing_217/rss_feeds.txt';

function checkForRSSFile(){
    fs.exists(configFileName, (exists) => {
        if (!exists) {
            return next(new Error(`Missing RSS File: ${configFileName}`));
        next(null, configFileName);
        }
    });
}

function readRSSFile(configFileName){
    fs.readFile(configFileName, (err, feedList) => {
        if (err) next(err);
        feedList = feedList.toString().replace(/^\s+|\s+$/g,'').split('\n');
        const random = Math.floor(Math.random() * feedList.length);
        next(null, feedList(random));
    });
}

function downloadRSSFeed(feedUrl){
    request({ uri: feedUrl }, (err, res, body) => {
        if(err) return next(err);
        if(res.statusCode !== 200){
            return next(new(Error('Abnormal response status code')));
        }
        next(null, body);
    });
}

function parseRSSFeed(rss){
    const handler = new htmlparser.RssHandler();
    const parser = new htmlparser.Parser(handler);
    parser.parseComplete(rss);
    if(!handler.dom.items.length){
        return next(new Error('No RSS items found'));
    }
    const item = handler.dom.items.shift();
    console.log(item.title);
    console.log(item.link);
}

const tasks = [
    checkForRSSFile,
    readRSSFile,
    downloadRSSFeed,
    parseRSSFeed
];

function next(err, result){
    if(err) throw err;
    const currentTask = tasks.shift();
    if(currentTask){
        currentTask(result);
    }
}

next();

