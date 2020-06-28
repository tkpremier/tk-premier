import { Typeahead } from 'react-typeahead';
import { connect } from 'react-redux';
import { searchMaker } from '../actions/';
import uriEncoder from '../../utils/uriencoder';

const mapStateToProps = (state = {}) => {
  const { search } = state;
  return { search };
};

const mapDispatchToProps = {
  searchMaker
};

const Search = (props) => {
  const displayOption = (maker, i) => {
    return maker.makerName;
  };

  const submit = (query) => {
    const newStr = query.replace(' ', '+');
    window.location = `${window.location.origin}/Search?Search=${newStr}&sbmt`;
  }

  const handleKeyUp = (e) => {
    if (e.keyCode === 13) {
      submit(e.target.value.replace(/[^a-z0-9 _-]/gi, ' '));
      return;
    }
    if (e.target.value !== '' && e.target.value.length >= 3) {
      props.searchMaker(e.target.value.replace(/[^a-z0-9 _-]/gi, ' '));
    }
  };
  const customClasses = {
    'results': 'web'
  };
  const goToMakerLink = (maker) => {
    const makerLink = `/artist/${maker.makerId}/${uriEncoder(maker.url)}`;
    window.location = makerLink;
  }
  return (
    <div className="search-bar col-xs-12 col-md-4">
      <Typeahead
        options={props.search.options}
        displayOption={'makerName'}
        filterOption={'makerName'}
        maxVisible={10}
        placeholder={`Search artists`}
        onKeyUp={handleKeyUp}
        customClasses={customClasses}
        onOptionSelected={goToMakerLink}
      />
    </div>
  )
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Search);
