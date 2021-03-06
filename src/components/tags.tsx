import * as React from "react";
import { useTranslation } from "gatsby-plugin-react-i18next";
import ScrollContainer from "react-indiana-drag-scroll";
import { Move } from "react-feather";

interface Tag {
    name?: string,
    value?: number,
    hoverTitle?: string,
    className?: string,
    onClick?: React.MouseEventHandler<HTMLButtonElement>,
    id?: string,
}

/**
 * A tag containing a short string and a number of occurrences
 * @param name The string name that will be visible on the tag
 * @param value The number of occurrences of the tag
 * @param hoverTitle The string that will be shown when hovering above the tag
 * @param className Styling of the root element
 * @param onClick The function that will be called upon clicking the tag. If 'undefined' the cursor will appear normal
 * @param id A unique id for the tag
 * @constructor
 */
export const Tag = ({ name, value, hoverTitle, className, onClick, id }: Tag) => {

    const text = <span className={ "mx-2 w-max" }>{ name + (value ? `(${ value })` : "") }</span>;
    const classes = "border rounded-xl border-gray-500"

    if (onClick) {
        return (
            <button title={ hoverTitle } id={ id }
                    className={ `${ className } ${ classes }` }
                    onClick={ onClick }>
                { text }
            </button>
        );
    }
    else {
        return (
            <div title={ hoverTitle } id={ id }
                 className={ `${ className } ${ classes }` }>
                { text }
            </div>
        );
    }
}

interface TagsSelector {
    allTag?: string,
    tagMap?: any[],
    selectedTag?: string,
    onClick?: Function,
    id?: string,
    className?: string,
}

/**
 * This component is meant to contain a list of Tags, that can be used to sort a page.
 * Each tag is selectable and with an 'all' button that will display all, which is enabled by default.
 * The tags can be hidden down to just one line, with horizontal scrolling, or all can be displayed at the same time, flex-wrapped
 * @param allTag The name of the tag that will display all tags, and it's content
 * @param selectedTag The currently selected tag
 * @param tagMap An array containing objects with a unique string key, and a number value. Value is meant to display the number
 * of occurrences of the key. If value is 'undefined' the parenthesis will not be shown.
 * @param onClick The function to be called when a tag is clicked or tapped
 * @param id A unique id of the component
 * @param className Styling of the root element
 * @constructor
 */
export const TagsSelector = ({ allTag = "All", selectedTag, tagMap, onClick, id, className }: TagsSelector) => {

    const { t } = useTranslation();

    const [hideTags, setHideTags] = React.useState(true);

    const [hideTagsText, setHideTagsText] = React.useState(t("showMore"));

    /**
     * Update the tags and tagsText states, to the opposite one
     */
    function toggleTags() {
        setHideTags(!hideTags);
        setHideTagsText(!hideTags ? t("showMore") : t("showLess"));
    }

    const [isOverflowing, setIsOverflowing] = React.useState(false);
    React.useEffect(() => {
        if (id) {
            setIsOverflowing(isOverflowingHorizontally(document.getElementById(id)));
        }

        /**
         * Checks if a HTMLElement overflows
         * @param element An HTMLElement where the final element is a show / hide button
         * @returns {boolean} Returns 'true' if the element overflows, false otherwise
         */
        function isOverflowingHorizontally(element: HTMLElement | null): boolean {
            if (element !== null) {
                let sum = 0;
                const children = element.children[0].children;

                if (hideTags && isOverflowing) {
                    const box = document.getElementById("invisible-box");
                    if (box) {
                        sum -= box.clientWidth + 10; // Makes room for the hide button
                    }
                }
                for (let i = 1; i < children.length - 1; i++) {
                    if (children[i] !== null) {
                        sum += children[i].clientWidth + 9; // The extra width is for the margin in between and borders
                    }

                    if (sum > element.clientWidth) {
                        return true;
                    }
                }
            }
            return false;
        }
    }, [tagMap]);

    const scrollContainer = React.useRef<HTMLElement>(null);

    React.useEffect(() => {
        if (scrollContainer.current) {
            scrollContainer.current.scrollTo(0, 0);
        }
    }, []);

    return (
        <div id={ id }>
            <ScrollContainer
                innerRef={ scrollContainer }
                vertical={ false }
                hideScrollbars={ false }
                className={ `flex gap-1 mb-2 ${ hideTags ? `overflow-scroll [scrollbar-width:none] [-ms-overflow-style:none]
                 cursor-grab` : "flex-wrap" } ${ className }` }>
                <>
                    {
                        allTag ?
                            <Tag
                                name={ allTag }
                                onClick={ onClick ? () => onClick(allTag) : undefined }
                                className={ `hover:border-primaryPurple ${ selectedTag === allTag && "!border-primaryPurple" }` }/>
                            : null
                    }
                    {
                        tagMap?.map((tag: any) =>
                            <div key={ tag.key }>
                                <Tag name={ tag.key }
                                     value={ tag.value }
                                     onClick={ onClick ? () => onClick(tag.key) : undefined }
                                     className={ `hover:border-primaryPurple w-max
                                     ${ selectedTag === tag.key && "!border-primaryPurple" }` }/>
                            </div>)
                    }
                    {
                        isOverflowing ?
                            <>
                                <div id={ "invisible-box" }
                                     className={ `text-transparent min-w-max mx-2 ${ !hideTags && "hidden" }` }>
                                    { hideTags ? t("showMore") : null }
                                </div>
                                <div className={ `${ hideTags && "absolute right-0 flex flex-row gap-5" }` }>
                                    {
                                        hideTags && !("ontouchstart" in document.documentElement) ?
                                            <div className={ "rotate-90 pointer-events-none" }
                                                 title={ t("dragToScroll") }
                                                 role={ "tooltip" }>
                                                <Move
                                                    className={ "animate-bounce w-6 h-6 dark:text-[rgba(255,255,255,0.5)] " +
                                                        "text-[rgba(0,0,0,0.5)]" }/>
                                            </div>
                                            : null
                                    }
                                    <Tag name={ hideTagsText.toString() } onClick={ toggleTags }
                                         hoverTitle={ hideTags ? t("showMoreTags") : t("showLessTags") }
                                         className={ `hover:border-primaryPurple min-w-max ${ hideTags &&
                                         "bg-white dark:bg-gray-900" } shadow-sm shadow-primaryPurple` }/>
                                </div>
                            </>
                            : null
                    }
                </>
            </ScrollContainer>
        </div>
    )
};

interface TagsRow {
    tags?: string[],
    sort?: boolean,
    className?: string,
    id?: string,
}

/**
 * A row containing an array of tags
 * @param tags A string set containing all the names of the tags
 * @param sort If 'true' will sort the string[] in ascending order
 * @param className Styling of the root element
 * @param id A unique id for the component
 * @constructor
 */
export const TagsRow = ({ tags, sort = true, className, id }: TagsRow) => {
    if (tags) {
        if (sort) {
            tags.sort();
        }

        return (
            <div className={ `flex flex-row flex-wrap gap-1 ${ className }` } id={ id }>
                {
                    tags.map(tag =>
                        <div key={ tag }>
                            <Tag name={ tag }/>
                        </div>
                    )
                }
            </div>
        );
    }
    else {
        return null;
    }
}
