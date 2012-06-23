import base64
import hashlib
import random

from flotype.bridge import Bridge

try:
    from settings import *
except ImportError:
    print """Error importing local settings. Have you copied local_settings.py.dist to local_settings.py?"""

def newkey():
    ''' Generates a highly random UUID '''
    return base64.b64encode(hashlib.sha256( str(random.getrandbits(256)) ).digest(), random.choice(['rA','aZ','gQ','hH','hG','aR','DD'])).rstrip('==')

class AuthHandler:
    def __init__(self):
        print "AuthObj initialized", self
        
        # TODO store this in a database
        self.api_keys = {}
        self.clients = {}
    
    def register(self, username, password, callback):
        print "Registering user", username
        
        passhash = hashlib.sha512(password).hexdigest()
        try:
            api_key = self.api_keys[(username, passhash)]
            print username, "is already registered"
            callback(False)
        except:
            api_key = newkey()
            self.api_keys[(username, passhash)] = api_key
            print "Creating new user", username, "with", api_key
            callback(api_key)
    
    def authenticate(self, username, password, callback):
        print "Attempting authentication of", username
        
        passhash = hashlib.sha512(password).hexdigest()
        try:
            api_key = self.api_keys[(username, passhash)]
            print "Authentication for", username, "successful"
            callback(api_key)
        except:
            print "Invalid credentials for", user
            callback(False)

if __name__ == "__main__":
    bridge = Bridge(
        api_key=API_KEY['private'])
    
    bridge.publish_service('auth', AuthHandler())
    
    bridge.connect()
