
class vytvorTabulku{

    constructor(obj, objVar){

        //var tabAppendStr = this.vytvorAppendStr();
        var tabAppendStr = this.vytvorTabulkuZJson(obj, objVar);

        $('#table').append(tabAppendStr);
        
    }


    vytvorTabulkuZJson(obj, objVar){

        var appendStrHeader = this.vratAppendStrHlavicky(obj, objVar);
        var appendStrTable = this.vratAppendStrProTabulku(obj);

        var appendStr = '<table>\n';
        appendStr = appendStr + appendStrHeader;
        appendStr = appendStr + appendStrTable;
        appendStr = appendStr + '</table>\n';

        //console.log(appendStr);
        return(appendStr);

    }


    vratAppendStrHlavicky(obj, objVar){

        //console.log(obj);
        //console.log(objVar);

        var prvniRadek = obj[0].data;
        var pocetSloupcu = prvniRadek.length;

        var poleRadkuHlavicky = this.vratPoleRadkuHlavicky(objVar);

        //prevede pole na string
        var appendStrHeader = '<tr>\n';

        for (let i = 0; i < poleRadkuHlavicky.length; i++) {
            var bunka = poleRadkuHlavicky[i];
            appendStrHeader = appendStrHeader + bunka;
        }

        appendStrHeader = appendStrHeader + '</tr>\n'

        return(appendStrHeader);

    }


    vratPoleRadkuHlavicky(objVar){

        var poleRadkuHlavicky = [];
        var poleIdHlavicky = []

        var idExp = "col_3";
        var sloucenySloupec;    

        for (let i = 0; i < objVar.length; i++) {

            var objVarRadek = objVar[i];
            var dataSlouceneSloupce = this.vratSlouceneSloupce(objVarRadek);
            var idSloucenehoSloupce = dataSlouceneSloupce[1];
            var nazevSloupce = dataSlouceneSloupce[2];

            sloucenySloupec = dataSlouceneSloupce[0];

            //prepise novou subtabulkou
            if(idSloucenehoSloupce == idExp){
                sloucenySloupec = this.vlozSubTabulku(sloucenySloupec, nazevSloupce, idSloucenehoSloupce);
            
            }
           
            poleRadkuHlavicky.push(sloucenySloupec);

        }


        return(poleRadkuHlavicky)
        
    }


    vlozSubTabulku(sloucenySloupec, nazevSloupce, id){

        var subTabulka;
        var sloucenySloupecNew;

        var idDoleva = '"doleva_' + id + '"';
        var idDoprava = '"doprava_' + id + '"';
        
        subTabulka =    '<table>\n' +
                        '   <tr>\n' +
                        '       <th><button id=' + idDoleva + '>&lt;&lt;</button></th>\n' +
                        '       <th>' + nazevSloupce + '</th>\n' +
                        '       <th><button id=' + idDoprava + '>&gt;&gt;</button></th>\n' +
                        '   </tr>\n'+
                        '</table>';

                        
        sloucenySloupecNew = sloucenySloupec.replace(nazevSloupce, subTabulka)           

        return(sloucenySloupecNew);
      
    }


    vratSlouceneSloupce(objVarRadek){

        var nazevSloupce = objVarRadek.variable;
        var indexySloupcu = objVarRadek.columns;

        var pocetSloucenychSloupcu = indexySloupcu.length;
        var indexPrvnihoSloupce = indexySloupcu[0];

        var idSloupce = 'col_' + indexPrvnihoSloupce;

        var vratData = []
        vratData.push('<th id="' + idSloupce + '" colspan=' + pocetSloucenychSloupcu + '">' + nazevSloupce + '</th>');
        vratData.push(idSloupce);
        vratData.push(nazevSloupce);

        return(vratData);

    }


    vratAppendStrProTabulku(obj){

        var appendStr = "";

        for (let i = 0; i < obj.length; i++) {
            var objRadek = obj[i];
            var appendStrRadek = this.vytvorRadekTabulky(objRadek);

            appendStr = appendStr + appendStrRadek;
        }

        return(appendStr);


    }


