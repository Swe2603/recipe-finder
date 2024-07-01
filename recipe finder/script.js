async function searchRecipes() {
    const query = document.getElementById('search-input').value.trim();
    const recipesDiv = document.getElementById('recipes');
    recipesDiv.innerHTML = '';

    if (!query) {
        recipesDiv.innerHTML = '<p>Please enter a search term.</p>';
        return;
    }

    const apiUrl = `https://api.edamam.com/api/recipes/v2?type=public&q=${encodeURIComponent(query)}&app_id=9dd9e215&app_key=bfb55bd222d0e1757654526bf8f3ffdf`;

    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();

        console.log('API Response:', data);

        if (data.hits.length === 0) {
            recipesDiv.innerHTML = '<p>No recipes found.</p>';
            return;
        }

        data.hits.forEach(hit => {
            const recipe = hit.recipe;
            const recipeDiv = document.createElement('div');
            recipeDiv.classList.add('recipe');

            recipeDiv.innerHTML = `
                <img src="${recipe.image}" alt="${recipe.label}">
                <h2>${recipe.label}</h2>
                <p>Calories: ${Math.round(recipe.calories)}</p>
                <a href="${recipe.url}" target="_blank">View Recipe</a>
            `;

            recipesDiv.appendChild(recipeDiv);
        });
    } catch (error) {
        recipesDiv.innerHTML = `<p>Error fetching recipes. ${error.message}</p>`;
        console.error('Fetch Error:', error);
    }
}
