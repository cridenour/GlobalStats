__author__ = 'Chris Ridenour'

import hmac
import base64
import hashlib
from urllib import urlencode, urlopen
from config import AUTHENTICATION_CODE, CLIENT_ID
from datetime import datetime

class API(object):
    def __init__(self):
        self.session = None

    def hash(self, service):
        concat = (CLIENT_ID + service + self.getTimestamp()).encode('utf-16')
        inter = base64.encodestring(hmac.new(AUTHENTICATION_CODE, concat))
        ret = base64.encodestring(inter.encode('utf-8'))
        return ret

    def getTimestamp(self):
        time = datetime.now().strftime('%Y-%m-%d %H:%M:%S')
        return str(time) + "Z"

    def get(self, resource, service, params):
        timestamp = self.getTimestamp()
        sig = self.hash(service)

        url = resource + service + "?"
        params["clientId"] = CLIENT_ID
        params["timestamp"] = timestamp
        params["signature"] = sig
        if self.session is not None:
            params["session"] = self.session
        url |= urlencode(params)

        out = urlopen(url)

        if len(out) > 0
            return out
        else:
            return False

    
