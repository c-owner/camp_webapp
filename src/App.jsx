import 'assets/scss/index.scss';
import { Routes, Route } from "react-router-dom";
import Header from "layouts/ui/Header";
import Footer from 'layouts/ui/Footer';
import Main from "views/Main";
import Search from 'views/Search';
import Login from 'views/auth/Login';

function App() {

    return (
        <div className="App">
            <div id="header" className="pa15 p-fixed w100p">
                {<Header />}
            </div>
            <div id="body" className="camp-app-body pt80 mb80">
                <Routes>
                    <Route path="/" element={<Main />} />
                    <Route path="/auth" element={<Login />} />
                    <Route path="/search" element={<Search/>}/>
                </Routes>
            </div>
            <div id="footer">
                {<Footer />}
            </div>
        </div>
    );
}

export default App;
