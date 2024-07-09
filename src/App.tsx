import { alpha } from "@mui/material";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import Container from "@mui/material/Container";
import { Suspense, lazy, useState } from "react";
const Filter = lazy(() => import("./components/filter"));
import HeaderBar from "./components/headerBar";
const SearchBar = lazy(() => import("./components/searchBar"));
import { ICocktailItem } from "./components/types";
const Cocktail = lazy(() => import("./pages/cocktail"));
const CocktailsList = lazy(() => import("./pages/cocktailsList"));
const ErrorOccurred = lazy(() => import("./pages/error"));

const App: React.FC = () => {
	const [showFilter, setShowFilter] = useState(false);
	const [errorApi, setErrorApi] = useState(false);
	const [inputValue, setInputValue] = useState("");
	const [cocktailsListing, setCocktailsListing] = useState<ICocktailItem[]>([]);
	return (
		<Box
			id="background"
			sx={{
				width: "100%",
				height: "100vh",
				backgroundImage: `linear-gradient(to bottom,  ${alpha(
					"#fa4330",
					0.9
				)} 0%, ${alpha("#efa914", 0.6)} 30%,#ffffff 70%)`,
				backgroundSize: "100% 80%",
				backgroundRepeat: "no-repeat",
			}}
		>
			<Container maxWidth="xs">
				<HeaderBar
					showFilter={showFilter}
					setShowFilter={setShowFilter}
					setCocktailsListing={setCocktailsListing}
				/>
				<Collapse in={!showFilter}>
					<Suspense>
						<SearchBar
							inputValue={inputValue}
							setInputValue={setInputValue}
							setCocktailsListing={setCocktailsListing}
							setErrorApi={setErrorApi}
						/>
						{!errorApi &&
							(cocktailsListing && cocktailsListing.length <= 1 ? (
								<Cocktail
									cocktailsListing={cocktailsListing}
									setErrorApi={setErrorApi}
								/>
							) : (
								<CocktailsList
									setShowFilter={setShowFilter}
									setInputValue={setInputValue}
									cocktailsListing={cocktailsListing}
									setCocktailsListing={setCocktailsListing}
								/>
							))}
						{errorApi && <ErrorOccurred />}
					</Suspense>
				</Collapse>
				<Collapse in={showFilter}>
					<Suspense>
						<Filter
							setShowFilter={setShowFilter}
							setInputValue={setInputValue}
							setCocktailsListing={setCocktailsListing}
							errorApi={errorApi}
							setErrorApi={setErrorApi}
						/>
					</Suspense>
				</Collapse>
			</Container>
		</Box>
	);
};

export default App;
