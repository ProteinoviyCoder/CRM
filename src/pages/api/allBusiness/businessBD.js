export const businessesBD = [
  {
    businessId: "coffe-to-go",
    businessName: "Coffe to Go",
    owner: {
      id: "coffe-to-go-owner",
      username: "Daniil",
      passwordHash:
        "$2b$10$mKtlPj/EKayTYCAS6jjtVeq3/DIcZS/0kB9zmeDCGJX7xHlnTcY6a",
      permissions: ["all"],
      role: "owner",
      businessId: "coffe-to-go",
    },
    team: [
      {
        id: "1",
        username: "worker1",
        passwordHash:
          "$2b$10$mKtlPj/EKayTYCAS6jjtVeq3/DIcZS/0kB9zmeDCGJX7xHlnTcY6a",
        permissions: ["get_users"],
        role: "admin",
        businessId: "coffe-to-go",
      },
      {
        id: "2",
        username: "worker2",
        passwordHash:
          "$2b$10$krpoS4d5ySuHmNzJjv5IIumAIo/tmA6HhNh0GVLOmF/DYyPKwc8/C",
        permissions: [],
        role: "user",
        businessId: "coffe-to-go",
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
      permissions: ["all"],
      role: "owner",
      businessId: "build-the-house",
    },
    team: [
      {
        id: "1",
        username: "workerteam2",
        passwordHash:
          "$2b$10$mKtlPj/EKayTYCAS6jjtVeq3/DIcZS/0kB9zmeDCGJX7xHlnTcY6a",
        permissions: ["get_users"],
        role: "admin",
        businessId: "build-the-house",
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
