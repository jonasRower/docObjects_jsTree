
const express = require('express');
const path = require('path');
const socketIO = require('socket.io');

const http = require('http');


// initialization
const app = express();
const server = http.createServer(app);
const io = socketIO(server);


const bodyParser = require('body-parser');

app.set('view engine', 'ejs');
var urlencodedParser = bodyParser.urlencoded({ extended: false });

// settings
app.set('port', process.env.PORT || 3000);



//---------------- zde se nacita json, pro zobrazeni tabulky -----------------------------------
import { jsonTabulka } from './public/createTable/createTableDefault.js';

//---------------- zde se nacita json, pro ziskani id sloupcu ----------------------------------
import { idSloupcu } from './public/createTable/idSloupcu.js';

//---- prohazuje sloupce tabulky na zaklade stisknuti tlacitka doprava/doleva ------------------
import { prohozSloupce } from './public/createTable/prohodSloupceTab.js';

//---- prepocita nove id sloupce, v tom sloupci, ve kterem se bude prekreslovat subtabulka -----
import { dopocitejIdsSloupce } from './public/createTable/prepocitejIdsColumns.js';




//nejake promenne, ktere se ukladaji na globalni urovni
let reqSubmit = ""

//uchovava JSON obsahujici data meritek
let meritkaJson;




//nastavi data

//vychozi data tabulky
let dataTabulky;

//json udavajici indexy sloupcu
let idSloupcuJson;

//id pro sloupce, kde je subtabulka
let aktualniIdSloupce = 0;




dataTabulky = jsonTabulka();
idSloupcuJson = idSloupcu();





// static files
app.use(express.static(path.join(__dirname, 'views')));

//hlavni okno
app.get('/', function(req, res){
    res.render('profile');
});



//umisti json tabulky na webovou sluzbu
app.use('/table/data', function(req, res, next){

    //zapise data na webovou sluzbu
    res.send(dataTabulky);
    next();

});


//umisti json tabulky na webovou sluzbu
app.get('/table/data', function(req, res, err){

    if (err){
        //nechci vypisovat nic
    }
    else {
        //zapise data na webovou sluzbu
        res.send(dataTabulky);
    }

}); 


//umisti json s id sloupcu tabulky na webovou sluzbu
app.use('/table/idsColumns', function(req, res, next){

    
    var idColSubtable = "col_" + aktualniIdSloupce;
    var idColSubtableJson = [{colId: idColSubtable}];

    //zapise data na webovou sluzbu
    res.send(idColSubtableJson);
    next();

});


//umisti json s id sloupcu tabulky na webovou sluzbu
app.get('/table/idsColumns', function(req, res, err){

    if (err){
        //nechci vypisovat nic
    }
    else {
        //zapise data na webovou sluzbu
        var idColSubtable = "col_" + aktualniIdSloupce;
        var idColSubtableJson = [{colId: idColSubtable}];
        res.send(idColSubtableJson);
    }

}); 


//umisti json s id sloupcu tabulky na webovou sluzbu
app.use('/table/idColSubtable', function(req, res, next){

    console.log(idSloupcuJson)

    //zapise data na webovou sluzbu
    res.send(idSloupcuJson);
    next();

});


//umisti json s id sloupcu tabulky na webovou sluzbu
app.get('/table/idColSubtable', function(req, res, err){

    if (err){
        //nechci vypisovat nic
    }
    else {
        //zapise data na webovou sluzbu
        res.send(idSloupcuJson);
    }

}); 




//---------------------------------------
  

//umisti meritka na webovou sluzbu
app.use('/settings/scales', function(req, res, next){

    //zapise data na webovou sluzbu
    res.send(meritkaJson);
    next();

});


//umisti meritka na webovou sluzbu
app.get('/settings/scales', function(req, res, err){

    if (err){
        //nechci vypisovat nic
    }
    else {
        //zapise data na webovou sluzbu
        res.send(meritkaJson);
    }

}); 


//tlacitko doprava
app.post('/buttRight', urlencodedParser, function(req, res){
    
    var dopravaCol = "doprava_col_" + aktualniIdSloupce;
    dataTabulky = prohozSloupce(dataTabulky, idSloupcuJson, dopravaCol);
    aktualniIdSloupce = dopocitejIdsSloupce(idSloupcuJson, aktualniIdSloupce, 1);

    //po submitu se presmeruje na 'http://localhost:3000/'
    //ceka 2 sekund
    setTimeout(() => {res.redirect('http://localhost:3000/')}, 600);
})


//tlacitko doleva
app.post('/buttLeft', urlencodedParser, function(req, res){
    
    reqSubmit = req.body;
    console.log(reqSubmit);
    //aktualizuje statusy u meritek

    //po submitu se presmeruje na 'http://localhost:3000/'
    //ceka 5 sekund
    setTimeout(() => {res.redirect('http://localhost:3000/')}, 600);
})




//treba se bude hodit

//app.listen(port, () => {
server.listen(app.get('port'), () => {

    console.log('Server on port 3000');
    
  })
 





