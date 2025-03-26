import "./Intro.scss"
import { products } from "../data/products";
import { useEffect, useRef } from "react";
import gsap from "gsap";

export function Intro() {
  const cursorRef = useRef(null);
  const galleryRef = useRef(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    const gallery = galleryRef.current;
    const radius = 1000;
    const numberOfItems = products.length * 2;
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    const angleIncrement = (2 * Math.PI) / numberOfItems;

    products.forEach((product, i) => {
      const item = document.createElement("div");
      item.className = "item";
      const p = document.createElement("p");
      const count = document.createElement("span");
      p.textContent = product.name;
      // count.textContent = `(${Math.floor(Math.random() * 50) + 1})`;
      item.appendChild(p);
      p.appendChild(count);
      gallery.appendChild(item);

      const angle = i * angleIncrement;
      const x = centerX + radius * Math.cos(angle);
      const y = centerY + radius * Math.sin(angle);
      const rotation = (angle * 180) / Math.PI;

      gsap.set(item, {
        x: x + "px",
        y: y + "px",
        rotation: rotation,
      })

      item.addEventListener("mouseover", function () {
        const imgSrc = product.url;
        const img = document.createElement("img");
        img.src = imgSrc;
        img.style.clipPath = "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)";
        cursor.appendChild(img);

        gsap.to(img, {
          clipPath: "polygon(0% 100%, 100% 100%, 100% 0%, 0% 0%)",
          duration: 1,
          ease: "power3.out",
        });
      })

      item.addEventListener("mouseout", function () {
        const imgs = cursor.getElementsByTagName("img");
        if (imgs.length) {
          const lastImg = imgs[imgs.length - 1];
          Array.from(imgs).forEach((img, index) => {
            if (img !== lastImg) {
              gsap.to(img, {
                clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
                duration: 1,
                ease: "power3.out",
                onComplete: () => {
                  setTimeout(() => {
                    img.remove();
                  }, 1000);
                },
              });
            }
          });

          gsap.to(lastImg, {
            clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
            duration: 1,
            ease: "power3.out",
            delay: 0.25,
          });
        }
      });
    });

    function updatePosition() {
      const scrollAmount = window.scrollY * 0.001;
      const items = gallery.getElementsByClassName("item");
      Array.from(items).forEach((item, index) => {
        const angle = index * angleIncrement + scrollAmount;
        const x = centerX + radius * Math.cos(angle);
        const y = centerY + radius * Math.sin(angle);
        const rotation = (angle * 180) / Math.PI;

        gsap.to(item, {
          duration: 1,
          x: x + "px",
          y: y + "px",
          rotation: rotation,
          ease: "elastic.out(1, 10)",
        });
      });
    }

    updatePosition();
    document.addEventListener("scroll", updatePosition);

    document.addEventListener("mousemove", function (e) {
      gsap.to(cursor, {
        x: e.clientX - 150,
        y: e.clientY - 200,
        duration: 1,
        ease: "power3.out"
      })
    })

    return () => {
      document.removeEventListener("scroll", updatePosition);
      document.removeEventListener("mousemove", updatePosition);
    };
  }, []);

  return (
    <div id="Intro">
      <div ref={cursorRef} className="cursor"></div>
      <div className="container">
        <div ref={galleryRef} className="gallery"></div>
      </div>
    </div>
  );
}

export function Cursor() {
  return <div className="curso" />
}

export function Container() {
  return <div className="container" />
}