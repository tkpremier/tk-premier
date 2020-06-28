import React, { Component } from 'react';

class CatalogueImage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      image: props.item.catalogueCoverImage
    };
  }

  componentDidMount() {
    this.setState({ image: this.props.item.catalogueCoverImage });
  }

  componentDidUpdate() {
    if (this.props.item.catalogueCoverImage !== this.state.image) {
      this.setState({ image: this.props.item.catalogueCoverImage });
    }
  }

  render() {
    const { item } = this.props;
    let imageURL = '';
    if (this.props.item.catalogueCoverImage[0] === 'h') {
      imageURL = this.props.item.catalogueCoverImage;
    } else {
      imageURL = `/Xigen/image.ashx?path=${this.state.image}`;
    }
    return (
      <div className="image-container col-xs-12 col-sm-3">
        <a
          href={`https://www.phillips.com/auctions/auction/${item.saleNumber}`}
          className="image-link"
        >
          <img src={imageURL} />
        </a>
      </div>
    );
  }
}

export default CatalogueImage;
