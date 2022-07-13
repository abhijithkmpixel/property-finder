import React from 'react'

const AddAgentForm = () => {
  return (
    <form className="" onSubmit={(e) => addProp(e)}>
              <div className="add_prop_form">
                <h3>Agent details</h3>
                <fieldset className={"hidden"}>
                  <label htmlFor="agentID">id</label>
                  <input type="text" name="agentID" id="agentID" />
                </fieldset>
                <fieldset className={"hidden"}>
                  <label htmlFor="slug">id</label>
                  <input
                    type="text"
                    name="slug"
                    id="slug"
                    defaultValue={slug}
                  />
                </fieldset>
                <fieldset>
                  <label htmlFor="name">Name</label>
                  <input type="text" name="name" id="name" required />
                </fieldset>
                <fieldset>
                  <label htmlFor="position">Position</label>
                  <input type="text" name="position" id="position" required />
                </fieldset>
                <fieldset>
                  <label htmlFor="nationality">Nationality</label>
                  <select name="nationality" id="nationality" required>
                    <option value="india">India</option>
                    <option value="pakisthan">Pakisthan</option>
                    <option value="uzbekistan">Uzbekistan</option>
                    <option value="Kyrgyzstan">Kyrgyzstan</option>
                    <option value="united kingdom">united kingdom</option>
                  </select>
                </fieldset>
                <fieldset>
                  <label htmlFor="image">Image</label>
                  <input
                    type="text"
                    name="image"
                    id="image"
                    required
                    onChange={(e) => setimage(e.target.value)}
                  />
                  <img src={image} id="imageId" alt="" />
                </fieldset>

                <fieldset>
                  <label htmlFor="company_image">company image</label>
                  <input
                    type="text"
                    name="company_image"
                    id="company_image"
                    required
                  />
                </fieldset>
                <fieldset>
                  <label htmlFor="company_name">Company name</label>
                  <input
                    type="text"
                    name="company_name"
                    id="company_name"
                    required
                  />
                </fieldset>
                <fieldset>
                  <label htmlFor="language">language</label>
                  <input type="text" name="language" id="language" required />
                </fieldset>
                <fieldset>
                  <label htmlFor="mobile">Mobile</label>
                  <input type="text" name="mobile" id="mobile" required />
                </fieldset>
                <fieldset>
                  <label htmlFor="email">Email</label>
                  <input type="email" name="email" id="email" required />
                </fieldset>
                <fieldset>
                  <label htmlFor="since">Agent since</label>
                  <input type="text" name="since" id="since" required />
                </fieldset>

                <fieldset className="w-100">
                  <label htmlFor="about_me">About me</label>
                  <CustonFieldEdito fieldName={"about_me"} />
                </fieldset>
                <div className="d-flex w-100 justify-content-between">
                  <button
                    type="submit"
                    className={`btn btn-primary btn-xl ${
                      +loader && "opacity-50 pe-none"
                    }`}
                    value="Add agent"
                  >
                    Save
                    {loader && (
                      <div className="spinner-border text-light" role="status">
                        <span className="visually-hidden">Loading...</span>
                      </div>
                    )}
                  </button>
                  {editor ? (
                    <>
                      <button
                        className={`btn btn-danger btn-xl ${
                          +loader && "opacity-50 pe-none"
                        }`}
                        type="button"
                        onClick={resetform}
                      >
                        Close
                        {loader && (
                          <div
                            className="spinner-border text-light"
                            role="status"
                          >
                            <span className="visually-hidden">Loading...</span>
                          </div>
                        )}
                      </button>
                    </>
                  ) : null}
                </div>
              </div>
            </form>
  )
}

export default AddAgentForm