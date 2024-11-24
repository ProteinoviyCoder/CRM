export const businessesBD = [
  {
    businessId: "suck-&-go",
    businessName: "Suck&Go",
    owner: {
      id: "suck-&-go-owner",
      username: "Daniil",
      passwordHash:
        "$2b$10$mKtlPj/EKayTYCAS6jjtVeq3/DIcZS/0kB9zmeDCGJX7xHlnTcY6a",
      permissions: ["get_team"],
      role: "owner",
      businessId: "suck-&-go",
      themeSetting: {
        theme: "standart",
        mod: "light",
      },
    },
    team: [
      {
        id: "1",
        username: "worker1",
        passwordHash:
          "$2b$10$mKtlPj/EKayTYCAS6jjtVeq3/DIcZS/0kB9zmeDCGJX7xHlnTcY6a",
        permissions: ["get_team"],
        role: "admin",
        businessId: "suck-&-go",
        themeSetting: {
          theme: "standart",
          mod: "light",
        },
      },
      {
        id: "2",
        username: "worker2",
        passwordHash:
          "$2b$10$krpoS4d5ySuHmNzJjv5IIumAIo/tmA6HhNh0GVLOmF/DYyPKwc8/C",
        permissions: ["get_team"],
        role: "employee",
        businessId: "suck-&-go",
        themeSetting: {
          theme: "standart",
          mod: "light",
        },
      },
      {
        id: "3",
        username: "1",
        passwordHash:
          "$2b$10$Dmh.rGvY/NOm0iYsdds9JuEKUQ7DE0mUTRBXh.ux0tYs4JIrGnvmO",
        permissions: ["get_tea"],
        role: "admin",
        businessId: "suck-&-go",
        themeSetting: {
          theme: "green",
          mod: "dark",
        },
      },
    ],
    tasks: [
      {
        id: 1,
        title: "Разработать crm систему",
        description: "Полная разработка crm системы, включая все аспекты",
        status: false,
      },
    ],
  },
  {
    businessId: "build-the-house",
    businessName: "Build the House",
    owner: {
      id: "build-the-house-owner",
      username: "Kavka",
      passwordHash:
        "$2b$10$mKtlPj/EKayTYCAS6jjtVeq3/DIcZS/0kB9zmeDCGJX7xHlnTcY6a",
      permissions: ["get_team"],
      role: "owner",
      businessId: "build-the-house",
      themeSetting: {
        theme: "peach",
        mod: "dark",
      },
    },
    team: [
      {
        id: "1",
        username: "workerteam2",
        passwordHash:
          "$2b$10$mKtlPj/EKayTYCAS6jjtVeq3/DIcZS/0kB9zmeDCGJX7xHlnTcY6a",
        permissions: ["get_team"],
        role: "admin",
        businessId: "build-the-house",
        themeSetting: {
          theme: "standart",
          mod: "light",
        },
      },
      {
        id: "2",
        username: "2",
        passwordHash:
          "$2b$10$j4Q8HspUXrMx4zseDQCzuu7Yp.FBkuTypBM7d9XWa./ME79ghtJjG",
        permissions: ["get_team"],
        role: "admin",
        businessId: "build-the-house",
        themeSetting: {
          theme: "peach",
          mod: "light",
        },
      },
    ],
    tasks: [
      {
        id: 1,
        title: "Ну построить дом наверное хз",
        description: "Ну дом сказал же уже",
        status: false,
      },
    ],
  },
];
