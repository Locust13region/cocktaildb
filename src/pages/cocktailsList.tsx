import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Fade from "@mui/material/Fade";
import Grow from "@mui/material/Grow";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import React from "react";
import { ICocktailItem } from "../components/types";

interface ICompProps {
	setShowFilter: React.Dispatch<React.SetStateAction<boolean>>;
	setInputValue: React.Dispatch<React.SetStateAction<string>>;
	cocktailsListing: ICocktailItem[];
	setCocktailsListing: React.Dispatch<React.SetStateAction<ICocktailItem[]>>;
}
const CocktailsList: React.FC<ICompProps> = ({
	setShowFilter,
	setInputValue,
	cocktailsListing,
	setCocktailsListing,
}) => {
	if (!cocktailsListing) {
		return (
			<Fade
				in={true}
				timeout={1000}
			>
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
			</Fade>
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
						<Grow
							key={index}
							in={true}
							style={{ transformOrigin: "0 0 0" }}
							timeout={500 * index}
						>
							<Box
								gap={2}
								onClick={() => {
									setInputValue(cocktailItem.strDrink);
									setCocktailsListing([cocktailItem]);
									setShowFilter(false);
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
						</Grow>
					))}
				</Box>
			)}
		</>
	);
};

export default CocktailsList;
