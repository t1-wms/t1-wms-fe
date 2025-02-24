const inboundData = [
    {
      inboundId: 1,
      productList: [
        {
          productId: 2,
          productCode: "83270P1010",
          productName: "가니쉬 어셈블리－리어 도어 리어 프레임,좌측",
          productImage:
            "https://hellowcar.com/web/product/medium/202108/31c33242bd0d70b016b15bda57ab4445.jpg",
        },
        {
          productId: 14,
          productCode: "87721P1000BKL",
          productName: "가니쉬 어셈블리-프론트 도어 사이드,좌측",
          productImage:
            "https://hellowcar.com/web/product/medium/202112/159ab768a15bbfaacb87f6133acd2def.jpg",
        },
        {
          productId: 30,
          productCode: "82850P1000",
          productName: "몰딩 어셈블리－프론트 도어 프레임,좌측",
          productImage:
            "https://hellowcar.com/web/product/medium/202111/58e6b3aa8945db2c8000e46a49c34312.jpg",
        },
      ],
    },
    {
      inboundId: 2,
      productList: [
        {
          productId: 2,
          productCode: "83270P1010",
          productName: "가니쉬 어셈블리－리어 도어 리어 프레임,좌측",
          productImage:
            "https://hellowcar.com/web/product/medium/202108/31c33242bd0d70b016b15bda57ab4445.jpg",
        },
      ],
    },
    {
      inboundId: 3,
      productList: [
        {
          productId: 2,
          productCode: "83270P1010",
          productName: "가니쉬 어셈블리－리어 도어 리어 프레임,좌측",
          productImage:
            "https://hellowcar.com/web/product/medium/202108/31c33242bd0d70b016b15bda57ab4445.jpg",
        },
      ],
    },
    {
      inboundId: 4,
      productList: [
        {
          productId: 2,
          productCode: "83270P1010",
          productName: "가니쉬 어셈블리－리어 도어 리어 프레임,좌측",
          productImage:
            "https://hellowcar.com/web/product/medium/202108/31c33242bd0d70b016b15bda57ab4445.jpg",
        },
      ],
    },
    {
      inboundId: 5,
      productList: [
        {
          productId: 2,
          productCode: "83270P1010",
          productName: "가니쉬 어셈블리－리어 도어 리어 프레임,좌측",
          productImage:
            "https://hellowcar.com/web/product/medium/202108/31c33242bd0d70b016b15bda57ab4445.jpg",
        },
      ],
    },
  ];


  // 입하검사 끝나면 오는 입고적치 위치 데이터

const item1 = {
  inboundId: 1,
  checkNumber: "IC202502230000",
  lotList: [
    {
      LotId: 1,
      LotCode: "LO202502230000",
      ProductId: 2,
      productCode: "83270P1010",
      productName: "가니쉬 어셈블리－리어 도어 리어 프레임,좌측",
      productImage:
        "https://hellowcar.com/web/product/medium/202108/31c33242bd0d70b016b15bda57ab4445.jpg",
      binCode: "A-01-02-03",
    },
  ],
};

const item2 = {
  inboundId: 1,
  checkNumber: "IC202502230000",
  lotList: [
    {
      LotId: 2,
      LotCode: "LO202502230001",
      ProductId: 14,
      productCode: "87721P1000BKL",
      productName: "가니쉬 어셈블리-프론트 도어 사이드,좌측",
      productImage:
        "https://hellowcar.com/web/product/medium/202112/159ab768a15bbfaacb87f6133acd2def.jpg",
      binCode: "B-03-01-01",
    },
  ],
};

const item3 = {
  inboundId: 1,
  checkNumber: "IC202502230000",
  lotList: [
    {
      LotId: 3,
      LotCode: "LO202502230002",
      ProductId: 30,
      productId: 30,
      productCode: "82850P1000",
      productName: "몰딩 어셈블리－프론트 도어 프레임,좌측",
      productImage:
        "https://hellowcar.com/web/product/medium/202111/58e6b3aa8945db2c8000e46a49c34312.jpg",
      binCode: "A-06-06-05",
    },
  ],
};

  


  //출고 데이터
