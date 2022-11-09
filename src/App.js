import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Page from "./Screens/Page/Page";
import Login from "./Screens/Login/Login";
import Register from "./Screens/Register/Register";
import Create from "./Screens/Create/Create";
import Tokyo from "./Layout/Tokyo/Tokyo";
import { Splash } from "./Screens/Splash/Splash";
import Dashboard from "./Screens/Dashboard/Dashboard";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";
import store from "./Redux/store";
import { Provider } from "react-redux";
import Homepage from "./Screens/Homepage/Homepage";
import Editor from "./Screens/Editor/Editor";
let persistor = persistStore(store);
function App() {
    return (
        <Router>
            <Provider store={store}>
                <PersistGate persistor={persistor}>
                    <Routes>
                        <Route
                            path="/"
                            exact
                            element={
                                <Page>
                                    <Homepage />
                                </Page>
                            }
                        />
                        <Route
                            path="/login"
                            exact
                            element={
                                <Page>
                                    <Login />
                                </Page>
                            }
                        />
                        <Route
                            path="/register"
                            exact
                            element={
                                <Page>
                                    <Register />
                                </Page>
                            }
                        />
                        <Route
                            path="/create"
                            exact
                            element={
                                <Page authenticate={true}>
                                    <Create />
                                </Page>
                            }
                        />

                        <Route
                            path="/u/:url"
                            exact
                            element={
                                <Splash>
                                    <Tokyo />
                                </Splash>
                            }
                        />

                        <Route
                            path="/amy/:theme"
                            exact
                            element={
                                <Splash>
                                    <Tokyo />
                                </Splash>
                            }
                        />

                        <Route
                            path="/dashboard"
                            exact
                            element={
                                <Page authenticate={true}>
                                    <Dashboard />
                                </Page>
                            }
                        />

                        <Route
                            path="/edit"
                            exact
                            element={
                                <Page authenticate={true}>
                                    <Create edit={true} />
                                </Page>
                            }
                        />

                        <Route path="/editor" exact element={<Editor />} />
                    </Routes>
                </PersistGate>
            </Provider>
        </Router>
    );
}

export default App;
