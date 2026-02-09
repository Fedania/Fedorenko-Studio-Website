export const qs = (selector, scope = document) => scope.querySelector(selector);
export const qsa = (selector, scope = document) => scope.querySelectorAll(selector);
export const on = (type, selector, callback, scope = document) => scope.addEventListener(type, e => { if (e.target.matches(selector)) callback(e) });
export const off = (type, selector, callback, scope = document) => scope.removeEventListener(type, e => { if (e.target.matches(selector)) callback(e) });
export const toggleClass = (element, className) => element.classList.toggle(className);
export const addClass = (element, className) => element.classList.add(className);
export const removeClass = (element, className) => element.classList.remove(className);
export const hasClass = (element, className) => element.classList.contains(className);
