import { useState, useCallback } from 'react'
import { useAccount } from 'wagmi'
import BigNumber from 'bignumber.js'
import { Ifo, PoolIds } from 'config/constants/types'
import { useERC20, useIfoV3Contract } from 'hooks/useContract'
import { multicallv2 } from 'utils/multicall'
import ifoV3Abi from 'config/abi/ifoV3.json'
import { fetchCakeVaultUserData } from 'state/pools'
import { useAppDispatch } from 'state'
import { BIG_ZERO } from '@pancakeswap/utils/bigNumber'
import useIfoAllowance from '../useIfoAllowance'
import { WalletIfoState, WalletIfoData } from '../../types'

const initialState = {
  isInitialized: false,
  poolBasic: {
    amountTokenCommittedInLP: BIG_ZERO,
    offeringAmountInToken: BIG_ZERO,
    refundingAmountInLP: BIG_ZERO,
    taxAmountInLP: BIG_ZERO,
    hasClaimed: false,
    isPendingTx: false,
   
  },
  poolUnlimited: {
    amountTokenCommittedInLP: BIG_ZERO,
    offeringAmountInToken: BIG_ZERO,
    refundingAmountInLP: BIG_ZERO,
    taxAmountInLP: BIG_ZERO,
    hasClaimed: false,
    isPendingTx: false,
    
  },
}

/**
 * Gets all data from an IFO related to a wallet
 */
const useGetWalletIfoData = (ifo: Ifo): WalletIfoData => {
  const [state, setState] = useState<WalletIfoState>(initialState)
  const dispatch = useAppDispatch()
 

  const { address, currency } = ifo

  const { address: account } = useAccount()
  const contract = useIfoV3Contract(address)
  const currencyContract = useERC20(currency.address, false)
  const allowance = useIfoAllowance(currencyContract, address)

  const setPendingTx = (status: boolean, poolId: PoolIds) =>
    setState((prevState) => ({
      ...prevState,
      [poolId]: {
        ...prevState[poolId],
        isPendingTx: status,
      },
    }))

  const setIsClaimed = (poolId: PoolIds) => {
    setState((prevState) => ({
      ...prevState,
      [poolId]: {
        ...prevState[poolId],
        hasClaimed: true,
      },
    }))
  }

  const fetchIfoData = useCallback(async () => {
    const ifoCalls = ['viewUserInfo', 'viewUserOfferingAndRefundingAmountsForPools'].map((method) => ({
      address,
      name: method,
      params: [account, [0, 1]],
    }))

  
    dispatch(fetchCakeVaultUserData({ account }))

    const [
      userInfo,
      amounts,
    ] = await multicallv2({ abi: ifoV3Abi, calls: [...ifoCalls], options: { requireSuccess: false } })

    setState((prevState) => ({
      ...prevState,
      isInitialized: true,
      poolBasic: {
        ...prevState.poolBasic,
        amountTokenCommittedInLP: new BigNumber(userInfo[0][0].toString()),
        offeringAmountInToken: new BigNumber(amounts[0][0][0].toString()),
        refundingAmountInLP: new BigNumber(amounts[0][0][1].toString()),
        taxAmountInLP: new BigNumber(amounts[0][0][2].toString()),
        hasClaimed: userInfo[1][0],
      },
      poolUnlimited: {
        ...prevState.poolUnlimited,
        amountTokenCommittedInLP: new BigNumber(userInfo[0][1].toString()),
        offeringAmountInToken: new BigNumber(amounts[0][1][0].toString()),
        refundingAmountInLP: new BigNumber(amounts[0][1][1].toString()),
        taxAmountInLP: new BigNumber(amounts[0][1][2].toString()),
        hasClaimed: userInfo[1][1],
      },
    }))
  }, [account, address, dispatch])

  const resetIfoData = useCallback(() => {
    setState({ ...initialState })
  }, [])

  

  return { ...state, allowance, contract, setPendingTx, setIsClaimed, fetchIfoData, resetIfoData }
}

export default useGetWalletIfoData
