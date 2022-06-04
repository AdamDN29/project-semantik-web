import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import qs from "qs";

export const BASE_URL = "http://localhost:3030/dataSkripsi/query";

export const headers = {
  Accept: "application/sparql-results+json,*/*;q=0.9",
  "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
};

export const getDataQuery = (value) => {
    return {
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
            regex(?id, "${value}", "i") ||
            regex(?title, "${value}", "i") ||
            regex(?author, "${value}", "i") ||
            regex(?NPM, "${value}", "i") ||
            regex(?year, "${value}", "i") ||
            regex(?angkatan, "${value}", "i") ||
            regex(?guide1, "${value}", "i") ||
            regex(?guide2, "${value}", "i") ||
            regex(?guide1, "${value}", "i") ||
            regex(?examiner1, "${value}", "i") ||
            regex(?examiner2, "${value}", "i") ||
            regex(?examiner3, "${value}", "i")
          )
    }`,
    }
  };

  export const getAllDataQuery = () => {
    return {
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
    }
  };

  export const getRandomDataQuery = () => {
    return {
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
    }
  };

  export const getFromNewstQuery = () => {
    return {
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
    }
  };

  export const getDataAvancedQuery = (value) => {
    return {
      query: `PREFIX data: <https://skripsiKu.com/data#>
      PREFIX id: <https://skripsiKu.com/skripsi#>
      PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
      SELECT ?no ?title ?author ?NPM ?year ?angkatan ?guide1 ?guide2 ?examiner1 ?examiner2 ?examiner3
      WHERE
      {
        ?id data:no ?no ;
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
            
            FILTER contains(lcase(str(?title)), lcase(str("${
              value.title ? value.title : ""
            }")))
            FILTER contains(lcase(str(?author)), lcase(str("${
              value.author ? value.author : ""
            }")))
            FILTER contains(lcase(str(?NPM)), lcase(str("${
              value.NPM ? value.NPM : ""
            }")))
            FILTER contains(lcase(str(?year)), lcase(str("${
              value.year ? value.year : ""
            }")))
            FILTER contains(lcase(str(?angkatan)), lcase(str("${
              value.angkatan ? value.angkatan : ""
            }")))
            FILTER (
              contains(lcase(str(?guide1)), lcase(str("${value.guide ? value.guide : ""}"))) ||
              contains(lcase(str(?guide2)), lcase(str("${value.guide ? value.guide : ""}")))
            )
           
            FILTER (
              contains(lcase(str(?examiner1)), lcase(str("${value.examiner ? value.examiner : ""}"))) ||
              contains(lcase(str(?examiner2)), lcase(str("${value.examiner ? value.examiner : ""}"))) ||
              contains(lcase(str(?examiner3)), lcase(str("${value.examiner ? value.examiner : ""}")))
            )      
      }
      ORDER BY ASC (?no)`,
    }
  };