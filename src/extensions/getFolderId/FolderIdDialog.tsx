import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { BaseDialog, IDialogConfiguration } from '@microsoft/sp-dialog';
import { Link } from "office-ui-fabric-react/lib/Link";

import {
    Label, TextField,
    PrimaryButton,
    Button,
    DialogFooter,
    DialogContent
} from 'office-ui-fabric-react';

import { autobind } from '@uifabric/utilities';
interface IFolderIdDialogContentProps {
    floderId: string;
    url: string;
    close: () => void;
    title:string;

}
interface IFolderIdDialogContentState{
   
    popupText: string;
  

}
class FolderIdDialogContent extends React.Component<IFolderIdDialogContentProps, IFolderIdDialogContentState> {


    constructor(props) {
        super(props);
        this.state={popupText:"Click here to copy"};

    }

    public copy(): void {
        debugger;
        const el = document.createElement('textarea');
        el.value = this.props.url;
        document.body.appendChild(el);
        el.select();
        document.execCommand('copy');
        document.body.removeChild(el);
        this.setState((current) => ({ ...current, popupText: "Copied" }));
    }

    public render(): JSX.Element {
        debugger;
        return <DialogContent
            title={this.props.title}
            onDismiss={this.props.close}
            showCloseButton={true}
        >
            <Label >{this.props.url}</Label>
            <div>
            <Link onClick={this.copy.bind(this)}
                onMouseLeave={() => { 
                    this.setState((current) => ({ ...current, popupText: "Click here to copy" })) ;
                }}
                onMouseEnter={() => {
                     this.setState((current) => ({ ...current, popupText: "Click here to copy" })) ;
                    }} 
            
            >{this.state.popupText}</Link>
            </div>
            <DialogFooter>
                <Button text='Done' title='Done' onClick={this.props.close} />

            </DialogFooter>
        </DialogContent>;
    }

}
export default class FolderIdDialog extends BaseDialog {

    public folderID: string;
    public url: string;
    public title: string;
    public render(): void {
        ReactDOM.render(<FolderIdDialogContent
            close={this.close}
            floderId={this.folderID}
            url={this.url}
            title={this.title}

        />, this.domElement);
    }

    public getConfig(): IDialogConfiguration {
        return {
            isBlocking: false
        };
    }

    protected onAfterClose(): void {
        super.onAfterClose();

        // Clean up the element for the next dialog
        ReactDOM.unmountComponentAtNode(this.domElement);
    }


}