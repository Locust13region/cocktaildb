import Autocomplete from "@mui/material/Autocomplete";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import TextField from "@mui/material/TextField";
import Toolbar from "@mui/material/Toolbar";
import { useEffect, useMemo, useState } from "react";
import { getFiltered, getParamsLists } from "../api/requests";
import {
	Alcoholic,
	Category,
	Glass,
	ICocktailItem,
	IFiltersParams,
	Ingredient,
} from "./types";
import FilteredSlider from "../pages/filteredSlider";
import ErrorOccurred from "../pages/error";
import Typography from "@mui/material/Typography";

const Filter = ({
	setShowFilter,
	setInputValue,
	setCocktailsListing,
	errorApi,
	setErrorApi,
}: {
	setShowFilter: React.Dispatch<React.SetStateAction<boolean>>;
	setInputValue: React.Dispatch<React.SetStateAction<string>>;
	setCocktailsListing: React.Dispatch<React.SetStateAction<ICocktailItem[]>>;
	errorApi: boolean;
	setErrorApi: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
	const [filtersParams, setFiltersParams] = useState<IFiltersParams[]>([]);

	useEffect(() => {
		getParamsLists(setErrorApi).then((result) => setFiltersParams(result));
	}, [setErrorApi]);

	const [inputIngredient, setInputIngredient] = useState("");
	const [selectedIngredient, setSelectedIngredient] = useState<Ingredient[]>(
		[]
	);
	const [selectedCategory, setSelectedCategory] = useState<Category[]>([]);
	const [selectedAlcoholic, setSelectedAlcoholic] = useState<Alcoholic[]>([]);
	const [selectedGlass, setSelectedGlass] = useState<Glass[]>([]);

	const [filteredByIngredients, seFilteredByIngredients] = useState<string[]>(
		[]
	);
	const [filteredByCategory, setFilteredByCategory] = useState<string[]>([]);
	const [filteredByAlcoholic, setFilteredByAlcoholic] = useState<string[]>([]);
	const [filteredByGlass, setFilteredByGlass] = useState<string[]>([]);

	const [slidesOptions, setSlidesOptions] = useState<string[][]>([]);

	useEffect(() => {
		getFiltered(selectedIngredient, setErrorApi).then((result) =>
			seFilteredByIngredients(result)
		);
	}, [selectedIngredient, setErrorApi]);
	useEffect(() => {
		getFiltered(selectedCategory, setErrorApi).then((result) =>
			setFilteredByCategory(result)
		);
	}, [selectedCategory, setErrorApi]);
	useEffect(() => {
		getFiltered(selectedAlcoholic, setErrorApi).then((result) =>
			setFilteredByAlcoholic(result)
		);
	}, [selectedAlcoholic, setErrorApi]);
	useEffect(() => {
		getFiltered(selectedGlass, setErrorApi).then((result) =>
			setFilteredByGlass(result)
		);
	}, [selectedGlass, setErrorApi]);

	const combinedFilters = [
		filteredByIngredients,
		filteredByCategory,
		filteredByAlcoholic,
		filteredByGlass,
	].filter((array) => array.length !== 0);
	const joinedFilters = useMemo(
		() =>
			combinedFilters.length === 0
				? []
				: combinedFilters.reduce(
						(r, c) =>
							r.filter((source: string) =>
								c.some((target: string) => source === target)
							)
						// eslint-disable-next-line no-mixed-spaces-and-tabs
				  ),
		[combinedFilters]
	);
	const slideOptionsSize = 5;
	useEffect(() => {
		const result =
			joinedFilters.length < slideOptionsSize
				? [joinedFilters]
				: joinedFilters.reduce<string[][]>((acc, _, index) => {
						if (index % slideOptionsSize === 0) {
							acc.push(joinedFilters.slice(index, index + slideOptionsSize));
						}
						return acc;
						// eslint-disable-next-line no-mixed-spaces-and-tabs
				  }, []);
		setSlidesOptions(result);
	}, [
		filteredByAlcoholic,
		filteredByCategory,
		filteredByGlass,
		filteredByIngredients,
		joinedFilters,
	]);

	return (
		<>
			<Toolbar />

			<Box
				id="FilterComponent"
				height={150}
				width={"100%"}
				display={"flex"}
				flexDirection={"column"}
				gap={1}
				my={3}
			>
				{filtersParams.length && (
					<>
						<Autocomplete
							id="ingredient-filter"
							multiple
							fullWidth
							clearOnBlur={true}
							blurOnSelect={true}
							ListboxProps={{
								style: {
									maxHeight: 200,
								},
							}}
							// PaperComponent={{<Paper elevation={8} {...props} />}}
							forcePopupIcon
							limitTags={1}
							value={selectedIngredient}
							onChange={(_, newValue: Ingredient[]) => {
								setSelectedIngredient(newValue);
							}}
							inputValue={inputIngredient}
							onInputChange={(_, newInputValue) => {
								setInputIngredient(newInputValue);
							}}
							options={filtersParams[2].ingredient ?? []}
							getOptionLabel={(option) => option.strIngredient1}
							renderInput={(params) => (
								<TextField
									{...params}
									variant="standard"
									placeholder={!selectedIngredient.length ? "Ingredients" : ""}
									InputProps={{ ...params.InputProps, disableUnderline: true }}
									sx={{ "& ::placeholder": { color: "inherit", opacity: 1 } }}
								/>
							)}
						/>
						<Autocomplete
							id="category-filter"
							multiple
							fullWidth
							autoHighlight={true}
							disableListWrap={true}
							clearOnBlur={true}
							blurOnSelect={true}
							ListboxProps={{
								style: {
									maxHeight: 450,
								},
							}}
							forcePopupIcon
							limitTags={1}
							value={selectedCategory}
							onChange={(_, newValue: Category[]) => {
								setSelectedCategory(newValue);
							}}
							options={filtersParams[0].category ?? []}
							getOptionLabel={(option) => option.strCategory}
							renderInput={({ inputProps, ...params }) => (
								<TextField
									{...params}
									variant="standard"
									placeholder={!selectedCategory.length ? "Categories" : ""}
									inputProps={{ ...inputProps, readOnly: true }}
									InputProps={{
										...params.InputProps,
										disableUnderline: true,
									}}
									sx={{ "& ::placeholder": { color: "inherit", opacity: 1 } }}
								/>
							)}
						/>
						<Autocomplete
							id="Alcoholic-filter"
							multiple
							fullWidth
							clearOnBlur={true}
							blurOnSelect={true}
							ListboxProps={{
								style: {
									maxHeight: 300,
								},
							}}
							forcePopupIcon
							limitTags={1}
							value={selectedAlcoholic}
							onChange={(_, newValue: Alcoholic[]) => {
								setSelectedAlcoholic(newValue);
							}}
							options={filtersParams[3].alcoholic ?? []}
							getOptionLabel={(option) => option.strAlcoholic}
							renderInput={({ inputProps, ...params }) => (
								<TextField
									{...params}
									variant="standard"
									placeholder={!selectedAlcoholic.length ? "Alcoholic" : ""}
									inputProps={{ ...inputProps, readOnly: true }}
									InputProps={{ ...params.InputProps, disableUnderline: true }}
									sx={{ "& ::placeholder": { color: "inherit", opacity: 1 } }}
								/>
							)}
						/>
						<Autocomplete
							id="glass-filter"
							multiple
							fullWidth
							clearOnBlur={true}
							blurOnSelect={true}
							ListboxProps={{
								style: {
									maxHeight: 300,
								},
							}}
							forcePopupIcon
							limitTags={1}
							value={selectedGlass}
							onChange={(_, newValue: Glass[]) => {
								setSelectedGlass(newValue);
							}}
							options={filtersParams[1].glass ?? []}
							getOptionLabel={(option) => option.strGlass}
							renderInput={({ inputProps, ...params }) => (
								<TextField
									{...params}
									variant="standard"
									placeholder={!selectedGlass.length ? "Glasses" : ""}
									inputProps={{ ...inputProps, readOnly: true }}
									InputProps={{ ...params.InputProps, disableUnderline: true }}
									sx={{ "& ::placeholder": { color: "inherit", opacity: 1 } }}
								/>
							)}
						/>
					</>
				)}
			</Box>
			<Collapse in={!!joinedFilters.length}>
				<Typography
					mb={1}
					align={"center"}
					variant="body2"
					component="p"
				>
					{joinedFilters.length} selected options
				</Typography>
			</Collapse>
			<Collapse in={!joinedFilters.length}>
				<Box mt={2} />
			</Collapse>

			{!errorApi && (
				<FilteredSlider
					setShowFilter={setShowFilter}
					options={slidesOptions}
					setErrorApi={setErrorApi}
					setInputValue={setInputValue}
					setCocktailsListing={setCocktailsListing}
				/>
			)}
			{errorApi && <ErrorOccurred />}
		</>
	);
};

export default Filter;
