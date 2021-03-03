from django.shortcuts import render
from rest_framework.viewsets import ModelViewSet

from boards import serializers
from boards.models import Board


class BoardViewSet(ModelViewSet):
    '''
    User 의 Board 관련 REST API 제공

    ---

    '''
    queryset = Board.objects.all()
    serializer_class = serializers.BoardSerializer
    filterset_fields = ['author__username']

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)

    # def get_queryset(self):
    #     qs = super().get_queryset().filter()
    #     print(self.request.data)
    #     return qs

    # def retrieve(self, request, *args, **kwargs):
    #     board = get_object_or_404(Board, pk=request.pk)
    #     serializer = self.get_serializer(board)
    #     return Response(serializer.data)