import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";

const AdvSearch = ({ locs }) => {
  const router = useRouter();
  const [propertyType, setpropertyType] = useState(false);
  const [price, setprice] = useState(false);
  const [propSize, setpropSize] = useState(false);
  const [servicetype, setservicetype] = useState(false);
  const [searchPlace, setsearchPlace] = useState(false);
  const [valueEmpty, setvalueEmpty] = useState(true);
  const [filterSerch, setfilterSerch] = useState();

  useEffect(() => {
    setfilterSerch(locs);

    return () => {};
  }, []);

  const updateField = (e, value) => {
    e.target.closest(".field_dropdown").querySelector("span").innerText = value;
    e.target.closest(".field_dropdown").querySelector("input").value = value;
  };

  const chengeFilter = (e) => {
    e.target.value == "" ? setvalueEmpty(true) : setvalueEmpty(false);
    setfilterSerch(locs.filter((a) => a.toLowerCase().includes(e.target.value.toLowerCase())));
  };

  return (
    <form
      className="rent_or_buuy_form_wrp"
      // action="/search"
      onSubmit={(e) => {
        e.preventDefault();
        setpropertyType(false);
        setprice(false);
        setpropSize(false);
        setservicetype(false);

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
              setsearchPlace(searchPlace ? false : true);
              setpropertyType(false);
              setpropSize(false);
              setprice(false);
              e.target.querySelector("input").focus();
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
          <div
            className={`field_dropdown ${servicetype ? "open" : ""} `}
            onClick={() => {
              // setpropertyType(false );
              // setservicetype(servicetype ? false : true)
              // setpropSize(false);
              // setprice(false);
            }}
          >
            <select name="type" id="type">
              <option value="all">Select service</option>
              <option value="sale">Sale</option>
              <option value="rent">rent</option>
              <option value="commercial-sale">commercial sale</option>
              <option value="commercial-rent">commercial rent</option>
            </select>
            {/* <input type="text" name="property_type" id="property_type" />
          <span>Service type</span>
          <div className="drp_icon">
            <img src="/chevron-down.svg" alt="arrow" />
          </div>
          <ul className="list_drop">
            <li
              data-value="office space"
              onClick={(e) => {
                updateField(e, e.target.getAttribute("data-value"));
              }}
            >
              Office Space
            </li>
            <li
              data-value="retail"
              onClick={(e) => {
                updateField(e, e.target.getAttribute("data-value"));
              }}
            >
              Retail
            </li>
          </ul> */}
          </div>
          <div
            className={`field_dropdown ${propertyType ? "open" : ""} `}
            onClick={() => {
              setpropertyType(propertyType ? false : true);
              setpropSize(false);
              setprice(false);
            }}
          >
            <input type="text" name="property_type" id="property_type" />
            <span>Property Type</span>
            <div className="drp_icon">
              <img src="/chevron-down.svg" alt="arrow" />
            </div>
            <ul className="list_drop">
              <li
                data-value="office space"
                onClick={(e) => {
                  updateField(e, e.target.getAttribute("data-value"));
                }}
              >
                Office Space
              </li>
              <li
                data-value="retail"
                onClick={(e) => {
                  updateField(e, e.target.getAttribute("data-value"));
                }}
              >
                Retail
              </li>
              <li
                data-value="warehouse"
                onClick={(e) => {
                  updateField(e, e.target.getAttribute("data-value"));
                }}
              >
                Warehouse
              </li>
              <li
                data-value="shop"
                onClick={(e) => {
                  updateField(e, e.target.getAttribute("data-value"));
                }}
              >
                Shop
              </li>
              <li
                data-value="villa"
                onClick={(e) => {
                  updateField(e, e.target.getAttribute("data-value"));
                }}
              >
                villa
              </li>
              <li
                data-value="show room"
                onClick={(e) => {
                  updateField(e, e.target.getAttribute("data-value"));
                }}
              >
                Show Room
              </li>
              <li
                data-value="whole building"
                onClick={(e) => {
                  updateField(e, e.target.getAttribute("data-value"));
                }}
              >
                Whole Building
              </li>
              <li
                data-value="land"
                onClick={(e) => {
                  updateField(e, e.target.getAttribute("data-value"));
                }}
              >
                Land
              </li>
              <li
                data-value="farm"
                onClick={(e) => {
                  updateField(e, e.target.getAttribute("data-value"));
                }}
              >
                Farm
              </li>
              <li
                data-value="co-working space"
                onClick={(e) => {
                  updateField(e, e.target.getAttribute("data-value"));
                }}
              >
                Co-working space
              </li>
              <li
                data-value="bulk rent unit"
                onClick={(e) => {
                  updateField(e, e.target.getAttribute("data-value"));
                }}
              >
                Bulk Rent Unit
              </li>
              <li
                data-value="staff accommodation"
                onClick={(e) => {
                  updateField(e, e.target.getAttribute("data-value"));
                }}
              >
                Staff Accommodation
              </li>
              <li
                data-value="business centre"
                onClick={(e) => {
                  updateField(e, e.target.getAttribute("data-value"));
                }}
              >
                Business Centre
              </li>
              <li
                data-value="factory"
                onClick={(e) => {
                  updateField(e, e.target.getAttribute("data-value"));
                }}
              >
                Factory
              </li>
            </ul>
          </div>
          <div
            className={`field_dropdown input_box_drpdwn ${
              propSize ? "open" : ""
            } `}
          >
            <span
              onClick={() => {
                setpropSize(propSize ? false : true);
                setprice(false);
                setpropertyType(false);
              }}
            >
              Area Sq.Ft.
            </span>
            <div className="drp_icon">
              <img src="/chevron-down.svg" alt="arrow" />
            </div>
            <div className="drop_box">
              <div className="row_field">
                <div className="input_fields">
                  <label htmlFor="min_area">Min Area (sq.ft)</label>
                  <input type="text" name="min_area" id="min_area" />
                </div>
                <div className="input_fields">
                  <label htmlFor="max_area">Max Area (sq.ft)</label>
                  <input type="text" name="max_area" id="max_area" />
                </div>
              </div>
            </div>
          </div>
          <div
            className={`field_dropdown input_box_drpdwn ${price ? "open" : ""}`}
          >
            {/* <input type="text" name="property_price" id="property_price" /> */}
            <span
              onClick={() => {
                setprice(price ? false : true);
                setpropSize(false);
                setpropertyType(false);
              }}
            >
              Price
            </span>
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
            </div>
          </div>
          {/* <input type="submit" value="submit" /> */}
          <button type="submit" className="btn btn-danger">
            Search
          </button>
        </div>
      </fieldset>
    </form>
  );
};

export default AdvSearch;
