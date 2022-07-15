import Link from 'next/link'
import React from 'react'

const ShowYourListing = () => {
  return (
    <div className="add_your_own_listing">
    <div className="own_listing_top">
      <p>Want to have your property listed here?</p>
      <p>Now you can with 3 easy steps:</p>
      <ol type='1'>
        <li>Register</li>
        <li>Add your properties</li>
        <li>Get verified</li>
      </ol>
    </div>
    <Link href="/auth/broker/register">
      <a className="btn btn-danger fs-3 rounded-pill">
        Get Started
      </a>
    </Link>
  </div>
  )
}

export default ShowYourListing