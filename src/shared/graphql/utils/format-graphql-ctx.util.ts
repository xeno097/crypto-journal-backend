import { IApolloServerExpressContext } from 'src/shared/interfaces/apollo-server-express-context.interface';

export const formatExpressGraphqlCtx = (ctx: IApolloServerExpressContext) => {
  const { req } = ctx;

  const token = req.headers.authorization;

  return {
    authorization: token,
  };
};
