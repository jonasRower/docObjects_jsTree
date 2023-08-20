import numpy as np
import copy

class stromAdres:

    def __init__(self, data):

        self.data = data
        self.indexace = []
        self.poleCeleIndexace = []
        self.vratDelkuPoleNaKazdeDimenzi(data)

        rozdelenaIndexace = indexaceTabulek(self.poleCeleIndexace, 2, data)
        self.adresaAPoleTabAll = rozdelenaIndexace.getAdresaAPoleTabAll()
        adresArr = rozdelenaIndexace.getAdresyNew()

        #indexaceTabulek(self.poleCeleIndexace)
        ziskejIdAParents = idAParents(adresArr)
        self.poleIdParentsAll = ziskejIdAParents.getPoleIdParentsAll()




    def getAdresaAPoleTabAll(self):
        return(self.adresaAPoleTabAll)


    def getPoleIdParentsAll(self):
        return(self.poleIdParentsAll)



    def vratDelkuPoleNaKazdeDimenzi(self, pole):

        arr = np.array(pole)
        pocetCyklu = np.size(pole)
        pocetDimenzi = arr.ndim


        for i in range(0, pocetDimenzi):
            self.indexace.append(0)


        # prochazi n-dim polem
        # pocet vcyklu je naddimenzovano, pokud "cyklyNavic == 0", pak ukonci smycku
        for i in range(0, pocetCyklu):

            pocetCyklu = self.upravujIndexaciSCyklyNavic(pocetCyklu, pole)

            # postupne vraci zbyvajici pocet cyklu, pokud dosahne 0, pak ukonci smycku
            if(pocetCyklu == 0):
                break



    def upravujIndexaciSCyklyNavic(self, pocetCyklu, pole):

        cyklyNavicTot = 0

        # prochazi n-dim polem
        for i in range(0, pocetCyklu):

            # upravi indexaci
            cyklyNavic = self.prepisIndexaci(pole)
            cyklyNavicTot = cyklyNavicTot + cyklyNavic

        return(cyklyNavicTot)



    def prepisIndexaci(self, pole):

        subPole = pole

        for i in range(0, len(self.indexace)):
            index = self.indexace[i]
            subPole = self.vratSubPole(subPole, index)

        delkaPoliDleIndexace = self.vratDelkyPoliDleIndexace(pole)
        posunoutNaIndexu = self.detekujKteryIndexOpravit(delkaPoliDleIndexace)

        if(subPole != False):
            ind = copy.deepcopy(self.indexace)
            self.poleCeleIndexace.append(ind)
            cyklyNavic = 0
        else:
            #pricte chybejici cyklus
            cyklyNavic = 1

        self.opravIndexaci(posunoutNaIndexu)


        return(cyklyNavic)



    def detekujKteryIndexOpravit(self, delkaPoliDleIndexace):

        posunoutNaIndexu = -1

        for i in range(0, len(delkaPoliDleIndexace)):
            delkaPoleDimenze = delkaPoliDleIndexace[i]
            aktualniIndex = self.indexace[i]

            if(delkaPoleDimenze == aktualniIndex):
                posunoutNaIndexu = i-1
                break

        return(posunoutNaIndexu)



    def vratDelkyPoliDleIndexace(self, subPole):

        delkaPoliDleIndexace = []
        delkaSubPole = len(subPole)
        delkaPoliDleIndexace.append(delkaSubPole)

        for i in range(0, len(self.indexace)-1):
            index = self.indexace[i]
            subPole = self.vratSubPole(subPole, index)

            if(subPole != False):
                delkaSubPole = len(subPole)
            else:
                delkaSubPole = False

            delkaPoliDleIndexace.append(delkaSubPole)


        return(delkaPoliDleIndexace)



    def vratDelkuPredposlednihoPole(self, subPole):

        nestedSubPole = self.vratSubPole(subPole)

        if(nestedSubPole == False):
            delkaPoslPole = len(subPole)
        else:
            delkaPoslPole = -1

        return(delkaPoslPole)


    def opravIndexaci(self, opravIndexaci):

        if(opravIndexaci == -1):
            index = self.indexace[len(self.indexace)-1]
            indexNew = index + 1

            self.indexace[len(self.indexace)-1] = indexNew

        else:

            index = self.indexace[opravIndexaci]
            indexNew = index + 1

            self.indexace[opravIndexaci] = indexNew
            self.indexace[opravIndexaci+1] = 0


    def vratSubPole(self, subPole, index):

        try:
            subPoleNew = subPole[index]
        except:
            # pokud jiz index je mimo rozsah pole, pak vrati False
            subPoleNew = False

        return(subPoleNew)


    def vratDelkySubPoli(self, pole):

        delkySubPoli = []
        delkaPole = len(pole)

        for i in range(0, delkaPole):
            subPole = pole[i]
            delkaPole = len(subPole)

            delkySubPoli.append(delkaPole)

        return(delkySubPoli)



