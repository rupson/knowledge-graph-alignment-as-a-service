from time import sleep
import requests

kgas_api_base_url = "http://localhost:4000"

def fetch_alignment_by_id(id):
  url = f"{kgas_api_base_url}/alignment/{id}"

  payload={}
  headers = {
    'Accept': 'application/json, text/plain, */*',
  }
  response = requests.request("GET", url, headers=headers, data=payload)

  if response.status_code == 404:
    return None

  return response.json()


def start_alignment(file_name_1, file_path_1, file_name_2, file_path_2):
  url = f"{kgas_api_base_url}/align"

  payload={}
  files=[
    ('ontologies',(file_name_1,open(file_path_1,'rb'),'application/octet-stream')),
    ('ontologies',(file_name_2,open(file_path_2,'rb'),'application/octet-stream'))
  ]
  headers = {
    'Accept': 'application/json, text/plain, */*',
  }

  response = requests.request("POST", url, headers=headers, data=payload, files=files)

  alignment_id = response.json().get("alignmentId")

  print(f"alignmnetId: {alignment_id}")
  return alignment_id


if __name__ == "__main__":
  alignment_id = start_alignment("mouse.owl", './logmap/data/mouse.owl', 'human.owl', './logmap/data/human.owl')

  alignment_result = None
  while alignment_result == None:
    fetch_response = fetch_alignment_by_id(alignment_id)
    if fetch_response == None:
      print(">> alignment not found yet. polling...")
      sleep(5)
    else:
      print(">> alignment found!")
      alignment_result = fetch_response
  
  results_download_path = alignment_result.get("url")

  print(f"file url: {results_download_path}")