    vytvorRadekTabulky(objRadek){

        var appendStrRadek;

        var idRow = objRadek.idRow;
        var dataNaRadku = objRadek.data;

        appendStrRadek = this.vratRadekAppendRadekTabulky(dataNaRadku);


        return(appendStrRadek)

    }


    vratRadekAppendRadekTabulky(dataNaRadku){

        var appendStrRadek = '   <tr>\n'

        for (let i = 0; i < dataNaRadku.length; i++) {
            var hodnota = dataNaRadku[i];
            var hodnotaAppendStr = '       <td>' + hodnota + '</td>\n';
            appendStrRadek = appendStrRadek + hodnotaAppendStr;
        }

        appendStrRadek = appendStrRadek + '   </tr>\n';

        return(appendStrRadek);

    }


    /*
    vytvorAppendStr(){

        var appendStr = '<table>' +
                        '   <tr>' +
                        '       <th>Company</th>' +
                        '       <th>Contact</th>' +
                        '       <th>Country</th>' +
                        '   </tr>' +
                        '   <tr>' +
                        '       <td>Alfreds Futterkiste</td>' +
                        '       <td>Maria Anders</td>' +
                        '       <td>Germany</td>' +
                        '   </tr>' +
                        '   <tr>' +
                        '       <td>Centro comercial Moctezuma</td>' +
                        '       <td>Francisco Chang</td>' +
                        '       <td>Mexico</td>' +
                        '   </tr>' +
                        '   <tr>' +
                        '       <td>Ernst Handel</td>' +
                        '       <td>Roland Mendel</td>' +
                        '       <td>Austria</td>' +
                        '   </tr>' +
                        '   <tr>' +
                        '       <td>Island Trading</td>' +
                        '       <td>Helen Bennett</td>' +
                        '       <td>UK</td>' +
                        '   </tr>' +
                        '   <tr>' +
                        '       <td>Laughing Bacchus Winecellars</td>' +
                        '       <td>Yoshi Tannamuri</td>' +
                        '       <td>Canada</td>' +
                        '   </tr>' +
                        '   <tr>' +
                        '       <td>Magazzini Alimentari Riuniti</td>' +
                        '       <td>Giovanni Rovelli</td>' +
                        '       <td>Italy</td>' +
                        '   </tr>' +
                        '</table>'

        return(appendStr);

    }
    */

}


class prohodSloupceTabulky{

    constructor(obj, objVar, id){

        var posunOdKamPocet = this.posunDopravaDoleva(id, objVar)

        var dataZObj = this.vratDataZObj(obj);
        var dataZObjNew = this.vratDataObjSPresunute(dataZObj, posunOdKamPocet);

        this.objNew = this.nahradDataVObjektu(obj, dataZObjNew);


    }


    getObjNew(){
        return(this.objNew);
    }


    ziskejOdKamPocet(){
        
    }


    posunDopravaDoleva(id, objVar){

        var nazevSloupce = this.vyhledejNazevSloupceDleId(id, objVar);
        var dopravaDoleva = this.vratDopravaDolevaDleId(id);

        var posunOdKamPocet;

        if(dopravaDoleva == true){
            posunOdKamPocet = this.posunDoprava(nazevSloupce, objVar);
        }
        else{
            posunOdKamPocet = this.posunDoleva(nazevSloupce, objVar);        
        }

        return(posunOdKamPocet);

    }



    //pokud je doprava, vraci true
    //pokud je doleva, vraci false
    vratDopravaDolevaDleId(id){

        var idSpl = id.split('_');
        var smer = idSpl[0];
        var vratSmer;

        if(smer == 'doprava'){
            vratSmer = true;
        }
        else{
            vratSmer = false;
        }
        
        return(vratSmer);

    }



