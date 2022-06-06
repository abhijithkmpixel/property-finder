import React, { useState } from "react";
import { useRouter } from "next/router";

const BuyProperty = () => {
  const router = useRouter();
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
    <form
      //  action={`/search`}
      onSubmit={(e) => {
        e.preventDefault();
        router.push(
          `/search?type=${e.target.type.value}&`
          (e.target.property_type.value && `property_type=${e.target.property_type.value}&`)+
          (e.target.min_area.value && `min_area=${e.target.min_area.value}&`)+
          (e.target.max_area.value && `max_area=${e.target.max_area.value}&`)+
          (e.target.min_price.value && `min_price=${e.target.min_price.value}&`)+
          (e.target.max_price.value && `max_price=${e.target.max_price.value}&`)+
          (e.target.max_price.value && `max_price=${e.target.max_price.value}`)
        );
      }}
    >
      <fieldset>
        <input
          type="text"
          name="type"
          id="type"
          className="hidden"
          value="sale"
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
                  <label htmlFor="min_price">Min Price (AED)</label>
                  <input type="text" name="min_price" id="min_price" />
                </div>
                <div className="input_fields">
                  <label htmlFor="max_price">Max Price (AED)</label>
                  <input type="text" name="max_price" id="max_price" />
                </div>
              </div>
              {/* <h5>Rental period</h5>
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
          </div> */}
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

export default BuyProperty;
