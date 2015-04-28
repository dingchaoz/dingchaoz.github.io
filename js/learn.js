/**
 *
 * 	Abstimmungsexplorer (Arbeitstitel)

 main.js
 Führt das Hauptskript aus
 @author			Timo Grossenbacher, Urs Mändli, Michael Jenni
 @copyright			CC BY-NC-SA 2.0 2013
 @license			MIT License (http://www.opensource.org/licenses/mit-license.php)

 */

/* Parameters */
var LONCENTER = 9;
var LATCENTER = 46.7;
var MAPSCALE = 12500;
var TOOLTIPVERTICALSHIFT = 520;
var SP_TOOLTIPVERTICALSHIFT = 145;
var SP_TOOLTIPHORIZONTALSHIFT = 985;
var NUMCLASSES = 4;
var SP_LEFTMARGIN = 50;
var SP_RIGHTMARGIN = 40;
var SP_BOTTOMMARGIN = SP_LEFTMARGIN;
var SP_TOPMARGIN = SP_RIGHTMARGIN;
var SP_TOTALWIDTH = 450;
var VAR1DEFAULT = 'AUSSCHAFFUNG';
var VAR2DEFAULT = 'AUSLAENDER';
var TRANSDURATION = 500;
// Transitionsdauer in ms
/*var SELECTEDSTYLE = {
    'stroke' : 'rgb(0,0,0)',
    'stroke-width' : '3px'
}
var UNSELECTEDSTYLE = {
    'stroke' : '#FFFFFF',
    'stroke-width' : '0.8px'
}*/

/* Global Variables */
var numParts = 4;
var partsReady = 0;
var mapContainer = null;
var projection = null;
var path = null;
var data = null;
var tooltip1 = null;
var tooltip2 = null;
var tooltipScatter = null;
var tooltipAxes = null;
var brush = null;

// Übersetzung von Labels zu Datenitems
var dataDictionary = {
    'AUSSCHAFFUNG' : {
        type : 'vote',
        label : 'Zustimmung zur Volksinitiative «Für die Ausschaffung krimineller Ausländer», 28.11.2010'
    },
    'ZWEITWNG' : {
        type : 'vote',
        label : 'Zustimmung zur Volksinitiative «Schluss mit uferlosem Bau von Zweitwohnungen!», 11.03.2012'
    },
    'FERIEN' : {
        type : 'vote',
        label : 'Zustimmung zur Volksinitiative «6 Wochen Ferien für alle», 11.03.2012'
    },
    'WAFFEN' : {
        type : 'vote',
        label : 'Zustimmung zur Volksinitiative «Für den Schutz vor Waffengewalt», 13.02.2012'
    },
    'LEDIGE' : {
        type : 'demo',
        label : 'Anteil von ledigen Personen an der ständigen Wohnbevölkerung, 2011'
    },
    'AUSLAENDER' : {
        type : 'demo',
        label : 'Anteil von Ausländern an der ständigen Wohnbevölkerung, 2011'
    },
    'UE65' : {
        type : 'demo',
        label : 'Anteil von Personen über 65 Jahren an der ständigen Wohnbevölkerung, 2011'
    },
    'U20' : {
        type : 'demo',
        label : 'Anteil von Personen unter 20 Jahren an der ständigen Wohnbevölkerung, 2011'
    },
    'EFH' : {
        type : 'demo',
        label : 'Anteil von Einfamilienhäusern an allen Wohngebäuden, 2011'
    }
}
var var1 = VAR1DEFAULT;
// Darzustellende Variable für die obere Karte
var var2 = VAR2DEFAULT;
// Darzustellende Variable für die untere Karte

/**
 * Konstruktor
 * Lädt die Geometrien, die wiederum die Daten laden, etc.
 */
