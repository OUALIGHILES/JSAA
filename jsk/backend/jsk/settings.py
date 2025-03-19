from pathlib import Path
import os

# مكتبات القراءة من .env
import environ
import dj_database_url
from dotenv import load_dotenv

# ------------------ BASE DIRECTORY ------------------
BASE_DIR = Path(__file__).resolve().parent.parent

# ------------------ LOAD ENV ------------------
# 1) تحميل ملف .env
load_dotenv(os.path.join(BASE_DIR, '.env'))

# 2) استخدام environ
env = environ.Env()
environ.Env.read_env(os.path.join(BASE_DIR, '.env'))

# ------------------ SECURITY ------------------
SECRET_KEY = env('SECRET_KEY')
DEBUG = env.bool('DEBUG', default=False)
ALLOWED_HOSTS = env.list('ALLOWED_HOSTS', default=['*'])

# ------------------ APPLICATIONS ------------------
INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'rest_framework',
    'rest_framework.authtoken',
    'api',
    'tickets',
    'authentication',
    'payment',
    'reservation',
    'match_future',
    'stadium_info',
]

# ------------------ MIDDLEWARE ------------------
MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

# ------------------ URLS ------------------
ROOT_URLCONF = 'jsk.urls'

# ------------------ TEMPLATES ------------------
TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [BASE_DIR / 'templates'],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

# ------------------ WSGI ------------------
WSGI_APPLICATION = 'jsk.wsgi.application'

# ------------------ DATABASE ------------------
# نستخدم dj_database_url.parse لتحليل رابط Supabase من DATABASE_URL
DATABASES = {
    'default': dj_database_url.parse(
        os.getenv('DATABASE_URL'),  # يقرأ قيمة DATABASE_URL من .env
        conn_max_age=600,          # مدة بقاء الاتصال مفتوحًا (اختياري)
        ssl_require=True           # تفعيل الاتصال عبر SSL (اختياري إذا Supabase يدعم SSL)
    )
}

# ------------------ PASSWORD VALIDATION ------------------
AUTH_PASSWORD_VALIDATORS = [
    {'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator'},
    {'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator'},
    {'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator'},
    {'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator'},
]

# ------------------ INTERNATIONALIZATION ------------------
LANGUAGE_CODE = 'en-us'
TIME_ZONE = 'UTC'
USE_I18N = True
USE_TZ = True

# ------------------ STATIC FILES ------------------
STATIC_URL = '/static/'
STATICFILES_DIRS = [BASE_DIR / 'static']

# ------------------ DEFAULT PRIMARY KEY ------------------
DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'

# ------------------ CUSTOM USER MODEL ------------------
AUTH_USER_MODEL = 'authentication.CustomUser'

# ------------------ DRF SETTINGS ------------------
REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': [
        'rest_framework.authentication.TokenAuthentication',
        'rest_framework.authentication.SessionAuthentication',
    ],
    'DEFAULT_PERMISSION_CLASSES': [
        'rest_framework.permissions.IsAuthenticated',
    ],
}
