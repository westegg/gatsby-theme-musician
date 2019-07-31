import { graphql, useStaticQuery } from "gatsby"
import userConfig from "./config/artist.yml"
// eslint-disable-next-line import/no-unresolved
import textLabels from "./config/text_labels.yml"

export default () => {
  const { site, bannerImg, socialImg, logoImg } = useStaticQuery(siteQuery)

  /**
   * Prepare custom data from YAML config files.
   * Users can shadow them from "src/gatsby-theme-musician/config" folder.
   */

  // Social links
  if (userConfig.hasOwnProperty("social")) {
    site.siteMetadata.social = userConfig.social
  } else {
    site.siteMetadata.social = []
  }

  // Artist data
  if (userConfig.hasOwnProperty("artist")) {
    site.siteMetadata.artist = userConfig.artist
  } else {
    site.siteMetadata.artist = {}
  }

  // Site text labels (eg. "Releases", "Listen")
  if (textLabels) {
    site.siteMetadata.textLabels = textLabels
  } else {
    site.siteMetadata.textLabels = {}
  }

  /**
   * Replace default theme siteUrl with empty string
   * if user does not add their own siteUrl in siteMetadata
   */

  const defaultSiteUrl = "https://github.com/ekafyi/eka-gatsby-playground"
  if (site.siteMetadata.siteUrl === defaultSiteUrl) {
    site.siteMetadata.siteUrl = "//"
  }

  /**
   * Prepare (optional) images from user's content folder.
   */

  site.siteMetadata.bannerImg = bannerImg
  site.siteMetadata.socialImg = socialImg
  site.siteMetadata.logoImg = logoImg

  // end custom data

  return site.siteMetadata
}

const siteQuery = graphql`
  query SiteQuery {
    site {
      siteMetadata {
        title
        siteUrl
      }
    }
    bannerImg: imageSharp(fluid: { src: { regex: "/artist-banner./" } }) {
      fluid(cropFocus: CENTER) {
        ...GatsbyImageSharpFluid_withWebp
      }
    }
    socialImg: imageSharp(resize: { src: { regex: "/artist-social./" } }) {
      resize(width: 600, height: 300) {
        src
      }
    }
    logoImg: imageSharp(fluid: { src: { regex: "/artist-logotype./" } }) {
      id
      fixed(height: 48) {
        ...GatsbyImageSharpFixed_withWebp
      }
    }
  }
`