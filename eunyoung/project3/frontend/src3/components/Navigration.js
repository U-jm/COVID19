// import React from 'react';
// import "./navigation.css";
// import { useState, useEffect } from "react";
// import NavItem from "./NavItem";
// import { useNavigate } from 'react-router-dom';

// function Navigation() {
//   const [menuToggle, setMenuToggle] = useState(false);
//   const [scrolled, setScrolled] = useState(false);
//   const menu = [
//     { address: "/", src:"logo.png" },
//     { name: "로그인", address: "/login" },
//     { name: "회원가입", address: "/signup" }, 
//     <br/>
//   ];

//   const navigate = useNavigate();
  
//   const redirectToMain = () => {
//     // React Router의 navigate 함수를 사용하여 이동
//     navigate('/aq');
//   }

//   useEffect(() => {
//     const handleScroll = () => {
//       const menuVisible = document.querySelector('.menu__box__visible');
//       if (menuVisible) {
//         if (window.scrollY > 76) {
//           setScrolled(true);
//           menuVisible.style.top = '0';
//         } else {
//           setScrolled(false);
//           menuVisible.style.top = '76px';
//         }
//       }
//     };
//     window.addEventListener('scroll', handleScroll);
//     return () => {
//       window.removeEventListener('scroll', handleScroll);
//     };
//   }, []); 
  
//     return ( 
//       <nav className={`navigation__wrapper ${scrolled ? 'scrolled' : ''}`}>
//       <div
//         className={!menuToggle ? "burger__menu" : "x__menu"}
//         onClick={() =>
//           menuToggle ? setMenuToggle(false) : setMenuToggle(true)
//         }
//       >
//         <div className="burger_line1"></div>
//         <div className="burger_line2"></div>
//         <div className="burger_line3"></div>
//       </div>

//       <div
//         className={[
//           "menu__box",
//           !menuToggle ? "menu__box__hidden" : "menu__box__visible",
//         ].join(" ")}
//       >
//         <div className="menu__list">
//           {menu.map((data ,idx) => (
//             <NavItem
//               data={data}
//               address={data.address}
//               key={idx}
//               src={data.src}
//               offNav={() => setMenuToggle(false)}
//             />
//           ))}
//         </div>
//       </div>
//     </nav>
//   );
// }

// export default Navigation;