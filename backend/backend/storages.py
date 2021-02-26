from cloudinary_storage.storage import MediaCloudinaryStorage
from storages.backends.azure_storage import AzureStorage


class StaticAzureStorage(AzureStorage):
    azure_container = "static"


# class MediaCloudinaryStorage(MediaCloudinaryStorage):
#     pass
