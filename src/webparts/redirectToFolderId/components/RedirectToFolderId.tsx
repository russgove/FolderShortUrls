import * as React from 'react';
import styles from './RedirectToFolderId.module.scss';
import { IRedirectToFolderIdProps } from './IRedirectToFolderIdProps';
import { escape } from '@microsoft/sp-lodash-subset';
import { Icon,IconType ,IIconStyles} from "office-ui-fabric-react/lib/Icon";
import { Label } from "office-ui-fabric-react/lib/Label";
import { initializeIcons } from 'office-ui-fabric-react/lib/Icons';

export default class RedirectToFolderId extends React.Component<IRedirectToFolderIdProps, {}> {
  public render(): React.ReactElement<IRedirectToFolderIdProps> {
    initializeIcons(/* optional base url */);
    debugger;
    return (
      <div className={ styles.redirectToFolderId }>
       <Icon iconType={IconType.Default}  className={styles.icon}  iconName="Error"></Icon>
       
              <Label>{this.props.message}</Label>
       
      </div>
    );
  }
}
