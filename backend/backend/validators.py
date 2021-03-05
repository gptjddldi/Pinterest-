from django.core.exceptions import ValidationError


def validate_title(self, data):
    if data == ' ' or (self.trim_whitespace and str(data).strip() == ''):
        msg = "제목을 입력해주세요."
        raise ValidationError(msg)
    else:
        return data