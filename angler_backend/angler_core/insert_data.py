from django.core.management.base import BaseCommand
from .models import AllContainers

class Command(BaseCommand):
    help = 'Insert initial data into the angler_core_allcontainers table'

    def handle(self, *args, **kwargs):
        data = [
            {'container_name': 'read', 'container_group': 'core'},
            {'container_name': 'change', 'container_group': 'core'},
            {'container_name': 'store', 'container_group': 'core'},
            {'container_name': 'test_g223', 'container_group': 'group2'},
            {'container_name': 'dodajanje_test', 'container_group': 'test3'},
            {'container_name': 'novu', 'container_group': 'group2'},
            {'container_name': 'tokenize', 'container_group': 'CLASSLA'},
            {'container_name': 'stanza_tokenize', 'container_group': 'STANZA'},
            {'container_name': 'stanza_ner', 'container_group': 'STANZA'},
            {'container_name': 'stanza_pos', 'container_group': 'STANZA'},
            {'container_name': 'stanza_lemma', 'container_group': 'STANZA'},
            {'container_name': 'stanza_mwt', 'container_group': 'STANZA'},
            {'container_name': 'stanza_depparse', 'container_group': 'STANZA'},
            {'container_name': 'stanza_constituency', 'container_group': 'STANZA'},
            {'container_name': 'stanza_sentiment', 'container_group': 'STANZA'},
            {'container_name': 'test_notice', 'container_group': 'group2'},
            {'container_name': 'classla_NER', 'container_group': 'CLASSLA'},
            {'container_name': 'classla_POS', 'container_group': 'CLASSLA'},
            {'container_name': 'classla_MWT', 'container_group': 'CLASSLA'},
            {'container_name': 'classla_LEMMA', 'container_group': 'CLASSLA'},
            {'container_name': 'classla_SENTIMENT', 'container_group': 'CLASSLA'},
            {'container_name': 'classla_CONSTITUENCY', 'container_group': 'CLASSLA'},
            {'container_name': 'classla_DEPPARSE', 'container_group': 'CLASSLA'},
        ]

        for item in data:
            AllContainers.objects.create(**item)

        self.stdout.write(self.style.SUCCESS('Successfully inserted data'))
