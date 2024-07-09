export const modalStyle = {
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
export const overlayStyle = {
	display: "flex",
	alignItems: "center",
	justifyContent: "center",
	backdropFilter: `blur(${blurDepth})`,
	WebkitBackdropFilter: `blur(${blurDepth})`,
	overflow: "hidden",
};
