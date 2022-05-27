import React, { useState } from "react";

const RentProperty = () => {
  const [propertyType, setpropertyType] = useState(false);
  const [price, setprice] = useState(false);

  const updateField = (e, value) => {
    e.target.closest(".field_dropdown").querySelector("span").innerText = value;
    e.target.closest(".field_dropdown").querySelector("input").value = value;
  };
  const updateSubField = (e, value) => {
    e.target.closest(".input_fields").querySelector("span").innerText = value;
    e.target.closest(".input_fields").querySelector("input").value = value;
  };
  return (
    <form action="/about" onSubmit={()=>alert('asd')}>
      <fieldset>
        <div className="form_row">
          <div className="search_place">
            <div className="search_icon">
              <img src="/search.svg" alt="search icon" />
            </div>
            <input
              type="search"
              placeholder="City, community or building"
              name="input_place"
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
            }}
          >
            <input type="text" name="input_property_type" />
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
                Factory
              </li>
            </ul>
          </div>
          <div
            className={`field_dropdown input_box_drpdwn ${price ? "open" : ""}`}
          >
            <input type="text" name="input_property_type" />
            <span
              onClick={() => {
                setprice(price ? false : true);
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
                    <input type="radio" name="rent_type" id="yearly" />
                    <label htmlFor="yearly">Yearly</label>
                  </fieldset>
                  <fieldset>
                    <input type="radio" name="rent_type" id="monthly" />
                    <label htmlFor="monthly">Monthly</label>
                  </fieldset>
                </div>
              </div>
            </div>
          </div>
        </div>
      </fieldset>
    </form>
  );
};

export default RentProperty;
