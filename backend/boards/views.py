from django.shortcuts import render
from rest_framework import status
from rest_framework.decorators import api_view, action
from rest_framework.exceptions import ValidationError
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
    /boards
    /boards/[board_id]
    /boards/[board_id]/add_pin
    '''
    queryset = Board.objects.all()
    serializer_class = serializers.BoardSerializer
    filterset_fields = ['author__username']

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)

    @action(methods=['POST'], detail=True)
    def add_pin(self, request, pk):
        '''
        Board Field 에 Pin 을 추가하는 API

        ---
        /board/[board_id]/pin
        [board_id] 에 Pin 을 추가할 수 있도록 한다.
        Pin 의 id 는 request.data['id'] 로 받는당.
        하나의 보드에 중복된 핀이 올 경우 ValidationError
        '''
        board = get_object_or_404(Board, pk=pk)
        for pin in board.pin.all():
            if pin.id == request.data['id']:
                msg = {"pin": "{0}번 핀은 이미 {1} 보드에 존재합니다.".format(request.data['id'], board.title)}
                raise ValidationError(msg)

        board.pin.add(Pin.objects.get(pk=request.data['id']))
        return Response({"success": "{0}번 핀이 '{1}' 보드에 추가되었습니다.".format(request.data['id'], board.title)},
                        status.HTTP_201_CREATED)