var init = function() {
    // Map-Container erstellen
    mapContainer = d3.select("#container").append("div").attr("id", "map");
    // Container für beide Karten erstellen
    var map1 = mapContainer.append("svg").attr("id", "map1").attr("class", "map");
    map1.append("g").attr("id", "bezirke");
    map1.append("g").attr("id", "seen");
    var map2 = mapContainer.append("svg").attr("id", "map2").attr("class", "map");
    map2.append("g").attr("id", "bezirke");
    map2.append("g").attr("id", "seen");
    map1.append('g').attr('class', 'legend');
    map2.append('g').attr('class', 'legend');
    // Scatterplot-Container erstellen
    mapContainer = d3.select("#container").append("svg").attr("id", "scatterplot").attr("width", SP_TOTALWIDTH).attr("height", SP_TOTALWIDTH);
    // Auswahllisten erstellen
    createUi();

    // Impressum/Erläuterungen kreieren
    createImpress();

    // Geometrien laden
    loadGeometries();
}
/**
 * Erhöht den partsReady-Counter um eins und überprüft, ob alle Teile schon geladen sind.
 */
var partReady = function() {
    partsReady++;
    checkLoader();
}
/**
 * Überprüft, ob alle Teile schon geladen sind.
 * Wenn ja, wird der Loading-Screen entfernt  und der Benutzer kann auf die App zugreifen.
 */
var checkLoader = function() {
    if (partsReady >= numParts)
        document.getElement('#loading').destroy();
}
/**
 * Tooltip-Funktionen
 */

var mark = function() {
    var bezirk = d3.select(this);
    var bezirksnr = bezirk.attr('bezirksnr');

    // Polygone auf der Karte selektieren
    selectpolygon(bezirksnr);

    // Text generieren
    var text1 = data[bezirksnr]['BEZ'] + '<br/>' + '<span class=\"vary\">' + d3.round(parseFloat(data[bezirksnr][var1]) * 100, 1) + '%' + '</span>';
    var text2 = data[bezirksnr]['BEZ'] + '<br/>' + '<span class=\"varx\">' + d3.round(parseFloat(data[bezirksnr][var2]) * 100, 1) + '%' + '</span>';
    document.getElement(tooltip1).set('html', text1);
    document.getElement(tooltip2).set('html', text2);

    // Tooltip sichtbar machen
    d3.select(tooltip1).transition().duration(TRANSDURATION).style("opacity", 0.9);
    d3.select(tooltip2).transition().duration(TRANSDURATION).style("opacity", 0.9);

    // Punkt im Scatterplot markieren
    sp_selectpoint(bezirksnr);

    // Tooltip beim Punkt anzeigen
    sp_displaytooltip(bezirksnr);

}
var unmark = function() {
    var bezirk = d3.select(this);
    var bezirksnr = bezirk.attr('bezirksnr');
    // Polygone deselektieren
    unselectpolygon(bezirksnr);

    // Tooltips ausblenden
    d3.select(tooltip1).transition().duration(TRANSDURATION).style("opacity", 0);
    d3.select(tooltip2).transition().duration(TRANSDURATION).style("opacity", 0);

    // Punkt im Scatterplot demarkieren
    sp_deselectpoint(bezirksnr);
    // Tooltip ausblenden
    sp_hidetooltip();

}
var movemark = function() {
    var bezirk = d3.select(this);
    var bezirksnr = bezirk.attr('bezirksnr');

    // Um die vertikale Verschiebung für beide Karten korrekt zu berechnen, muss
    // herausgefunden werden, zu welcher Karte/SP this gehört
    var mapid = d3.select(bezirk.node().parentNode).node().parentNode.get('id');
    if (mapid == 'map1') {
        var vertshift1 = 0;
        var vertshift2 = TOOLTIPVERTICALSHIFT;
    } else if (mapid == 'map2') {
        var vertshift1 = -1 * TOOLTIPVERTICALSHIFT;
        var vertshift2 = 0;
    }
    // Position des Tooltips neu berechnen (auf beiden Karten)
    document.getElement(tooltip1).setStyle("left", (d3.event.pageX + 10) + "px").setStyle("top", (d3.event.pageY - 26 + vertshift1) + "px");
    document.getElement(tooltip2).setStyle("left", (d3.event.pageX + 10) + "px").setStyle("top", (d3.event.pageY - 26 + vertshift2) + "px");

}

