import M from 'materialize-css/dist/js/materialize.min.js';
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { addTech } from '../../actions/techActions';
const AddTechModal = ({ addTech }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const onSubmit = () => {
    if (firstName === '' || lastName === '') M.toast({ html: 'Please enter the first and last name' });
    else {
      const newTech = {
        firstName,
        lastName,
        date: new Date(),
      };

      addTech(newTech);
      //Clear Fields
      setFirstName('');
      setLastName('');
    }
  };
  return (
    <div className="modal" id="add-tech-modal">
      <div className="modal-content">
        <h4>New Techican</h4>
        <div className="row">
          <input type="text" name="firstName" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
          <label htmlFor="firstName" className="active">
            First Name
          </label>
        </div>
        <div className="row">
          <div className="input-field">
            <input type="text" name="lastName" value={lastName} onChange={(e) => setLastName(e.target.value)} />
            <label htmlFor="lastName" className="active">
              Last Name
            </label>
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

export default connect(null, { addTech })(AddTechModal);
