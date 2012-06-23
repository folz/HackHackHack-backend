try:
    SETTINGS
except NameError:
    try:
        from settings import *
    except ImportError:
        print """Error importing local settings. Have you copied local_settings.py.dist to local_settings.py?"""
