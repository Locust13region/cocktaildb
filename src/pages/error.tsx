import Typography from "@mui/material/Typography";

const ErrorOccurred = () => {
	return (
		<Typography
			component={"h4"}
			align="center"
			variant="h6"
			sx={{
				width: "100%",
			}}
		>
			An error occurred while accessing the server.
		</Typography>
	);
};

export default ErrorOccurred;
