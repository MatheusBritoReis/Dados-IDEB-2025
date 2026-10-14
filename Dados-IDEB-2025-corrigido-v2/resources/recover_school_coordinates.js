/*
 * Recupera geometrias ausentes pelo código INEP usando o serviço georreferenciado
 * do Catálogo de Escolas do INEP (ArcGIS). Não cria coordenadas artificiais.
 */
(function () {
    'use strict';

    var ENDPOINT = 'https://services3.arcgis.com/ba17q0p2zHwzRK3B/ArcGIS/rest/services/inep_escolas_fmt_250609_geocode/FeatureServer/1';
    var META_URL = ENDPOINT + '?f=json';
    var QUERY_URL = ENDPOINT + '/query';
    var CHUNK_SIZE = 400;

    function codeOf(v) {
        if (v === null || v === undefined || String(v).trim() === '') return '';
        var n = Number(String(v).trim());
        return Number.isFinite(n) ? String(Math.round(n)) : String(v).trim();
    }
    function norm(v) {
        return String(v || '').normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/[^a-z0-9]/g, '');
    }
    function findCodeField(meta) {
        var fields = meta.fields || [];
        var found = fields.find(function (f) {
            var n = norm(f.name), a = norm(f.alias);
            return n.includes('inep') || a.includes('inep') || n === 'codigoescola' || a === 'codigoescola';
        });
        return found ? found.name : null;
    }
    async function getJson(url, params) {
        var query = new URLSearchParams(params || {});
        var response = await fetch(url + (url.includes('?') ? '&' : '?') + query.toString(), { mode: 'cors', credentials: 'omit' });
        if (!response.ok) throw new Error('Serviço INEP respondeu HTTP ' + response.status);
        var data = await response.json();
        if (data.error) throw new Error(data.error.message || 'Erro no serviço INEP');
        return data;
    }
    function featureCode(feature, fieldName) {
        var props = feature.getProperties();
        var v = fieldName ? props[fieldName] : undefined;
        if (v === undefined) {
            Object.keys(props).some(function (key) {
                if (norm(key).includes('inep')) { v = props[key]; return true; }
                return false;
            });
        }
        return codeOf(v);
    }
    function rowCode(attrs, codeField) {
        if (attrs[codeField] !== undefined) return codeOf(attrs[codeField]);
        var key = Object.keys(attrs).find(function (k) { return norm(k).includes('inep'); });
        return key ? codeOf(attrs[key]) : '';
    }
    async function recover() {
        if (typeof jsonSource_Escolas_IDEB_2025 === 'undefined' || typeof ol === 'undefined') return;

        var sourceFeatures = jsonSource_Escolas_IDEB_2025.getFeatures();
        var missing = sourceFeatures.filter(function (f) {
            var g = f.getGeometry();
            return !g || !g.getCoordinates || !g.getCoordinates().every(Number.isFinite);
        });
        if (!missing.length) return;

        var meta = await getJson(META_URL);
        var codeField = findCodeField(meta);
        var objectIdField = meta.objectIdField || (meta.fields || []).filter(function (f) { return f.type === 'esriFieldTypeOID'; }).map(function (f) { return f.name; })[0];
        if (!codeField || !objectIdField) throw new Error('Não foi possível identificar os campos INEP e ObjectID no serviço geográfico.');

        var byCode = new Map();
        missing.forEach(function (f) {
            var code = featureCode(f, 'ID_ESCOLA');
            if (code) {
                if (!byCode.has(code)) byCode.set(code, []);
                byCode.get(code).push(f);
            }
        });
        if (!byCode.size) return;

        var idsData = await getJson(QUERY_URL, { where: '1=1', returnIdsOnly: 'true', f: 'json' });
        var ids = idsData.objectIds || [];
        var recovered = new Set();
        for (var i = 0; i < ids.length; i += CHUNK_SIZE) {
            var chunk = ids.slice(i, i + CHUNK_SIZE);
            var data = await getJson(QUERY_URL, {
                objectIds: chunk.join(','),
                outFields: '*',
                returnGeometry: 'true',
                outSR: '4326',
                f: 'json'
            });
            (data.features || []).forEach(function (row) {
                var attrs = row.attributes || {};
                var code = rowCode(attrs, codeField);
                if (!byCode.has(code) || recovered.has(code)) return;
                var x, y;
                if (row.geometry && Number.isFinite(Number(row.geometry.x)) && Number.isFinite(Number(row.geometry.y))) {
                    x = Number(row.geometry.x); y = Number(row.geometry.y);
                } else {
                    var lonKey = Object.keys(attrs).find(function (k) { return norm(k) === 'longitude' || norm(k) === 'longitud'; });
                    var latKey = Object.keys(attrs).find(function (k) { return norm(k) === 'latitude' || norm(k) === 'latitud'; });
                    if (!lonKey || !latKey) return;
                    x = Number(attrs[lonKey]); y = Number(attrs[latKey]);
                }
                if (!Number.isFinite(x) || !Number.isFinite(y) || x < -180 || x > 180 || y < -90 || y > 90) return;
                var point = new ol.geom.Point(ol.proj.transform([x, y], 'EPSG:4326', 'EPSG:3857'));
                byCode.get(code).forEach(function (f) { f.setGeometry(point.clone()); });
                recovered.add(code);
            });
        }
        jsonSource_Escolas_IDEB_2025.changed();
        if (typeof applyStyles === 'function') applyStyles();
        if (typeof map !== 'undefined' && map && map.render) map.render();
        var unresolved = Array.from(byCode.keys()).filter(function (c) { return !recovered.has(c); });
        console.info('[Coordenadas INEP] Recuperadas ' + recovered.size + ' de ' + byCode.size + ' códigos escolares.');
        if (unresolved.length) console.warn('[Coordenadas INEP] Ainda sem coordenadas na fonte: ' + unresolved.join(', '));
    }
    function start() {
        recover().catch(function (err) { console.error('[Coordenadas INEP] Falha ao recuperar coordenadas:', err); });
    }
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start, { once: true });
    else start();
})();
