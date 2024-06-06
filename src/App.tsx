import { alpha } from "@mui/material";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { useState } from "react";
import HeaderBar from "./components/headerBar";
import SearchBar from "./components/searchBar";
import { ICocktailItem } from "./components/types";
import Cocktail from "./pages/cocktail";
import CocktailsList from "./pages/cocktailsList";

function App() {
	const [cocktailsListing, setCocktailsListing] = useState<ICocktailItem[]>([]);

	return (
		<Box
			sx={{
				width: "100%",
				height: "100vh",
				backgroundImage: `linear-gradient(to bottom,  ${alpha(
					"#fa4330",
					0.9
				)} 0%, ${alpha("#efa914", 0.6)} 15%,#ffffff 70%)`,
				backgroundSize: "100% 80%",
				backgroundRepeat: "no-repeat",
			}}
		>
			<Container maxWidth="xs">
				<HeaderBar setCocktailsListing={setCocktailsListing} />
				<SearchBar setCocktailsListing={setCocktailsListing} />
				{cocktailsListing && cocktailsListing.length <= 1 ? (
					<Cocktail cocktailsListing={cocktailsListing} />
				) : (
					<CocktailsList cocktailsListing={cocktailsListing} />
				)}
			</Container>
		</Box>
	);
}

export default App;
