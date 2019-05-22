import * as React from 'react';
import { IPersonListProps } from './IPersonListProps';
import Person from './Person';
import Dimensions from 'react-dimensions';



export class PersonList extends React.Component<IPersonListProps> {
    /**
     * <div>
            {this.props.list.map(item => {
                return <Person person = {item}></Person>
            })}
        </div>
     */

    public render() {  
        return (   
        <div>
            {this.props.list.map(item => {
                return <WrapperComponent person = {item}/> 
            })}
        </div>
        );
    }
}

export default PersonList; 
const WrapperComponent = Dimensions({elementResize: true, className: 'react-dimensions-wrapper'})(Person);