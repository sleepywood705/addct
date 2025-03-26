import "./All.scss"
import { products } from "../data/products.js"
import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";


export function All() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [filter, setFilter] = useState("all");

  const filters = [
    { label: "전체 상품", value: "all" },
    { label: "베스트 상품", value: "best" },
    { label: "오 드 퍼퓸", value: "liquid" },
    { label: "솔리드 퍼퓸", value: "solid" },
    { label: "섬유 탈취제", value: "spray" },
    { label: "기프트", value: "gift" },
  ];

  useEffect(() => {
    const filterParam = searchParams.get("filter");
    if (filterParam) {
      setFilter(filterParam);
    }
  }, [searchParams]);

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
    navigate(`/all?filter=${newFilter}`);
  };

  const filteredProducts = products.filter(product => {
    if (filter === "all") return product.type !== null;
    if (filter === "best") return product.best;
    return product.type === filter;
  });

  return (
    <section id="All">
      <div className="filter">
        {filters.map(({ label, value }) => (
          <button
            key={value}
            className={filter === value ? "active" : ""}
            onClick={() => handleFilterChange(value)}
          >
            {label}
          </button>
        ))}
      </div>
      <div className="container">
        {filteredProducts.map((product, index) => (
          <Product 
            key={product.id}
            product={product} 
            index={index} 
            onClick={() => navigate(`/detail?id=${product.id}`)}
          />
        ))}
      </div>
    </section>
  )
}

export function Product({ product, index, onClick }) {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  return (
    <div
      className="product"
      onMouseEnter={() => setHoveredIndex(index)}
      onMouseLeave={() => setHoveredIndex(null)}
      onClick={() => onClick(product)}
    >
      <div className="top">
        {hoveredIndex === index ? (
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