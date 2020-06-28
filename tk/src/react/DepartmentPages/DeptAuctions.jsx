import React from 'react';
import PropTypes from 'prop-types';
import formatDate from '../utils/formatdate';
import CalendarLink from '../CalendarLink/CalendarLink';


export const DeptAuctions = (props) => {
  const GetFormattedDate = (startDate, endDate) => {
    let formattedAuctionDate = formatDate(startDate)
    // validate if start and endDate are valid dates and get formatted date if start date is smaller in days than end date
    if (startDate && endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);
      const validStartDate = start instanceof Date && !isNaN(start.getTime())
      const validEndDate = end instanceof Date && !isNaN(end.getTime())
      if (validStartDate && validEndDate) {
        const differenceInTime = end.getTime() - start.getTime();
        const differenceInDays = Math.round(differenceInTime / (1000 * 3600 * 24));
        if (differenceInDays > 0) {
          formattedAuctionDate = `${formatDate(startDate)} - ${formatDate(endDate)}`;
        }
      }
    }
    return formattedAuctionDate;
  }
  const ImagePanel = (data) => {
    const today = new Date();
    const imageStyle = {
      backgroundImage: `url('${encodeURI(data.imagePath)}')`,
      backgroundSize: 'cover',
      height: '248px'
    };
    const formattedDate = GetFormattedDate(data.startDate, data.endDate);
    return (
      <section className={`content-block-imagepanel col-xs-12 ${props.widthClass}`} id={`${props.auctionType}`}>
        <a href={data.auctionPath}>
          <div className="content-block-image" style={imageStyle} />
          <div className="content-block-copy">
            <h3>{data.auctionTitle}</h3>
            <p>{formattedDate} &#8226; {data.locationName}</p>
          </div>
        </a>
        {new Date(today) < new Date(data.startDate) ?
          <CalendarLink
            startDateTime={data.startDate}
            title={data.auctionTitle}
            location={data.locationName}
          /> : null
        }
      </section>
    );
  };

  return (
    <div className="department-grid container">
      <span id={`${props.auctionType}-nav`} />
      <h2>{props.title}</h2>
      <div className="row">
        {props.data.map(data => ImagePanel(data))}
      </div>
      <a className="cta-button" href={props.ctaUrl}>{props.ctaText}</a>
    </div>
  );
};

DeptAuctions.defaultProps = {
  auctionType: '',
  ctaText: 'More Auctions',
  ctaUrl: '',
  data: [],
  title: 'Auctions',
  widthClass: ''
};

DeptAuctions.propTypes = {
  auctionType: PropTypes.string,
  ctaText: PropTypes.string,
  ctaUrl: PropTypes.string,
  data: PropTypes.arrayOf(
    PropTypes.object
  ),
  title: PropTypes.string,
  widthClass: PropTypes.string
};

export default DeptAuctions;
