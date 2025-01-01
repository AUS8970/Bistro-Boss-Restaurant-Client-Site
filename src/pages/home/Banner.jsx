import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';

const Banner = () => {
  return (
    <div>
      <Carousel 
      // showArrows={true} onChange={onchange} onClickItem={onClickItem} onClickThumb={onClickThumb}
      >
        <div>
          <img src="https://i.ibb.co.com/YhY2RZg/03.png" />
        </div>
        <div>
          <img src="https://i.ibb.co.com/6BxvGQp/02.jpg" />
        </div>
        <div>
          <img src="https://i.ibb.co.com/x74f6Nq/04.jpg" />
        </div>
        <div>
          <img src="https://i.ibb.co.com/hcRPwQf/05.png" />
        </div>
        <div>
          <img src="https://i.ibb.co.com/qF7FZYs/06.png" />
        </div>
      </Carousel>
    </div>
  )
}

export default Banner;