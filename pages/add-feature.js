// pages/add-feature.js

import { useState } from "react";
import Head from "next/head";
import Nav from "../components/Nav";

const AddFeature = () => {
  //
  const [name, setName] = useState("");
  const [layer, setLayer] = useState("");
  const [county, setCounty] = useState("");
  //
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  //
  const handleFeature = async (e) => {
    e.preventDefault();
    // reset error and message
    setError("");
    setMessage("");
    // fields check
    if (!name || !layer || !county) return setError("All fields are required");

    // feature structure
    let feature = {
      name,
      layer,
      county,
      updated: new Date().toISOString(),
    };

    // save the feature
    let response = await fetch("/api/features", {
      method: "POST",
      body: JSON.stringify(feature),
    });

    // get the data
    let data = await response.json();

    if (data.success) {
      // reset the fields
      setName("");
      setLayer("");
      setCounty("");
      // set the message
      return setMessage(data.message);
    } else {
      // set the error
      return setError(data.message);
    }
  };

  return (
    <div>
      <Head>
        <title>Add Feature</title>
      </Head>
      <Nav />
      <div className="container mt-6">
        <div className="row">
          <h2 className="m-0 mb-2">Add feature</h2>
        </div>
        <div className="row border rounded-3 m-0 p-3">
          <form onSubmit={handleFeature} className="row g-3 m-0 p-0">
            {error ? (
              <div className="">
                <h3 className="error">{error}</h3>
              </div>
            ) : null}
            {message ? (
              <div className="">
                <h3 className="message">{message}</h3>
              </div>
            ) : null}

            <div className="col-12">
              <label htmlFor="input001" className="form-label mb-0 small">
                Feature name
              </label>
              <input
                type="text"
                className="form-control form-control-sm"
                id="input001"
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="col-12">
              <label htmlFor="input002" className="form-label mb-0 small">
                Layer name
              </label>
              <input
                type="text"
                className="form-control form-control-sm"
                id="input002"
                onChange={(e) => setLayer(e.target.value)}
              />
            </div>

            <div className="col-12">
              <label htmlFor="input003" className="form-label mb-0 small">
                County
              </label>
              <select
                className="form-select form-control form-control-sm"
                id="input003"
                onChange={(e) => setCounty(e.target.value)}
              >
                <option value="Athens">Athens</option>
                <option value="Meigs">Meigs</option>
                <option value="Vinton">Vinton</option>
                <option value="Hocking">Hocking</option>
                <option value="Perry">Perry</option>
                <option value="Morgan">Morgan</option>
                <option value="Washington">Washington</option>
              </select>
            </div>

            <div className="col-12">
              <button type="submit" className="btn btn-primary btn-sm">
                Add feature
              </button>
            </div>
          </form>
        </div>

        {/*         
        <div className="row">
          <form onSubmit={handleFeature} className="col-12 g-2">
            {error ? (
              <div className="col-12 mb-2">
                <h3 className={styles.error}>{error}</h3>
              </div>
            ) : null}
            {message ? (
              <div className="col-12 mb-2">
                <h3 className={styles.message}>{message}</h3>
              </div>
            ) : null}
            <div className="col-12 mb-2">
              <label>Title</label>
              <input
                type="text"
                name="title"
                onChange={(e) => setTitle(e.target.value)}
                value={title}
                placeholder="Feature title"
              />
            </div>
            <div className="col-12 mb-2">
              <label htmlFor="input01" className="form-label mb-0 small">
                Name
              </label>
              <input
                type="text"
                className="form-control form-control-sm"
                id="input01"
              />
            </div>
            <div className="col-12 mb-2">
              <label>County</label>
              <textarea
                name="county"
                onChange={(e) => setCounty(e.target.value)}
                value={county}
                placeholder="Feature county"
              />
            </div>
            <div className="col-12 mb-2">
              <button type="submit" className="btn btn-sm btn-secondary">
                Add feature
              </button>
            </div>
          </form>
        </div> */}
      </div>
    </div>
  );
};
export default AddFeature;
