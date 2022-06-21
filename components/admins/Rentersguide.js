import axios from "axios";
import React from "react";
import { useRef } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { api } from "../../pages/api/auth/api";

const Rentersguide = () => {
  const [data, setdata] = useState();
  const title = useRef();
  useEffect(() => {
    getData();
    return () => {};
  }, [data]);
  const getData = async () => {
    await api.get(`/api/renterguide`).then((res) => {
      setdata(res.data?.body_copy);
      console.log(data);
    });
  };
  function assignvalues(){
    // data?
  }
  return (
    <section>
      <h1>Rentersguide</h1>
      {data ? (
        <form>
          {data?.map((f) => {
            return (
              <>
                <fieldset>
                  <label htmlFor="title">Title</label>
                  <textarea
                    id="title"
                    name="title"
                    cols="300"
                    rows="10"
                    onChange={(e) => e.target.value = e.target.value}
                    // value={f.title}
                  ></textarea>
                </fieldset>
                <fieldset>
                  <label htmlFor="description">description</label>
                  <textarea
                    name="description"
                    id="description"
                    cols="300"
                    rows="10"
                    // value={f.subtitle}
                    onChange={(e) => e.target.value}
                  ></textarea>
                </fieldset>
              </>
            );
          })}
        </form>
      ) : null}
    </section>
  );
};

export default Rentersguide;
