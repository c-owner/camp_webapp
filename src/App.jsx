import 'assets/scss/index.scss';
import {Routes, Route} from "react-router-dom";
import Header from "layouts/ui/Header";
import Footer from 'layouts/ui/Footer';
import Main from "views/Main";
import Search from 'views/Search';
import Login from 'views/auth/Login';
import OnBoard from "./views/auth/OnBoard";

function App() {


    return (
        <div className="App">

            <div>
                { <Header/>}
            </div>

            <div id="body" className="camp-app-body">
                <Routes>
                    <Route path="/" element={<Main/>}/>
                    <Route path="/onboard" element={<OnBoard/>} />
                    <Route path="/login" element={<Login/>}/>
                    <Route path="/search" element={<Search/>}/>
                </Routes>
            </div>
            <div>
                {<Footer/>}
            </div>
        </div>
    );
}

export default App;
