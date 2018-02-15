var ingredientCounter = 1;
$(document).ready(function() {
  $('#addIngredient').click(function(e) {
    e.preventDefault();

    var newIngredient = document.createElement('input');
    console.log('test' + ingredientCounter);
    newIngredient.setAttribute('id', 'ingredient' + ingredientCounter);
    newIngredient.setAttribute('type', 'text');
    newIngredient.setAttribute('placeholder', 'Ingredient');
    ingredientCounter++;

    var additional = $('#additional')[0];
    console.log(additional);
    additional.appendChild(newIngredient);
  }); //end addIngredient

  $('#removeIngredient').click(function(e) {
    e.preventDefault();
    if (ingredientCounter == 1) {
      return;
    }

    var additional = $('#additional')[0];
    console.log(additional.childNodes);
    var toDelete = $('#ingredient' + (ingredientCounter - 1))[0]; //remove the last element
    console.log(toDelete);
    additional.removeChild(toDelete);
    ingredientCounter--;
  }); //end removeIngredient

  var createImageTag = function(image_url) {
    var newImage = document.createElement('img');
    newImage.setAttribute('src', image_url);
    newImage.setAttribute('class', 'recipeImage');
    return newImage;
  }

  var createLinkTag = function(url) {
    var link = document.createElement('a');
    link.setAttribute('href', url);
    return link;
  }

  var createTitleTag = function(title) {
    var newTitle = document.createElement('p');
    newTitle.appendChild(document.createTextNode(title));
    return newTitle;
  }

  var newRecipe = function(image_url, linkUrl, title) {
    var newRecipe = document.createElement('div');
    newRecipe.setAttribute('class', 'flex-item');
    var link = createLinkTag(linkUrl);
    link.appendChild(createImageTag(image_url));

    var title = createTitleTag(title);

    newRecipe.appendChild(link);
    newRecipe.appendChild(title);
    return newRecipe;
  }

  $('#recipeSearch').click(function(e) {
    e.preventDefault();
    var ingredients = [];
    ingredients.push($('#ingredient0').val());
    var additionalChildren = $('#additional')[0].childNodes;
    additionalChildren.forEach(function(ingredient) {
      ingredients.push(ingredient.value)
    });

    var url = `https://cors-anywhere.herokuapp.com/http://food2fork.com/api/search?key=09cbf0e6e88767b423e29b0aad132027&q=${ingredients.join()}`;
    $.ajax({
      url: url,
      dataType: 'json',
      type: 'GET',
      success: function(json) {
        console.log(json);
        var resultsDiv = $('#results')[0];
        //delete old responses
        while (resultsDiv.firstChild) {
          resultsDiv.removeChild(resultsDiv.firstChild);
        }
        json.recipes.forEach(function(recipe) {
          var newItem = newRecipe(recipe.image_url, recipe.source_url, recipe.title);
          resultsDiv.appendChild(newItem);
        });
      }
    });
  }); //end recipeSearch

});
