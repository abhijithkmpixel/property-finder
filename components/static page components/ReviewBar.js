import React, { useState } from 'react'

const ReviewBar = () => {
  const [rating, setrating] = useState(null);

  function handleRating(e){
    var btns = document.querySelectorAll('.radio_btn');
    btns.forEach(btn=> btn.checked = false)
    setrating(e.target.value)
    var n = e.target.value;
    btns.forEach((btn,index)=>{
      if(btn.value <= e.target.value){
        btn.checked =true
      }
    })

  }
  function submitHandler(e){
    e.preventDefault()
  }
  return (
    <div className='rating_n_review'>
      <h4>Are you liking Find Homes?</h4>
      <p>Give us a rating.</p>
      <fieldset className='rating'>
          <input type="radio" className='radio_btn' name={'rating1'} id='rate-1' value={1} onClick={(e)=>handleRating(e)} />
        <label htmlFor="rate-1">
        </label>
          <input type="radio" className='radio_btn' name={'rating2'} id='rate-2' value={2} onClick={(e)=>handleRating(e)}/>
        <label htmlFor="rate-2">
        </label>
          <input type="radio" className='radio_btn' name={'rating3'} id='rate-3' value={3} onClick={(e)=>handleRating(e)}/>
        <label htmlFor="rate-3">
        </label>
          <input type="radio" className='radio_btn' name={'rating4'} id='rate-4' value={4} onClick={(e)=>handleRating(e)}/>
        <label htmlFor="rate-4">
        </label>
          <input type="radio" className='radio_btn' name={'rating5'} id='rate-5' value={5} onClick={(e)=>handleRating(e)}/>
        <label htmlFor="rate-5">
        </label>
      </fieldset>
      <form onSubmit={(e)=>submitHandler(e)}>
      <fieldset>
        <label htmlFor="review">Write a review</label>
        {/* <input type="text" id='review' /> */}
        <textarea name="review" id="review" cols="30" rows="4" required></textarea>
      </fieldset>
      <button type='submit' className="btn btn-danger w-100">Submit</button>

      </form>
    </div>
  )
}

export default ReviewBar;