import View from './VIew.js';
import previewView from './previewView.js';

class BookmarksView extends View {
    _parentElement = document.querySelector('.bookmarks__list');
    _errorMessage = 'No bookmarks yet. Find a nice recipe and bookmark it ;)';
    _message = '';

    addHandlerRender(handler) {
        window.addEventListener('load', handler);
    }

    _generateMarkup() {
        // console.log(this._data.map(result => previewView.render(result, false)).join(''));
        return this._data.map(result => previewView.render(result, false)).join('');
    }
}

export default new BookmarksView();
