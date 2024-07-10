import Avatar from "@mui/material/Avatar";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { useState } from "react";
import { urlIngredientThumb } from "../api/url";
import { modalStyle, overlayStyle } from "./styles";
import { IIngredients, IngredientsThumbSize } from "./types";
import { alpha } from "@mui/material";

interface ICompProps {
	ingredient: IIngredients | null;
}

const IngredientThumbnailModal: React.FC<ICompProps> = ({ ingredient }) => {
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
							backgroundColor: alpha("#ffffff", 0),
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
};
export default IngredientThumbnailModal;
