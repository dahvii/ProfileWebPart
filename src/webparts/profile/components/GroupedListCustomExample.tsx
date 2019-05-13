import * as React from 'react';
import { GroupedList, IGroup } from 'office-ui-fabric-react/lib/GroupedList';
import { Link } from 'office-ui-fabric-react/lib/Link';
import { getTheme, mergeStyleSets, IRawStyle } from 'office-ui-fabric-react/lib/Styling';
import pnp, { Item } from "sp-pnp-js";
import { IPersonaProps, IPersonaSharedProps, Persona, PersonaSize, PersonaPresence } from 'office-ui-fabric-react/lib/Persona';
import { Icon } from 'office-ui-fabric-react/lib/Icon';
import Moment from 'react-moment';
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons'

library.add(faInfoCircle)



const theme = getTheme();
const headerAndFooterStyles: IRawStyle = {
  minWidth: 300,
  minHeight: 40,
  lineHeight: 40,
  paddingLeft: 16
};
const classNames = mergeStyleSets({
  header: [headerAndFooterStyles, theme.fonts.xLarge],
  footer: [headerAndFooterStyles, theme.fonts.large],
  name: {
    display: 'inline-block',
    overflow: 'hidden',
    height: 24,
    cursor: 'default',
    padding: 8,
    boxSizing: 'border-box',
    verticalAlign: 'top',
    background: 'none',
    backgroundColor: 'transparent',
    border: 'none',
    paddingLeft: 32
  }
});


export class GroupedListCustomExample extends React.Component {
  state = {
    profileText : [],
    personas : []
  }
  

  componentDidMount(){
    pnp.sp.web.lists.getByTitle("ProfileList").items.get().then((items: any[]) => {
      let personas = [];
      let profileText= [];
      let counter= 0;
      items.map(item => {
          let persona = {key: item.Id, name: item.Title, startIndex: counter, count:1, isCollapsed: true ,data:{id: item.Id, name: item.Title, profileText: item.ProfileText, image: item.Image, companyPosition: item.CompanyPosition, startDate: item.StartDate }}
          personas.push(persona);
          let text= {profileText: item.ProfileText};
          profileText.push(text)
          counter++;          
      })
      console.log(personas);
      
      this.setState({ personas : personas })
      this.setState({profileText: profileText})

      }, (errorMessage)=> {
     // Failed
     console.log(errorMessage);
    });
    
  }

  public render(): JSX.Element {
    
    return (
      <GroupedList
        items={this.state.profileText}
        onRenderCell={this._onRenderCell}
        groupProps={{
          onRenderHeader: this._onRenderHeader
        }}
        groups={this.state.personas}
      />
    );
  }

  private _onRenderCell(nestingDepth: number, item, itemIndex: number): JSX.Element {
    return (
      <div data-selection-index={itemIndex}>
        <span>{item.profileText}</span>
      </div>
    );
  }

  private _onRenderHeader(props): JSX.Element {    
    const toggleCollapse = (): void => {
      props.onToggleCollapse!(props.group!);
    };
    const  _onRenderSecondaryText = (props): JSX.Element => {
      return (
        <div>
          <Icon iconName={'Suitcase'} className={'ms-JobIconExample'} />
          {props.secondaryText}
          <br/>
            Starts at <Moment  format="ddd YY-MM-DD" >{props.optionalText}</Moment>
          
        </div>
      );
    };
    return (
      <div className="listItem">
         <Persona
          text={props.group.name}
          size={PersonaSize.size72}
          secondaryText= {props.group.data.companyPosition}
          onRenderSecondaryText={_onRenderSecondaryText}
          imageUrl={props.group.data.image.Url}
          optionalText= {props.group.data.startDate}

        />
        <Link onClick={toggleCollapse}> <FontAwesomeIcon size= "2x" icon="info-circle" />{props.group!.isCollapsed ? 'Show profile text' : 'Hide profile text'}</Link>
      </div>   
    );
  }
}