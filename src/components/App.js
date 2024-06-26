import React, { useEffect, useState } from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Main from '../routes/Main';
import Plays from '../routes/Plays';
import PlaysDetail from '../components/PostView/PlaysDetail';
import Studys from '../routes/Studys';
import StudysDetail from '../components/PostView/StudysDetail';
import Minds from '../routes/Minds';
import MindsDetail from './PostView/MindsDetail';
import Login from '../routes/Login';
import Signup from '../routes/Signup';
import S_create from '../routes/S_create';
import P_create from '../routes/P_create';
import M_create from '../routes/M_create';

import Mypage from '../routes/Mypage';
import ProtectedRoute from './ProtectedRoute';

const App = () => {
    const [isLoggedIn, setIsLoggedIn] = useState('');

    const setLoginStateTrue = () => {
        setIsLoggedIn(true);
        localStorage.setItem('isLoggedIn', 'true');
    };

    const setLoginStateFalse = () => {
        setIsLoggedIn(false);
        localStorage.removeItem('isLoggedIn');
    };

    useEffect(() => {
        const storedIsLoggedIn = localStorage.getItem('isLoggedIn');
        if (storedIsLoggedIn !== undefined && storedIsLoggedIn !== isLoggedIn) {
            setIsLoggedIn(storedIsLoggedIn === 'true');
        }
    }, [isLoggedIn]);

    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route exact path="/" element={<Main />} />
                    <Route path="/plays" element={<Plays />} />
                    <Route path="/plays/:id" element={<PlaysDetail />} />
                    <Route path="/studys" element={<Studys />} />
                    <Route path="/studys/:id" element={<StudysDetail />} />
                    <Route path="/minds" element={<Minds />} />
                    <Route path="/minds/:id" element={<MindsDetail />} />
                    <Route
                        path="/login"
                        element={
                            <Login
                                setLoginStateTrue={setLoginStateTrue}
                                isLoggedIn={isLoggedIn}
                            />
                        }
                    />
                    <Route path="/signup" element={<Signup />} />

                    <Route
                        path="/studys/create/"
                        element={
                            <ProtectedRoute
                                isLoggedIn={isLoggedIn}
                                component={S_create}
                            />
                        }
                    />
                    <Route
                        path="/minds/create/"
                        element={
                            <ProtectedRoute
                                isLoggedIn={isLoggedIn}
                                component={M_create}
                            />
                        }
                    />
                    <Route
                        path="/plays/create/"
                        element={
                            <ProtectedRoute
                                isLoggedIn={isLoggedIn}
                                component={P_create}
                            />
                        }
                    />

                    <Route
                        path="/mypage"
                        element={
                            <ProtectedRoute
                                setLoginStateFalse={setLoginStateFalse}
                                isLoggedIn={isLoggedIn}
                                component={Mypage}
                            />
                        }
                    />

                    {/* <Route
                        path="*"
                        element={<Navigate to={`${process.env.PUBLIC_URL}/`} />}
                    /> */}
                </Routes>
            </BrowserRouter>
        </>
    );
};

export default App;
