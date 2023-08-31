import View from './view';
import icons from 'url:../../img/icons.svg';

class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');

  _generateMarkup() {
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );
    //Hay paginas solo por delante

    if (this._data.page === 1) {
      return this._generateMarkupPreview('next');
    }
    if (this._data.page === numPages) {
      return this._generateMarkupPreview('prev');
    }
    if (this._data.page < numPages && this._data.page > 1) {
      return [
        this._generateMarkupPreview('prev'),
        this._generateMarkupPreview('next'),
      ].join('');
    }
  }

  _generateMarkupPreview(mode) {
    return `<button data-goto="${
      this._data.page + (mode === 'next' ? 1 : -1)
    }" class="btn--inline pagination__btn--${mode}">
            <span>Page ${this._data.page + (mode === 'next' ? 1 : -1)}</span>
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-${
      mode === 'next' ? 'right' : 'left'
    }"></use>
            </svg>
          </button>`;
  }

  addHanderClick(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--inline');

      if (!btn) return;
      const goToPage = +btn.dataset.goto;

      handler(goToPage);
    });
  }
}

export default new PaginationView();
