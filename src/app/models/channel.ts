import { Nullable } from "primeng/ts-helpers";

export enum ChannelMode {
    Off,
    Prod,
    Test,
    Dev
  }
  
export interface IChannel {
  id: string; 
  name?: Nullable<string> | undefined; 
  stream?: Nullable<string> | undefined; 
  mode?: "Off" | "Prod" | "Test" | "Dev" | null | undefined; 
  image?: string | undefined; 
}
