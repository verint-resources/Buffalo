/**
 * drawFeatureLayer
 * draws a FeatureLayer for a given layer configuration
 * layerConfig {url, options}
 * @param Map map
 * @param  {} layerConfig
 */
function drawFeatureLayer(map, layerConfig) {
    var layer;
    require([
        "esri/map",
        "esri/layers/FeatureLayer",
        "dojo/domReady!"
    ], function(FeatureLayer) {
        layer = new esri.layers.FeatureLayer(layerConfig.url, layerConfig.options);
        map.addLayer(layer);
    });
    return layer;
}


function addSearch(map, searchConfig) {
    var search;
    require(["esri/dijit/Search"], function(Search) {
        var searchWidgetId = 'dform_widget_' + searchConfig.widget.name + '_arcgis_search';
        search = new Search({
            sources: searchConfig.sources,
            enableButtonMode: searchConfig.options.enableButtonMode,
            maxSuggestions: searchConfig.options.maxSuggestions,
            map: map
        }, searchWidgetId);
        search.startup()
        var searchWidgetInputId = '#dform_widget_' + searchConfig.widget.name + '_arcgis_search_input';
        $(searchWidgetInputId).parent().append('<input type="submit" style="display: none;" value="' + searchConfig.widget.value + '"/>');
    });
    return search;
};

function getPictureMarkerSymbol({ url, width, height, offset }) {
    var markerSymbol;
    require(["esri/symbols/PictureMarkerSymbol"], function(PictureMarkerSymbol) {
        markerSymbol = new PictureMarkerSymbol(url, width, height).setOffset(offset.x, offset.y);
    });
    return markerSymbol;
}


function getLocator(url) {
    var loc;
    require([
        "esri/tasks/locator"
    ], function(Locator) {
        loc = new Locator(url);
    })
    return loc;
}

function getFeatureLayer(layerConfig) {
    var layer;
    require([
        "esri/layers/FeatureLayer"
    ], function(FeatureLayer) {
        layer = new FeatureLayer(layerConfig.url, {
            id: layerConfig.options.id,
            outFields: (layerConfig.options.outFields) ? layerConfig.options.outFields : ['*'],
            infoTemplate: layerConfig.options.infoTemplate
        })
    })
    return layer;
}

function getInfoTemplate(infoTemplateConfig) {
    console.log('getInfoTemplate %o', infoTemplateConfig);
    var template;
    require([
        "esri/InfoTemplate",
    ], function(InfoTemplate) {
        template = new InfoTemplate(infoTemplateConfig.title, infoTemplateConfig.content);
    })
    return template;
}


function addPoint(map, point, markerSymbol) {
    console.log('addPoint');
    var pointGraphic;
    require([
        "esri/graphic",
        "dojo/domReady!"
    ], function(Graphic) {
        pointGraphic = new Graphic(point, markerSymbol);
        map.graphics.add(pointGraphic);
    });
    return pointGraphic;
}