import NodeCache from 'node-cache';

import serverConfig from '@server/serverConfig';

export const cache = new NodeCache({ stdTTL: serverConfig.cacheExpireTimeSeconds });
