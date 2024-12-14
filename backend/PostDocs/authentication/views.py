from django.forms import ValidationError
from django.contrib.auth import authenticate
from tokenize import TokenError
from django.contrib.auth.models import User
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from .serializers import UserRegisterSerializer
from rest_framework_simplejwt.views import TokenObtainPairView

# Custom Token View for JWT Authentication
class CustomTokenObtainPairView(TokenObtainPairView):
    def post(self, request, *args, **kwargs):
        try:
            username = request.data.get("username")
            password = request.data.get("password")

            # Authenticate the user
            user = authenticate(username=username, password=password)

            if not user:
                # Check if the username exists
                if not User.objects.filter(username=username).exists():
                    return Response(
                        {'success': False, 'error': 'Invalid username'},
                        status=401,
                    )
                return Response(
                    {'success': False, 'error': 'Invalid password'},
                    status=401,
                )

            # Generate tokens using the parent class
            response = super().post(request, *args, **kwargs)
            tokens = response.data

            # Check if tokens exist
            if not tokens.get('access') or not tokens.get('refresh'):
                return Response({'success': False, 'error': 'Failed to generate tokens'}, status=500)

            # Extract tokens
            access_token = tokens['access']
            refresh_token = tokens['refresh']

            # Set tokens in cookies
            res = Response()
            res.data = {'success':True}
            res.set_cookie(
                key='access_token',
                value=str(access_token),
                httponly=True,
                secure=False,
                samesite='None',
                path='/',
                max_age= 60 * 5 # 5 min
            )
            res.set_cookie(
                key='refresh_token',
                value=str(refresh_token),
                httponly=True,
                secure=False,
                samesite='None',
                path='/',
                max_age= 60 * 60 * 24 * 7 # 1 week
            )

            return res
        except Exception as err:
            return Response({'success': False, 'error': f'Unexpected error: {str(err)}'}, status=500)


# Custom Refresh Token View
class CustomRefreshTokenView(TokenObtainPairView):
    def post(self,request,*args,**kwargs):
        try:
            # Get the refresh token from cookies
            refresh_token = request.COOKIES.get('refresh_token')
            if not refresh_token:
                return Response({'refreshed': False, 'error': 'Refresh token is missing'}, status=401)
            request.data['refresh'] = refresh_token

            if not tokens.get('access'):
                return Response({'refreshed': False, 'error': 'Failed to refresh access token'}, status=500)

            # Generate a new access token
            response = super().post(request,*args,**kwargs)
            tokens = response.data
            access_token = tokens['access']

            # Set token in cookies
            res = Response()
            res.data = {'refreshed':True}
            res.set_cookie(
                key='access_token',
                value=access_token,
                httponly=True,
                secure=False,
                samesite='None',
                path='/',
                max_age= 60 * 60 * 24 * 7 # 1 week
            )

            return res
        
        # Handling Errors
        except ValidationError as err:
            # Handles invalid credentials or other validation issues
            return Response({'success': False, 'error': 'Invalid username or password'}, status=401)
        except TokenError as err:
            # Handles token-related errors
            return Response({'success': False, 'error': f'Token error: {str(err)}'}, status=400)
        except Exception as err:
            # Handles unexpected errors
            return Response({'success': False, 'error': f'Unexpected error: {str(err)}'}, status=500)
        except Exception as err:
            return Response({'refreshed': False, 'error': f'Unexpected error: {str(err)}'}, status=500)

# Logout API: Clears authentication cookies
@api_view(['POST'])
def logout(request):
    try:
        if 'access_token' not in request.COOKIES and 'refresh_token' not in request.COOKIES:
            return Response({'success': False, 'error': 'No active session to log out'}, status=400)
    
        res = Response()
        res.data = {'success':True}
        res.delete_cookie(
            'access_token',
            path='/',
            samesite='None'
        )
        res.delete_cookie(
            'refresh_token',
            path='/',
            samesite='None'
        )

        return res
    except Exception as err:
        return Response({'success': False, 'error': f'Unexpected error: {str(err)}'}, status=500)

# Check if a user is authenticated
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def is_authenticated(request):
    try:
        return Response({'authenticated': True})
    except Exception as err:
        return Response({'authenticated': False, 'error': f'Unexpected error: {str(err)}'}, status=500)

# User Registration API
@api_view(['POST'])
@permission_classes([AllowAny])
def register(request):
    serializer = UserRegisterSerializer(data=request.data)
    if serializer.is_valid():
        try:
            serializer.save()
            return Response({'success': True, 'data': serializer.data}, status=201)
        except Exception as e:
            return Response({'success': False, 'error': f'Failed to register user: {str(e)}'}, status=500)
        
    errors = serializer.errors
    if 'username' in errors:
        return Response({'success': False, 'error': 'Username is already taken'}, status=400)
    if 'password' in errors:
        return Response({'success': False, 'error': 'Password validation failed'}, status=400)

    return Response({'success': False, 'errors': serializer.errors}, status=400)