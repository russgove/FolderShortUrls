import { override } from '@microsoft/decorators';
import { Log } from '@microsoft/sp-core-library';
import {
  BaseListViewCommandSet,
  Command,
  IListViewCommandSetListViewUpdatedParameters,
  IListViewCommandSetExecuteEventParameters
} from '@microsoft/sp-listview-extensibility';
import { Dialog } from '@microsoft/sp-dialog';
import FolderIdDialog from "./FolderIdDialog";
import * as strings from 'GetFolderIdCommandSetStrings';
import { setup as pnpSetup } from "@pnp/common";
import { SPField } from '@microsoft/sp-page-context';


export interface IGetFolderIdCommandSetProperties {
  urlFormat: string;
  title:string;
}

const LOG_SOURCE: string = 'GetFolderIdCommandSet';

export default class GetFolderIdCommandSet extends BaseListViewCommandSet<IGetFolderIdCommandSetProperties> {

  @override
  public onInit(): Promise<void> {
    Log.info(LOG_SOURCE, 'Initialized GetFolderIdCommandSet');
    debugger;
    return super.onInit().then(_ => {
      pnpSetup({
        spfxContext: this.context
      });
    });
  }

  @override
  public onListViewUpdated(event: IListViewCommandSetListViewUpdatedParameters): void {
    debugger;
    const compareOneCommand: Command = this.tryGetCommand('GET_FOLDER_ID');
    if (compareOneCommand) {
      // This command should be hidden unless exactly one row is selected abd its a folder(FSObjType="1")
      compareOneCommand.visible = (event.selectedRows.length === 1) &&(event.selectedRows[0].getValueByName("FSObjType")=== "1");

    }
  }

  @override
  public onExecute(event: IListViewCommandSetExecuteEventParameters): void {
    debugger;
    switch (event.itemId) {
      case 'GET_FOLDER_ID':
        let folderID: string = event.selectedRows[0].getValueByName("uniqueId");
        debugger;
        const dialog: FolderIdDialog = new FolderIdDialog();
        dialog.folderID = folderID;
        dialog.title= this.properties.title;
        const url: string = this.properties.urlFormat.replace("{folderId}", folderID);
        dialog.url = url;
        dialog.show();
        break;
      default:
        throw new Error('Unknown command');
    }
  }
}