var selectpolygon = function(bezirksnr) {
    // In order to draw the highlighted feature properly, we have
    // to append it to the end of the <svg>, so that it is on top
    // of everything else
    // Thank you, ralphstraumann.ch/cartogram_cantons
    // Karte 1
    var map1bezirkDom = getpolygon(bezirksnr)[0].dispose();
    document.getElement(map1).getElement('#bezirke').grab(map1bezirkDom);
    // Karte 2
    var map2bezirkDom = getpolygon(bezirksnr)[1].dispose();
    document.getElement(map2).getElement('#bezirke').grab(map2bezirkDom);
    d3.select(map1bezirkDom).classed('selected', true);
    d3.select(map2bezirkDom).classed('selected', true);
}

var brushselectpolygon = function(bezirksnr) {
    // Karte 1
    var map1bezirkDom = getpolygon(bezirksnr)[0].dispose();
    document.getElement(map1).getElement('#bezirke').grab(map1bezirkDom);
    // Karte 2
    var map2bezirkDom = getpolygon(bezirksnr)[1].dispose();
    document.getElement(map2).getElement('#bezirke').grab(map2bezirkDom);
    
    d3.select(map1bezirkDom).classed('brushselected', true);
    d3.select(map2bezirkDom).classed('brushselected', true);
}

var unselectpolygon = function(bezirksnr) {
    d3.select(getpolygon(bezirksnr)[0]).classed('selected', false);
    d3.select(getpolygon(bezirksnr)[1]).classed('selected', false);
}

var getpolygon = function(bezirksnr){
    var polygonArray = new Array();
    polygonArray.push(document.getElement(map1).getElement('path[bezirksnr="' + bezirksnr + '"]'));
    polygonArray.push(document.getElement(map2).getElement('path[bezirksnr="' + bezirksnr + '"]'));
    return polygonArray;
}
var sp_mark = function() {
    var bezirk = d3.select(this);
    var bezirksnr = bezirk.attr('bezirksnr');
    // Polygone in der Karte selektieren
    selectpolygon(bezirksnr);
    // Punkt im Scatterplot markieren
    sp_selectpoint(bezirksnr);

}
var sp_unmark = function() {
    var bezirk = d3.select(this);
    var bezirksnr = bezirk.attr('bezirksnr');
    // Polygone deselektieren
    unselectpolygon(bezirksnr);
    // Punkt im Scatterplot deselektieren
    sp_deselectpoint(bezirksnr);
    // Tooltip demarkieren
    sp_hidetooltip();

}
var sp_movemark = function() {
    var bezirk = d3.select(this);
    var bezirksnr = bezirk.attr('bezirksnr');
    // Tooltip beim Punkt anzeigen
    sp_displaytooltip(bezirksnr);

}
var sp_displaytooltip = function(bezirksnr) {
    var pointx = parseFloat(sp_getpoint(bezirksnr).get('cx'));
    var pointy = parseFloat(sp_getpoint(bezirksnr).get('cy'));
    d3.select(tooltipScatter).transition().duration(TRANSDURATION).style("opacity", 0.9);
    document.getElement(tooltipScatter).setStyle("left", (pointx + SP_TOOLTIPHORIZONTALSHIFT) + "px").setStyle("top", (pointy + SP_TOOLTIPVERTICALSHIFT) + "px");
    var textScatter = data[bezirksnr]['BEZ'] + '<br/>' + d3.round(parseFloat(data[bezirksnr]['POP']), 1) + ' EinwohnerInnen';
    textScatter += '<br/><span class=\"vary\">' + d3.round(parseFloat(data[bezirksnr][var1]) * 100, 1) + '%' + '</span>';
    textScatter += '<br/><span class=\"varx\">' + d3.round(parseFloat(data[bezirksnr][var2]) * 100, 1) + '%' + '</span>';
    document.getElement(tooltipScatter).set('html', textScatter);
}
var sp_hidetooltip = function() {
    d3.select(tooltipScatter).transition().duration(TRANSDURATION).style("opacity", 0);
}
var sp_selectpoint = function(bezirksnr) {
    // MooTools class removal somehow doesn't work
    d3.select(sp_getpoint(bezirksnr)).classed('selected', true);
}
var sp_deselectpoint = function(bezirksnr) {
    // MooTools class removal somehow doesn't work
    d3.select(sp_getpoint(bezirksnr)).classed('selected', false);
}

