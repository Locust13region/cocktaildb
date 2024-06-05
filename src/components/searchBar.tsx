import { useState } from "react";
import { styled, alpha } from "@mui/material/styles";
import SearchIcon from "@mui/icons-material/Search";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import CircularProgress from "@mui/material/CircularProgress";
import { ICocktailItem } from "./types";
import { getCocktailByNamePart } from "../api/requests";

const Search = styled("div")(({ theme }) => ({
	position: "relative",
	borderRadius: 50,
	backgroundColor: alpha(theme.palette.common.white, 0.15),
	"&:hover": {
		backgroundColor: alpha(theme.palette.common.white, 0.25),
	},
	marginRight: theme.spacing(2),
	marginLeft: 0,
	width: "100%",
	[theme.breakpoints.up("sm")]: {
		marginLeft: theme.spacing(3),
		marginRight: theme.spacing(3),
		width: "auto",
	},
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
	padding: theme.spacing(0, 2),
	height: "100%",
	position: "absolute",
	pointerEvents: "none",
	display: "flex",
	alignItems: "center",
	justifyContent: "center",
}));

const StyledAutocomplete = styled(Autocomplete)(({ theme }) => ({
	color: "inherit",
	"&& .MuiAutocomplete-input": {
		padding: theme.spacing(1, 1, 1, 0),
		paddingLeft: `calc(1em + ${theme.spacing(4)})`,
		transition: theme.transitions.create("width"),
		width: "100%",
		// [theme.breakpoints.up("md")]: {
		// 	width: "20ch",
		// },
	},
}));

const SearchBar = ({
	setCocktailsListing,
}: {
	setCocktailsListing: React.Dispatch<React.SetStateAction<ICocktailItem[]>>;
}) => {
	// const dispatch = useAppDispatch();
	// const navigate = useNavigate();
	const [open, setOpen] = useState(false);
	const [cocktailsList, setCocktailsList] = useState<ICocktailItem[]>([]);
	const [loading, setLoading] = useState(false);
	// const loading = open && cocktailsList.length === 0;

	const handleInput = async (
		_: React.SyntheticEvent,
		value,
		reason: string
	) => {
		setLoading(true);
		await getCocktailByNamePart(value)
			.then((result) => setCocktailsList(result.drinks))
			.then(() => setOpen(true))
			.finally(() => setLoading(false));
		console.log("value", value);
		console.log("reason", reason);
	};

	const handleOptionSelected = (
		_: React.SyntheticEvent<Element, Event>,
		value: TRecipe | null,
		reason: AutocompleteChangeReason
	) => {
		if (value && reason === "selectOption") {
			console.log("value", value);
			// 		navigate(`/${value.categoryId}/${value.id}`);
		}
	};

	const handleOpen = () => {};
	const handleClose = () => {
		setOpen(false);
	};

	return (
		<Box sx={{ my: 2 }}>
			<Toolbar />
			<Search>
				{!loading ? (
					<SearchIconWrapper>
						<SearchIcon />
					</SearchIconWrapper>
				) : null}

				<StyledAutocomplete
					id="searchCocktail"
					fullWidth
					forcePopupIcon={false}
					loadingText={"Loading…"}
					noOptionsText={"No options"}
					filterOptions={(x) => x}
					open={open}
					onOpen={handleOpen}
					onClose={handleClose}
					onInputChange={handleInput}
					onChange={handleOptionSelected}
					isOptionEqualToValue={(option, value) =>
						option.strDrink === value.strDrink
					}
					getOptionLabel={(option) => option.strDrink}
					options={cocktailsList}
					loading={loading}
					renderInput={(params) => (
						<TextField
							type="text"
							placeholder={!loading ? "Search…" : ""} //!!!!!! FILTERED!!!!!!
							variant="standard"
							{...params}
							InputProps={{
								...params.InputProps,
								disableUnderline: true,

								endAdornment: (
									<>
										{loading ? (
											<SearchIconWrapper>
												<CircularProgress
													color="inherit"
													size={20}
												/>
											</SearchIconWrapper>
										) : null}
										{params.InputProps.endAdornment}
									</>
								),
							}}
						/>
					)}
				/>
			</Search>
		</Box>
	);
};

export default SearchBar;
