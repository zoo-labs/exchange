// Provider wiring for the Zoo exchange Vite SPA. Mirrors lux/exchange.
// Uses import.meta.env (Vite) and VITE_* env key convention.

import { createPublicClient, http } from 'viem'
import { RegulatedProviderClient } from '@z.o/provider'
import { readProviderConfig } from '@z.o/provider/config'

const env = (import.meta as ImportMeta & { env?: Record<string, string | undefined> }).env ?? {}

export const providerConfig = readProviderConfig(env)

const rpc = env.VITE_RPC_URL ?? 'http://127.0.0.1:8545'

export const providerClient = new RegulatedProviderClient(
  { adapter: providerConfig.adapter, router: providerConfig.router ?? '0x0000000000000000000000000000000000000000' as `0x${string}` },
  createPublicClient({ transport: http(rpc) }),
)
