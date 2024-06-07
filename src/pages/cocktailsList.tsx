import Box from "@mui/material/Box";
import { ICocktailItem } from "../components/types";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Skeleton from "@mui/material/Skeleton";
import React from "react";

const CocktailsList = ({
	setInputValue,
	cocktailsListing,
	setCocktailsListing,
}: {
	setInputValue: React.Dispatch<React.SetStateAction<string>>;
	cocktailsListing: ICocktailItem[];
	setCocktailsListing: React.Dispatch<React.SetStateAction<ICocktailItem[]>>;
}) => {
	if (!cocktailsListing) {
		return (
			<Typography
				component={"h4"}
				align="center"
				variant="h6"
				sx={{
					width: "100%",
				}}
			>
				No options
			</Typography>
		);
	}
	return (
		<>
			{cocktailsListing.length === 0 ? (
				<>
					{[...new Array(5)].map((_, index) => (
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
									paddingTop={1}
									gap={1}
									sx={{}}
								>
									<Skeleton
										width="60%"
										height={20}
										animation="wave"
									/>
									<Skeleton
										width="30%"
										height={10}
										animation="wave"
									/>
									<Skeleton
										width="40%"
										height={10}
										animation="wave"
									/>
								</Stack>
							</Box>
						</React.Fragment>
					))}
				</>
			) : (
				<Box paddingBottom={8}>
					{cocktailsListing.map((cocktailItem, index) => (
						<Box
							key={index}
							gap={2}
							onClick={() => {
								setInputValue(cocktailItem.strDrink);
								setCocktailsListing([cocktailItem]);
							}}
							sx={{
								display: "flex",
								marginBottom: 1,
							}}
						>
							<Avatar
								alt={cocktailItem.strDrink ?? undefined}
								src={`${cocktailItem.strDrinkThumb}/preview`}
								sx={{ width: 100, height: 100, borderRadius: 4 }}
							/>
							<Stack
								direction="column"
								width="100%"
								sx={{ paddingTop: 1 }}
							>
								<Typography
									component={"h4"}
									variant="body1"
									sx={{
										width: "100%",
									}}
								>
									{cocktailItem.strDrink}
								</Typography>
								<Typography
									variant="caption"
									component="p"
								>
									{cocktailItem.strCategory}
								</Typography>
								<Typography
									variant="caption"
									component="p"
								>
									{cocktailItem.strAlcoholic}
								</Typography>
							</Stack>
						</Box>
					))}
				</Box>
			)}
		</>
	);
};

export default CocktailsList;