const outboundData = [
  {
    outboundId: 1,
    outboundPlanId: 1,
    outboundAssignNumber: "OS202502230000",
    lotLocations: [
      {
        lotId: 15,
        binCode: "F-02-02-01",
        zone: "F",
        aisle: 2,
        rowNum: 2,
        floor: 1,
        productName: "스위치 어셈블리－멀티펑션",
        productCode: "934C2O6040",
        productImage:
          "https://hellowcar.com/web/product/medium/202303/818886ac64877b571583609412601d4d.jpg",
      },
      {
        lotId: 23,
        binCode: "A-03-02-04",
        zone: "A",
        aisle: 3,
        rowNum: 2,
        floor: 4,
        productName: "핸들 어셈블리-리어 도어 아웃사이드,좌측",
        productCode: "83650O6000CA",
        productImage:
          "https://hellowcar.com/web/product/medium/202204/0fc9f506f54ea00081d4cb02667d7061.jpg",
      },
      {
        lotId: 53,
        binCode: "C-01-06-06",
        zone: "C",
        aisle: 1,
        rowNum: 6,
        floor: 6,
        productName: "핀 부트",
        productCode: "581641H000",
        productImage:
          "https://hellowcar.com/web/product/medium/202408/5ac95c0e81f3f92fcf7f41a46f8adfbf.jpg",
      },
    ],
  },
  {
    outboundId: 2,
    outboundPlanId: 2,
    outboundAssignNumber: "OS202502230001",
    lotLocations: [
      {
        lotId: 15,
        binCode: "F-02-02-01",
        zone: "F",
        aisle: 2,
        rowNum: 2,
        floor: 1,
        productName: "스위치 어셈블리－멀티펑션",
        productCode: "934C2O6040",
        productImage:
          "https://hellowcar.com/web/product/medium/202303/818886ac64877b571583609412601d4d.jpg",
      },
      {
        lotId: 23,
        binCode: "A-03-02-04",
        zone: "A",
        aisle: 3,
        rowNum: 2,
        floor: 4,
        productName: "핸들 어셈블리-리어 도어 아웃사이드,좌측",
        productCode: "83650O6000CA",
        productImage:
          "https://hellowcar.com/web/product/medium/202204/0fc9f506f54ea00081d4cb02667d7061.jpg",
      },
      {
        lotId: 29,
        binCode: "A-03-02-05",
        zone: "A",
        aisle: 3,
        rowNum: 2,
        floor: 5,
        productName: "핸들 프론티어-리어 도어 아웃사이드,좌측쉐도우",
        productCode: "83650O6122CA",
        productImage:
          "https://hellowcar.com/web/product/medium/202204/0fc9f506f54ea00081d4cb02667d7061.jpg",
      },
    ],
  },
  {
    outboundId: 3,
    outboundPlanId: 3,
    outboundAssignNumber: "OS202502230002",
    lotLocations: [
      {
        lotId: 15,
        binCode: "F-02-02-01",
        zone: "F",
        aisle: 2,
        rowNum: 2,
        floor: 1,
        productName: "스위치 어셈블리－멀티펑션",
        productCode: "934C2O6040",
        productImage:
          "https://hellowcar.com/web/product/medium/202303/818886ac64877b571583609412601d4d.jpg",
      },
    ],
  },
  {
    outboundId: 4,
    outboundPlanId: 4,
    outboundAssignNumber: "OS202502230003",
    lotLocations: [
      {
        lotId: 15,
        binCode: "F-02-02-01",
        zone: "F",
        aisle: 2,
        rowNum: 2,
        floor: 1,
        productName: "스위치 어셈블리－멀티펑션",
        productCode: "934C2O6040",
        productImage:
          "https://hellowcar.com/web/product/medium/202303/818886ac64877b571583609412601d4d.jpg",
      },
    ],
  },
  {
    outboundId: 5,
    outboundPlanId: 5,
    outboundAssignNumber: "OS202502230004",
    lotLocations: [
      {
        lotId: 15,
        binCode: "F-02-02-01",
        zone: "F",
        aisle: 2,
        rowNum: 2,
        floor: 1,
        productName: "스위치 어셈블리－멀티펑션",
        productCode: "934C2O6040",
        productImage:
          "https://hellowcar.com/web/product/medium/202303/818886ac64877b571583609412601d4d.jpg",
      },
    ],
  },
];

export { inboundData, outboundData,  item1, item2,item3  }