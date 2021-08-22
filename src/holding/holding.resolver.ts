import { UseGuards } from '@nestjs/common';
import { Query, Resolver } from '@nestjs/graphql';
import { JwtPayloadDto } from 'src/auth/dtos/jwt-payload.dto';
import { GqlJwtPayload } from 'src/shared/decorators/jwt-payload.decorator';
import { getError } from 'src/shared/graphql/utils/get-graphql-error.util';
import { GqlAuthGuard } from 'src/shared/guards/gql-auth.guard';
import { HoldingType } from './graphql/object-types/holding.object-type';
import { HoldingResult } from './graphql/union-types/holding-result.union-type';
import { HoldingService } from './holding.service';

@Resolver(() => HoldingType)
@UseGuards(GqlAuthGuard)
export class HoldingResolver {
  constructor(private readonly holdingService: HoldingService) {}

  @Query(() => [HoldingResult])
  public async getSelfHoldings(
    @GqlJwtPayload() jwtPayloadDto: JwtPayloadDto,
  ): Promise<Array<typeof HoldingResult>> {
    const [err, res] = await this.holdingService.getSelfHoldings(jwtPayloadDto);

    if (err) {
      return [getError(err)];
    }

    return res;
  }
}
