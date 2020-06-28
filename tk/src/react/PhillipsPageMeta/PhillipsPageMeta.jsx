import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';

const PhillipsPageMeta = (props) => {
  return (
    <Helmet>
      <title> {props.title} </title>
      <meta name="keywords" content={props.keywords} />
      <meta name="description" content={props.description} />
      <meta property="og:title" content={props.title} />
      <meta property="og:description" content={props.description} />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="Phillips" />
      <meta property="og:url" content={props.url} />
      <meta property="og:image" content={props.image} />
    </Helmet>
  );
};

PhillipsPageMeta.defaultProps = {
  title: 'PHILLIPS: 20th Century and Contemporary Art and Design Auctions',
  keywords: '',
  description: "Phillips is synonymous with contemporary culture. As the most forward-looking of the international auction houses, we have set ourselves apart through our focus on the defining aesthetic movements of the 20th century as well as today's most cutting-edge art. Headquartered in New York and London, with offices throughout the world, Phillips conducts sales in a select number of categories: Contemporary Art, Photographs, Editions, Design and Jewelry. Additionally, our core art business includes curating exhibitions, brokering private sales, advising estates and corporate clients and consulting with private individuals on the management of their collections. Accordingly, Phillips boutique, ‘white glove’ service best positions our firm to provide superior counsel to new and seasoned collectors alike.",
  url: 'https://www.phillips.com',
  image: 'https://www.phillips.com/images/LogoBlack.svg',
};

PhillipsPageMeta.propTypes = {
  title: PropTypes.string,
  keywords: PropTypes.string,
  description: PropTypes.string,
  url: PropTypes.string,
  image: PropTypes.string
};

export default PhillipsPageMeta;
