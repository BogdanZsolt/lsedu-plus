/******/ (() => { // webpackBootstrap
var __webpack_exports__ = {};
/*!**********************************************!*\
  !*** ./src/blocks/filter-select/frontend.js ***!
  \**********************************************/
document.addEventListener('DOMContentLoaded', () => {
  const openSlectBtn = document.querySelectorAll('.open-select');
  const selectEl = document.querySelector('.wp-block-lsedu-plus-filter-select');
  openSlectBtn.forEach(el => {
    el.addEventListener('click', event => {
      event.preventDefault();
      selectEl.classList.toggle('hidden');
    });
  });
});
/******/ })()
;
//# sourceMappingURL=frontend.js.map