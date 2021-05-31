import React from "react";
import ReactDOM from "react-dom";
import { ThemeProvider } from "@material-ui/styles";
import { CssBaseline } from "@material-ui/core";

import store from "./store";

import Themes from "./themes";

import * as serviceWorker from "./serviceWorker";
import { Provider } from "react-redux";

import "./index.css";

import InfoModal from "components/pages/Information/InfoModal";

let theme = Themes.default;

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <Provider store={store}>
      <InfoModal
        open={true}
        jobActions={{}}
        endpoint={"images"}
        infoModalType={"issue"}
        job={{
          uuid: "938002b1-5cf1-42cd-9c62-72a13297b550",
          product: {
            uuid: "ce9315c5-1267-4c2a-a942-ccca8e661af9",
            upc: "00815154020008",
            name: "NOS",
            measurement: {
              width: 2,
              height: 1,
              depth: 3,
              volume: 0,
              weight: 0,
            },
          },
          images: [
            {
              uuid: "625bd887-63c6-4618-8fca-a0ac322e4afd",
              productUuid: "ce9315c5-1267-4c2a-a942-ccca8e661af9",
              sourceModelUuid: null,
              filename: "IMG_2913.2.jpg",
              extension: "jpg",
              ext: "jpg",
              folder: "images",
              face: 2,
              orientation: 2,
              format: null,
              source: "reference",
              size: 533211,
              isPlanogram: false,
              createdAt: "2021-05-30T21:11:31.559328+00:00",
              updatedAt: "2021-05-30T21:11:31.559328+00:00",
              deletedAt: null,
              url: "https://storage.googleapis.com/core-345-assets-dev",
              baseUrl: "https://storage.googleapis.com/core-345-assets-dev",
            },
            {
              uuid: "c9f4e52c-a34d-4fd6-a4cd-2a1cd9b3a320",
              productUuid: "ce9315c5-1267-4c2a-a942-ccca8e661af9",
              sourceModelUuid: null,
              filename: "IMG_2914.1.jpg",
              extension: "jpg",
              ext: "jpg",
              folder: "images",
              face: 1,
              orientation: 0,
              format: null,
              source: "reference",
              size: 764666,
              isPlanogram: false,
              createdAt: "2021-05-30T21:11:31.537373+00:00",
              updatedAt: "2021-05-30T21:11:31.537373+00:00",
              deletedAt: null,
              url: "https://storage.googleapis.com/core-345-assets-dev",
              baseUrl: "https://storage.googleapis.com/core-345-assets-dev",
            },
            {
              uuid: "432f6ed6-f692-4bb7-b8ab-53460ac81488",
              productUuid: "ce9315c5-1267-4c2a-a942-ccca8e661af9",
              sourceModelUuid: null,
              filename: "IMG_2911.7.jpg",
              extension: "jpg",
              ext: "jpg",
              folder: "images",
              face: 7,
              orientation: 6,
              format: null,
              source: "reference",
              size: 1016226,
              isPlanogram: false,
              createdAt: "2021-05-30T21:11:31.568997+00:00",
              updatedAt: "2021-05-30T21:11:31.568997+00:00",
              deletedAt: null,
              url: "https://storage.googleapis.com/core-345-assets-dev",
              baseUrl: "https://storage.googleapis.com/core-345-assets-dev",
            },
            {
              uuid: "407b4124-3788-49de-9c22-1610e22968eb",
              productUuid: "ce9315c5-1267-4c2a-a942-ccca8e661af9",
              sourceModelUuid: null,
              filename: "IMG_2910.8.jpg",
              extension: "jpg",
              ext: "jpg",
              folder: "images",
              face: 8,
              orientation: 8,
              format: null,
              source: "reference",
              size: 1407341,
              isPlanogram: false,
              createdAt: "2021-05-30T21:11:31.578587+00:00",
              updatedAt: "2021-05-30T21:11:31.578587+00:00",
              deletedAt: null,
              url: "https://storage.googleapis.com/core-345-assets-dev",
              baseUrl: "https://storage.googleapis.com/core-345-assets-dev",
            },
            {
              uuid: "d25f5ed3-3477-4574-a4ca-2fb4f2792aa8",
              productUuid: "ce9315c5-1267-4c2a-a942-ccca8e661af9",
              sourceModelUuid: null,
              filename: "IMG_2912.3.jpg",
              extension: "jpg",
              ext: "jpg",
              folder: "images",
              face: 3,
              orientation: 4,
              format: null,
              source: "reference",
              size: 1713541,
              isPlanogram: false,
              createdAt: "2021-05-30T21:11:31.591228+00:00",
              updatedAt: "2021-05-30T21:11:31.591228+00:00",
              deletedAt: null,
              url: "https://storage.googleapis.com/core-345-assets-dev",
              baseUrl: "https://storage.googleapis.com/core-345-assets-dev",
            },
            {
              uuid: "f1b5f8da-904d-4ff6-bde6-0e952054ad1d",
              productUuid: "ce9315c5-1267-4c2a-a942-ccca8e661af9",
              sourceModelUuid: null,
              filename: "IMG_2909.9.jpg",
              extension: "jpg",
              ext: "jpg",
              folder: "images",
              face: 9,
              orientation: 10,
              format: null,
              source: "reference",
              size: 4658714,
              isPlanogram: false,
              createdAt: "2021-05-30T21:11:31.627109+00:00",
              updatedAt: "2021-05-30T21:11:31.627109+00:00",
              deletedAt: null,
              url: "https://storage.googleapis.com/core-345-assets-dev",
              baseUrl: "https://storage.googleapis.com/core-345-assets-dev",
            },
          ],
          createdAt: "2021-05-30T19:37:23.561967+00:00",
          updatedAt: "2021-05-30T21:11:36.998894+00:00",
          models: [],
          selected: true,
        }}
      />
    </Provider>
  </ThemeProvider>,
  document.getElementById("root"),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
