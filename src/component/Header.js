import "./Header.scss";
import { Link } from "react-router-dom";


export function Header() {
  return (
    <header id="Header">
      <nav>
        <Link to="/addct" id="logo">a ddct</Link>
        <Link to="/addct/all?filter=all">제품 보기</Link>
        <Link to="/addct/all?filter=best">베스트 셀러</Link>
        <Link to="/addct/brand">브랜드</Link>
        <Link to="/addct/note">조향 노트</Link>
        <Link to="/addct/storelist">매장 보기</Link>
      </nav>
      <div className="utils">
        <button className="search">검색</button>
        <button>장바구니</button>
        <button>회원</button>
      </div>
    </header>
  )
}