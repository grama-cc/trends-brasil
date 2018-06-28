import React from 'react';
import PropTypes from 'prop-types';
import NextHead from 'next/head';
import { withRouter } from 'next/router';

const Head = (props) => {
  const url = `http://localhost${props.url || props.router.asPath}`;
  return (
    <NextHead>
      <meta charSet="UTF-8" />
      <title>{props.title}</title>
      <meta name="description" content={props.description} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="icon" href="/static/img/favicon.png" />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={props.title} />
      <meta property="og:description" content={props.description} />
      <meta name="twitter:site" content={url} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:image" content={props.image} />
      <meta property="og:image" content={props.image} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />

      <link rel="stylesheet" href="/static/css/slick.css" />

      <link rel="stylesheet" href="/_next/static/style.css" />
      <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500" />
    </NextHead>
  );
};

Head.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  image: PropTypes.string,
  url: PropTypes.string,
  router: PropTypes.shape({
    asPath: PropTypes.string,
  }).isRequired,
};

Head.defaultProps = {
  title: '',
  description: '',
  image: '',
  url: '',
};

export default withRouter(Head);
