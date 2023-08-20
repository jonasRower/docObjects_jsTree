# generuje html soubor s jsTree
from pathlib import Path

class generujHtmlJsTree:

    def __init__(self, poleIdParentsAll):

        adresaKamExportovat = self.ziskejAdresuKamExportovat()

        jsonDataRadky = self.vytvorJsonData(poleIdParentsAll)
        self.tiskniDataDoTxt(jsonDataRadky, adresaKamExportovat)

        print()



    def vytvorJsonData(self, poleIdParentsAll):

        poleRadkuMezi = self.vytvorPoleRadkuMezi(poleIdParentsAll)
        jsonDataRadky = self.prevedPoleRadkuMeziNaJsonData(poleRadkuMezi)

        return(jsonDataRadky)



    def prevedPoleRadkuMeziNaJsonData(self, poleRadkuMezi):

        jsonDataRadky = []
        jsonDataRadky.append('jsondata = \'[\' +')

        for i in range(0, len(poleRadkuMezi)):
            radek = poleRadkuMezi[i]
            radekNew = '\'' + radek + '\' +'
            jsonDataRadky.append(radekNew)

        jsonDataRadky.append('\']\'')

        return(jsonDataRadky)


    def vytvorPoleRadkuHtml(self, poleIdParentsAll):

        poleRadkuMezi = self.vytvorPoleRadkuMezi(poleIdParentsAll)
        radkyPred = self.definujRadkyPred()
        radkyZa = self.definujRadkyZa()

        poleRadkuAll = radkyPred
        poleRadkuAll = poleRadkuAll + poleRadkuMezi
        poleRadkuAll = poleRadkuAll + radkyZa

        return (poleRadkuAll)


    def vytvorPoleRadkuMezi(self, poleIdParentsAll):

        poleRadku = []

        # vytvori prvni radek
        radek = self.vytvorRadekJson('project', '#', 'project')


        for i in range(0, len(poleIdParentsAll[0])):

            radek = radek + ','
            poleRadku.append(radek)

            try:
                id = poleIdParentsAll[0][i]
                parent = poleIdParentsAll[1][i]
            except:
                id = 'err_' + str(i)
                parent = '0'

            #kvuki carce se pridava radek na zacatku, ne na konci
            radek = self.vytvorRadekJson(id, parent, id)


        # prida posledni radek
        poleRadku.append(radek)

        return (poleRadku)


    def vytvorRadekJson(self, id, parent, text):
        radek = '                { "id": "' + id + '", "parent": "' + parent + '", "text": "' + text + '" }'

        return (radek)


    def ziskejAdresuKamExportovat(self):

        adresaProjektu = Path.cwd().parent.parts
        adresaKamExportovat = "C:"

        for i in range(1, len(adresaProjektu)):
            slozka = adresaProjektu[i]
            adresaKamExportovat = adresaKamExportovat + '\\' + slozka

        adresaKamExportovat = adresaKamExportovat + '\\genHtml_output\\json\\jsTreeData.json'

        return(adresaKamExportovat)


    def tiskniDataDoTxt(self, dataKTisku, adresaHtml):
        dataWrite = ""

        f = open(adresaHtml, 'w')

        for i in range(0, len(dataKTisku)):
            radek = str(dataKTisku[i])

            dataWrite = dataWrite + radek + '\n'

        f.write(dataWrite)
        f.close()


    def definujRadkyPred(self):

        radkyPred = []
        radkyPred.append('<!DOCTYPE html>')
        radkyPred.append('<html lang="en" xmlns="http://www.w3.org/1999/xhtml">')
        radkyPred.append('<head>')
        radkyPred.append('    <meta charset="utf-8" />')
        radkyPred.append('    <title>Simple jsTree</title>')
        radkyPred.append('    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/jstree/3.2.1/themes/default/style.min.css" />')
        radkyPred.append('    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/1.12.1/jquery.min.js"></script>')
        radkyPred.append('    <script src="https://cdnjs.cloudflare.com/ajax/libs/jstree/3.2.1/jstree.min.js"></script>')
        radkyPred.append('')
        radkyPred.append('    <script type="text/javascript">')
        radkyPred.append('        $(function () {')
        radkyPred.append('')
        radkyPred.append('            var jsondata = [')

        return (radkyPred)


    def definujRadkyZa(self):

        radkyZa = []
        radkyZa.append('            ];')
        radkyZa.append('            createJSTree(jsondata);')
        radkyZa.append('        });')
        radkyZa.append('')
        radkyZa.append('        function createJSTree(jsondata) { ')
        radkyZa.append('            $(\'#SimpleJSTree\').jstree({')
        radkyZa.append('                \'core\': {')
        radkyZa.append('                    \'data\': jsondata')
        radkyZa.append('                }')
        radkyZa.append('            });')
        radkyZa.append('        }')
        radkyZa.append('    </script>')
        radkyZa.append('')
        radkyZa.append('</head>')
        radkyZa.append('<body>')
        radkyZa.append('   <div id="SimpleJSTree"></div>')
        radkyZa.append('</body>')
        radkyZa.append('</html>')

        return (radkyZa)

