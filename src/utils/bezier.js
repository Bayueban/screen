//阶乘
function factorial(num) {
    if (num <= 1) {
        return 1;
    } else {
        return num * factorial(num - 1);
    }
}

/*
 * 生成贝塞尔曲线插值点
 * @para n {number} 控制点数量
 * @para arrPoints {array} 控制点坐标集合
 */
function createBezierCurvePoints(n, arrPoints) {
    var Ptx = 0;
    var Pty = 0;

    var arrbline = [];
    for (var t = 0; t < 1; t = t + 0.01) {
        Ptx = 0;
        Pty = 0;
        for (var i = 0; i <= n; i++) {
            Ptx += (factorial(n) / (factorial(i) * factorial(n - i))) * Math.pow((1 - t), n - i) * Math.pow(t, i) * arrPoints[i][0];
            Pty += (factorial(n) / (factorial(i) * factorial(n - i))) * Math.pow((1 - t), n - i) * Math.pow(t, i) * arrPoints[i][1];
        }

        arrbline.push([Ptx, Pty]);
    }
    return arrbline;
}

/******************创建线样式***************/
function createLineStyle(color, width, linecap, linejoin) {
    return new ol.style.Style({
        stroke: new ol.style.Stroke(({
            color: color,  //颜色
            width: width,  //宽度
            lineCap: linecap,
            lineJoin: linejoin
        }))
    });
}

/******************绘制线***************/
function createLine(lid, lx, arrCoordinate, style) {
    var f = new ol.Feature({
        geometry: new ol.geom.LineString(arrCoordinate),
        id: lid,           //线的唯一标识
        lx: lx            //类型，区别于其它Features
    });
    f.setId(lid);  //不能删除
    f.setStyle(style);
    return f;
}

/******************在地图上标记一个点对象***************/
//随机生成当前范围内的一个经纬度坐标，用于在地图上标点
function randomPointJWD() {
    var topleftPoint = map.getCoordinateFromPixel([10, 10]);
    var centerPoint = map.getView().getCenter();
    var bottomrightPoint = [centerPoint[0] + (centerPoint[0] - topleftPoint[0]), centerPoint[1] + (centerPoint[1] - topleftPoint[1])];
    var jd = topleftPoint[0] + (bottomrightPoint[0] - topleftPoint[0]) * Math.random();
    var wd = bottomrightPoint[1] + (topleftPoint[1] - bottomrightPoint[1]) * Math.random();
    return [jd, wd];
}


/*******************在地图初始化函数中初始化贝塞尔曲线标注层************************/
source_bezier = new ol.source.Vector();

vector_bezier = new ol.layer.Vector({
    source: source_bezier
});

map.addLayer(vector_bezier);

/**************************绘制贝塞尔曲线*****************************/
function drawBezierCurve(n) {
    //n表示绘制贝塞尔曲线的阶数
    var arrPoints = [];
    for (var i = 0; i <= n; i++) {
        arrPoints.push(randomPointJWD());
    }
    var arrbline = createBezierCurvePoints(n, arrPoints);
    var style = createLineStyle("#ff2723", 4, 'round', 'round');
    var f = createLine("bezier_nj" + Math.random(), "bezier", arrbline, style);
    source_bezier.addFeature(f);
}

function clearBezierCurve() {
    source_bezier.clear();
}