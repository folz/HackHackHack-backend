from flotype.bridge import Bridge

try:
    from settings import *
except ImportError:
    print """Error importing local settings. Have you copied local_settings.py.dist to local_settings.py?"""


class AuthObj(object):
    def __init__(self):
        print "AuthObj initialized", self
    
    def login(self, name, password, room, chat_obj, chat_callback):
        if password == "secret123":
            bridge.join_channel(room, chat_obj, chat_callback) 
        else:
            pass


if __name__ == "__main__":
    bridge = Bridge(
        api_key=API_KEY['private'])
    
    bridge.publish_service('auth', AuthObj())

    bridge.connect()
