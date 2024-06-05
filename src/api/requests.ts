import { urlCocktailByNamePart, urlCocktailId, urlRandom } from "../api/url";

export async function getCocktail(idDrink?: string) {
	const requestUrl = idDrink ? urlCocktailId + idDrink : urlRandom;
	const response = await fetch(requestUrl);
	const result = await response.json();
	return result;
}

export async function getCocktailByNamePart(namePart: string) {
	const response = await fetch(urlCocktailByNamePart + namePart);
	const result = await response.json();
	return result;
}
