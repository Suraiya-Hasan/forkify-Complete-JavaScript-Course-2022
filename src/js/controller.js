import * as model from './model.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';
import paginationView from './views/paginationView.js';
import bookmarksView from './views/bookmarksView.js';
import addRecipeView from './views/addRecipeView.js';


import 'core-js/stable';
import 'regenerator-runtime/runtime';
import { MODEL_CLOSE_SEC } from './config.js';

// if (module.hot) {
//   module.hot.accept();
// }

const controlRecipes = async function () {
  try {
    const id = window.location.hash.slice(1);

    if (!id) return;
    recipeView.renderSpinner();
    //update result view to mark selected search result
    //resultsView.render(model.getSearchResultsPage())
    resultsView.update(model.getSearchResultsPage());
    bookmarksView.update(model.state.bookmarks);
    //Loading recipe
    await model.loadRecipe(id);

    //Rendering recipe
    recipeView.render(model.state.recipe);

  } catch (err) {
    recipeView.renderError();
  }
};

const controlSearchResults = async function () {
  try {
    //spinner
    resultsView.renderSpinner();
    //Get search query
    const query = searchView.getQuery();
    if (!query) return;

    //Load search result
    await model.loadSearchResult(query);

    //Render result
    // console.log(model.state.search.results);
    // console.log(model.getSearchResultsPage(1));
    resultsView.render(model.getSearchResultsPage());

    //Render initial pagination buttons
    paginationView.render(model.state.search);



  } catch (error) {
    console.log(error);
  }
}

const controlPagination = function (goToPage) {
  resultsView.render(model.getSearchResultsPage(goToPage));
  //Render NEW pagination buttons
  paginationView.render(model.state.search);
}


const controlServings = function (newServings) {
  //update recipe servings (in state)
  model.updateServings(newServings);
  //updating recipe view
  // recipeView.update(model.state.recipe);
  // recipeView.render(model.state.recipe);
  recipeView.update(model.state.recipe);
}

const controlBookmark = function () {
  if (!model.state.recipe.bookmarked)
    model.addBookmark(model.state.recipe);
  else
    model.deleteBookmark(model.state.recipe.id);

  recipeView.update(model.state.recipe);

  //render bookmarks
  bookmarksView.render(model.state.bookmarks);
}

const controlBookmarks = function () {
  bookmarksView.render(model.state.bookmarks);
}

const controlAddRecipe = async function (newRecipe) {
  try {
    //Loading spinner
    addRecipeView.renderSpinner();


    await model.uploadRecipe(newRecipe);
    console.log(model.state.recipe);

    //Render recipe
    recipeView.render(model.state.recipe);

    //Displaying success message
    // addRecipeView.renderMessage();

    //Render bookmarkview
    bookmarksView.render(model.state.bookmarks);

    //Change ID in URL
    window.history.pushState(null, '', `#${model.state.recipe.id}`);


    //Close Window
    setTimeout(function () {
      addRecipeView.toggleWindow()
    }, MODEL_CLOSE_SEC * 1000);

  } catch (error) {
    console.log(error);
    addRecipeView.renderError(error.message);
  }
}

const init = function () {
  bookmarksView.addHandlerRender(controlBookmarks);
  recipeView.addHandlerRender(controlRecipes);
  recipeView.addHandlerServings(controlServings);
  recipeView.addHandlerAddBookmark(controlBookmark);
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerClick(controlPagination);
  addRecipeView.addHandlerUpload(controlAddRecipe);
}

init();


