function t() {return t = Object.assign ? Object.assign.bind() : function (t) {for (var o = 1; o < arguments.length; o++) {var i = arguments[o];for (var n in i) Object.prototype.hasOwnProperty.call(i, n) && (t[n] = i[n]);}return t;}, t.apply(this, arguments);}var o = function (o) {var i = this;this._raf = null, this._positionY = 0, this._velocityY = 0, this._targetPositionY = 0, this._targetPositionYWithOffset = 0, this._direction = 0, this.scrollTo = function (t) {if (t && t.nodeType) i._targetPositionY = Math.round(t.getBoundingClientRect().top + window.pageYOffset);else {if (parseInt(i._targetPositionY) !== i._targetPositionY) return void console.error("Argument must be a number or an element.");i._targetPositionY = Math.round(t);}i._targetPositionY > document.documentElement.scrollHeight - window.innerHeight && (i._targetPositionY = document.documentElement.scrollHeight - window.innerHeight), i._positionY = document.body.scrollTop || document.documentElement.scrollTop, i._direction = i._positionY > i._targetPositionY ? -1 : 1, i._targetPositionYWithOffset = i._targetPositionY + i._direction, i._velocityY = 0, i._positionY !== i._targetPositionY ? (i.options.onStart(), i._animate()) : i.options.onAlreadyAtPositions();}, this._animate = function () {i._update(), i._render(), 1 === i._direction && i._targetPositionY > i._positionY || -1 === i._direction && i._targetPositionY < i._positionY ? (i._raf = requestAnimationFrame(i._animate), i.options.onTick()) : (i._positionY = i._targetPositionY, i._render(), i._raf = null, i.options.onTick(), i.options.onEnd());}, this._update = function () {var t = i._targetPositionYWithOffset - i._positionY;return i._velocityY += t * i.options.acceleration, i._velocityY *= i.options.friction, i._positionY += i._velocityY, Math.abs(t);}, this._render = function () {window.scrollTo(0, i._positionY);}, this.options = t({}, { onAlreadyAtPositions: function () {}, onCancel: function () {}, onEnd: function () {}, onStart: function () {}, onTick: function () {}, friction: .7, acceleration: .04 }, o), o && o.friction && (this.options.friction = 1 - o.friction), window.addEventListener("mousewheel", function (t) {i._raf && (i.options.onCancel(), cancelAnimationFrame(i._raf), i._raf = null);}, { passive: !0 });};export { o as default };