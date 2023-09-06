

class vytvorIdSloupcuu{

    constructor(){
        this.jsondata = this.vytvorJsonIdSloupcu();
    }


    getJsondata(){
        return(this.jsondata);
    }


    vytvorJsonIdSloupcu(){

        var promenneAIndexy =  '[' +
        '  { "variable": "xx", "columns": [0, 1, 2] },' +
        '  { "variable": "yy", "columns": [3, 4] },' +
        '  { "variable": "zz", "columns": [5, 6] },' +
        '  { "variable": "oo", "columns": [7, 8, 9] },' +
        '  { "variable": "pp", "columns": [10] }' +
        ']';

        var objTxtVar = eval('promenneAIndexy');
        var bjVar = JSON.parse(objTxtVar);

        return (bjVar);

    }

}



//zde zacina modul
export const idSloupcu = (() => {

    var idSloupcuCl = new vytvorIdSloupcuu();
    var jsondata = idSloupcuCl.getJsondata();

    return(jsondata);

});