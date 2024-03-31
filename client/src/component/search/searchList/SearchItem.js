import { Link, useNavigate } from "react-router-dom";
import "./SearchItem.css";
function SearchItem(props) {
  const item = props.item;
  console.log(item);
  const Navigate = useNavigate();
  const getDetail = () => Navigate(`/detail?id=${item._id}`);
  return (
    <div className="search-item" onClick={getDetail}>
      <div className="search-item__img">
        <img src={item.photos[0]} width="300px" height="310px" />
      </div>
      <div className="search-item__content">
        <div className="item-content__name">
          <strong>{item.name}</strong>
        </div>
        <div className="item-content__distance">{`${item.distance} from center`}</div>
        <div className="item-content__tag">{item.title}</div>
        <div className="item-content__description">
          <p>{item.desc}</p>
        </div>
        <div className="item-content__type">{item.type}</div>
        {item.free_cancel ? (
          <div className="item-content__free">
            <div>Free cancellation</div>
            <div>You can cancel later, so lock in great price today!</div>
          </div>
        ) : (
          ""
        )}
      </div>
      <div className="search-item__price">
        <div className="item-price__rate">
          <div className="item-price__rateText">
            <strong>{item.rate_text}</strong>
          </div>
          <div className="item-price__rateNumber">{item.rate}</div>
        </div>
        <div className="item-price__price">{`$ ${item.cheapestPrice}`}</div>
        <p>Includes taxes and fees</p>
        <div>
          <button className="item-price__btn">See availability</button>
        </div>
      </div>
    </div>
  );
}
export default SearchItem;
