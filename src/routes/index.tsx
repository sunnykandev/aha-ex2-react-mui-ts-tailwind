import { BrowserRouter, Route, Routes } from "react-router-dom";

import Layout from "../views/layout";
import Home from "../views/pages/home";
import SearchResult from "../views/pages/searchResult";
import Tags from "../views/pages/tags";

export default function Root() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="home" element={<Home />} />
          <Route path="result" element={<SearchResult />} />
          <Route path="tags" element={<Tags />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
