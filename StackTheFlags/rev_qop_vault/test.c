#include <stdio.h>
#include <stdlib.h>

int helper(unsigned char* arg1, unsigned char* global) {
  int a;
  printf("%d", arg1);

  srand(494651485152505357);
  
  for (int i = 0; i< 0x14; i++) {
    a = rand();
    // printf("%d\n", a);
    // *(unsigned char*)(global + (i << 2)) = *(unsigned char*)(global + (i<<2)) ^ a;
  }
}

int helper2(unsigned char* arg1, unsigned char* global) {
  int a;
  printf("%d", arg1);

  srand(494651485152505357);
  
  for (int i = 0; i< 0x14; i++) {
    a = rand();
    // printf("%d\n", a);
    // *(unsigned char*)(global + (i << 2)) = *(unsigned char*)(global + (i<<2)) ^ a;
  }
}

int main() {
  int* global = (int*)malloc(sizeof(int) * 30);
  unsigned char arg1[] = {0x31,0x2e,0x33,0x30,0x33,0x34,0x32,0x35,0x39,'\0'};
  unsigned char arg2[] = {0x31,0x30,0x33,0x2e,0x37,0x36,0x36,0x33,0x39,0x34,0x32,'\0'};

  unsigned char arr3[] = {
    0x55,
    0xD6,
    0x22,
    0x58,
    0xE5,
    0xF7,
    0xD7,
    0x22,
    0xEB,
    0x9D,
    0x7A,
    0x3A,
    0x1D,
    0xC2,
    0x3A,
    0x66,
    0x68,
    0xBC,
    0x32,
    0x14,
    0xBA,
    0xAA,
    0x63,
    0x08,
    0xE4,
    0xC4,
    0x96,
    0x55,
    0x1B,
    0x8A,
    0xF7,
    0x66,
    0x34,
    0x5F,
    0x5B,
    0x43,
    0x08,
    0x0A,
    0x5A,
    0x01,
    0x9F,
    0x4E,
    0x8B,
    0x74,
    0x93,
    0x3A,
    0x6E,
    0x60,
    0xA2,
    0xDE,
    0x8C,
    0x06,
    0xF3,
    0xAC,
    0x1A,
    0x57,
    0x32,
    0x5F,
    0xE0,
    0x4E,
    0x10,
    0xEE,
    0xE9,
    0x58,
    0x12,
    0x1E,
    0x9F,
    0x64,
    0x09,
    0x50,
    0x7B,
    0x2D,
    0xAE,
    0x96,
    0x53,
    0x7A
  };


  helper(arg1, arr3);
  helper(arg2, arr3);

  // printf("%-80s", arr3);
  return 0;
}