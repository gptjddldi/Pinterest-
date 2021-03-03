from django.shortcuts import render
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.generics import get_object_or_404
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet

from boards import serializers
from boards.models import Board
from pin.models import Pin


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

@api_view(['POST', 'GET'])
def add_pin(request, pk):
    '''
    Board Field 에 Pin 을 추가하는 API

    ---
    특정 보드에 핀을 추가할 수 있도록 한다.

    '''
    if request.method == 'POST':
        board = get_object_or_404(Board, pk=pk)
        print(request)
        board.pin.add(Pin.objects.get(pk=request.data['id']))
    return Response(status.HTTP_202_ACCEPTED)