class idAParents:

    def __init__(self, adresArr):

        strAdrrParAll = self.vratVsechnyUrovneParentsChildren(adresArr)
        self.poleIdParentsAll = self.vratPoleVsechIDParents(strAdrrParAll)


    def getPoleIdParentsAll(self):
        return(self.poleIdParentsAll)


    def vratPoleVsechIDParents(self, strAdrrParAll):

        poleIdAll = []
        poleParentsAll = []

        poleIdParentsAll = []

        for i in range(len(strAdrrParAll)-1, -1, -1):
            poleId = strAdrrParAll[i][0]
            poleParents = strAdrrParAll[i][1]

            poleIdAll = poleIdAll + poleId
            poleParentsAll = poleParentsAll + poleParents


        poleIdParentsAll.append(poleIdAll)
        poleIdParentsAll.append(poleParentsAll)

        return(poleIdParentsAll)


    def vratVsechnyUrovneParentsChildren(self, adresArr):

        pocetUrovni = len(adresArr[0])
        strAdrArr = self.prevedAdresyNaStrAdrArr(adresArr)

        strAdrrParAll = []

        for i in range(1, pocetUrovni+1):
            strAdrrPar = []
            rodiceArr = self.vratPoleRodicu(strAdrArr)

            strAdrrPar.append(strAdrArr)
            strAdrrPar.append(rodiceArr)

            strAdrrParAll.append(strAdrrPar)
            strAdrArr = self.unique(rodiceArr)


        return(strAdrrParAll)



    def vratPoleRodicu(self, strAdrArr):

        rodiceArr = []

        for i in range(0, len(strAdrArr)):
            adrsStr = strAdrArr[i]
            rodic = self.ziskejRodice(adrsStr)
            rodiceArr.append(rodic)

        return(rodiceArr)



    def ziskejRodice(self, adrsStr):

        adrsStrSpl = adrsStr.split('-')

        if(len(adrsStrSpl) == 1):
            rodic = 'project'
        else:
            rodic = adrsStrSpl[0]

        for i in range(1, len(adrsStrSpl)-1):
            item = adrsStrSpl[i]
            rodic = rodic + '-' + item

        return(rodic)


    def prevedAdresyNaStrAdrArr(self, adresArr):

        strAdrArr = []

        for i in range(0, len(adresArr)):
            radekArr = adresArr[i]
            adrsStr = self.vratAdrStr(radekArr)

            strAdrArr.append(adrsStr)

        return(strAdrArr)



    def vratAdrStr(self, radekArr):

        adrsStr = str(radekArr[0])

        for i in range(1, len(radekArr)):
            item = str(radekArr[i])
            adrsStr = adrsStr + '-' + item

        return(adrsStr)



    def unique(self, dataLog):

        # initialize a null list
        unique_list = []

        # traverse for all elements
        for x in dataLog:
            # check if exists in unique_list or not
            if x not in unique_list:
                unique_list.append(x)

        return(unique_list)


