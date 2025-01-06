import { useEffect, useState } from 'react';
import SectionTitle from '../../components/SectionTitle';
import "swiper/css";
import "swiper/css/navigation";
import "@smastrom/react-rating/style.css"
import { Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Rating } from '@smastrom/react-rating';

const Testimonials = () => {
  const [reviews, setReviews] = useState();
  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_BASE_URL}/reviews`)
    .then(res => res.json())
    .then(data => setReviews(data))
  }, [])
  // _id name details rating
  return (
    <section>
      <SectionTitle 
        subHeading={"What Our Clients Say"} 
        heading={"TESTIMONIALS"}
      ></SectionTitle>
      <div className="px-36">
        <Swiper navigation={true} modules={[Navigation]} className="mySwiper">
          {
            reviews ? (
              reviews.map(review =>
                <SwiperSlide key={review._id}> 
                  <div className="flex flex-col items-center gap-5 mx-24 my-16 text-center">

                    <Rating 
                      className='max-w-44'
                      value={review.rating}
                      readOnly
                    />

                    <p className="">{review.details} </p>
                    <h3 className="text-2xl text-orange-400 uppercase"> {review.name} </h3>
                  </div>
                </SwiperSlide>
              )
            ) : (
              <p className=""> Loading Reviews.... </p>
            )
          }
        </Swiper>
      </div>
    </section>
  );
};

export default Testimonials;