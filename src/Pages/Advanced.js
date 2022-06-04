import React, { useState } from "react";
import { scroller } from "react-scroll";
import {BASE_URL, headers, getDataAvancedQuery} from "../Query/Query";
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

function Advanced() {

  const initialState = {
    dataSkripsi: [], // // Save the Result
    // Save the Keyword
    title: "",
    author: "",
    year: "",
    angkatan: "",
    guide: "",
    examiner: "",
  }

  const [value, setValue] = useState(initialState);
  const clearState = () => {
    setValue({ ...initialState });
  };

  const [searching, setSearching] = useState(false);

  const getData = async () => {

    // Query to get Data
    const queryData = getDataAvancedQuery(value);

    setSearching(true);

    scrollToSection("codes");
    console.log(searching);

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

  const handleChangeTitle = (event) => {
    setValue({
      ...value,
      title: event.target.value,
    });
  };

  const handleChangeAuthor = (event) => {
    setValue({
      ...value,
      author: event.target.value,
    });
  };

  const handleChangeGuide = (event) => {
    setValue({
      ...value,
      guide: event.target.value,
    });
  };

  const handleChangeExaminer = (event) => {
    setValue({
      ...value,
      examiner: event.target.value,
    });
  };

  const handleChangeYear = (event) => {
    setValue({
      ...value,
      year: event.target.value,
    });
  };

  const handleChangeAngkatan = (event) => {
    setValue({
      ...value,
      angkatan: event.target.value,
    });
  };

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
          NPM       : {skripsi.NPM}
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

  const temp = () => {
    scrollToSection("home");
  }

  function showKeyword () {
    return([
      value.title !== "" ?(<h4 className="result2-text "> - Title : " {value.title} "</h4>):(<></>),
      value.author !== "" ?(<h4 className="result2-text "> - Author : " {value.author} "</h4>):(<></>),
      value.guide !== "" ?(<h4 className="result2-text "> - Pembimbing : " {value.guide} "</h4>):(<></>),
      value.examiner !== "" ?(<h4 className="result2-text "> - Penguji : " {value.examiner} "</h4>):(<></>),
      value.year !== "" ?(<h4 className="result2-text "> - Tahun : " {value.year} "</h4>):(<></>),
      value.angkatan !== "" ?(<h4 className="result2-text "> - Angkatan : " {value.angkatan} "</h4>):(<></>)
    ])   
  }

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
                    <span className="nav_about_text active">
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
                                <div className="col-md-6">
                                  <div className="code_form_inputs align-items-center justify-content-center">
                                    <input
                                      id="myInput"
                                      type="text"
                                      className="code_form_input"
                                      placeholder="Title"
                                      setvalue={value.title}
                                      onChange={handleChangeTitle}
                                    />
                                  </div>
                                </div>
                                <div className="col-md-6">
                                  <div className="code_form_inputs align-items-center justify-content-center">
                                    <input
                                      type="text"
                                      className="code_form_input"
                                      placeholder="Author"
                                      setvalue={value.author}
                                      onChange={handleChangeAuthor}
                                    />
                                  </div>
                                </div>
                              </div>
                              <div className="row">
                                <div className="col-md-6">
                                  <div className="code_form_inputs align-items-center justify-content-center">
                                    <select
                                      setvalue={value.guide}
                                      className="custom_dd code_form_input"
                                      onChange={handleChangeGuide}
                                    >
                                      <option value="">Pembimbing</option>
                                      <option value="Prof. Dr. Atje Setiawan A.,MS, M.Kom.">Prof. Dr. Atje Setiawan A.,MS, M.Kom.</option>
                                      <option value="Dr. Setiawan Hadi, M.Sc.CS.">Dr. Setiawan Hadi, M.Sc.CS.</option>
                                      <option value="Drs. Akik Hidayat, M.Kom.">Drs. Akik Hidayat, M.Kom.</option>
                                      <option value="Dr. Juli Rejito, M.Kom.">Dr. Juli Rejito, M.Kom.</option>
                                      <option value="Dr. Asep Sholahuddin, MT.">Dr. Asep Sholahuddin, MT.</option>
                                      <option value="Drs. Ino Suryana, M.Kom.">Drs. Ino Suryana, M.Kom.</option>
                                      <option value="Drs. R. Sudrajat, M.Kom.">Drs. R. Sudrajat, M.Kom.</option>
                                      <option value="Akmal, S.Si., MT.">Akmal, S.Si., MT.</option>
                                      <option value="Erick Paulus, M.Kom.">Erick Paulus, M.Kom.</option>
                                      <option value="Deni Setiana,S.Si., M.CS.">Deni Setiana,S.Si., M.CS.</option>
                                      <option value="Rudi Rosadi, S.Si., M.Kom.">Rudi Rosadi, S.Si., M.Kom.</option>
                                      <option value="Dr. Intan Nurma Yulita, M.T.">Dr. Intan Nurma Yulita, M.T.</option>
                                      <option value="Aditya Pradana, S.T., M.Eng.">Aditya Pradana, S.T., M.Eng.</option>
                                      <option value="Mira Suryani, S.Pd., M.Kom.">Mira Suryani, S.Pd., M.Kom.</option>
                                      <option value="Dr. Afrida Helen, MT.">Dr. Afrida Helen, MT.</option>
                                    </select>
                                  </div>
                                </div>
                                <div className="col-md-6">
                                  <div className="code_form_inputs align-items-center justify-content-center">
                                    <select
                                      setvalue={value.examiner}
                                      className="custom_dd code_form_input"
                                      onChange={handleChangeExaminer}
                                    >
                                      <option value="">Penguji</option>
                                      <option value="Prof. Dr. Atje Setiawan A.,MS, M.Kom.">Prof. Dr. Atje Setiawan A.,MS, M.Kom.</option>
                                      <option value="Dr. Setiawan Hadi, M.Sc.CS.">Dr. Setiawan Hadi, M.Sc.CS.</option>
                                      <option value="Drs. Akik Hidayat, M.Kom.">Drs. Akik Hidayat, M.Kom.</option>
                                      <option value="Dr. Juli Rejito, M.Kom.">Dr. Juli Rejito, M.Kom.</option>
                                      <option value="Dr. Asep Sholahuddin, MT.">Dr. Asep Sholahuddin, MT.</option>
                                      <option value="Drs. Ino Suryana, M.Kom.">Drs. Ino Suryana, M.Kom.</option>
                                      <option value="Drs. R. Sudrajat, M.Kom.">Drs. R. Sudrajat, M.Kom.</option>
                                      <option value="Akmal, S.Si., MT.">Akmal, S.Si., MT.</option>
                                      <option value="Erick Paulus, M.Kom.">Erick Paulus, M.Kom.</option>
                                      <option value="Deni Setiana,S.Si., M.CS.">Deni Setiana,S.Si., M.CS.</option>
                                      <option value="Rudi Rosadi, S.Si., M.Kom.">Rudi Rosadi, S.Si., M.Kom.</option>
                                      <option value="Dr. Intan Nurma Yulita, M.T.">Dr. Intan Nurma Yulita, M.T.</option>
                                      <option value="Aditya Pradana, S.T., M.Eng.">Aditya Pradana, S.T., M.Eng.</option>
                                      <option value="Mira Suryani, S.Pd., M.Kom.">Mira Suryani, S.Pd., M.Kom.</option>
                                      <option value="Dr. Afrida Helen, MT.">Dr. Afrida Helen, MT.</option>
                                    </select>
                                  </div>
                                </div>
                              </div>
                              <div className="row">
                                <div className="col-md-6">
                                    <div className="code_form_inputs align-items-center justify-content-center">
                                      <select
                                        setvalue={value.year}
                                        className="custom_dd code_form_input"
                                        onChange={handleChangeYear}
                                      >
                                        <option value="">Tahun</option>
                                        <option value="2016">2016</option>
                                        <option value="2017">2017</option>
                                        <option value="2018">2018</option>
                                        <option value="2019">2019</option>
                                        <option value="2020">2020</option>
                                        <option value="2021">2021</option>
                                        <option value="2022">2022</option>
                                      </select>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                  <div className="code_form_inputs align-items-center justify-content-center">
                                    <select
                                      setvalue={value.angkatan}
                                      className="custom_dd code_form_input"
                                      onChange={handleChangeAngkatan}
                                    >
                                      <option value="">Angkatan</option>
                                      <option value="2012">2012</option>
                                      <option value="2013">2013</option>
                                      <option value="2014">2014</option>
                                      <option value="2015">2015</option>
                                      <option value="2016">2016</option>
                                      <option value="2017">2017</option>
                                      <option value="2018">2018</option>
                                    </select>
                                  </div>
                                </div>   
                              </div>
                              <div className="row">
                                <div className="col-md-12">
                                  <button
                                    type="button"
                                    className="custom_button code_form_button button"
                                    value="Search"
                                    onClick={getData}
                                  >
                                    <span>Search</span>
                                  </button>
                               
                                  <button
                                    type="reset"
                                    className="custom_button2 code_form_button button"
                                    onClick={clearState}
                                  >
                                    <span>Reset</span>
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
                                {showKeyword()}
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
                        <h3 className="result2-text ">Keyword : </h3>
                        {showKeyword()}
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

export default Advanced;
