import "./Note.scss"
import { Product } from "./All"
import { products } from "../data/products"
import { fragrances } from "../data/fragrances"
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom";
import { gsap } from "gsap"


export function Note() {
  const navigate = useNavigate();
  const [openMadal, setOpenMadal] = useState(false)
  const [selectedFragrance, setSelectedFragrance] = useState(null)

  const toggleModal = (fragrance) => {
    if (openMadal) {
      gsap.to(".modal", { opacity: 0, scale: 0, duration: 0.5, onComplete: () => {
        setOpenMadal(false);
      }});
    } else {
      setSelectedFragrance(fragrance);
      setOpenMadal(true);
    }
  }

  useEffect(() => {
    if (openMadal) {
      gsap.fromTo(".modal", 
      { opacity: 0, scale: 0 }, 
      { opacity: 1, scale: 1 });
    }
  }, [openMadal]);

  return (
    <section id="Note">
      <div className="banner">
        <span>Fragrance Number</span>
        <h1>조향 노트</h1>
        <p>
          에이딕트 향수는 패키지에 주원료를 표기하여
          <br />직관적으로 향을 이해할 수 있습니다.
        </p>
      </div>
      <div className="container">
        {fragrances.map((fragrance, index) => (
          <div className="row" key={index}>
            <div className="left">
              <span>{fragrance.note}</span>
            </div>
            <div className="middle">
              <ul className="fragrance">
                {fragrance.fragrance.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
              <button onClick={() => toggleModal(fragrance.filter)}>
                <i className="bi bi-box-arrow-down-left" />
              </button>
            </div>
            <div 
              className="right"
              style={{background: `url(${fragrance.modal}) center 3%/cover no-repeat, #fff`}}
            />
          </div>
        ))}
      </div>
      {openMadal && (
        <div className="modal">
          <button className="close" onClick={toggleModal}>
            <i className="bi bi-box-arrow-in-up-right" />
          </button>
            {products.filter(product => product.filter === selectedFragrance).map(product => (
              <Product 
                key={product.id} 
                product={product} 
                index={product.id}
                onClick={() => navigate(`/detail?id=${product.id}`)}
              />
            ))}
        </div>
      )}
    </section>
  )
}