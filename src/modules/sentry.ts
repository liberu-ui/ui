import * as SentryLib from "@sentry/vue";
import { Integrations } from "@sentry/tracing";
import reportable from '@liberu-ui/sentry';

/**
 * The Sentry class for initializing Sentry error tracking and reporting.
 */
class Sentry {
  /**
   * Create a new instance of the Sentry class.
   * @param {VueConstructor} app - The Vue instance.
   * @param {VueRouter} router - The Vue router instance.
   */
  constructor(app: VueConstructor, router: VueRouter) {
    this.app = app;
    this.router = router;
  }

  /**
   * Initialize Sentry with the specified state.
   * @param {State} state - The application state.
   */
  init(state: State): void {
    SentryLib.init({
      app: this.app,
      dsn: state.meta.sentryDsn,
      environment: state.meta.env,
      integrations: [
        new Integrations.BrowserTracing({
          routingInstrumentation: SentryLib.vueRouterInstrumentation(this.router),
          tracingOrigins: ["localhost", /^\//],
        }),
      ],
      logErrors: true,
      tracesSampleRate: 0,
      beforeSend: (event: SentryEvent): PromiseOrSentryEvent => reportable(event),
    });

    SentryLib.setUser({
      id: state.user.id,
      email: state.user.email,
      role: state.user.role,
    });
  }
}

export default Sentry;