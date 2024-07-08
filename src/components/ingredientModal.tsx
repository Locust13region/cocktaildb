import Avatar from "@mui/material/Avatar";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import Zoom from "@mui/material/Zoom";
import React, { useEffect, useState } from "react";
import { getIngredientByName } from "../api/requests";
import { urlIngredientThumb } from "../api/url";
import { IIngredients, IngredientsThumbSize } from "./types";

const modalStyle = {
	width: 350,
	maxHeight: 600,
	bgcolor: "background.paper",
	borderStyle: "none",
	borderRadius: 4,
	outline: "none",
	boxShadow: 24,
	p: 2,
	overflowY: "scroll",
};
const blurDepth = "4px";
const overlayStyle = {
	display: "flex",
	alignItems: "center",
	justifyContent: "center",
	backdropFilter: `blur(${blurDepth})`,
	WebkitBackdropFilter: `blur(${blurDepth})`,
	overflow: "hidden",
};

const IngredientModal = ({
	setErrorApi,
	ingredientModal,
	setIngredientModal,
}: {
	setErrorApi: React.Dispatch<React.SetStateAction<boolean>>;
	ingredientModal: string;
	setIngredientModal: React.Dispatch<React.SetStateAction<string>>;
}) => {
	const [ingredient, setIngredient] = useState<IIngredients | null>(null);

	useEffect(() => {
		getIngredientByName(ingredientModal, setErrorApi).then((result) =>
			setIngredient(result.ingredients[0])
		);
	}, [ingredientModal, setErrorApi]);

	const handleClose = () => {
		setIngredient(null);
		setIngredientModal("");
	};

	return (
		<Modal
			open={!!ingredientModal}
			onClose={handleClose}
			aria-labelledby="parent-modal-ingredient-title"
			aria-describedby="parent-modal-ingredient-description"
			slots={{ backdrop: Backdrop }}
			slotProps={{
				backdrop: {
					sx: {
						backgroundColor: "rgb(0, 0, 0, 0)",
					},
				},
			}}
			sx={overlayStyle}
		>
			<Zoom in={!!ingredient}>
				<Box
					onClick={handleClose}
					sx={{ ...modalStyle, zIndex: 10, position: "absolute" }}
				>
					<Typography
						id="parent-modal-ingredient-title"
						component={"h4"}
						variant="h6"
						sx={{
							mb: 1,
						}}
					>
						{ingredient?.strIngredient}
					</Typography>
					<IngredientThumbnailModal ingredient={ingredient} />
					<Typography
						id="parent-modal-ingredient-description"
						variant="caption"
						component="p"
					>
						{ingredient?.strDescription}
					</Typography>
				</Box>
			</Zoom>
		</Modal>
	);
};

export default IngredientModal;

function IngredientThumbnailModal({
	ingredient,
}: {
	ingredient: IIngredients | null;
}) {
	const [open, setOpen] = useState(false);
	const handleOpen = (event: React.MouseEvent<HTMLElement>) => {
		event.stopPropagation();
		setOpen(true);
	};
	const handleClose = () => {
		setOpen(false);
	};

	return (
		<>
			<Avatar
				onClick={handleOpen}
				variant="square"
				alt={ingredient?.strIngredient}
				src={
					urlIngredientThumb +
					ingredient?.strIngredient +
					IngredientsThumbSize.small
				}
				sx={{ width: 100, height: 100, float: "left" }}
			/>
			<Modal
				open={open}
				onClose={handleClose}
				aria-labelledby="child-modal-title"
				aria-describedby="child-modal-description"
				slots={{ backdrop: Backdrop }}
				slotProps={{
					backdrop: {
						sx: {
							backgroundColor: "rgb(0, 0, 0, 0)",
						},
					},
				}}
				sx={overlayStyle}
			>
				<Box sx={{ ...modalStyle, zIndex: 10, position: "absolute" }}>
					<Avatar
						onClick={handleClose}
						variant="square"
						alt={ingredient?.strIngredient}
						src={
							urlIngredientThumb +
							ingredient?.strIngredient +
							IngredientsThumbSize.medium
						}
						sx={{ width: 300, height: 300 }}
					/>
				</Box>
			</Modal>
		</>
	);
}
