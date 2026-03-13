<wizard-report>
# PostHog post-wizard report

The wizard has completed a full PostHog integration for the DevEvent Next.js App Router project. PostHog is now initialized client-side via `instrumentation-client.ts` (the recommended approach for Next.js 15.3+), with a reverse proxy configured in `next.config.ts` to route analytics through `/ingest` and reduce ad-blocker interference. Environment variables are stored securely in `.env.local`. Two key user actions are now tracked with meaningful properties, and automatic exception capture is enabled for error tracking.

| Event Name | Description | File |
|---|---|---|
| `explore_events_clicked` | User clicked the "Explore Events" button on the homepage hero section | `components/ExploreBtn.tsx` |
| `event_card_clicked` | User clicked on an event card to view event details (captures `title`, `slug`, `location`) | `components/EventCard.tsx` |

## Next steps

We've built some insights and a dashboard for you to keep an eye on user behavior, based on the events we just instrumented:

- **Dashboard – Analytics basics**: https://eu.posthog.com/project/138012/dashboard/558680
- **Insight – Event engagement over time**: https://eu.posthog.com/project/138012/insights/8R0WNBKd
- **Insight – Explore to event click funnel**: https://eu.posthog.com/project/138012/insights/g3HY7LRm
- **Insight – Most popular events by clicks**: https://eu.posthog.com/project/138012/insights/fykRS6JH

### Agent skill

We've left an agent skill folder in your project. You can use this context for further agent development when using Claude Code. This will help ensure the model provides the most up-to-date approaches for integrating PostHog.

</wizard-report>
