import { SerializedFarmConfig } from '@pancakeswap/farms'
import { bscTokens } from '@pancakeswap/tokens'
import { CAKE_BNB_LP_MAINNET } from './common'

const farms: SerializedFarmConfig[] = [
  /**
   * These 3 farms (PID 0, 2, 3) should always be at the top of the file.
   */
  {
    pid: 0,
    v1pid: 0,
    lpSymbol: 'CAKE',
    lpAddress: '0x0E09FaBB73Bd3Ade0a17ECC321fD13a19e81cE82',
    token: bscTokens.syrup,
    quoteToken: bscTokens.wbnb,
  },
  {
    pid: 2,
    v1pid: 251,
    lpSymbol: 'CAKE-BNB LP',
    lpAddress: CAKE_BNB_LP_MAINNET,
    token: bscTokens.cake,
    quoteToken: bscTokens.wbnb,
    boosted: true,
  },
  {
    pid: 39,
    v1pid: 389,
    lpSymbol: 'CAKE-BUSD LP',
    lpAddress: '0x804678fa97d91B974ec2af3c843270886528a9E6',
    boosted: true,
    token: bscTokens.cake,
    quoteToken: bscTokens.busd,
  },
  {
    pid: 47,
    v1pid: 422,
    lpSymbol: 'CAKE-USDT LP',
    lpAddress: '0xA39Af17CE4a8eb807E076805Da1e2B8EA7D0755b',
    token: bscTokens.cake,
    quoteToken: bscTokens.usdt,
    boosted: true,
  },
  {
    pid: 3,
    v1pid: 252,
    lpSymbol: 'BUSD-BNB LP',
    lpAddress: '0x58F876857a02D6762E0101bb5C46A8c1ED44Dc16',
    token: bscTokens.busd,
    quoteToken: bscTokens.wbnb,
  },
  //    * V3 by order of release (some may be out of PID order due to multiplier boost)
  {
    pid: 131,
    lpSymbol: 'HOOK-CAKE',
    lpAddress: '0x9e9b768174eF24233BF8AC2f4131F10ff5E72Dee',
    token: bscTokens.hook,
    quoteToken: bscTokens.cake,
  },
].map((p) => ({ ...p, token: p.token.serialize, quoteToken: p.quoteToken.serialize }))

export default farms
