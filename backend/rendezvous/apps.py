from django.apps import AppConfig


class RendezvousConfig(AppConfig):
    name = 'rendezvous'

    def ready(self):
        import rendezvous.signals
