import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { getLogs } from '../../actions/logActions';
import Preloader from '../layout/Preloader';
import LogItem from './LogItem';
const Logs = ({ log: { logs, loading }, getLogs }) => {
  useEffect(() => {
    getLogs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading || logs === null) return <Preloader />;
  else
    return (
      <ul className="collection with-header">
        <li className="collection-header">
          {console.log('logs', logs)}
          <h4 className="center">System Logs</h4>
        </li>
        {!loading && logs.length === 0 ? <p className="center">No logs to show...</p> : logs.map((log) => <LogItem log={log} key={log.id} />)}
      </ul>
    );
};

Logs.propTypes = {
  log: PropTypes.object.isRequired,
  getLogs: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  log: state.log,
});

export default connect(mapStateToProps, { getLogs })(Logs);
