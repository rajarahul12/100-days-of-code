import React from "react";
import Pagination from "../components/Pagination";
import Layout from "../components/layout";
import SEO from "../components/seo";
import GridLayout from "../components/GridLayout";

const PageTemplate = ({ data, pageContext }) => {
    return (
        <Layout>
            <SEO title={data.site.siteMetadata.title} description={data.site.siteMetadata.description} />
            <GridLayout data={data.allMarkdownRemark.nodes} siteTitle={data.site.siteMetadata.title} />
            <Pagination pageContext={pageContext} />
        </Layout>
    );
};

export default PageTemplate;

export const pageQuery = graphql`
    query pageQuery($skip: Int!, $limit: Int!) {
        allMarkdownRemark(
            filter: { fileAbsolutePath: { regex: "/pages/" }, frontmatter: { draft: { ne: true } } }
            sort: { fields: [frontmatter___publishDate], order: DESC }
            limit: $limit
            skip: $skip
        ) {
            nodes {
                html
                frontmatter {
                    day
                    title
                    publishDate
                    thumbnailImage {
                        childImageSharp {
                            fluid(maxWidth: 400, quality: 100) {
                                ...GatsbyImageSharpFluid
                            }
                        }
                    }
                }
            }
        }
        site {
            siteMetadata {
                title
            }
        }
    }
`;
