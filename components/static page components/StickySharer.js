import React, { useEffect } from 'react'

const StickySharer = ({url}) => {
  useEffect(() => {
    return () => {
      
    }
  }, [url])
  
  // function getUrl(){
  //   if (typeof window !== "undefined") {
  //     console.log(window?.location?.href);
  //     return window?.location?.href 
  //   }
  // }
  return (
    <div className='sticky_sharer_bar'>
      <h5>Share</h5>
      <ul>
        <li>
          <a href={`https://www.facebook.com/sharer/sharer.php?u=${url}`} target={'_blank'}>
            <img src="/facebook.png" alt="facebook" />
            <span>Facebook</span>
          </a>
        </li>
        <li>
          <a href={`https://twitter.com/intent/tweet?url=${url}`} target={'_blank'}>
            <img src="/twitter.png" alt="linkedin" />
            <span>Twitter</span>
          </a>
        </li>
        <li>
          <a href={`https://www.linkedin.com/shareArticle?mini=true&url=${url}`} target={'_blank'}>
            <img src="/linkedin.png" alt="linkedin" />
            <span>Linbked in</span>
          </a>
        </li>
      </ul>
    </div>
  )
}

export default StickySharer;