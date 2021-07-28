import React from 'react';
import PropTypes from 'prop-types';
import styles from './Filter.module.css';

const Filter = ({ value, onchange }) => (
    <label className={styles.label}>Find contacts by name
        <input className={styles.input} type="text" value={value} onChange={onchange} />
    </label>

);

Filter.propTypes = {
    value: PropTypes.string.isRequired,

}

export default Filter;

