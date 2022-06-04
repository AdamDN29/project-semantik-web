import React, { useEffect, useState, useRef } from "react";
import {BASE_URL, headers, getDataQuery, getAllDataQuery, getRandomDataQuery, getFromNewstQuery} from "../Query/Query";
import { scroller } from "react-scroll";
import axios from "axios";
import qs from "qs";

const scrollToSection = (flag) => {
  scroller.scrollTo(flag, {
    duration: 800,
    offset:-70,
    delay: 0,
    smooth: "easeInOutQuart",
  });
};

function Home() {

  const [value, setValue] = useState({
    dataSkripsi: [], // Save the Result
    input: "", // Save the Keyword
  });

  const [searching, setSearching] = useState(false);
  const [statusInput, setStatusInput] = useState(false);

  const getData = async () => {

    // Query to get Data
    const queryData = getDataQuery(value.input);

    setSearching(true);
    setStatusInput(true);
    document.getElementById('myInput').value = '';
    scrollToSection("codes");

    try {
      const { data } = await axios(BASE_URL, {
        method: "POST",
        headers,
        data: qs.stringify(queryData),
      });
      console.log(data);

      // Convert Data
      const formatted_data = data.results.bindings.map((temp, index) =>
        formatter(temp, index)
      );
      console.log(formatted_data);

      setValue({
        ...value,
        dataSkripsi: formatted_data,
      });
    } catch (err) {
      console.error(err);
    }
  };

  const getAllData = async () => {

    // Query to get Data
    const queryData = getAllDataQuery();

    setStatusInput(false);
    scrollToSection("codes");

    try {
      const { data } = await axios(BASE_URL, {
        method: "POST",
        headers,
        data: qs.stringify(queryData),
      });
      console.log(data);

      // Convert Data
      const formatted_data = data.results.bindings.map((temp, index) =>
        formatter(temp, index)
      );
      console.log(formatted_data);

      setValue({
        ...value,
        dataSkripsi: formatted_data,
      });
    } catch (err) {
      console.error(err);
    }
  };

  const getRandomData = async () => {
    
    // Query to get Data
    const queryData = getRandomDataQuery();

    setStatusInput(false);
    scrollToSection("codes");

    try {
      const { data } = await axios(BASE_URL, {
        method: "POST",
        headers,
        data: qs.stringify(queryData),
      });
      console.log(data);

      // Convert Data
      const formatted_data = data.results.bindings.map((temp, index) =>
        formatter(temp, index)
      );
      console.log(formatted_data);

      setValue({
        ...value,
        dataSkripsi: formatted_data,
      });
    } catch (err) {
      console.error(err.response);
    }
  };

  const getFromTheNewest = async () => {
   
    // Query to get Data
    const queryData = getFromNewstQuery();

    setStatusInput(false);
    scrollToSection("codes");

    try {
      const { data } = await axios(BASE_URL, {
        method: "POST",
        headers,
        data: qs.stringify(queryData),
      });
      console.log(data);

      // Convert Data
      const formatted_data = data.results.bindings.map((temp, index) =>
        formatter(temp, index)
      );
      console.log(formatted_data);

      setValue({
        ...value,
        dataSkripsi: formatted_data,
      });
    } catch (err) {
      console.error(err);
    }
  };

  const formatter = (temp, index) => {
    return {
      id: index,
      title: temp.title.value,
      author: temp.author.value,
      NPM: temp.NPM.value,
      year: temp.year.value,
      angkatan: temp.angkatan.value,
      guide1: temp.guide1.value,
      guide2: temp.guide2.value,
      examiner1: temp.examiner1.value,
      examiner2: temp.examiner2.value,
      examiner3: temp.examiner3.value,
    };
  };

  const handleChange = (event) => {
    setValue({
      ...value,
      input: event.target.value,
    });
  };

  const temp = () => {
    scrollToSection("home");
  }

  const content = value.dataSkripsi.map((skripsi) => (
    <div key={skripsi.id} className="codes_list_container text-justify">
      <ul>
        <li >
          <div className="d-flex flex-row align-items-start justify-content-start"></div>
          <div className="code_info"></div>
          <div className="code_title">
            {skripsi.title}
            <br />
          </div>
          <div className="code_language">
            Author : {skripsi.author}
            <br />
          </div>
          NPM : {skripsi.NPM}
          <br />
          Tahun : {skripsi.year}
          <br />
          Angkatan : {skripsi.angkatan}
          <br />
          Pembimbing 1 : {skripsi.guide1}
          <br />
          Pembimbing 2 : {skripsi.guide2}
          <br />
          Penguji 1 : {skripsi.examiner1}
          <br />
          Penguji 2 : {skripsi.examiner2}
          <br />
          Penguji 3 : {skripsi.examiner3}
          <br />
          <hr className="line-style"></hr>
          <div className="margin-style"></div>
        </li>
      </ul>
      <ul className="codes_list"></ul>
    </div>
  ));

  return (
    <div className="super_container">
      {/* Header */}
      <header className="header">
        <div className="container">
          <div className="row">
            <div className="col">
              <div className="header_content d-flex flex-row align-items-center justify-content-center">
                <div className="logo mr-auto">
                  <div className="d-flex flex-row align-items-end justify-content-start">
                    <span className="logo_text logo_text_style">
                      <a href="/">SkripsiKu</a>
                    </span>
                  </div>
                </div>
                <div className="ml-auto">
                  <div className="d-flex flex-row align-items-end justify-content-end">
                    <span className="nav_about_text">
                      <a href="/advanced">Advanced</a>
                    </span>
                   
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
      
      {/* Home */}
      <div className="home" id="home">
        <div className="home_slider_container">
          <div className="owl-carousel owl-theme home_slider">
            <div className="slide">
              <div
                className="background_image"
                style={{ backgroundImage: "url(images/background.jpg)" }}
              />
              <div className="home_container">
                <div className="container">
                  <div className="row">
                    <div className="col">
                      <div className="home_content">
                        <div className="home_title_container text-center">
                          <div className="home_title islive text-center">
                            <h1>
                              SkripsiKu 
                            </h1>
                          </div>
                        </div>
                        
                        <div className="code_form_container">
                          <form
                            className="code_form"
                            onSubmit={(e) => e.preventDefault()}
                          >
                            <div className="align-items-center justify-content-center">
                              <div className="row">
                                <div className="col-md-8">
                                  <div className="code_form_inputs align-items-center justify-content-center">
                                    <input
                                      id="myInput"
                                      type="text"
                                      className="code_form_input code_form_input_repo"
                                      placeholder="Cari Data Skripsi"
                                      setvalue={value.input}
                                      onChange={handleChange}
                                      required="required"
                                    />
                                  </div>
                                </div>
                                <div className="col-md-4">
                                  <button
                                    type="button"
                                    className="code_form_button button"
                                    value="Search"
                                    onClick={getData}
                                  >
                                    <span>Search</span>
                                  </button>
                                </div>
                              </div>
                          
                              <div className="row mt-4 justify-content-center">
                                <div className="col-md-12 mt-4">
                                  <p className="category_text">Portal Pencarian Data Skripsi Mahasiswa Teknik Informatika Unpad</p>
                                </div>
                              </div>
                              <div className="row mt-2">
                                <div className="col-6 col-md-4 mt-4">
                                  <button
                                    type="button"
                                    className="code_form_button button-get-category"
                                    value="Search"
                                    onClick={getAllData}
                                  >
                                    <span>Show All Data</span>
                                  </button>
                                </div>
                                <div className="col-6 col-md-4 mt-4">
                                  <button
                                    type="button"
                                    className="code_form_button button-get-category"
                                    value="Search"
                                    onClick={getRandomData}
                                  >
                                    <span>Show Random Data</span>
                                  </button>
                                </div>
                                <div className="col-md-4 mt-4">
                                  <button
                                    type="button"
                                    className="code_form_button button-get-category"
                                    value="Search"
                                    onClick={getFromTheNewest}
                                  >
                                    <span>Show From The Newest</span>
                                  </button>
                                </div>
                              </div>
                            </div>
                          </form>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="codes">
        <button
            type="button"
            className="buttonUp code_form_button button"
            onClick={temp}
        >
          <span style={{top:0}}>Go to Search</span>
        </button>
        <div className="container">
          <div className="row row-lg-eq-height">
            <div className="content_container col-lg-8 order-lg-2 order-1">
              <div className="codes_content">
                <div className="section_title">
                  <h1 className="result-text">Hasil Pencarian</h1>
                  <div className="margin-style"></div>
                </div> 
                <div>
                
                  {(() => {
                    if (content.length === 0) {
                      return (
                        <div>
                            {
                              searching === false ?(
                                <>
                                  <img src="/images/Search_Image.png" className="img-notfound mb-4" alt="Waiting to Search"/>
                                  <p className="text-notfound">"Silahkan Masukkan Keyword Untuk Mencari Data Skripsi"</p>
                                </>
                               
                              ):(
                                <>
                                  <h3 className="result2-text ">Keyword : " {value.input} "</h3>
                                  <img src="/images/Search_Image.png" className="img-notfound mb-4" alt="Waiting to Search"/>
                                <p className="text-notfound">"Data Tidak Ditemukan! Silahkan Masukkan Keyword Lain"</p>
                                </>
                              )
                            }
                          
                        </div>
                      );
                    } else {
                      return (
                      
                      <div>
                        <h3 className="result2-text ">Result : {content.length} data</h3>
                        {
                          statusInput === true ?(<h3 className="result2-text ">Keyword : " {value.input} "</h3>
                          ):(<></>)
                        }
                        
                        {content}</div>);
                    }
                  })()}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="footer">
        <div className="footer_content">
          <div className="container">
            <div className="row">
              <div className="col text-center">
                <div className="logo">
                  <div className="d-flex flex-row align-items-end justify-content-start">
                    <p className="logo_text">SkripsiKu</p>
                  </div>
                </div>
                <div className="d-flex flex-row align-items-end justify-content-start">
                  <p className="footer_content_text text-center">Portal Pencarian Data Skripsi Mahasiswa Teknik Informatika Unpad</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Home;
