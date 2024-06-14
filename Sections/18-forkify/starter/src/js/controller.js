const recipeContainer = document.querySelector('.recipe');

/*
const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

// https://forkify-api.herokuapp.com/v2
*/

const getRecipeDataById = async function (recipeId) {
  try {
    const initialRes = await fetch(
      `https://forkify-api.herokuapp.com/api/v2/recipes/${recipeId}`
    );

    if (!initialRes.ok) {
      throw new Error(
        `Initial server response failed -> status code: ${initialRes.status} status text: ${initialRes.statusText}!`
      );
    }

    const {
      data: { recipe },
    } = await initialRes.json();

    const regExPattern = /_([a-z])/g;
    const replacementString = function (_, letter) {
      return letter.toUpperCase();
    };

    const convertToCamelCase = str => {
      return str.replace(regExPattern, replacementString);
    };

    const dataRecipe = Object.entries(recipe).reduce(
      (acc, [currKey, value]) => {
        const newKey = convertToCamelCase(currKey);
        acc[newKey] = value;
        return acc;
      },
      {}
    );

    console.log(dataRecipe);
  } catch (error) {
    console.log(error.message);
  }
};

getRecipeDataById('5ed6604591c37cdc054bc886');
