import delegate from "./delegate.js?module";
// This type isn't exported as a declaration, so it needs to be duplicated above
async function oneEvent(selector, type, options = {}) {
  return new Promise(resolve => {var _options$signal, _options$signal2;
    options.once = true;
    if ((_options$signal = options.signal) !== null && _options$signal !== void 0 && _options$signal.aborted) {
      resolve(undefined);
    }
    (_options$signal2 = options.signal) === null || _options$signal2 === void 0 ? void 0 : _options$signal2.addEventListener('abort', () => {
      resolve(undefined);
    });
    delegate(selector, type, resolve, options);
  });
}
export default oneEvent;
