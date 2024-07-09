import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import Zoom from "@mui/material/Zoom";
import { useEffect, useState } from "react";
import { getIngredientByName } from "../api/requests";
import IngredientThumbnailModal from "./IngredientThumbnailModal";
import { modalStyle, overlayStyle } from "./styles";
import { IIngredients } from "./types";

interface ICompProps {
	setErrorApi: React.Dispatch<React.SetStateAction<boolean>>;
	ingredientModal: string;
	setIngredientModal: React.Dispatch<React.SetStateAction<string>>;
}

const IngredientModal: React.FC<ICompProps> = ({
	setErrorApi,
	ingredientModal,
	setIngredientModal,
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
