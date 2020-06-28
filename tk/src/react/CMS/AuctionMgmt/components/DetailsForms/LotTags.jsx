import React from 'react';
import PropTypes from 'prop-types';
import deburr from 'lodash/deburr';
import Autosuggest from 'react-autosuggest';
import match from 'autosuggest-highlight/match';
import parse from 'autosuggest-highlight/parse';

// Material UI
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Chip from '@material-ui/core/Chip';
import Grid from '@material-ui/core/Grid';
import MenuItem from '@material-ui/core/MenuItem';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';

const styles = theme => ({
  root: {
    flexGrow: 1,
    minHeight: '350px'
  },
  chip: {
    margin: theme.spacing.unit
  },
  outlined: {
    border: '1px solid #000',
    borderRadius: '3px',
    margin: '15px',
    width: '95%'
  },
  container: {
    position: 'relative'
  },
  suggestionsContainerOpen: {
    position: 'absolute',
    zIndex: 1,
    marginTop: theme.spacing.unit,
    left: 0,
    right: 0
  },
  suggestion: {
    display: 'block'
  },
  suggestionsList: {
    margin: 0,
    padding: 0,
    listStyleType: 'none'
  }
});

function renderInputComponent(inputProps) {
  const { classes, inputRef = () => { }, ref, ...other } = inputProps

  return (
    <TextField
      fullWidth
      InputProps={{
        inputRef: node => {
          ref(node);
          inputRef(node);
        },
        classes: {
          input: classes.input,
        },
      }}
      {...other}
    />
  )
}

function renderSuggestion(suggestion, { query, isHighlighted }) {
  const matches = match(suggestion.tagDesc, query)
  const parts = parse(suggestion.tagDesc, matches)

  return (
    <MenuItem selected={isHighlighted} component="div">
      <div>
        {parts.map((part, index) =>
          part.highlight ? (
            <span key={String(index)} style={{ fontWeight: 500 }}>
              {part.text}
            </span>
          ) : (
              <strong key={String(index)} style={{ fontWeight: 300 }}>
                {part.text}
              </strong>
            ),
        )}
      </div>
    </MenuItem>
  );
}

function getSuggestions(value, suggestions) {
  const inputValue = deburr(value.trim()).toLowerCase();
  const inputLength = inputValue.length;
  let count = 0;

  return inputLength === 0
    ? []
    : suggestions.filter((suggestion) => {
      let tagDescription = deburr(suggestion.tagDesc.toLowerCase());
      const keep = count < 5 && tagDescription.slice(
        tagDescription.indexOf(inputValue),
        (tagDescription.indexOf(inputValue) + inputValue.length)
      ).toLowerCase() === inputValue;

      if (keep) {
        count += 1;
      }
      return keep;
    });
}

class LotTags extends React.Component {
  state = {
    single: '',
    suggestions: []
  }

  // Handlers
  handleChange = name => (event, { newValue }) => {
    this.setState({
      [name]: newValue
    });
  }

  preventDupes = (newTag) => {
    const lotTagList = this.props.state.selectedLot.tags;
    return !lotTagList.some(i => (i.tagName.toLowerCase() === newTag.toLowerCase()));
  }

  getSuggestionValue = (suggestion) => {
    const lotTagList = this.props.state.selectedLot.tags;
    if (this.preventDupes(suggestion.tagDesc)) {
      this.props.actions.editLotTagList(
        lotTagList.concat({ tagId: suggestion.tagID, tagName: suggestion.tagDesc })
      );
    }
    return suggestion.tagDesc;
  }

  handleSuggestionsFetchRequested = ({ value }) => {
    this.setState({
      suggestions: getSuggestions(value, this.props.state.tags.tags)
    });
  };

  handleSuggestionsClearRequested = () => {
    this.setState({
      suggestions: []
    });
  };

  handleDeleteTag = (event) => {
    let iterator = 0
    const filteredLotTags = this.props.state.selectedLot.tags.filter(
      t => t.tagName.trim() != event.currentTarget.parentElement.innerText
    )
    this.props.actions.editLotTagList(filteredLotTags)
  }

