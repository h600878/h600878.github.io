import * as React from "react";
import {linkStyle} from "../stylesheets/text.module.css";

const footerStyle = {
    position: "absolute",
    bottom: 0,
    color: "white",
    marginBottom: "10px",
}

const Footer = () => {
    return(
        <div style={footerStyle}>
            <p>Created using <a className={linkStyle} href={"https://www.gatsbyjs.com/"}>Gatsby.js</a></p>
        </div>
    )
}

export default Footer