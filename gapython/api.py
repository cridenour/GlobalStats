__author__ = 'Chris Ridenour'

import hmac
from base64 import b64encode
import hashlib
from xml.etree.ElementTree import ElementTree
from urllib import urlencode, urlopen
from config import AUTHENTICATION_CODE, CLIENT_ID
from datetime import datetime

class API(object):
    def __init__(self):
        self.session = None


    def hash(self, service):
        concat = (str(CLIENT_ID) + service + self.getTimestamp()).lower().encode('UTF-16LE')
        key = AUTHENTICATION_CODE.encode('UTF-8')

        digest = hmac.new(key, concat).digest()
        return b64encode(b64encode(digest).encode('UTF-8'))


    def getTimestamp(self):
        time = datetime.utcnow().strftime('%Y-%m-%d %H:%M:%S')
        return str(time) + "Z"

    def get(self, service, params = {}):
        timestamp = self.getTimestamp()

        sig = self.hash(service)
        
        url = "https://accounts.globalagendagame.com/GAStats/GlobalAgendaSrv.svc/" \
              + service + "?"
        params["clientId"] = CLIENT_ID
        params["timestamp"] = timestamp
        params["signature"] = sig
        if self.session is not None:
            params["session"] = self.session
        url += urlencode(params)

        out = urlopen(url)

        if out:
            return out
        else:
            return None

    def getSession(self):
        #api_response = self.get("SetSession")
        api_response = open('gapython/tree.xml')

        if api_response is None:
            raise("Could not connect to Global Agenda API")

        tree = ElementTree(file=api_response)
        if tree.find('rec_cd').text is not "0":
            raise("Error returned on response" + tree.find('ret_msg').text)

        




    def getSessionCache(self):
        pass

    def setSessionCache(self, sess):
        pass

    def Player(self, name):
        api_response = self.get('Player', {"u": name})
        if api_response is None:
            return None

        tree = ElementTree.parse(api_response)


