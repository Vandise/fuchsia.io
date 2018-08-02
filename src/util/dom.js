export function ensureGlobals(obj, parent = global) {
  Object.keys(obj).forEach(key => {
    if (!parent[key]) {
      parent[key] = obj[key];
    }
    if (obj[key] instanceof Object && parent[key] instanceof Object) {
      ensureGlobals(obj[key], parent[key]);
    }
  });
}

export const globals = global;

export function ready(cb) {
  if (global.document.readyState === "complete") cb();
  else global.document.addEventListener("DOMContentLoaded", cb);
}

export function executeWhenReady(fnCheck, logMsg) {
  return new globals.Promise(resolve => {
    if (fnCheck())
      resolve();
    else {
      const monitor = setInterval(() => {
        if (fnCheck()) {
          clearInterval(monitor);
          resolve();
        }
        else
          console.log(logMsg || 'waiting for ready');
      }, 300);
      setTimeout(() => clearInterval(monitor), 5 * 10e3);
    }
  });
}