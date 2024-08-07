from flask import Flask
from flask_restful import reqparse, abort, Api, Resource
from flask_cors import CORS

# https://flask-restful.readthedocs.io/en/latest/

app = Flask(__name__)
api = Api(app)
CORS(app)

items = {
  "0": {"metadata": "Metadata-0", "payload": "Payload-0"},
  "1": {"metadata": "Metadata-1", "payload": "Payload-1"},
  "2": {"metadata": "Metadata-2", "payload": "Payload-2"}
}

def abort_if_item_doesnt_exist(item_id):
  if item_id not in items:
    abort(
      404, 
      message=f"Item {item_id} doesn't exist")

parser = reqparse.RequestParser()
parser.add_argument('metadata')
parser.add_argument('payload')

# Item
# Shows a single item and lets client delete an item
class Item(Resource):
  def get(self, item_id):
    abort_if_item_doesnt_exist(item_id)
    print(f"[Item][GET] id: {item_id}, {items[item_id]}")
    return items[item_id]

  def delete(self, item_id):
    abort_if_item_doesnt_exist(item_id)
    del items[item_id]
    print(f"[Item][DEL] id: {item_id}")
    return '', 204
  
  def put(self, item_id):
    args = parser.parse_args()
    item = {"metadata": args['metadata'], "payload": args["payload"]}
    items[item_id] = item
    print(f"[Item][PUT] id: {item_id}, {item}")
    return item, 201

# ItemList
# Show a list of all items, and lets client POST to add new items
class ItemList(Resource):
  def get(self):
    print(f"[ItemList][GET] {len(items)} items")
    return items
  
  def post(self):
    args = parser.parse_args()
    id = int(max(items.keys())) + 1
    items[f"{id}"] = {
      "metadata": f"Metadata-{id}", "payload": f"Payload-{id}"}
    print(f"[ItemList][POST] {len(items)} items")
    return items[f"{id}"], 201
  
# Actually setup the Api resource routing here
api.add_resource(ItemList, "/items")
api.add_resource(Item, "/items/<item_id>")

if __name__ == "__main__":
  app.run(debug=True)