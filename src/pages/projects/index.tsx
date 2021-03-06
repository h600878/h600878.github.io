import * as React from "react";
import { ChangeEvent } from "react";
import Layout, { Links } from "../../components/layout";
import { graphql, PageProps } from "gatsby";
import { useTranslation } from "gatsby-plugin-react-i18next";
import { TagsSelector } from "../../components/tags";
import Search from "../../components/search";
import ProjectCard from "../../components/project";

/**
 * Takes a String in a csv format, separated by ";" and returns an array of strings
 * @param csv A String representation of a csv file, with ; as separator
 * @returns {string[]} An array of strings, in the order the strings in the 'csv' string was
 */
export const splitCSV = (csv: string) => csv.split(";");

/**
 * Contains cards of all projects with some information, and links to the posts
 * @param data A query containing data from the posts
 * @returns {JSX.Element} A page
 * @constructor
 */
const ProjectPage = ({ data: { allMdx } }: PageProps<Queries.ProjectPageQuery>): JSX.Element => { // TODO search

    const { t } = useTranslation();

    /**
     * The name of the tag, used to show all posts
     */
    const ALL_TAG = t("all");

    /**
     * The state used to mark the current selected tag
     */
    const [selectedTag, setSelectedTag] = React.useState(ALL_TAG);

    /**
     * This state contains the current search string
     */
    const [searchState, setSearchState] = React.useState("");

    /**
     * This state contains an array of all the tags of the posts that fit the current search crtieria
     */
    const [nodes, setNodes] = React.useState(allMdx.nodes);

    // TODO? the option to select multiple tags to improve search, use string[] in useState
    const tagMap: any[] = [];
    let objectIndex = 0;
    for (const tag of nodes) {

        const tagArray = splitCSV(tag.frontmatter?.tags ?? "");
        if (tagArray) {

            for (const tagInArray of tagArray) {
                let found = false;
                for (const tagInMap of tagMap) {
                    if (tagInArray.toLowerCase() === tagInMap.key.toLowerCase()) {
                        tagInMap.value++;
                        found = true;
                    }
                }
                if (!found) {
                    tagMap[objectIndex] = {
                        key: tagInArray,
                        value: 1,
                    };
                    objectIndex++;
                }
            }
        }
    }

    // Sorts the map by value, then by name
    tagMap.sort((a: any, b: any) => {
        let sum: number;
        if (b.value !== a.value) {
            sum = b.value - a.value;
        }
        else {
            if (a.key > b.key) {
                sum = 1;
            }
            else {
                sum = -1;
            }
        }
        return sum;
    });

    /**
     * Updates the state of the current selected tag to a new one. If the new one is the same as the old, reset.
     * @param key The key for the new tag
     */
    function updateTagState(key: string): void {
        if (selectedTag === key || key === ALL_TAG) { // Resets tags
            setSelectedTag(ALL_TAG);
            setNodes(allMdx.nodes);
        }
        else { // Updates the tags to all the projects that contain the key
            setSelectedTag(key);
            let nodes = allMdx.nodes.map(node => contains(node.frontmatter?.tags, key) ? node : null);
            setNodes(removeNullValues(nodes));
        }
    }

    /**
     * Checks if a csv string contains a spesific value
     * @param csv A csv string, separated by ';'
     * @param key The key that will be compared to ehe csv string
     * @returns {boolean} 'true' if atleast one element in the csv string equals the given key
     */
    function contains(csv: string | null | undefined, key: string): boolean {
        return splitCSV(csv?.toLowerCase() ?? "").some(element => element === key.toLowerCase());
    }

    /**
     * Called when searching, and updates the state of the search object, stores it in lowercase
     * @param event ChangeEvent from HTMLInputElement
     */
    function onSearch(event?: ChangeEvent<HTMLInputElement>): void {
        setSearchState((document.getElementById("search") as HTMLInputElement).value.toLowerCase());
    }

    React.useEffect(() => {
        if (searchState !== "") { // TODO sort searches after priority: title -> tags -> description
            let newNodes = allMdx.nodes.map(node =>
                containsSearchString(node.frontmatter?.title, node.frontmatter?.tags) ? node : null);
            setNodes(removeNullValues(newNodes));
        }
        else {
            if (selectedTag !== ALL_TAG) {
                let newNodes = allMdx.nodes.map(node => contains(node.frontmatter?.tags, selectedTag) ? node : null);
                setNodes(removeNullValues(newNodes));
            }
            else {
                setNodes(allMdx.nodes);
            }
        }
    }, [searchState]);

    /**
     * Checks if a search string is in the title or the tags of a post, if 'null' or 'undefined', returns 'false'
     * @param title The title of the post
     * @param tags The tags of the post, as a string, could be in csv format
     */
    function searchTitleAndTags(title: string | undefined, tags: string | null | undefined): boolean {
        return title?.toLowerCase().includes(searchState) || tags?.toLowerCase().includes(searchState) || false;
    }

    /**
     * Checks if a search string is in the title or the tags of a post, or the selectedTag is used on the post.
     * If 'null' or 'undefined', returns 'false'
     * @param title The title of the post
     * @param tags The tags of the post, as a string, could be in csv format
     */
    function containsSearchString(title: string | undefined, tags: string | null | undefined): boolean { // TODO search description
        return searchTitleAndTags(title, tags) && (selectedTag === ALL_TAG || contains(tags, selectedTag));
    }

    /**
     * Removes all 'null' and 'undefined' values in a string array
     * @param arr An array of strings
     * @returns {string[]} An array of strings without any 'null' or 'undefined' values
     */
    function removeNullValues(arr: any[]): any[] {
        return arr.filter((element: string | null | undefined) => element !== null && element) as string[];
    }

    return (
        <Layout
            title={ t("projects") }
            headline={ t("myProjects") }
            description={ t("projectsByMe") }
            current={ Links.projects }>
            <div>
                <Search onChange={ onSearch } collapse={ true } searchWithoutFocus={ true }/>

                <TagsSelector id={ "tags" } allTag={ ALL_TAG } tagMap={ tagMap } selectedTag={ selectedTag }
                              onClick={ updateTagState }/>
                {
                    allMdx.nodes.map((node: any) => (
                        <div key={ node.id }>
                            <>
                                {
                                    containsSearchString(node.frontmatter.title, node.frontmatter.tags) ?

                                        <ProjectCard
                                            title={ node.frontmatter.title }
                                            slug={ node.slug }
                                            description={ node.frontmatter.description }
                                            tags={ node.frontmatter.tags }
                                            timeToRead={ node.timeToRead }
                                            source={ node.frontmatter.source }
                                            image={ node.frontmatter.hero_image.childImageSharp.gatsbyImageData }
                                            imageAlt={ node.frontmatter.hero_image_alt }/>
                                        :
                                        nodes.length === 0 ?
                                            <div className={ "absolute w-full mt-14" }>
                                                <span className={ "flex justify-center" }>{ t("noResults") }</span>
                                            </div>
                                            : null
                                }
                            </>
                        </div>
                    ))
                }
            </div>
        </Layout>
    );
}

export const query = graphql`
    query ProjectPage ($language: String!) {
        locales: allLocale(filter: {language: {eq: $language}}) {
            edges {
                node {
                    ns
                    data
                    language
                }
            }
        }
        allMdx(sort: {fields: frontmatter___uploaded, order: DESC}) {
            nodes {
                frontmatter {
                    title
                    description
                    tags
                    source
                    hero_image_alt
                    hero_image {
                        childImageSharp {
                            gatsbyImageData
                        }
                    }
                    uploaded
                }
                id
                slug
                timeToRead
            }
        }
    }
`;

export default ProjectPage;
