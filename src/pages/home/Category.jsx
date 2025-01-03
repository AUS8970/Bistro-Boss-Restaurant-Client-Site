import { Swiper as SwiperComponent, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';
import SectionTitle from '../../components/SectionTitle';

const Category = () => {
  return (
    <section>
      <SectionTitle 
      heading={"ORDER ONLINE"}
      subHeading={"From 11:00am to 10:00pm"}
      ></SectionTitle>
      <SwiperComponent
        modules={[Pagination]}
        spaceBetween={30}
        slidesPerView={3}
        navigation
        pagination={{ clickable: true }}
        scrollbar={{ draggable: true }}
        onSwiper={(swiper) => console.log(swiper)}
        onSlideChange={() => console.log('slide change')}
        className='mb-32'
      >
        <SwiperSlide>
          <img className='w-full' src="https://i.ibb.co.com/Lxb2fpw/slide1.jpg" alt="" />
          <h2 className="text-4xl -mt-20 uppercase text-center text-white"> Salad </h2>
        </SwiperSlide>
        <SwiperSlide>
          <img className='w-full' src="https://i.ibb.co.com/PzrHMXj/slide4.jpg" alt="" />
          <h2 className="text-4xl -mt-20 uppercase text-center text-white"> Cake </h2>
        </SwiperSlide>
        <SwiperSlide>
          <img className='w-full' src="https://i.ibb.co.com/GCcY4pD/slide3.jpg" alt="" />
          <h2 className="text-4xl -mt-20 uppercase text-center text-white"> Soups </h2>
        </SwiperSlide>
        <SwiperSlide>
          <img className='w-full' src="https://i.ibb.co.com/Fbm0XVD/slide2.jpg" alt="" />
          <h2 className="text-4xl -mt-20 uppercase text-center text-white"> Tameto </h2>
        </SwiperSlide>
        <SwiperSlide>
          <img className='w-full' src="https://i.ibb.co.com/Lxb2fpw/slide1.jpg" alt="" />
          <h2 className="text-4xl -mt-20 uppercase text-center text-white"> Salad </h2>
        </SwiperSlide>
        <SwiperSlide>
          <img className='w-full' src="https://i.ibb.co.com/PzrHMXj/slide4.jpg" alt="" />
          <h2 className="text-4xl -mt-20 uppercase text-center text-white"> Cake </h2>
        </SwiperSlide>
        <SwiperSlide>
          <img className='w-full' src="https://i.ibb.co.com/GCcY4pD/slide3.jpg" alt="" />
          <h2 className="text-4xl -mt-20 uppercase text-center text-white"> Soups </h2>
        </SwiperSlide>
        <SwiperSlide>
          <img className='w-full' src="https://i.ibb.co.com/Fbm0XVD/slide2.jpg" alt="" />
          <h2 className="text-4xl -mt-20 uppercase text-center text-white"> Tameto </h2>
        </SwiperSlide>
      </SwiperComponent>
    </section>
  );
};

export default Category;