(function () {
  function n(t, i, r) {
    function u(f, o) {
      var h, c, s;
      if (!i[f]) {
        if (!t[f]) {
          if (h = "function" == typeof require && require, !o && h) return h(f, !0);
          if (e) return e(f, !0);
          c = new Error("Cannot find module '" + f + "'");
          throw c.code = "MODULE_NOT_FOUND", c;
        }
        s = i[f] = {
          exports: {}
        };
        t[f][0].call(s.exports, function (n) {
          var i = t[f][1][n];
          return u(i || n)
        }, s, s.exports, n, t, i, r)
      }
      return i[f].exports
    }
    for (var e = "function" == typeof require && require, f = 0; f < r.length; f++) u(r[f]);
    return u
  }
  return n
})()({
  1: [function () {
    function f(n) {
      PDFJS.getDocument(n).then(function (n) {
        var e = document.getElementById("container"),
          f;
        for (r = n.numPages, f = 1; f <= n.numPages; f++) n.getPage(f).then(function (n) {
          var h = n.getViewport(1.5),
            o = document.createElement("div"),
            s, c, l;
          o.setAttribute("id", "page-" + (n.pageIndex + 1));
          o.setAttribute("style", "position: relative");
          e.appendChild(o);
          s = document.createElement("canvas");
          o.appendChild(s);
          c = s.getContext("2d");
          s.height = h.height;
          s.width = h.width;
          l = {
            canvasContext: c,
            viewport: h
          };
          n.render(l).then(function () {
            return n.getTextContent()
          }).then(function (e) {
            var s = document.createElement("div"),
              c, a, l;
            s.setAttribute("class", "textLayer");
            o.appendChild(s);
            c = new TextLayerBuilder({
              textLayerDiv: s,
              pageIndex: n.pageIndex,
              viewport: h
            });
            c.setTextContent(e);
            c.render();
            u.push(f);
            u.length == r && (a = function () {
              return {
                beforeAnnotationCreated: function (n) {
                  n.uri = window.location.href
                }
              }
            }, l = (new annotator.App).include(annotator.ui.main, {
              element: document.body
            }).include(annotator.storage.http, {
              prefix: "http://localhost:3000/api",
              urls: {
                create: `/annotations/${i}`,
                search: `/search/${i}`
              }
            }).include(a), l.start().then(function () {
              l.annotations.load({
                uri: window.location.href
              })
            }), t = !0, t && $(".loader").hide())
          })
        });
        t == !1 && $(".loader").show()
      })
    }
    var i, r, n, t;
    let u = [];
    t = !1;
    document.querySelector("#pdf-upload").addEventListener("change", function (t) {
      var r = t.target.files[0],
        u;
      if (n = $(this).attr("data-scale"), n == "undefined" && (n = 1.5), r.type != "application/pdf") {
        console.error(r.name, "is not a pdf file.");
        $(".container").append(`<div class="alert alert-primary" role="alert">
        ${r.name}, is not a pdf file, Please re-load choose again!
      </div>`);
        return
      }
      console.log(n);
      i = r.name;
      u = new FileReader;
      u.onload = function () {
        var n = new Uint8Array(this.result);
        url = n;
        f(url)
      };
      u.readAsArrayBuffer(r)
    })
  }, {}]
}, {}, [1])