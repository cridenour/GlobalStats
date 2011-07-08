__author__ = 'Chris Ridenour'

import md5
import base64
from datetime import datetime

class API(object):
    def __init__(self, **kwargs):
        pass

    def hash(self):
        concat = (self.client + self.service + self.getTimestamp()).encode('utf-16')
        inter = base64.encodestring(md5())


    def getTimestamp(self):
        time = datetime.now().strftime('%Y-%m-%d %H:%M:%S')
        return str(time) + "Z"