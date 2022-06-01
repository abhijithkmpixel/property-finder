import React, { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";

const RentProperty = () => {
  const [propertyType, setpropertyType] = useState(false);
  const [price, setprice] = useState(false);
  const [propSize, setpropSize] = useState(false);

  const updateField = (e, value) => {
    e.target.closest(".field_dropdown").querySelector("span").innerText = value;
    e.target.closest(".field_dropdown").querySelector("input").value = value;
  };
  const updateSubField = (e, value) => {
    e.target.closest(".input_fields").querySelector("span").innerText = value;
    e.target.closest(".input_fields").querySelector("input").value = value;
  };
  return (
    <form action="/search">
      <fieldset>
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
            <input
              type="search"
              placeholder="City, community or building"
              name="input_place"
              id="input_place"
            />
            <ul className="search_dropdown">
              <li>
                <div className="icon">
                  <img src="/loc.svg" alt="location" />
                  <span>sharja</span>
                </div>
              </li>
              <li>
                <div className="icon">
                  <img src="/loc.svg" alt="location" />
                  <span>Abudabi</span>
                </div>
              </li>
              <li>
                <div className="icon">
                  <img src="/loc.svg" alt="location" />
                  <span>Dubai South</span>
                </div>
              </li>
              <li>
                <div className="icon">
                  <img src="/loc.svg" alt="location" />
                  <span>Town Square Dubai</span>
                </div>
              </li>
              <li>
                <div className="icon">
                  <img src="/loc.svg" alt="location" />
                  <span>Sheikh Zayed Road</span>
                </div>
              </li>
            </ul>
          </div>
          <div
            className={`field_dropdown ${propertyType ? "open" : ""} `}
            onClick={() => {
              setpropertyType(propertyType ? false : true);
              setpropSize( false );
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
                onClick={(e) => {
                  updateField(e, e.target.innerText);
                }}
              >
                Office Space
              </li>
              <li
                onClick={(e) => {
                  updateField(e, e.target.innerText);
                }}
              >
                Retail
              </li>
              <li
                onClick={(e) => {
                  updateField(e, e.target.innerText);
                }}
              >
                Warehouse
              </li>
              <li
                onClick={(e) => {
                  updateField(e, e.target.innerText);
                }}
              >
                Shop
              </li>
              <li
                onClick={(e) => {
                  updateField(e, e.target.innerText);
                }}
              >
                Villa
              </li>
              <li
                onClick={(e) => {
                  updateField(e, e.target.innerText);
                }}
              >
                Show Room
              </li>
              <li
                onClick={(e) => {
                  updateField(e, e.target.innerText);
                }}
              >
                Whole Building
              </li>
              <li
                onClick={(e) => {
                  updateField(e, e.target.innerText);
                }}
              >
                Land
              </li>
              <li
                onClick={(e) => {
                  updateField(e, e.target.innerText);
                }}
              >
                Farm
              </li>
              <li
                onClick={(e) => {
                  updateField(e, e.target.innerText);
                }}
              >
                Co-working space
              </li>
              <li
                onClick={(e) => {
                  updateField(e, e.target.innerText);
                }}
              >
                Bulk Rent Unit
              </li>
              <li
                onClick={(e) => {
                  updateField(e, e.target.innerText);
                }}
              >
                Staff Accommodation
              </li>
              <li
                onClick={(e) => {
                  updateField(e, e.target.innerText);
                }}
              >
                Business Centre
              </li>
              {/* <li
                onClick={(e) => {
                  updateField(e, e.target.innerText);
                }}
              >
                Land
              </li> */}
              <li
                onClick={(e) => {
                  updateField(e, e.target.innerText);
                }}
              >
                Factory
              </li>
            </ul>
          </div>
          <div className={`field_dropdown input_box_drpdwn ${propSize ? "open" : ""} `}>
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
                  <label htmlFor="min_rent">Min Area (sq.ft.)</label>
                  <input type="text" name="min_area" id="min_area" />
                </div>
                <div className="input_fields">
                  <label htmlFor="max_rent">Max rent (sq.ft.)</label>
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
                setpropSize(false );
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
            Search{" "}
          </button>
        </div>
      </fieldset>
    </form>
  );
};

export default RentProperty;