var sp_getpoint = function(bezirksnr) {
    return document.getElement('#scatterplot').getElement('circle[bezirksnr="' + bezirksnr + '"]');
}
var axistooltipon = function() {
    var axis = d3.select(this);
    // Tooltip sichtbar machen
    d3.select(tooltipAxes).transition().duration(100).style("opacity", 0.9);
    // Tooltip an die richtige Position verfrachten
    document.getElement(tooltipAxes).setStyle("left", (d3.event.pageX + 10) + "px").setStyle("top", (d3.event.pageY - 10) + "px");
    // wenn X-Achse, dann Label von var2 anzeigen, sonst von var1
    var type = (axis.attr('id') == 'xaxis') ? var2 : var1;
    var text = dataDictionary[type].label;
    document.getElement(tooltipAxes).set('text', text);
}
var axistooltipmove = function() {
    // Position neu berechnen
    document.getElement(tooltipAxes).setStyle("left", (d3.event.pageX + 10) + "px").setStyle("top", (d3.event.pageY - 10) + "px");
}
var axistooltipoff = function() {
    // Tooltip unsichtbar machen
    d3.select(tooltipAxes).transition().duration(TRANSDURATION).style("opacity", 0);
}
/**
 * Brush-Funktionen
 */
var brushstart = function() {  
}
var brushmove = function() {
    var e = brush.extent();
    // Circles im Scatterplot je nach Teilnahme im Extent de- oder selektieren
    d3.select('#scatterplot').selectAll("circle").classed("brushselected", function(d) {
        return e[0][0] < d[var2] && d[var2] < e[1][0] && e[0][1] < d[var1] && d[var1] < e[1][1];
    });
    // durch alle selektierten Pfade iterieren und diese deselektieren
    var selectedPathsMap1 = document.getElement('#map1').getElements('path.brushselected');
    d3.selectAll(selectedPathsMap1).classed('selected', false);
    d3.selectAll(selectedPathsMap1).classed('brushselected', false);
    var selectedPathsMap2 = document.getElement('#map2').getElements('path.brushselected');
    d3.selectAll(selectedPathsMap2).classed('selected', false);
    d3.selectAll(selectedPathsMap2).classed('brushselected', false);
  
    // durch alle Circles iterieren und je nach Klasse deren Pendants in den Karten
    // selektieren
    var selectedCircles = document.getElement('#scatterplot').getElements('circle.brushselected');
    Array.each(selectedCircles, function(item,index){
        brushselectpolygon(item.get('bezirksnr'));
    });
}
var brushend = function() {
}
/**
 * Erstellt die Auswahllisten für die Daten, basierend auf Inhalten von dataDictionary
 * Erstellt auch die Tooltips (obwohl sie noch nicht angezeigt werden)
 */
