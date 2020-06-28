import serialize from 'form-serialize';
import Modal from '../components/Modal';
import StorageManager from '../utils/storageManager';

const FavoritesModal = (props) => {
  let chosenComp = null;
  if (props.modal.component){
    const components = {
      'ShareList' : (<ShareList {...props} />),
      'DeleteList' : (< ConfirmDelete {...props} />)
    }
    chosenComp = components[props.modal.component];
  }
  return (
    <Modal show={props.modal.show}>
      {chosenComp}
    </Modal>
  )
}

const ConfirmDelete = (props) => {

  const handleDelete = () => {
    props.deleteLotList({
      userId: props.user.id,
      listId: props.modal.data.id
    });
  }

  const handleClose = (e) => {
    e.preventDefault();
    props.closeModal();
  }

  return (
    <div className='col-xs-12 col-sm-8 col-md-push-3 col-md-6 favorites-modal'>
      <h2>Delete Confirmation</h2>
      <a href="#" onClick={handleClose} className="close">&#10005;</a>
      <p>Are you sure you want to delete this list?</p>
      <button onClick={handleDelete} disabled={props.modal.status === 'pending'}>Confirm</button>
      <button className="cancel" onClick={handleClose} >Cancel</button>
      <Status {...props} />
    </div>
  )
}

const Status = (props) => {
  let statusEl = null;
  switch(props.modal.status) {
    case 'error':
      statusEl = (<p className="error">There was an error.  Please try again later.</p>);
      break;
    default:
      break;
  }
  return statusEl;
}

const ShareList = (props) => {
  const storageManager = new StorageManager();
  const domainUrl = storageManager.getItem('domainUrl');
  const list = props.modal.data;

  const handleShare = (e) => {
    e.preventDefault();
    const re = /[,;]/g;
    let formData = serialize(e.target, {hash: true});
    formData.destination = formData.destination.split(re);
    props.shareList(list.guid, formData);
  }

  const handleClose = (e) => {
    e.preventDefault();
    props.closeModal();
  }
  return (
    <div className='col-xs-12 col-sm-8 col-md-push-3 col-md-6 favorites-modal'>
      <h2>{list.name} <span className="list-count">{list.count} lots</span></h2>
      <a href='#' onClick={handleClose} className='close'>&#10005;</a>
      <form onSubmit={handleShare} >
        <input type='text' name='destination' placeholder='Enter Emails' />
        <textarea name='body' placeholder='Message' rows="10"/>
        <Status {...props} />
        <input type='submit' value='Share List' disabled={props.modal.status === 'pending'} />
        <button className='cancel' onClick={handleClose}>Cancel</button>
      </form>
      <p>Public Link</p>
      <input type='text' readonly='true' value={`${location.protocol}//${domainUrl}/list/${list.guid}`} />
    </div>
  )
}

export default FavoritesModal;
