import generujTabulku
from pathlib import Path


class tiskniHtml:

    def __init__(self):

        adresaKamExportovat = self.ziskejAdresuKamExportovat()

        genTable = generujTabulku.generujHtml()
        htmlRadkyAllTable = genTable.getHtmlRadkyAll()
        poleRadkuAll = self.vytvorPoleRadkuHtml(htmlRadkyAllTable)

        self.tiskniDataDoTxt(poleRadkuAll, adresaKamExportovat)



    def vytvorPoleRadkuHtml(self, radkyMezi):

        radkyPred = self.definujRadkyPred()
        radkyZa = self.definujRadkyZa()

        poleRadkuAll = radkyPred
        poleRadkuAll = poleRadkuAll + radkyMezi
        poleRadkuAll = poleRadkuAll + radkyZa

        return(poleRadkuAll)



    def definujRadkyPred(self):

        radkyPred = []

        radkyPred.append('<!DOCTYPE html>')
        radkyPred.append('<html>')
        radkyPred.append('<head>')
        radkyPred.append('')
        radkyPred.append('<link rel="stylesheet" href="css/styles.css">')
        radkyPred.append('<link rel="stylesheet" href="css/table.css">')
        radkyPred.append(' <link href="https://cdnjs.cloudflare.com/ajax/libs/jstree/3.2.1/themes/default/style.min.css" type="text/css" rel="stylesheet" />')
        radkyPred.append('<script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min.js"></script> ')
        radkyPred.append('<script src="https://cdnjs.cloudflare.com/ajax/libs/jstree/3.2.1/jstree.min.js"></script>')
        radkyPred.append('<script src="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.5.1/highlight.min.js"></script>')
        radkyPred.append('')
        radkyPred.append('')
        radkyPred.append('</head>')
        radkyPred.append('<div class="treeTable">')
        radkyPred.append('<div class="tree">')
        radkyPred.append('<div id="jsTree"></div>')
        radkyPred.append('</div> ')
        radkyPred.append('<div class="table">')
        radkyPred.append('	<h1 id="intro">Please, choose an object in jsTree.</h1>')

        return(radkyPred)


    def definujRadkyMezi(self):

        radkyMezi = []

        radkyMezi.append('<body>')
        radkyMezi.append('<h2>HTML Table</h2>')
        radkyMezi.append('<table>')
        radkyMezi.append('  <tr>')
        radkyMezi.append('    <th>Company</th>')
        radkyMezi.append('    <th>Contact</th>')
        radkyMezi.append('    <th>Country</th>')
        radkyMezi.append('  </tr>')
        radkyMezi.append('  <tr>')
        radkyMezi.append('    <td>Alfreds Futterkiste</td>')
        radkyMezi.append('    <td>Maria Anders</td>')
        radkyMezi.append('    <td>Germany</td>')
        radkyMezi.append('  </tr>')
        radkyMezi.append('  <tr>')
        radkyMezi.append('    <td>Centro comercial Moctezuma</td>')
        radkyMezi.append('    <td>Francisco Chang</td>')
        radkyMezi.append('    <td>Mexico</td>')
        radkyMezi.append('  </tr>')
        radkyMezi.append('  <tr>')
        radkyMezi.append('    <td>Ernst Handel</td>')
        radkyMezi.append('    <td>Roland Mendel</td>')
        radkyMezi.append('    <td>Austria</td>')
        radkyMezi.append('  </tr>')
        radkyMezi.append('  <tr>')
        radkyMezi.append('    <td>Island Trading</td>')
        radkyMezi.append('    <td>Helen Bennett</td>')
        radkyMezi.append('    <td>UK</td>')
        radkyMezi.append('  </tr>')
        radkyMezi.append('  <tr>')
        radkyMezi.append('    <td>Laughing Bacchus Winecellars</td>')
        radkyMezi.append('    <td>Yoshi Tannamuri</td>')
        radkyMezi.append('    <td>Canada</td>')
        radkyMezi.append('  </tr>')
        radkyMezi.append('  <tr>')
        radkyMezi.append('    <td>Magazzini Alimentari Riuniti</td>')
        radkyMezi.append('    <td>Giovanni Rovelli</td>')
        radkyMezi.append('    <td>Italy</td>')
        radkyMezi.append('  </tr>')
        radkyMezi.append('</table>')
        radkyMezi.append('')
        radkyMezi.append('</body>')

        return (radkyMezi)


    def definujRadkyZa(self):

        radkyZa = []

        radkyZa.append('</div>')
        radkyZa.append('</div>')
        radkyZa.append('<script type="text/javascript" src="json/jsTreeData.json"></script>')
        radkyZa.append('<script type="text/javascript" src="js/jsTree.js"></script>')
        radkyZa.append('<script type="text/javascript" src="js/script.js"></script>')
        radkyZa.append('</html>')

        return(radkyZa)


    def tiskniDataDoTxt(self, dataKTisku, adresaHtml):
        dataWrite = ""

        f = open(adresaHtml, 'w')

        for i in range(0, len(dataKTisku)):
            radek = str(dataKTisku[i])

            dataWrite = dataWrite + radek + '\n'

        f.write(dataWrite)
        f.close()


    def ziskejAdresuKamExportovat(self):

        adresaProjektu = Path.cwd().parent.parts
        adresaKamExportovat = "C:"

        for i in range(1, len(adresaProjektu)):
            slozka = adresaProjektu[i]
            adresaKamExportovat = adresaKamExportovat + '\\' + slozka

        adresaKamExportovat = adresaKamExportovat + '\\genHtml_output\\index.html'

        return(adresaKamExportovat)