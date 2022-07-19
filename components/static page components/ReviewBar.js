import React from 'react'

const ReviewBar = () => {
  function handleRating(e){
    var btns = document.querySelectorAll('.radio_btn');
    btns.forEach(btn=> btn.checked = false)
    console.log(e.target.value);

  }
  return (
    <div className='rating_n_review'>
      <h4>Are you liking Find Homes?</h4>
      <p>Give us a rating.</p>
      <fieldset className='rating'>
          <input type="radio" className='radio_btn' name={'rating'} id='rate-1' value={1} onClick={(e)=>handleRating(e)} />
        <label htmlFor="rate-1">
        </label>
          <input type="radio" className='radio_btn' name={'rating'} id='rate-2' value={2} onClick={(e)=>handleRating(e)}/>
        <label htmlFor="rate-2">
        </label>
          <input type="radio" className='radio_btn' name={'rating'} id='rate-3' value={3} onClick={(e)=>handleRating(e)}/>
        <label htmlFor="rate-3">
        </label>
          <input type="radio" className='radio_btn' name={'rating'} id='rate-4' value={4} onClick={(e)=>handleRating(e)}/>
        <label htmlFor="rate-4">
        </label>
          <input type="radio" className='radio_btn' name={'rating'} id='rate-5' value={5} onClick={(e)=>handleRating(e)}/>
        <label htmlFor="rate-5">
        </label>
      </fieldset>
      <fieldset>
        <label htmlFor="review">Write a review</label>
        <input type="text" id='review' />
      </fieldset>
    </div>
  )
}

export default ReviewBar;