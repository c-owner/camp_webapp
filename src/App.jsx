import 'assets/scss/index.scss';
import {Routes, Route} from "react-router-dom";
import Header from "layouts/ui/Header";
import Footer from 'layouts/ui/Footer';
import Main from "views/Main";
import Search from 'views/Search';
import Login from 'views/auth/Login';
import OnBoard from "./views/auth/OnBoard";

import {authCheck} from "./services/api/member";
import {Alert, Stack} from "@mui/material";
import Register from "./views/auth/Register";
import UndoIcon from "@mui/icons-material/Undo";

const check = authCheck("/auth").then(res => {
    if (res.data.status === 200) {
        return App();
    } else {
        return Auth();
    }
}).catch((err) => {
    console.log("err", err);
});

const Auth = () => {
    return (
        <div className="App">
            <div id="body" className="camp-app-body">
                <Routes>
                    <Route path="/" element={<OnBoard/>} />
                    <Route path="/register" element={<Register/>} />
                    <Route path="/login" element={<Login/>}/>
                </Routes>
            </div>
        </div>
    )
}

const App = () => {
    if (check) {
        return (
            Auth()
        );
    }

    return (
        <div className="App">
            <div>
                { <Header />}
            </div>

            <div id="body" className="camp-app-body">
                <Routes>
                    <Route path="/" element={<Main/>}/>
                    <Route path="/onboard" element={<OnBoard/>} />
                    <Route path="/register" element={<Register/>} />
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
