import "./Banner.scss"
import { useEffect, useRef } from "react"
import gsap from "gsap"

export function Banner() {
  const bannerRef = useRef(null);
  const currentIndex = useRef(0);

  const changeBanner = (index) => {
    const images = bannerRef.current.querySelectorAll('img');
    const buttons = bannerRef.current.querySelectorAll('button');
    
    gsap.to(images[currentIndex.current], {
      opacity: 0,
      duration: 0.1,
      ease: "power2.inOut"
    });
    
    gsap.to(images[index], {
      opacity: 1,
      duration: 0.1,
      ease: "power2.inOut"
    });

    buttons[currentIndex.current].classList.remove('active');
    buttons[index].classList.add('active');

    currentIndex.current = index;
  };

  useEffect(() => {
    const images = bannerRef.current.querySelectorAll('img');
    const buttons = bannerRef.current.querySelectorAll('button');
    
    gsap.set(images, { opacity: 0 });
    gsap.set(images[0], { opacity: 1 });
    buttons[0].classList.add('active');

    const interval = setInterval(() => {
      const nextIndex = (currentIndex.current + 1) % images.length;
      changeBanner(nextIndex);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section id="Banner" ref={bannerRef}>
      <img src="https://buly.kr/7bGXA2J" />
      <img src="https://buly.kr/E78ZSDN" />
      <img src="https://buly.kr/CWtkcqb" />
      <div className="pagination">
        <button onClick={() => changeBanner(0)}>1</button>        
        <button onClick={() => changeBanner(1)}>2</button>        
        <button onClick={() => changeBanner(2)}>3</button>        
      </div>
    </section>
  )
}