/* ============================================================
   LAYERS.JS
   Mapa Educacional - MS

   Carregamento inicial:
   - Google Satellite
   - Municípios
   - Meta de Matemática
   - Meta de Português

   Renda e PPI NÃO são carregadas aqui.
   Elas serão carregadas sob demanda pelo index.html.
   ============================================================ */

var wms_layers = [];


/* ============================================================
   GOOGLE SATELLITE
   ============================================================ */

var lyr_GoogleSatellite_0 = new ol.layer.Tile({

    'title': 'Google Satellite',

    'opacity': 1.0,

    source: new ol.source.XYZ({

        attributions:
            '<a href="https://www.google.at/permissions/geoguidelines/attr-guide.html" target="_blank">Map data ©2015 Google</a>',

        url:
            'https://mt1.google.com/vt/lyrs=s&x={x}&y={y}&z={z}'

    })

});


/* ============================================================
   MUNICÍPIOS
   ============================================================ */

var format_Municipios_Mato_Grosso_do_Sul_2025_3 =
    new ol.format.GeoJSON();


var features_Municipios_Mato_Grosso_do_Sul_2025_3 =
    format_Municipios_Mato_Grosso_do_Sul_2025_3.readFeatures(

        json_Municipios_Mato_Grosso_do_Sul_2025_3,

        {
            dataProjection: 'EPSG:4326',
            featureProjection: 'EPSG:3857'
        }

    );


var jsonSource_Municipios_Mato_Grosso_do_Sul_2025_3 =
    new ol.source.Vector({

        attributions: ' '

    });


jsonSource_Municipios_Mato_Grosso_do_Sul_2025_3.addFeatures(
    features_Municipios_Mato_Grosso_do_Sul_2025_3
);


var lyr_Municipios_Mato_Grosso_do_Sul_2025_3 =
    new ol.layer.Vector({

        declutter: false,

        source:
            jsonSource_Municipios_Mato_Grosso_do_Sul_2025_3,

        style:
            style_Municipios_Mato_Grosso_do_Sul_2025_3,

        popuplayertitle:
            'Municípios de Mato Grosso do Sul',

        interactive: true,

        title:
            '<img src="styles/legend/Municipios_Mato_Grosso_do_Sul_2025_3.png" /> Municípios'

    });


/* ============================================================
   META DE MATEMÁTICA
   ============================================================ */

var format_MetadeMatemtica_4 =
    new ol.format.GeoJSON();


var features_MetadeMatemtica_4 =
    format_MetadeMatemtica_4.readFeatures(

        json_MetadeMatemtica_4,

        {
            dataProjection: 'EPSG:4326',
            featureProjection: 'EPSG:3857'
        }

    );


var jsonSource_MetadeMatemtica_4 =
    new ol.source.Vector({

        attributions: ' '

    });


jsonSource_MetadeMatemtica_4.addFeatures(
    features_MetadeMatemtica_4
);


var lyr_MetadeMatemtica_4 =
    new ol.layer.Vector({

        declutter: false,

        source:
            jsonSource_MetadeMatemtica_4,

        style:
            style_MetadeMatemtica_4,

        popuplayertitle:
            'Meta de Matemática',

        interactive: true,

        title:
            'Meta de Matemática<br />\
            <img src="styles/legend/MetadeMatemtica_4_0.png" /> não<br />\
            <img src="styles/legend/MetadeMatemtica_4_1.png" /> sim<br />\
            <img src="styles/legend/MetadeMatemtica_4_2.png" /> SN<br />'

    });


/* ============================================================
   META DE PORTUGUÊS
   ============================================================ */

var format_MetadePortugus_5 =
    new ol.format.GeoJSON();


var features_MetadePortugus_5 =
    format_MetadePortugus_5.readFeatures(

        json_MetadePortugus_5,

        {
            dataProjection: 'EPSG:4326',
            featureProjection: 'EPSG:3857'
        }

    );


var jsonSource_MetadePortugus_5 =
    new ol.source.Vector({

        attributions: ' '

    });


jsonSource_MetadePortugus_5.addFeatures(
    features_MetadePortugus_5
);


var lyr_MetadePortugus_5 =
    new ol.layer.Vector({

        declutter: false,

        source:
            jsonSource_MetadePortugus_5,

        style:
            style_MetadePortugus_5,

        popuplayertitle:
            'Meta de Português',

        interactive: true,

        title:
            'Meta de Português<br />\
            <img src="styles/legend/MetadePortugus_5_0.png" /> não<br />\
            <img src="styles/legend/MetadePortugus_5_1.png" /> sim<br />\
            <img src="styles/legend/MetadePortugus_5_2.png" /> SN<br />'

    });


/* ============================================================
   VISIBILIDADE INICIAL
   ============================================================ */

/*
   Google Satellite:
   VISÍVEL

   Municípios:
   VISÍVEL

   Matemática:
   OCULTA inicialmente

   Português:
   VISÍVEL inicialmente

   Renda:
   NÃO EXISTE AINDA

   PPI:
   NÃO EXISTE AINDA
*/


lyr_GoogleSatellite_0.setVisible(true);

lyr_Municipios_Mato_Grosso_do_Sul_2025_3.setVisible(true);

lyr_MetadeMatemtica_4.setVisible(false);

lyr_MetadePortugus_5.setVisible(true);


/* ============================================================
   LISTA DAS CAMADAS INICIAIS
   ============================================================ */

/*
   IMPORTANTE:

   Renda e PPI foram deliberadamente retiradas desta lista.

   Elas serão adicionadas ao mapa somente quando o usuário
   solicitar.
*/

var layersList = [

    lyr_GoogleSatellite_0,

    lyr_Municipios_Mato_Grosso_do_Sul_2025_3,

    lyr_MetadeMatemtica_4,

    lyr_MetadePortugus_5

];


