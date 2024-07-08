import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import SlideLoader from "../components/slide-loader";
import { ICocktailItem } from "../components/types";

export default function FilteredSlider({
	setShowFilter,
	options,
	setErrorApi,
	setInputValue,
	setCocktailsListing,
}: {
	setShowFilter: React.Dispatch<React.SetStateAction<boolean>>;
	options: string[][];
	setErrorApi: React.Dispatch<React.SetStateAction<boolean>>;
	setInputValue: React.Dispatch<React.SetStateAction<string>>;
	setCocktailsListing: React.Dispatch<React.SetStateAction<ICocktailItem[]>>;
}) {
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
}
