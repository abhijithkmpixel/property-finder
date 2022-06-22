import axios from "axios";
import { doc, setDoc } from "firebase/firestore/lite";
import React from "react";
import { useRef } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { api } from "../../pages/api/auth/api";
import { db } from "../../pages/api/firebase";

const Rentersguide = ({ results, title, docName }) => {
  const [data, setdata] = useState();
  const [result, setresult] = useState();
  const [loader, setloader] = useState(false);

  useEffect(() => {
    setresult(results);
    setdata(result?.body_copy);
    return () => {};
  }, [result]);

  // onchange function
  function assignvalues(e, index) {
    const value = [...data];
    value[index][e.target.name] = e.target.value;
    setdata(value);
  }
  //remove field row
  function removeRow(e, index) {
    const value = [...data];
    value.splice(index, 1);
    setdata(value);
  }
  //nested values handler
  function assignInnervalues(e, index, nextindex) {
    const value = [...data];
    value[index].redirects_guides[nextindex][e.target.name] = e.target.value;
    setdata(value);
  }

  //form submit handler
  const handlesubmit = async (e) => {
    e.preventDefault();
    setloader(true);
    try {
      const docRef = doc(db, "properties2", docName);
      const sub = await setDoc(docRef, {
        ...result,
        body_copy: data,
      });
      setloader(false);
      alert(`Document has been updated`);
      // router.push('/add-property')
    } catch (err) {
      setloader(false);

      alert(err.message);
    }
  };
  // add row
  function addRow(e) {
    setdata([
      ...data,
      {
        title: "",
        subtitle: "",
        redirects_guides: [
          { url: "", image: "", title: "", desc: "" },
          { url: "", image: "", title: "", desc: "" },
        ],
      },
    ]);
  }
  return (
    <section className="mt-5 mb-5">
      <div className="container">
        <h1>{title}</h1>
        {data ? (
          <form className="guides_enrtry_form1 border border-secondary p-2">
            {data?.map((f, index) => {
              return (
                <div key={index} className="single_objects_wrp">
                  <fieldset>
                    <label htmlFor="title">Title</label>
                    <textarea
                      className="border"
                      id="title"
                      name="title"
                      cols="300"
                      rows="10"
                      onChange={(e) => assignvalues(e, index)}
                      value={f.title}
                    ></textarea>
                  </fieldset>
                  <fieldset>
                    <label htmlFor="description">description</label>
                    <textarea
                      name="subtitle"
                      id="description"
                      cols="300"
                      rows="10"
                      value={f.subtitle}
                      className="border"
                      onChange={(e) => assignvalues(e, index)}
                    ></textarea>
                  </fieldset>
                  <div className="row">
                    {f?.redirects_guides?.map((ext, nextindex) => {
                      return (
                        <div className="col-4">
                          <div key={nextindex} className="border p-3">
                            <h3>{nextindex}</h3>
                            <fieldset>
                              <label htmlFor="url">external link</label>
                              <input
                                name="url"
                                id="url"
                                value={ext.url}
                                className="border"
                                onChange={(e) =>
                                  assignInnervalues(e, index, nextindex)
                                }
                              />
                            </fieldset>
                            <fieldset>
                              <label htmlFor="image">external link image</label>
                              <input
                                name="image"
                                id="image"
                                value={ext.image}
                                className="border"
                                onChange={(e) =>
                                  assignInnervalues(e, index, nextindex)
                                }
                              />
                              <img src={ext.image} alt="" />
                            </fieldset>
                            <fieldset>
                              <label htmlFor="title">external link title</label>
                              <input
                                name="title"
                                id="title"
                                value={ext.title}
                                className="border"
                                onChange={(e) =>
                                  assignInnervalues(e, index, nextindex)
                                }
                              />
                            </fieldset>
                            <fieldset>
                              <label htmlFor="desc">
                                external link summary
                              </label>
                              <input
                                name="desc"
                                id="desc"
                                value={ext.desc}
                                className="border"
                                onChange={(e) =>
                                  assignInnervalues(e, index, nextindex)
                                }
                              />
                            </fieldset>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  <button
                    type="button"
                    className={`btn btn-danger btn-sm  d-flex align-self-end ${
                      +loader && "opacity-50 pe-none"
                    }`}
                    onClick={(e) => removeRow(e, index)}
                  >
                    Delete row{" "}
                    {loader && (
                      <div className="spinner-border text-light" role="status">
                        <span className="visually-hidden">Loading...</span>
                      </div>
                    )}
                  </button>
                </div>
              );
            })}
            <div className="d-flex justify-content-between">
            <button
                type="button"
                className={`btn btn-primary btn-lg m-2 ${
                  +loader && "opacity-50 pe-none"
                }`}
                onClick={handlesubmit}
              >
                Update{" "}
                {loader && (
                  <div className="spinner-border text-light" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                )}
              </button>
              <button
                type="button"
                className={`btn btn-primary btn-lg m-2 ${
                  +loader && "opacity-50 pe-none"
                }`}
                onClick={addRow}
              >
                Add row{" "}
                {loader && (
                  <div className="spinner-border text-light" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                )}
              </button>

           
            </div>
          </form>
        ) : null}
      </div>
    </section>
  );
};

export default Rentersguide;
