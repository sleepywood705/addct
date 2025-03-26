import "./Shortcut.scss"
import { Link } from "react-router-dom"


export function Shortcut() {
  return (
    <section id="Shortcut">
      <Link to="/all?filter=liquid" />
      <Link to="/all?filter=solid" />
      <Link to="/note">
        <span>Fragrance Number</span>
        <h1>조향 노트</h1>
        <p>
          에이딕트 향수는 패키지에 주원료를 표기하여
          <br />직관적으로 향을 이해할 수 있습니다.
        </p>
      </Link>
      <a href="https://pf.kakao.com/_xjSBxkj" target="_blank" />
    </section>
  )
}