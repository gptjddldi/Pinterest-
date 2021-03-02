from rest_framework.pagination import LimitOffsetPagination, CursorPagination


class CustomLimitOffsetPagination(LimitOffsetPagination):
    page_size = 30
    ordering = '-created_at'


class CustomCursorPagination(CursorPagination):
    page_size = 32
    ordering = '-created_at'
