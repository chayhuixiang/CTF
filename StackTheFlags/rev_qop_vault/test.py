import random

coordinates = ['1.3034259', '103.7663942']
def FUN_00101159(param_1, param_2):
  random.seed(param_1)

  for i in range(0x14):
    uVar1 = random.random()
    param_2[0 + (i << 2)] = param_2[0 + (i << 2)] ^ uVar1

def main():
  print("This Vault contains the \x1b[34mQuills of Power\x1b[0m, great weapon of Jaga");
  print("Unlock in times of need, with the \x1b[32mseeds\x1b[0m of truth");
  print("You see a faint inscription of a \x1b[31mmap\x1b[0m within the Vault...");
  # hex1 = "312e33303334323539"
  # hex2 = "3130332e37363633393432"
  # bytearray1 = bytearray.fromhex(hex1)
  # bytearray2 = bytearray.fromhex(hex2)

  hex3 = "55D62258E5F7D722EB9D7A3A1DC23A6668BC3214BAAA6308E4C496551B8AF766345F5B43080A5A019F4E8B74933A6E60A2DE8C06F3AC1A57325FE04E10EEE958121E9F6409507B2DAE96537A"
  bytearray3 = bytearray.fromhex(hex3)

  FUN_00101159('1.3034259', bytearray3)
  FUN_00101159('103.7663942', bytearray3)

  print(bytearray3)

if __name__ == "__main__":
  main()
