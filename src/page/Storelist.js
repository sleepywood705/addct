import "./Storelist.scss"
import { storelist } from "../data/storelist.js"


export function Storelist() {
  return (
    <section id="Storelist">
      <div className="left"></div>
      <div className="right">
        {storelist.map((store, index) => (
          <div className="row" key={index}>
            <p>{store.title}</p>
            <div>
              {store.location.map((location, index) => (
                <ul key={index}>
                  <li>{location.name}</li>
                  <li>{location.address}</li>
                  <li>{location.phone}</li>
                </ul>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}