from pyvirtualdisplay import Display
from pymongo import MongoClient
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support import expected_conditions
from selenium.webdriver.support.ui import WebDriverWait
import datetime
import config



class ScrapRecords(object):
    def __init__(self):
        self.client = MongoClient('mongodb://mongo:27017/')
        self.db = self.client.Folha20
    def start(self):
        records_count = self.db.Folha20.count(True)
        if records_count == 0:
            self.update_record(None)
        else:
            last_registred_record = self.db.Record.find().sort("_id", -1).limit(1).next()
            self.update_record(last_registred_record["originalRecord"])

    def find_element_wait_if_needed(self, element_xpath):
        self.wait.until(
            expected_conditions.presence_of_element_located((By.XPATH, element_xpath))
        )
        return self.driver.find_element_by_xpath(element_xpath)

    def find_elements_wait_if_needed(self, element_xpath):
        self.wait.until(
            expected_conditions.presence_of_element_located((By.XPATH, element_xpath))
        )
        return self.driver.find_elements_by_xpath(element_xpath)

    def update_record(self, last_registred_record):
        ##
        display = Display(visible=0, size=(800, 600), use_xauth=False)
        display.start()
        self.driver = webdriver.Firefox()
        ##
        #self.driver = webdriver.Firefox(executable_path='/Users/coiso/bin/geckodriver')
        ##
        self.wait = WebDriverWait(self.driver, 10)
        self.driver.get(config.first_page)
        close_window = self.find_element_wait_if_needed('//*[@id="fechar"]')
        self.driver.get(config.first_page)#recarregar a pagina para o alerta ja nao seja mostrad
        close_window = self.find_element_wait_if_needed('//*[@id="fechar"]')

        id1 = self.driver.find_element_by_id('USERID')
        id1.send_keys(config.user)

        id2 = self.driver.find_element_by_id('PASSWORD')
        id2.send_keys(config.passwd)

        #submeter
        self.driver.find_element_by_id('signOn').submit()

        #go to Movimentos
        self.driver.switch_to.frame(self.find_element_wait_if_needed('/html/frameset/frameset/frame[1]'))
        self.find_element_wait_if_needed('//*[@id="submenu1"]/a[1]').click()

        condition = True
        while condition:
            self.driver.switch_to.default_content()
            self.driver.switch_to.frame(self.driver.find_element_by_id("INF_AREA"))
            self.wait.until(
                expected_conditions.presence_of_all_elements_located((By.XPATH, '//*[@id="form_mov"]/table/tbody/tr[7]/td/table/tbody/tr[1]/td[2]/table/tbody/tr'))
            )
            rows = self.find_elements_wait_if_needed('//*[@id="form_mov"]/table/tbody/tr[7]/td/table/tbody/tr[1]/td[2]/table/tbody/tr')
            row_count = len(rows)

            last_td = None
            for i in range(2, row_count+1):
                element_xpath = '//*[@id="form_mov"]/table/tbody/tr[7]/td/table/tbody/tr[1]/td[2]/table/tbody/tr[%s]/td' % i
                tds = self.find_elements_wait_if_needed(element_xpath)
                movimento = []
                for td in tds:
                    movimento += [td.text]
                last_td = tds[-1]
                if not self.equal_records(movimento, last_registred_record):
                    print movimento
                    self.save_new_record(movimento)
                else:
                    break

            if self.equal_records(movimento, last_registred_record):
                condition = False
            else:
                #paginas anteriores
                condition = False
                posterior_anterior = self.find_elements_wait_if_needed('//*[@id="form_mov"]/table/tbody/tr[7]/td/table/tbody/tr[3]/td[2]/input')
                for pa in posterior_anterior:
                    if pa.get_attribute("value") == "Datas Anteriores":
                        pa.click()
                        self.wait.until(expected_conditions.staleness_of(last_td))#esperar ate que a ultima tabela seja subtituida, i e, passe a stale
                        condition = True

    def equal_records(self, rec1, rec2):
        if rec1 is None or rec2 is None:
            return False
        if rec1[0] == rec2[0] and rec1[2] == rec2[2] and rec1[3] == rec2[3] and rec1[4] == rec2[4]:
            return True
        else:
            return False

    def save_new_record(self, rec):
        record = {"originalRecord": rec}
        movDate = datetime.datetime.strptime(rec[0], '%d-%m-%Y')
        if rec[1].strip() == '':
            valDate = None
        else:
            valDate = datetime.datetime.strptime(rec[1], '%d-%m-%Y')
        description = rec[2]
        val = float(rec[3].replace(",", "."))
        balance = float(rec[4].replace(",", "."))

        fieldRecord = {
                           "movDate": movDate,
                           "valDate": valDate,
                       "description": description,
                               "val": val,
                           "balance": balance
                      }
        record["fieldRecord"] = fieldRecord
        record["tags"] = self.find_tags_by_description_and_val(description, val)
        self.db.Record.insert_one(record)
        print "Saved: ",
        print record

    def find_tags_by_description_and_val(self, desc, val):
        recognized_tags = []
        if val >= 0:
            recognized_tags += ["ObjectId('58d65bbed869b07900dd296d')"]
        else:
            recognized_tags += ["ObjectId('58d65bbed869b07900dd296e')"]

        # get all tags
        if not hasattr(self, "tags"):
            self.tags = []
            for tag in self.db.Tag.find({}):
                if tag["matrixRules"] is not  None:
                    self.tags += [tag]
        elif self.tags.__len__() != self.db.Tag.count(True):
            self.tags = []
            for tag in self.db.Tag.find({}):
                if tag["matrixRules"] is not None:
                    self.tags += [tag]

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


if __name__ == "__main__":
    ScrapRecords().start()

