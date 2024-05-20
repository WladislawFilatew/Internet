import sys
import keyboard
import psycopg2
from config import host, user, password, db_name
import schedule
import time
import random
import time

setis = 5000000000
koef = 85


def isSettis():
    random.seed()
    global setis
    ism = random.randint(100000000, 500000000) 
    if (random.randint(0,1) == 0):
        setis += ism
    else:
        setis -= ism

def isKoef():
    random.seed()
    global koef
    ism = random.randint(1, 10) 
    if (random.randint(0,1) == 0):
        koef += ism
    else:
        koef -= ism
    

def device():
    print("+++++")
    with connection.cursor() as cursor:
        cursor.execute(
            """SELECT id, hashrat, consum_el, "serverId" FROM mainers WHERE work = true"""
        )
        mainersId = cursor.fetchall()
    for i in mainersId:
        with connection.cursor() as cursor:
            cursor.execute(
                """SELECT cost_el, cost_hesh  
                   FROM uslovs 
                   WHERE id = (SELECT "uslovId" FROM servers WHERE id = %s)""",
                   [i[3]]
            )
            cost_el, cost_hesh = cursor.fetchone()
        isSettis()
        isKoef()
        profit = int((i[1] * cost_hesh * 700000 * 60) / (setis * 10) )
        expend = int((cost_el * i[2] * koef) / (120000))

        current_time = time.time()
        local_time = time.localtime(current_time)
        formatted_time = time.strftime("%Y-%m-%d %H:%M:%S", local_time)

        with connection.cursor() as cursor:
            cursor.execute(
                """INSERT INTO indicats (profit,expend,"mainerId","createdAt","updatedAt")
                   VALUES (%s,%s,%s, %s, %s);
                """,[profit,expend,i[0],formatted_time,formatted_time]
            )
        print(profit,expend)
    

try:
    connection = psycopg2.connect(
        host = host,
        user = user,
        password = password,
        database=db_name
    )
    connection.autocommit = True

    
    # Запланируем выполнение функции device каждую минуту
    schedule.every().minute.do(device)

    #Бесконечный цикл для проверки расписания и выполнения задач
    while True:
        schedule.run_pending()
        time.sleep(1) # Подождем 1 секунду, чтобы не нагружать процессор
        if keyboard.is_pressed('Esc'):
            break


except Exception as _ex:
    print("[INFO] Error while working with postgresSQL", _ex)
finally:
    if connection:
        connection.close()