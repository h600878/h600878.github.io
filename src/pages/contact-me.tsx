import * as React from "react";
import Layout, { Links } from "../components/layout";
import { Send, Linkedin, GitHub } from "react-feather";
import { graphql } from "gatsby";
import { useTranslation } from "gatsby-plugin-react-i18next";
import Input, { TextArea } from "../components/input";

const inputStyle = "w-full max-w-full h-10 min-h-fit max-h-64 resize-y rounded-lg mb-3 pt-2 shadow";

const links = [
    {
        id: 0,
        to: "https://www.linkedin.com/in/martin-b-2a69391a3",
        name: "LinkedIn",
        icon: <Linkedin/>
    },
    {
        id: 1,
        to: "https://github.com/h600878",
        name: "GitHub",
        icon: <GitHub/>
    }
];

/**
 * Contact-me element containing socials and a form linked to Formspree
 * @returns {JSX.Element}
 * @constructor
 */
const ContactMe = () => {

    function handleSubmit() { // TODO
        Array.from(document.querySelectorAll("input")).forEach(input => input.value = ""); //Clears inputs
        const element = document.getElementById("contact-me-text-area") as HTMLInputElement; //Clears textArea
        if (element !== null) {
            element.value = "";
        }
    }


    React.useEffect(() => {
        let isMounted = true;
        const submitKeys = (e: KeyboardEvent) => {
            if (isMounted && e.ctrlKey && e.key === "Enter") {
                //Activates button if ctrl and enter is clicked at the same time
                const element = document.getElementById("submit-button");
                if (element !== null) {
                    element.click();
                }
            }
        }
        const postSubmit = (e: SubmitEvent, form: HTMLFormElement) => {
            if (isMounted) {
                window.open("https://formspree.io/f/mknykgbn", "_blank");
                form.reset();
            }
        }
        const form = document.getElementById("form") as HTMLFormElement | null;
        //form?.addEventListener("submit", (e) => postSubmit(e, form));
        document.addEventListener("keyup", (e) => submitKeys(e));
        return () => {
            document.removeEventListener("keyup", (e) => submitKeys(e));
            //form?.removeEventListener("submit", (e) => postSubmit(e, form));
            isMounted = false;
        };
    });

    const { t } = useTranslation();

    return (
        <Layout
            title={ t("contactMe") }
            description={ t("contactMeDescription") /*TODO add translation*/ }
            current={ Links.contactMe }>
            <>
                <div className={ "flex justify-center pb-2" }>
                    {
                        links.map(link => (
                            <div className={ "px-2" } key={ link.id }>
                                <a title={ link.name } href={ link.to } target={ "_blank" } rel={ "noreferrer" }>
                                    { link.icon }
                                </a>
                            </div>
                        ))
                    }
                </div>
                <form acceptCharset={ "UTF-8" }
                      id={ "form" }
                      target={ "_blank" }
                      action={ "https://formspree.io/f/mknykgbn" }
                      method={ "post" }>
                    <div className={ "flex justify-between flex-col sm:flex-row" }>
                        <FormInput title={ t("yourName") } name={ "name" } id={ "inputName" } type={ "text" }/>
                        <FormInput title={ t("subject") } name={ "subject" } id={ "inputSubject" } type={ "text" }/>
                    </div>
                    <FormInput title={ t("yourEmail") } name={ "_replyto" } id={ "inputEmail" } type={ "email" }/>
                    <TextArea title={ t("message") }
                              required={ true }
                              name={ "message" }
                              id={ "contact-me-text-area" }
                              className={ `pl-2 min-h-[3rem] h-24 dark:bg-gray-900 focus:border-primaryPurple outline-none
                                   border-2 border-gray-500 ${ inputStyle }` }/>
                    <input name="_gotcha" type="text" className={ "hidden" }/> { /*Honeypot spam filter*/ }
                    <button id={ "submit-button" } className={ "float-right" }
                            title={ "Send" }
                            name={ "submit" }
                            type={ "submit" }>
                        <Send/>
                        <p className={ "hidden" }>Send</p>
                    </button>
                </form>
            </>
        </Layout>
    );
}

export const query = graphql`
    query($language: String!) {
        locales: allLocale(filter: {language: {eq: $language}}) {
            edges {
                node {
                    ns
                    data
                    language
                }
            }
        }
    }
`;

export default ContactMe;

interface FormInput {
    name?: string,
    id?: string,
    type?: string,
    title: string,
    className?: string
}

const FormInput = ({ name, id, type, title, className }: FormInput) => {
    return (
        <Input className={ `${ inputStyle } ${ className }` }
               name={ name }
               id={ id }
               type={ type }
               title={ title }
               required={ true }/>
    );
};
