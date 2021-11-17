let baseLayer = new ol.layer.Tile({
    title: "base",
    source: new ol.source.XYZ({
        url: 'http://www.google.cn/maps/vt?lyrs=m@189&gl=cn&x={x}&y={y}&z={z}'
    })
});
var bSource = new ol.source.Vector({
    wrapX: false,
});
var cSource = new ol.source.Vector({
    wrapX: false,
});
var bLayer = new ol.layer.Vector({
    source: bSource
});
var cLayer = new ol.layer.Vector({
    source: cSource
})
var pointArr = [[0, 0], [20, 30], [50, 30], [75, 40]];
var ctrlFeatures = [];
pointArr.forEach((item, index) => {
    var ctrlPointFeature = new ol.Feature({
        cid: index,
        geometry: new ol.geom.Point(item)
    });
    ctrlPointFeature.setStyle(
        new ol.style.Style({
            image: new ol.style.Circle({
                radius: 5,
                fill: new ol.style.Fill({
                    color: [255, 255, 255, 0.5]
                }),
                stroke: new ol.style.Stroke({
                    color: [122, 122, 122, 1],
                    width: 2
                })
            })
        })
    )
    ctrlFeatures.push(ctrlPointFeature);
    cSource.addFeature(ctrlPointFeature);
})


bSource.addFeature((new ol.format.GeoJSON()).readFeature(genBezierGeom(ctrlFeatures, 0.1)));


let translate = new ol.interaction.Translate({
    hitTolerance: 5,
});
let map = new ol.Map({
    target: 'map',
    interactions: ol.interaction.defaults().extend([
        translate
    ]),
    layers: [baseLayer, bLayer, cLayer],
    view: new ol.View({
        center: [0, 0],
        projection: "EPSG:4326",
        zoom: 4
    })
});
var startCoord=[0,0];


translate.on('translating', (evt) => {
    if (evt.features.item(0).getGeometry().getType() === 'Point') {
        bSource.clear();
        bSource.addFeature((new ol.format.GeoJSON()).readFeature(genBezierGeom(cSource.getFeatures(), 0.001)));
    } else {
        const deltaX = evt.coordinate[0] - startCoord[0];
        const deltaY = evt.coordinate[1] - startCoord[1];
        startCoord=evt.coordinate.concat();
        cSource.getFeatures().forEach(function (feature) {
            const geom = feature.getGeometry();
            geom.translate(deltaX, deltaY);
            feature.setGeometry(geom);
        });
    }
})
translate.on('translatestart', (evt) => {
    startCoord=evt.coordinate.concat();
})


function getCoordinatesBezier(controlPoints, t) {
    var x = 0,
        y = 0,
        n = controlPoints.length - 1;
    controlPoints.forEach(function (item, index) {
        let coord = item.getGeometry().getFirstCoordinate();
        if (!index) {
            x += coord[0] * Math.pow((1 - t), n - index) * Math.pow(t, index)
            y += coord[1] * Math.pow((1 - t), n - index) * Math.pow(t, index)
        } else {
            x += factorial(n) / factorial(index) / factorial(n - index) * coord[0] * Math.pow((1 - t), n - index) * Math.pow(t, index)
            y += factorial(n) / factorial(index) / factorial(n - index) * coord[1] * Math.pow((1 - t), n - index) * Math.pow(t, index)
        }
    })
    return [x, y]
}


function genBezierGeom(controlPoints, step) {
    const nodeArr = controlPoints.sort(function (a, b) {
        return a.get('cid') - b.get('cid')
    });
    if (nodeArr.length === 2) {
        var lineFeature = turf.lineString([nodeArr[0].getGeometry().getFirstCoordinate(), nodeArr[1].getGeometry().getFirstCoordinate()]);
        return lineFeature
    } else {
        var bezierPoints = [];
        for (i = 0; i < 1; i += ((step !== null) ? step : 0.01)) {
            bezierPoints.push(getCoordinatesBezier(nodeArr, i))
        }
        var bezierLine = turf.lineString(bezierPoints);
        return bezierLine
    }
}

function factorial(num) {
    if (num <= 1) {
        return 1;
    } else {
        return num * factorial(num - 1);
    }
}