import { CoinType } from "domains/coin/models";

export type Network = CoinType & { displayName: string };