var createUi = function() {
    // Obere Karte
    // Selektor hört auf den Change-Event
    var selector1 = new Element('select', {
        'id' : 'selector1',
        'class' : 'selector',
        'events' : {
            'change' : function() {
                var1 = this.value;
                displayData();
            }
        }
    });
    // Untere Karte
    var selector2 = new Element('select', {
        'id' : 'selector2',
        'class' : 'selector',
        'events' : {
            'change' : function() {
                var2 = this.value;
                displayData();
            }
        }
    });
    // Optionen-Elemente generieren
    function generateOption(item, index, standardvalue) {
        var selected = (index == standardvalue) ? true : false;
        var option = new Element('option', {
            value : index,
            text : item.label,
            'class' : item.type,
            selected : selected
        });
        return option;
    }

    // Vor die Karten anhängen
    document.getElement(map1).grab(selector1, 'before');
    document.getElement(map2).grab(selector2, 'before');

    // Optionen an die Selektoren anhängen
    Object.each(dataDictionary, function(item, index) {
        selector1.grab(generateOption(item, index, var1));
        selector2.grab(generateOption(item, index, var2));
    });
    // Tooltip für obere Karte vorgenerieren
    var tooltipoptions = {
        'class' : 'tooltip',
        'styles' : {
            'opacity' : 0.0
        }
    };
    tooltip1 = new Element('div', tooltipoptions);
    // Tooltip für untere Karte vorgenerieren
    tooltip2 = new Element('div', tooltipoptions);
    // Tooltip für Scatterplot vorgenerieren
    tooltipScatter = new Element('div', tooltipoptions);
    // Tooltips für Scatterplot-Achsen vorgenerieren
    tooltipAxes = new Element('div', tooltipoptions);
    tooltipAxes.addClass('axes');
    document.body.grab(tooltip1);
    document.body.grab(tooltip2);
    document.body.grab(tooltipScatter);
    document.body.grab(tooltipAxes);

}
/**
 * Erstellt die Erläuterungen/das Impressum
 */
var createImpress = function() {
    var impressum = document.getElement('#impressum').dispose();
    document.getElement('#scatterplot').grab(impressum, 'after');
    impressum.setStyle('display', 'block');
}
/**
 * Bereitet die Farbschemen für alle Datenarten vor, basierend auf den Daten
 * werden NUMCLASSES Quantile berechnet. Die Farbschemen werden je nach Variable
 * berechnet und dem dataDictionary angehängt.
 */
var prepareColors = function() {
    Object.each(dataDictionary, function(item, index) {
        var temp_data = new Array();
        Object.each(data, function(obj_item, obj_index) {
            temp_data.push(parseFloat(obj_item[index]));
        });
        // Farbschema basierend auf Datentyp auswählen
        // Abstimmungsdaten erhalten bipolare Farben,
        // Demographics erhalten sequentielle Farben
        var colors = null;
        if (item.type == 'vote') {
            // hier müssen die Daten zuerst aufgeteilt werden in solche unter 0.5 und solche über und mit 0.5
            // das Array wird zuerst bei 0.5 gesplittet
            var index1 = d3.bisectLeft(Array.sort(temp_data), 0.5);

            var chunk1 = Array.sort(temp_data).slice(0, index1);
            var chunk2 = Array.sort(temp_data).slice(index1);
            // von chunk1 und chunk2 werden jetzt nocheinmal die 50%-Quantilen genommen (Achtung: Funktioniert nur mit 5 Klassen)
            var colorScheme = d3.scale.threshold().domain([d3.quantile(chunk1, 0.5), 0.5, d3.quantile(chunk2, 0.5)]).range(colorbrewer.BrBG[NUMCLASSES])
        } else if (item.type == 'demo') {
            // Falls es sich um demographische Daten handelt, wird Quantil-Skala angewendet, sonst eine feste
            colors = colorbrewer.YlGn[NUMCLASSES + 1]
            var colorScheme = d3.scale.quantile().domain(temp_data).range(colors)
        }

        // colorScheme zum dataDictionary hinzufügen
        item['colorScheme'] = colorScheme;
        // wenn Vote, dann auch noch min_perc und max_perc hinzufügen
        if (item.type == 'vote') {
            item['minPerc'] = d3.min(temp_data);
            item['maxPerc'] = d3.max(temp_data);
        }
    });
}
/**
 * Bereitet die Legenden-Klassenlabels vor, basierend auf dem Farbschema der einzelnen Variablen
 * Fügt die Legenden-Klassenlabels zum dataDictionary hinzu.
 */
