import { Banner } from "../component/Banner"
import { Slider } from "../component/Slider"
import { Shortcut } from "../component/Shortcut"


export function Home() {
  return (
    <div id="Home">
      <Banner />
      <Slider />
      <Shortcut />
    </div>
  )
}