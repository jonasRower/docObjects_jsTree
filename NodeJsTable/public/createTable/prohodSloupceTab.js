


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
        var idInd = idSpl[idSpl.length-1];

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

        console.log(nazevProm);

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

        console.log('HHHHHHHHHHHHHHHHHHHHHH');
        console.log(nazevProm);
        console.log(objVar);
        
        var result = objVar.find(({ variable }) => variable === nazevProm);

        console.log(result);
        console.log('HHHHHHHHHHHHHHHHHHHHHH');

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




//zde zacina modul
export const prohozSloupce = ((obj, objVar, id) => {

    var tabProhozSloupce = new prohodSloupceTabulky(obj, objVar, id);
    var objNew = tabProhozSloupce.getObjNew();
        
    return(objNew);

});