# Advertising integration

Verified in the signed-in Adsterra Websites dashboard on 2026-09-08 for
`dungeonquestrebornguide.wiki`. Both units were Active and their Get Code dialogs
matched the supplied URLs exactly. No dashboard settings were changed.

| Script host | Format | Provider placement |
| --- | --- | --- |
| `pl31241049.profitableratecpmnetwork.com` | Popunder | Before closing `</head>` |
| `pl31241050.profitableratecpmnetwork.com` | Social Bar | Before closing `</body>` |

Popunder opens a promotional tab/window after a qualifying interaction. Social
Bar renders provider-controlled floating UI. Neither consumes a fixed inline
banner container, so adding an empty banner rectangle would not enable either
unit. Keep each script mounted once in the root layout. Popunder uses a native
async head script to avoid blocking the app on provider availability. Social Bar
uses `next/script` after hydration in the body.

Provider references:
- [Popunder installation](https://adsterra.com/blog/popunder-traffic-monetization/)
- [Social Bar installation and positioning](https://adsterra.com/blog/publishers-guide-to-social-bar/)

## Verification

Start a fresh production build locally with `NEXT_PUBLIC_SITE_URL` set to the
production domain. Set `TEST_BASE` to the running local server (default
`http://127.0.0.1:3419`).

- `npm run qa:ads`: controlled script fixtures and blocked requests, at desktop
  and mobile widths. Checks head/body placement, exact URLs, one load per document,
  client navigation, no overflow, and no uncaught errors. Fixtures are not ads.
- `npm run qa:ads -- --live`: requests the real provider. Reports response status,
  response bytes and failures separately from integration checks. Exit 2 means
  delivery is unconfirmed, including an empty HTTP 200; exit 1 is an integration
  failure. Even a nonempty script does not prove a visible ad or billable impression.
- Reports and screenshots are saved under ignored `qa-artifacts/ads/`.

## Observed limits on 2026-09-08

The initial local checks received HTTP 200 with zero-byte bodies. A subsequent
command-line request with a browser user agent and production Referer returned
HTTP 403. The connected Chrome browser also reported `ERR_BLOCKED_BY_CLIENT` on
directly opening the Popunder script. These observations do not identify which
extension or network policy is responsible, or establish a provider-side cause.
Do not disable visitors' protections, proxy the advertising script, or alter
provider keys to make a test pass.

The live production HTML checked during diagnosis did not contain either script.
Pushing the integration branch is not proof of deployment or ad delivery. Actual
ad fill needs a production browser observation after the normal release process;
do not simulate ad clicks or impressions.
