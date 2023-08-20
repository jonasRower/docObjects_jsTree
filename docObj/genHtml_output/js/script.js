
class zobrazJenDanouTabulku{

    constructor(idTabulky){

        var allId = this.vratVsechnyId()

        // pokud se jedna o uvodni stranku, tj. hned po startu aplikace
        // pak se vsechny tabulky skryji a zobrazi se uvodni text
        if(idTabulky == false){
            this.skryjVsechnyTabulky(allId);
        }

        else{

            $('#intro').hide();
            var polozkaExistuje = this.detekujZdaPolozkaJeVPoli(idTabulky, allId);

            //zobrazuje jen tabulku, pokud nalezne id, jinak by vsechno skryl a nic nezobrazil
            if(polozkaExistuje ==  true){
                this.skryjVsechnyTabulky(allId);
                this.zobrazTabulkuDleId(idTabulky);
            }

        }

    }

    
    zobrazTabulkuDleId(idZobraz){

        idZobraz = '#' + idZobraz
        $(idZobraz).show();

    }
    

    skryjVsechnyTabulky(allId){

        for (let i = 0; i < allId.length; i++) {
            var id = '#' + allId[i]
            $(id).hide();
        }

    }


    vratVsechnyId(){

        var allId = []
        
        $('table').each(function () {
            var id = $(this).attr('id');
            allId.push(id)
        });

        return(allId)

    }


    detekujZdaPolozkaJeVPoli(polozka, pole){

        var ind = pole.indexOf(polozka);
        if (ind > -1){
            var polozkaExistuje = true;
        }
        else{
            var polozkaExistuje = false;
        }

        return(polozkaExistuje)

    }


}



class zobrazujTabulky{


    constructor(){
        this.sledujKliknutiDoStromu()
    }

    sledujKliknutiDoStromu(){

        //po kliknuti na uzel zobrazi jen danou tabulku s daty
        var zobrazId = $('#jsTree').on("select_node.jstree", function (e, data) 
        { 
            zobrazId = 'tab_' + data.node.id;   
            var zobrazJenTab = new zobrazJenDanouTabulku(zobrazId)
        });

    }

}


$(document).ready(function(){
    var treeEvent = new zobrazujTabulky();

    //zobrazi uvodni stranju a vsechny tabulky skryje
    var zobrazUvodniStranku = new zobrazJenDanouTabulku(false)
});