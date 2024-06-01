/** Keeps track of raw listeners added to the base elements to avoid duplication */
const ledger = new WeakMap();
function editLedger(wanted, baseElement, callback, setup) {var _ledger$get, _elementMap$get;
  if (!wanted && !ledger.has(baseElement)) {
    return false;
  }
  const elementMap = (_ledger$get = ledger.get(baseElement)) !== null && _ledger$get !== void 0 ? _ledger$get :
  new WeakMap();
  ledger.set(baseElement, elementMap);
  const setups = (_elementMap$get = elementMap.get(callback)) !== null && _elementMap$get !== void 0 ? _elementMap$get : new Set();
  elementMap.set(callback, setups);
  const existed = setups.has(setup);
  if (wanted) {
    setups.add(setup);
  } else
  {
    setups.delete(setup);
  }
  return existed && wanted;
}
function safeClosest(event, selector) {
  let target = event.target;
  if (target instanceof Text) {
    target = target.parentElement;
  }
  if (target instanceof Element && event.currentTarget instanceof Element) {
    // `.closest()` may match ancestors of `currentTarget` but we only need its children
    const closest = target.closest(selector);
    if (closest && event.currentTarget.contains(closest)) {
      return closest;
    }
  }
}
// This type isn't exported as a declaration, so it needs to be duplicated above
function delegate(selector, type, callback, options = {}) {
  const { signal, base = document } = options;
  if (signal !== null && signal !== void 0 && signal.aborted) {
    return;
  }
  // Don't pass `once` to `addEventListener` because it needs to be handled in `delegate-it`
  const { once, ...nativeListenerOptions } = options;
  // `document` should never be the base, it's just an easy way to define "global event listeners"
  const baseElement = base instanceof Document ? base.documentElement : base;
  // Handle the regular Element usage
  const capture = Boolean(typeof options === 'object' ? options.capture : options);
  const listenerFunction = event => {
    const delegateTarget = safeClosest(event, selector);
    if (delegateTarget) {
      const delegateEvent = Object.assign(event, { delegateTarget });
      callback.call(baseElement, delegateEvent);
      if (once) {
        baseElement.removeEventListener(type, listenerFunction, nativeListenerOptions);
        editLedger(false, baseElement, callback, setup);
      }
    }
  };
  const setup = JSON.stringify({ selector, type, capture });
  const isAlreadyListening = editLedger(true, baseElement, callback, setup);
  if (!isAlreadyListening) {
    baseElement.addEventListener(type, listenerFunction, nativeListenerOptions);
  }
  signal === null || signal === void 0 ? void 0 : signal.addEventListener('abort', () => {
    editLedger(false, baseElement, callback, setup);
  });
}
export default delegate;
