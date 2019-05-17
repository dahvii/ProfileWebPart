import * as React from 'react';
import { IPersonListProps } from './IPersonListProps';
import Person from './Person';

export class PersonList extends React.Component<IPersonListProps> {
    public render() {  
        return (   
        <div >
            {this.props.list.map(item => {
                return <Person person = {item}></Person>
            })}
        </div>
        );
    }
}

export default PersonList; 