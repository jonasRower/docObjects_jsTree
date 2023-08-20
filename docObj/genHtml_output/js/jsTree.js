
class vykresliJsTree{

    constructor(objTxt){

        //ziska data pro strom
        var jsondata = JSON.parse(objTxt);

        //vykresli strom
        this.createJSTree(jsondata);

    }

    createJSTree(jsondata) { 
        $('#jsTree').jstree({
            'core': {
                'data': jsondata
            }
        });
    }

}


$(document).ready(function(){

    //nacte data
    var objTxt = eval('jsondata');
    var tiskniJsTree = new vykresliJsTree(objTxt);

});

