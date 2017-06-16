#conding:utf-8
from flask import Flask
from flask import render_template
import MySQLdb

app = Flask(__name__)

#  connect to mysql
def connector():
    conn = MySQLdb.connect('localhost','root','admin','metadata')
    conn.set_character_set('utf8')
    return conn

# serch the data from mysql
def search(con):
    cursor = con.cursor()
    # sql = "select * from metadata_count where genre like '%rock%'"
    sql = "select * from metadata_count"
    cursor.execute(sql)
    data = cursor.fetchall()
    con.commit()
    cursor.close()
    return data

@app.route('/rock')
#get the rock
def rock():
    con=connector()
    cursor = con.cursor()
    sql = "select * from metadata_count where genre like '%rock%'"
    cursor.execute(sql)
    data = cursor.fetchall()
    con.commit()
    cursor.close()
    # res=[[],[]]
    res={}
    genre=[]
    count=[]
    for i in range(0,len(data)):
        count.append(int(data[i][2]))
        genre.append(data[i][1])
    res['genre']=genre
    res['count']=count
    print(res)
    return str(res)

@app.route('/genre')
#get genre
def genre():
    con = connector()
    data = search(con)
    genre=[]
    for i in range(0,len(data)):
        genre.append(data[i][1])        
    return str(genre)

@app.route('/count')
#get the count
def count():
    con = connector()
    data = search(con)
    count=[]
    for i in range(0,len(data)):
        count.append(int(data[i][2]))
    return str(count)

# render the page
@app.route('/')
def getdata():
    return render_template('temp.html')

if __name__ == '__main__':
    con = connector()
    data = search(con)
    app.debug = True
    app.run()
    