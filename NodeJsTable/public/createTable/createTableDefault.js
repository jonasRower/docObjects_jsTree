
class vytvorDefaultniTabulku{

    constructor(){
        this.jsondata = this.vytvorDefaulniTabulku();
    }



    getJsondata(){
        return(this.jsondata);
    }


    vytvorDefaulniTabulku(){

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
 

        var objTxt = eval('jsondata');
        var obj = JSON.parse(objTxt);


        return (obj);

    }

}



//zde zacina modul
export const jsonTabulka = (() => {

    var tabDefault = new vytvorDefaultniTabulku();
    var jsondata = tabDefault.getJsondata();

    return(jsondata);

});