import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import SlideLoader from "../components/slide-loader";
import { ICocktailItem } from "../components/types";
import React from "react";

interface Props {
	setShowFilter: React.Dispatch<React.SetStateAction<boolean>>;
	options: string[][];
	setErrorApi: React.Dispatch<React.SetStateAction<boolean>>;
	setInputValue: React.Dispatch<React.SetStateAction<string>>;
	setCocktailsListing: React.Dispatch<React.SetStateAction<ICocktailItem[]>>;
}

const FilteredSlider: React.FC<Props> = ({
	setShowFilter,
	options,
	setErrorApi,
	setInputValue,
	setCocktailsListing,
}) => {
	return (
		<>
			<Swiper
				pagination={{
					dynamicBullets: true,
				}}
				modules={[Pagination]}
				className="mySwiper"
			>
				{options.map((sliderPageData, index) => {
					return (
						<SwiperSlide key={index}>
							<SlideLoader
								setShowFilter={setShowFilter}
								data={sliderPageData}
								setErrorApi={setErrorApi}
								setInputValue={setInputValue}
								setCocktailsListing={setCocktailsListing}
							/>
						</SwiperSlide>
					);
				})}
			</Swiper>
		</>
	);
};

export default FilteredSlider;
