import Swiper from 'swiper';
import FoodCard from '../../components/FoodCard';
import 'swiper/css'
import 'swiper/css/pagination'
import { Pagination } from 'swiper/modules';
import { SwiperSlide } from 'swiper/react';

const OrderTab = ({items}) => {

  const pagination = {
    clickable: true,
    renderBullet: function(index, className) {
      return '<span className"' + className + '">' + (index + 1) + "</span>";
    }
  }

  return (
    <div>
      <Swiper pagination={pagination} modules={[Pagination]}>
        <div className="grid grid-cols-2 md:grid-cols-3">
          <SwiperSlide> 
            { items.map(dessert => 
              <FoodCard 
                item={dessert} 
              ></FoodCard>
            )} 
          </SwiperSlide>
        </div>
      </Swiper>
    </div>
  );
};

export default OrderTab;