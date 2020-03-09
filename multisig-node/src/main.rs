#![warn(missing_docs)]
#![warn(unused_extern_crates)]

mod chain_spec;
#[macro_use]
mod service;
mod cli;

pub use sc_cli::{VersionInfo, IntoExit, error};

fn main() -> Result<(), cli::error::Error> {
	let version = VersionInfo {
		name: "Substrate Node",
		commit: env!("VERGEN_SHA_SHORT"),
		version: env!("CARGO_PKG_VERSION"),
		executable_name: "multisig",
		author: "f3joule",
		description: "Multi-signature wallet implementation",
		support_url: "support.anonymous.an",
	};

	cli::run(std::env::args(), cli::Exit, version)
}
