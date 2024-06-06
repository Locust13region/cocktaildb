import { ICocktailItem } from "../components/types";

const CocktailsList = ({
	cocktailsListing,
}: {
	cocktailsListing: ICocktailItem[];
}) => {
	console.log(cocktailsListing);
	return <div>LIST</div>;
	// return <div>No options</div>
};

export default CocktailsList;
