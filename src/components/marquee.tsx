import { useEffect, useRef } from "react"
import gsap from "gsap";
import "../styles/global.css"


export default function Marquee() {
  const marqueeRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(".marquee-track", {
        xPercent: -50,
        duration: 15,
        ease: "none",
        repeat: -1
      });
    }, marqueeRef);

    return () => ctx.revert();
  }, [])
  return (
    <div ref={marqueeRef} className="py-8 border-y bg-[#E8E4DE] overflow-hidden text-nowrap">
      <div
        className="marquee-track flex whitespace-nowrap w-max"
      >
        <span className="text-4xl md:text-7xl font-primary font-thin text-nowrap mx-4 md:mx-8">DAILY ELEGANCE ✦ SIGNATURE SCENTS ✦ PURE AROMAS ✦</span>
        <span className="text-4xl md:text-7xl font-primary font-thin text-nowrap">DAILY ELEGANCE ✦ SIGNATURE SCENTS ✦ PURE AROMAS ✦</span>
      </div>
    </div>
  )
}
