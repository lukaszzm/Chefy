"use client";

import { getQueryClient } from "@/utils/get-query-client";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import type { Locale, Messages } from "next-intl";
import { NextIntlClientProvider } from "next-intl";

interface ProvidersProps extends React.PropsWithChildren {
  i18n?: {
    locale: Locale;
    messages: Messages;
  };
}

export function Providers({ i18n, children }: ProvidersProps) {
  const queryClient = getQueryClient();

  return (
    <NextIntlClientProvider locale={i18n?.locale} messages={i18n?.messages}>
      <QueryClientProvider client={queryClient}>
        {children}
        <ReactQueryDevtools />
      </QueryClientProvider>
    </NextIntlClientProvider>
  );
}
