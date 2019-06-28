import { Link, graphql } from "gatsby";
import Layout from "../components/layout";
import React from "react";
// import "../components/layout.css"
import SEO from "../components/seo";

class BlogPostTemplate extends React.Component {
    render() {
        const { data, pageContext, location } = this.props;

        const post = data.markdownRemark;
        const siteTitle = data.site.siteMetadata.title;
        const { previous, next } = pageContext;

        return (
            <Layout location={location} title={siteTitle}>
                <SEO title={post.frontmatter.title} description={post.frontmatter.description || post.excerpt} />
                <h1 className="ma0 pa0">{post.frontmatter.title}</h1>
                <small className="flex f7 ttu mb3">{post.frontmatter.date}</small>
                <div dangerouslySetInnerHTML={{ __html: post.html }} />
                <ul>
                    <li>
                        {previous && (
                            <Link to={previous.fields.slug} rel="prev">
                                ← {previous.frontmatter.title}
                            </Link>
                        )}
                    </li>
                    <li>
                        {next && (
                            <Link to={next.fields.slug} rel="next">
                                {next.frontmatter.title} →
                            </Link>
                        )}
                    </li>
                </ul>
            </Layout>
        );
    }
}

export default BlogPostTemplate;

export const pageQuery = graphql`
    query BlogPostBySlug($slug: String!) {
        site {
            siteMetadata {
                title
            }
        }
        markdownRemark(fields: { slug: { eq: $slug } }) {
            id
            excerpt(pruneLength: 160)
            html
            frontmatter {
                title
                date(formatString: "MMMM DD, YYYY")
                description
            }
        }
    }
`;
