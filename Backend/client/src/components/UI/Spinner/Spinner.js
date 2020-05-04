import React from 'react';
import spinner from '../../../img/spinner.gif';
import styled from './Spinner.module.css';

const Spinner = () => (
    <img className={styled.Spinner} src={spinner} alt="Loading..." />
)

export default Spinner;