import './assets/css/App.css';
import './assets/scss/index.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Main from "./views/Main";
import Header from "./components/Header"

function App() {
    return (
        <div className="App">
            <Header></Header>
            <div id="header">
                {/*<header className="App-header"></header>*/}
            </div>
            <div id="body" className="tft-app-body">
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<Main/>}/>
                    </Routes>
                </BrowserRouter>
            </div>
            <div id="footer"></div>
        </div>
    );
}

export default App;