var prepareLegends = function() {
    Object.each(dataDictionary, function(item, index) {

        var classes = new Array();
        // Die Generierung der Legenden-Labels ist leicht unterschiedlich für beide Typen von Daten
        var domain = null;
        if (item.type == 'demo') {
            domain = item.colorScheme.quantiles();
            var min_perc = d3.min(item.colorScheme.domain());
            var max_perc = d3.max(item.colorScheme.domain());
        } else if (item.type == 'vote') {
            domain = item.colorScheme.domain();
            var min_perc = item.minPerc;
            var max_perc = item.maxPerc;
        }
        Array.each(domain, function(c_item, c_index) {
            var text = "";
            if (c_index == 0) {
                text = d3.round(min_perc * 100, 1) + " - " + d3.round((c_item * 100) - 0.1, 1) + "%";
            } else {
                text = d3.round(domain[c_index - 1] * 100, 1) + " - " + d3.round((c_item * 100) - 0.1, 1) + "%";
            }
            classes.push(text);
            // last class
            if (c_index == domain.length - 1) {
                text = d3.round(c_item * 100, 1) + " - " + d3.round(max_perc * 100, 1) + "%";
                classes.push(text);
            }
        });

        // Klassen dem dataDictionary anhängen
        item['classLabels'] = classes;
    });
    partReady();
}
/**
 * Lädt die Kartengeometrien
 * Führt danach einen Call an loadData aus, die Funktion, die initial alle CSV-Daten lädt
 * Die BezirksNr wird jedem Polygon als Attribut "bezirksnr"
 */
var loadGeometries = function() {
    // Projektion spezifizieren
    projection = d3.geo.albers().center([0, LATCENTER]).rotate([-LONCENTER, 0]).parallels([40, 50]).scale(MAPSCALE)
    // Pfad-Konstruktor spezifizieren
    path = d3.geo.path().projection(projection);
    // Bezirke
    d3.json("data/bezirke_wgs84.geojson", function(error, bezirke) {
        // Karte 1
        d3.select(map1).select("#bezirke").selectAll("path").data(bezirke.features).enter().append("path").attr("bezirksnr", function(d) {
            return d.properties.BEZIRKSN_1
        }).attr("d", path)
        // Events für den Tooltip attachen
        .on('mouseover', mark).on('mouseout', unmark).on('mousemove', movemark);
        // Karte 2
        d3.select(map2).select("#bezirke").selectAll("path").data(bezirke.features).enter().append("path").attr("bezirksnr", function(d) {
            return d.properties.BEZIRKSN_1
        }).attr("d", path)
        // Events für den Tooltip attachen
        .on('mouseover', mark).on('mouseout', unmark).on('mousemove', movemark);
        partReady();
        // initiale Daten laden
        loadData();
    });
    // Seen

    d3.json("data/seen_wgs84.geojson", function(error, seen) {
        // Karte 1
        d3.select(map1).select("#seen").selectAll("path").data(seen.features).enter().append("path")
        // Die Daten bestehen aus einem einzigen Multipolygon
        .attr("d", path)
        // Karte 2
        d3.select(map2).select("#seen").selectAll("path").data(seen.features).enter().append("path")
        // Die Daten bestehen aus einem einzigen Multipolygon
        .attr("d", path)
        partReady();
    });

}
/**
 * Lädt die Daten initial aus data/data.csv
 */
var loadData = function() {
    d3.csv('data/data.csv', function(daten) {
        // Daten konvertieren, so dass BEZ_NR zur ID wird
        data = new Object();
        daten.forEach(function(bezirk) {
            var bezid = bezirk.BEZ_NR;
            data[bezid] = bezirk;
        });
        partReady();
        // Farben aufbereiten
        prepareColors();
        // Legenden-Klassen aufbereiten
        prepareLegends();
        // Ab jetzt wird der Loading-Screen nicht mehr angezeigt
        displayData();
    });
}
/**
 * Stellt die Daten dar, indem die Variablen aus dataDictionary dazu gebraucht werden,
 * die einzelnen Bezirke je nach Farbschema (ebenfalls im dataDictionary definiert) einzufärben
 */
