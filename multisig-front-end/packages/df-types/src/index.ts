import { EnumType } from '@polkadot/types/codec';
import { BlockNumber } from '@polkadot/types';
import { registerBlogsTypes } from './blogs';

export class Announcing extends BlockNumber { }
export class Voting extends BlockNumber { }
export class Revealing extends BlockNumber { }

export class ElectionStage extends EnumType<Announcing | Voting | Revealing> {
  constructor (value?: any, index?: number) {
    super({
      Announcing,
      Voting,
      Revealing
    }, value, index);
  }

  /** Create a new Announcing stage. */
  static Announcing (endsAt: BlockNumber | number): ElectionStage {
    return this.newElectionStage(Announcing.name, endsAt);
  }

  /** Create a new Voting stage. */
  static Voting (endsAt: BlockNumber | number): ElectionStage {
    return this.newElectionStage(Voting.name, endsAt);
  }

  /** Create a new Revealing stage. */
  static Revealing (endsAt: BlockNumber | number): ElectionStage {
    return this.newElectionStage(Revealing.name, endsAt);
  }

  static newElectionStage (stageName: string, endsAt: BlockNumber | number) {
    return new ElectionStage({ [stageName]: endsAt });
  }
}

export function registerDfTypes () {
  registerBlogsTypes();
}
