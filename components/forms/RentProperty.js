import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";

const RentProperty = ({ locs }) => {
  const router = useRouter();
  const [propertyType, setpropertyType] = useState(false);
  const [price, setprice] = useState(false);
  const [propSize, setpropSize] = useState(false);
  const [searchPlace, setsearchPlace] = useState(false);
  const [filterSerch, setfilterSerch] = useState();
  const [valueEmpty, setvalueEmpty] = useState(true);
  const [minarea, setminarea] = useState();
  const [maxarea, setmaxarea] = useState();
  const [min_price, setmin_price] = useState();
  const [max_price, setmax_price] = useState();
  const updateField = (e, value) => {
    false;
    e.target.closest(".field_dropdown").querySelector("span").innerText = value;
    e.target.closest(".field_dropdown").querySelector("input").value = value;
  };
  // const updateSubField = (e, value) => {
  //   e.target.closest(".input_fields").querySelector("span").innerText = value;
  //   e.target.closest(".input_fields").querySelector("input").value = value;
  // };
  const chengeFilter = (e) => {
    e.target.value == "" ? setvalueEmpty(true) : setvalueEmpty(false);
    setfilterSerch(
      locs.filter((a) => a.toLowerCase().includes(e.target.value.toLowerCase()))
    );
  };
  return (
    <form
      className="rent_or_buuy_form_wrp"
      // action="/search"
      autoComplete="off"
      onSubmit={(e) => {
        e.preventDefault();
        router.push(
          `/search?type=${e.target.type.value ? e.target.type.value : "all"}&` +
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
            (e.target.rent_duration.value &&
              `rent_duration=${e.target.rent_duration.value}`)
        );
      }}
    >
      <fieldset>
        <div className="top_type">
          <div className="options">
            <fieldset>
              <input type="radio" name="type" id="rent" value="rent" />
              <label htmlFor="rent">Rent</label>
            </fieldset>
            <fieldset>
              <input type="radio" name="type" id="sale" value="sale" />
              <label htmlFor="sale">Buy</label>
            </fieldset>
          </div>
        </div>
        <input
          type="text"
          name="type"
          id="type"
          className="hidden"
          value="rent"
        />
        <div className="form_row">
          <div className="search_place">
            <div className="search_icon">
              <img src="/search.svg" alt="search icon" />
            </div>
            <div className={`field_dropdown ${searchPlace ? "open" : ""} `}>
              <span className="hidden">Search place</span>
              <input
                type="text"
                name="location"
                id="location"
                placeholder="Search place"
                onChange={(e) => chengeFilter(e)}
                autoComplete={"off"}
                onFocus={() => {
                  setsearchPlace(true);
                  setpropertyType(false);
                  setpropSize(false);
                  setprice(false);
                }}
              />
              {valueEmpty ? (
                <div className="dropdown_wrap">
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
                  <button
                    type="button"
                    onClick={() => setsearchPlace(false)}
                    className="close btn btn-danger btn-lg w-100"
                  >
                    Close
                  </button>
                </div>
              ) : (
                <div className="dropdown_wrap">
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
                    <span className="noresults">no results</span>
                  </ul>
                  <button
                    type="button"
                    onClick={() => setsearchPlace(false)}
                    className="close btn btn-danger btn-lg w-100"
                  >
                    Close
                  </button>
                </div>
              )}
            </div>
          </div>
          <div
            className={`field_dropdown ${propertyType ? "open" : ""} `}
            onClick={() => {
              setpropertyType(propertyType ? false : true);
              setpropSize(false);
              setprice(false);
              setsearchPlace(false);
            }}
          >
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
          <div
            className={`field_dropdown input_box_drpdwn ${
              propSize ? "open" : ""
            } `}
            onClick={() => {
              setpropSize(true);
              setprice(false);
              setpropertyType(false);
              setsearchPlace(false);
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
                className="btn btn-outline-danger  m-2"
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
              setsearchPlace(false);
              setpropertyType(false);
            }}
          >
            <span>
              {" "}
              {min_price ? `from ${min_price} ₹ ` : "Price "}
              {max_price && `to ${max_price} ₹`}
            </span>
            <div className="drp_icon">
              <img src="/chevron-down.svg" alt="arrow" />
            </div>
            <div className="drop_box">
              <div className="row_field">
                <div className="input_fields">
                  <label htmlFor="min_rent">Min rent (₹)</label>
                  <input
                    type="text"
                    name="min_rent"
                    id="min_rent"
                    onChange={(e) => setmin_price(e.target.value)}
                    value={min_price}
                  />
                </div>
                <div className="input_fields">
                  <label htmlFor="max_rent">Max rent (₹)</label>
                  <input
                    type="text"
                    name="max_rent"
                    id="max_rent"
                    onChange={(e) => setmax_price(e.target.value)}
                    value={max_price}
                  />
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
                  setmin_price("");
                  setmax_price("");
                }}
              >
                Reset
              </span>
              <span
                className="btn btn-outline-danger  m-2"
                onClick={(e) => {
                  e.stopPropagation();
                  setprice(false);
                }}
              >
                Close
              </span>
            </div>
          </div>
          {/* <input type="submit" value="submit" /> */}
          <button type="submit" className="btn btn-danger">
            Find property
          </button>
        </div>
      </fieldset>
    </form>
  );
};

export default RentProperty;

// export async function getServerSideProps(context) {

//   // const filtered = datas.filter(data=> data.serviceType == 'sale');
//   return {
//     props: {
//       locs: locations,
//     },
//   };
// }
