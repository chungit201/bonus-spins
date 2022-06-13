import React from 'react';
import {BrowserRouter,Routes,Route} from "react-router-dom";
import HomePage from "./pages/home";
import 'animate.css';
import 'antd/dist/antd.min.css'
import LoginPage from "./pages/login";
import LoadData from "./components/load-data/LoadData";
function App() {
  return (
    <div>
          <div className="App">
            <LoadData>
              <BrowserRouter>
                {/*------LayOut ----------------*/}
                <Routes>
                  <Route path="/" element={<HomePage/>}></Route>
                  <Route path="/login" element={<LoginPage/>}></Route>
                </Routes>
              </BrowserRouter>
            </LoadData>
          </div>

    </div>
  );
}

export default App;
