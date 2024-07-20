-- Delay the execution by 30 seconds
DO $$ BEGIN
    PERFORM pg_sleep(30);
END $$;

-- Insert statements
INSERT INTO public.angler_core_allcontainers (container_name, container_group) VALUES ('read', 'core');
INSERT INTO public.angler_core_allcontainers (container_name, container_group) VALUES ('change', 'core');
INSERT INTO public.angler_core_allcontainers (container_name, container_group) VALUES ('store', 'core');
INSERT INTO public.angler_core_allcontainers (container_name, container_group) VALUES ('test_g223', 'group2');
INSERT INTO public.angler_core_allcontainers (container_name, container_group) VALUES ('dodajanje_test', 'test3');
INSERT INTO public.angler_core_allcontainers (container_name, container_group) VALUES ('novu', 'group2');
INSERT INTO public.angler_core_allcontainers (container_name, container_group) VALUES ('tokenize', 'CLASSLA');
INSERT INTO public.angler_core_allcontainers (container_name, container_group) VALUES ('stanza_tokenize', 'STANZA');
INSERT INTO public.angler_core_allcontainers (container_name, container_group) VALUES ('stanza_ner', 'STANZA');
INSERT INTO public.angler_core_allcontainers (container_name, container_group) VALUES ('stanza_pos', 'STANZA');
INSERT INTO public.angler_core_allcontainers (container_name, container_group) VALUES ('stanza_lemma', 'STANZA');
INSERT INTO public.angler_core_allcontainers (container_name, container_group) VALUES ('stanza_mwt', 'STANZA');
INSERT INTO public.angler_core_allcontainers (container_name, container_group) VALUES ('stanza_depparse', 'STANZA');
INSERT INTO public.angler_core_allcontainers (container_name, container_group) VALUES ('stanza_constituency', 'STANZA');
INSERT INTO public.angler_core_allcontainers (container_name, container_group) VALUES ('stanza_sentiment', 'STANZA');
INSERT INTO public.angler_core_allcontainers (container_name, container_group) VALUES ('test_notice', 'group2');
INSERT INTO public.angler_core_allcontainers (container_name, container_group) VALUES ('classla_NER', 'CLASSLA');
INSERT INTO public.angler_core_allcontainers (container_name, container_group) VALUES ('classla_POS', 'CLASSLA');
INSERT INTO public.angler_core_allcontainers (container_name, container_group) VALUES ('classla_MWT', 'CLASSLA');
INSERT INTO public.angler_core_allcontainers (container_name, container_group) VALUES ('classla_LEMMA', 'CLASSLA');
INSERT INTO public.angler_core_allcontainers (container_name, container_group) VALUES ('classla_SENTIMENT', 'CLASSLA');
INSERT INTO public.angler_core_allcontainers (container_name, container_group) VALUES ('classla_CONSTITUENCY', 'CLASSLA');
INSERT INTO public.angler_core_allcontainers (container_name, container_group) VALUES ('classla_DEPPARSE', 'CLASSLA');
