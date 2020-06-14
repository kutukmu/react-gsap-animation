import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap"

import Chicago from "../images/dallas.webp"
import Austin from "../images/austin.webp"
import Dallas from "../images/newyork.webp"
import Newyork from "../images/beijing.webp"
import Sanfrancisco from "../images/sanfrancisco.webp"


const Hamburger = ({ state }) => {

  let menu = useRef(null)
  let revealMenu = useRef(null);
  let revealMenuBackground = useRef(null);
  let cityBackground = useRef(null);
  let line1 = useRef(null);
  let line2 = useRef(null);
  let line3 = useRef(null);
  let info = useRef(null);

  const cityarray = [
    { name: "Chicago", url: Chicago },
    { name: "Austin", url: Austin },
    { name: "Dallas", url: Dallas },
    { name: "New York", url: Newyork },
    { name: "Sanfrancisco", url: Sanfrancisco },
  ]


  useEffect(() => {
    if (!state.isOpen) {
      gsap.to(menu, {
        duration: 0.8,
        css: {
          display: "none"
        }
      })
      gsap.to([revealMenu, revealMenuBackground], {
        duration: 0.8,
        height: 0,
        stagger: {
          amount: 0.07
        }
      })



    } else if (state.isOpen) {
      gsap.to(menu, {
        duration: 0,
        css: {
          display: "block"
        }
      })

      gsap.to([revealMenuBackground, revealMenu], {
        duration: 0,
        height: "100%",

      })


      tiltedReveal(revealMenuBackground, revealMenu)
      fadeInUp(info)
      LinkReveal(line1, line2, line3)
    }
  }, [state])

  const tiltedReveal = (node1, node2) => {

    gsap.from([node1, node2], {
      duration: 0.6,
      height: 0,
      transfromOrigin: "top right",
      skewY: 2,
      ease: "power3.inOut",
      stagger: {
        amount: 0.07
      }
    })
  }

  const fadeInUp = (node) => {

    gsap.from(node, {
      duration: 1,
      y: 60,
      opacity: 0,
      delay: 0.2,
      ease: "power3.easeOut"
    })

  }

  const LinkReveal = (node1, node2, node3) => {

    gsap.from([node1, node2, node3], {
      duration: 1,
      y: 135,
      delay: 0.1,
      skewY: 5,
      ease: "power3.inOut",
      stagger: {
        amount: 0.3
      }
    })
  }

  const handleEnter = (cityName) => {


    gsap.to(cityBackground, {
      duration: 0,
      background: `url(${cityName}) center center `

    })

    gsap.to(cityBackground, {
      opacity: 1,
      duration: 0.3
    })

    gsap.from(cityBackground, {
      duration: 0.4,
      transfromOrigin: "top rigth",
      skewY: 2
    })



  }

  const handleRemove = () => {

    gsap.to(cityBackground, {
      duration: 0,
      opacity: 0
    })

  }


  const linkEnter = (line) => {

    gsap.to(line, {
      duration: .3,
      y: 3,
      skewX: 4,
      ease: "power3.inOut"
    })
  }

  const linkExit = (line) => {


    gsap.to(line, {
      duration: .3,
      y: -3,
      skewx: 0,
      ease: "power3.inOut"
    })


  }





  return <div className={`hamburger-menu`} ref={el => (menu = el)}>
    <div className="menu-secondary-background-color" ref={el => (revealMenuBackground = el)}></div>
    <div className="menu-layer" ref={el => (revealMenu = el)}>
      <div className="menu-city-background" ref={el => (cityBackground = el)} ></div>

      <div className="container">
        <div className="wrapper">
          <div className="menu-link">
            <nav>
              <ul>
                <li><Link onMouseLeave={() => linkExit(line1)} onMouseEnter={() => linkEnter(line1)} to="/opportunities" ref={el => (line1 = el)}>Opportunities</Link></li>
                <li><Link onMouseLeave={() => linkExit(line2)} onMouseEnter={() => linkEnter(line2)} to="/solutions" ref={el => (line2 = el)}>Solutions</Link></li>
                <li><Link onMouseLeave={() => linkExit(line3)} onMouseEnter={() => linkEnter(line3)} to="/contact-us" ref={el => (line3 = el)}>Contact-us</Link></li>
              </ul>
            </nav>
            <div className="info" ref={el => (info = el)}>
              <h3>Our Promise</h3>
              <p>It is a long established fact that a reader will
              be distracted by the readable content of a page
              when looking at its layout. The point of using
                like readable English</p>
            </div>
            <div className="locations">
              Location:
                {cityarray.map((el, idx) => {
              return <span key={idx} onMouseEnter={() => handleEnter(el.url)} onMouseLeave={handleRemove} >{el.name}</span>
            })}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>;
};

export default Hamburger;
