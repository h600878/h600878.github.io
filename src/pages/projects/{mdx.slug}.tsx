import * as React from "react";
import Layout from "../../components/layout";
import { graphql, PageProps } from "gatsby";
import { MDXRenderer } from "gatsby-plugin-mdx";
import {GatsbyImage, getImage, IGatsbyImageData, ImageDataLike} from "gatsby-plugin-image";

/**
 * A single post containing all the data from an mdx file
 * @param data A query containing all the data from a single post
 * @returns {JSX.Element}
 * @constructor
 */
const ProjectPost = ({data: {mdx}}: PageProps<Queries.ProjectPostQuery>) => {

    let heroImage: IGatsbyImageData | undefined, heroImageAlt: string | null | undefined,
        description: string | null | undefined, title: string | undefined, source: string | null | undefined,
        heroImageData: Record<string, unknown> | undefined;
    if (mdx !== null) {
        heroImageData = mdx.frontmatter?.hero_image?.childImageSharp?.gatsbyImageData;
        heroImage = typeof heroImageData !== 'undefined' ? getImage(heroImageData as ImageDataLike) : undefined;
        heroImageAlt = mdx.frontmatter?.hero_image_alt;
        title = mdx.frontmatter?.title;
        description = mdx.frontmatter?.description;
        source = mdx.frontmatter?.source;
    }

    return (
        <>
            <Layout
                title={ typeof title === 'string' ? title : "Blogpost" }
                headline={ title }
                description={ typeof description === 'string' ? description : "A blogpost by Martin Berg Alstad" }>
                <article>
                    { heroImage && typeof heroImageAlt === 'string' ?
                        <GatsbyImage alt={ heroImageAlt } image={ heroImage }/> : null }
                    <p>{ description }</p>
                    <p>
                        Kildekoden på{ " " }
                        <a className={ "text-primaryPurple dark:text-primaryPink hover:underline" }
                           href={ typeof source === 'string' || typeof source === 'undefined' ? source : undefined }
                           target={ "_blank" } rel={ "noreferrer" }>GitHub</a>
                    </p>
                    <div className={ "mt-2" }>
                        <MDXRenderer>{ mdx !== null ? mdx.body : "Something went wrong! mdx=" + mdx }</MDXRenderer>
                    </div>
                </article>
            </Layout>
        </>
    );
}

export default ProjectPost;

export const query = graphql `
    query ProjectPost($id: String, $language: String!) {
        locales: allLocale(filter: {language: {eq: $language}}) {
            edges {
                node {
                    ns
                    data
                    language
                }
            }
        }
        mdx(id: {eq: $id}) {
            frontmatter {
                hero_image {
                    childImageSharp {
                        gatsbyImageData
                    }
                }
                title
                description
                source
                hero_image_alt
            }
            timeToRead
            body
        }
    }
`;