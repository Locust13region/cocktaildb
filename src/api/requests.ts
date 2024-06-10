import {
	urlCocktailByNamePart,
	urlIngredientByName,
	urlRandom,
} from "../api/url";

async function fetchRequest(
	url: string,
	setErrorApi: React.Dispatch<React.SetStateAction<boolean>>
) {
	try {
		const response = await fetch(url);
		if (!response.ok) {
			throw new Error(response.statusText);
		}
		return await response.json();
	} catch (error) {
		console.log("Fetch", error);
		setErrorApi(true);
	}
}

export async function getCocktailByName(
	namePart: string,
	setErrorApi: React.Dispatch<React.SetStateAction<boolean>>
) {
	const requestUrl = namePart ? urlCocktailByNamePart + namePart : urlRandom;
	return await fetchRequest(requestUrl, setErrorApi);
}

export async function getIngredientByName(
	name: string,
	setErrorApi: React.Dispatch<React.SetStateAction<boolean>>
) {
	const requestUrl = urlIngredientByName + name;
	return await fetchRequest(requestUrl, setErrorApi);
}
