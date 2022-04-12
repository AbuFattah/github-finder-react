import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import { Route, Routes } from "react-router-dom";
import NotFound from "./pages/NotFound";
import Home from "./pages/Home";
import { GithubProvider } from "./context/github/GithubContext";
import User from "./pages/User";
function App() {
  return (
    <GithubProvider>
      <div className="App">
        <Header></Header>
        <main
          style={{ minHeight: "90vh" }}
          className="container px-4 py-5 mx-auto "
        >
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="*" element={<NotFound />}></Route>
            <Route path="/notfound" element={<NotFound />}></Route>
            <Route path="/user/:login" element={<User />}></Route>
          </Routes>
        </main>
        <Footer />
      </div>
    </GithubProvider>
  );
}

export default App;
