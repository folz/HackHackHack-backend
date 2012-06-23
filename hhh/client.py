from flotype.bridge import Bridge

try:
    from settings import *
except ImportError:
    print """Error importing local settings. Have you copied local_settings.py.dist to local_settings.py?"""

bridge = Bridge(api_key=API_KEY['public'])

class ChatObj(object):
    def message(self, sender, message):
        print (sender + ':' + message)
    
def join_callback(channel, channelName):
    print ("Joined channel : " + channelName)
    channel.message('steve', 'Bridge is pretty nifty')

auth = bridge.get_service('auth')
auth.login('steve', 'secret123', 'bridge-lovers', ChatObj(), join_callback)

bridge.connect()
