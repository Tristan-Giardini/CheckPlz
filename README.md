# CheckPlz

Final Project for the Concordia Web Development Bootcamp 2022.

CheckPlz is a virtual cookbook / recipe search engine that offers meal suggestions based on ingredients you input, cuisine choice and diet type.

The homepage has a login / sign up feature with Auth0. Once logged in the user can explore recipes that are randomly generated using the Spoonacul API. There is a trending recipe suggestion, as well as one based on cuisine and diet type. The user can like or dislike a recipe and that information is stored in MongoDb and referenced later.

When the user clicks on a recipe it brings them to that single recipe page where they could read the list of ingredients and directions. Next to the recipe photo there are similar recipe suggestions so the user can cross reference their recipe choice with other recipe’s ingredients or directions. If the user liked the recipe they can edit the ingredients and that data will be stored in a user database through MongoDb. CheckPlz will render the user's preferred ingredient when the page refreshes. The information will be saved so if they leave the website and come back later the recipe will still have their ingredient edit.

In the user profile there will be all the bookmarked recipes that the user liked so they could go back and reference it later or make that meal again.

The main feature is the search engine. The user can input however many ingredients they have on hand and get meal suggestions based on those ingredients. Additional filter options include the cuisine type (Italian, American, etc…), and a diet option (Vegetarian, Vegan, Gluten Free, etc…).

![HomePage](/frontend/src/assets/HomePage.png)
![Explore](/frontend/src/assets/ExplorePage.png)
![Recipe](/frontend/src/assets/RecipePage.png)
![SearchEngine](/frontend/src/assets/SearchEngineExample.png)
![SearchEngineResult](/frontend/src/assets/SearchEngineResult.png)
![Profile](/frontend/src/assets/Profile.png)
