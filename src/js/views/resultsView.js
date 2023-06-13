import View from "./VIew";
import previewView from "./previewView.js";

class ResultsView extends View {
    _parentElement = document.querySelector('.results');
    _errorMessage = 'No recipes found. Try a different query!';
    _message = '';

    _generateMarkup() {
        // console.log(this._data.map(result => previewView.render(result, false)).join(''));
        return this._data.map(result => previewView.render(result, false)).join('');
    }
}

export default new ResultsView();