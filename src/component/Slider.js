import "./Slider.scss"
import { products } from '../data/products';
import { useState, useRef } from 'react';
import { useNavigate } from "react-router-dom";


export function Slider() {
  const navigate = useNavigate();
  const sliderRef = useRef(null);
  const selectedProductIds = [1, 3, 7, 8, 13, 14, 15];
  const [isAnimating, setIsAnimating] = useState(false);

  const handleClickLeft = () => {
    if (isAnimating) return;
    setIsAnimating(true);

    const slider = sliderRef.current;
    const slideWidth = slider.firstElementChild.clientWidth;
    const lastItem = slider.lastElementChild;

    slider.style.transform = `translateX(-${slideWidth}px)`;
    slider.style.transition = 'none';
    slider.insertBefore(lastItem, slider.firstElementChild);

    setTimeout(() => {
      slider.style.transform = 'translateX(0)';
      slider.style.transition = 'transform 1s ease';
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
    slider.style.transition = 'transform 1s ease';

    setTimeout(() => {
      slider.appendChild(firstItem);
      slider.style.transform = 'translateX(0)';
      slider.style.transition = 'none';
    }, 1000);

    setTimeout(() => {
      setIsAnimating(false);
    }, 1000);
  };

  return (
    <div id="Slider">
      <h2 className="title">BEST</h2>
      <div className="container">
        <div className="fixer" ref={sliderRef}>
          {selectedProductIds.map(id => (
            <Slide 
              key={id} 
              product={products.find(product => product.id === id)}
              onClick={() => navigate(`/detail?id=${products.find(product => product.id === id).id}`)}
            />
          ))}
        </div>
        <div className="wrap_button">
          <button className="left" onClick={handleClickLeft}>
            <i className="bi bi-arrow-left"></i>
          </button>
          <button className="right" onClick={handleClickRight}>
            <i className="bi bi-arrow-right"></i>
          </button>
        </div>
      </div>
    </div>
  )
}


export function Slide({ product, onClick }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className="product slide"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => onClick(product)}
    >
      <div className="top">
        {isHovered ? (
          <img src={product.img[1]} alt="hover-img" />
        ) : (
          <img src={product.img[0]} alt="cover-img" />
        )}
      </div>
      <div className="bot">
        <h3 className="name">{product.name[0]}</h3>
        <p className="feeling">{product.feeling}</p>  
        {/* <ul className="note">
          {product.note.map((note, index) => (
            <li className="fragrance" key={index}>{note}</li>
          ))}
        </ul> */}
        <div className="wrap">
          <span className="volume">{product.volume}</span>
          <span className="price"><del>{product.cost}</del></span>
          <span className="dc">{product.dc}</span>
        </div>
      </div>
    </div>
  )
}