  newTagObj = (tagDesc) => (
    {
      tagName: tagDesc,
      tagId: 0
    }
  )

  handleNewTagOnBlur = (event) => {
    const lotTagList = this.props.state.selectedLot.tags
    if (event.target.value !== '' && this.preventDupes(event.target.value)) {
      const inputValue = deburr(event.target.value.trim()).toLowerCase()
      var tags = this.props.state.tags.tags;
      var tag = tags.filter(tag => {
        let tagDescription = deburr(tag.tagDesc.toLowerCase())
        return tagDescription === inputValue
      })

      this.setState({ single: '' })

      //if the text in the input exists use it
      if (tag && tag.length == 0) {
        this.props.actions.editLotTagList(lotTagList.concat(this.newTagObj(event.target.value.trim())))
      } else {
        this.props.actions.editLotTagList(lotTagList.concat({ tagId: tag[0].tagID, tagName: tag[0].tagDesc }))
      }
    }
  }

  render() {
    // console.log('render() lot tags: ', this.props)
    let iterator = 0
    const { classes, theme } = this.props
    const lotTagListWithKeys = this.props.state.selectedLot.tags.map((obj) => ({ ...obj, key: iterator++ }))
    const tagList = this.props.state.tags.tags

    const autosuggestProps = {
      renderInputComponent,
      suggestions: this.state.suggestions,
      onSuggestionsFetchRequested: this.handleSuggestionsFetchRequested,
      onSuggestionsClearRequested: this.handleSuggestionsClearRequested,
      getSuggestionValue: this.getSuggestionValue,
      renderSuggestion,
    }

    return (
      <div className={classes.root}>
        <Grid container spacing={24}>
          <Grid item container xs={6} spacing={24}>
            <Grid item xs={12}>
              &nbsp;
            </Grid>
            <Grid item sm={2}>
              &nbsp;
            </Grid>
            <Grid item xs={12} sm={8}>
              <Autosuggest
                {...autosuggestProps}
                inputProps={{
                  classes,
                  placeholder: 'Search for or enter a tag',
                  value: this.state.single,
                  onChange: this.handleChange('single'),
                  onBlur: this.handleNewTagOnBlur
                }}
                theme={{
                  container: classes.container,
                  suggestionsContainerOpen: classes.suggestionsContainerOpen,
                  suggestionsList: classes.suggestionsList,
                  suggestion: classes.suggestion
                }}
                renderSuggestionsContainer={options => (
                  <Paper {...options.containerProps} square>
                    {options.children}
                  </Paper>
                )}
                onChange={event => event.preventDefault()}
              />
              <br />
              <Button
                variant="contained"
                component="span"
              >
                Add Tag
              </Button>
            </Grid>
            <Grid item sm={2}>
              &nbsp;
            </Grid>
          </Grid>
          <Grid item container xs={6} spacing={24}>
            <Grid item xs={12}>
              &nbsp;
            </Grid>
            <Grid item xs={12} className={classes.outlined}>
              {lotTagListWithKeys.map(tag => (
                <Chip
                  key={tag.key}
                  label={tag.tagName}
                  onDelete={this.handleDeleteTag}
                  className={classes.chip}
                  color="primary"
                  value={tag.tagId}
                />
              ))}
            </Grid>
          </Grid>
        </Grid>
      </div>
    );
  }
}

LotTags.propTypes = {
  classes: PropTypes.shape({
    chip: PropTypes.string,
    container: PropTypes.string,
    dropzone: PropTypes.string,
    root: PropTypes.string,
    suggestion: PropTypes.string,
    suggestionsContainerOpen: PropTypes.string,
    suggestionsList: PropTypes.string
  }).isRequired,
  actions: PropTypes.shape({
    clearUploadImage: PropTypes.func.isRequired,
    editDetails: PropTypes.func.isRequired,
    uploadCatalogCoverSubmit: PropTypes.func.isRequired
  }).isRequired,
  state: PropTypes.shape({
    selectedLot: PropTypes.objectOf(PropTypes.object).isRequired,
    uploadImage: PropTypes.objectOf(PropTypes.object).isRequired
  }).isRequired
};

export default withStyles(styles)(LotTags);
