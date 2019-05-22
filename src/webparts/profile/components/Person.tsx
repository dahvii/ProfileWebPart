import * as React from 'react';
import styles from './Profile.module.scss';
import { IPersonProps } from './IPersonProps';
import { Persona, PersonaSize } from 'office-ui-fabric-react/lib/Persona';
import { Icon } from 'office-ui-fabric-react/lib/Icon';
import Moment from 'react-moment';
import { TooltipHost } from 'office-ui-fabric-react/lib/Tooltip';
import { Link } from 'office-ui-fabric-react/lib/Link';
import { DefaultButton } from 'office-ui-fabric-react/lib/Button';
import Dimensions from 'react-dimensions';


export class Person extends React.Component<IPersonProps> {

  state = {
    isCollapsed: true
  }

    public render() { 
        const  _onRenderSecondaryText = (props): JSX.Element => {
            return (
              <div>
                <Icon iconName={'Suitcase'} />
                {props.secondaryText}
                <br/>
                  Starts at <Moment format="ddd YY-MM-DD" >{props.optionalText}</Moment>
              </div>
            );
          };
        const  toggle = (props) => {
          this.setState({
            isCollapsed: !this.state.isCollapsed
          })
        };

        /**
         * <div className="ms-Grid">
            <div>
            </div>
            <div className="ms-Grid-row">
               <div className="ms-Grid-col ms-sm6 ms-md6 ms-lg2" style={{ backgroundColor: 'rgb(255, 160, 0)' }}>A</div>
              <div className="ms-Grid-col ms-sm6 ms-md4 ms-lg2" style={{ backgroundColor: 'rgb(255, 0, 0)' }}>B</div>
              <div className="ms-Grid-col  ms-hiddenSm ms-md2 ms-lg8"style={{ backgroundColor: 'rgb(215, 143, 233)' }}>C</div>
            </div>
          </div>
         */

        
        return (   
          <div className={styles.grid}  >          
          <div className={styles.row}>
          <Link onClick={toggle} style={{ color: 'rgb(102, 102, 102)' }}>


          {this.props.containerWidth > 420 && 
              <div className= {styles.box1}>
              <Persona
                text={this.props.person.name}
                size={PersonaSize.size72}
                secondaryText= {this.props.person.companyPosition}
                onRenderSecondaryText={_onRenderSecondaryText}
                imageUrl={this.props.person.imageUrl}
                optionalText= {this.props.person.startDate}
              /> 
            </div>
          } 

          {this.props.containerWidth < 420 && <div className= {styles.smallBox1}>
                <Persona
                  size={PersonaSize.large}
                  imageUrl={this.props.person.imageUrl}
                /> 
                <div>{this.props.person.name}</div>
                <div><Icon iconName={'Suitcase'} />{this.props.person.companyPosition}</div>
                <div>Starts at <Moment format="YY-MM-DD" >{this.props.person.startDate}</Moment></div>
              </div>  
          }
              
          {this.props.containerWidth > 420 &&
            <div className={styles.box2}>
                <TooltipHost content={this.state.isCollapsed ? "Show Introduction Text":  "Hide Introduction Text"}>
                  <Icon iconName={'ContactInfo'} className={ styles.icon } />
                  <p>{this.props.person.profileText? this.props.person.profileText.substr(0, 50)+"...": ''}</p>
                </TooltipHost>
              </div>
          }  

          {this.props.containerWidth < 420 && 
            <div className={styles.smallBox2}>
            <Icon iconName={'ContactInfo'} className={ styles.icon } />
            {this.state.isCollapsed ? "Show Introduction Text":  "Hide Introduction Text"}            
            </div>
          }
              </Link>
          </div>
         

          <div >
            {!this.state.isCollapsed && 
              <div className={ styles.row }>
                <p>{this.props.person.profileText}</p>
                <DefaultButton
                  text="Hide Introduction Text"
                  onClick={toggle}
                />
              </div>
            } 
          </div>
        </div>
        );
    }
}

export default Person; 
