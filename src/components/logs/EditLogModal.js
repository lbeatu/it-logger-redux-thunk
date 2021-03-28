import M from 'materialize-css/dist/js/materialize.min.js';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { updateLog } from '../../actions/logActions';
import TechSelectOptions from '../techs/TechSelectOptions';

const EditLogModal = ({ current, updateLog }) => {
  const [message, setMessage] = useState('');
  const [attention, setAttention] = useState(false);
  const [tech, setTech] = useState('');
  const onSubmit = () => {
    if (message === '' || tech === '') M.toast({ html: 'Please enter a message and tech' });
    else {
      const updLog = {
        id: current.id,
        message,
        attention,
        tech,
        date: new Date(),
      };

      updateLog(updLog);

      //Clear Fields
      setMessage('');
      setAttention(false);
      setTech('');
    }
  };

  useEffect(() => {
    if (current) {
      setMessage(current.message);
      setAttention(current.attention);
      setTech(current.tech);
    }
  }, [current]);
  return (
    <div className="modal" style={modalStyle} id="edit-log-modal">
      <div className="modal-content">
        <h4>Enter System Log</h4>
        <div className="row">
          <input type="text" name="message" value={message} onChange={(e) => setMessage(e.target.value)} />
          <label htmlFor="message" className="active">
            Log Message
          </label>
        </div>
        <div className="row">
          <div className="input-field">
            <select name="tech" value={tech} className="browser-default" onChange={(e) => setTech(e.target.value)}>
              <option value="" disabled>
                Select Technician
              </option>
              <TechSelectOptions />
            </select>
          </div>
          <div className="row">
            <div className="input-field">
              <p>
                <label>
                  <input type="checkbox" className="filled-in" checked={attention} value={attention} onChange={(e) => setAttention(!attention)} />
                  <span>Needs Attention</span>
                </label>
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="modal-footer">
        <a href="#!" onClick={onSubmit} className="modal-close waves-effect blue waves-light btn">
          Enter
        </a>
      </div>
    </div>
  );
};

const modalStyle = {
  width: '75%',
  height: '75%',
};

const mapStateToProps = (state) => ({
  current: state.log.current,
});
export default connect(mapStateToProps, { updateLog })(EditLogModal);
