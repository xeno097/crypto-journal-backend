export interface IAssetData {
  asset_id: string;
  name: string;
  type_is_crypto: 1 | 0;
  price_usd: number;
}

export interface IAssetsDataResponse {
  data: IAssetData[];
  headers: Record<string, any>;
}

export interface IAssetDataResponse {
  data?: IAssetData;
  headers: Record<string, any>;
}
