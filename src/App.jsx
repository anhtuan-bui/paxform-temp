import { BrowserRouter, Routes, Route } from "react-router-dom";

import { lazy, Suspense, useEffect } from "react";
import { ApolloProvider } from "@apollo/client/react";
import client from "./configurations/apollo";
import getToken from "./lib/clientToken";

import Layout from "./pages/Layout/Layout";
// import Legal from "./pages/Legal/Legal";
// import Home from "./pages/Home/Home";
// import ContactUs from "./pages/ContactUs/ContactUs";
// import NotFound from "./pages/NotFound/NotFound";

import { createTheme, ThemeProvider } from "@mui/material";

import Inter from "./assets/fonts/Inter/static/Inter-Regular.ttf";

const Home = lazy(() => import("./pages/Home/Home"));
const ContactUs = lazy(() => import("./pages/ContactUs/ContactUs"));
const DataRequestForm = lazy(() => import("./pages/DataRequest/DataRequest"));
const NotFound = lazy(() => import("./pages/NotFound/NotFound"));
const Legal = lazy(() => import("./pages/Legal/Legal"));
const DealfollowFormTest = lazy(() =>
  import("./pages/DealfollowFormTest/DealfollowFormTest")
);

const theme = createTheme({
  typography: {
    fontFamily: "Inter, Arial, sans-serif",
    fontSize: 16,
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: `
        @font-face {
          font-family: 'Inter';
          font-style: normal;
          font-weight: 400;
          src: local('Inter'), local('Inter-Regular'), url(${Inter}) format('ttf');
        }
      `,
    },
  },
});

function App() {
  const MINUTE_MS = 300000;

  getToken();
  useEffect(() => {
    const interval = setInterval(() => {
      localStorage.removeItem("clientToken");
      getToken();
    }, MINUTE_MS);

    return () => {
      clearInterval(interval);
    };
  });

  return (
    <ThemeProvider theme={theme}>
      <ApolloProvider client={client}>
        <BrowserRouter>
          <Suspense>
            <Routes>
              <Route path="/" element={<Layout />}>
                <Route index element={<Home />} />
                <Route path="/legal" element={<Legal />} />
                <Route path="/contact" element={<ContactUs />} />
                <Route path="/data-subject-access-request-form" element={<DataRequestForm />} />
                <Route
                  path="/dealfollow-form-test"
                  element={<DealfollowFormTest />}
                />
                <Route path="/legal/:slug" element={<Legal />} />
                <Route path="/legal/:categorySlug/:slug" element={<Legal />} />
                <Route path="*" element={<NotFound />} />
              </Route>
            </Routes>
          </Suspense>
        </BrowserRouter>
      </ApolloProvider>
    </ThemeProvider>
  );
}

export default App;