var displayData = function() {
    // Kartendaten
    displayMapData();
    // Legenden für die Karten
    displayLegend();
    // Scatterplot
    displayScatterplot();
}
/**
 * Rendert die Achsen und die Daten des Scatterplots innerhalb von #scatterplot
 */
var displayScatterplot = function() {
    // Breite des Scatterplots berechnen
    var scatterPlotWidth = SP_TOTALWIDTH - SP_LEFTMARGIN - SP_RIGHTMARGIN;

    // Das Datenobjekt muss zuerst in ein Array umgewandelt werden
    var dataarray = Hash.getValues(data);

    // Extremwerte berechnen (werden für die Skalen benötigt)
    var minx = d3.min(dataarray, function(d) {
        return d[var2];
    });
    var maxx = d3.max(dataarray, function(d) {
        return d[var2];
    });
    var miny = d3.min(dataarray, function(d) {
        return d[var1];
    });
    var maxy = d3.max(dataarray, function(d) {
        return d[var1];
    });
    var minpop = d3.min(dataarray, function(d) {
        return d['POP'];
    });
    var maxpop = d3.max(dataarray, function(d) {
        return d['POP'];
    });
    // marginal grössere bzw. kleinere Zahlen bei der Domain verwenden, damit auch
    // wirklich alle Punkte beim Brushen selektierbar sind
    var xscale = d3.scale.linear().domain([minx - 0.001, parseFloat(maxx) + 0.001]).range([0 + SP_LEFTMARGIN, SP_LEFTMARGIN + scatterPlotWidth]);
    var yscale = d3.scale.linear().domain([miny - 0.001, parseFloat(maxy) + 0.001]).range([scatterPlotWidth + SP_TOPMARGIN, SP_TOPMARGIN]);
    var rscale = d3.scale.sqrt().domain([minpop, maxpop]).range([3, 8]);

    // Achsen und Tickmarks zeichnen
    // vorhergehende Löschen
    document.getElement('#scatterplot').getElements('.axis').destroy();
    var formatAsPercentage = d3.format("%");
    // X-Achse
    var xaxis = d3.svg.axis().scale(xscale).ticks(5).tickFormat(formatAsPercentage).orient('bottom');
    d3.select('#scatterplot').append('g').attr('class', 'axis').attr('id', 'xaxis').on('mouseover', axistooltipon).on('mouseout', axistooltipoff).on('mousemove', axistooltipmove).call(xaxis).attr("transform", "translate(0," + (SP_TOTALWIDTH - SP_TOPMARGIN) + ")");

    // Achsentooltip anbinden mit einem versteckten Rectangle
    d3.select('#xaxis').append('rect').attr('width', '350').attr('height', '50').attr('transform', 'translate(50,0)').attr('opacity', 0).on('mouseover', axistooltipon).on('mouseout', axistooltipoff).on('mousemove', axistooltipmove);
    // Y-Achse
    var yaxis = d3.svg.axis().scale(yscale).ticks(5).tickFormat(formatAsPercentage).orient('left');
    d3.select('#scatterplot').append('g').attr('class', 'axis').attr('id', 'yaxis').call(yaxis).attr("transform", "translate(" + SP_RIGHTMARGIN + ",0)");
    // Achsentooltip anbinden mit einem versteckten Rectangle
    d3.select('#yaxis').append('rect').attr('width', '50').attr('height', '350').attr('transform', 'translate(-40,50)').attr('opacity', 0).on('mouseover', axistooltipon).on('mouseout', axistooltipoff).on('mousemove', axistooltipmove);
    // Brush erstellen
    brush = d3.svg.brush().x(xscale).y(yscale).on("brush", brushmove).on("brushstart", brushstart).on("brushend", brushend);
    d3.select('#scatterplot').call(brush);

    // Circles: Enter
    // Variable 1 (obere Karte) wird als y-Achse dargestellt
    // Variable 2 (untere Karte) wird als x-Achse dargestellt
    d3.select('#scatterplot').selectAll("circle").data(dataarray).enter().append("circle")
    // Bezirksnummer als Attribut übergeben (wird für Selektion gebraucht)
    .attr('bezirksnr', function(d) {
        return d['BEZ_NR'];
    })
    // Events für den Tooltip attachen
    .on('mouseover', sp_mark).on('mouseout', sp_unmark).on('mousemove', sp_movemark);

    // Circles: Update
    d3.select('#scatterplot').selectAll("circle").data(dataarray).transition().duration(TRANSDURATION).ease("linear").attr("cy", function(d) {
        return yscale(d[var1]);
    }).attr("cx", function(d) {
        return xscale(d[var2]);
    }).attr("r", function(d) {
        return rscale(d['POP']);
    });

}
/**
 * Wird von displayData aufgerufen, füllt die Karte mit Daten
 */
