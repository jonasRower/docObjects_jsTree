import vytvorStromAdres
import generujJsTreeHtml

class generujHtml:

    def __init__(self):

        #testData = self.vytvorTestData()
        #testData = self.vytvorTestData3D()
        testData = self.vytvorTestData5D()

        dataStromuTab = vytvorStromAdres.stromAdres(testData)
        poleIdParentsAll = dataStromuTab.getPoleIdParentsAll()
        adresaAPoleTabAll = dataStromuTab.getAdresaAPoleTabAll()

        # tiskne jstree
        generujJsTreeHtml.generujHtmlJsTree(poleIdParentsAll)

        self.htmlRadkyAll = self.vytvorRadkyVsechTabulek(adresaAPoleTabAll)



    def getHtmlRadkyAll(self):
        return(self.htmlRadkyAll)


    def vytvorRadkyVsechTabulek(self, adresaAPoleTabAll):

        htmlRadkyTabulkyAll = []

        for i in range(0, len(adresaAPoleTabAll)):
            idTabulkyList = adresaAPoleTabAll[i][0]
            idTabulky = self.prevedListNaId(idTabulkyList)
            indexyRadkuTabulky = adresaAPoleTabAll[i][1]
            dataTabulky = adresaAPoleTabAll[i][2]
            htmlRadkyTabulky = self.vytvorVsechnyRadkyJedneTabulky(indexyRadkuTabulky, dataTabulky, idTabulky)

            htmlRadkyTabulkyAll = htmlRadkyTabulkyAll + htmlRadkyTabulky

        return(htmlRadkyTabulkyAll)



    def vytvorVsechnyRadkyJedneTabulky(self, indexyRadkuTabulky, dataTabulky, idTabulky):

        htmlRadkyTabulky = []
        htmlRadkyTabulky.append('\t<table id="tab_' + idTabulky + '">')

        pocetRadkuTabulky = self.vratMaximalniPolozku(indexyRadkuTabulky, 0)
        pocetSloupcuTabulky = self.vratMaximalniPolozku(indexyRadkuTabulky, 1)

        for r in range(0, pocetRadkuTabulky+1):
            htmlRadkyTabulky.append('\t\t<tr>')

            for s in range(0, pocetSloupcuTabulky+1):
                RSDdvojice = []
                RSDdvojice.append(r)
                RSDdvojice.append(s)

                ind = self.ziskejIndPole(indexyRadkuTabulky, RSDdvojice)
                print()

                hodnotaTabulky = dataTabulky[ind]
                htmlRadek = '\t\t\t<td>' + hodnotaTabulky + '</td>'
                htmlRadkyTabulky.append(htmlRadek)

            htmlRadkyTabulky.append('\t\t</tr>')

        return(htmlRadkyTabulky)


    def ziskejIndPole(self, pole, radekExp):

        ind = -1
        for i in range(0, len(pole)):
            radek = pole[i]
            if(radekExp == radek):
                ind = i
                break

        return(ind)



    def vratMaximalniPolozku(self, pole, indSloupec):

        maxPolozka = -1

        for i in range(0, len(pole)):
            polozka = pole[i][indSloupec]
            if(polozka > maxPolozka):
                maxPolozka = polozka

        return(maxPolozka)



    def vytvorRadekTabulky(self, testDataRadek):

        htmlRadky = []
        htmlRadky.append('\t\t<tr>')

        for i in range(0, len(testDataRadek)):
            polozka = str(testDataRadek[i])
            htmlRadek = '\t\t\t<td>' + polozka + '</td>'

            htmlRadky.append(htmlRadek)

        htmlRadky.append('\t\t</tr>')

        return(htmlRadky)


    #prevede pole [0,0,0] na 0-0-0
    def prevedListNaId(self, idArr):

        idStr = str(idArr[0])

        for i in range(1, len(idArr)):
            polozka = str(idArr[i])
            idStr = idStr + '-' + polozka

        return(idStr)



    ##########################################
    # Testovaci data
    ##########################################

    def vytvorTestData5D(self):

        testData = []

        for d5 in range(0, 3):
            dataD4 = []

            for d4 in range(0, 5):
                dataD3 = []

                for d3 in range(0, 4):
                    tabulka = []

                    for r in range(0, 10):
                        radek = []

                        for s in range(0, 3):
                            hodnota = str(d4) + ' - ' + str(d3) + ' - ' + str(r) + ' - ' + str(s)
                            radek.append(hodnota)

                        tabulka.append(radek)
                    dataD3.append(tabulka)
                dataD4.append(dataD3)
            testData.append(dataD4)

        return (testData)

    def vytvorTestData4D(self):

        testData = []

        for d4 in range(0, 5):
            dataD3 = []

            for d3 in range(0, 4):
                tabulka = []

                for r in range(0, 10):
                    radek = []

                    for s in range(0, 3):
                        hodnota = str(d4) + ' - ' + str(d3) + ' - ' + str(r) + ' - ' + str(s)
                        radek.append(hodnota)

                    tabulka.append(radek)
                dataD3.append(tabulka)
            testData.append(dataD3)

        return (testData)

    def vytvorTestData3D(self):

        testData = []

        for d3 in range(0, 3):
            tabulka = []

            for r in range(0, 10):
                radek = []

                for s in range(0, 3):
                    hodnota = str(d3) + ' - ' + str(r) + ' - ' + str(s)
                    radek.append(hodnota)

                testData.append(radek)

        return (testData)

    def vytvorTestData(self):

        testData = []

        for r in range(0, 10):
            radek = []

            for s in range(0, 3):
                hodnota = str(r) + ' - ' + str(s)
                radek.append(hodnota)

            testData.append(radek)

        return (testData)


