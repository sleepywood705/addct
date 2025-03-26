import "./Detail.scss"
import { products } from "../data/products.js";
import { useState, useRef } from "react";
import { useLocation } from "react-router-dom";


export function Detail() {
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const productId = query.get("id");
  const product = products.find(p => p.id === parseInt(productId));

  const sliderRef = useRef(null);
  const [isAnimating, setIsAnimating] = useState(false);

  const handleClickLeft = () => {
    if (isAnimating) return;
    setIsAnimating(true);

    const slider = sliderRef.current;
    const slideWidth = slider.firstElementChild.clientWidth;
    const lastItem = slider.lastElementChild;

    slider.style.transform = `translateX(-${slideWidth}px)`;
    slider.style.transition = "none";
    slider.insertBefore(lastItem, slider.firstElementChild);

    setTimeout(() => {
      slider.style.transform = "translateX(0)";
      slider.style.transition = "transform 1s ease";
    }, 100);

    setTimeout(() => {
      setIsAnimating(false);
    }, 1000);
  };

  const handleClickRight = () => {
    if (isAnimating) return;
    setIsAnimating(true);

    const slider = sliderRef.current;
    const slideWidth = slider.firstElementChild.clientWidth;
    const firstItem = slider.firstElementChild;

    slider.style.transform = `translateX(-${slideWidth}px)`;
    slider.style.transition = "transform 1s ease";

    setTimeout(() => {
      slider.appendChild(firstItem);
      slider.style.transform = "translateX(0)";
      slider.style.transition = "none";
    }, 1000);

    setTimeout(() => {
      setIsAnimating(false);
    }, 1000);
  };

  return (
    <section id="Detail">
      {product ? (
        <>
          <div className="left">
            <div className="fixer" ref={sliderRef}>
              {product.img.map((imgSrc, index) => (
                <div className="slide" key={index}>
                  <img src={imgSrc} />
                </div>
              ))}
            </div>
            <div className="wrap_button">
              <button className="left" onClick={handleClickLeft}>
                <i className="bi bi-arrow-left" />
              </button>
              <button className="right" onClick={handleClickRight}>
                <i className="bi bi-arrow-right" />
              </button>
            </div>
          </div>
          <div className="right">
            <div className="wrap_title">
              <h1>{product.name[0]}</h1>
              <h4>{product.name[1]}</h4>
            </div>
            <div className="wrap_price">
              <span className="volume">{product.volume}</span>
              <span className="price"><del>{product.cost}</del></span>
              <span className="dc">{product.dc}</span>
            </div>
            <div className="wrap_description">
              <h4 className="feeling">{product.feeling}</h4>
              <p className="description">{product.description}</p>
              <ul className="note">
                {product.note.map((note, index) => (
                  <li key={index}>{note}</li>
                ))}
              </ul>
            </div>
            <div className="wrap_info">
              <div>제품 세부정보</div>
              <div>주문/배송 안내</div>
            </div>
            <div className="wrap_button">
              <button>구매하기</button>
              <button>장바구니 담기</button>
            </div>
          </div>
        </>
      ) : (
        <p>상품을 찾을 수 없습니다.</p>
      )}
    </section>
  )
}