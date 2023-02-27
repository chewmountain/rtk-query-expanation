import "./App.css";
// Наш компонент, в котором будем получать данные и использовать их
import { Data } from "./Data";
// Чтобы мы могли использовать наш api, мы должны оберунть приложение в ApiProvider и передать туда наш api
import { ApiProvider } from "@reduxjs/toolkit/query/react";
import { productsApi } from "./features/apiSlice";

const App = () => {
    return (
        <ApiProvider api={productsApi}>
            <div>
                <Data />
            </div>
        </ApiProvider>
    );
};

export default App;
