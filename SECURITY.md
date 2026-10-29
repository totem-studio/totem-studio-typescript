# Security

Report suspected vulnerabilities privately to **hello@totemstudio.ai**. Include
the SDK version (`SDK_VERSION`), a minimal reproduction using fictitious
credentials/data, and request IDs when available. Do not include live keys,
private client records or customer payloads in a GitHub issue.

This SDK uses administrator-level read-only secrets. Keep them on trusted
servers. A key can read private-channel metadata for its granted teams; scope
integrations to the teams they need and revoke exposed keys in Totem Settings.
The package has no runtime dependencies, refuses browser pages and browser
workers, encodes opaque cursors as data, rejects unsafe base URLs and does not
follow redirects. Custom `fetch` implementations receive the credential and
must be trusted.

Install the release tarball from this repository's GitHub releases, checked
against the `.sha256` file published with it, or use the Git tag (see the
README). The SHA-256 shows that your download is complete and unchanged. It
comes from the same release as the tarball, so it does not independently show
that Totem built the file: whoever could replace the tarball could replace the
checksum too.

Once the [current repository README](https://github.com/totem-studio/totem-studio-typescript#install)
confirms the official npm package, the beta can also be installed as
`@totemstudioai/sdk@beta`. Until then, do not give a key to an unverified
package using that name. Check the registry's package information and any
available provenance for the particular version; do not assume that every
version has a provenance attestation.

Error messages name only the HTTP status, error code and parameter name. An
error's `problem`, `cause` and `retryAfterMs` come from the response or the
network and can carry response text: do not log whole error objects where
records must not appear.

The API and SDK are Beta. Report bugs with the HTTP status, machine-readable
error code, request ID and contract hash (`CONTRACT_SHA256`). Security reports
receive private handling; no response-time guarantee is implied.
