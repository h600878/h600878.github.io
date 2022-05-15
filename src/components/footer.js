import * as React from "react";
import {Link, useI18next, useTranslation} from "gatsby-plugin-react-i18next";
import {linkStyle} from "../stylesheets/text.module.css";

const footerStyle = {
    position: "absolute",
    bottom: 0,
    width: "100%",
    textAlign: "center",
    marginBottom: "10px",
}

const Footer = () => {

    const {languages, originalPath} = useI18next();

    let lang = undefined, otherLang = undefined;
    if (typeof localStorage !== "undefined") {

        lang = localStorage.getItem("gatsby-i18next-language");
        if (navigator.language === "nb" || navigator.language === "nn" || navigator.language === "no") { //TODO get from browser
            //lang = "no";
            //localStorage.setItem("gatsby-i18next-language", lang);
        }
        otherLang = lang === languages[0] ? languages[1] : languages[0];
    }

    const {t} = useTranslation();

    return (
        <div style={footerStyle}>
            <div>
                <p>
                    {t("changeLang")}
                    <Link className={linkStyle} to={originalPath}
                          language={otherLang}>{otherLang}</Link>
                </p>
            </div>
            <p>{t("createdWith")}<a className={linkStyle} href={"https://www.gatsbyjs.com/"} target={"_blank"}
                            rel={"noreferrer"}>Gatsby.js</a></p>
            <p>{t("iconsFrom")}<a className={linkStyle} href={"https://feathericons.com/"} target={"_blank"}
                             rel={"noreferrer"}>FeatherIcons</a></p>
        </div>
    );
}

export default Footer
