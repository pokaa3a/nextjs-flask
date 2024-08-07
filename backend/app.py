from flask import Flask
from flask_restful import Api, Resource
from flask_cors import CORS

app = Flask(__name__)
api = Api(app)
CORS(app)

class Hello(Resource):
  def get(self):
    return {"data": "Hello World"}
  
  def post(self):
    return {"data": "Posted"}
  
api.add_resource(Hello, "/")

if __name__ == "__main__":
  app.run(debug=True)