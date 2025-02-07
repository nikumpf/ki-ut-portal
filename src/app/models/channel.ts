export enum ChannelMode {
    Off,
    Prod,
    Test,
    Dev
  }
  
  export interface IChannel {
    id: string;
    name: string;
    stream: string;
    mode: ChannelMode;
  }
  