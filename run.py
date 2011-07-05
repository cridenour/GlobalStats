import tornado.ioloop
import tornado.web
import os.path

class BaseHandler(tornado.web.RequestHandler):
    pass

class PlayerHandler(BaseHandler):
    def get(self):
        pass

class MissionHandler(BaseHandler):
    def get(self):
        pass

class MainHandler(BaseHandler):
    def get(self):
        self.render("templates/index.html")

settings = {
    "static_path": os.path.join(os.path.dirname(__file__), "static"),
    "debug": True,
}

application = tornado.web.Application([
    (r"/", MainHandler),
    (r"/mission", MissionHandler),
    (r"/player", PlayerHandler)
], **settings)

if __name__ == "__main__":
    application.listen(8088)
    tornado.ioloop.IOLoop.instance().start()
  