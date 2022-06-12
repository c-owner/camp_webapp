import './assets/css/App.css';
import './assets/scss/index.scss';
import './assets/css/reset.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Main from "./views/Main";
import Header from "./components/Header"
import Footer from './components/Footer';

function App() {
    return (
        <div className="App">
            <div id="header">
                {<Header className="App-header"></Header>}
            </div>
            <div id="body" className="camp-app-body">
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<Main/>}/>
                    </Routes>
                </BrowserRouter>
            </div>
            <div id="footer">
                {<Footer className="App-footer"></Footer>}
            </div>
        </div>
    );
}

export default App;
