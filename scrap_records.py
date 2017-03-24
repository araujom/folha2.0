from pyvirtualdisplay import Display
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support import expected_conditions
from selenium.webdriver.support.ui import WebDriverWait

import config


def find_element_wait_if_needed(element_xpath):
    wait.until(
        expected_conditions.presence_of_element_located((By.XPATH, element_xpath))
    )
    return driver.find_element_by_xpath(element_xpath)
def find_elements_wait_if_needed(element_xpath):
    wait.until(
        expected_conditions.presence_of_element_located((By.XPATH, element_xpath))
    )
    return driver.find_elements_by_xpath(element_xpath)


display = Display(visible=0, size=(800, 600), use_xauth=False)
display.start()
driver = webdriver.Firefox()
#driver = webdriver.Firefox(executable_path='/Users/coiso/bin/geckodriver')
wait = WebDriverWait(driver, 10)
driver.get("https://www.bpinet.pt")
close_window = find_element_wait_if_needed('//*[@id="fechar"]')
driver.get("https://www.bpinet.pt")#recarregar a pagina para o alerta ja nao seja mostrad
close_window = find_element_wait_if_needed('//*[@id="fechar"]')

id1 = driver.find_element_by_id('USERID')
id1.send_keys(config.user)

id2 = driver.find_element_by_id('PASSWORD')
id2.send_keys(config.passwd)

#submeter
driver.find_element_by_id('signOn').submit()

#go to Movimentos
driver.switch_to.frame(find_element_wait_if_needed('/html/frameset/frameset/frame[1]'))
find_element_wait_if_needed('//*[@id="submenu1"]/a[1]').click()

movimentos = []
condition = True
while condition:

    driver.switch_to.default_content()
    driver.switch_to.frame(driver.find_element_by_id("INF_AREA"))
    wait.until(
        expected_conditions.presence_of_all_elements_located((By.XPATH, '//*[@id="form_mov"]/table/tbody/tr[7]/td/table/tbody/tr[1]/td[2]/table/tbody/tr'))
    )
    rows = find_elements_wait_if_needed('//*[@id="form_mov"]/table/tbody/tr[7]/td/table/tbody/tr[1]/td[2]/table/tbody/tr')
    row_count = len(rows)

    last_td = None
    for i in range(2, row_count+1):
        element_xpath = '//*[@id="form_mov"]/table/tbody/tr[7]/td/table/tbody/tr[1]/td[2]/table/tbody/tr[%s]/td' % i
        tds = find_elements_wait_if_needed(element_xpath)
        movimento = []
        for td in tds:
            movimento += [td.text]
        last_td = tds[-1]
        movimentos += [movimento]
        print movimento

    #paginas anteriores
    condition = False
    posterior_anterior = find_elements_wait_if_needed('//*[@id="form_mov"]/table/tbody/tr[7]/td/table/tbody/tr[3]/td[2]/input')
    for pa in posterior_anterior:
        if pa.get_attribute("value") == "Datas Anteriores":
            pa.click()
            wait.until(expected_conditions.staleness_of(last_td))#esperar ate que a ultima tabela seja subtituida, i e, passe a stale
            condition = True


for movimento in movimentos:
    print movimento
print len(movimentos)


