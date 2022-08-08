import React, { useEffect, useState } from "react";

const StickySharer = ({ url }) => {
  const [msg, setmsg] = useState(false);
  useEffect(() => {
    return () => {};
  }, [url, msg]);

  function clickHandle(e) {
    navigator.clipboard.writeText(window.location.href);
    e.target.setAttribute('title','Copied')
    setmsg(true);
    setTimeout(() => {
      setmsg(false);
    e.target.setAttribute('title','Copy link')

    }, 3000);
  }
  return (
    <>
      <div className="sticky_sharer_bar">
        <h5>Share</h5>
        <ul>
          <li title="Share to facebook">
            <a
              href={`https://www.facebook.com/sharer/sharer.php?u=${url}`}
              target={"_blank"}
            >
              <img src="/facebook.png" alt="facebook" />
              <span>Facebook</span>
            </a>
          </li>
          <li title="Share to twitter">
            <a
              href={`https://twitter.com/intent/tweet?url=${url}`}
              target={"_blank"}
            >
              <img src="/twitter.png" alt="linkedin" />
              <span>Twitter</span>
            </a>
          </li>
          {/* <li>
          <a href={`https://www.linkedin.com/shareArticle?mini=true&url=${url}`} target={'_blank'}>
            <img src="/linkedin.png" alt="linkedin" />
            <span>Linbked in</span>
          </a>
        </li> */}
          <li  >
            <a>
              <img
                src="/copy.png"
                title="Copy link"
                onClick={(e) => {
                  clickHandle(e);
                }}
                alt="linkedin"
              />
              <span>Linbked in</span>
            </a>
          </li>
        </ul>
      </div>
      {/* {msg && (
        <div
          className="position-fixed bottom-0 end-0  bg-light"
          style={{ zIndex: 11, boxShadow: "0 0 10px 1px rgba(0,0,0,0.5)" }}
        >
          <div
            id="liveToast"
            className="toast show "
            role="alert"
            aria-live="assertive"
            aria-atomic="true"
          >
            <div className="toast-body fs-4 text-success">
              Link copied successfully!.
            </div>
          </div>
        </div>
      )} */}
    </>
  );
};

export default StickySharer;
