import { useEffect, useState } from "react";
import { useSwiperSlide } from "swiper/react";
import { getSlideList } from "../api/requests";
import CocktailsList from "../pages/cocktailsList";
import { ICocktailItem } from "./types";

interface IcompProps {
	setShowFilter: React.Dispatch<React.SetStateAction<boolean>>;
	data: string[];
	setErrorApi: React.Dispatch<React.SetStateAction<boolean>>;
	setInputValue: React.Dispatch<React.SetStateAction<string>>;
	setCocktailsListing: React.Dispatch<React.SetStateAction<ICocktailItem[]>>;
}

const SlideLoader: React.FC<IcompProps> = ({
	setShowFilter,
	data,
	setErrorApi,
	setInputValue,
	setCocktailsListing,
}) => {
	const [slideListing, setSlideListing] = useState<ICocktailItem[]>([]);
	const swiperSlide = useSwiperSlide();

	useEffect(() => {
		if (data.length) {
			if (swiperSlide.isActive) {
				getSlideList(data, setErrorApi).then((result) =>
					setSlideListing(result)
				);
			}
		}
		return setSlideListing([]);
	}, [data, setErrorApi, setSlideListing, swiperSlide.isActive]);
	return (
		<CocktailsList
			setShowFilter={setShowFilter}
			setInputValue={setInputValue}
			cocktailsListing={slideListing}
			setCocktailsListing={setCocktailsListing}
		/>
	);
};
export default SlideLoader;
