import UnicornScene from "unicornstudio-react";
import "./Hero.css";

export default function Hero() {
  const scenePath = import.meta.env.BASE_URL + "scene.json";

  return (
    <div className="hero" id="hero">
      <UnicornScene
        jsonFilePath={scenePath}
        width="100%"
        height="900px"
        scale={1}
        dpi={1.5}
        sdkUrl="https://cdn.jsdelivr.net/gh/hiunicornstudio/unicornstudio.js@2.1.3/dist/unicornStudio.umd.js"
      />
      <div className="content">
        <div className="buttn">
          <a href="#contact">START A PROJECT</a>
          <a href="#projects">EXPLORE OUR WORK</a>
        </div>
      </div>
    </div>
  );
}