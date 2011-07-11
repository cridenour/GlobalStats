import tornado.ioloop
import tornado.web
import os.path
import json
from gapython.api import API

class BaseHandler(tornado.web.RequestHandler):
    def arg(self, args, pos):
        a = str.split(args, r"/")
        return a[pos]

class PlayerHandler(BaseHandler):
    def get(self, pid):
        pass

class MissionHandler(BaseHandler):
    def get(self, mid, req):
        if(int(mid) == 1):
            f = open(os.path.join(os.path.dirname(__file__), "static/test/testdata.json"))
            d = json.load(f)
            f.close()
            self.write(json.dumps(d[req]))
        else:
            self.write('Not 1' + mid)

class MainHandler(BaseHandler):
    def get(self):
        self.render("templates/index.html")

class NotificationHandler(BaseHandler):
    def get(self):
        self.write(json.dumps(''))

class UtilsHandler(BaseHandler):
    def get(self):
        api = API()
        api.getSession()

settings = {
    "static_path": os.path.join(os.path.dirname(__file__), "static"),
    "debug": True,
}

application = tornado.web.Application([
    (r"/", MainHandler),
    (r"/mission/(.*)/(.*)", MissionHandler),
    (r"/player/(.*)", PlayerHandler),
    (r"/notifications", NotificationHandler),
    (r"/utils", UtilsHandler)
], **settings)

if __name__ == "__main__":
    application.listen(8088)
    tornado.ioloop.IOLoop.instance().start()
  