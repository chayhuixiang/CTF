import datetime
import pytz
import random

format = "%Y-%m-%d %H:%M:%S %Z%z"
sgtoffset = datetime.timedelta(hours = 9)
sgt = datetime.timezone(sgtoffset, "Singapore")
t = datetime.datetime(2022, 9, 22, 1, 41, 17, tzinfo=pytz.timezone("UTC"))
seed = int(t.timestamp())

print("Time in UTC: ", t.astimezone(pytz.timezone("UTC")).strftime(format))

random.seed(seed)
token = ''.join(random.choices('abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789', k=16))
print(token)
