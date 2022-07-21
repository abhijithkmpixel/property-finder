import React from 'react'
import Footer from '../../components/Footer'
import HeadTag from '../../components/Head'
import Header from '../../components/Header'

const index = () => {
  return (
    <>
    <HeadTag title={'About Us'} meta='Details about find homes team'/>
    <Header innerpage={true}/>
    <section className='about_us_page'>

    <div className="about-section">
    <div className="inner-container">
      <h1>About Us</h1>
      <p className="text">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus velit ducimus, enim inventore earum, eligendi nostrum pariatur necessitatibus eius dicta a voluptates sit deleniti autem error eos totam nisi neque voluptates sit deleniti autem error eos totam nisi neque.
      </p>
      <div className="skills">
        <span>Property Sales</span>
        <span>Renting</span>
        <span>Commercial services</span>
      </div>
    </div>
  </div>
    </section>
    <Footer/>
    </>
  )
}

export default index