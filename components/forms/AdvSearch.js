import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";

const AdvSearch = ({ locs }) => {
  const router = useRouter();
  const [price, setprice] = useState(false);
  const [propSize, setpropSize] = useState(false);
  const [searchPlace, setsearchPlace] = useState(false);
  const [valueEmpty, setvalueEmpty] = useState(true);
  const [filterSerch, setfilterSerch] = useState();
  const [moreFilter, setmoreFilter] = useState(false);
  const [minarea, setminarea] = useState();
  const [maxarea, setmaxarea] = useState();
  useEffect(() => {
    setfilterSerch(locs);

    return () => {};
  }, []);

  const updateField = (e, value) => {
    e.stopPropagation()
    e.target.closest(".field_dropdown").querySelector("span").innerText = value;
    e.target.closest(".field_dropdown").querySelector("input").value = value;
  };

  const chengeFilter = (e) => {
    e.target.value == "" ? setvalueEmpty(true) : setvalueEmpty(false);
    setfilterSerch(
      locs.filter((a) => a.toLowerCase().includes(e.target.value.toLowerCase()))
    );
  };

  function resetForm(){
    document.getElementById('bedroom').selectedIndex = 0; 
    document.getElementById('bathroom').selectedIndex = 0; 
    document.getElementById('type').selectedIndex = 0; 
    document.getElementById('property_type').selectedIndex = 0; 
    document.getElementById('location').value = ''; 

  }

  return (
    <form
      className="rent_or_buuy_form_wrp"
      autoComplete="off"
      // action="/search"
      onSubmit={(e) => {
        e.preventDefault();
        setprice(false);
        setpropSize(false);

        router.push(
          `/search?type=${e.target.type.value}&` +
            (e.target.property_type.value &&
              `property_type=${e.target.property_type.value}&`) +
            (e.target.min_area.value &&
              `min_area=${e.target.min_area.value}&`) +
            (e.target.max_area.value &&
              `max_area=${e.target.max_area.value}&`) +
            (e.target.min_rent.value &&
              `min_rent=${e.target.min_rent.value}&`) +
            (e.target.max_rent.value &&
              `max_rent=${e.target.max_rent.value}&`) +
            (e.target.location.value &&
              `location=${e.target.location.value}&`) +
            (e.target.bedroom.value && `bed=${e.target.bedroom.value}&`) +
            (e.target.bathroom.value && `bath=${e.target.bathroom.value}&`) +
            (e.target.rent_duration.value &&
              `rent_duration=${e.target.rent_duration.value}`)
        );
      }}
    >
      <fieldset>
        <div className="form_row">
          <div
            className="search_place"
            onClick={(e) => {
              setsearchPlace(  true);
              setpropSize(false);
              setprice(false);
              e.target.querySelector("input").focus();
            }}
            onBlur={()=>{
              // setsearchPlace( false);

            }}
          >
            <div className="search_icon">
              <img src="/search.svg" alt="search icon" />
            </div>
            <div className={`field_dropdown ${searchPlace ? "open" : ""} `}>
              <span className="hidden"></span>
              <input
                type="text"
                name="location"
                id="location"
                placeholder="Search place"
                onChange={(e) => chengeFilter(e)}
                autoComplete="off"
              />
              {valueEmpty ? (
                <ul className="list_drop">
                  {locs?.map((l, index) => {
                    return (
                      <li
                        key={index}
                        data-value={l}
                        onClick={(e) => {
                          updateField(e, e.target.getAttribute("data-value"));
                          setsearchPlace(false);
                        }}
                      >
                        <img src="/geo-alt.svg" alt="location icon" />
                        {l}
                      </li>
                    );
                  })}
                </ul>
              ) : (
                <ul className="list_drop">
                  {filterSerch?.map((l, index) => {
                    return (
                      <li
                        key={index}
                        data-value={l}
                        onClick={(e) => {
                          updateField(e, e.target.getAttribute("data-value"));
                          setsearchPlace(false);
                        }}
                      >
                        <img src="/geo-alt.svg" alt="location icon" />
                        {l}
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>
          </div>
          <div className={`field_dropdown  `}>
            <select name="type" id="type">
              <option value="all">Select service</option>
              <option value="sale">Sale</option>
              <option value="rent">rent</option>
              <option value="commercial-sale">commercial sale</option>
              <option value="commercial-rent">commercial rent</option>
            </select>
          </div>
          <div className={`field_dropdown `}>
            <select name="property_type" id="property_type">
              <option value="" selected disabled>
                Property type
              </option>
              <option value="office space">Office Space</option>
              <option value="retail">Retail</option>
              <option value="warehouse">warehouse</option>
              <option value="shop">shop</option>
              <option value="villa">villa</option>
              <option value="show room">show room</option>
              <option value="whole building">whole building</option>
              <option value="land">land</option>
              <option value="farm">farm</option>
              <option value="bulk rent unit">bulk rent unit</option>
              <option value="staff accommodation">staff accomm</option>
              <option value="business centre">business centre</option>
              <option value="factory">factory</option>
            </select>
          </div>
      
          <button type="submit" className="btn btn-danger">
            Find property
          </button>
        </div>
        <div className={`more_filter_opt ${moreFilter ? "" : "hidden"}`}>
        <div
            className={`field_dropdown input_box_drpdwn ${
              propSize ? "open" : ""
            } `}
            onClick={() => {
              setpropSize(true);
              setprice(false);
            }}
          >
            <span>
              {minarea ? "from " + minarea + "sq.ft. " : "Area Sq.Ft."}
              {maxarea && "to " + maxarea + "sq.ft."}
            </span>
            <div className="drp_icon">
              <img src="/chevron-down.svg" alt="arrow" />
            </div>
            <div className="drop_box">
              <div className="row_field">
                <div className="input_fields">
                  <label htmlFor="min_area">Min Area (sq.ft)</label>
                  <input
                    type="text"
                    name="min_area"
                    id="min_area"
                    onChange={(e) => setminarea(e.target.value)}
                  />
                </div>
                <div className="input_fields">
                  <label htmlFor="max_area">Max Area (sq.ft)</label>
                  <input
                    type="text"
                    name="max_area"
                    id="max_area"
                    onChange={(e) => setmaxarea(e.target.value)}
                  />
                </div>
              </div>
              <span
                className="btn btn-danger m-2"
                onClick={(e) => {
                  document.getElementById("max_area").value = "";
                  document.getElementById("min_area").value = "";
                  setminarea("");
                  setmaxarea("");
                  // setpropSize(false)
                }}
              >
                Reset
              </span>
              <span
                className="btn btn-danger  m-2"
                onClick={(e) => {
                  e.stopPropagation();
                  setpropSize(false);
                }}
              >
                Close
              </span>
            </div>
          </div>

          <div
            className={`field_dropdown input_box_drpdwn ${price ? "open" : ""}`}
            onClick={() => {
              setprice(true);
              setpropSize(false);
            }}
          >
            <span>Price</span>
            <div className="drp_icon">
              <img src="/chevron-down.svg" alt="arrow" />
            </div>
            <div className="drop_box">
              <div className="row_field">
                <div className="input_fields">
                  <label htmlFor="min_rent">Min rent (AED)</label>
                  <input type="text" name="min_rent" id="min_rent" />
                </div>
                <div className="input_fields">
                  <label htmlFor="max_rent">Max rent (AED)</label>
                  <input type="text" name="max_rent" id="max_rent" />
                </div>
              </div>
              <h5>Rental period</h5>
              <div className="row_field m-0">
                <div className="options">
                  <fieldset>
                    <input
                      type="radio"
                      name="rent_duration"
                      id="yearly"
                      value="y"
                    />
                    <label htmlFor="yearly">Yearly</label>
                  </fieldset>
                  <fieldset>
                    <input
                      type="radio"
                      name="rent_duration"
                      id="monthly"
                      value="m"
                    />
                    <label htmlFor="monthly">Monthly</label>
                  </fieldset>
                </div>
              </div>
              <span
                className="btn btn-danger m-2"
                onClick={(e) => {
                  document.getElementById("min_rent").value = "";
                  document.getElementById("max_rent").value = "";
                  document.getElementById("yearly").checked = false;
                  document.getElementById("monthly").checked = false;
                  // setmaxarea('');
                }}
              >
                Reset
              </span>
              <span
                className="btn btn-danger  m-2"
                onClick={(e) => {
                  e.stopPropagation();
                  setprice(false);
                }}
              >
                Close
              </span>
            </div>
          </div>
          <div className={`field_dropdown `}>
            <select name="bedroom" id="bedroom">
              <option value="" selected>
                Bedroom
              </option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value=">7">More than 7</option>
            </select>
          </div>
          <div className={`field_dropdown `}>
            <select name="bathroom" id="bathroom">
              <option value="" selected>
                Bathroom
              </option>
              <input type="text" />
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value=">7">More than 7</option>
            </select>
          </div>
        </div>
        <div className="d-flex justify-content-end">
          <span
            className="btn btn-outline-danger show_nore mt-2"
            onClick={() => setmoreFilter(moreFilter == true ? false : true)}
          >
            Show more filter
          </span>
          <span onClick={(e)=>{
            resetForm()
            
          }}
           className='btn btn-warning'>reset</span>
        </div>
      </fieldset>
    </form>
  );
};

export default AdvSearch;
