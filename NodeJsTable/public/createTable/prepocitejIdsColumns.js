//vrati do webove sluzby, id toho sloupce, kde je treba zobrazit sipku doprava, ci doleva

class vyhledejNejblizsiId{

    constructor(objVar, idOrig, smer){

        this.indNew = this.vyhledejNejblizsiIndex(objVar, idOrig, smer);
        
    }


    getIndNew(){
        return(this.indNew);
    }


    vyhledejNejblizsiIndex(objVar, idOrig, smer){

        var prvniIndexy = this.vratPrvniIndexyColumns(objVar);
        var indNew = -1;

        if(smer == 1){
            indNew = this.vyhledejPrvniNejblizVyssiIndex(prvniIndexy, idOrig);
        }

        if(smer == -1){
            indNew = this.vyhledejPrvniNejblizNizzsiIndex(prvniIndexy, idOrig);
        }

        return(indNew);

    }


    vyhledejPrvniNejblizNizzsiIndex(prvniIndexy, indExp){

        var indNew = prvniIndexy[0]

        for (let i = prvniIndexy.length-1; i > -1; i--) {
            var ind = prvniIndexy[i];
            if(ind < indExp){
                indNew = ind;
                break;
            }
        }

        return(indNew);

    }


    vyhledejPrvniNejblizVyssiIndex(prvniIndexy, indExp){

        var indNew = prvniIndexy[prvniIndexy.length-1]

        for (let i = 0; i < prvniIndexy.length; i++) {
            var ind = prvniIndexy[i];
            if(ind > indExp){
                indNew = ind;
                break;
            }
        }

        return(indNew);

    }


    vratPrvniIndexyColumns(objVar){

        var prvniIndexy = [];

        for (let i = 0; i < objVar.length; i++) {
            var radek = objVar[i];
            var columns = radek.columns;
            var prvniIndex = columns[0];

            prvniIndexy.push(prvniIndex);
        }

        return(prvniIndexy);

    }


}



//zde zacina modul
export const dopocitejIdsSloupce = ((objVar, idOrig, smer) => {

    var vratSousedniId = new vyhledejNejblizsiId(objVar, idOrig, smer);
    var indNew = vratSousedniId.getIndNew();
        
    return(indNew);

});