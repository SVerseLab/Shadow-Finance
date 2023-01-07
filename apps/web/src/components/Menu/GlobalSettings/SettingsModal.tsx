import { useState, useCallback } from 'react'
import styled from 'styled-components'
import {
  Text,
  Toggle,
  Flex,
  Modal,
  InjectedModalProps,
  Box,
  QuestionHelper,
  Link,
} from '@pancakeswap/uikit'
import {
  useExpertModeManager,
  useUserExpertModeAcknowledgementShow,
  useUserSingleHopOnly,
  useZapModeManager,
} from 'state/user/hooks'
import { useUserSmartRouter } from 'state/user/smartRouter'
import { ChainId } from '@pancakeswap/sdk'
import { SUPPORT_ZAP } from 'config/constants/supportChains'
import { useSwapActionHandlers } from 'state/swap/useSwapActionHandlers'
import { useActiveChainId } from 'hooks/useActiveChainId'
import { useTranslation } from '@pancakeswap/localization'
import TransactionSettings from './TransactionSettings'
import ExpertModal from './ExpertModal'
import GasSettings from './GasSettings'
import { SettingsMode } from './types'

const ScrollableContainer = styled(Flex)`
  flex-direction: column;
  height: auto;
  ${({ theme }) => theme.mediaQueries.xs} {
    max-height: 90vh;
  }
  ${({ theme }) => theme.mediaQueries.md} {
    max-height: none;
  }
`

export const withCustomOnDismiss =
  (Component) =>
  ({
    onDismiss,
    customOnDismiss,
    mode,
    ...props
  }: {
    onDismiss?: () => void
    customOnDismiss: () => void
    mode: SettingsMode
  }) => {
    const handleDismiss = useCallback(() => {
      onDismiss?.()
      if (customOnDismiss) {
        customOnDismiss()
      }
    }, [customOnDismiss, onDismiss])

    return <Component {...props} mode={mode} onDismiss={handleDismiss} />
  }

const SettingsModal: React.FC<React.PropsWithChildren<InjectedModalProps>> = ({ onDismiss, mode }) => {
  const [showConfirmExpertModal, setShowConfirmExpertModal] = useState(false)
  const [showExpertModeAcknowledgement, setShowExpertModeAcknowledgement] = useUserExpertModeAcknowledgementShow()
  const [expertMode, toggleExpertMode] = useExpertModeManager()
  const [singleHopOnly, setSingleHopOnly] = useUserSingleHopOnly()
  const [zapMode, toggleZapMode] = useZapModeManager()
  const { onChangeRecipient } = useSwapActionHandlers()
  const { chainId } = useActiveChainId()
  const [smartRouterOpen, setSmartRouterOpen] = useUserSmartRouter()

  const { t } = useTranslation()

  if (showConfirmExpertModal) {
    return (
      <ExpertModal
        setShowConfirmExpertModal={setShowConfirmExpertModal}
        onDismiss={onDismiss}
        setShowExpertModeAcknowledgement={setShowExpertModeAcknowledgement}
      />
    )
  }

  const handleExpertModeToggle = () => {
    if (expertMode) {
      onChangeRecipient(null)
      toggleExpertMode()
    } else if (!showExpertModeAcknowledgement) {
      onChangeRecipient(null)
      toggleExpertMode()
    } else {
      setShowConfirmExpertModal(true)
    }
  }

  return (
    <Modal title={t('Settings')} headerBackground="gradientCardHeader" onDismiss={onDismiss}>
      <ScrollableContainer>
        {mode === SettingsMode.GLOBAL && (
          <>
            <Flex pb="24px" flexDirection="column">
              <Text bold textTransform="uppercase" fontSize="18px" color="secondary" mb="24px">
                {t('Global')}
              </Text>
              {chainId === ChainId.BSC && <GasSettings />}
            </Flex>
          </>
        )}
        {mode === SettingsMode.SWAP_LIQUIDITY && (
          <>
            <Flex pt="3px" flexDirection="column">
              <Text bold textTransform="uppercase" fontSize="18px" color="secondary" mb="24px">
                {t('Swaps & Liquidity')}
              </Text>
              <Flex justifyContent="space-between" alignItems="center" mb="24px">
                {chainId === ChainId.BSC && <GasSettings />}
              </Flex>
              <TransactionSettings />
            </Flex>
            {SUPPORT_ZAP.includes(chainId) && (
              <Flex justifyContent="space-between" alignItems="center" mb="24px">
                <Flex alignItems="center">
                  <Text>{t('Zap (Beta)')}</Text>
                  <QuestionHelper
                    text={
                      <Box>
                        <Text>
                          {t(
                            'Zap enables simple liquidity provision. Add liquidity with one token and one click, without manual swapping or token balancing.',
                          )}
                        </Text>
                        <Text>
                          {t(
                            'If you experience any issue when adding or removing liquidity, please disable Zap and retry.',
                          )}
                        </Text>
                      </Box>
                    }
                    placement="top-start"
                    ml="4px"
                  />
                </Flex>
                <Toggle
                  checked={zapMode}
                  scale="md"
                  onChange={() => {
                    toggleZapMode(!zapMode)
                  }}
                />
              </Flex>
            )}
            <Flex justifyContent="space-between" alignItems="center" mb="24px">
              <Flex alignItems="center">
                <Text>{t('Expert Mode')}</Text>
                <QuestionHelper
                  text={t('Bypasses confirmation modals and allows high slippage trades. Use at your own risk.')}
                  placement="top-start"
                  ml="4px"
                />
              </Flex>
              <Toggle
                id="toggle-expert-mode-button"
                scale="md"
                checked={expertMode}
                onChange={handleExpertModeToggle}
              />
            </Flex>
            <Flex justifyContent="space-between" alignItems="center" mb="24px">
              <Flex alignItems="center">
                <Text>{t('Disable Multihops')}</Text>
                <QuestionHelper text={t('Restricts swaps to direct pairs only.')} placement="top-start" ml="4px" />
              </Flex>
              <Toggle
                id="toggle-disable-multihop-button"
                checked={singleHopOnly}
                scale="md"
                onChange={() => {
                  setSingleHopOnly(!singleHopOnly)
                }}
              />
            </Flex>
            <Flex justifyContent="space-between" alignItems="center" mb="24px">
              <Flex alignItems="center">
                <Text>{t('Smart Router (Beta)')}</Text>
                <QuestionHelper
                  text={
                    <Flex>
                      <Text mr="5px">{t('Smart Router (Beta)')}</Text>
                      <Link href="https://docs.pancakeswap.finance/products/pancakeswap-exchange/smart-router">
                        {t('Find out more')}
                      </Link>
                    </Flex>
                  }
                  placement="top-start"
                  ml="4px"
                />
              </Flex>
              <Toggle
                id="toggle-disable-smartRouter-button"
                checked={smartRouterOpen}
                onChange={(e) => setSmartRouterOpen(e.target.checked)}
                scale="md"
              />
            </Flex>
          </>
        )}
      </ScrollableContainer>
    </Modal>
  )
}

export default SettingsModal
