import type { Locales } from "./src/config/locales";
import type messages from "./messages/en.json";

declare module "next-intl" {
  interface AppConfig {
    Locale: (typeof Locales)[keyof typeof Locales];
    Messages: typeof messages;
  }
}
