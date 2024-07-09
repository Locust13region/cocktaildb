import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";
import { Container } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Slide from "@mui/material/Slide";
import Toolbar from "@mui/material/Toolbar";
import useScrollTrigger from "@mui/material/useScrollTrigger";
import { ICocktailItem } from "./types";
import logo from "/img/logo.png";

interface IHideOnScrollProp {
	children: React.ReactElement;
}

const HideOnScroll: React.FC<IHideOnScrollProp> = ({ children }) => {
	const trigger = useScrollTrigger({
		threshold: 100,
		disableHysteresis: true,
	});

	return (
		<Slide
			appear={false}
			direction="down"
			in={!trigger}
		>
			{children}
		</Slide>
	);
};

interface ICompProps {
	showFilter: boolean;
	setShowFilter: React.Dispatch<React.SetStateAction<boolean>>;
	setCocktailsListing: React.Dispatch<React.SetStateAction<ICocktailItem[]>>;
}

const HeaderBar: React.FC<ICompProps> = ({
	showFilter,
	setShowFilter,
	setCocktailsListing,
}) => {
	return (
		<>
			<HideOnScroll>
				<AppBar sx={{ backgroundColor: "#230312" }}>
					<Container
						maxWidth="xs"
						disableGutters
						sx={{ px: { xs: 1, sm: 2 } }}
					>
						<Toolbar disableGutters>
							<IconButton
								onClick={() => setCocktailsListing([])}
								sx={{ flexGrow: 1, pt: 1, pl: 2 }}
							>
								<Box
									component="img"
									sx={{ height: 34, flexGrow: 1 }}
									alt="Server connection error"
									src={logo}
								/>
							</IconButton>
							<IconButton
								edge="start"
								size="large"
								color="inherit"
								aria-label="headerBar"
								sx={{}}
								onClick={() => setShowFilter(!showFilter)}
							>
								<FilterAltOutlinedIcon fontSize="large" />
							</IconButton>
						</Toolbar>
					</Container>
				</AppBar>
			</HideOnScroll>
		</>
	);
};

export default HeaderBar;
