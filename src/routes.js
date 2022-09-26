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
import {RestoreViewConfirm} from "./views/RegisterView/RestoreViewConfirm";

export const renderRoutes = (routes = []) => {

    return (
        <Routes>


            <Route path="/" element={<MainLayout/>}>
                {/* public routes */}
                <Route path="login" element={
                    <Suspense
                        fallback={<LoadingScreen/>}>
                        <Login/>
                    </Suspense>
                }/>
                <Route path="register" element={
                    <Suspense
                        fallback={<LoadingScreen/>}>
                        <Register/>
                    </Suspense>}/>

                <Route path="restore" element={
                    <Suspense
                        fallback={<LoadingScreen/>}>
                        <JWTRestore/>
                    </Suspense>
                }/>



                <Route path="/restore/:key" element={
                    <Suspense
                        fallback={<LoadingScreen/>}>
                        <RestoreViewConfirm/>
                    </Suspense>}/>


                {/* we want to protect these routes */}
                <Route element={<AuthGuard/>}>
                    <Route path="/" element={
                        <Suspense
                            fallback={<LoadingScreen/>}><Desktop/>
                        </Suspense>
                    }/>
                </Route>

                {/* catch all */}
                <Route path="*" element={
                    <Suspense
                        fallback={<LoadingScreen/>}>
                        <NotFoundView/>
                    </Suspense>}/>
            </Route>
        </Routes>
    )
};




