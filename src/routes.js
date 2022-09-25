import {
    Suspense,
} from 'react';
import {
    Routes,
    Route
} from 'react-router-dom';
import {LoadingScreen} from "./components/LoadingScreen";
import {MainLayout} from "./layouts/MainLayout/MainLayout";
import {NotFoundView} from "./views/NotFound/NotFoundView";
import Login from "./views/LoginView/Login";
import {Register} from "./views/RegisterView/Register";
import {Desktop} from "./views/Desktop/Desktop";
import AuthGuard from "./api/interceptors";
import JWTRestore from "./views/RegisterView/RestoreView";

export const renderRoutes = (routes = []) => {

    return (
        <Routes>


            <Route path="/" element={<MainLayout/>}>
                {/* public routes */}
                <Route path="login" element={<Suspense
                    fallback={<LoadingScreen/>}><Login/></Suspense>}/>
                <Route path="register" element={<Suspense
                    fallback={<LoadingScreen/>}><Register/></Suspense>}/>

                <Route path="restore" element={<Suspense
                    fallback={<LoadingScreen/>}><JWTRestore/></Suspense>}/>



                {/* we want to protect these routes */}
                <Route element={<AuthGuard/>}>
                    <Route path="/" element={<Suspense
                        fallback={<LoadingScreen/>}><Desktop/></Suspense>}/>
                </Route>

                {/* catch all */}
                <Route path="*" element={<Suspense
                    fallback={<LoadingScreen/>}><NotFoundView/></Suspense>}/>
            </Route>


            {/*<Route path="/" element={<MainLayout/>}>*/}
            {/*    <Route index element={<Suspense*/}
            {/*        fallback={<LoadingScreen/>}><AuthPrivateRout>*/}

            {/*        <Desktop/>*/}

            {/*    </AuthPrivateRout></Suspense>}></Route>*/}
            {/*    <Route path="register" element={<Suspense fallback={<LoadingScreen/>}><Register/></Suspense>}></Route>*/}
            {/*    <Route path="login" element={<Suspense fallback={<LoadingScreen/>}> <Login/></Suspense>}></Route>*/}
            {/*    <Route path="*" element={<NotFoundView/>}></Route>*/}
            {/*    <Route path="error" element={<Suspense fallback={<LoadingScreen/>}><NotFoundView/></Suspense>}> </Route>*/}
            {/*</Route>*/}


        </Routes>
    )
};




