const http = require('http');
const fs = require('fs');

http.createServer((req,res) => {
    getTitles(res);
}).listen(8000,'127.0.0.1');

function getTitles(res){
    fs.readFile('./node_test/titles.json',(err,data) =>{
        if(err) return hasError(err,res);
        getTemplate(JSON.parse(data.toString()), res);
    });
}

function getTemplate(titles, res){
    fs.readFile('./node_test/template.html',(err,data) => {
        if(err) return hasError(err,res);
        formatHtml(titles,data.toString(),res);
    });
}

function formatHtml(titles, tmpl, res){
    const html = tmpl.replace('%',titles.join('</li><li>'));
    res.writeHead(200,{'Content-Type': 'text/html'});
    res.end(html);
}

function hasError(err,res){
    console.error(err);
    res.end('Server Error');
}