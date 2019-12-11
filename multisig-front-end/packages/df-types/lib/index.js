"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const codec_1 = require("@polkadot/types/codec");
const types_1 = require("@polkadot/types");
const blogs_1 = require("./blogs");
class Announcing extends types_1.BlockNumber {
}
exports.Announcing = Announcing;
class Voting extends types_1.BlockNumber {
}
exports.Voting = Voting;
class Revealing extends types_1.BlockNumber {
}
exports.Revealing = Revealing;
class ElectionStage extends codec_1.EnumType {
    constructor(value, index) {
        super({
            Announcing,
            Voting,
            Revealing
        }, value, index);
    }
    /** Create a new Announcing stage. */
    static Announcing(endsAt) {
        return this.newElectionStage(Announcing.name, endsAt);
    }
    /** Create a new Voting stage. */
    static Voting(endsAt) {
        return this.newElectionStage(Voting.name, endsAt);
    }
    /** Create a new Revealing stage. */
    static Revealing(endsAt) {
        return this.newElectionStage(Revealing.name, endsAt);
    }
    static newElectionStage(stageName, endsAt) {
        return new ElectionStage({ [stageName]: endsAt });
    }
}
exports.ElectionStage = ElectionStage;
function registerDfTypes() {
    blogs_1.registerBlogsTypes();
}
exports.registerDfTypes = registerDfTypes;
