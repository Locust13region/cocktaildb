import ClearIcon from "@mui/icons-material/Clear";
import SearchIcon from "@mui/icons-material/Search";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import Toolbar from "@mui/material/Toolbar";
import { alpha, styled } from "@mui/material/styles";
import { useState, useCallback } from "react";
import { getCocktailByNamePart } from "../api/requests";
import { ICocktailItem } from "./types";
import debounce from "lodash.debounce";

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

const StyledTextField = styled(TextField)(({ theme }) => ({
	color: "inherit",
	"&.MuiTextField-root": {
		padding: theme.spacing(1, 1, 1, 0),
		transition: theme.transitions.create("width"),
		width: "100%",
		[theme.breakpoints.up("md")]: {
			width: "20ch",
		},
	},
}));

const SearchBar = ({
	setCocktailsListing,
}: {
	setCocktailsListing: React.Dispatch<React.SetStateAction<ICocktailItem[]>>;
}) => {
	const [inputValue, setInputValue] = useState("");
	const [loading, setLoading] = useState(false);

	const handleClear = () => {
		setInputValue("");
		setCocktailsListing([]);
		setLoading(false);
	};
	const debouncedGetCocktailByNamePart = useCallback(
		debounce(async (value: string) => {
			await getCocktailByNamePart(value)
				.then((result) => setCocktailsListing(result.drinks))
				.finally(() => setLoading(false));
		}, 500),
		[]
	);
	const handleInput = (
		event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		const { value } = event.target;
		setInputValue(value);
		setLoading(true);
		value ? debouncedGetCocktailByNamePart(value) : handleClear();
	};

	return (
		<Box sx={{ my: 2 }}>
			<Toolbar />
			<Search>
				<StyledTextField
					id="SearchField"
					type="text"
					placeholder="Search…"
					variant="standard"
					fullWidth
					value={inputValue}
					onChange={handleInput}
					InputProps={{
						"aria-label": "search",
						disableUnderline: true,
						startAdornment: (
							<InputAdornment
								position="start"
								sx={{
									paddingLeft: 2,
								}}
							>
								{loading ? (
									<CircularProgress
										color="inherit"
										size={20}
									/>
								) : (
									<SearchIcon />
								)}
							</InputAdornment>
						),
						endAdornment: (
							<InputAdornment position="start">
								{inputValue ? (
									<IconButton onClick={handleClear}>
										<ClearIcon />
									</IconButton>
								) : null}
							</InputAdornment>
						),
					}}
				></StyledTextField>
			</Search>
		</Box>
	);
};

export default SearchBar;
