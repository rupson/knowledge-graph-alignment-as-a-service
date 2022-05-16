import sys

def getInputFromArgs():
  if len(sys.argv) == 0:
    raise(ValueError("Missing input argument"))
  try:
    num = float(sys.argv[1])
    return num
  except Exception:
    raise ValueError("input must be numeric")

def double():
  num = getInputFromArgs()
  return num * 2

if __name__ == "__main__":
  print(double())
