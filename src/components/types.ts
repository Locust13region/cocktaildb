export interface ICocktailFiltered {
	idDrink: string;
	strDrink: string;
	strDrinkThumb: string | null;
}
export interface ICocktailItem extends ICocktailFiltered {
	strDrinkAlternate: string | null;
	strTags: string | null;
	strVideo: string | null;
	strCategory: string | null;
	strIBA: string | null;
	strAlcoholic: string | null;
	strGlass: string | null;
	strInstructions: string | null;
	strInstructionsES: string | null;
	strInstructionsDE: string | null;
	strInstructionsFR: string | null;
	strInstructionsIT: string | null;
	"strInstructionsZH-HANS": string | null;
	"strInstructionsZH-HANT": string | null;
	strIngredient1: string | null;
	strIngredient2: string | null;
	strIngredient3: string | null;
	strIngredient4: string | null;
	strIngredient5: string | null;
	strIngredient6: string | null;
	strIngredient7: string | null;
	strIngredient8: string | null;
	strIngredient9: string | null;
	strIngredient10: string | null;
	strIngredient11: string | null;
	strIngredient12: string | null;
	strIngredient13: string | null;
	strIngredient14: string | null;
	strIngredient15: string | null;
	strMeasure1: string | null;
	strMeasure2: string | null;
	strMeasure3: string | null;
	strMeasure4: string | null;
	strMeasure5: string | null;
	strMeasure6: string | null;
	strMeasure7: string | null;
	strMeasure8: string | null;
	strMeasure9: string | null;
	strMeasure10: string | null;
	strMeasure11: string | null;
	strMeasure12: string | null;
	strMeasure13: string | null;
	strMeasure14: string | null;
	strMeasure15: string | null;
	strImageSource: string | null;
	strImageAttribution: string | null;
	strCreativeCommonsConfirmed: string | null;
	dateModified: string | null;
}
export interface IIngredients {
	idIngredient: string;
	strIngredient: string;
	strDescription: string;
	strType: string;
	strAlcohol: string;
	strABV: string;
}
export enum IngredientsThumbSize {
	small = "-Small.png",
	medium = "-Medium.png",
	large = ".png",
}
export enum RequestType {
	search = "search.php?",
	filter = "filter.php?",
	list = "list.php?",
	lookup = "lookup.php?",
	random = "random.php",
}

export enum UrlSuffices {
	"c=",
	"g=",
	"i=",
	"a=",
}
export enum Section {
	category,
	glass,
	ingredient,
	alcoholic,
}

export type Category = {
	strCategory: string;
};
export type Glass = {
	strGlass: string;
};
export type Ingredient = {
	strIngredient1: string;
};
export type Alcoholic = {
	strAlcoholic: string;
};
export type SelectedSection = Category | Glass | Ingredient | Alcoholic;
export interface ParamMap {
	[Section.category]: Category;
	[Section.glass]: Glass;
	[Section.ingredient]: Ingredient;
	[Section.alcoholic]: Alcoholic;
}

export interface IFiltersParams {
	category?: Category[];
	glass?: Glass[];
	ingredient?: Ingredient[];
	alcoholic?: Alcoholic[];
}