    vyhledejNazevSloupceDleId(id, objVar){

        var idSpl = id.split('_');
        var idInd = idSpl[2];

        var nazevSloupce = "";

        for (let i = 0; i < objVar.length; i++) {
            var columns = objVar[i].columns;
            var prvniIndex = '' + columns[0];

            if(prvniIndex == idInd){
                nazevSloupce = objVar[i].variable;
                break;
            }

        }

        return(nazevSloupce)
        
    }



    posunDoprava(nazevProm, objVar){

        var result = objVar.find(({ variable }) => variable === nazevProm);
        var posunOd = result.columns[0];
        var pocet = result.columns.length;
        var poslInd = result.columns[result.columns.length-1];
        var posunKam = poslInd + 1;

        var posunOdKamPocet = [];

        posunOdKamPocet.push(posunOd);
        posunOdKamPocet.push(posunKam);
        posunOdKamPocet.push(pocet);

        return(posunOdKamPocet);

    }


    posunDoleva(nazevProm, objVar){

        var result = objVar.find(({ variable }) => variable === nazevProm);
        var posunOd = result.columns[0];
        var pocet = result.columns.length;
        var posunKam = posunOd - pocet;

        var posunOdKamPocet = [];

        posunOdKamPocet.push(posunOd);
        posunOdKamPocet.push(posunKam);
        posunOdKamPocet.push(pocet);

        return(posunOdKamPocet);

    }


    nahradDataVObjektu(objOrig, dataZObjNew){

        for (let i = 0; i < objOrig.length; i++) {

            var radekData = dataZObjNew[i];

            //opravi data
            objOrig[i].data = radekData;
       
        }

        return(objOrig);

    }


    arraymove(arr, fromIndex, toIndex) {

        var element = arr[fromIndex];
        arr.splice(fromIndex, 1);
        arr.splice(toIndex, 0, element);

        return(arr);
    }


    vratDeepCopy(pole){

        var poleNew = JSON.parse(JSON.stringify(pole));
        return(poleNew);

    }


    //data v poli jsou nyni 2x, i na nove pozici
    vratDataObjSPresunute(dataZObj, posunOdKamPocet){

        var dataZObjNew = [];

        var od = posunOdKamPocet[0];
        var kam = posunOdKamPocet[1];
        var pocet = posunOdKamPocet[2];

        var poleOdKam = this.ziskejIndexyOdkudKam(od, kam, pocet);

        var indPresunoutCo = poleOdKam[0];
        var indPresunKam = poleOdKam[1];

        for (let i = 0; i < dataZObj.length; i++) {

            var radek = dataZObj[i];
            var radekNew = this.presunVsechnnyPolozkyVPoli(radek, indPresunoutCo, indPresunKam);

            dataZObjNew.push(radekNew);
           
        }

        return(dataZObjNew);

    }


    presunVsechnnyPolozkyVPoli(radek, indPresunoutCo, indPresunKam){

        for (let i = 0; i < indPresunoutCo.length; i++) {
            var presunCo = indPresunoutCo[i];
            var presunKam = indPresunKam[i];

            radek = this.arraymove(radek,presunCo,presunKam);

        }

        return(radek);

    }



    ziskejIndexyOdkudKam(od, kam, pocet){

        var poleOd = [];
        var poleKam = [];

        var od1 = od - 1;
        var kam1 = kam - 1;

        for (let i = 0; i < pocet; i++) {
            od1 = od1 + 1;
            kam1 = kam1 + 1

            poleOd.push(od1);
            poleKam.push(kam1);

        }

        var poleOdKam = []
        poleOdKam.push(poleOd);
        poleOdKam.push(poleKam);

        //prohodi a nebo neprohodi indexaci
        poleOdKam = this.prohodPoradiIndexu(poleOdKam);


        return(poleOdKam);

    }


