import { Injectable, Logger } from '@nestjs/common';
import { CoinApiRepository } from 'src/coin-api/coin-api.repository';
import { IAssetData } from 'src/coin-api/interfaces/asset-data.interface';
import { IAssetIcon } from 'src/coin-api/interfaces/asset-icon.interface';
import { BaseError } from 'src/errors/base-error.abstract-error';
import { FilterDto } from 'src/shared/dtos/filter.dto';
import { CryptoCurrencyRepository } from './crypto-currency.repository';
import { CryptoCurrencyDto } from './dtos/crypto-currency.dto';
import { GetCryptoCurrencyBySymbolDto } from './dtos/get-crypto-currency-by-symbol.dto';
import { SearchCryptoCurrencyDto } from './dtos/search-crypto-currency.dto';
import { UpdateCryptoCurrencyDto } from './dtos/update-crypto-currency.dto';
import { IFormattedAsset } from './interfaces/formatted-asset.interface';

@Injectable()
export class CryptoCurrencyService {
  constructor(
    private readonly cryptoCurrencyRepository: CryptoCurrencyRepository,
    private readonly coinApiRepository: CoinApiRepository,
  ) {}

  public async getOneCryptoCurrencyBySymbol(
    getOneEntityDto: GetCryptoCurrencyBySymbolDto,
  ) {
    return await this.cryptoCurrencyRepository.getOneEntity(getOneEntityDto);
  }

  public async getCryptoCurrencies(
    filter: FilterDto,
  ): Promise<[BaseError, CryptoCurrencyDto[]]> {
    return await this.cryptoCurrencyRepository.getEntities(filter);
  }

  // EXTRA
  public async searchCryptoCurrency(
    input: SearchCryptoCurrencyDto,
  ): Promise<[BaseError, CryptoCurrencyDto[]]> {
    return await this.cryptoCurrencyRepository.searchCryptoCurrency(input);
  }

  public async updateCryptoCurrencyData(): Promise<[BaseError, boolean]> {
    const logger = new Logger('CryptoCurrencyService');

    logger.log('Updating CryptoCurrency data...');

    const [err, asset] = await this.cryptoCurrencyRepository.getOneEntity({});

    if (err) {
      return [err, null];
    }

    const today = new Date(Date.now()).getDate();

    if (asset.lastUpdated === today) {
      logger.log('Already up to date');
      return [null, true];
    }

    const [getCryptoErr, assets] = await this._getCryptoCurrencies();

    if (getCryptoErr) {
      return [getCryptoErr, null];
    }

    const updates: UpdateCryptoCurrencyDto[] = assets.map(asset => {
      return {
        getOneEntityDto: {
          symbol: asset.symbol,
        },
        updateEntityPayload: {
          icon: asset.icon,
          price: asset.price,
          name: asset.name,
          symbol: asset.symbol,
          lastUpdated: today,
        },
      };
    });

    const res = await this.cryptoCurrencyRepository.bulkUpdate(updates);

    logger.log('CryptoCurrency data updated');
    return [null, res];
  }

  private async _getCryptoCurrencies(): Promise<
    [BaseError, IFormattedAsset[]]
  > {
    try {
      const { data: icons } = await this.coinApiRepository.getAssetsIcons();
      const { data: assets } = await this.coinApiRepository.getAssets();

      const res = this.formatAssets(icons, assets);

      return [null, res];
    } catch (error) {
      return [error, null];
    }
  }

  private formatAssets(
    iconsData: IAssetIcon[],
    assetsData: IAssetData[],
  ): IFormattedAsset[] {
    const assetIconMap: Map<string, IAssetIcon> = new Map();

    iconsData.forEach(el => {
      assetIconMap.set(el.asset_id, el);
    });

    const formattedAssets: IFormattedAsset[] = [];

    assetsData.forEach(el => {
      if (el.type_is_crypto === 1) {
        const asset: IFormattedAsset = {
          name: el.name,
          price: el.price_usd ?? 0,
          symbol: el.asset_id,
          icon: assetIconMap.get(el.asset_id)?.url,
        };

        formattedAssets.push(asset);
      }
    });

    return formattedAssets;
  }
}
