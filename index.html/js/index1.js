(function () {
    function u(a, b, c) {
        var d = document.createElement("li"); 
        d.width = e.tileWidth; 
        d.height = e.tileHeight; 
        d.number = a; 
        d.row = b; 
        d.col = c; 
        return d
    }
    function m() {
        return new m.prototype.init
    }
    var e = {
        tileWidth: .75,
        tileHeight: .75,
        tileSet: [],
        tableRows: 10,
        baseScore: 5,
        stepScore: 10,
        targetScore: 2E3,
        el: document.querySelector("#starList"),//锁定html中的ul（星星地图）
        scoreTarget: document.querySelector("#scoreTarget"),
        scoreCurrent: document.querySelector("#scoreCurrent"),
        scoreSelect: document.querySelector("#scoreSelect"),
        scoreLevel: document.querySelector("#scoreLevel")
    },
        n = !0, t = [], p = 0, r = null, q = 1; m.prototype = {
            init: function () {
                this.initTable()
            },
            initTable: function () {
                this.initScore();
                this.initTileSet();
                this.initBlocks()
            },
            initScore: function () {
                (new CountUp(e.scoreTarget, e.targetScore, e.targetScore)).start();
                e.scoreCurrent.innerHTML = p; 
                e.scoreLevel.innerHTML = q
            },
            mouseClick: function () {
                var a = e.tileSet, b = t, c = e.baseScore, d = e.stepScore, f = e.el, g = this, h = b.length; if (n && !(1 >= h)) {
                    n = !1;
                    r = null;
                    for (var l = 0, k = 0; k < h; k++)l += c + k * d; (new CountUp(e.scoreCurrent, p, p += l)).start();
                    for (k = 0; k < h; k++)setTimeout(function (c) {
                        a[b[c].row][b[c].col] =
                            null; f.removeChild(b[c])
                    }, 100 * k, k);
                    setTimeout(function () {
                        g.move();
                        setTimeout(function () {
                            g.isFinish() ? (g.clear(),
                                p >= e.targetScore ? ((new CountUp(e.scoreTarget, e.targetScore, e.targetScore += 1E3 * (q - 1))).start(),
                                    (new CountUp(e.scoreLevel, q, q += 1)).start(),
                                    alert("\u606d\u559c\u83b7\u80dc"),
                                    console.log("\u606d\u559c\u83b7\u80dc")) : (e.targetScore = e.scoreTarget = 2E3, q = p = 0, alert("\u6e38\u620f\u5931\u8d25"), 
                                    console.log("\u6e38\u620f\u5931\u8d25")),
                                n = !0) : (b = [], n = !0, g.mouseOver(r))
                        }, 300 + 150 * b.length)
                    }, 100 * b.length)
                }
            },
            clear: function () {
                for (var a = e.tileSet, b = e.el, c = [], d = a.length - 1; 0 <= d; d--)
                for (var f = a[d].length - 1; 0 <= f; f--)
                null !== a[d][f] && (c.push(a[d][f]), a[d][f] = null);
                for (a = 0; a < c.length; a++)setTimeout(function (a) {
                    b.removeChild(c[a]);
                    a >= c.length - 1 && setTimeout(function (a) { new m }, 1E3)
                }, 100 * a, a)
            },
            isFinish: function () {
                for (var a = e.tileSet, b = a.length, c = 0; c < b; c++)
                    for (var d = a[c].length, f = 0; f < d; f++) {
                        var g = [];
                        this.checkLink(a[c][f], g);
                        if (1 < g.length) return !1
                    }
                return !0
            },
            move: function () {
                for (var a = e.tableRows, b = e.tileSet, c = 0; c < a; c++)
                    for (var d = 0, f = 0; f < a; f++)null != b[f][c] && (f !== d && (b[d][c] = b[f][c], b[f][c].row = d, b[f][c] = null), d++);
                for (c = 0; c < b[0].length;)if (null == b[0][c])
                    for (f = 0; f < a; f++)b[f].splice(c, 1); 
                    else c++;
                this.refresh()
            },
            mouseOver: function (a) {
                if (n) {
                    this.clearFlicker();
                    var b = [];
                    this.checkLink(a, b);
                    t = b; 1 >= b.length || (this.flicker(b),
                        this.computeScore(b))
                } else r = a
            },
            computeScore: function (a) {
                for (var b = 0, c = a.length, d = e.baseScore, f = e.stepScore, g = 0; g < c; g++)b += d + g * f;
                0 >= b || (e.scoreSelect.style.opacity = "1",
                    e.scoreSelect.innerHTML = a.length + "\u8fde\u6d88 " + b + "\u5206",
                    setTimeout(function () { e.scoreSelect.style.opacity = "0" }, 1200))
            },
            clearFlicker: function () {
                for (var a = e.tileSet, b = 0; b < a.length; b++)
                    for (var c = 0; c < a[b].length; c++) {
                        var d = a[b][c];
                        null !== d && d.classList.remove("scale")
                    }
            },
            flicker: function (a) {
                for (var b = 0; b < a.length; b++)a[b].classList.add("scale")
            },
            checkLink: function (a, b) {
                if (null !== a) {
                    b.push(a);
                    var c = e.tileSet, d = e.tableRows;
                    0 < a.col && c[a.row][a.col - 1] && c[a.row][a.col - 1].number === a.number && -1 === b.indexOf(c[a.row][a.col - 1]) && this.checkLink(c[a.row][a.col - 1], b);
                    a.col < d - 1 && c[a.row][a.col + 1] && c[a.row][a.col + 1].number === a.number && -1 === b.indexOf(c[a.row][a.col + 1]) && this.checkLink(c[a.row][a.col + 1], b); a.row < d - 1 && c[a.row + 1][a.col] && c[a.row + 1][a.col].number === a.number && -1 === b.indexOf(c[a.row + 1][a.col]) && this.checkLink(c[a.row + 1][a.col], b); 
                    0 < a.row && c[a.row - 1][a.col] && c[a.row - 1][a.col].number === a.number && -1 === b.indexOf(c[a.row - 1][a.col]) && this.checkLink(c[a.row - 1][a.col], b)
                }
            },
            initTileSet: function () {
                for (var a = e.tableRows, b = e.tileSet, c = 0; c < a; c++) {
                    b[c] = []; for (var d = 0; d < a; d++)b[c][d] = []
                }
            },
            initBlocks: function () {
                for (var a = e.tileSet, b = this, c = e.el, d = a.length, f = 0; f < d; f++)
                    for (var g = a[f].length, h = 0; h < g; h++) {
                        var l = this.createBlock(Math.floor(5 * Math.random()), f, h);
                        l.onmouseover = function () {
                            b.mouseOver(this)
                        };
                        l.onclick = function () {
                            b.mouseClick()
                        };
                        a[f][h] = l;
                        c.appendChild(l)
                    }
                this.refresh()
            },
            refresh: function () {
                for (var a = e.tileSet, b = 0; b < a.length; b++)for (var c = a[b].length, d = 0; d < c; d++) {
                    var f = a[b][d];
                    null != f && (f.row = b, f.col = d, f.style.left = a[b][d].col * e.tileWidth + "rem", f.style.bottom = a[b][d].row * e.tileHeight + "rem", f.style.backgroundImage = "url('./images/" + a[b][d].number + ".png')")
                }
            },
            createBlock: function (a, b, c) {
                return new u(a, b, c)
            }
        };
    m.prototype.init.prototype = m.prototype; 
    window.PopStar = m

})();