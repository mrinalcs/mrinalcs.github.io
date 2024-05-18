!(function (t, e) {
  "object" == typeof exports && "undefined" != typeof module
    ? (module.exports = e())
    : "function" == typeof define && define.amd
    ? define(e)
    : ((t || self).Swup = e());
})(this, function () {
  let t = new WeakMap();
  function e(e, n, r, i) {
    if (!e && !t.has(n)) return !1;
    let o = t.get(n) ?? new WeakMap();
    t.set(n, o);
    let s = o.get(r) ?? new Set();
    o.set(r, s);
    let a = s.has(i);
    return e ? s.add(i) : s.delete(i), a && e;
  }
  let n = (t, e) =>
      String(t)
        .toLowerCase()
        .replace(/[\s/_.]+/g, "-")
        .replace(/[^\w-]+/g, "")
        .replace(/--+/g, "-")
        .replace(/^-+|-+$/g, "") ||
      e ||
      "",
    r = function (t) {
      let { hash: e } = void 0 === t ? {} : t;
      return (
        window.location.pathname +
        window.location.search +
        (e ? window.location.hash : "")
      );
    },
    i = function (t, e) {
      void 0 === t && (t = null),
        void 0 === e && (e = {}),
        (t = t || r({ hash: !0 }));
      let n = {
        ...(window.history.state || {}),
        url: t,
        random: Math.random(),
        source: "swup",
        ...e,
      };
      window.history.replaceState(n, "", t);
    },
    o = (t, n, r, i) => {
      let o = new AbortController();
      return (
        (function (t, n, r, i = {}) {
          let { signal: o, base: s = document } = i;
          if (o?.aborted) return;
          let { once: a, ...l } = i,
            h = s instanceof Document ? s.documentElement : s,
            c = Boolean("object" == typeof i ? i.capture : i),
            u = (i) => {
              let o = (function (t, e) {
                let n = t.target;
                if (
                  (n instanceof Text && (n = n.parentElement),
                  n instanceof Element && t.currentTarget instanceof Element)
                ) {
                  let r = n.closest(e);
                  if (r && t.currentTarget.contains(r)) return r;
                }
              })(i, t);
              if (o) {
                let s = Object.assign(i, { delegateTarget: o });
                r.call(h, s),
                  a && (h.removeEventListener(n, u, l), e(!1, h, r, d));
              }
            },
            d = JSON.stringify({ selector: t, type: n, capture: c });
          e(!0, h, r, d) || h.addEventListener(n, u, l),
            o?.addEventListener("abort", () => {
              e(!1, h, r, d);
            });
        })(t, n, r, (i = { ...i, signal: o.signal })),
        { destroy: () => o.abort() }
      );
    };
  class s extends URL {
    constructor(t, e) {
      void 0 === e && (e = document.baseURI),
        super(t.toString(), e),
        Object.setPrototypeOf(this, s.prototype);
    }
    get url() {
      return this.pathname + this.search;
    }
    static fromElement(t) {
      let e = t.getAttribute("href") || t.getAttribute("xlink:href") || "";
      return new s(e);
    }
    static fromUrl(t) {
      return new s(t);
    }
  }
  let a = function (t, e) {
    void 0 === e && (e = {});
    try {
      let n = this;
      function r(r) {
        let { status: o, url: a } = u;
        return Promise.resolve(u.text()).then(function (r) {
          if (500 === o)
            throw (
              (n.hooks.call("fetch:error", i, {
                status: o,
                response: u,
                url: a,
              }),
              new l(`Server error: ${a}`, { status: o, url: a }))
            );
          if (!r) throw new l(`Empty response: ${a}`, { status: o, url: a });
          let { url: h } = s.fromUrl(a),
            c = { url: h, html: r };
          return (
            !i.cache.write ||
              (e.method && "GET" !== e.method) ||
              t !== h ||
              n.cache.set(c.url, c),
            c
          );
        });
      }
      t = s.fromUrl(t).url;
      let { visit: i = n.visit } = e,
        o = { ...n.options.requestHeaders, ...e.headers },
        a = e.timeout ?? n.options.timeout,
        h = new AbortController(),
        { signal: c } = h;
      e = { ...e, headers: o, signal: c };
      let u,
        d = !1,
        f = null;
      a &&
        a > 0 &&
        (f = setTimeout(() => {
          (d = !0), h.abort("timeout");
        }, a));
      let p = (function (r, o) {
        try {
          var s = Promise.resolve(
            n.hooks.call("fetch:request", i, { url: t, options: e }, (t, e) => {
              let { url: n, options: r } = e;
              return fetch(n, r);
            })
          ).then(function (t) {
            (u = t), f && clearTimeout(f);
          });
        } catch (a) {
          return o(a);
        }
        return s && s.then ? s.then(void 0, o) : s;
      })(0, function (e) {
        if (d)
          throw (
            (n.hooks.call("fetch:timeout", i, { url: t }),
            new l(`Request timed out: ${t}`, { url: t, timedOut: d }))
          );
        if ("AbortError" === e?.name || c.aborted)
          throw new l(`Request aborted: ${t}`, { url: t, aborted: !0 });
        throw e;
      });
      return Promise.resolve(p && p.then ? p.then(r) : r());
    } catch (v) {
      return Promise.reject(v);
    }
  };
  class l extends Error {
    constructor(t, e) {
      super(t),
        (this.url = void 0),
        (this.status = void 0),
        (this.aborted = void 0),
        (this.timedOut = void 0),
        (this.name = "FetchError"),
        (this.url = e.url),
        (this.status = e.status),
        (this.aborted = e.aborted || !1),
        (this.timedOut = e.timedOut || !1);
    }
  }
  let h = function (t, e) {
      return void 0 === e && (e = document), e.querySelector(t);
    },
    c = function (t, e) {
      return void 0 === e && (e = document), Array.from(e.querySelectorAll(t));
    },
    u = () =>
      new Promise((t) => {
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            t();
          });
        });
      });
  function d(t) {
    return (
      !!t &&
      ("object" == typeof t || "function" == typeof t) &&
      "function" == typeof t.then
    );
  }
  class f {
    constructor(t, e) {
      (this.id = void 0),
        (this.state = void 0),
        (this.from = void 0),
        (this.to = void 0),
        (this.containers = void 0),
        (this.animation = void 0),
        (this.trigger = void 0),
        (this.cache = void 0),
        (this.history = void 0),
        (this.scroll = void 0);
      let { to: n, from: r = t.currentPageUrl, hash: i, el: o, event: s } = e;
      (this.id = Math.random()),
        (this.state = 1),
        (this.from = { url: r }),
        (this.to = { url: n, hash: i }),
        (this.containers = t.options.containers),
        (this.animation = {
          animate: !0,
          wait: !1,
          name: void 0,
          native: t.options.native,
          scope: t.options.animationScope,
          selector: t.options.animationSelector,
        }),
        (this.trigger = { el: o, event: s }),
        (this.cache = { read: t.options.cache, write: t.options.cache }),
        (this.history = { action: "push", popstate: !1, direction: void 0 }),
        (this.scroll = { reset: !0, target: void 0 });
    }
    advance(t) {
      this.state < t && (this.state = t);
    }
    abort() {
      this.state = 8;
    }
    get done() {
      return this.state >= 7;
    }
  }
  let p =
    "undefined" != typeof Symbol
      ? Symbol.iterator || (Symbol.iterator = Symbol("Symbol.iterator"))
      : "@@iterator";
  function v(t, e, n) {
    if (!t.s) {
      if (n instanceof g) {
        if (!n.s) return void (n.o = v.bind(null, t, e));
        1 & e && (e = n.s), (n = n.v);
      }
      if (n && n.then)
        return void n.then(v.bind(null, t, e), v.bind(null, t, 2));
      (t.s = e), (t.v = n);
      let r = t.o;
      r && r(t);
    }
  }
  let g = (function () {
    function t() {}
    return (
      (t.prototype.then = function (e, n) {
        let r = new t(),
          i = this.s;
        if (i) {
          let o = 1 & i ? e : n;
          if (o) {
            try {
              v(r, 1, o(this.v));
            } catch (s) {
              v(r, 2, s);
            }
            return r;
          }
          return this;
        }
        return (
          (this.o = function (t) {
            try {
              let i = t.v;
              1 & t.s ? v(r, 1, e ? e(i) : i) : n ? v(r, 1, n(i)) : v(r, 2, i);
            } catch (o) {
              v(r, 2, o);
            }
          }),
          r
        );
      }),
      t
    );
  })();
  function m(t) {
    return t instanceof g && 1 & t.s;
  }
  let w = (t) => {
      if ((t && "#" === t.charAt(0) && (t = t.substring(1)), !t)) return null;
      let e = decodeURIComponent(t),
        n =
          document.getElementById(t) ||
          document.getElementById(e) ||
          h(`a[name='${CSS.escape(t)}']`) ||
          h(`a[name='${CSS.escape(e)}']`);
      return n || "top" !== t || (n = document.body), n;
    },
    $ = function (t) {
      let { elements: e, selector: n } = t;
      try {
        if (!1 === n && !e) return Promise.resolve();
        let r = [];
        if (e) r = Array.from(e);
        else if (n && !(r = c(n, document.body)).length) Promise.resolve();
        let i = r.map((t) =>
          (function (t) {
            let {
              type: e,
              timeout: n,
              propCount: r,
            } = (function (t) {
              let e = window.getComputedStyle(t),
                n = b(e, `${y}Delay`),
                r = b(e, `${y}Duration`),
                i = S(n, r),
                o = b(e, `${k}Delay`),
                s = b(e, `${k}Duration`),
                a = S(o, s),
                l = Math.max(i, a),
                h = l > 0 ? (i > a ? y : k) : null;
              return {
                type: h,
                timeout: l,
                propCount: h ? (h === y ? r.length : s.length) : 0,
              };
            })(t);
            return (
              !(!e || !n) &&
              new Promise((i) => {
                let o = `${e}end`,
                  s = performance.now(),
                  a = 0,
                  l = () => {
                    t.removeEventListener(o, h), i();
                  },
                  h = (e) => {
                    if (e.target === t) {
                      var n;
                      if (((n = e), ![`${y}end`, `${k}end`].includes(n.type)))
                        throw Error("Not a transition or animation event.");
                      (performance.now() - s) / 1e3 < e.elapsedTime ||
                        (++a >= r && l());
                    }
                  };
                setTimeout(() => {
                  a < r && l();
                }, n + 1),
                  t.addEventListener(o, h);
              })
            );
          })(t)
        );
        return i.filter(Boolean).length > 0
          ? Promise.resolve(Promise.all(i)).then(function () {})
          : n && Promise.resolve();
      } catch (o) {
        return Promise.reject(o);
      }
    },
    y = "transition",
    k = "animation";
  function b(t, e) {
    return (t[e] || "").split(", ");
  }
  function S(t, e) {
    for (; t.length < e.length; ) t = t.concat(t);
    return Math.max(...e.map((e, n) => _(e) + _(t[n])));
  }
  function _(t) {
    return 1e3 * parseFloat(t);
  }
  let E = function (t, e) {
      void 0 === e && (e = {});
      try {
        let o,
          s = this;
        function a(a) {
          if (o) return a;
          (s.navigating = !0), (s.visit = t);
          let { el: l } = t.trigger;
          (e.referrer = e.referrer || s.currentPageUrl),
            !1 === e.animate && (t.animation.animate = !1),
            t.animation.animate || s.classes.clear();
          let h = e.history || l?.getAttribute("data-swup-history") || void 0;
          h && ["push", "replace"].includes(h) && (t.history.action = h);
          let c =
            e.animation || l?.getAttribute("data-swup-animation") || void 0;
          return (
            c && (t.animation.name = c),
            "object" == typeof e.cache
              ? ((t.cache.read = e.cache.read ?? t.cache.read),
                (t.cache.write = e.cache.write ?? t.cache.write))
              : void 0 !== e.cache &&
                (t.cache = { read: !!e.cache, write: !!e.cache }),
            delete e.cache,
            (function (o, a) {
              try {
                var l = (function (o, a) {
                  try {
                    var l = Promise.resolve(
                      s.hooks.call("visit:start", t, void 0)
                    ).then(function () {
                      function o() {
                        if (!t.done)
                          return Promise.resolve(
                            s.hooks.call(
                              "visit:transition",
                              t,
                              void 0,
                              function () {
                                try {
                                  let e;
                                  function n(n) {
                                    return e
                                      ? n
                                      : (t.advance(4),
                                        Promise.resolve(
                                          s.animatePageOut(t)
                                        ).then(function () {
                                          function e() {
                                            return Promise.resolve(
                                              s.animatePageIn(t)
                                            ).then(function () {});
                                          }
                                          let n = (function () {
                                            if (
                                              t.animation.native &&
                                              document.startViewTransition
                                            )
                                              return Promise.resolve(
                                                document.startViewTransition(
                                                  function () {
                                                    try {
                                                      let e = s.renderPage;
                                                      return Promise.resolve(
                                                        a
                                                      ).then(function (n) {
                                                        return Promise.resolve(
                                                          e.call(s, t, n)
                                                        );
                                                      });
                                                    } catch (n) {
                                                      return Promise.reject(n);
                                                    }
                                                  }
                                                ).finished
                                              ).then(function () {});
                                            {
                                              let e = s.renderPage;
                                              return Promise.resolve(a).then(
                                                function (n) {
                                                  return Promise.resolve(
                                                    e.call(s, t, n)
                                                  ).then(function () {});
                                                }
                                              );
                                            }
                                          })();
                                          return n && n.then ? n.then(e) : e();
                                        }));
                                  }
                                  let r = (function () {
                                    if (!t.animation.animate)
                                      return Promise.resolve(
                                        s.hooks.call("animation:skip", void 0)
                                      ).then(function () {
                                        let n = s.renderPage;
                                        return Promise.resolve(a).then(
                                          function (r) {
                                            return Promise.resolve(
                                              n.call(s, t, r)
                                            ).then(function () {
                                              e = 1;
                                            });
                                          }
                                        );
                                      });
                                  })();
                                  return Promise.resolve(
                                    r && r.then ? r.then(n) : n(r)
                                  );
                                } catch (i) {
                                  return Promise.reject(i);
                                }
                              }
                            )
                          ).then(function () {
                            if (!t.done)
                              return Promise.resolve(
                                s.hooks.call("visit:end", t, void 0, () =>
                                  s.classes.clear()
                                )
                              ).then(function () {
                                (t.state = 7),
                                  (s.navigating = !1),
                                  s.onVisitEnd &&
                                    (s.onVisitEnd(), (s.onVisitEnd = void 0));
                              });
                          });
                      }
                      t.state = 3;
                      let a = s.hooks.call(
                        "page:load",
                        t,
                        { options: e },
                        function (t, e) {
                          try {
                            function n(t) {
                              return (e.page = t), (e.cache = !!r), e.page;
                            }
                            let r;
                            return (
                              t.cache.read && (r = s.cache.get(t.to.url)),
                              Promise.resolve(
                                r
                                  ? n(r)
                                  : Promise.resolve(
                                      s.fetchPage(t.to.url, e.options)
                                    ).then(n)
                              )
                            );
                          } catch (i) {
                            return Promise.reject(i);
                          }
                        }
                      );
                      if (
                        (a.then((e) => {
                          let { html: n } = e;
                          t.advance(5),
                            (t.to.html = n),
                            (t.to.document = new DOMParser().parseFromString(
                              n,
                              "text/html"
                            ));
                        }),
                        !t.history.popstate)
                      ) {
                        let l = t.to.url + t.to.hash;
                        "replace" === t.history.action ||
                        t.to.url === s.currentPageUrl
                          ? i(l)
                          : (s.currentHistoryIndex++,
                            (function (t, e) {
                              void 0 === e && (e = {});
                              let n = {
                                url: (t = t || r({ hash: !0 })),
                                random: Math.random(),
                                source: "swup",
                                ...e,
                              };
                              window.history.pushState(n, "", t);
                            })(l, { index: s.currentHistoryIndex }));
                      }
                      (s.currentPageUrl = r()),
                        t.history.popstate && s.classes.add("is-popstate"),
                        t.animation.name &&
                          s.classes.add(`to-${n(t.animation.name)}`);
                      let h = (function () {
                        if (t.animation.wait)
                          return Promise.resolve(a).then(function () {});
                      })();
                      return h && h.then ? h.then(o) : o();
                    });
                  } catch (h) {
                    return a(h);
                  }
                  return l && l.then ? l.then(void 0, a) : l;
                })(0, function (e) {
                  e && !e?.aborted
                    ? ((t.state = 9),
                      console.error(e),
                      (s.options.skipPopStateHandling = () => (
                        window.location.assign(t.to.url + t.to.hash), !0
                      )),
                      window.history.back())
                    : (t.state = 8);
                });
              } catch (h) {
                return a(!0, h);
              }
              return l && l.then
                ? l.then(a.bind(null, !1), a.bind(null, !0))
                : a(!1, l);
            })(0, function (e, n) {
              if ((delete t.to.document, e)) throw n;
              return n;
            })
          );
        }
        let l = (function () {
          if (s.navigating)
            return (function () {
              if (!(s.visit.state >= 6))
                return Promise.resolve(
                  s.hooks.call("visit:abort", s.visit, void 0)
                ).then(function () {
                  delete s.visit.to.document, (s.visit.state = 8);
                });
              (t.state = 2),
                (s.onVisitEnd = () => s.performNavigation(t, e)),
                (o = 1);
            })();
        })();
        return Promise.resolve(l && l.then ? l.then(a) : a(l));
      } catch (h) {
        return Promise.reject(h);
      }
    },
    U = function (t) {
      try {
        let e = this;
        return Promise.resolve(
          e.hooks.call("animation:out:start", t, void 0, () => {
            e.classes.add("is-changing", "is-animating", "is-leaving");
          })
        ).then(function () {
          return Promise.resolve(
            e.hooks.call("animation:out:await", t, { skip: !1 }, (t, n) => {
              let { skip: r } = n;
              if (!r)
                return e.awaitAnimations({ selector: t.animation.selector });
            })
          ).then(function () {
            return Promise.resolve(
              e.hooks.call("animation:out:end", t, void 0)
            ).then(function () {});
          });
        });
      } catch (n) {
        return Promise.reject(n);
      }
    },
    P = function (t) {
      let e = t.to.document;
      if (!e) return !1;
      let n = e.querySelector("title")?.innerText || "";
      document.title = n;
      let r = c('[data-swup-persist]:not([data-swup-persist=""])'),
        i = t.containers
          .map((t) => {
            let n = document.querySelector(t),
              r = e.querySelector(t);
            return n && r
              ? (n.replaceWith(r.cloneNode(!0)), !0)
              : (n ||
                  console.warn(
                    `[swup] Container missing in current document: ${t}`
                  ),
                r ||
                  console.warn(
                    `[swup] Container missing in incoming document: ${t}`
                  ),
                !1);
          })
          .filter(Boolean);
      return (
        r.forEach((t) => {
          let e = t.getAttribute("data-swup-persist"),
            n = h(`[data-swup-persist="${e}"]`);
          n && n !== t && n.replaceWith(t);
        }),
        i.length === t.containers.length
      );
    },
    x = function (t) {
      let e = { behavior: "auto" },
        { target: n, reset: r } = t.scroll,
        i = n ?? t.to.hash,
        o = !1;
      return (
        i &&
          (o = this.hooks.callSync(
            "scroll:anchor",
            t,
            { hash: i, options: e },
            (t, e) => {
              let { hash: n, options: r } = e,
                i = this.getAnchorElement(n);
              return i && i.scrollIntoView(r), !!i;
            }
          )),
        r &&
          !o &&
          (o = this.hooks.callSync("scroll:top", t, { options: e }, (t, e) => {
            let { options: n } = e;
            return window.scrollTo({ top: 0, left: 0, ...n }), !0;
          })),
        o
      );
    },
    C = function (t) {
      try {
        let e = this;
        if (t.done) return Promise.resolve();
        let n = e.hooks.call("animation:in:await", t, { skip: !1 }, (t, n) => {
          let { skip: r } = n;
          if (!r) return e.awaitAnimations({ selector: t.animation.selector });
        });
        return Promise.resolve(u()).then(function () {
          return Promise.resolve(
            e.hooks.call("animation:in:start", t, void 0, () => {
              e.classes.remove("is-animating");
            })
          ).then(function () {
            return Promise.resolve(n).then(function () {
              return Promise.resolve(
                e.hooks.call("animation:in:end", t, void 0)
              ).then(function () {});
            });
          });
        });
      } catch (r) {
        return Promise.reject(r);
      }
    },
    H = function (t, e) {
      try {
        let o = this;
        if (t.done) return Promise.resolve();
        t.advance(6);
        let { url: s } = e;
        return (
          o.isSameResolvedUrl(r(), s) ||
            (i(s), (o.currentPageUrl = r()), (t.to.url = o.currentPageUrl)),
          Promise.resolve(
            o.hooks.call("content:replace", t, { page: e }, (t, e) => {
              if (
                (o.classes.remove("is-leaving"),
                t.animation.animate && o.classes.add("is-rendering"),
                !o.replaceContent(t))
              )
                throw Error("[swup] Container mismatch, aborting");
              t.animation.animate &&
                (o.classes.add("is-changing", "is-animating", "is-rendering"),
                t.animation.name && o.classes.add(`to-${n(t.animation.name)}`));
            })
          ).then(function () {
            return Promise.resolve(
              o.hooks.call("content:scroll", t, void 0, () =>
                o.scrollToContent(t)
              )
            ).then(function () {
              return Promise.resolve(
                o.hooks.call("page:view", t, {
                  url: o.currentPageUrl,
                  title: document.title,
                })
              ).then(function () {});
            });
          })
        );
      } catch (a) {
        return Promise.reject(a);
      }
    },
    j = function (t) {
      var e;
      if (Boolean((e = t)?.isSwupPlugin)) {
        if (((t.swup = this), !t._checkRequirements || t._checkRequirements()))
          return (
            t._beforeMount && t._beforeMount(),
            t.mount(),
            this.plugins.push(t),
            this.plugins
          );
      } else console.error("Not a swup plugin instance", t);
    };
  return class {
    constructor(t) {
      void 0 === t && (t = {}),
        (this.version = "4.6.1"),
        (this.options = void 0),
        (this.defaults = {
          animateHistoryBrowsing: !1,
          animationSelector: '[class*="transition-"]',
          animationScope: "html",
          cache: !0,
          containers: ["main"],
          ignoreVisit: function (t, e) {
            let { el: n } = void 0 === e ? {} : e;
            return !!n?.closest("[data-no-swup]");
          },
          linkSelector: "a[href]",
          linkToSelf: "scroll",
          native: !1,
          plugins: [],
          resolveUrl: (t) => t,
          requestHeaders: {
            "X-Requested-With": "swup",
            Accept: "text/html, application/xhtml+xml",
          },
          skipPopStateHandling: (t) => "swup" !== t.state?.source,
          timeout: 0,
        }),
        (this.plugins = []),
        (this.visit = void 0),
        (this.cache = void 0),
        (this.hooks = void 0),
        (this.classes = void 0),
        (this.currentPageUrl = r()),
        (this.currentHistoryIndex = void 0),
        (this.clickDelegate = void 0),
        (this.navigating = !1),
        (this.onVisitEnd = void 0),
        (this.use = j),
        (this.unuse = function t(e) {
          let n = this.findPlugin(e);
          if (n)
            return (
              n.unmount(),
              n._afterUnmount && n._afterUnmount(),
              (this.plugins = this.plugins.filter((t) => t !== n)),
              this.plugins
            );
          console.error("No such plugin", n);
        }),
        (this.findPlugin = function t(e) {
          return this.plugins.find(
            (t) => t === e || t.name === e || t.name === `Swup${String(e)}`
          );
        }),
        (this.log = () => {}),
        (this.navigate = function t(e, n, r) {
          if (
            (void 0 === n && (n = {}),
            void 0 === r && (r = {}),
            "string" != typeof e)
          )
            throw Error("swup.navigate() requires a URL parameter");
          if (this.shouldIgnoreVisit(e, { el: r.el, event: r.event }))
            return void window.location.assign(e);
          let { url: i, hash: o } = s.fromUrl(e),
            a = this.createVisit({ ...r, to: i, hash: o });
          this.performNavigation(a, n);
        }),
        (this.performNavigation = E),
        (this.createVisit = function t(e) {
          return new f(this, e);
        }),
        (this.delegateEvent = o),
        (this.fetchPage = a),
        (this.awaitAnimations = $),
        (this.renderPage = H),
        (this.replaceContent = P),
        (this.animatePageIn = C),
        (this.animatePageOut = U),
        (this.scrollToContent = x),
        (this.getAnchorElement = w),
        (this.getCurrentUrl = r),
        (this.resolveUrl = function t(e) {
          if ("function" != typeof this.options.resolveUrl)
            return (
              console.warn(
                "[swup] options.resolveUrl expects a callback function."
              ),
              e
            );
          let n = this.options.resolveUrl(e);
          return n && "string" == typeof n
            ? n.startsWith("//") || n.startsWith("http")
              ? (console.warn(
                  "[swup] options.resolveUrl needs to return a relative url"
                ),
                e)
              : n
            : (console.warn("[swup] options.resolveUrl needs to return a url"),
              e);
        }),
        (this.isSameResolvedUrl = function t(e, n) {
          return this.resolveUrl(e) === this.resolveUrl(n);
        }),
        (this.options = { ...this.defaults, ...t }),
        (this.handleLinkClick = this.handleLinkClick.bind(this)),
        (this.handlePopState = this.handlePopState.bind(this)),
        (this.cache = new (class t {
          constructor(t) {
            (this.swup = void 0), (this.pages = new Map()), (this.swup = t);
          }
          get size() {
            return this.pages.size;
          }
          get all() {
            let t = new Map();
            return (
              this.pages.forEach((e, n) => {
                t.set(n, { ...e });
              }),
              t
            );
          }
          has(t) {
            return this.pages.has(this.resolve(t));
          }
          get(t) {
            let e = this.pages.get(this.resolve(t));
            return e ? { ...e } : e;
          }
          set(t, e) {
            (t = this.resolve(t)),
              (e = { ...e, url: t }),
              this.pages.set(t, e),
              this.swup.hooks.callSync("cache:set", void 0, { page: e });
          }
          update(t, e) {
            t = this.resolve(t);
            let n = { ...this.get(t), ...e, url: t };
            this.pages.set(t, n);
          }
          delete(t) {
            this.pages.delete(this.resolve(t));
          }
          clear() {
            this.pages.clear(),
              this.swup.hooks.callSync("cache:clear", void 0, void 0);
          }
          prune(t) {
            this.pages.forEach((e, n) => {
              t(n, e) && this.delete(n);
            });
          }
          resolve(t) {
            let { url: e } = s.fromUrl(t);
            return this.swup.resolveUrl(e);
          }
        })(this)),
        (this.classes = new (class t {
          constructor(t) {
            (this.swup = void 0),
              (this.swupClasses = [
                "to-",
                "is-changing",
                "is-rendering",
                "is-popstate",
                "is-animating",
                "is-leaving",
              ]),
              (this.swup = t);
          }
          get selectors() {
            let { scope: t } = this.swup.visit.animation;
            return "containers" === t
              ? this.swup.visit.containers
              : "html" === t
              ? ["html"]
              : Array.isArray(t)
              ? t
              : [];
          }
          get selector() {
            return this.selectors.join(",");
          }
          get targets() {
            return this.selector.trim() ? c(this.selector) : [];
          }
          add() {}
          remove() {}
          clear() {}
          isSwupClass(t) {
            return this.swupClasses.some((e) => t.startsWith(e));
          }
        })(this)),
        (this.hooks = new (class t {
          constructor(t) {
            (this.swup = void 0),
              (this.registry = new Map()),
              (this.hooks = [
                "animation:out:start",
                "animation:out:await",
                "animation:out:end",
                "animation:in:start",
                "animation:in:await",
                "animation:in:end",
                "animation:skip",
                "cache:clear",
                "cache:set",
                "content:replace",
                "content:scroll",
                "enable",
                "disable",
                "fetch:request",
                "fetch:error",
                "fetch:timeout",
                "history:popstate",
                "link:click",
                "link:self",
                "link:anchor",
                "link:newtab",
                "page:load",
                "page:view",
                "scroll:top",
                "scroll:anchor",
                "visit:start",
                "visit:transition",
                "visit:abort",
                "visit:end",
              ]),
              (this.swup = t),
              this.init();
          }
          init() {
            this.hooks.forEach((t) => this.create(t));
          }
          create(t) {
            this.registry.has(t) || this.registry.set(t, new Map());
          }
          exists(t) {
            return this.registry.has(t);
          }
          get(t) {
            let e = this.registry.get(t);
            if (e) return e;
            console.error(`Unknown hook '${t}'`);
          }
          clear() {
            this.registry.forEach((t) => t.clear());
          }
          on(t, e, n) {
            void 0 === n && (n = {});
            let r = this.get(t);
            if (!r) return console.warn(`Hook '${t}' not found.`), () => {};
            let i = r.size + 1,
              o = { ...n, id: i, hook: t, handler: e };
            return r.set(e, o), () => this.off(t, e);
          }
          before(t, e, n) {
            return (
              void 0 === n && (n = {}), this.on(t, e, { ...n, before: !0 })
            );
          }
          replace(t, e, n) {
            return (
              void 0 === n && (n = {}), this.on(t, e, { ...n, replace: !0 })
            );
          }
          once(t, e, n) {
            return void 0 === n && (n = {}), this.on(t, e, { ...n, once: !0 });
          }
          off(t, e) {
            let n = this.get(t);
            n && e
              ? n.delete(e) ||
                console.warn(`Handler for hook '${t}' not found.`)
              : n && n.clear();
          }
          call(t, e, n, r) {
            try {
              let i = this,
                [o, s, a] = i.parseCallArgs(t, e, n, r),
                { before: l, handler: h, after: c } = i.getHandlers(t, a);
              return Promise.resolve(i.run(l, o, s)).then(function () {
                return Promise.resolve(i.run(h, o, s, !0)).then(function (e) {
                  let [n] = e;
                  return Promise.resolve(i.run(c, o, s)).then(function () {
                    return i.dispatchDomEvent(t, o, s), n;
                  });
                });
              });
            } catch (u) {
              return Promise.reject(u);
            }
          }
          callSync(t, e, n, r) {
            let [i, o, s] = this.parseCallArgs(t, e, n, r),
              { before: a, handler: l, after: h } = this.getHandlers(t, s);
            this.runSync(a, i, o);
            let [c] = this.runSync(l, i, o, !0);
            return this.runSync(h, i, o), this.dispatchDomEvent(t, i, o), c;
          }
          parseCallArgs(t, e, n, r) {
            return e instanceof f ||
              ("object" != typeof e && "function" != typeof n)
              ? [e, n, r]
              : [void 0, e, n];
          }
          run(t, e, n, r) {
            void 0 === r && (r = !1);
            try {
              let i,
                o = this;
              void 0 === e && (e = o.swup.visit);
              let s = [],
                a = (function (t, e, n) {
                  if ("function" == typeof t[p]) {
                    var r,
                      i,
                      o,
                      s,
                      a,
                      l,
                      h,
                      c,
                      u,
                      d = t[p]();
                    if (
                      ((function t(r) {
                        try {
                          for (; !((h = d.next()).done || (n && n())); )
                            if ((r = e(h.value)) && r.then) {
                              if (!m(r))
                                return void r.then(
                                  t,
                                  u || (u = v.bind(null, (c = new g()), 2))
                                );
                              r = r.v;
                            }
                          c ? v(c, 1, r) : (c = r);
                        } catch (i) {
                          v(c || (c = new g()), 2, i);
                        }
                      })(),
                      d.return)
                    ) {
                      var f = function (t) {
                        try {
                          h.done || d.return();
                        } catch (e) {}
                        return t;
                      };
                      if (c && c.then)
                        return c.then(f, function (t) {
                          throw f(t);
                        });
                      f();
                    }
                    return c;
                  }
                  if (!("length" in t))
                    throw TypeError("Object is not iterable");
                  for (var w = [], $ = 0; $ < t.length; $++) w.push(t[$]);
                  return (
                    (r = w),
                    (i = function (t) {
                      return e(w[t]);
                    }),
                    (o = n),
                    (l = -1),
                    (function t(e) {
                      try {
                        for (; ++l < r.length && (!o || !o()); )
                          if ((e = i(l)) && e.then) {
                            if (!m(e))
                              return void e.then(
                                t,
                                a || (a = v.bind(null, (s = new g()), 2))
                              );
                            e = e.v;
                          }
                        s ? v(s, 1, e) : (s = e);
                      } catch (n) {
                        v(s || (s = new g()), 2, n);
                      }
                    })(),
                    s
                  );
                })(
                  t,
                  function (t) {
                    let { hook: i, handler: a, defaultHandler: l, once: h } = t;
                    if (!e?.done)
                      return (
                        h && o.off(i, a),
                        (function (t, r) {
                          try {
                            var i,
                              o,
                              h = Promise.resolve(
                                ((i = a),
                                (o = [e, n, l]),
                                void 0 === o && (o = []),
                                new Promise((t, e) => {
                                  let n = i(...o);
                                  d(n) ? n.then(t, e) : t(n);
                                }))
                              ).then(function (t) {
                                s.push(t);
                              });
                          } catch (c) {
                            return r(c);
                          }
                          return h && h.then ? h.then(void 0, r) : h;
                        })(0, function (t) {
                          if (r) throw t;
                          console.error(`Error in hook '${i}':`, t);
                        })
                      );
                  },
                  function () {
                    return i;
                  }
                );
              return Promise.resolve(
                a && a.then
                  ? a.then(function (t) {
                      return i ? t : s;
                    })
                  : i
                  ? a
                  : s
              );
            } catch (l) {
              return Promise.reject(l);
            }
          }
          runSync(t, e, n, r) {
            void 0 === e && (e = this.swup.visit), void 0 === r && (r = !1);
            let i = [];
            for (let { hook: o, handler: s, defaultHandler: a, once: l } of t)
              if (!e?.done) {
                l && this.off(o, s);
                try {
                  let h = s(e, n, a);
                  i.push(h),
                    d(h) &&
                      console.warn(
                        `Swup will not await Promises in handler for synchronous hook '${o}'.`
                      );
                } catch (c) {
                  if (r) throw c;
                  console.error(`Error in hook '${o}':`, c);
                }
              }
            return i;
          }
          getHandlers(t, e) {
            let n = this.get(t);
            if (!n)
              return {
                found: !1,
                before: [],
                handler: [],
                after: [],
                replaced: !1,
              };
            let r = Array.from(n.values()),
              i = this.sortRegistrations,
              o = r
                .filter((t) => {
                  let { before: e, replace: n } = t;
                  return e && !n;
                })
                .sort(i),
              s = r
                .filter((t) => {
                  let { replace: e } = t;
                  return e;
                })
                .filter((t) => !0)
                .sort(i),
              a = r
                .filter((t) => {
                  let { before: e, replace: n } = t;
                  return !e && !n;
                })
                .sort(i),
              l = s.length > 0,
              h = [];
            if (e && ((h = [{ id: 0, hook: t, handler: e }]), l)) {
              let c = s.length - 1,
                u = (t) => {
                  let n = s[t - 1];
                  return n ? (e, r) => n.handler(e, r, u(t - 1)) : e;
                };
              h = [
                { id: 0, hook: t, handler: s[c].handler, defaultHandler: u(c) },
              ];
            }
            return { found: !0, before: o, handler: h, after: a, replaced: l };
          }
          sortRegistrations(t, e) {
            return (t.priority ?? 0) - (e.priority ?? 0) || t.id - e.id || 0;
          }
          dispatchDomEvent(t, e, n) {
            if (e?.done) return;
            let r = { hook: t, args: n, visit: e || this.swup.visit };
            document.dispatchEvent(
              new CustomEvent("swup:any", { detail: r, bubbles: !0 })
            ),
              document.dispatchEvent(
                new CustomEvent(`swup:${t}`, { detail: r, bubbles: !0 })
              );
          }
        })(this)),
        (this.visit = this.createVisit({ to: "" })),
        (this.currentHistoryIndex = window.history.state?.index ?? 1),
        this.enable();
    }
    enable() {
      try {
        let t = this,
          { linkSelector: e } = t.options;
        return (
          (t.clickDelegate = t.delegateEvent(e, "click", t.handleLinkClick)),
          window.addEventListener("popstate", t.handlePopState),
          t.options.animateHistoryBrowsing &&
            (window.history.scrollRestoration = "manual"),
          (t.options.native =
            t.options.native && !!document.startViewTransition),
          t.options.plugins.forEach((e) => t.use(e)),
          "swup" !== window.history.state?.source &&
            i(null, { index: t.currentHistoryIndex }),
          Promise.resolve(u()).then(function () {
            return Promise.resolve(
              t.hooks.call("enable", void 0, void 0, () => {})
            ).then(function () {});
          })
        );
      } catch (n) {
        return Promise.reject(n);
      }
    }
    destroy() {
      try {
        let t = this;
        return (
          t.clickDelegate.destroy(),
          window.removeEventListener("popstate", t.handlePopState),
          t.cache.clear(),
          t.options.plugins.forEach((e) => t.unuse(e)),
          Promise.resolve(
            t.hooks.call("disable", void 0, void 0, () => {})
          ).then(function () {
            t.hooks.clear();
          })
        );
      } catch (e) {
        return Promise.reject(e);
      }
    }
    shouldIgnoreVisit(t, e) {
      let { el: n, event: r } = void 0 === e ? {} : e,
        { origin: i, url: o, hash: a } = s.fromUrl(t);
      return (
        i !== window.location.origin ||
        !(!n || !this.triggerWillOpenNewWindow(n)) ||
        !!this.options.ignoreVisit(o + a, { el: n, event: r })
      );
    }
    handleLinkClick(t) {
      let e = t.delegateTarget,
        { href: n, url: r, hash: o } = s.fromElement(e);
      if (this.shouldIgnoreVisit(n, { el: e, event: t })) return;
      if (this.navigating && r === this.visit.to.url)
        return void t.preventDefault();
      let a = this.createVisit({ to: r, hash: o, el: e, event: t });
      t.metaKey || t.ctrlKey || t.shiftKey || t.altKey
        ? this.hooks.callSync("link:newtab", a, { href: n })
        : 0 === t.button &&
          this.hooks.callSync("link:click", a, { el: e, event: t }, () => {
            let e = a.from.url ?? "";
            t.preventDefault(),
              r && r !== e
                ? this.isSameResolvedUrl(r, e) || this.performNavigation(a)
                : o
                ? this.hooks.callSync("link:anchor", a, { hash: o }, () => {
                    i(r + o), this.scrollToContent(a);
                  })
                : this.hooks.callSync("link:self", a, void 0, () => {
                    "navigate" === this.options.linkToSelf
                      ? this.performNavigation(a)
                      : (i(r), this.scrollToContent(a));
                  });
          });
    }
    handlePopState(t) {
      let e = t.state?.url ?? window.location.href;
      if (
        this.options.skipPopStateHandling(t) ||
        this.isSameResolvedUrl(r(), this.currentPageUrl)
      )
        return;
      let { url: n, hash: i } = s.fromUrl(e),
        o = this.createVisit({ to: n, hash: i, event: t });
      o.history.popstate = !0;
      let a = t.state?.index ?? 0;
      a &&
        a !== this.currentHistoryIndex &&
        ((o.history.direction =
          a - this.currentHistoryIndex > 0 ? "forwards" : "backwards"),
        (this.currentHistoryIndex = a)),
        (o.animation.animate = !1),
        (o.scroll.reset = !1),
        (o.scroll.target = !1),
        this.options.animateHistoryBrowsing &&
          ((o.animation.animate = !0), (o.scroll.reset = !0)),
        this.hooks.callSync("history:popstate", o, { event: t }, () => {
          this.performNavigation(o);
        });
    }
    triggerWillOpenNewWindow(t) {
      return !!t.matches('[download], [target="_blank"]');
    }
  };
});
