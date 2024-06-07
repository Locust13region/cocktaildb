import { urlCocktailByNamePart, urlRandom } from "../api/url";

export async function getCocktailByName(
	namePart: string,
	setErrorApi: React.Dispatch<React.SetStateAction<boolean>>
) {
	const requestUrl = namePart ? urlCocktailByNamePart + namePart : urlRandom;
	try {
		const response = await fetch(requestUrl);
		if (!response.ok) {
			throw new Error(response.statusText);
		}
		return await response.json();
	} catch (error) {
		console.log("Fetch", error);
		setErrorApi(true);
	}
}
