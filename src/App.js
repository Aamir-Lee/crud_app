import React from "react";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import MainData from "./Components/MainData";
import FormData from "./Components/FormData";
import PaginatedItems from "./Components/PaginatedItems";
import {Route,Routes} from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Header/>
      <PaginatedItems/>
        <Routes>
          {/* <Route path='/' element={<MainData/>}></Route> */}
          <Route path='/form' element={<FormData/>}></Route>
          <Route path='/form/:id' element={<FormData/>}></Route>
        </Routes>
        
      <Footer/>
    </div>
  );
}

export default App;