var displayMapData = function() {
    var var1obj = dataDictionary[var1];
    var var2obj = dataDictionary[var2];

    // Variable 1
    d3.select(map1).select("#bezirke").selectAll("path").transition().duration(TRANSDURATION).ease('linear').style("fill", function(d) {
        // die Prozentangabe im data-Objekt wird auf das ColorSchema der jeweiligen Variable angewendet,
        // um die entsprechende Quantils-Farbe zu generieren (dies passiert nur, wenn für diesen Bezirk auch Daten existieren)
        if (data[d.properties.BEZIRKSN_1] != null)
            return var1obj.colorScheme(parseFloat(data[d.properties.BEZIRKSN_1][var1]));
    });
    // Variable 2
    d3.select(map2).select("#bezirke").selectAll("path").transition().duration(TRANSDURATION).ease('linear').style("fill", function(d) {
        if (data[d.properties.BEZIRKSN_1] != null)
            return var2obj.colorScheme(parseFloat(data[d.properties.BEZIRKSN_1][var2]));
    });
}
/**
 * Rendert die Legenden mit den vorprozessierten Informationen aus dataDictionary
 */
var displayLegend = function() {
    var var1obj = dataDictionary[var1];
    var var2obj = dataDictionary[var2];
    // Variable 1
    // Div anfügen
    var mapsarray = [{
        map : map1,
        data : var1obj
    }, {
        map : map2,
        data : var2obj
    }]
    Array.each(mapsarray, function(item, index) {

        // Legende hinzufügen
        var legend = d3.select(item.map).select('.legend');
        // für demographische Variable muss das Farbschema umgedreht werden
        /*if(item.data.type == 'demo')
        var colorScheme = item.data.colorScheme.range().reverse();*/

        // Kopien der Arrays anfertigen, da sie reversed werden
        var colorScheme = item.data.colorScheme.range().slice(0);
        colorScheme = colorScheme.reverse();
        var labels = item.data.classLabels.slice(0);
        // Gruppe: Enter
        var legendEntries = legend.selectAll('.legendEntry').data(labels.reverse()).enter()
        // Gruppe für jedes Label erstellen
        .append('g').attr('class', 'legendEntry')
        // entsprechend positionieren
        .attr("transform", function(d, i) {
            return "translate(0," + (20 + i * 30) + ")";
        });

        // Rechteck: Enter
        legendEntries.append('rect')// Rechteck an die Gruppe anhängen
        .attr("x", 20).attr("width", 25).attr("height", 18).style("stroke", "none").style("fill", "rgb(255,255,255)")

        // Rechteck: Update
        legend.selectAll('rect').data(labels).transition().duration(TRANSDURATION).ease('linear').style("fill", function(d, i) {
            return colorScheme[i]
        });

        // Text: Enter
        legendEntries.append('text')// Text anhängen
        .attr("x", 110).attr("y", 10).attr("dy", ".35em").style("text-anchor", "end").style("fill", "rgb(0,0,0)")

        // Text: Update
        legend.selectAll('text').data(labels).text(function(d) {
            return d;
        });

    });

}

