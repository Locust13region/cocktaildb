import {
	urlCocktailById,
	urlCocktailByNamePart,
	urlFilter,
	urlIngredientByName,
	urlParamsList,
	urlRandom,
} from "../api/url";
import {
	Alcoholic,
	Category,
	Glass,
	ICocktailFiltered,
	Ingredient,
	Section,
	SelectedSection,
	UrlSuffices,
} from "../components/types";

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
		throw error;
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

export async function getParamsLists(
	setErrorApi: React.Dispatch<React.SetStateAction<boolean>>
) {
	const paramsListsRequests = [...new Array(4)].map((_, index) =>
		fetchRequest(urlParamsList + UrlSuffices[index] + "list", setErrorApi)
	);
	const responses = await Promise.all(paramsListsRequests);
	const result = responses.map((arr, index) => ({
		[Section[index]]: [...arr.drinks],
	}));
	return result;
}

export async function getFiltered(
	selectedFilter: SelectedSection[],
	setErrorApi: React.Dispatch<React.SetStateAction<boolean>>
) {
	if (!selectedFilter.length) {
		return [];
	}
	const filteredRequests = [];
	switch (true) {
		case selectedFilter.every((item) => "strCategory" in item):
			filteredRequests.push(
				...(selectedFilter as Category[]).map((param) =>
					fetchRequest(
						urlFilter + UrlSuffices[0] + param.strCategory,
						setErrorApi
					)
				)
			);
			break;
		case selectedFilter.every((item) => "strGlass" in item):
			filteredRequests.push(
				...(selectedFilter as Glass[]).map((param) =>
					fetchRequest(urlFilter + UrlSuffices[1] + param.strGlass, setErrorApi)
				)
			);
			break;
		case selectedFilter.every((item) => "strIngredient1" in item):
			filteredRequests.push(
				...(selectedFilter as Ingredient[]).map((param) =>
					fetchRequest(
						urlFilter + UrlSuffices[2] + param.strIngredient1,
						setErrorApi
					)
				)
			);
			break;
		case selectedFilter.every((item) => "strAlcoholic" in item):
			filteredRequests.push(
				...(selectedFilter as Alcoholic[]).map((param) =>
					fetchRequest(
						urlFilter + UrlSuffices[3] + param.strAlcoholic,
						setErrorApi
					)
				)
			);
			break;

		default:
			setErrorApi(true);
			break;
	}

	const responses = await Promise.all(filteredRequests);
	const result = selectedFilter.every((item) => "strIngredient1" in item)
		? responses
				.map((obj) => obj.drinks)
				.reduce(
					(r, c) => {
						return r.filter((source: ICocktailFiltered) =>
							c.some(
								(target: ICocktailFiltered) => source.idDrink === target.idDrink
							)
						);
					}
					// eslint-disable-next-line no-mixed-spaces-and-tabs
				)
				.map((item: ICocktailFiltered) => item.idDrink)
		: responses
				.reduce((r, c) => r.concat(c.drinks), [])
				.map((item: ICocktailFiltered) => item.idDrink);

	return result;
}

export async function getSlideList(
	data: string[],
	setErrorApi: React.Dispatch<React.SetStateAction<boolean>>
) {
	if (data.length) {
		const slideListRequests = data.map((idDrink) =>
			fetchRequest(urlCocktailById + idDrink, setErrorApi)
		);
		const responses = await Promise.all(slideListRequests);
		return responses.map((item) => item.drinks[0]);
	} else {
		return [];
	}
}