class indexaceTabulek:

    def __init__(self, poleCeleIndexace, pocetInd, data):

        self.indexaceAdresyAll = []
        self.indexacePoleAll = []

        self.adresyNew = []

        # naplni pole "self.indexaceAdresyAll = []" a "self.indexacePoleAll = []"
        self.rozdelIndexaci(poleCeleIndexace, pocetInd)
        self.adresaAPoleTabAll = self.ziskejAdresaAPoleTabAll(self.indexaceAdresyAll, self.indexacePoleAll, data)

        print()



    def getAdresaAPoleTabAll(self):
        return(self.adresaAPoleTabAll)


    def getAdresyNew(self):
        return (self.adresyNew)




    def vratPole1DAdres(self, adresaAPoleTabAll, indN):

        adresa1D = []

        for i in range(0, len(adresaAPoleTabAll)):
            adresa = adresaAPoleTabAll[i][0]
            polozka = adresa[indN]
            adresa1D.append(polozka)

        return(adresa1D)


    def ziskejAdresaAPoleTabAll(self, indexaceAdresyAll, indexacePoleAll, data):

        indexaceAdresyAllUniq = self.unique(indexaceAdresyAll)
        adresaAPoleTabAll = []

        for i in range(0, len(indexaceAdresyAllUniq)):
            adresa = indexaceAdresyAllUniq[i]
            seznamVsechIndexuRadku = self.vratSeznamVsechIndexuRadkuObsahujiciData(adresa, indexaceAdresyAll)
            odDoArr = self.ziskejOdDo(seznamVsechIndexuRadku)

            indexacePoleTab = self.vratPoleTabulky(indexacePoleAll, odDoArr)
            polePolozek = self.ziskejpolePolozekZDat(adresa, indexacePoleTab, data)

            adresaAPoleTab = []
            adresaAPoleTab.append(adresa)
            adresaAPoleTab.append(indexacePoleTab)
            adresaAPoleTab.append(polePolozek)

            adresaAPoleTabAll.append(adresaAPoleTab)

            # prida do pole, tak aby nemusel opet data rozkladat
            self.adresyNew.append(adresa)

        return(adresaAPoleTabAll)


    # dle "adresa" a "adresaAPoleTab" ziska hodnotu z pole
    def ziskejpolePolozekZDat(self, adresa, indexacePoleTab, data):

        dataZAdresy = self.ziskejDataZAdresy(adresa, data)
        polePolozek = self.ziskejDataDleIndexacePole(dataZAdresy, indexacePoleTab)

        return(polePolozek)


    def ziskejDataZAdresy(self, adresa, data):

        dataNew = data

        for i in range(0, len(adresa)):
            index = adresa[i]
            dataNew = dataNew[index]

        return(dataNew)


    def ziskejDataDleIndexacePole(self, dataZAdresy, indexacePoleTab):

        polePolozek = []

        for i in range(0, len(indexacePoleTab)):
            indexace = indexacePoleTab[i]
            indR = indexace[0]
            indS = indexace[1]

            polozka = dataZAdresy[indR][indS]
            polePolozek.append(polozka)

        return(polePolozek)



    def vratPoleTabulky(self, indexacePoleAll, odDoArr):

        indexacePoleTab = []

        od = odDoArr[0]
        do = odDoArr[1]

        for i in range(od, do):
            index = indexacePoleAll[i]
            indexacePoleTab.append(index)

        return(indexacePoleTab)




    def ziskejOdDo(self, seznamVsechIndexuRadku):

        prvniIndex = seznamVsechIndexuRadku[0]
        posledniIndex = seznamVsechIndexuRadku[len(seznamVsechIndexuRadku)-1]

        odDoArr = []
        odDoArr.append(prvniIndex)
        odDoArr.append(posledniIndex)

        return(odDoArr)


    def vratSeznamVsechIndexuRadkuObsahujiciData(self, adresaExp, indexaceAdresyAll):

        seznamVsechIndexuRadku = []

        for i in range(0, len(indexaceAdresyAll)):
            adresa = indexaceAdresyAll[i]
            if(adresa == adresaExp):
                seznamVsechIndexuRadku.append(i)

        return(seznamVsechIndexuRadku)



    # rozdeli indexaci na adresy a tabulky
    def rozdelIndexaci(self, poleCeleIndexace, pocetInd):

        for i in range(0, len(poleCeleIndexace)):
            indexace = poleCeleIndexace[i]
            self.rozdelIndexaciNaPoleAAdresu(indexace, pocetInd)

        print()


    def rozdelIndexaciNaPoleAAdresu(self, indexace, pocetInd):

        array1 = np.array(indexace)
        # splitting the array into two
        indexacesplit = np.array_split(array1, pocetInd)

        adresa = indexacesplit[0]
        pole = indexacesplit[1]

        # zapise do dat tridy
        self.indexaceAdresyAll.append(adresa.tolist())
        self.indexacePoleAll.append(pole.tolist())


    def unique(self, dataLog):

        # initialize a null list
        unique_list = []

        # traverse for all elements
        for x in dataLog:
            # check if exists in unique_list or not
            if x not in unique_list:
                unique_list.append(x)

        return(unique_list)








