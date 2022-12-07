#include <iostream>

using namespace std;

void FUN_00101159(uint *param_1, uint* param_2)

{
  uint uVar1;
  int local_c;
  printf("%d\n", *param_1);
  srand(*param_1);
  for (local_c = 0; local_c < 0x14; local_c = local_c + 1) {
    uVar1 = rand();
    // printf("%d\n", uVar1);
  }
  return;
}

int main(void) {
  printf("\nThis Vault contains the \x1b[34mQuills of Power\x1b[0m, great weapon of Jaga\n\n");
  printf("Unlock in times of need, with the \x1b[32mseeds\x1b[0m of truth\n\n");
  printf("You see a faint inscription of a \x1b[31mmap\x1b[0m within the Vault...\n\n");

  uint arg1[] = {0x312e,0x3330,0x3334,0x3235,0x3900};
  uint arg2[] = {0x3130,0x332e,0x3736,0x3633,0x3934,0x3200};

  uint arr3[] = {
    0x55D6,
    0x2258,
    0xE5F7,
    0xD722,
    0xEB9D,
    0x7A3A,
    0x1DC2,
    0x3A66,
    0x68BC,
    0x3214,
    0xBAAA,
    0x6308,
    0xE4C4,
    0x9655,
    0x1B8A,
    0xF766,
    0x345F,
    0x5B43,
    0x080A,
    0x5A01,
    0x9F4E,
    0x8B74,
    0x933A,
    0x6E60,
    0xA2DE,
    0x8C06,
    0xF3AC,
    0x1A57,
    0x325F,
    0xE04E,
    0x10EE,
    0xE958,
    0x121E,
    0x9F64,
    0x0950,
    0x7B2D,
    0xAE96,
    0x537A
  };

  FUN_00101159(arg1, arr3);
  FUN_00101159(arg2, arr3);
  
  printf("%-80s", arr3);
  return 0;
}
