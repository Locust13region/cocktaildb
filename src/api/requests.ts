import { urlCocktailByNamePart, urlRandom } from "../api/url";

const fetchDb = async (url: string) => {
	const response = await fetch(url);
	const result = await response.json();
	return result;
};

export function getCocktailByName(namePart: string) {
	const requestUrl = namePart ? urlCocktailByNamePart + namePart : urlRandom;
	return fetchDb(requestUrl);
}
