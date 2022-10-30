import { createContext } from "react";
import locales from "../config/locales";

const LanguageContext = createContext({
    locale: locales.EN
});

export default LanguageContext;
