import { RequestType } from "../components/types";

export const base = "https://www.thecocktaildb.com/";
const api = "api/json/v1/1/";
const ingredientImages = "images/ingredients/";
export const urlRandom = base + api + "random.php";
export const urlIngredientThumb = base + ingredientImages;
export const urlCocktailByNamePart = base + api + RequestType.search + "s=";
export const urlIngredientByName = base + api + RequestType.search + "i=";
