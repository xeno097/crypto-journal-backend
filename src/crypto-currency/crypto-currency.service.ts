import { Injectable } from '@nestjs/common';
import { CreateCryptoCurrencyInput } from './dtos/create-crypto-currency.dto';
import { UpdateCryptoCurrencyInput } from './dtos/update-crypto-currency.dto';

@Injectable()
export class CryptoCurrencyService {
  create(createCryptoCurrencyInput: CreateCryptoCurrencyInput) {
    return 'This action adds a new cryptoCurrency';
  }

  findAll() {
    return `This action returns all cryptoCurrency`;
  }

  findOne(id: number) {
    return `This action returns a #${id} cryptoCurrency`;
  }

  update(id: number, updateCryptoCurrencyInput: UpdateCryptoCurrencyInput) {
    return `This action updates a #${id} cryptoCurrency`;
  }

  remove(id: number) {
    return `This action removes a #${id} cryptoCurrency`;
  }
}
