import React, { PureComponent } from 'react';
import { Waypoint } from 'react-waypoint';
import PhillipsLot from '../PhillipsLot/PhillipsLot';
import handleResponse from '../utils/handleResponse';

class ArtistGrid extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      currentPage: props.currentPage,
      data: props.data
    };
    this.fetchMoreData = this.fetchMoreData.bind(this);
  }

  fetchMoreData() {
    const { apiRoot, makerId, resultsPerPage, status, totalCount } = this.props;
    let { currentPage, data } = this.state;
    if (data.length < totalCount) {
      const url = `${apiRoot}api/maker/${makerId}/lots?page=${currentPage + 1}&resultsperpage=${resultsPerPage}&lotStatus=${status}`;
      const req = {
        method: 'GET',
        url
      };
      fetch(url, req)
        .then(handleResponse)
        .then((res) => {
          currentPage += 1;
          data = data.concat(res.data);
          this.setState({
            currentPage,
            data
          });
        })
        .catch(err => console.log('Error: ', err));
    }
  }

  render() {
    const { totalCount } = this.props;
    const { data } = this.state;
    return (
      <ul className="row standard-grid upcoming">
        {data.map(lot => (
          <li className="col-xs-6 col-sm-3">
            <PhillipsLot
              imageTransformation="AuctionLotsView"
              disableFollow
              enableShare
              showLotNumber={false}
              {...lot}
            />
          </li>
        ))}
        {data.length < totalCount
          ? (
            <Waypoint
              bottomOffset={200}
              onEnter={this.fetchMoreData}
            />
          )
          : null
        }
      </ul>
    );
  }
};

export default ArtistGrid;
