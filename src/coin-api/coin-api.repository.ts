import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import {
  IAssetData,
  IAssetDataResponse,
  IAssetsDataResponse,
} from './interfaces/asset-data.interface';
import {
  IAssetIcon,
  IAssetsIconResponse,
} from './interfaces/asset-icon.interface';

@Injectable()
export class CoinApiRepository {
  constructor(private readonly httpService: HttpService) {}

  public async getAssetById(id: string): Promise<IAssetDataResponse> {
    const { data, headers } = await this.getAssets(id);

    const [asset] = data;

    return {
      data: asset ?? null,
      headers,
    };
  }

  public async getAssets(...assetIds: string[]): Promise<IAssetsDataResponse> {
    const param = this.formatAssetIds(assetIds);

    const { data, headers } = await this.httpService.axiosRef.get<IAssetData[]>(
      `/v1/assets/${param}`,
    );

    return {
      data,
      headers,
    };
  }

  private formatAssetIds(assetIds: string[]): string {
    if (!assetIds) return '';

    return assetIds.join(',');
  }

  public async getAssetsIcons(iconSize = 48): Promise<IAssetsIconResponse> {
    const { data, headers } = await this.httpService.axiosRef.get<IAssetIcon[]>(
      `/v1/assets/icons/${iconSize}`,
    );

    return { data, headers };
  }
}
