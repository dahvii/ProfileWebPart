import * as React from 'react';
import styles from './Profile.module.scss';
import PropTypes from 'prop-types';
import { IPersonProps } from './IPersonProps';



export class Person extends React.Component<IPersonProps> {
    public render() {  
    return (   
    <div className={ styles.column }>
        <span className={ styles.title }> Profilsida för nyanställda</span>
        <p className={ styles.subTitle}>{this.props.name}</p>
        <p className={ styles.description}>{this.props.text}</p>
        
    </div>
    );
    }
}

export default Person; 