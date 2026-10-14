var style_MetadeMatemtica_4 = function(feature, resolution){
    var rawValue = feature.get('VL_NOTA_MATEMATICA_2025');
    var value = (rawValue === null || rawValue === undefined || String(rawValue).trim() === '')
        ? NaN
        : Number(rawValue);
    var etapa = String(feature.get('ETAPA') || '').trim();

    var corte = {
        'Anos Iniciais': 225,
        'Anos Finais': 300,
        'Ensino Médio': 350
    }[etapa];

    var color = 'rgba(148,163,184,0.95)'; // sem informação

    if (Number.isFinite(value) && Number.isFinite(corte)) {
        color = value > corte
            ? 'rgba(22,163,74,0.95)'
            : 'rgba(220,38,38,0.95)';
    }

    return [new ol.style.Style({
        image: new ol.style.Circle({
            radius: 7,
            displacement: [0,0],
            stroke: new ol.style.Stroke({
                color: color === 'rgba(148,163,184,0.95)' ? 'rgba(71,85,105,1)' : 'rgba(255,255,255,0.98)',
                width: color === 'rgba(148,163,184,0.95)' ? 2 : 1.5
            }),
            fill: new ol.style.Fill({color: color})
        })
    })];
};
