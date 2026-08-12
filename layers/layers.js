var wms_layers = [];

var lyr_GoogleSatellite_0 = new ol.layer.Tile({
    title: 'Google Satellite', opacity: 1,
    source: new ol.source.XYZ({
        attributions: '<a href="https://www.google.at/permissions/geoguidelines/attr-guide.html">Map data ©2015 Google</a>',
        url: 'https://mt1.google.com/vt/lyrs=s&x={x}&y={y}&z={z}'
    })
});

var format_Renda_1 = new ol.format.GeoJSON();
var features_Renda_1 = format_Renda_1.readFeatures(json_Renda_1, {dataProjection:'EPSG:4326', featureProjection:'EPSG:3857'});
var jsonSource_Renda_1 = new ol.source.Vector({attributions:' '});
jsonSource_Renda_1.addFeatures(features_Renda_1);
var lyr_Renda_1 = new ol.layer.Vector({source:jsonSource_Renda_1, style:style_Renda_1, popuplayertitle:'Renda', interactive:true, title:'Renda'});

var format_PPI_2 = new ol.format.GeoJSON();
var features_PPI_2 = format_PPI_2.readFeatures(json_PPI_2, {dataProjection:'EPSG:4326', featureProjection:'EPSG:3857'});
var jsonSource_PPI_2 = new ol.source.Vector({attributions:' '});
jsonSource_PPI_2.addFeatures(features_PPI_2);
var lyr_PPI_2 = new ol.layer.Vector({source:jsonSource_PPI_2, style:style_PPI_2, popuplayertitle:'PPI', interactive:true, title:'PPI'});

var format_Municipios_MS_2025 = new ol.format.GeoJSON();
var features_Municipios_MS_2025 = format_Municipios_MS_2025.readFeatures(json_Municipios_MS_2025_otimizado, {dataProjection:'EPSG:4326', featureProjection:'EPSG:3857'});
var jsonSource_Municipios_Mato_Grosso_do_Sul_2025_3 = new ol.source.Vector({attributions:' '});
jsonSource_Municipios_Mato_Grosso_do_Sul_2025_3.addFeatures(features_Municipios_MS_2025);
var lyr_Municipios_Mato_Grosso_do_Sul_2025_3 = new ol.layer.Vector({source:jsonSource_Municipios_Mato_Grosso_do_Sul_2025_3, style:style_Municipios_Mato_Grosso_do_Sul_2025_3, popuplayertitle:'Municípios de Mato Grosso do Sul', interactive:true, title:'Municípios de Mato Grosso do Sul'});

// A base escolar única é compartilhada pelas duas camadas temáticas.
var format_Escolas_IDEB_2025 = new ol.format.GeoJSON();
var features_Escolas_IDEB_2025 = format_Escolas_IDEB_2025.readFeatures(json_Escolas_IDEB_2025, {dataProjection:'EPSG:4326', featureProjection:'EPSG:3857'});
var jsonSource_Escolas_IDEB_2025 = new ol.source.Vector({attributions:' '});
jsonSource_Escolas_IDEB_2025.addFeatures(features_Escolas_IDEB_2025);
var jsonSource_MetadeMatemtica_4 = jsonSource_Escolas_IDEB_2025;
var jsonSource_MetadePortugus_5 = jsonSource_Escolas_IDEB_2025;
var lyr_MetadeMatemtica_4 = new ol.layer.Vector({source:jsonSource_Escolas_IDEB_2025, style:style_MetadeMatemtica_4, popuplayertitle:'Meta de Matemática', interactive:true, title:'Meta de Matemática'});
var lyr_MetadePortugus_5 = new ol.layer.Vector({source:jsonSource_Escolas_IDEB_2025, style:style_MetadePortugus_5, popuplayertitle:'Meta de Português', interactive:true, title:'Meta de Português'});

lyr_GoogleSatellite_0.setVisible(true); lyr_Renda_1.setVisible(true); lyr_PPI_2.setVisible(true); lyr_Municipios_Mato_Grosso_do_Sul_2025_3.setVisible(true); lyr_MetadeMatemtica_4.setVisible(true); lyr_MetadePortugus_5.setVisible(false);
var layersList = [lyr_GoogleSatellite_0,lyr_Renda_1,lyr_PPI_2,lyr_Municipios_Mato_Grosso_do_Sul_2025_3,lyr_MetadeMatemtica_4,lyr_MetadePortugus_5];
