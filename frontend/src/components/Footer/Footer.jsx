import React from "react"
import "./Footer.css"
import {images} from '../../constants'

const Footer = () => {
  return (
    <>
      <footer>
        <div className='container'>
          <div className='box logo'>
            <img src={images.tech1} alt='' />
            <p>Olean Project</p>
            <i className='fa fa-envelope'></i>
            <span>Schoolresearch@gmail.com </span> <br />
            <i className='fa fa-headphones'></i>
            <span> </span>
          </div>
          <div className='box'>
            <h3>EDUCATION</h3>
            <div className='item'>
              <img src={images.hero1} alt='' />
              <p>Get Articles and papers on education</p>
            </div>
            <div className='item'>
              <img src={images.hero2} alt='' />
              <p>Check out our categories</p>
            </div>
          </div>
          <div className='box'>
            <h3>POLITICS</h3>
            <div className='item'>
              <img src={images.hero3} alt='' />
              <p>International and National</p>
            </div>
            <div className='item'>
              <img src={images.hero4} alt='' />
              <p>FREE DOWNLOAD</p>
            </div>
          </div>
          <div className='box'>
            <h3>BLOG</h3>
            {/*<i className='fa fa-chevron-right'></i>*/}
            <ul>
              <li>
                <span>Boxing</span> <label>(5)</label>
              </li>
              <li>
                <span>Fashion</span> <label>(6)</label>
              </li>
              <li>
                <span>Health</span> <label>(7)</label>
              </li>
              <li>
                <span>Nature</span> <label>(9)</label>
              </li>
            </ul>
          </div>
        </div>
      </footer>
      <div className='legal  '>
        <div className='container flexSB'>
          <p>© all rights reserved</p>
          <p>
            made by klaus
          </p>
        </div>
      </div>
    </>
  )
}

export default Footer
