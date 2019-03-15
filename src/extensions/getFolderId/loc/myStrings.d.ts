declare interface IGetFolderIdCommandSetStrings {
  GET_FOLDER_ID: string;
  Command2: string;
}

declare module 'GetFolderIdCommandSetStrings' {
  const strings: IGetFolderIdCommandSetStrings;
  export = strings;
}
