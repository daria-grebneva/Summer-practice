function PointJS(qc, ha, ia, ya, Fc) {
  this._logo = "http://pointjs.ru/PjsMin.png";
  var g = window, t = this, za = !0, hb = !0, Hb = !1, ma = !1, La = !0, p = ha, q = ia, Q = p / 2, R = q / 2,
    f = {x: 0, y: 0},
    u = {fillStyle: "black", strokeStyle: "black", globalAlpha: 1, font: "sans-serif", textBaseline: "top"},
    E = function (a) {
      console.log("[PointJS] : ", a)
    };
  "undefined" != typeof POINTJS_USER_LOG && (E = POINTJS_USER_LOG);
  var Ma = function (a) {
    var b = decodeURI(a.stack.toString().replace(/(@|[\(\)]|[\w]+:\/\/)/g, ""));
    b = b.split(/\n/);
    b = ("" == b[2] ? b[0] : b[1]).split("/");
    b = b[b.length -
    1].split(":");
    E('ERROR "' + a.toString() + '" \n in      ' + b[0] + " \n line :   " + b[1] + " \n symbol : " + b[2])
  };
  this.game = {};
  this.levels = {};
  this.camera = {};
  this.keyControl = {};
  this.mouseControl = {};
  this.touchControl = {};
  this.actionControl = {};
  this.system = {};
  this.vector = {};
  this.math = {};
  this.colors = {};
  this.brush = {};
  this.audio = {};
  this.wAudio = {};
  this.resources = {};
  this.tiles = {};
  this.OOP = {};
  this.GL = {};
  this.memory = {};
  this.zList = {};
  this.system.log = E;
  this.system.consoleLog = function (a) {
    this.log = !0 === a ? console.log : E
  };
  this.system.setTitle =
    function (a) {
      g.document.title = a
    };
  this.system.setSettings = function (a) {
    za = v(a.isShowError) ? a.isShowError : !0;
    hb = v(a.isStopForError) ? a.isStopForError : !0;
    Hb = v(a.isAutoClear) ? a.isAutoClear : !1;
    v(a.isZBuffer)
  };
  this.system.setDefaultSettings = function (a) {
    for (var b in a)u[b] = a[b];
    k.save()
  };
  this.system.setSmoothing = function (a) {
    La = a;
    Ib()
  };
  var rc = {
    name: "PointJS",
    desc: "HTML5 2D Game Engine for JavaScript",
    author: "Skaner (skaner0@yandex.ru)",
    version: "0.1.2.0"
  };
  this.system.getInfo = function () {
    return rc
  };
  var Jb = "", Kb =
    "", Lb = function (a, b) {
    var c = h.createShader(a);
    h.shaderSource(c, b);
    h.compileShader(c);
    return h.getShaderParameter(c, h.COMPILE_STATUS) ? c : (E("Error shader compilation : " + h.getShaderInfoLog(c)), h.deleteShader(c), null)
  }, h = !1, w = !1, sc = function () {
    w = g.document.createElement("canvas");
    w.width = m.width;
    w.height = m.height;
    w.style.position = "fixed";
    w.style.left = 0;
    w.style.top = 0;
    w.style.zIndex = m.style.zIndex + 1;
    w.id = "PointJS-canvas_1";
    w.style.backgroundColor = ya.backgroundColor ? ya.backgroundColor : "black";
    r.attach(w);
    r.addEvent("onload", "hideSourceCanvas", function () {
      m.style.display = "none"
    });
    h = w.getContext("webgl") || w.getContext("experimental-webgl");
    h.viewport(0, 0, p, q);
    h.clearColor(0, 0, 0, 1);
    h.clear(h.COLOR_BUFFER_BIT)
  }, ib, jb, Mb, Nb, kb, lb, tc = function () {
    var a = h.createBuffer();
    h.bindBuffer(h.ARRAY_BUFFER, a);
    h.bufferData(h.ARRAY_BUFFER, new Float32Array([0, 0, p, 0, 0, q, 0, q, p, 0, p, q]), h.STATIC_DRAW);
    jb = h.getAttribLocation(X, "aPosition");
    Mb = h.getUniformLocation(X, "uResolution");
    ib = h.getAttribLocation(X, "aTextCoord");
    kb = h.getUniformLocation(X,
      "uInversion");
    lb = h.getUniformLocation(X, "uMirrorX");
    h.uniform2f(Mb, p, q);
    h.enableVertexAttribArray(jb);
    h.vertexAttribPointer(jb, 2, h.FLOAT, !1, 0, 0);
    a = h.createBuffer();
    h.bindBuffer(h.ARRAY_BUFFER, a);
    h.bufferData(h.ARRAY_BUFFER, new Float32Array([0, 0, 1, 0, 0, 1, 0, 1, 1, 0, 1, 1]), h.STATIC_DRAW);
    h.enableVertexAttribArray(ib);
    h.vertexAttribPointer(ib, 2, h.FLOAT, !1, 0, 0);
    Nb = h.createTexture();
    h.bindTexture(h.TEXTURE_2D, Nb);
    h.texParameteri(h.TEXTURE_2D, h.TEXTURE_WRAP_S, h.CLAMP_TO_EDGE);
    h.texParameteri(h.TEXTURE_2D, h.TEXTURE_WRAP_T,
      h.CLAMP_TO_EDGE);
    h.texParameteri(h.TEXTURE_2D, h.TEXTURE_MIN_FILTER, h.NEAREST);
    h.texParameteri(h.TEXTURE_2D, h.TEXTURE_MAG_FILTER, h.NEAREST)
  };
  this.GL.filter = function (a, b) {
    if (!h)return E("GL is not inited. Use a initGL() function.");
    "inversion" == a && h.uniform1i(kb, 1);
    "mirror-x" == a && h.uniform1i(lb, 1)
  };
  var ja = function (a, b) {
    this.x = a || 0;
    this.y = b || 0
  };
  ja.prototype = {
    abs: function () {
      return new ja(Math.abs(this.x), Math.abs(this.y))
    }, invert: function () {
      return new ja(-this.x, -this.y)
    }, plus: function (a) {
      return new ja(this.x +
        a.x, this.y + a, y)
    }, minus: function (a) {
      return new ja(this.x - a.x, this.y - a, y)
    }, inc: function (a) {
      return new ja(this.x * a.x, this.y * a, y)
    }, div: function (a) {
      return new ja(this.x / a.x, this.y / a, y)
    }
  };
  var e = function (a, b) {
    return new ja(a, b)
  }, D = function (a, b) {
    return {w: a, h: b}
  }, ua = function (a, b) {
    return {x: a.x + b.x, y: a.y + b.y}
  }, N = function (a, b, c) {
    if (0 != c) {
      var d = A(c);
      c = a.x - b.x;
      a = a.y - b.y;
      var l = Math.cos(d);
      d = Math.sin(d);
      return e(c * l - a * d + b.x, c * d + a * l + b.y)
    }
    return e(a.x, a.y)
  }, Aa = function (a, b) {
    return 180 / Math.PI * Math.atan2(b.y - a.y, b.x -
        a.x)
  }, na = function (a, b) {
    var c, d = 0;
    var l = 0;
    for (c = b.length - 1; l < b.length; c = l++)b[l].y > a.y != b[c].y > a.y && a.x < (b[c].x - b[l].x) * (a.y - b[l].y) / (b[c].y - b[l].y) + b[l].x && (d = !d);
    return d
  };
  this.vector.point = e;
  this.vector.v2d = e;
  this.vector.size = D;
  this.vector.getPointAngle = N;
  this.vector.isPointIn = na;
  this.vector.pointMinus = function (a, b) {
    return {x: a.x - b.x, y: a.y - b.y}
  };
  this.vector.pointPlus = ua;
  this.vector.pointInc = function (a, b) {
    return {x: a.x * b.x, y: a.y * b.y}
  };
  this.vector.pointDiv = function (a, b) {
    return {
      x: a.x / (0 != b.x ? b.x : 1),
      y: a.y / (0 != b.y ? b.y : 1)
    }
  };
  this.vector.pointAbs = function (a) {
    return {x: Math.abs(a.x), y: Math.abs(a.y)}
  };
  this.vector.getMidPoint = function (a, b) {
    return v(b) ? e((a.x + b.x) / 2, (a.y + b.y) / 2) : 0
  };
  this.vector.getDistance = function (a, b) {
    return Math.sqrt(Math.pow(b.x - a.x, 2) + Math.pow(b.y - a.y, 2))
  };
  this.vector.isSame = function (a, b) {
    return v(b) ? a.x == b.x && a.y == b.y : !1
  };
  this.vector.getAngle2Points = Aa;
  this.vector.newStaticBox = function (a, b, c, d) {
    return {x: a, y: b, w: a + c, h: b + d}
  };
  this.vector.newDynamicBoxRect = function (a, b, c, d) {
    return [e(a,
      b), e(a + c, b), e(a + c, b + d), e(a, b + d)]
  };
  this.vector.moveCollision = function (a, b, c, d) {
    for (var l = e(c.x, c.y), f = 0, k = b.length, g; f < k; f += 1)if (g = b[f], !(a.getDistanceC(g.getPositionC()) > (g.w + g.h) / 2 + (a.w + a.h) / 2)) {
      var h = g.getStaticBox();
      if (a.isIntersect(g)) {
        var m = a.getStaticBox(), n = Math.abs(c.x), p = Math.abs(c.y);
        m.x + m.w > h.x + 10 + n && m.x < h.x + h.w - 10 - n && (0 < c.y && m.y + m.h < h.y + h.h / 2 + p ? l.y = 0 : 0 > c.y && m.y > h.y + h.h - h.h / 2 - p && (l.y = 0));
        m.y + m.h > h.y + 10 + p && m.y < h.y + h.h - 10 - p && (0 < c.x && m.x + m.w < h.x + h.w / 2 + n ? l.x = 0 : 0 > c.x && m.x > h.x + h.w - h.w / 2 - n && (l.x =
            0));
        d && d(a, g)
      }
    }
    a.move(l);
    return l
  };
  this.vector.moveCollisionAngle = function (a, b, c, d, l) {
    var f = e();
    l = math.a2r(OOP.isDef(l) ? l : a.angle);
    f.x = c * Math.cos(l);
    f.y = c * Math.sin(l);
    c = 0;
    l = b.length;
    for (var k; c < l; c += 1)if (k = b[c], !(a.getDistanceC(k.getPositionC()) > (k.w + k.h) / 2 + (a.w + a.h) / 2)) {
      var g = k.getStaticBox();
      if (a.isIntersect(k)) {
        var h = a.getStaticBox(), m = Math.abs(f.x), n = Math.abs(f.y);
        h.x + h.w > g.x + 10 + m && h.x < g.x + g.w - 10 - m && (0 < f.y && h.y + h.h < g.y + g.h / 2 + n ? f.y = 0 : 0 > f.y && h.y > g.y + g.h - g.h / 2 - n && (f.y = 0));
        h.y + h.h > g.y + 10 + n && h.y < g.y +
        g.h - 10 - n && (0 < f.x && h.x + h.w < g.x + g.w / 2 + m ? f.x = 0 : 0 > f.x && h.x > g.x + g.w - g.w / 2 - m && (f.x = 0));
        d && d(a, k)
      }
    }
    a.move(f);
    return f
  };
  var Ob = {}, mb = function () {
    var a = (new Date).getTime();
    Ob[a] && (a = mb());
    Ob[a] = !0;
    return a
  }, A = function (a) {
    return Math.PI / 180 * a
  }, ba = function (a, b, c) {
    var d = Math.floor(Math.random() * (b - a + 1) + a);
    return c && 0 == d ? ba(a, b, c) : d
  }, nb = function (a) {
    return 0 > a ? -1 : 1
  };
  this.math.limit = function (a, b) {
    a = Math.abs(a);
    b = Math.abs(b);
    var c = nb(a);
    return a < b ? a * c : b * c
  };
  this.math.sign = nb;
  this.math.a2r = A;
  this.math.random = ba;
  this.math.toInt =
    function (a) {
      return a >> 0
    };
  this.math.uid = mb;
  this.math.toZiro = function (a, b) {
    if (0 == a)return 0;
    var c = nb(a);
    b = Math.abs(b);
    a = Math.abs(a);
    return 0 < a && (a -= b, a < b) ? 0 : a * c
  };
  var uc = 0, r = {
    loaded: !1,
    events: {onload: [], preLoop: [], postLoop: [], gameBlur: [], gameFocus: [], gameResize: []},
    addEvent: function (a, b, c) {
      "onload" == a && r.loaded ? c() : r.events[a].push({id: b, func: c})
    },
    delEvent: function (a, b) {
      x(r.events[a], function (a, d, l) {
        a.id == b && l.splice(d, 1)
      })
    },
    runEvent: function (a) {
      x(r.events[a], function (a) {
        "function" == typeof a.func && a.func()
      })
    },
    attach: function (a) {
      var b = function () {
        g.document.body.appendChild(a)
      };
      r.loaded ? b() : r.addEvent("onload", "attachElement_PointJS" + (uc += 1), b)
    },
    getWH: function () {
      return {
        w: parseInt(g.document.documentElement.clientWidth || g.innerWidth || g.document.body.clientWidth),
        h: parseInt(g.document.documentElement.clientHeight || g.innerHeight || g.document.body.clientHeight)
      }
    }
  };
  this.system.delEvent = function (a, b) {
    r.delEvent(a, b)
  };
  this.system.addEvent = function (a, b, c) {
    r.addEvent(a, b, c)
  };
  this.system.attachDOM = function (a) {
    r.attach(a)
  };
  this.system.newDOM = function (a, b) {
    var c = g.document.createElement(a);
    c.style.position = "fixed";
    c.style.left = 0;
    c.style.top = 0;
    c.style.zIndex = m.style.zIndex + 1;
    c.style.border = "none";
    if (b) {
      var d = function (a) {
        a.stopPropagation()
      };
      c.addEventListener("touchstart", d, !1);
      c.addEventListener("touchend", d, !1);
      c.addEventListener("touchmove", d, !1);
      c.addEventListener("mousedown", d, !1);
      c.addEventListener("mousepress", d, !1);
      c.addEventListener("mouseup", d, !1);
      c.addEventListener("mousemove", d, !1);
      c.addEventListener("keypress",
        d, !1);
      c.addEventListener("keydown", d, !1);
      c.addEventListener("keyup", d, !1);
      c.addEventListener("click", d, !1);
      c.addEventListener("wheel", d, !1);
      c.addEventListener("mousewheel", d, !1);
      c.addEventListener("contextmenu", d, !1);
      c.addEventListener("selectstart", d, !1);
      c.addEventListener("dragstart", d, !1);
      c.addEventListener("DOMMouseScroll", d, !1)
    }
    r.attach(c);
    return c
  };
  var m = g.document.createElement("canvas");
  m.crossOrigin = "anonymous";
  m.width = parseInt(ha);
  m.height = parseInt(ia);
  m.style.position = "fixed";
  m.style.left =
    0;
  m.style.top = 0;
  m.style.zIndex = 1E3;
  m.id = "PointJS-canvas_0";
  m.style.backgroundColor = "black";
  if ("object" == typeof ya)for (var ob in ya)ob.match(/margin|padding|position/) || (m.style[ob] = ya[ob]);
  r.addEvent("onload", "Window_Hide_Scroll", function () {
    g.document.body.style.overflow = "hidden";
    pb = {x: parseInt(m.style.left), y: parseInt(m.style.top)}
  });
  var pb = e(0, 0), k = null;
  h = null;
  var ca = !1;
  k = m.getContext("2d");
  if ("GL2D" == qc) {
    sc();
    Kb = "attribute vec2 aPosition; attribute vec2 aTextCoord; uniform vec2 uResolution; uniform int uMirrorX; varying vec2 vTextureCoord; void main() {    vec2 zeroToOne = aPosition / uResolution;    vec2 zeroToTwo = zeroToOne * 2.0;    vec2 clipSpace = zeroToTwo - 1.0;    gl_Position = vec4(clipSpace * vec2((uMirrorX == 1 ? -1 : 1), -1), 0, 1);    vTextureCoord = aTextCoord; }";
    Jb = "precision mediump float; uniform sampler2D texture; varying vec2 vTextureCoord; uniform int uInversion; void main() { \tvec4 texColor = texture2D(texture,vTextureCoord.xy); \tvec4 finalColor; \tfinalColor = texColor; \tif (uInversion == 1) \t\tfinalColor = 1.0 - finalColor; \tgl_FragColor = finalColor; }";
    var X = h.createProgram();
    h.attachShader(X, Lb(h.VERTEX_SHADER, Kb));
    h.attachShader(X, Lb(h.FRAGMENT_SHADER, Jb));
    h.linkProgram(X);
    h.getProgramParameter(X, h.LINK_STATUS) || E("Can't install shader");
    h.useProgram(X);
    tc();
    ca = !0;
    r.addEvent("postLoop", "drawGL", function () {
      h ? (h.texImage2D(h.TEXTURE_2D, 0, h.RGBA, h.RGBA, h.UNSIGNED_BYTE, m), h.drawArrays(h.TRIANGLES, 0, 6), h.uniform1i(kb, 0), h.uniform1i(lb, 0)) : E("GL is not inited. Use a initGL() function.")
    })
  } else r.attach(m), k.textBaseline = u.textBaseline;
  this.system.setStyle = function (a) {
    if ("object" == typeof a)for (var b in a)m.style[b] = a[b]
  };
  this.system.getCanvas = function () {
    return m
  };
  this.system.getContext = function () {
    return k
  };
  this.system.resize = function (a,
                                 b) {
    p = a || ha;
    q = b || ia;
    Q = p / 2;
    R = q / 2;
    m.width = p;
    m.height = q;
    ca && (w.width = m.width, w.height = m.height, h.viewport(0, 0, p, q))
  };
  this.system.initFullPage = function () {
    r.addEvent("gameResize", "PointJS_resizeGame", function () {
      p = r.getWH().w;
      q = r.getWH().h;
      Q = p / 2;
      R = q / 2;
      m.width = p;
      m.height = q;
      ca && (w.width = m.width, w.height = m.height, h.viewport(0, 0, p, q));
      k.textBaseline = u.textBaseline
    });
    r.runEvent("gameResize", "PointJS_resizeGame")
  };
  var V = !1, vc = function () {
    V || (this.requestFullscreen ? (this.requestFullscreen(), V = !0) : this.mozRequestFullScreen ?
      (this.mozRequestFullScreen(), V = !0) : this.webkitRequestFullscreen && (this.webkitRequestFullscreen(), V = !0), p = r.getWH().w, q = r.getWH().h, Q = p / 2, R = q / 2, m.width = p, m.height = q, ca && (w.width = m.width, w.height = m.height, h.viewport(0, 0, p, q)))
  }, qb = function (a) {
    V = Pb(g.document.fullscreenElement || g.document.mozFullScreenElement || g.document.webkitFullscreenElement)
  };
  g.document.addEventListener("webkitfullscreenchange", qb);
  g.document.addEventListener("mozfullscreenchange", qb);
  g.document.addEventListener("fullscreenchange",
    qb);
  this.system.initFullScreen = function () {
    V || (g.document.documentElement.onclick = vc, Ba || (r.addEvent("gameResize", "PointJS_initFullScreen", function () {
      p = r.getWH().w;
      q = r.getWH().h;
      Q = p / 2;
      R = q / 2;
      m.width = p;
      m.height = q;
      ca && (w.width = m.width, w.height = m.height, h.viewport(0, 0, p, q));
      k.textBaseline = u.textBaseline
    }), r.runEvent("gameResize", "PointJS_initFullScreen")))
  };
  this.system.exitFullScreen = function () {
    V && (r.delEvent("gameResize", "PointJS_initFullScreen"), g.document.exitFullscreen ? (g.document.exitFullscreen(),
      V = !1) : g.document.mozCancelFullScreen ? (g.document.mozCancelFullScreen(), V = !1) : g.document.webkitExitFullscreen && (g.document.webkitExitFullscreen(), V = !1), p = ha, q = ia, Q = p / 2, R = q / 2, m.width = p, m.height = q, ca && (w.width = m.width, w.height = m.height, h.viewport(0, 0, p, q)), g.document.documentElement.onclick = function () {
    })
  };
  this.system.isFullScreen = function () {
    return V
  };
  this.system.exitFullPage = function () {
    p = ha;
    q = ia;
    Q = p / 2;
    R = q / 2;
    m.width = p;
    m.height = q;
    ca && (w.width = m.width, w.height = m.height, h.viewport(0, 0, p, q))
  };
  var Y = !1, Ba =
    !1, Qb = ha, Rb = ia, Sb = !1;
  this.system.initFullScale = function (a) {
    Ba || (a && (Sb = !0), r.addEvent("gameResize", "PointJS_initFullScale", function () {
      var a = Qb, c = Rb, d = r.getWH();
      Sb ? (a = d.w, c = d.h) : d.w < d.h ? (c = d.w / p, a = d.w, c *= q) : d.h < d.w && (a = d.h / q, c = d.h, a *= p);
      Qb = a;
      Rb = c;
      Y = {w: a / p, h: c / q};
      m.style.width = a + "px";
      m.style.height = c + "px";
      ca && (w.style.width = m.style.width, w.style.height = m.style.height, h.viewport(0, 0, p, q))
    }), r.runEvent("gameResize", "PointJS_initFullScale"), Ba = !0)
  };
  this.system.exitFullScale = function () {
    Ba && (Ba = !1, r.delEvent("gameResize",
      "PointJS_initFullScale"), m.style.width = ha + "px", m.style.height = ia + "px", ca && (w.style.width = m.style.width, w.style.height = m.style.height, h.viewport(0, 0, p, q)))
  };
  this.system.getWH = function () {
    return r.getWH()
  };
  var F = !1;
  this.actionControl.initActionControl = function () {
    t.touchControl.isTouchSupported() && (F = !0, t.touchControl.initTouchControl());
    t.mouseControl.initMouseControl();
    return this
  };
  this.actionControl.isPress = function () {
    return F ? t.touchControl.isPress() : t.mouseControl.isPress("LEFT")
  };
  this.actionControl.isDown =
    function () {
      return F ? t.touchControl.isDown() : t.mouseControl.isDown("LEFT")
    };
  this.actionControl.isUp = function () {
    return F ? t.touchControl.isUp() : t.mouseControl.isUp("LEFT")
  };
  this.actionControl.isInObject = function (a) {
    return F ? t.touchControl.isInObject(a) : t.mouseControl.isInObject(a)
  };
  this.actionControl.isInStatic = function (a) {
    return F ? t.touchControl.isInStatic(a) : t.mouseControl.isInStatic(a)
  };
  this.actionControl.isInDynamic = function (a) {
    return F ? t.touchControl.isInDynamic(a) : t.mouseControl.isInDynamic(a)
  };
  this.actionControl.isPeekObject = function (a) {
    return F ? t.touchControl.isPeekObject(a) : t.mouseControl.isPeekObject("LEFT", a)
  };
  this.actionControl.isPeekStatic = function (a) {
    return F ? t.touchControl.isPeekStatic(a) : t.mouseControl.isPeekStatic("LEFT", a)
  };
  this.actionControl.isPeekDynamic = function (a) {
    return F ? t.touchControl.isPeekDynamic(a) : t.mouseControl.isPeekDynamic("LEFT", a)
  };
  this.actionControl.getPosition = function (a) {
    return F ? t.touchControl.getPosition() : t.mouseControl.getPosition()
  };
  this.actionControl.getPositionS =
    function (a) {
      return F ? t.touchControl.getPositionS() : t.mouseControl.getPositionS()
    };
  this.actionControl.getMouse = function () {
    return t.mouseControl
  };
  this.actionControl.getTouch = function () {
    return F ? t.touchControl : !1
  };
  this.actionControl.getActiveControl = function () {
    return F ? t.touchControl : t.mouseControl
  };
  this.actionControl.getActiveControlName = function () {
    return F ? "touchControl" : "mouseControl"
  };
  this.actionControl.getSpeed = function () {
    if (!F)return t.mouseControl.getSpeed() || t.touchControl.getSpeed()
  };
  var rb =
    !1, Na = {
    LEFT: 37,
    RIGHT: 39,
    UP: 38,
    DOWN: 40,
    SPACE: 32,
    CTRL: 17,
    SHIFT: 16,
    ALT: 18,
    ESC: 27,
    ENTER: 13,
    MINUS: 189,
    PLUS: 187,
    CAPS_LOCK: 20,
    BACKSPACE: 8,
    TAB: 9,
    Q: 81,
    W: 87,
    E: 69,
    R: 82,
    T: 84,
    Y: 89,
    U: 85,
    I: 73,
    O: 79,
    P: 80,
    A: 65,
    S: 83,
    D: 68,
    F: 70,
    G: 71,
    H: 72,
    J: 74,
    K: 75,
    L: 76,
    Z: 90,
    X: 88,
    V: 86,
    B: 66,
    N: 78,
    M: 77,
    0: 48,
    1: 49,
    2: 50,
    3: 51,
    4: 52,
    5: 53,
    6: 54,
    7: 55,
    8: 56,
    C: 67,
    9: 57,
    F1: 112,
    F2: 113,
    F3: 114,
    F4: 115,
    F5: 116,
    F6: 117,
    F7: 118,
    F8: 119,
    F9: 120,
    F10: 121,
    F11: 122,
    F12: 123
  }, sb = {
    37: "LEFT",
    39: "RIGHT",
    38: "UP",
    40: "DOWN",
    32: "SPACE",
    17: "CTRL",
    16: "SHIFT",
    18: "ALT",
    27: "ESC",
    13: "ENTER",
    189: "MINUS",
    187: "PLUS",
    20: "CAPS_LOCK",
    8: "BACKSPACE",
    9: "TAB",
    81: "Q",
    87: "W",
    69: "E",
    82: "R",
    84: "T",
    89: "Y",
    85: "U",
    73: "I",
    79: "O",
    80: "P",
    65: "A",
    83: "S",
    68: "D",
    70: "F",
    71: "G",
    72: "H",
    74: "J",
    75: "K",
    76: "L",
    90: "Z",
    88: "X",
    86: "V",
    66: "B",
    78: "N",
    77: "M",
    48: "0",
    49: "1",
    50: "2",
    51: "3",
    52: "4",
    53: "5",
    54: "6",
    55: "7",
    56: "8",
    67: "C",
    57: "9",
    112: "F1",
    113: "F2",
    114: "F3",
    115: "F4",
    116: "F5",
    117: "F6",
    118: "F7",
    119: "F8",
    120: "F9",
    121: "F10",
    122: "F11",
    123: "F12"
  }, wc = {
    8: !0, 9: !0, 13: !0, 18: !0, 16: !0, 17: !0, 27: !0, 112: !0, 113: !0, 114: !0, 115: !0, 116: !0,
    117: !0, 118: !0, 119: !0, 120: !0, 121: !0, 122: !0, 123: !0
  };
  this.keyControl.getKeyList = function () {
    var a, b = [];
    for (a in Na)b.push(a);
    return b
  };
  var ka = {}, Ca = {}, oa = {}, Da = !1, Ea = !1, Oa = !1, Pa = !1, xc = function (a) {
    O(oa, function (a, c, d) {
      1 == a && (d[c] = 2)
    })
  };
  this.keyControl.getCountKeysDown = function () {
    var a = 0;
    O(ka, function (b, c) {
      b && a++
    });
    return a
  };
  this.keyControl.getAllKeysDown = function () {
    var a = [];
    O(ka, function (b, c) {
      b && a.push(sb[c])
    });
    return a
  };
  this.keyControl.getLastKeyPress = function () {
    return Pa ? sb[Pa] : !1
  };
  this.keyControl.isDown =
    function (a) {
      return 1 == ka[Na[a]]
    };
  this.keyControl.isUp = function (a) {
    return 1 == Ca[Na[a]]
  };
  this.keyControl.isPress = function (a) {
    return 1 == oa[Na[a]]
  };
  this.keyControl.getInputChar = function () {
    return Da
  };
  this.keyControl.getInputKey = function () {
    return sb[Ea]
  };
  this.keyControl.setInputMode = function (a) {
    Oa = a
  };
  this.keyControl.isInputMode = function () {
    return Oa
  };
  this.keyControl.exitKeyControl = function () {
    g.onkeydown = function () {
    };
    g.onkeypress = function () {
    };
    g.onkeyup = function () {
    };
    r.delEvent("postLoop", "PointJS_clearAllKeyUp");
    ka = {};
    Ca = {};
    oa = {};
    rb = Oa = Ea = Da = !1
  };
  this.keyControl.initControl = this.keyControl.initKeyControl = function () {
    if (rb)return this;
    rb = !0;
    g.onkeydown = function (a) {
      if (Oa)return Ea = a.keyCode, wc[a.keyCode] ? (a.preventDefault(), !1) : !0;
      a.preventDefault();
      2 != oa[a.keyCode] && (oa[a.keyCode] = 1, Pa = a.keyCode);
      ka[a.keyCode] = !0;
      return !1
    };
    g.onkeypress = function (a) {
      var b = !1;
      0 != a.which && 0 != a.charCode && 32 <= a.which && (b = String.fromCharCode(a.which));
      Da = b
    };
    g.onkeyup = function (a) {
      a.preventDefault();
      1 == ka[a.keyCode] && (Ca[a.keyCode] =
        !0);
      ka[a.keyCode] = !1;
      delete oa[a.keyCode];
      return !1
    };
    r.addEvent("postLoop", "PointJS_clearAllKeyUp", function () {
      Ca = {};
      xc();
      Pa = Ea = Da = !1
    });
    return this
  };
  var tb = !1, G = e(0, 0), Qa = e(0, 0);
  e(0, 0);
  var Fa = !0, Ra = "", Sa = !1, pa = e(0, 0), Ta = !1, ub = {LEFT: 1, RIGHT: 3, MIDDLE: 2}, Ua = {}, Va = {}, Ga = {},
    Ha = 0, Tb = function () {
      Ua = {};
      Va = {};
      Ga = {};
      Ha = 0;
      Ta = !1
    }, yc = function () {
      O(Ga, function (a, b, c) {
        1 == a && (c[b] = 2)
      })
    }, Wa = function (a) {
      var b = 0, c = 0;
      a && (b = f.x, c = f.y);
      return e(b + G.x, c + G.y)
    };
  this.mouseControl.getPosition = function () {
    return Wa(1)
  };
  this.mouseControl.getPositionS =
    function () {
      return Wa()
    };
  this.mouseControl.setCursorImage = function (a) {
    a = "url('" + a + "'), auto";
    Ra != a && (Ra = a, g.document.body.style.cursor = Ra)
  };
  this.mouseControl.setVisible = function (a) {
    !Fa && !a || Fa && a || (Fa = 1 == a, g.document.body.style.cursor = Fa ? Ra : "none")
  };
  this.mouseControl.isVisible = function () {
    return Fa
  };
  this.mouseControl.isDown = function (a) {
    return Ua[ub[a]]
  };
  this.mouseControl.isUp = function (a) {
    return Va[ub[a]]
  };
  this.mouseControl.isPress = function (a) {
    return 1 == Ga[ub[a]]
  };
  this.mouseControl.isMove = function () {
    return Ta
  };
  this.mouseControl.isInStatic = function (a) {
    var b = Wa(1);
    return b.x >= a.x && b.x <= a.x + a.w && b.y >= a.y && b.y <= a.y + a.h
  };
  this.mouseControl.isInDynamic = function (a) {
    return na(Wa(1), a)
  };
  this.mouseControl.isInObject = function (a) {
    return a.visible ? a.angle ? this.isInDynamic(a.getDynamicBox()) : this.isInStatic(a.getStaticBox()) : !1
  };
  this.mouseControl.isWheel = function (a) {
    return "UP" == a && 0 < Ha || "DOWN" == a && 0 > Ha
  };
  var Ub = function (a) {
    a.preventDefault();
    Ha = a.wheelDelta ? a.wheelDelta : -a.detail;
    return !1
  }, Xa = !1, Vb = function () {
    Xa && (Sa =
      v(g.document.pointerLockElement) || v(g.document.mozPointerLockElement) ? !0 : !1)
  };
  this.mouseControl.initMouseLock = function () {
    r.addEvent("onload", "initPointerLock", function () {
      Xa = m.requestPointerLock || m.mozRequestPointerLock || !1;
      g.document.exitPointerLock = g.document.exitPointerLock || g.document.mozExitPointerLock || !1;
      "onpointerlockchange" in g.document ? g.document.addEventListener("pointerlockchange", Vb, !1) : "onmozpointerlockchange" in g.document && g.document.addEventListener("mozpointerlockchange", Vb, !1);
      if (!Xa)return E("error in initMouseLock : not supported");
      Sa || (m.onclick = Xa)
    })
  };
  this.mouseControl.exitMouseLock = function () {
    g.document.exitPointerLock();
    m.onclick = function () {
    };
    pa = e(0, 0)
  };
  this.mouseControl.unlockMouse = function () {
    pa = e(0, 0);
    g.document.exitPointerLock()
  };
  this.mouseControl.isMouseLock = function () {
    return Sa
  };
  this.mouseControl.getSpeed = function () {
    return e(pa.x, pa.y)
  };
  this.mouseControl.isPeekStatic = function (a, b) {
    return this.isPress(a) ? this.isInStatic(b) : !1
  };
  this.mouseControl.isPeekDynamic = function (a, b) {
    return this.isPress(a) ? this.isInDynamic(b) : !1
  };
  this.mouseControl.isPeekObject = function (a, b) {
    return this.isPress(a) && b.visible ? this.isInDynamic(b.getDynamicBox()) : !1
  };
  this.mouseControl.initControl = this.mouseControl.initMouseControl = function () {
    if (tb)return this;
    tb = !0;
    g.onmousemove = function (a) {
      a.preventDefault();
      a.stopPropagation();
      if (Sa) {
        var b = a.movementY || a.mozMovementY || 0;
        G.x += a.movementX || a.mozMovementX || 0;
        G.y += b;
        return !1
      }
      G.x = a.pageX - pb.x;
      G.y = a.pageY - pb.y;
      Y && (G.x /= Y.w, G.y /= Y.h);
      pa.x = G.x - Qa.x;
      pa.y = G.y - Qa.y;
      Qa.x = G.x;
      Qa.y = G.y;
      Ta = !0;
      return !1
    };
    g.onmousedown =
      function (a) {
        a.preventDefault();
        a.stopPropagation();
        !a.which && a.button && (a.button & 1 ? a.which = 1 : a.button & 4 ? a.which = 2 : a.button & 2 && (a.which = 3));
        Ua[a.which] = !0;
        Ga[a.which] = 1
      };
    g.onmouseup = function (a) {
      a.preventDefault();
      a.stopPropagation();
      !a.which && a.button && (a.button & 1 ? a.which = 1 : a.button & 4 ? a.which = 2 : a.button & 2 && (a.which = 3));
      Ua[a.which] = !1;
      Va[a.which] = !0;
      delete Ga[a.which]
    };
    g.oncontextmenu = g.onselectstart = g.ondragstart = function () {
      return !1
    };
    g.onmousewheel = Ub;
    g.addEventListener("DOMMouseScroll", Ub, !1);
    r.addEvent("postLoop",
      "PointJS_clearAllMouseUp", function () {
        Va = {};
        yc();
        Ha = 0;
        Ta = !1;
        pa = e(0, 0)
      });
    return this
  };
  this.mouseControl.exitMouseControl = function () {
    g.onmousemove = g.onmousedown = g.onmouseup = g.oncontextmenu = g.onselectstart = g.ondragstart = g.onmousewheel = function () {
    };
    r.delEvent("postLoop", "PointJS_clearAllMouseUp");
    Tb();
    tb = !1
  };
  var vb = !1, Ya = !1, Za = 0, $a = 0, I = 0, J = 0, z = e(0, 0), ab = [], Ia = e(0, 0), bb = e(0, 0);
  this.touchControl.isTouchSupported = function () {
    return !!("ontouchstart" in window)
  };
  this.touchControl.isMobileDevice = function () {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(g.navigator.userAgent)
  };
  var Wb = function () {
    Ya = !1;
    $a = Za = 0;
    z = e(0, 0);
    ab = [];
    J = I = 0
  };
  this.touchControl.getFixPositionS = function () {
    return z.x || z.y ? e(z.x, z.y) : !1
  };
  this.touchControl.getFixPosition = function () {
    return z.x || z.y ? e(z.x + f.x, z.y + f.y) : !1
  };
  this.touchControl.getRun = function () {
    var a = 0, b = 0;
    z.x && z.x != I && (a = I - z.x);
    z.y && z.y != J && (b = J - z.y);
    return e(a, b)
  };
  this.touchControl.getVector = function () {
    var a = 0, b = 0;
    z.x && z.x != I && (a = I > z.x ? 1 : -1);
    z.y && z.y != J && (b = J > z.y ? 1 : -1);
    return e(a, b)
  };
  this.touchControl.getSpeed = function () {
    return e(Ia.x, Ia.y)
  };
  this.touchControl.isDown = function () {
    return Ya
  };
  this.touchControl.isPress = function () {
    return 1 == Za
  };
  this.touchControl.isUp = function () {
    return 1 == $a
  };
  this.touchControl.getPosition = function () {
    return e(I + f.x, J + f.y)
  };
  this.touchControl.getPositionS = function () {
    return e(I, J)
  };
  this.touchControl.isPeekStatic = function (a) {
    return this.isPress() ? this.isInStatic(a) : !1
  };
  this.touchControl.isPeekDynamic = function (a) {
    return this.isPress() ? this.isInDynamic(a) : !1
  };
  this.touchControl.isPeekObject = function (a) {
    return this.isPress() &&
    a.visible ? this.isInDynamic(a.getDynamicBox()) : !1
  };
  this.touchControl.isInStatic = function (a) {
    var b = this.getPosition();
    return b.x >= a.x && b.x <= a.x + a.w && b.y >= a.y && b.y <= a.y + a.h
  };
  this.touchControl.isInDynamic = function (a) {
    return na(this.getPosition(), a)
  };
  this.touchControl.isInObject = function (a) {
    return a.visible ? a.angle ? this.isInDynamic(a.getDynamicBox()) : this.isInStatic(a.getStaticBox()) : !1
  };
  this.touchControl.getTouches = function () {
    return ab
  };
  this.touchControl.initControl = this.touchControl.initTouchControl =
    function () {
      if (vb)return this;
      vb = !0;
      g.addEventListener("touchstart", function (a) {
        a.preventDefault();
        I = a.targetTouches[0].pageX;
        J = a.targetTouches[0].pageY;
        ab = a.targetTouches;
        Y && (I /= Y.w, J /= Y.h);
        z.x = I;
        z.y = J;
        Ya = !0;
        Za = 1;
        return !1
      }, {passive: !1});
      g.addEventListener("touchmove", function (a) {
        I = a.targetTouches[0].pageX;
        J = a.targetTouches[0].pageY;
        ab = a.targetTouches;
        Y && (I /= Y.w, J /= Y.h);
        Ia.x = I - bb.x;
        Ia.y = J - bb.y;
        return !1
      }, !1);
      g.addEventListener("touchend", function (a) {
        z.x = 0;
        z.y = 0;
        Ya = !1;
        $a = 1;
        return !1
      }, !1);
      t.touchControl.vibrate =
        function (a) {
          if (g.navigator.vibrate)return g.navigator.vibrate(a);
          if (g.navigator.oVibrate)return g.navigator.oVibrate(a);
          if (g.navigator.mozVibrate)return g.navigator.mozVibrate(a);
          if (g.navigator.webkitVibrate)return g.navigator.webkitVibrate(a)
        };
      r.addEvent("postLoop", "PointJS_touchStopPress", function () {
        $a = Za = 0;
        bb.x = I;
        bb.y = J;
        Ia = e(0, 0)
      });
      return this
    };
  this.touchControl.exitTouchControl = function () {
    g.ontouchstart = g.ontouchmove = g.ontouchend = function (a) {
    };
    r.delEvent("postLoop", "PointJS_touchStopPress");
    Wb();
    vb = !1
  };
  var cb = function (a, b, c, d) {
    return "rgba(" + a + ", " + b + ", " + c + ", " + (d ? d : 1) + ")"
  }, Xb = function (a, b) {
    a = "#" == a[0] ? a.substr(1, 6) : a;
    var c = parseInt(a.substr(0, 2), 16), d = parseInt(a.substr(2, 2), 16), l = parseInt(a.substr(4, 2), 16);
    return cb(c, d, l, b)
  };
  this.colors.rgb = function (a, b, c) {
    return cb(a, b, c, 1)
  };
  this.colors.rgba = function (a, b, c, d) {
    return cb(a, b, c, d)
  };
  this.colors.hex2rgb = function (a) {
    return Xb(a, 1)
  };
  this.colors.hex2rgba = function (a, b) {
    return Xb(a, b)
  };
  this.colors.randomColor = function (a, b, c) {
    return cb(ba(a, b), ba(a,
      b), ba(a, b), c || 1)
  };
  var v = function (a) {
    return "undefined" == typeof a || null == a ? !1 : !0
  }, Pb = function (a) {
    return v(a) && "" !== a && 0 !== a ? !0 : !1
  }, O = function (a, b) {
    var c, d;
    for (c in a)if ("undefined" != typeof a[c] && (d = b(a[c], c, a)) && "break" == d)break
  }, x = function (a, b) {
    if (a.length) {
      var c, d;
      var l = 0;
      for (c = a.length; l < c && ("undefined" == typeof a[l] || !(d = b(a[l], l, a, 0 < l ? a[l - 1] : a[a.length - 1]) || !1) || "break" != d); l += 1);
    }
  };
  this.OOP.insertArrElement = function (a, b) {
    var c = a[b];
    a.splice(b, 1);
    return c
  };
  this.OOP.insertRandArrElement = function (a) {
    var b =
      ba(0, a.length - 1), c = a[b];
    a.splice(b, 1);
    return c
  };
  this.OOP.drawEach = function (a, b) {
    O(a, function (a) {
      a && a.draw && a.isInCamera() && (a.draw(), b && b(a))
    })
  };
  this.OOP.drawArr = function (a, b) {
    var c;
    var d = 0;
    for (c = a.length; d < c; d += 1)a[d] && a[d].draw && a[d].isInCamera() && (a[d].draw(), b && b(a[d], d))
  };
  var Yb = function (a) {
    a.length = 0
  }, zc = function (a, b) {
    var c = !1, d = mb(), l = !1, e = new XMLHttpRequest, f = function () {
      e.open("GET", a, !0);
      e.send()
    };
    e.onreadystatechange = function () {
      4 == e.readyState && (b(e.responseText), c && (l ? setTimeout(f, l) : f()))
    };
    this.start = function () {
      a = a.match(/\?/) ? a + ("&session_id=" + d) : a + ("?session_id=" + d);
      f();
      c = !0
    };
    this.setSID = function (a) {
      d = a
    };
    this.setTime = function (a) {
      l = a
    };
    this.stop = function () {
      c = !1
    };
    this.isActive = function () {
      return c
    }
  };
  this.OOP.readJSON = function (a, b) {
    var c = {}, d = new XMLHttpRequest;
    d.open("GET", a, !0);
    B.add();
    d.onreadystatechange = function () {
      4 == d.readyState && (c = d.responseText, c = JSON.parse(c), B.load(), b(c))
    };
    d.send()
  };
  this.OOP.toString = function (a, b) {
    var c, d = 0, l = "[";
    for (c in a)if (a.hasOwnProperty(c)) {
      var e = a[c];
      "number" == typeof e && b && (e = parseInt(e));
      l += (0 < d ? ", " : "") + c + " : " + e;
      d += 1
    }
    return l + "]"
  };
  this.OOP.sendGET = function (a, b, c) {
    var d = new XMLHttpRequest, l = "?";
    O(b, function (a, b) {
      l += b + "=" + encodeURIComponent(a) + "&"
    });
    d.open("GET", a + l, !0);
    d.onreadystatechange = function () {
      4 == d.readyState && c(d.responseText)
    };
    d.send()
  };
  this.OOP.sendPOST = function (a, b, c) {
    var d = new XMLHttpRequest, l = "";
    O(b, function (a, b) {
      l += b + "=" + encodeURIComponent(a) + "&"
    });
    d.open("POST", a, !0);
    d.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    d.onreadystatechange = function () {
      4 == d.readyState && c(d.responseText)
    };
    d.send(l)
  };
  this.OOP.sendPOSTScreen = function (a, b, c) {
    var d = new XMLHttpRequest;
    b = b + "=" + m.toDataURL("image/png");
    d.open("POST", a, !0);
    d.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    d.onreadystatechange = function () {
      4 == d.readyState && c(d.responseText)
    };
    d.send(b)
  };
  this.OOP.isDef = v;
  this.OOP.isSet = Pb;
  this.OOP.forEach = O;
  this.OOP.forInt = function (a, b) {
    var c, d;
    for (c = 0; c < a && (!(d = b(c)) || "break" != d); c += 1);
  };
  this.OOP.forXY = function (a,
                             b, c) {
    var d, l, e;
    for (l = 0; l < b; l += 1)for (d = 0; d < a && (!(e = c(d, l)) || "break" != e); d += 1);
  };
  this.OOP.forArr = x;
  this.OOP.clearArr = Yb;
  this.OOP.fillArr = function (a, b, c) {
    a.length = 0;
    var d;
    for (d = 0; d < b; d += 1)a.push(c(d, 0 < d ? a[d - 1] : !1));
    return a
  };
  this.OOP.delObject = function (a, b) {
    var c;
    var d = 0;
    for (c = a.length; d < c; d += 1)if (a[d].id == b.id)return a.splice(d, 1), !0
  };
  this.OOP.randArrElement = function (a) {
    return a[ba(0, a.length - 1)]
  };
  this.OOP.readJSONSync = function (a) {
    var b = new XMLHttpRequest;
    b.open("GET", a, !1);
    b.send();
    a = b.responseText;
    return a = JSON.parse(a)
  };
  this.OOP.sendGETSync = function (a, b) {
    var c = new XMLHttpRequest, d = "?";
    O(b, function (a, b) {
      d += b + "=" + encodeURIComponent(a) + "&"
    });
    c.open("GET", a + d, !1);
    c.send();
    return c.responseText
  };
  this.OOP.sendPOSTSync = function (a, b) {
    var c = new XMLHttpRequest, d = "";
    O(b, function (a, b) {
      d += b + "=" + encodeURIComponent(a) + "&"
    });
    c.open("POST", a, !1);
    c.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    c.send(d);
    return c.responseText
  };
  this.OOP.newAJAXListener = function (a, b) {
    return new zc(a, b)
  };
  this.OOP.runCode = function (a) {
    (new Function("", a))()
  };
  var K = {};
  this.OOP.includeSync = function (a, b) {
    if (K[a]) K[a].loaded && !b && K[a].code(); else {
      K[a] = {
        loaded: !1, code: function () {
          console.log(a + " is loading")
        }
      };
      var c = new XMLHttpRequest;
      c.open("GET", a, !1);
      c.send();
      K[a].code = new Function("", c.responseText);
      K[a].loaded = !0;
      K[a].code()
    }
  };
  this.OOP.include = function (a, b, c) {
    if (K[a]) K[a].loaded && !c && K[a].code(), b && b(); else {
      K[a] = {
        loaded: !1, code: function () {
          console.log(a + " is loading")
        }
      };
      var d = new XMLHttpRequest;
      d.open("GET",
        a, !0);
      d.onreadystatechange = function () {
        4 == d.readyState && (K[a].code = new Function("", d.responseText), K[a].loaded = !0, K[a].code(), b && b())
      };
      d.send()
    }
  };
  this.OOP.clone = function (a, b) {
    var c = Zb(a);
    O(a, function (a, b) {
      -1 === ["id", "type"].indexOf(b) && (c[b] = a)
    });
    b && (c.onClone = b, c.onClone(c), delete c.onClone);
    return c
  };
  var va = 60, L = Date.now(), db = 0, eb = -1, $b = L, la = {};
  this.game.setFPS = function (a) {
    va = 0 < a ? a : 60
  };
  this.game.getFPS = function () {
    return va
  };
  this.game.getDT = function (a) {
    a || (a = 1E3);
    return db / a
  };
  this.game.getTime = function () {
    return L
  };
  var ac = function () {
      return g.requestAnimationFrame || g.webkitRequestAnimationFrame || g.mozRequestAnimationFrame || g.oRequestAnimationFrame || g.msRequestAnimationFrame || function (a) {
          g.setTimeout(a, 1E3 / va)
        }
    }, Ja = ac(), bc = function () {
      L = Date.now();
      if (Hb) {
        var a = e(0, 0), b = e(p, q);
        k.clearRect(a.x, a.y, b.x, b.y)
      }
      r.runEvent("preLoop")
    }, cc = function () {
      r.runEvent("postLoop");
      -1 != eb && (db = L - eb);
      eb = L
    }, P = {
      func: function () {
        console.log('please, use a "setLoop" function.');
        Ja = function () {
        }
      }, start: !1, end: !1, audio: !1, fps: !1, name: "NotLoop"
    },
    dc = function () {
      P.audio && x(P.audio, function (a) {
        a.stop()
      })
    };
  this.game.newLoop = function (a, b, c, d) {
    "function" == typeof b ? la[a] = {
      func: b,
      start: c || !1,
      end: d || !1,
      audio: !1,
      fps: !1,
      name: a
    } : da("error in newLoop : " + b + " is not a function")
  };
  this.game.newLoopFromClassObject = function (a, b) {
    if (!b.update)return da('error in newLoopFromClassObject : function "update" not found');
    la[a] = {func: b.update, start: b.entry || !1, end: b.exit || !1, audio: !1, fps: !1, name: a}
  };
  this.game.newLoopFromConstructor = function (a, b) {
    var c = new b;
    if (!c.update)return da('error in newLoopFromConstructor : function "update" not found');
    la[a] = {func: c.update, start: c.entry || !1, end: c.exit || !1, audio: !1, fps: !1, name: a}
  };
  this.game.setLoopSound = function (a, b) {
    var c;
    la[a].audio || (la[a].audio = []);
    for (c = 0; c < b.length; c += 1)b[c].setNextPlay(b[c + 1 == b.length ? 0 : c + 1]), la[a].audio.push(b[c])
  };
  this.game.setLoop = function (a) {
    if (!la[a])return da("setLoop : " + a + " is no a Loop");
    dc();
    Tb();
    ka = {};
    Ca = {};
    oa = {};
    Ea = Da = !1;
    Wb();
    wb(e(0, 0));
    P.end && P.end();
    P = la[a];
    P.start && P.start();
    P.audio && P.audio[0].play()
  };
  var ec = function () {
    if (60 > va) {
      var a = 1E3 / va;
      try {
        L = Date.now(),
        L - $b > a && (bc(), P.func(db), $b = L, cc())
      } catch (b) {
        za && Ma(b), hb && (za || Ma(b), da())
      }
    } else try {
      bc(), P.func(db), cc()
    } catch (b) {
      za && Ma(b), hb && (za || Ma(b), da())
    }
    Ja(ec)
  }, fc = function (a) {
    ma || (ma = !0, va = a || 60, Ja(ec))
  }, da = function (a) {
    if (!ma)return E(v(a) ? a : "game is stop");
    ma = !1;
    dc();
    Ja = function () {
      E(v(a) ? a : "game is stop")
    }
  };
  this.game.getWH = function () {
    return {w: p, h: q, w2: Q, h2: R}
  };
  this.game.getWH2 = function () {
    return {w: p / 2, h: q / 2}
  };
  this.game.getResolution = function () {
    return Math.min(p / ha, q / ia)
  };
  this.game.startLoop = function (a,
                                  b) {
    this.setLoop(a);
    this.start(b)
  };
  this.game.start = fc;
  this.game.stop = da;
  this.game.resume = function (a) {
    ma || (P.audio && P.audio[0].play(), E(a || "game is run"), Ja = ac(), eb = -1, fc())
  };
  var Ac = [], Bc = 0, ea = function (a, b) {
    b.prototype = Object.create(a.prototype);
    b.prototype.constructor = b
  }, C = function (a) {
    this.type = "BaseObject";
    this.id = Bc += 1;
    this.x = a.x || 0;
    this.y = a.y || 0;
    this.w = a.w || 0;
    this.h = a.h || 0;
    this.ondraw = a.ondraw ? a.ondraw : !1;
    this.parent = !1;
    this.children = [];
    this.fillColor = a.fillColor || !1;
    this.strokeColor = a.strokeColor ||
      u.strokeStyle;
    this.strokeWidth = a.strokeWidth || 0;
    this.angle = a.angle || 0;
    this.alpha = v(a.alpha) ? a.alpha : 1;
    this.center = e(0, 0);
    this.box = {x: 0, y: 0, w: 0, h: 0};
    this.visible = v(a.visible) ? a.visible : !0;
    this.flip = e(0, 0);
    this.setShadow(a);
    a.userData && this.setUserData(a.userData);
    a.center && this.setCenter(a.center);
    a.box && this.setBox(a.box);
    a.size && this.setSize(a.size);
    a.sizeC && this.setSizeC(a.sizeC);
    a.position && this.setPosition(a.position);
    a.positionC && this.setPositionC(a.positionC);
    "function" == typeof a.oncreate &&
    (this.oncreate = a.oncreate, this.oncreate(), delete this.oncreate);
    Ac.push(this)
  };
  C.prototype = {
    getID: function () {
      return this.id
    }, getType: function () {
      return this.type
    }, getParent: function () {
      return this.parent
    }, addChild: function (a) {
      a && a.id != this.id && (a.parent = this, this.children.push(a), a.move(this.getPosition()), a.setPositionC(N(a.getPositionC(), this.getPositionC(), this.angle)), a.turn(this.angle))
    }, delChild: function (a) {
      a.parent = !1;
      var b;
      var c = 0;
      for (b = this.children.length; c < b; c += 1)if (this.children[c].id ==
        a.id) {
        this.children.splice(c, 1);
        break
      }
    }, delParent: function () {
      this.parent.delChild(this)
    }, setBox: function (a) {
      a.offset && (this.box.x = a.offset.x || 0, this.box.y = a.offset.y || 0);
      a.size && (this.box.w = a.size.w || 0, this.box.h = a.size.h || 0)
    }, isArrIntersect: function (a) {
      var b;
      var c = 0;
      for (b = a.length; c < b; c += 1)if (a[c].id != this.id && this.isIntersect(a[c]))return a[c];
      return !1
    }, isArrInside: function (a) {
      var b;
      var c = 0;
      for (b = a.length; c < b; c += 1)if (this.isDynamicInside(a[c].getDynamicBox()))return a[c];
      return !1
    }, getNearest: function (a) {
      var b =
        0, c = !1, d;
      var l = 0;
      for (d = a.length; l < d; l += 1)if (this.id != a[l].id) {
        !1 === c && (c = this.getDistanceC(a[l].getPositionC()), b = l);
        var e = this.getDistanceC(a[l].getPositionC());
        e < c && (c = e, b = l)
      }
      return a[b]
    }, setFlip: function (a, b) {
      v(a) && this.flip.x != a && (this.flip.x = a);
      v(b) && this.flip.y != b && (this.flip.y = b)
    }, setUserData: function (a) {
      for (var b in a)v(this[b]) || (this[b] = a[b])
    }, setShadow: function (a) {
      this.shadowColor = a.shadowColor || !1;
      this.shadowBlur = v(a.shadowBlur) ? a.shadowBlur : 3;
      this.shadowX = a.shadowX || 0;
      this.shadowY = a.shadowY ||
        0
    }, getDynamicBox: function () {
      var a = this.getPosition(1);
      return 0 == this.angle ? [e(this.x + this.box.x, this.y + this.box.y), e(this.x + this.box.x + this.w + this.box.w, this.y + this.box.y), e(this.x + this.box.x + this.w + this.box.w, this.y + this.box.y + this.h + this.box.h), e(this.x + this.box.x, this.y + this.box.y + this.h + this.box.h)] : [N(e(this.x + this.box.x, this.y + this.box.y), a, this.getAngle()), N(e(this.x + this.box.x + this.w + this.box.w, this.y + this.box.y), a, this.getAngle()), N(e(this.x + this.box.x + this.w + this.box.w, this.y + this.box.y +
        this.h + this.box.h), a, this.getAngle()), N(e(this.x + this.box.x, this.y + this.box.y + this.h + this.box.h), a, this.getAngle())]
    }, isDynamicIntersect: function (a) {
      if (3 > a.length)return !1;
      var b = this.getDynamicBox(), c;
      var d = 0;
      for (c = b.length; d < c; d += 1)if (na(b[d], a))return !0;
      d = 0;
      for (c = a.length; d < c; d += 1)if (na(a[d], b))return !0;
      return !1
    }, isIntersect: function (a) {
      return a.visible ? this.angle || a.angle ? this.isDynamicIntersect(a.getDynamicBox()) : this.isStaticIntersect(a.getStaticBox()) : !1
    }, isDynamicInside: function (a) {
      if (3 > a.length)return !1;
      var b = this.getDynamicBox(), c, d = 0;
      var l = 0;
      for (c = b.length; l < c; l += 1)na(b[l], a) && (d += 1);
      return d == b.length ? !0 : !1
    }, drawDynamicBox: function (a) {
      M(this, 1);
      k.shadowColor = "transparent";
      wa(e(this.x + this.box.x, this.y + this.box.y), D(this.w + this.box.w, this.h + this.box.h), !1, a || "yellow", 2);
      gc(e(this.x + this.w / 2 + this.center.x, this.y + this.h / 2 + this.center.y), 10, a || "yellow");
      H()
    }, drawStaticBox: function (a) {
      k.shadowColor = "transparent";
      wa(e(this.x + this.box.x, this.y + this.box.y), D(this.w + this.box.w, this.h + this.box.h), !1, a ||
        "yellow", 2);
      gc(e(this.x + this.w / 2 + this.center.x, this.y + this.h / 2 + this.center.y), 10, a || "yellow")
    }, isStaticIntersect: function (a) {
      return this.y + this.box.y + this.h + this.box.h >= a.y && this.x + this.box.x + this.w + this.box.w >= a.x && this.x + this.box.x < a.x + a.w && this.y + this.box.y < a.y + a.h
    }, getStaticBox: function () {
      return {x: this.x + this.box.x, y: this.y + this.box.y, w: this.w + this.box.w, h: this.h + this.box.h}
    }, setAlpha: function (a) {
      this.alpha != a && (this.alpha = 0 <= a ? 1 >= a ? a : 1 : 0)
    }, transparent: function (a) {
      this.setAlpha(this.alpha + a)
    },
    getAlpha: function () {
      return this.alpha
    }, rotate: function (a) {
      this.setAngle(Math.atan2(a.y - this.getPosition(1).y, a.x - this.getPosition(1).x) * (180 / Math.PI))
    }, setCenter: function (a) {
      this.center = e(a.x, a.y)
    }, nullCenter: function (a) {
      a || (a = e(0, 0));
      this.center = e(-this.w / 2 + a.x, -this.h / 2 + a.y)
    }, getCenter: function () {
      return e(this.center.x, this.center.y)
    }, getBox: function () {
      return this.box
    }, move: function (a) {
      this.prevPosition = this.getPosition();
      this.x += a.x;
      this.y += a.y
    }, circling: function (a, b, c) {
      v(this.circlingAnglePointJS) ||
      (this.circlingAnglePointJS = 0);
      this.x = a.x + b * Math.cos(A(this.circlingAnglePointJS));
      this.y = a.y + b * Math.sin(A(this.circlingAnglePointJS));
      this.circlingAnglePointJS = 360 < this.circlingAnglePointJS ? 0 : this.circlingAnglePointJS + c
    }, circlingC: function (a, b, c) {
      v(this.circlingAnglePointJS) || (this.circlingAnglePointJS = 0);
      this.setPositionC(e(a.x + b * Math.cos(A(this.circlingAnglePointJS)), a.y + b * Math.sin(A(this.circlingAnglePointJS))));
      this.circlingAnglePointJS = 360 < this.circlingAnglePointJS ? 0 : this.circlingAnglePointJS +
        c
    }, motion: function (a, b, c) {
      v(this.motionPercentPointJS) || (this.motionPercentPointJS = 0);
      this.x = a.x + b.w * Math.cos(A(this.motionPercentPointJS));
      this.y = a.y + b.h * Math.sin(A(this.motionPercentPointJS));
      this.motionPercentPointJS = 360 < this.motionPercentPointJS ? 0 : this.motionPercentPointJS + c
    }, motionC: function (a, b, c) {
      v(this.motionPercentPointJS) || (this.motionPercentPointJS = 0);
      this.setPositionC(e(a.x + b.w * Math.cos(A(this.motionPercentPointJS)), a.y + b.h * Math.sin(A(this.motionPercentPointJS))));
      this.motionPercentPointJS =
        360 < this.motionPercentPointJS ? 0 : this.motionPercentPointJS + c
    }, scale: function (a) {
      this.w *= a;
      this.h *= a
    }, scaleC: function (a) {
      var b = this.w, c = this.h;
      this.scale(a);
      this.move(e(-((this.w - b) / 2), -((this.h - c) / 2)))
    }, getPosition: function (a) {
      return 1 == a ? e(this.x + (this.w / 2 + this.center.x), this.y + (this.h / 2 + this.center.y)) : 2 == a ? (a = e(this.x + this.w / 2, this.y + this.h / 2), this.angle && (a = N(a, this.getPosition(1), this.angle)), e(a.x, a.y)) : e(this.x, this.y)
    }, getPositionC: function () {
      return e(this.x + (this.w / 2 + this.center.x), this.y +
        (this.h / 2 + this.center.y))
    }, getPositionS: function () {
      return e(this.x + f.x, this.y + f.x)
    }, getPositionCS: function () {
      return e(this.x + (this.w / 2 + this.center.x) + f.x, this.y + (this.h / 2 + this.center.y) + f.y)
    }, setPosition: function (a) {
      this.getPosition();
      !1 !== a.x && (this.x = a.x);
      !1 !== a.y && (this.y = a.y)
    }, setPositionS: function (a) {
      this.getPosition();
      !1 !== a.x && (this.x = a.x + f.x);
      !1 !== a.y && (this.y = a.y + f.y)
    }, setPositionC: function (a) {
      this.getPosition();
      !1 !== a.x && (this.x = -(this.w / 2 + this.center.x) + a.x);
      !1 !== a.y && (this.y = -(this.h /
        2 + this.center.y) + a.y)
    }, setPositionCS: function (a) {
      this.getPosition();
      !1 !== a.x && (this.x = -(this.w / 2 + this.center.x) + a.x + f.x);
      !1 !== a.y && (this.y = -(this.h / 2 + this.center.y) + a.y + f.y)
    }, getSize: function () {
      return D(this.w, this.h)
    }, setSize: function (a) {
      this.w = a.w;
      this.h = a.h
    }, setSizeC: function (a) {
      this.w = a.w;
      this.h = a.h;
      this.move(e(-(a.w / 2), -(a.h / 2)))
    }, turn: function (a) {
      this.angle += a
    }, rotateForAngle: function (a, b) {
      0 > this.angle && (this.angle += 360);
      0 > a && (a += 360);
      var c = this.angle - a;
      180 < c ? c -= 360 : -180 > c && (c += 360);
      c >= -b - .5 &&
      c <= b + .5 ? this.angle = a : c > b + .5 ? this.angle -= b : c < -b - .5 && (this.angle += b)
    }, rotateForPoint: function (a, b) {
      var c = Aa(this.getPositionC(), a);
      this.rotateForAngle(c, b)
    }, rotateForObject: function (a, b) {
      var c = Aa(this.getPositionC(), a.getPositionC());
      this.rotateForAngle(c, b)
    }, moveTo: function (a, b) {
      var c = A(Aa(this.getPosition(), a));
      this.prevPosition = this.getPosition();
      this.x += b * Math.cos(c);
      this.y += b * Math.sin(c)
    }, moveToC: function (a, b) {
      var c = A(Aa(this.getPositionC(), a));
      this.prevPosition = this.getPosition();
      this.x += b * Math.cos(c);
      this.y += b * Math.sin(c)
    }, moveAngle: function (a, b) {
      b = A(v(b) ? b : this.angle);
      this.prevPosition = this.getPosition();
      this.x += a * Math.cos(b);
      this.y += a * Math.sin(b)
    }, moveTime: function (a, b) {
      b = b || 1;
      var c = this.getPosition();
      this.move(e((a.x - c.x) / b, (a.y - c.y) / b))
    }, moveTimeC: function (a, b) {
      b = b || 1;
      var c = this.getPosition(1);
      this.move(e((a.x - c.x) / b, (a.y - c.y) / b))
    }, getAngle: function () {
      return this.angle
    }, setAngle: function (a) {
      this.angle != a && (this.angle = a % 360)
    }, getDistance: function (a) {
      return Math.sqrt(Math.pow(a.x - this.getPosition(2).x,
          2) + Math.pow(a.y - this.getPosition(2).y, 2))
    }, getDistanceC: function (a) {
      return Math.sqrt(Math.pow(a.x - this.getPosition(1).x, 2) + Math.pow(a.y - this.getPosition(1).y, 2))
    }, setVisible: function (a) {
      this.visible = 1 == a
    }, isVisible: function () {
      return this.visible
    }, isInCamera: function () {
      return this.angle ? this.isInCameraDynamic() : this.isInCameraStatic()
    }, isInCameraStatic: function () {
      return this.x + this.w < f.x || this.x > f.x + p || this.y + this.h < f.y || this.y > f.y + q ? !1 : !0
    }, isInCameraDynamic: function () {
      var a = this.getDynamicBox(), b =
        [e(f.x, f.y), e(f.x + p, f.y), e(f.x + p, f.y + q), e(f.x, f.y + q)], c, d = 0;
      var l = 0;
      for (c = a.length; l < c; l += 1)na(a[l], b) && (d += 1);
      return 0 < d
    }, onCollision: function (a) {
      E('function "onCollision, onArrCollision" is DEPRECATED, use a "isIntersect, isArrIntersect"')
    }, onArrCollision: function (a) {
      var b;
      var c = 0;
      for (b = a.length; c < b; c += 1)if (this.id != a[c].id) this.onCollision(a[c])
    }, draw: function () {
    }
  };
  this.game.newBaseObject = function (a) {
    return new C(a)
  };
  var xb = function (a) {
    C.call(this, a);
    this.type = "TriangleObject"
  };
  ea(C, xb);
  xb.prototype.draw =
    function () {
      if (this.visible && this.alpha) {
        var a = !1;
        if (this.angle || 1 != this.alpha || this.shadowColor) M(this), a = !0;
        Ka(this.x, this.y, [e(this.w / 2, 0), e(this.w, this.h), e(0, this.h)], this.fillColor, this.strokeWidth ? this.strokeColor : !1, this.strokeWidth);
        if (this.ondraw) this.ondraw();
        a && H()
      }
    };
  this.game.newTriangleObject = function (a) {
    return new xb(a)
  };
  var yb = function (a) {
    C.call(this, a);
    this.type = "RectObject"
  };
  ea(C, yb);
  yb.prototype.draw = function () {
    if (this.visible && this.alpha) {
      var a = !1;
      if (this.angle || 1 != this.alpha ||
        this.shadowColor) M(this), a = !0;
      wa(e(this.x, this.y), D(this.w, this.h), this.fillColor, this.strokeColor, this.strokeWidth);
      if (this.ondraw) this.ondraw();
      a && H()
    }
  };
  this.game.newRectObject = function (a) {
    return new yb(a)
  };
  var zb = function (a) {
    C.call(this, a);
    this.type = "RoundRectObject";
    this.radius = a.radius || 1
  };
  ea(C, zb);
  zb.prototype.draw = function () {
    if (this.visible && this.alpha) {
      var a = !1;
      if (this.angle || 1 != this.alpha || this.shadowColor) M(this), a = !0;
      Ab(e(this.x, this.y), D(this.w, this.h), this.radius, this.fillColor, this.strokeColor,
        this.strokeWidth);
      if (this.ondraw) this.ondraw();
      a && H()
    }
  };
  this.game.newRoundRectObject = function (a) {
    return new zb(a)
  };
  var qa = function (a) {
    C.call(this, a);
    this.radius = a.radius || 5;
    a.scale && (this.radius *= a.scale);
    this.w = 2 * this.radius;
    this.h = 2 * this.radius;
    this.type = "CircleObject";
    a.positionC && this.setPositionC(a.positionC)
  };
  ea(C, qa);
  qa.prototype.draw = function () {
    if (this.visible && this.alpha) {
      var a = !1;
      if (this.angle || 1 != this.alpha || this.shadowColor) M(this), a = !0;
      xa(e(this.x, this.y), this.radius, this.fillColor, this.strokeColor,
        this.strokeWidth);
      if (this.ondraw) this.ondraw();
      a && H()
    }
  };
  qa.prototype.scale = function (a) {
    this.w *= a || 0;
    this.h *= a || 0;
    this.radius *= a ? a / 2 : 0
  };
  qa.prototype.scaleC = function (a) {
    var b = this.w, c = this.h;
    this.w *= a || 0;
    this.h *= a || 0;
    this.radius *= a;
    this.move(e(-((this.w - b) / 2), -((this.h - c) / 2)))
  };
  qa.prototype.getRadius = function () {
    return this.radius
  };
  qa.prototype.setRadius = function (a) {
    a && this.radius != a && (this.radius = a, this.w = 2 * a, this.h = 2 * a)
  };
  this.game.newCircleObject = function (a) {
    return new qa(a)
  };
  var Bb = function (a) {
    this.file =
      a.file;
    this.w = a.w;
    this.h = a.h;
    this.read = {x: 0, y: 0, w: 0, h: 0};
    a.read && (this.read.w = a.read.w || 0, this.read.h = a.read.h || 0, this.read.x = a.read.x || 0, this.read.y = a.read.y || 0);
    this.countX = a.countX;
    this.countY = a.countY;
    this.fullW = this.countX * this.w;
    this.fullH = this.countY * this.h;
    this.cnv = g.document.createElement("canvas");
    this.cnv.width = this.w;
    this.cnv.height = this.h;
    this.ctx = this.cnv.getContext("2d");
    this.loaded = !1;
    this.x = a.x || 0;
    this.y = a.y || 0;
    a = g.document.createElement("img");
    var b = this;
    a.onload = function () {
      b.ctx.drawImage(this,
        b.read.x ? b.read.x : 0, b.read.y ? b.read.y : 0, b.read.w ? b.read.w : this.width, b.read.h ? b.read.h : this.height, 0, 0, b.w, b.h);
      b.loaded = !0;
      B.load()
    };
    a.src = this.file;
    B.add()
  };
  Bb.prototype.draw = function () {
    if (this.loaded) {
      var a = -f.x + this.x, b = -f.y + this.y, c, d;
      for (d = 0; d < this.countY; d += 1)if (!(this.y + d * this.h + this.h < f.y || this.y + d * this.h > f.y + q))for (c = 0; c < this.countX; c += 1)this.x + c * this.w + this.w < f.x || this.x + c * this.w > f.x + p || k.drawImage(this.cnv, a + c * this.w, b + d * this.h, this.w, this.h)
    }
  };
  Bb.prototype.getSize = function () {
    return this.loaded ?
      D(this.fullW, this.fullH) : D()
  };
  this.game.newBackgroundObject = function (a) {
    return new Bb(a)
  };
  var Cb = function (a) {
    C.call(this, a);
    this.type = "EllipsObject"
  };
  ea(C, Cb);
  Cb.prototype.draw = function () {
    if (this.visible && this.alpha) {
      M(this);
      xa(e(this.x, this.y), this.h / 2, this.fillColor, this.strokeColor, this.strokeWidth);
      if (this.ondraw) this.ondraw();
      H()
    }
  };
  this.game.newEllipsObject = function (a) {
    return new Cb(a)
  };
  var Z = function (a) {
    C.call(this, a);
    this.type = "TextObject";
    this.text = a.text || "TextObject";
    this.color = a.color ||
      "";
    this.size = a.size || 10;
    a.scale && (this.size *= a.scale);
    this.font = a.font || "sans-serif";
    this.style = a.style || "";
    this.align = "left";
    this.padding = a.padding || 2;
    this.w = Db(this.text, this.style, this.size, this.font) + 2 * this.padding;
    this.h = this.size + 2 * this.padding;
    this.strokeColorText = a.strokeColorText || !1;
    this.strokeWidthText = a.strokeWidthText || !1;
    this.textDY = -this.size / 7;
    a.positionC && this.setPositionC(a.positionC)
  };
  ea(C, Z);
  Z.prototype.reStyle = function (a) {
    this.text = a.text || this.text;
    this.color = a.color || this.color;
    this.size = a.size || this.size;
    this.font = a.font || this.font;
    this.style = a.style || this.style;
    this.padding = a.padding || this.padding;
    this.w = Db(this.text, this.style, this.size, this.font) + 2 * this.padding;
    this.h = this.size + 2 * this.padding;
    this.strokeColorText = a.strokeColorText || this.strokeColorText;
    this.strokeWidthText = a.strokeWidthText || this.strokeWidthText;
    this.strokeColor = a.strokeColor || this.strokeColor;
    this.strokeWidth = a.strokeWidth || this.strokeWidth;
    this.fillColor = a.fillColor || this.fillColor;
    this.textDY = -this.size /
      7
  };
  Z.prototype.setText = function (a) {
    this.text != a && this.reStyle({text: a})
  };
  Z.prototype.getText = function () {
    return this.text
  };
  Z.prototype.draw = function () {
    if (this.visible && this.alpha) {
      var a = !1;
      if (this.angle || 1 != this.alpha || this.shadowColor) M(this), a = !0;
      (this.fillColor || this.strokeColor) && wa(e(this.x, this.y), D(this.w, this.h), this.fillColor, this.strokeColor, this.strokeWidth);
      ra(e(this.x + this.padding, this.textDY + this.y + this.padding), this.text, this.color, this.size, this.font, this.style, this.align, this.strokeColorText,
        this.strokeWidthText);
      if (this.ondraw) this.ondraw();
      a && H()
    }
  };
  Z.prototype.scale = function (a) {
    this.reStyle({size: this.size * a})
  };
  Z.prototype.scaleC = function (a) {
    var b = this.w, c = this.h;
    this.reStyle({size: this.size * a});
    this.move(e(-((this.w - b) / 2), -((this.h - c) / 2)))
  };
  Z.prototype.setSize = function (a) {
    this.size != a && this.reStyle({size: a})
  };
  Z.prototype.setSizeC = function (a) {
    this.size != a && (this.reStyle({size: a}), this.move(e(-a / 2, -a / 2)))
  };
  var Db = function (a, b, c, d) {
    var l = g.document.createElement("canvas").getContext("2d");
    l.font = b + c + "px " + d;
    return l.measureText(a).width
  };
  this.OOP.getTextWidth = function (a) {
    return Db(a.text, a.style || "", a.size || 10, a.font || "sans-serif")
  };
  this.game.newTextObject = function (a) {
    return new Z(a)
  };
  var S = function (a) {
    C.call(this, a);
    this.type = "PolygonObject";
    this.points = [];
    this.dX = this.dY = 0;
    var b = this;
    a.points && x(a.points, function (a) {
      b.addPoint(a)
    });
    this.pointColor = a.pointColor || !1
  };
  ea(C, S);
  S.prototype.addPoint = function (a) {
    this.dY = this.dX = 0;
    var b = this;
    this.y + a.y < this.y && (this.dY = Math.abs(this.y + a.y -
      this.y), x(this.points, function (a) {
      a.y += b.dY
    }));
    this.x + a.x < this.x && (this.dX = Math.abs(this.x + a.x - this.x), b = this, x(this.points, function (a) {
      a.x += b.dX
    }));
    this.points.push(e(a.x + this.dX, a.y + this.dY));
    this.h = this.w = 0;
    b = this;
    x(this.points, function (a) {
      b.h += b.y + a.y > b.y + b.h ? a.y - b.h : 0;
      b.w += b.x + a.x > b.x + b.w ? a.x - b.w : 0
    })
  };
  S.prototype.delPoint = function (a) {
    var b, c = this.getPoints();
    this.clearPoints();
    var d = 0;
    for (b = c.length; d < b; d += 1)d != a && this.addPoint(c[d])
  };
  S.prototype.clearPoints = function () {
    this.points = [];
    this.count =
      0
  };
  S.prototype.getPoints = function () {
    return this.points
  };
  S.prototype.getCount = function () {
    return this.points.length
  };
  S.prototype.getPoint = function (a) {
    return this.points[a]
  };
  S.prototype.scale = function (a) {
  };
  S.prototype.drawDynamicBox = function (a) {
    var b = !1;
    if (this.angle || 1 != this.alpha || this.shadowColor) M(this), b = !0;
    Ka(this.x, this.y, this.points, this.fillColor, a || "yellow", 2, "red");
    b && H()
  };
  S.prototype.getDynamicBox = function () {
    var a = [];
    if (this.angle) {
      var b = this.getPosition(1);
      var c = this;
      x(this.points, function (d) {
        a.push(N(ua(d,
          e(c.x, c.y)), b, c.getAngle()))
      })
    } else c = this, x(this.points, function (b) {
      a.push(ua(b, e(c.x, c.y)))
    });
    return a
  };
  S.prototype.draw = function () {
    if (this.visible && this.alpha) {
      var a = !1;
      if (this.angle || 1 != this.alpha || this.shadowColor) M(this), a = !0;
      Ka(this.x, this.y, this.points, this.fillColor, this.strokeColor, this.strokeWidth, this.pointColor);
      if (this.ondraw) this.ondraw();
      a && H()
    }
  };
  this.game.newPolygonObject = function (a) {
    return new S(a)
  };
  var sa = function (a) {
    C.call(this, a);
    this.type = "ImageObject";
    this.loaded = !1;
    this.file =
      "";
    this.forOnLoad = a.onload || !1;
    hc(a.file, this, a.scale || 1)
  };
  ea(C, sa);
  sa.prototype.draw = function () {
    if (this.visible && this.alpha && this.loaded) {
      var a = !1;
      if (this.angle || 1 != this.alpha || this.shadowColor || this.flip.x || this.flip.y) M(this), a = !0;
      ic(e(this.x, this.y), D(this.w, this.h), this.file);
      if (this.ondraw) this.ondraw();
      a && H()
    }
  };
  sa.prototype.simpleDraw = function (a) {
    if (this.loaded) {
      var b = !1;
      if (this.angle || 1 != this.alpha || this.shadowColor) M(this), b = !0;
      ic(e(a.x, a.y), D(this.w, this.h), this.file);
      b && H()
    }
  };
  sa.prototype.setImage =
    function (a, b) {
      this.file != a && (v(n[a]) ? (this.file = a, b && b()) : (this.loaded = !1, this.origHeight = this.origWidth = 0, this.forOnLoad = b || !1, hc(a, this)))
    };
  sa.prototype.getImage = function () {
    return this.file
  };
  sa.prototype.resize = function (a) {
    if (!1 !== a.w && !1 === a.h) {
      var b = a.w / this.w;
      this.w = a.w;
      this.h *= b
    } else!1 !== a.h && !1 === a.w ? (b = a.h / this.h, this.h = a.h, this.w *= b) : !1 !== a.w && !1 !== a.h && (this.w = a.w, this.h = a.h)
  };
  this.game.newImageObject = function (a) {
    return new sa(a)
  };
  var W = function (a) {
    C.call(this, a);
    this.type = "AnimationObject";
    this.frame = 0;
    this.anim = a.animation;
    this.step = a.delay || 10;
    this.toFrameStep = this.difStep = 0;
    a.scale && (this.w *= a.scale, this.h *= a.scale)
  };
  ea(C, W);
  W.prototype.draw = function () {
    if (this.visible && this.alpha) {
      var a = !1;
      if (this.angle || 1 != this.alpha || this.flip.x || this.flip.y || this.shadowColor) M(this), a = !0;
      Eb(this.anim, e(this.x, this.y), D(this.w, this.h), this.frame);
      if (this.ondraw) this.ondraw();
      this.difStep > this.step ? (this.frame = this.frame < this.anim.r ? this.frame + 1 : 0, this.difStep = 0) : this.difStep += 1;
      a && H()
    }
  };
  W.prototype.drawFrames =
    function (a, b, c) {
      if (this.visible && this.alpha) {
        if (this.frame < a || this.frame > b) this.frame = a;
        c = !1;
        if (this.angle || 1 != this.alpha || this.flip.x || this.flip.y || this.shadowColor) M(this), c = !0;
        Eb(this.anim, e(this.x, this.y), D(this.w, this.h), this.frame);
        if (this.ondraw) this.ondraw();
        this.difStep > this.step ? (this.frame = this.frame < b ? this.frame + 1 : a, this.difStep = 0) : this.difStep += 1;
        c && H()
      }
    };
  W.prototype.drawFrame = function (a) {
    if (this.visible && this.alpha) {
      var b = !1;
      if (this.angle || 1 != this.alpha || this.flip.x || this.flip.y || this.shadowColor) M(this),
        b = !0;
      Eb(this.anim, e(this.x, this.y), D(this.w, this.h), a);
      if (this.ondraw) this.ondraw();
      b && H()
    }
  };
  W.prototype.drawToFrame = function (a) {
    if (this.visible && this.alpha) {
      if (this.frame < a) this.toFrameStep = 1; else if (this.frame > a) this.toFrameStep = -1; else {
        this.drawFrame(a);
        return
      }
      this.drawFrame(this.frame);
      if (this.ondraw) this.ondraw();
      this.difStep > this.step ? (this.frame = this.frame < this.anim.r ? this.frame + this.toFrameStep : 0, this.difStep = 0) : this.difStep += 1
    }
  };
  W.prototype.drawReverFrames = function (a, b) {
    if (this.visible &&
      this.alpha) {
      this.drawFrame(this.frame);
      if (this.ondraw) this.ondraw();
      this.difStep > this.step ? (this.frame <= a ? this.toFrameStep = 1 : this.frame >= b && (this.toFrameStep = -1), this.frame += this.toFrameStep, this.difStep = 0) : this.difStep += 1
    }
  };
  W.prototype.setAnimation = function (a) {
    a.id != this.anim.id && (this.frame = 0, this.anim = a)
  };
  W.prototype.getAnimation = function () {
    return this.anim
  };
  W.prototype.setDelay = function (a) {
    this.step = 0 < a ? a : this.step
  };
  W.prototype.getDelay = function () {
    return this.step
  };
  this.game.newAnimationObject =
    function (a) {
      return new W(a)
    };
  var Zb = function (a) {
    var b = !1;
    "RectObject" == a.type ? b = t.game.newRectObject({}) : "CircleObject" == a.type ? b = t.game.newCircleObject({}) : "RoundRectObject" == a.type ? b = t.game.newRoundRectObject({}) : "TextObject" == a.type ? b = t.game.newTextObject({}) : "EllipsObject" == a.type ? b = t.game.newEllipsObject({}) : "ImageObject" == a.type ? b = t.game.newImageObject({file: a.file}) : "TriangleObject" == a.type ? b = t.game.newTriangleObject({}) : "AnimationObject" == a.type && (b = t.game.newAnimationObject({animation: a.animation}));
    return b
  }, Cc = 0, ta = function (a, b) {
    this.file = a;
    this.loaded = !1;
    this.h = this.w = 0;
    this.id = Cc++;
    this.toLoad = [];
    var c = g.document.createElement("img"), d = this;
    c.onload = function () {
      d.loaded = !0;
      d.w = this.width;
      d.h = this.height;
      d.img = g.document.createElement("canvas");
      d.img.width = this.width;
      d.img.height = this.height;
      d.context = d.img.getContext("2d");
      d.context.drawImage(this, 0, 0);
      d.toLoad.length && x(d.toLoad, function (a) {
        a.func(d.context, a.w, a.h, a.r)
      });
      b && (d.onLoad = b, d.onLoad());
      B.load()
    };
    c.src = a;
    B.add()
  };
  ta.prototype.onContext =
    function (a) {
      this.loaded ? a(this.context, this.w, this.h, 1) : this.toLoad.push({w: this.w, h: this.h, r: 1, func: a})
    };
  ta.prototype.getCanvas = function () {
    return this.img
  };
  var Dc = 0;
  ta.prototype.getAnimation = function (a, b, c, d, e) {
    var l = function (a, b, c, d, e, l) {
      this.id = Dc++;
      this.image = a;
      this.x = b;
      this.y = c;
      this.w = d;
      this.h = e;
      this.endFrame = this.r = l ? l - 1 : 0;
      this.frameCount = this.r + 1
    };
    l.prototype = {
      onContext: function (a) {
        this.image.loaded ? a(this.image.context, this.w, this.h, this.r) : this.image.toLoad.push({
          w: this.w, h: this.h, r: this.r,
          func: a
        })
      }, getImage: function () {
        return this.image
      }, getCount: function () {
        return this.r
      }
    };
    return new l(this, a, b, c, d, e)
  };
  var Fb = function (a, b) {
    this.loaded = !0;
    this.w = a;
    this.h = b;
    this.img = g.document.createElement("canvas");
    this.img.width = a;
    this.img.height = b;
    this.context = this.img.getContext("2d")
  };
  Fb.prototype.onContext = ta.prototype.onContext;
  Fb.prototype.getAnimation = ta.prototype.getAnimation;
  this.tiles.newDrawImage = function (a, b) {
    return new Fb(a, b)
  };
  this.tiles.newImage = function (a, b) {
    return new ta(a, b)
  };
  this.tiles.newAnimation =
    function (a, b, c, d) {
      return (new ta(a)).getAnimation(0, 0, b, c, d)
    };
  var Eb = function (a, b, c, d) {
    if (a && a.image.loaded) {
      var e = -f.x, g = -f.y;
      a.image.img && k.drawImage(a.image.img, a.x + a.w * d, a.y, a.w, a.h, b.x + e, b.y + g, c.w, c.h)
    }
  }, n = {}, hc = function (a, b, c) {
    if (v(n[a])) {
      b.loaded = !0;
      b.file = a;
      if (b.w && !b.h) {
        var d = b.w / n[a].w;
        var e = b.w;
        var f = n[a].h * d
      } else!b.w && b.h ? (d = b.h / n[a].h, f = b.h, e = n[a].w * d) : b.w && b.h ? (e = b.w, f = b.h) : (e = n[a].w, f = n[a].h);
      c && (e *= c, f *= c);
      b.w = e;
      b.h = f;
      b.forOnLoad && b.forOnLoad()
    } else d = g.document.createElement("img"),
      d.onload = function () {
        n[a] = {};
        n[a].loaded = !0;
        n[a].img = this;
        n[a].w = this.width;
        n[a].h = this.height;
        if (v(b)) {
          b.loaded = !0;
          if (b.w && !b.h) {
            var d = b.w / n[a].w;
            var e = b.w;
            var l = n[a].h * d
          } else!b.w && b.h ? (d = b.h / n[a].h, l = b.h, e = n[a].w * d) : b.w && b.h ? (e = b.w, l = b.h) : (e = n[a].w, l = n[a].h);
          c && (e *= c, l *= c);
          b.w = e;
          b.h = l;
          b.file = a;
          b.forOnLoad && b.forOnLoad()
        }
        B.load()
      }, d.src = a, B.add()
  }, ic = function (a, b, c) {
    if (c) {
      var d = -f.x, e = -f.y;
      n[c] && k.drawImage(n[c].img, 0, 0, n[c].w, n[c].h, a.x + d, a.y + e, b.w, b.h)
    }
  }, jc = function (a) {
    this.type = "Mesh";
    this.objs =
      [];
    this.x = a.x || 0;
    this.y = a.y || 0;
    this.angle = a.angle || 0;
    this.count = 0;
    var b = this;
    a.add && x(a.add, function (a) {
      b.add(a)
    });
    this.angle && this.setAngle(this.angle)
  };
  jc.prototype = {
    getCount: function () {
      return this.count
    }, getObjects: function () {
      return this.objs
    }, add: function (a) {
      this.count += 1;
      this.objs.push(a);
      a.offsetMesh = a.getPosition(1);
      a.turn(this.angle);
      a.setPositionC(e(this.x + a.offsetMesh.x, this.y + a.offsetMesh.y))
    }, del: function (a) {
      var b = this;
      x(this.objs, function (c) {
        c.id == a.id && (b.objs.splice(void 0, 1), b.count--)
      })
    },
    draw: function (a) {
      x(this.objs, function (a) {
        a.draw()
      })
    }, move: function (a) {
      this.x += a.x || 0;
      this.y += a.y || 0;
      var b = this;
      x(this.objs, function (a) {
        a.setPositionC(e(b.x + a.offsetMesh.x, b.y + a.offsetMesh.y))
      })
    }, turn: function (a) {
      if (0 != a) {
        this.angle %= 360;
        this.angle += a;
        var b = e(this.x, this.y), c = this;
        x(this.objs, function (d) {
          d.turn(a);
          d.setPositionC(N(e(c.x + d.offsetMesh.x, c.y + d.offsetMesh.y), b, c.angle))
        })
      }
    }, setAngle: function (a) {
      if (a != this.angle) {
        this.angle = a %= 360;
        var b = e(this.x, this.y), c = this;
        x(this.objs, function (d) {
          d.setAngle(a);
          d.setPositionC(N(e(c.x + d.offsetMesh.x, c.y + d.offsetMesh.y), b, c.angle))
        })
      }
    }, setPosition: function (a) {
      if (this.x != a.x || this.y != a.y) {
        this.x = a.x || this.x;
        this.y = a.y || this.y;
        var b = this;
        x(this.objs, function (a) {
          b.angle ? a.setPositionC(N(e(b.x + a.offsetMesh.x, b.y + a.offsetMesh.y), e(b.x, b.y), b.angle)) : a.setPositionC(e(b.x + a.offsetMesh.x, b.y + a.offsetMesh.y))
        })
      }
    }, isDynamicIntersect: function (a) {
      if (3 > a.length)return !1;
      var b = !1;
      x(this.objs, function (c) {
        if (c.isDynamicIntersect(a))return b = c
      });
      return b
    }, isStaticIntersect: function (a) {
      var b =
        !1;
      x(this.objs, function (c) {
        if (c.isStaticIntersect(a))return b = c
      });
      return b
    }, isIntersect: function (a) {
      var b = !1;
      x(this.objs, function (c) {
        if (c.isIntersect(a))return b = c
      });
      return b
    }
  };
  this.game.newMesh = function (a) {
    return new jc(a)
  };
  this.camera.setScale = function (a) {
  };
  this.camera.circling = function (a, b, c) {
    v(this.circlingAnglePointJS) || (this.circlingAnglePointJS = c);
    f.x = a.x + b * Math.cos(A(this.circlingAnglePointJS));
    f.y = a.y + b * Math.sin(A(this.circlingAnglePointJS));
    this.circlingAnglePointJS = 360 <= this.circlingAnglePointJS ?
      c : this.circlingAnglePointJS + c
  };
  this.camera.circlingC = function (a, b, c) {
    v(this.circlingAnglePointJS) || (this.circlingAnglePointJS = c);
    f.x = -Q + a.x + b * Math.cos(A(this.circlingAnglePointJS));
    f.y = -R + a.y + b * Math.sin(A(this.circlingAnglePointJS));
    this.circlingAnglePointJS = 360 <= this.circlingAnglePointJS ? c : this.circlingAnglePointJS + c
  };
  this.camera.motion = function (a, b, c) {
    v(this.motionPercentPointJS) || (this.motionPercentPointJS = b);
    f.x = a.x + b.w * Math.cos(A(this.motionPercentPointJS));
    f.y = a.y + b.h * Math.sin(A(this.motionPercentPointJS));
    this.motionPercentPointJS = 360 <= this.motionPercentPointJS ? b : this.motionPercentPointJS + c
  };
  this.camera.motionC = function (a, b, c) {
    v(this.motionPercentPointJS) || (this.motionPercentPointJS = b);
    this.setPositionC(e(a.x + b.w * Math.cos(A(this.motionPercentPointJS)), a.y + b.h * Math.sin(A(this.motionPercentPointJS))));
    this.motionPercentPointJS = 360 <= this.motionPercentPointJS ? b : this.motionPercentPointJS + c
  };
  this.camera.follow = function (a) {
    this.moveTimeC(a.getPositionC(), 10)
  };
  this.camera.move = function (a) {
    f.x += a.x || 0;
    f.y +=
      a.y || 0
  };
  this.camera.moveTime = function (a, b) {
    b = b || 1;
    var c = e(f.x, f.y);
    this.move(e((a.x - c.x) / b, (a.y - c.y) / b))
  };
  this.camera.moveTimeC = function (a, b) {
    b = b || 1;
    var c = e(f.x + Q, f.y + R);
    this.move(e((a.x - c.x) / b, (a.y - c.y) / b))
  };
  this.camera.setPosition = function (a) {
    wb(e(!1 !== a.x ? a.x : f.x, !1 !== a.y ? a.y : f.y))
  };
  this.camera.setPositionC = function (a) {
    wb(e(!1 !== a.x ? a.x - Q : f.x, !1 !== a.y ? a.y - R : f.y))
  };
  this.camera.getPosition = function (a) {
    return a ? e(f.x + Q, f.y + R) : e(f.x, f.y)
  };
  this.camera.getPositionC = function () {
    return e(f.x + Q, f.y + R)
  };
  this.camera.getStaticBox = function () {
    return {x: f.x, y: f.y, w: f.x + p, h: f.y + q}
  };
  this.camera.getDynamicBox = function () {
    return [e(f.x, f.y), e(f.x + p, f.y), e(f.x + p, f.y + q), e(f.x, f.y + q)]
  };
  var wb = function (a) {
    f = e(a.x, a.y)
  }, Ib = function () {
    k.mozImageSmoothingEnabled = La;
    k.msImageSmoothingEnabled = La;
    k.imageSmoothingEnabled = La
  }, H = function (a) {
    k.restore();
    k.globalAlpha = u.globalAlpha;
    k.fillStyle = "black";
    k.strokeStyle = "black";
    Ib()
  }, M = function (a, b) {
    k.save();
    var c = a.getPositionC();
    a.angle && (k.translate(-f.x + c.x, -f.y + c.y), k.rotate(A(a.angle)),
      k.translate(-c.x + f.x, -c.y + f.y));
    1 != a.alpha && (k.globalAlpha = a.alpha);
    if (a.flip.x || a.flip.y) k.translate(-f.x + c.x, -f.y + c.y), k.scale(a.flip.x ? -1 : 1, a.flip.y ? -1 : 1), k.translate(-c.x + f.x, -c.y + f.y);
    a.shadowColor && (k.shadowBlur = a.shadowBlur, k.shadowColor = a.shadowColor, k.shadowOffsetX = a.shadowX, k.shadowOffsetY = a.shadowY);
    if ("EllipsObject" == a.type && !b) {
      c = a.w / 2;
      var d = a.h / 2, l = e(-f.x + a.x, -f.y + a.y);
      k.translate(l.x, l.y);
      k.scale(c / d, 1);
      k.translate(-l.x, -l.y)
    }
  };
  this.system.setContextSettings = function (a) {
    k.save();
    for (var b in a)k[b] =
      a[b]
  };
  this.system.defaultSettings = function () {
    H()
  };
  this.game.clear = function () {
    var a = e(0, 0), b = e(p, q);
    k.clearRect(a.x, a.y, b.x, b.y)
  };
  this.game.fill = function (a) {
    k.fillStyle = a;
    k.fillRect(0, 0, p, q)
  };
  var Ka = function (a, b, c, d, l, g, h) {
    if (!(3 > c.length)) {
      if (d && !(3 > c.length)) {
        k.fillStyle = d;
        d = -f.x + a;
        var m = -f.y + b;
        var n;
        k.beginPath();
        k.moveTo(d + c[0].x, m + c[0].y);
        for (n = 1; n < c.length; n += 1)k.lineTo(d + c[n].x, m + c[n].y);
        k.closePath();
        k.fill()
      }
      for (d = 0; d < c.length; d += 1)m = d + 1 < c.length ? d + 1 : 0, l && aa(ua(c[d], e(a, b)), ua(c[m], e(a, b)),
        l, g), h && fb(ua(c[d], e(a, b)), h)
    }
  };
  this.brush.drawPolygon = function (a) {
    var b = a.points || [], c = a.fillColor || !1, d = a.strokeColor || !1, e = a.strokeWidth || 1;
    a = a.pointColor || !1;
    if (!(3 > b.length)) {
      if (c && !(3 > b.length)) {
        k.fillStyle = c;
        c = -f.x;
        var g = -f.y;
        var h;
        k.beginPath();
        k.moveTo(c + b[0].x, g + b[0].y);
        for (h = 1; h < b.length; h += 1)k.lineTo(c + b[h].x, g + b[h].y);
        k.closePath();
        k.fill()
      }
      for (c = 0; c < b.length; c += 1)g = c + 1 < b.length ? c + 1 : 0, d && aa(b[c], b[g], d, e), a && fb(b[c], a)
    }
  };
  this.brush.drawTriangle = function (a) {
    Ka(a.x || 0, a.y || 0, [e(a.w / 2, 0),
      e(a.w, a.h), e(0, a.h)], a.fillColor, a.strokeColor, a.strokeWidth)
  };
  this.brush.drawTriangleS = function (a) {
    Ka(f.x + (a.x || 0), f.y + (a.y || 0), [e(a.w / 2, 0), e(a.w, a.h), e(0, a.h)], a.fillColor, a.strokeColor, a.strokeWidth)
  };
  var ra = function (a, b, c, d, e, g, h, m, n) {
    k.textAlign = h;
    k.lineWidth = n;
    k.font = (g ? g + " " : "") + d + "px " + e;
    d = -f.x;
    e = -f.y;
    c && (k.fillStyle = c, k.fillText(b, d + a.x, e + a.y));
    m && (k.strokeStyle = m, k.strokeText(b, d + a.x, e + a.y))
  };
  this.brush.drawMultiText = function (a) {
    var b, c = a.text.split("\n");
    for (b = 0; b < c.length; b += 1)ra(e(a.x,
      a.y + a.size * b), c[b], a.color || u.fillStyle, a.size || 10, a.font || u.font, a.style || !1, a.align || "left", a.strokeColor || !1, a.strokeWidth || 2)
  };
  this.brush.drawMultiTextS = function (a) {
    var b, c = a.text.split("\n"), d = a.size || 10;
    for (b = 0; b < c.length; b += 1)ra(e(a.x + f.x, a.y + f.y + d * b), c[b], a.color || u.fillStyle, d || 10, a.font || u.font, a.style || !1, a.align || "left", a.strokeColor || !1, a.strokeWidth || 2)
  };
  this.brush.drawText = function (a) {
    ra(e(a.x || 0, a.y || 0), a.text, a.color || !1, a.size || 10, a.font || u.font, a.style || !1, a.align || "left", a.strokeColor ||
      !1, a.strokeWidth || 2)
  };
  this.brush.drawTextS = function (a) {
    ra(e((a.x || 0) + f.x, (a.y || 0) + f.y), a.text, a.color || u.fillStyle, a.size || 10, a.font || u.font, a.style || !1, a.align || "left", a.strokeColor || !1, a.strokeWidth || 2)
  };
  this.brush.drawTextLines = function (a) {
    if (a.lines) {
      var b, c = a.size || 10;
      for (b = 0; b < a.lines.length; b += 1)ra(e(a.x, a.y + c * b), a.lines[b], a.color || u.fillStyle, c, a.font || u.font, a.style || !1, a.align || "left", a.strokeColor || !1, a.strokeWidth || 2)
    }
  };
  this.brush.drawTextLinesS = function (a) {
    if (a.lines) {
      var b, c = a.size ||
        10;
      for (b = 0; b < a.lines.length; b += 1)ra(e(a.x + f.x, a.y + f.y + c * b), a.lines[b], a.color || u.fillStyle, c, a.font || u.font, a.style || !1, a.align || "left", a.strokeColor || !1, a.strokeWidth || 2)
    }
  };
  var gc = function (a, b, c) {
    aa(e(a.x - b, a.y), e(a.x + b, a.y), c, 2);
    aa(e(a.x, a.y - b), e(a.x, a.y + b), c, 2)
  }, wa = function (a, b, c, d, e) {
    k.fillStyle = c;
    k.strokeStyle = d;
    k.lineWidth = e;
    d = -f.x + (e ? e / 2 : 0);
    var l = -f.y + (e ? e / 2 : 0);
    c && k.fillRect(a.x + d, a.y + l, b.w, b.h);
    e && k.strokeRect(a.x + d, a.y + l, b.w, b.h)
  };
  this.brush.drawRect = function (a) {
    wa(e(a.x, a.y), D(a.w, a.h),
      a.fillColor || !1, a.strokeColor || u.strokeStyle, a.strokeWidth || !1)
  };
  this.brush.drawRectS = function (a) {
    wa(e(a.x + f.x, a.y + f.y), D(a.w, a.h), a.fillColor || !1, a.strokeColor || u.strokeStyle, a.strokeWidth || !1)
  };
  var fb = function (a, b) {
    (k.fillStyle = b) && k.fillRect(-f.x + a.x - 1, -f.y + a.y - 1, 2, 2)
  };
  this.brush.drawPoint = function (a) {
    fb(e(a.x, a.y), a.fillColor || !1)
  };
  this.brush.drawPointS = function (a) {
    fb(e(a.x + f.x, a.y + f.y), a.fillColor || !1)
  };
  var Ab = function (a, b, c, d, e, g) {
    k.fillStyle = d;
    k.strokeStyle = e;
    k.lineWidth = g;
    e = -f.x + a.x + (g ? g /
        2 : 0);
    a = -f.y + a.y + (g ? g / 2 : 0);
    k.beginPath();
    k.moveTo(e + c, a);
    k.lineTo(e + b.w - c, a);
    k.quadraticCurveTo(e + b.w, a, e + b.w, a + c);
    k.lineTo(e + b.w, a + b.h - c);
    k.quadraticCurveTo(e + b.w, a + b.h, e + b.w - c, a + b.h);
    k.lineTo(e + c, a + b.h);
    k.quadraticCurveTo(e, a + b.h, e, a + b.h - c);
    k.lineTo(e, a + c);
    k.quadraticCurveTo(e, a, e + c, a);
    k.closePath();
    d && k.fill();
    g && k.stroke()
  };
  this.brush.drawRoundRect = function (a) {
    Ab(e(a.x, a.y), D(a.w, a.h), a.radius || 2, a.fillColor || !1, a.strokeColor || u.strokeStyle, a.strokeWidth || !1)
  };
  this.brush.drawRoundRectS = function (a) {
    Ab(e(f.x +
      a.x, f.y + a.y), D(a.w, a.h), a.radius || 2, a.fillColor || !1, a.strokeColor || u.strokeStyle, a.strokeWidth || !1)
  };
  var xa = function (a, b, c, d, e) {
    k.fillStyle = c;
    k.strokeStyle = d;
    k.lineWidth = e;
    d = -f.x + b + (e ? e / 2 : 0);
    var g = -f.y + b + (e ? e / 2 : 0);
    k.beginPath();
    k.arc(a.x + d, a.y + g, b, 0, 2 * Math.PI, !0);
    k.closePath();
    c && k.fill();
    e && k.stroke()
  };
  this.brush.drawCircle = function (a) {
    xa(e(a.x, a.y), a.radius, a.fillColor || !1, a.strokeColor || u.strokeStyle, a.strokeWidth || !1)
  };
  this.brush.drawCircleS = function (a) {
    xa(e(a.x + f.x, a.y + f.y), a.radius, a.fillColor ||
      !1, a.strokeColor || u.strokeStyle, a.strokeWidth || !1)
  };
  var aa = function (a, b, c, d) {
    k.strokeStyle = c;
    k.lineWidth = d;
    c = -f.x;
    d = -f.y;
    k.beginPath();
    k.moveTo(c + a.x, d + a.y);
    k.lineTo(c + b.x, d + b.y);
    k.closePath();
    k.stroke()
  };
  this.brush.drawLineAngle = function (a) {
    var b = N(e(a.x + a.length, a.y), e(a.x, a.y), a.angle);
    aa(e(a.x, a.y), e(b.x, b.y), a.strokeColor || u.strokeStyle, a.strokeWidth || 1)
  };
  this.brush.drawLineAngleS = function (a) {
    var b = N(e(f.x + a.x + a.length, f.y + a.y), e(f.x + a.x, f.y + a.y), a.angle);
    aa(e(f.x + a.x, f.y + a.y), e(b.x, b.y), a.strokeColor ||
      u.strokeStyle, a.strokeWidth || 1)
  };
  this.brush.drawLine = function (a) {
    aa(e(a.x1, a.y1), e(a.x1 + a.x2, a.y1 + a.y2), a.strokeColor || u.strokeStyle, a.strokeWidth || 1)
  };
  this.brush.drawLineS = function (a) {
    aa(e(f.x + a.x1, f.y + a.y1), e(f.x + a.x2, f.y + a.y2), a.strokeColor || u.strokeStyle, a.strokeWidth || 1)
  };
  this.brush.drawLineA = function (a) {
    aa(e(a.x1, a.y1), e(a.x2, a.y2), a.strokeColor || u.strokeStyle, a.strokeWidth || 1)
  };
  this.brush.drawLineAS = function (a) {
    aa(e(a.x1 + f.x, a.y1 + f.y), e(a.x2 + f.x, a.y2 + f.y), a.strokeColor || u.strokeStyle, a.strokeWidth ||
      1)
  };
  this.brush.drawEllips = function (a) {
    var b = a.w / 2, c = a.h / 2, d = e(-f.x + a.x, -f.y + a.y);
    k.save();
    k.translate(d.x, d.y);
    k.scale(b / c, 1);
    k.translate(-d.x, -d.y);
    xa(e(a.x, a.y), c, a.fillColor, a.strokeColor, a.strokeWidth);
    k.restore()
  };
  this.brush.drawEllipsS = function (a) {
    var b = a.w / 2, c = a.h / 2, d = e(a.x, a.y);
    k.save();
    k.translate(d.x, d.y);
    k.scale(b / c, 1);
    k.translate(-d.x, -d.y);
    xa(e(f.x + a.x, f.y + a.y), c, a.fillColor, a.strokeColor, a.strokeWidth);
    k.restore()
  };
  this.brush.drawImageS = function (a) {
    if (a.file)if (v(n[a.file])) {
      if (n[a.file].loaded) {
        var b =
          a.x || 0, c = a.y || 0;
        if (a.w && !a.h) {
          var d = a.w / n[a.file].w;
          var e = a.w;
          var f = n[a.file].h * d
        } else!a.w && a.h ? (d = a.h / n[a.file].h, f = a.h, e = n[a.file].w * d) : a.w && a.h ? (e = a.w, f = a.h) : (e = n[a.file].w, f = n[a.file].h);
        a.scale && (e *= a.scale, f *= a.scale);
        k.drawImage(n[a.file].img, 0, 0, n[a.file].w, n[a.file].h, b, c, e, f)
      }
    } else n[a.file] = {loaded: !1}, d = g.document.createElement("img"), d.onload = function () {
      n[a.file].loaded = !0;
      n[a.file].img = this;
      n[a.file].w = this.width;
      n[a.file].h = this.height;
      B.load()
    }, d.src = a.file, B.add()
  };
  this.brush.drawImage =
    function (a) {
      if (a.file)if (v(n[a.file])) {
        if (n[a.file].loaded) {
          var b = a.x || 0, c = a.y || 0;
          if (a.w && !a.h) {
            var d = a.w / n[a.file].w;
            var e = a.w;
            var h = n[a.file].h * d
          } else!a.w && a.h ? (d = a.h / n[a.file].h, h = a.h, e = n[a.file].w * d) : a.w && a.h ? (e = a.w, h = a.h) : (e = n[a.file].w, h = n[a.file].h);
          a.scale && (e *= a.scale, h *= a.scale);
          k.drawImage(n[a.file].img, 0, 0, n[a.file].w, n[a.file].h, -f.x + b, -f.y + c, e, h)
        }
      } else n[a.file] = {}, n[a.file].loaded = !1, d = g.document.createElement("img"), d.onload = function () {
        n[a.file].loaded = !0;
        n[a.file].img = this;
        n[a.file].w =
          this.width;
        n[a.file].h = this.height;
        B.load()
      }, d.src = a.file, B.add()
    };
  this.brush.onContext = function (a) {
    a(k)
  };
  this.brush.getPixelColor = function (a, b) {
    var c = k.getImageData(a, b, 1, 1).data;
    return "rgb(" + c[0] + ", " + c[1] + ", " + c[2] + ")"
  };
  this.brush.setPixelColor = function (a, b, c) {
    var d = k.createImageData(1, 1);
    d.data[0] = c.r || d.data[0];
    d.data[1] = c.g || d.data[1];
    d.data[2] = c.b || d.data[2];
    d.data[3] = c.a || 255;
    k.putImageData(d, a, b)
  };
  this.brush.onPixel = function (a, b, c) {
    var d = k.getImageData(a, b, 1, 1), e = {
      r: d.data[0], g: d.data[1],
      b: d.data[2], a: d.data[3] ? d.data[3] : 255
    };
    c(e);
    d.data[0] = e.r;
    d.data[1] = e.g;
    d.data[2] = e.b;
    d.data[3] = e.a;
    k.putImageData(d, a, b)
  };
  this.brush.onPixels = function (a, b, c, d, e) {
    c = k.getImageData(a, b, c, d);
    var f;
    d = 0;
    for (f = c.data.length; d < f; d += 4) {
      var g = {r: c.data[d], g: c.data[d + 1], b: c.data[d + 2], a: c.data[d + 3] ? c.data[d + 3] : 255};
      e(g);
      c.data[d] = g.r;
      c.data[d + 1] = g.g;
      c.data[d + 2] = g.b;
      c.data[d + 3] = g.a
    }
    k.putImageData(c, a, b)
  };
  this.brush.onRawPixels = function (a, b, c, d, e) {
    c = k.getImageData(a, b, c, d);
    e(c.data, c.data.length);
    k.putImageData(c,
      a, b)
  };
  var T = g.AudioContext || g.webkitAudioContext || !1;
  (T = T ? new T : !1) && T.listener.setPosition(0, 0, 0);
  var U = function (a, b) {
    T || E('module "wAudio" is not supported! use a "audio"');
    this.vol = b && 1 >= b && 0 < b ? b : 1;
    this.loadPLay = this.nextPlay = this.loaded = this.playing = !1;
    this.pausedTime = this.duration = this.startTime = 0;
    var c = this, d = new XMLHttpRequest;
    d.open("GET", a, !0);
    d.responseType = "arraybuffer";
    d.onload = function (a) {
      T.decodeAudioData(this.response, function (a) {
        c.wABuffer = a;
        c.duration = c.wABuffer.duration;
        c.wAGain =
          T.createGain();
        c.wAGain.gain.value = c.vol;
        c.wAPanner = T.createPanner();
        c.wAPanner.setPosition(0, 0, 1);
        c.wAPanner.panningModel = "equalpower";
        B.load();
        c.loaded = !0;
        c.loadPlay && c.replay()
      }, function (a) {
        E("error in wAudio.newAudio : error decoding file", a)
      })
    };
    a ? d.send() : E("error in wAudio.newAudio : Where is file?");
    B.add()
  };
  U.prototype.play = function (a) {
    if (!this.loaded) this.loadPlay = !0; else if (!this.playing) {
      this.playing = !0;
      this.wASource = T.createBufferSource();
      this.wASource.buffer = this.wABuffer;
      this.wAListener =
        T.destination;
      this.wASource.connect(this.wAGain);
      this.wAGain.connect(this.wAPanner);
      this.wAPanner.connect(this.wAListener);
      this.wASource.start(0, this.pausedTime, this.duration);
      this.startTime = T.currentTime;
      var b = this;
      this.wASource.onended = function () {
        b.playing = !1;
        b.startTime = 0;
        b.pausedTime = 0;
        b.nextPlay && b.nextPlay.replay()
      }
    }
  };
  U.prototype.replay = function (a) {
    this.loaded ? (this.stop(), this.play()) : this.loadPlay = !0
  };
  U.prototype.stop = function () {
    this.pause();
    this.pausedTime = this.startTime = 0
  };
  U.prototype.pause =
    function () {
      if (this.playing) {
        this.pausedTime = this.getProgress();
        this.playing = !1;
        this.wASource.stop(0);
        var a = this;
        this.wASource.onended = function () {
          a.playing = !1
        }
      }
    };
  U.prototype.getProgress = function () {
    return this.playing ? T.currentTime - this.startTime + this.pausedTime : this.pausedTime
  };
  U.prototype.playPause = function () {
    this.playing ? this.pause() : this.play()
  };
  U.prototype.setNextPlay = function (a) {
    this.nextPlay = a
  };
  U.prototype.setVolume = function (a) {
    this.vol = a && 1 >= a && 0 < a ? a : this.vol;
    this.wAGain.gain.value = this.vol
  };
  U.prototype.getVolume = function () {
    return this.vol
  };
  U.prototype.setSide = function (a) {
    this.side = a;
    this.wAPanner && this.wAPanner.setPosition(this.side, 0, 1 - Math.abs(this.side))
  };
  U.prototype.getSide = function () {
    return this.side
  };
  this.wAudio.newAudio = function (a, b) {
    return new U(a, b)
  };
  var fa = function (a, b) {
    var c, d = g.document.createElement("audio");
    if ("string" == typeof a) {
      var e = g.document.createElement("source");
      e.src = a;
      d.appendChild(e)
    } else {
      var f = 0;
      for (c = a.length; f < c; f += 1)e = g.document.createElement("source"), e.src =
        a[f], d.appendChild(e)
    }
    this.vol = b && 1 >= b && 0 < b ? b : 1;
    this.playing = 0;
    this.audio = d;
    this.nextPlay = this.loaded = !1;
    this.audio.volume = this.vol;
    var h = this;
    this.audio.onloadeddata = function () {
      h.loaded = !0;
      B.load()
    };
    this.audio.onended = function () {
      h.playing = !1;
      h.nextPlay && h.nextPlay.play()
    };
    this.audio.load();
    B.add()
  };
  fa.prototype.play = function (a) {
    this.playing || (a && (this.vol = a && 1 >= a && 0 < a ? a : this.vol, this.audio.volume = this.vol), this.playing = !0, this.audio.play())
  };
  fa.prototype.replay = function (a) {
    a && this.setVolume(a);
    this.playing =
      !0;
    this.audio.currentTime = 0;
    this.audio.play()
  };
  fa.prototype.stop = function () {
    this.playing && (this.playing = !1, this.audio.pause(), this.audio.currentTime = 0)
  };
  fa.prototype.pause = function () {
    this.playing && (this.playing = !1, this.audio.pause())
  };
  fa.prototype.playPause = function () {
    this.playing ? this.pause() : this.play()
  };
  fa.prototype.setNextPlay = function (a) {
    this.nextPlay = a
  };
  fa.prototype.setVolume = function (a) {
    this.vol = a && 1 >= a && 0 < a ? a : this.vol;
    this.audio.volume = this.vol
  };
  fa.prototype.getVolume = function () {
    return this.vol
  };
  this.audio.newAudio = function (a, b) {
    return new fa(a, b)
  };
  var gb = [];
  this.zList.add = function (a) {
    gb.push(a)
  };
  this.zList.init = function (a) {
    OOP.forArr(a, function (a) {
      t.zList.add(a)
    })
  };
  this.zList.update = function () {
    gb.sort(function (a, b) {
      return a.y + a.h - (b.y + b.h)
    })
  };
  this.zList.draw = function (a) {
    OOP.drawArr(gb, a)
  };
  this.zList.del = function (a) {
    OOP.delObject(gb, a)
  };
  var B = {
    count: 0, loaded: 0, errored: 0, add: function () {
      this.count += 1
    }, load: function () {
      this.loaded += 1
    }, error: function () {
      this.errored += 1
    }
  };
  this.resources.isLoaded =
    function () {
      return B.count == B.loaded
    };
  this.resources.getProgress = function () {
    return Math.ceil(B.loaded / B.count * 100)
  };
  this.levels.forStringArray = function (a, b) {
    var c = a.offset || e(0, 0);
    x(a.source, function (d, e) {
      x(d, function (d, f) {
        " " != d && b(d, c.x + a.w * f, c.y + a.h * e, a.w, a.h)
      })
    })
  };
  var Ec = function (a) {
    "ImageObject" == a.type && "undefined" != typeof RESOURCES && a.resFile && (a.file = RESOURCES[a.resFile]);
    "AnimationObject" == a.type && "undefined" != typeof ANIMATIONS && a.animId && (a.anim = ANIMATIONS[a.animId]);
    var b = Zb(a);
    b.name = "";
    O(a, function (a, d) {
      "id" != d && (b[d] = a)
    });
    return b
  }, kc = function (a, b) {
    var c = {settings: {}, objects: []};
    a = JSON.parse(a);
    c.settings = a.settings;
    x(a.objects, function (a) {
      var d = Ec(a);
      d.name = a.name;
      b && b(d);
      c.objects.push(d)
    });
    return c
  }, lc = function (a, b, c) {
    var d = [], e = {};
    if (a && "json" == b) {
      b = kc(a, c);
      d = b.objects;
      e = b.settings;
      var f = a
    }
    this.backgroundColor = e.backgroundColor ? e.backgroundColor : !1;
    this.reload = function () {
      d = kc(f)
    };
    this.clear = function () {
      Yb(d)
    };
    this.add = function (a) {
      d.push(a)
    };
    this.del = function (a) {
      x(d, function (b,
                     c) {
        if (a.id == b.id)return d.splice(c, 1), "break"
      })
    };
    this.delById = function (a) {
      d.splice(a, 1)
    };
    this.getObjects = function () {
      return d
    };
    this.getObjectByName = function (a) {
      var b;
      var c = 0;
      for (b = d.length; c < b; c += 1)if (d[c].name == a)return d[c];
      return !1
    };
    this.getObjectById = function (a) {
      var b;
      var c = 0;
      for (b = d.length; c < b; c += 1)if (d[c].id == a)return d[c];
      return !1
    };
    this.draw = function (a) {
      this.backgroundColor && t.game.fill(this.backgroundColor);
      x(d, function (b) {
        a && a(b);
        b.draw()
      })
    };
    this.getLevelAsJSON = function (a, b) {
      var c = '{"settings":' +
        JSON.stringify({backgroundColor: this.backgroundColor}) + ',"objects":[';
      if (!d.length)return c + "]}";
      x(d, function (d, e) {
        a && a(d);
        c += "{";
        O(d, function (a, b) {
          "function" != typeof a && (c += '"' + b + '":' + JSON.stringify(a) + ",")
        });
        c = c.substr(0, c.length - 1) + "},";
        b && b(d)
      });
      c = c.substr(0, c.length - 1);
      return c + "]}"
    }
  };
  this.levels.newLevelFromJSON = function (a, b) {
    return new lc(a, "json", b || !1)
  };
  this.levels.newEmptyLevel = function (a) {
    return new lc(!1)
  };
  var mc = 0, nc = 0, Gb = 0, oc = !1;
  this.system.initFPSCheck = function () {
    oc || (oc = !0, r.addEvent("postLoop",
      "fpsCheckUpdate", function () {
        Gb += 1;
        1E3 <= L - nc && (mc = Gb, Gb = 0, nc = L)
      }))
  };
  this.system.getFPS = function () {
    return mc
  };
  this.OOP.newRever = function (a, b, c) {
    var d = function (a, b, c) {
      this.min = a;
      this.max = b;
      this.step = c;
      this.value = a;
      this.to = c
    };
    d.prototype = {
      update: function () {
        var a = this.value;
        this.value <= this.min ? this.to = this.step : this.value >= this.max && (this.to = -this.step);
        this.value += this.to;
        return a
      }, getValue: function () {
        return this.value
      }, setValue: function (a) {
        this.value = parseFloat(a)
      }, setStep: function (a) {
        this.step = a
      },
      getStep: function () {
        return this.step
      }
    };
    return new d(a, b, c)
  };
  var pc = {};
  this.OOP.once = function (a, b) {
    pc[a] || (pc[a] = !0, b())
  };
  this.OOP.newTimer = function (a, b) {
    if (0 >= a)return da("error in system.newTimer : variable < 0, Timer is not created");
    var c = {
      time: 0 < a ? a : 1E3, func: b, startTime: !1, ending: !1, start: function () {
        this.ending || this.startTime || (this.startTime = L)
      }, run: function () {
        !this.ending && this.startTime && L - this.startTime >= this.time && (this.func(), this.ending = !0)
      }, end: function () {
        this.ending || (this.ending = !0,
          this.func())
      }, restart: function (a) {
        this.startTime || this.start();
        if (this.ending) {
          if (a && 0 >= a)return da("error in Timer.restart : variable < 0");
          a && (this.time = a);
          this.ending = !1;
          this.startTime = L
        }
      }, stop: function () {
        this.ending || (this.ending = !0)
      }
    };
    r.addEvent("postLoop", "timer" + ba(-100, 100) * ba(-100, 100) + L, function () {
      c.run()
    });
    return c
  };
  this.memory.local = {
    storage: g.localStorage, clear: function () {
      this.storage.clear()
    }, save: function (a, b) {
      this.storage.setItem(a, b)
    }, saveAsObject: function (a, b) {
      var c = JSON.stringify(b);
      this.storage.setItem(a, c)
    }, loadAsObject: function (a) {
      return JSON.parse(this.storage.getItem(a))
    }, load: function (a) {
      return this.storage.getItem(a)
    }, loadAsNumber: function (a) {
      return parseFloat(this.storage.getItem(a))
    }
  };
  this.memory.temp = {
    values: {}, save: function (a, b) {
      this.values[a] = b
    }, load: function (a) {
      return this.values[a]
    }, loadAsNumber: function (a) {
      return parseFloat(this.values[a])
    }
  };
  g.onload = function () {
    for (var a in u)k[a] = u[a];
    k.save();
    r.runEvent("onload");
    r.loaded = !0;
    "function" == typeof POINTJS_USER_ONLOAD &&
    POINTJS_USER_ONLOAD();
    return !1
  };
  g.onblur = function () {
    if (ma)return r.runEvent("gameBlur"), !1
  };
  g.onfocus = function () {
    if (!ma)return g.document.activeElement.blur(), g.focus(), r.runEvent("gameFocus"), !1
  };
  g.onresize = function () {
    r.runEvent("gameResize");
    k.textBaseline = u.textBaseline;
    return !1
  };
  g.onclick = function () {
    g.document.activeElement.blur();
    g.focus()
  };
  if ("undefined" !== typeof POINTJS_LOADED_DOM_IGNORE) g.onload()
};