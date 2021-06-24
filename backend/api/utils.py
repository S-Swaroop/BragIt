import random as r

def randompassword():
    return int(r.random()*(999999-100000+1)+100000)
