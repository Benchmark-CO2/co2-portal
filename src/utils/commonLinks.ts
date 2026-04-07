export const CUR_USAGE = "internal";

export const commonLinks = {
  faq: {
    internal: "/faq" as const,
    external: "https://faq.example.com" as const,
  },
  glossary: {
    internal: "/glossario" as const,
    external: "https://glossary.example.com" as const,
  },
  lancamento: {
    internal: "/lancamento" as const,
    external: "/lancamento" as const,
  },
  // lancamento: {
  //   internal: "/lancamento" as const,
  //   external: "/lancamento" as const,
  // },
  repository: {
    internal: "/repositorio" as const,
    external: "https://bipc.org.br/repositorio" as const,
  },
  contact: {
    internal: "/contact" as const,
    external: "https://contact.example.com" as const,
  },
  privacy: {
    internal: "/privacidade" as const,
    external: "https://privacy.example.com" as const,
  },
  terms: {
    internal: "/termos-de-uso" as const,
    external: "https://termsofuse.example.com" as const,
  },
  dataForm: {
    internal: "/exercer-meus-direitos" as const,
    external: "https://dataform.example.com" as const,
  },
} as const;

export type CommonLinkKey = keyof typeof commonLinks;
