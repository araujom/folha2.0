from pymongo import MongoClient
from bson.objectid import ObjectId
import pymongo
import datetime

client = MongoClient('mongodb://pi2docker.local:27017/')
#db = client.test1st

#for i in range(25):
#    db.tabela.insert_one({"number": i})
#print db.tabela.find_one()
#print db.tabela.find_one({"_id": ObjectId('58d2fcabd869b021285e8cf1')})

#a_s =  db.tabela.find().sort("_id", -1).limit(1)
#for a in a_s:
#    print a
#print a_s.next()



db = client.Folha20

class Test(object):
    def __init__(self):
        self.client = MongoClient('mongodb://pi2docker.local:27017/')
        self.db = self.client.Folha20

    def find_tags_by_description_and_val(self, desc, val):
        # get all tags
        if not hasattr(self, "tags"):
            self.tags = []
            for tag in self.db.Tag.find({}):
                if tag["matrixRules"] is not None:
                    self.tags += [tag]
        elif self.tags.__len__() != self.db.Tag.count(True):
            self.tags = []
            for tag in self.db.Tag.find({}):
                if tag["matrixRules"] is not None:
                    self.tags += [tag]

        recognized_tags = []
        if len(self.tags) == 0:
            entrou_id = self.db.Tag.insert_one({"name": "Entrou", "matrixRules": []}).inserted_id
            saiu_id = self.db.Tag.insert_one({"name": "Saiu", "matrixRules": []}).inserted_id
        else:
            entrou_id = self.db.Tag.find({"name": "Entrou"}).next()["_id"]
            saiu_id = self.db.Tag.find({"name": "Saiu"}).next()["_id"]
        if val >= 0:
            recognized_tags += [entrou_id]
        else:
            recognized_tags += [saiu_id]

        for tag in self.tags:
            for rules in tag["matrixRules"]:
                contain_all_strings = True
                for rule in rules:
                    if rule not in desc:
                        contain_all_strings = False
                        break
                if contain_all_strings:
                    recognized_tags += [tag["_id"]]
                    break
        return recognized_tags

a = Test()
#print a.find_tags_by_description_and_val(u'31/12 COMPRA ELEC 3971186/38 PRIO ENERGY - MIRA SMIRA SINTRA', 20)


client = MongoClient('mongodb://pi2docker.local:27017/')
db = client.Folha20
db.Tag.insert_one({"name": "Entrou", "matrixRules": []})
db.Tag.insert_one({"name": "Saiu", "matrixRules": []})
db.Tag.insert_one({"name": "Gota", "matrixRules": [["COMPRA ELEC", "PRIO ENERGY" ]]})
db.Tag.insert_one({"name": "Mercearia", "matrixRules": [["COMPRA ELEC", "MINIPRECO RIO MOURO" ],
                                                        ["COMPRA ELEC", "JUMBO DE SINTRA MEM MARTINS"]]})
