import React, { useEffect, useState, useRef } from "react";
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
    codes: [],
    input: "",
    title: "",
    author: "",
    NPM: "",
    year: "",
    angkatan: "",
    guide1: "",
    guide2: "",
    examiner1: "",
    examiner2: "",
    examiner3: "",
  });

  const [searching, setSearching] = useState(false);
  const [statusInput, setStatusInput] = useState(false);

  const getData = async () => {
    const BASE_URL = "http://localhost:3030/dataSkripsi/query";

    const headers = {
      Accept: "application/sparql-results+json,*/*;q=0.9",
      "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
    };

    const queryData = {
      query: `PREFIX data: <https://skripsiKu.com/data#>
      PREFIX id: <https://skripsiKu.com/skripsi#>
      PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
      SELECT ?title ?author ?NPM ?year ?angkatan ?guide1 ?guide2 ?examiner1 ?examiner2 ?examiner3
      WHERE
      {
        ?id data:title ?title ;
            data:author ?author ;
            data:NPM ?NPM ;
            data:hasYear ?nameYear ;
            data:hasAngkatan ?nameAngkatan ;
            data:hasGuide1 ?nameGuide1 ;
            data:hasGuide2 ?nameGuide2 ;
            data:hasExaminer1 ?nameExaminer1 ;
            data:hasExaminer2 ?nameExaminer2 ;
            data:hasExaminer3 ?nameExaminer3 .
            
            ?nameYear data:year ?year .
            ?nameAngkatan data:year ?angkatan .
            ?nameGuide1 data:lecturer ?guide1 .
            ?nameGuide2 data:lecturer ?guide2 .
            ?nameExaminer1 data:lecturer ?examiner1 .
            ?nameExaminer2 data:lecturer ?examiner2 .
            ?nameExaminer3 data:lecturer ?examiner3 .
            
            FILTER (
              regex(?id, "${value.input}", "i") ||
              regex(?title, "${value.input}", "i") ||
              regex(?author, "${value.input}", "i") ||
              regex(?NPM, "${value.input}", "i") ||
              regex(?year, "${value.input}", "i") ||
              regex(?angkatan, "${value.input}", "i") ||
              regex(?guide1, "${value.input}", "i") ||
              regex(?guide2, "${value.input}", "i") ||
              regex(?guide1, "${value.input}", "i") ||
              regex(?examiner1, "${value.input}", "i") ||
              regex(?examiner2, "${value.input}", "i") ||
              regex(?examiner3, "${value.input}", "i")
            )
      }`,
    };

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
      const formatted_data = data.results.bindings.map((code, index) =>
        formatter(code, index)
      );
      console.log(formatted_data);

      setValue({
        ...value,
        codes: formatted_data,
      });
    } catch (err) {
      console.error(err);
    }
  };

  const getAllData = async () => {
    const BASE_URL = "http://localhost:3030/dataSkripsi/query";

    const headers = {
      Accept: "application/sparql-results+json,*/*;q=0.9",
      "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
    };

    const queryData = {
      query: `PREFIX data: <https://skripsiKu.com/data#>
      PREFIX id: <https://skripsiKu.com/skripsi#>
      PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
      SELECT ?title ?author ?NPM ?year ?angkatan ?guide1 ?guide2 ?examiner1 ?examiner2 ?examiner3
      WHERE
      {
        ?id data:no ?no;
            data:title ?title ;
            data:author ?author ;
            data:NPM ?NPM ;
            data:hasYear ?nameYear ;
            data:hasAngkatan ?nameAngkatan ;
            data:hasGuide1 ?nameGuide1 ;
            data:hasGuide2 ?nameGuide2 ;
            data:hasExaminer1 ?nameExaminer1 ;
            data:hasExaminer2 ?nameExaminer2 ;
            data:hasExaminer3 ?nameExaminer3 .
            
            ?nameYear data:year ?year .
            ?nameAngkatan data:year ?angkatan .
            ?nameGuide1 data:lecturer ?guide1 .
            ?nameGuide2 data:lecturer ?guide2 .
            ?nameExaminer1 data:lecturer ?examiner1 .
            ?nameExaminer2 data:lecturer ?examiner2 .
            ?nameExaminer3 data:lecturer ?examiner3 .
      }ORDER BY ASC(?no)`,
    };

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
      const formatted_data = data.results.bindings.map((code, index) =>
        formatter(code, index)
      );
      console.log(formatted_data);

      setValue({
        ...value,
        codes: formatted_data,
      });
    } catch (err) {
      console.error(err);
    }
  };

  const getRandomData = async () => {
    const BASE_URL = "http://localhost:3030/dataSkripsi/query";

    const headers = {
      Accept: "application/sparql-results+json,*/*;q=0.9",
      "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
    };

    const queryData = {
      query: `PREFIX data: <https://skripsiKu.com/data#>
      PREFIX id: <https://skripsiKu.com/skripsi#>
      PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
      SELECT ?title ?author ?NPM ?year ?angkatan ?guide1 ?guide2 ?examiner1 ?examiner2 ?examiner3
      WHERE
      {
        ?id data:title ?title ;
            data:author ?author ;
            data:NPM ?NPM ;
            data:hasYear ?nameYear ;
            data:hasAngkatan ?nameAngkatan ;
            data:hasGuide1 ?nameGuide1 ;
            data:hasGuide2 ?nameGuide2 ;
            data:hasExaminer1 ?nameExaminer1 ;
            data:hasExaminer2 ?nameExaminer2 ;
            data:hasExaminer3 ?nameExaminer3 .
            
            ?nameYear data:year ?year .
            ?nameAngkatan data:year ?angkatan .
            ?nameGuide1 data:lecturer ?guide1 .
            ?nameGuide2 data:lecturer ?guide2 .
            ?nameExaminer1 data:lecturer ?examiner1 .
            ?nameExaminer2 data:lecturer ?examiner2 .
            ?nameExaminer3 data:lecturer ?examiner3 .
      }
      ORDER BY RAND()
      LIMIT 20`,
    };

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
      const formatted_data = data.results.bindings.map((code, index) =>
        formatter(code, index)
      );
      console.log(formatted_data);

      setValue({
        ...value,
        codes: formatted_data,
      });
    } catch (err) {
      console.error(err.response);
    }
  };

  const getFromTheNewest = async () => {
    const BASE_URL = "http://localhost:3030/dataSkripsi/query";

    const headers = {
      Accept: "application/sparql-results+json,*/*;q=0.9",
      "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
    };

    const queryData = {
      query: `PREFIX data: <https://skripsiKu.com/data#>
      PREFIX id: <https://skripsiKu.com/skripsi#>
      PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
      SELECT ?title ?author ?NPM ?year ?angkatan ?guide1 ?guide2 ?examiner1 ?examiner2 ?examiner3
      WHERE
      {
        ?id data:no ?no;
            data:title ?title ;
            data:author ?author ;
            data:NPM ?NPM ;
            data:hasYear ?nameYear ;
            data:hasAngkatan ?nameAngkatan ;
            data:hasGuide1 ?nameGuide1 ;
            data:hasGuide2 ?nameGuide2 ;
            data:hasExaminer1 ?nameExaminer1 ;
            data:hasExaminer2 ?nameExaminer2 ;
            data:hasExaminer3 ?nameExaminer3 .
            
            ?nameYear data:year ?year .
            ?nameAngkatan data:year ?angkatan .
            ?nameGuide1 data:lecturer ?guide1 .
            ?nameGuide2 data:lecturer ?guide2 .
            ?nameExaminer1 data:lecturer ?examiner1 .
            ?nameExaminer2 data:lecturer ?examiner2 .
            ?nameExaminer3 data:lecturer ?examiner3 .

      }
      ORDER BY DESC(?no)`,
    };

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
      const formatted_data = data.results.bindings.map((code, index) =>
        formatter(code, index)
      );
      console.log(formatted_data);

      setValue({
        ...value,
        codes: formatted_data,
      });
    } catch (err) {
      console.error(err);
    }
  };

  const formatter = (codes, index) => {
    return {
      id: index,
      title: codes.title.value,
      author: codes.author.value,
      NPM: codes.NPM.value,
      year: codes.year.value,
      angkatan: codes.angkatan.value,
      guide1: codes.guide1.value,
      guide2: codes.guide2.value,
      examiner1: codes.examiner1.value,
      examiner2: codes.examiner2.value,
      examiner3: codes.examiner3.value,
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

  const content = value.codes.map((code) => (
    <div key={code.id} className="codes_list_container text-justify">
      <ul>
        <li >
          <div className="d-flex flex-row align-items-start justify-content-start"></div>
          <div className="code_info"></div>
          <div className="code_title">
            {code.title}
            <br />
          </div>
          <div className="code_language">
            Author : {code.author}
            <br />
          </div>
          NPM : {code.NPM}
          <br />
          Tahun : {code.year}
          <br />
          Angkatan : {code.angkatan}
          <br />
          Pembimbing 1 : {code.guide1}
          <br />
          Pembimbing 2 : {code.guide2}
          <br />
          Penguji 1 : {code.examiner1}
          <br />
          Penguji 2 : {code.examiner2}
          <br />
          Penguji 3 : {code.examiner3}
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
                {/* Logo */}
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
     
       
    
        {/* Home Slider */}
        <div className="home_slider_container">
          <div className="owl-carousel owl-theme home_slider">
            {/* Slide */}
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

      {/* Codes */}
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
            {/* Codes Content */}
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
                {/* Logo */}
                <div className="logo">
                  <div className="d-flex flex-row align-items-end justify-content-start">
                    <p className="logo_text">SkripsiKu</p>
                  </div>
                 
                </div>
                  <div className="d-flex flex-row align-items-end justify-content-start">
                    <p className="footer_content_text text-center">Portal Pencarian Data Skripsi Mahasiswa Teknik Informatika Unpad</p>
                  </div>
                {/* Footer Social */}
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Home;