    prohodPoradiIndexu(poleOdKam){

        var poleOd = poleOdKam[0];
        var poleKam = poleOdKam[1];

        var od0 = poleOd[0];
        var kam0 = poleKam[1];

        //pokud je od < kam, pak je potreba prohodit smer indexu, aby nebyla indexace spatna
        var poleReversed = [];

        if(od0 < kam0){
            var poleOdReversed = poleOd.reverse();
            var poleKamReversed = poleKam.reverse();

            poleReversed.push(poleOdReversed);
            poleReversed.push(poleKamReversed);
        }
        else{
            poleReversed = poleOdKam;
        }


        //console.log(poleReversed);

        return(poleReversed);

    }



    vratDataZObj(obj){

        var dataZObj = [];

        for (let i = 0; i < obj.length; i++) {

            var dataRadek =  obj[i].data;
            dataZObj.push(dataRadek);
        }

        return(dataZObj);

    }



    ziskejSubPoleDleIndexu(radekPole, subindexy){

        var subPole = [];

        for (let i = 0; i < subindexy.length; i++) {
            var ind = subindexy[i];
            var polozka = radekPole[ind];
            subPole.push(polozka);
        }

        return(subPole)

    }

    
    //aby se nemuseli prepocitavat indexy, neodmazava data z pole, ale vyplni je hodnotou prazdnou
    vartPoleSPrazdnouHodnotou(pole, index){

        pole[index] = "";
        return(pole)
    }

}


class vratDataJson{

    constructor(){

            var jsondata =  '[' +
                            '  { "row": -1, "data":["testA", "#A", "projectA", "1projectA", "2projectA", "1", "2", "3", "4", "5", "6"] },' +
                            '  { "row": 0, "data":["testB", "#B", "projectB", "1projectA", "2projectA", "1", "2", "3", "4", "5", "6"] },' +
                            '  { "row": 1, "data":["testC", "#C", "projectC", "1projectA", "2projectA", "1", "2", "3", "4", "5", "6"] },' +
                            '  { "row": 2, "data":["testD", "#D", "projectD", "1projectA", "2projectA", "1", "2", "3", "4", "5", "6"] },' +
                            '  { "row": 3, "data":["testE", "#E", "projectE", "1projectA", "2projectA", "1", "2", "3", "4", "5", "6"] },' +
                            '  { "row": 4, "data":["testF", "#F", "projectF", "1projectA", "2projectA", "1", "2", "3", "4", "5", "6"] },' +
                            '  { "row": 5, "data":["testG", "#G", "projectG", "1projectA", "2projectA", "1", "2", "3", "4", "5", "6"] },' +
                            '  { "row": 6, "data":["testH", "#H", "projectH", "1projectA", "2projectA", "1", "2", "3", "4", "5", "6"] },' +
                            '  { "row": 7, "data":["testI", "#I", "projectI", "1projectA", "2projectA", "1", "2", "3", "4", "5", "6"] }' +
                            ']';


            var promenneAIndexy =   '[' +
                                    '  { "variable": "xx", "columns": [0, 1, 2] },' +
                                    '  { "variable": "yy", "columns": [3, 4] },' +
                                    '  { "variable": "zz", "columns": [5, 6] },' +
                                    '  { "variable": "oo", "columns": [7, 8, 9] },' +
                                    '  { "variable": "pp", "columns": [10] }' +
                                    ']';


            var objTxt = eval('jsondata');
            this.obj = JSON.parse(objTxt);
    
            var objTxtVar = eval('promenneAIndexy');
            this.objVar = JSON.parse(objTxtVar);

    }


    getJsonData(){
        return(this.obj);
    }

    getObjVar(){
        return(this.objVar);
    }

}




$(document).ready(function(){

    //ziska data
    var dataJsonu = new vratDataJson();                          
    var obj = dataJsonu.getJsonData();
    var objVar = dataJsonu.getObjVar();

    console.log(obj);

    //vykresli tabulku
    var zobrazUvodniStranku = new vytvorTabulku(obj, objVar)

    $("button").on( "click", function() {

        var id = $(this).attr("id");
        var objNewData = new prohodSloupceTabulky(obj, objVar, id);
        obj = objNewData.getObjNew();

        console.log(obj);

    });
    
});

