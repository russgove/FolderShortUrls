import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import { override } from '@microsoft/decorators';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField,
} from '@microsoft/sp-webpart-base';
import { SPHttpClient, SPHttpClientResponse, SPHttpClientConfiguration } from '@microsoft/sp-http';

import * as strings from 'RedirectToFolderIdWebPartStrings';
import RedirectToFolderId from './components/RedirectToFolderId';
import { IRedirectToFolderIdProps } from './components/IRedirectToFolderIdProps';
import { setup as pnpSetup } from "@pnp/common";

import { Log } from '@microsoft/sp-core-library';
import { UrlQueryParameterCollection } from '@microsoft/sp-core-library';
const LOG_SOURCE: string = 'GetFolderIdCommandSet';
export interface IRedirectToFolderIdWebPartProps {
  description: string;
}

export default class RedirectToFolderIdWebPart extends BaseClientSideWebPart<IRedirectToFolderIdWebPartProps> {
 private message:string="";

  @override
  public onInit(): Promise<void> {
    Log.info(LOG_SOURCE, 'Initialized GetFolderIdCommandSet');
    debugger;
    return super.onInit().then(_ => {
      // other init code may be present
      pnpSetup({
        spfxContext: this.context
      });
      var queryParameters = new UrlQueryParameterCollection(window.location.href);
    var folderID: string = queryParameters.getValue("f");
    if (folderID) {
      //https://tronoxglobal.sharepoint.com/sites/OTDOrders/_api/web/GetFolderById(guid'{6c9363f4-2ec0-4898-a8ea-8e850008a25f}')
      let url =`${this.context.pageContext.web.absoluteUrl}/_api/web/GetFolderById(guid'${folderID}')`;
      return this.context.spHttpClient.get(url,
        SPHttpClient.configurations.v1)
        .then((response: SPHttpClientResponse) => {
          debugger;
          if (response.ok) {
            return response.json().then((f) => {
              debugger;
              let url2 = `//${window.location.hostname}${f.ServerRelativeUrl}`;
              this.redirect(url2);
            });
          }
          else {
            
            return response.json().then((f) => {
                debugger;
                this.message+=`The call to ${url} falled with the message '${f.error.message}'`;
            });
            
          }
        }).catch((e) => {
          debugger;
        });

    }


    });
  }


  public render(): void {


    // var queryParameters = new UrlQueryParameterCollection(window.location.href);
    // var folderID: string = queryParameters.getValue("f");
    // if (folderID) {
    //   //https://tronoxglobal.sharepoint.com/sites/OTDOrders/_api/web/GetFolderById(guid'{6c9363f4-2ec0-4898-a8ea-8e850008a25f}')
    //   this.context.spHttpClient.get(`${this.context.pageContext.web.absoluteUrl}/_api/web/GetFolderById(guid'${folderID}')`,
    //     SPHttpClient.configurations.v1)
    //     .then((response: SPHttpClientResponse) => {
    //       debugger;
    //       if (response.ok) {
    //         response.json().then((f) => {
    //           debugger;
    //           let url = `//${window.location.hostname}${f.ServerRelativeUrl}`
    //           this.redirect(url);
    //         });
    //       }
    //       else {
    //         this.spHttpClientResponse = response;
    //       }
    //     }).catch((e) => {
    //       debugger;
    //     });

    // }



    const element: React.ReactElement<IRedirectToFolderIdProps> = React.createElement(
      RedirectToFolderId,
      {
        message: this.message
      }
    );

    ReactDom.render(element, this.domElement);
  }
  public redirect(url: string, newTab?: boolean) {
    // Create a hyperlink element to redirect so that SharePoint uses modern redirection
    const link = document.createElement('a');
    link.href = url;

    link.target = newTab ? '_blank' : '';
    document.body.appendChild(link);
    link.click();
  }
  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
