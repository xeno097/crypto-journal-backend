export interface IAssetIcon {
  asset_id: string;
  url: string;
}

export interface IAssetsIconResponse {
  data: IAssetIcon[];
  headers: Record<string, any>;
}
