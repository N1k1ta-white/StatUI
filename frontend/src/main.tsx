import { createRoot } from 'react-dom/client'
import './index.css'
import { Provider } from "react-redux";
import store, { persistor } from "@/store/store.ts";
import App from './App.tsx'
import { PersistGate } from 'redux-persist/integration/react';
import {Loader} from "lucide-react";


createRoot(document.getElementById('root')!).render(
    <Provider store={store}>
        <PersistGate loading={<Loader/>} persistor={persistor}>
            <App />
        </PersistGate>
    </Provider>
)
