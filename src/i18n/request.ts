// import { getRequestConfig } from "next-intl/server";
// import { cookies } from "next/headers";

// export type Messages = {
//   [key: string]: string | Messages;
// };

// export default getRequestConfig(
//   // async ({ locale }): Promise<{ locale: string; messages: Messages }> => {
//   async () => {
//     // Kalau undefined, fallback ke "id"
//     // const safeLocale = locale ?? "id";
//     const store = await cookies();
//     const locale = store.get("locale")?.value || "en";
//     const messages: Messages = (await import(`../locales/${locale}.json`))
//       .default;

//     return {
//       locale,
//       messages,
//     };
//     // try {
//     //   const messages: Messages = (await import(`../locales/${safeLocale}.json`))
//     //     .default;
//     //   return {
//     //     locale: safeLocale,
//     //     messages,
//     //   };
//     // } catch (error) {
//     //   const messages: Messages = (await import("../locales/id.json")).default;
//     //   return {
//     //     locale: "id",
//     //     messages,
//     //   };
//     // }
//   }
// );

import { hasLocale } from "next-intl";
import { getRequestConfig } from "next-intl/server";
import { routing } from "./routing";

export type Messages = {
  [key: string]: string | Messages;
};

export default getRequestConfig(async ({ requestLocale }) => {
  // Typically corresponds to the `[locale]` segment
  const requested = await requestLocale;
  const locale = hasLocale(routing.locales, requested)
    ? requested
    : routing.defaultLocale;

  return {
    locale,
    messages: (await import(`../locales/${locale}.json`)).default,
  };
});
