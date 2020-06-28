import React, { Fragment } from 'react';
import { PropTypes } from 'prop-types';
import Dropzone from 'react-dropzone';

// Material UI
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';


const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center'
  },
  root: {
    flexGrow: 1
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: '80%'
  },
  dropzone: {
    width: '80%',
    height: '75px',
    border: '1px solid black',
    marginLeft: 'auto',
    marginRight: 'auto'
  },
  outlined: {
    border: '1px solid #000',
    borderRadius: '3px',
    margin: '15px',
    width: '95%'
  },
  switchLabel: {
    textAlign: 'left'
  },
  card: {
    minWidth: 275,
    margin: '5px'
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  root: {
    width: '95%'
  },
  emailSent: {
    color: 'red'
  }
});

class WinnerBidEmail extends React.Component {
  state = {}

  onFileDrop = (acceptedFiles) => {
    acceptedFiles.forEach(file => {
      const reader = new FileReader();
      reader.onload = () => {
        this.props.actions.setUploadFile('winnerBidEmailFile',
          {
            name: file.name,
            preview: file.preview,
            file: file
          }
        );
      };
      reader.onabort = () => console.log('file reading was aborted');
      reader.onerror = () => console.log('file reading has failed');

      reader.readAsBinaryString(file);
    });
  }

  fileRemove = name => (event) => {
    this.props.actions.editDetails(name, '');
    this.props.actions.clearUploadFile(name);
  }

  handleSendWinnerBidEmail = () => {
    this.props.actions.handleSendWinnerBidEmail();
  }

  render() {
    // console.log('Sale Results render(): ', this.props)
    const { classes } = this.props;
    const { uploadFile, selectedAuction } = this.props.state;
    const { winnerBidEmailFile } = uploadFile;
    const { winnerBidEmailSendResults, winnerBidEmailSent } = selectedAuction;

    return (
      <div className={classes.root}>
        <Grid container spacing={24}>
          <Grid item xs={12}>
            &nbsp;
          </Grid>
          <Grid item container xs={12} spacing={8} className={classes.outlined}>
            <Grid item xs={12} sm={6}>
              <label htmlFor="winnerBidEmailFile">
                <Dropzone
                  className={classes.dropzone}
                  onDrop={files => this.onFileDrop(files)}
                >
                  <div>Drop files here, or click to select files to upload.</div>
                </Dropzone>
              </label>
              <TextField
                id="winnerBidEmailFile"
                label="Winner Bid File"
                className={classes.textField}
                margin="normal"
                fullwidth="true"
                style={{ width: '100%' }}
                InputLabelProps={{
                  shrink: true
                }}
                value={winnerBidEmailFile.name}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Button
                variant="contained"
                component="span"
                className={classes.button, classes.addButton}
                onClick={this.handleSendWinnerBidEmail}
              >
                Send Winner Bid Emails
                
              </Button>
              {winnerBidEmailSent && winnerBidEmailSendResults.winningBids.length > 0 ? 
              <Typography variant="h5" component="h3" className={classes.emailSent}>
                email has been sent.
              </Typography>:null}
            </Grid>
          </Grid>
        </Grid>
        <Grid container spacing={24} className={classes.outlined}>           
            {winnerBidEmailSendResults.winningBids.length > 0 ?            
            <Paper className={classes.root}>
              <Typography variant="h5" component="h3">
                email results:
              </Typography>
              <Typography component="p">
                emails sent: {winnerBidEmailSendResults.emailsSent}  -
              emails to send: {winnerBidEmailSendResults.totalEmailsToSend}<br />
              </Typography>
              <Typography component="p">
                sent on: {winnerBidEmailSendResults.sendDate}
              </Typography>
            </Paper>
            : null}
            {winnerBidEmailSendResults.winningBids.map((emailResult, index) => (
              <Fragment>
                <Card className={classes.card}>
                <CardContent>
                <Typography className={classes.title} color="textSecondary" gutterBottom>
                  {emailResult.clientEmail} <br/> {emailResult.clientName}
                  </Typography>
                  
                  <Typography variant="body2" component="p">
                  {emailResult.lots.map((lot, index) => (
                    
                    <pre>
{`lot number: ${lot.lotNumberFull}
sold price: ${lot.currencySign}${lot.hammerPlusBP}
`}
                    </pre>
                ))}
                  </Typography>
                </CardContent>
              </Card>
              </Fragment>
            ))};
                        
        </Grid>
      </div>
    );
  }
}

WinnerBidEmail.defaultProps = {};

WinnerBidEmail.propTypes = {
  classes: PropTypes.shape({
    container: PropTypes.string,
    dropzone: PropTypes.string,
    outlined: PropTypes.string,
    root: PropTypes.string,
    switchLabel: PropTypes.string,
    textField: PropTypes.string
  }).isRequired,
  actions: PropTypes.shape({
    clearUploadFile: PropTypes.func.isRequired,
    editDetails: PropTypes.func.isRequired,
    handleSendWinnerBidEmail: PropTypes.func.isRequired
  }).isRequired,
  state: PropTypes.shape({
    selectedAuction: PropTypes.objectOf(PropTypes.object).isRequired
  }).isRequired
};


export default withStyles(styles)(WinnerBidEmail);
