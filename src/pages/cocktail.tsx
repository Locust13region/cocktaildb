import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import Divider from "@mui/material/Divider";
import Fade from "@mui/material/Fade";
import Grow from "@mui/material/Grow";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import React, { useEffect, useState } from "react";
import { getCocktailByName } from "../api/requests";
import { urlIngredientThumb } from "../api/url";
import { ICocktailItem, IngredientsThumbSize } from "../components/types";
import IngredientModal from "../components/ingredientModal";

const Cocktail = ({
	cocktailsListing,
	setErrorApi,
}: {
	cocktailsListing: ICocktailItem[];
	setErrorApi: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
	const [cocktailItem, setCocktailItem] = useState<ICocktailItem>();
	const [ingredientModal, setIngredientModal] = useState("");
	const handleIngredientOpen = (ingredient: string) =>
		setIngredientModal(ingredient);

	useEffect(() => {
		getCocktailByName(cocktailsListing[0]?.strDrink, setErrorApi).then(
			(result) => setCocktailItem(result.drinks[0])
		);
	}, [cocktailsListing, setErrorApi]);

	return (
		<>
			<Card sx={{ borderRadius: 2 }}>
				<CardHeader
					sx={{ padding: 2 }}
					title={
						cocktailItem ? (
							<Fade
								in={!!cocktailItem}
								timeout={1000}
							>
								<Typography
									component={"h1"}
									variant="h5"
									noWrap
									sx={{
										width: "100%",
									}}
								>
									{cocktailItem.strDrink}
								</Typography>
							</Fade>
						) : (
							<Skeleton
								animation="wave"
								height={30}
								width="40%"
								style={{ marginBottom: 6 }}
							/>
						)
					}
					subheader={
						cocktailItem ? (
							<Typography
								variant="caption"
								color="text.secondary"
							>
								{cocktailItem.strCategory}, {cocktailItem.strAlcoholic}
							</Typography>
						) : (
							<Skeleton
								animation="wave"
								height={15}
								width="80%"
							/>
						)
					}
				/>
				{cocktailItem ? (
					<Fade
						in={!!cocktailItem}
						timeout={1000}
					>
						<CardMedia
							component="img"
							height="380"
							image={cocktailItem.strDrinkThumb ?? undefined}
							alt={cocktailItem.strDrink}
						/>
					</Fade>
				) : (
					<Skeleton
						sx={{ height: 380 }}
						animation="wave"
						variant="rectangular"
					/>
				)}
				<CardContent sx={{ padding: 1 }}>
					<Divider
						sx={{ marginY: 2 }}
						variant="middle"
					>
						<Typography
							component={"h4"}
							align="center"
							variant="h6"
							sx={{
								width: "100%",
							}}
						>
							Ingredients
						</Typography>
					</Divider>
					{cocktailItem ? (
						<>
							<Typography
								variant="body1"
								component="p"
								marginBottom={2}
							>
								{cocktailItem.strGlass}
							</Typography>
							{[...new Array(15)]
								.filter(
									(_, index) =>
										cocktailItem[
											`strIngredient${index + 1}` as keyof ICocktailItem
										]
								)
								.map((_, index) => {
									const ingredient = `strIngredient${
										index + 1
									}` as keyof ICocktailItem;
									const measure = `strMeasure${
										index + 1
									}` as keyof ICocktailItem;
									return (
										<Grow
											key={index}
											in={true}
											style={{ transformOrigin: "0 0 0" }}
											timeout={800 * index}
										>
											<Box
												gap={1}
												sx={{
													display: "flex",
													marginBottom: 1,
												}}
												onClick={() => {
													handleIngredientOpen(
														cocktailItem[ingredient] as string
													);
												}}
											>
												<Avatar
													variant="rounded"
													alt={cocktailItem[ingredient] ?? undefined}
													src={
														urlIngredientThumb +
														cocktailItem[ingredient] +
														IngredientsThumbSize.small
													}
													sx={{ width: 100, height: 100 }}
												/>
												<Stack
													direction="column"
													width="100%"
													sx={{ paddingTop: 1 }}
												>
													<Typography
														variant="body1"
														component="p"
													>
														{cocktailItem[ingredient]}
													</Typography>
													<Typography
														variant="body1"
														component="p"
													>
														{cocktailItem[measure]}
													</Typography>
												</Stack>
											</Box>
										</Grow>
									);
								})}
						</>
					) : (
						<>
							<Skeleton
								animation="wave"
								height={20}
								width="50%"
								style={{
									marginBottom: 10,
								}}
							/>
							{[...new Array(4)].map((_, index) => (
								<React.Fragment key={index}>
									<Box
										gap={4}
										sx={{
											display: "flex",
											marginBottom: 1,
										}}
									>
										<Box>
											<Skeleton
												variant="rectangular"
												width={100}
												height={100}
												sx={{
													borderRadius: 5,
												}}
											/>
										</Box>
										<Stack
											direction="column"
											width="100%"
										>
											<Skeleton
												width="60%"
												height={20}
												animation="wave"
											/>
											<Skeleton
												width="30%"
												height={20}
												animation="wave"
											/>
										</Stack>
									</Box>
								</React.Fragment>
							))}
						</>
					)}
					<Divider
						sx={{ marginY: 2 }}
						variant="middle"
					>
						<Typography
							component={"h4"}
							align="center"
							variant="h6"
							sx={{
								width: "100%",
							}}
						>
							Instructions
						</Typography>
					</Divider>
					{cocktailItem ? (
						<Typography>{cocktailItem.strInstructions}</Typography>
					) : (
						<>
							<Skeleton
								animation="wave"
								height={20}
								style={{ marginBottom: 6 }}
							/>
							<Skeleton
								animation="wave"
								height={20}
								width="80%"
							/>
						</>
					)}
				</CardContent>
			</Card>
			{!!ingredientModal && (
				<IngredientModal
					setErrorApi={setErrorApi}
					ingredientModal={ingredientModal}
					setIngredientModal={setIngredientModal}
				/>
			)}
		</>
	);
};

export default Cocktail;
