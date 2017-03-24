from pymongo import MongoClient
from bson.objectid import ObjectId
import pymongo


client = MongoClient('mongodb://pi2docker.local:27017/')
db = client.test1st

#for i in range(25):
#    db.tabela.insert_one({"number": i})
#print db.tabela.find_one()
#print db.tabela.find_one({"_id": ObjectId('58d2fcabd869b021285e8cf1')})

a_s =  db.tabela.find().sort("_id", -1).limit(1)
#for a in a_s:
#    print a
print a_s.next()

