import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import Skeleton from "@mui/material/Skeleton";
import React, { useEffect, useState } from "react";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { ICocktailItem, IngredientsThumbSize } from "../components/types";
import { urlIngredientThumb } from "../api/url";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import Avatar from "@mui/material/Avatar";
import { getCocktailByName } from "../api/requests";

const Cocktail = ({
	cocktailsListing,
}: {
	cocktailsListing: ICocktailItem[];
}) => {
	const [cocktailItem, setCocktailItem] = useState<ICocktailItem>();

	useEffect(() => {
		getCocktailByName(cocktailsListing[0]?.strDrink).then((result) =>
			setCocktailItem(result.drinks[0])
		);
	}, [cocktailsListing]);

	return (
		<>
			<Card sx={{ borderRadius: 2 }}>
				<CardHeader
					sx={{ padding: 2 }}
					title={
						cocktailItem ? (
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
								height={10}
								width="80%"
							/>
						)
					}
				/>
				{cocktailItem ? (
					<CardMedia
						component="img"
						height="380"
						image={cocktailItem.strDrinkThumb ?? undefined}
						alt={cocktailItem.strDrink}
					/>
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
										<Box
											key={index}
											gap={1}
											sx={{
												display: "flex",
												marginBottom: 1,
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
		</>
	);
};

export default Cocktail;