/* ============================================================
   ALIASES DOS CAMPOS
   ============================================================ */

/*
   Mantemos apenas os aliases realmente necessários.

   Isso não interfere nos dados do mapa.
   Serve apenas para identificar os campos.
*/


lyr_Municipios_Mato_Grosso_do_Sul_2025_3.set(
    'fieldAliases',
    {

        'CD_MUN':
            'Código do município',

        'NM_MUN':
            'Município',

        'CD_UF':
            'Código UF',

        'SIGLA_UF':
            'UF'

    }
);


lyr_MetadeMatemtica_4.set(
    'fieldAliases',
    {

        'ID_ESCOLA':
            'ID da escola',

        'NO_ESCOLA':
            'Nome da escola',

        'NO_MUNICIPIO':
            'Município',

        'ETAPA':
            'Etapa',

        'SG_UF':
            'UF',

        'CO_MUNICIPIO':
            'Código do município',

        'REDE':
            'Rede',

        'VL_INDICADOR_REND_2025':
            'Indicador de rendimento 2025',

        'VL_NOTA_MATEMATICA_2025':
            'Nota de Matemática 2025',

        'VL_NOTA_PORTUGUES_2025':
            'Nota de Português 2025',

        'VL_NOTA_MEDIA_2025':
            'Nota média 2025',

        'VL_OBSERVADO_2025':
            'IDEB observado 2025',

        'LATITUDE':
            'Latitude',

        'LONGITUDE':
            'Longitude',

        'META_MAT':
            'Meta de Matemática',

        'META_PORT':
            'Meta de Português'

    }
);


lyr_MetadePortugus_5.set(
    'fieldAliases',
    {

        'ID_ESCOLA':
            'ID da escola',

        'NO_ESCOLA':
            'Nome da escola',

        'NO_MUNICIPIO':
            'Município',

        'ETAPA':
            'Etapa',

        'SG_UF':
            'UF',

        'CO_MUNICIPIO':
            'Código do município',

        'REDE':
            'Rede',

        'VL_INDICADOR_REND_2025':
            'Indicador de rendimento 2025',

        'VL_NOTA_MATEMATICA_2025':
            'Nota de Matemática 2025',

        'VL_NOTA_PORTUGUES_2025':
            'Nota de Português 2025',

        'VL_NOTA_MEDIA_2025':
            'Nota média 2025',

        'VL_OBSERVADO_2025':
            'IDEB observado 2025',

        'LATITUDE':
            'Latitude',

        'LONGITUDE':
            'Longitude',

        'META_MAT':
            'Meta de Matemática',

        'META_PORT':
            'Meta de Português'

    }
);


/* ============================================================
   FIELD IMAGES
   ============================================================ */

lyr_Municipios_Mato_Grosso_do_Sul_2025_3.set(
    'fieldImages',
    {

        'CD_MUN':
            'TextEdit',

        'NM_MUN':
            'TextEdit',

        'CD_UF':
            'TextEdit',

        'SIGLA_UF':
            'TextEdit'

    }
);


lyr_MetadeMatemtica_4.set(
    'fieldImages',
    {

        'ID_ESCOLA':
            'TextEdit',

        'NO_ESCOLA':
            'TextEdit',

        'NO_MUNICIPIO':
            'TextEdit',

        'ETAPA':
            'TextEdit',

        'SG_UF':
            'TextEdit',

        'CO_MUNICIPIO':
            'TextEdit',

        'REDE':
            'TextEdit',

        'VL_INDICADOR_REND_2025':
            'TextEdit',

        'VL_NOTA_MATEMATICA_2025':
            'TextEdit',

        'VL_NOTA_PORTUGUES_2025':
            'TextEdit',

        'VL_NOTA_MEDIA_2025':
            'TextEdit',

        'VL_OBSERVADO_2025':
            'TextEdit',

        'LATITUDE':
            'TextEdit',

        'LONGITUDE':
            'TextEdit',

        'META_MAT':
            'TextEdit',

        'META_PORT':
            'TextEdit'

    }
);


lyr_MetadePortugus_5.set(
    'fieldImages',
    {

        'ID_ESCOLA':
            'TextEdit',

        'NO_ESCOLA':
            'TextEdit',

        'NO_MUNICIPIO':
            'TextEdit',

        'ETAPA':
            'TextEdit',

        'SG_UF':
            'TextEdit',

        'CO_MUNICIPIO':
            'TextEdit',

        'REDE':
            'TextEdit',

        'VL_INDICADOR_REND_2025':
            'TextEdit',

        'VL_NOTA_MATEMATICA_2025':
            'TextEdit',

        'VL_NOTA_PORTUGUES_2025':
            'TextEdit',

        'VL_NOTA_MEDIA_2025':
            'TextEdit',

        'VL_OBSERVADO_2025':
            'TextEdit',

        'LATITUDE':
            'TextEdit',

        'LONGITUDE':
            'TextEdit',

        'META_MAT':
            'TextEdit',

        'META_PORT':
            'TextEdit'

    }
);


/* ============================================================
   FIM
   ============================================================ */

/*
   NÃO adicionar aqui:

       json_Renda_1
       json_PPI_2

   NÃO adicionar aqui:

       lyr_Renda_1
       lyr_PPI_2

   NÃO fazer:

       readFeatures(json_Renda_1)

   NÃO fazer:

       readFeatures(json_PPI_2)

   Essas duas camadas são carregadas pelo index.html
   somente quando o usuário clicar nos botões.
*/

console.log(
    'Layers inicializadas: Google Satellite, Municípios, Matemática e Português.'
);

console.log(
    'Renda e PPI serão carregadas sob demanda.'
);
