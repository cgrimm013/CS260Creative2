var ingredientCounter = 1;
$(document).ready(function() {
  $('#addIngredient').click(function(e){
    e.preventDefault();

    var newIngredient = document.createElement('input');
    console.log('test'+ingredientCounter);
    newIngredient.setAttribute('id', 'ingredient' + ingredientCounter);
    newIngredient.setAttribute('type', 'text');
    newIngredient.setAttribute('placeholder', 'Ingredient');
    ingredientCounter++;

    var additional = $('#additional')[0];
    console.log(additional);
    additional.appendChild(newIngredient);
  });//end addIngredient

  $('#removeIngredient').click(function(e){
    e.preventDefault();
    if(ingredientCounter == 1){
      return;
    }

    var additional = $('#additional')[0];
    console.log(additional.childNodes);
    var toDelete = $('#ingredient' + (ingredientCounter - 1))[0];//remove the last element
    console.log(toDelete);
    additional.removeChild(toDelete);
    ingredientCounter--;
  });//end removeIngredient

  $('#recipeSearch').click(function(e){
    e.preventDefault();
    var ingredients = [];
    ingredients.push($('#ingredient0').val());
    var additionalChildren = $('#additional')[0].childNodes;
    additionalChildren.forEach(function(ingredient){
      ingredients.push(ingredient.value)
    });

    var url = `http://food2fork.com/api/search?key=09cbf0e6e88767b423e29b0aad132027&q=${ingredients.join()}`
    $.ajax({
      url: url,
      dataType: 'json',
      type: 'GET',
      success: function(json){
        console.log(json);
      }
    });
  });//end recipeSearch

});
