export const businessesBD = [
  {
    businessId: "coffe-to-go",
    businessName: "Coffe to Go",
    owner: {
      id: "coffe-to-go-owner",
      username: "Daniil",
      passwordHash:
        "$2a$10$BYpMbfJsPSOXVptfwCvau..UaLHkJgEE/LJxoYcineNRNOrc3sN3O",
      permissions: ["get_team", "create_worker", "get_all_tasks"],
      role: "owner",
      businessId: "coffe-to-go",
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
          "$2a$10$BYpMbfJsPSOXVptfwCvau..UaLHkJgEE/LJxoYcineNRNOrc3sN3O",
        permissions: ["get_team", "get_all_tasks"],
        role: "admin",
        businessId: "coffe-to-go",
        themeSetting: {
          theme: "peach",
          mod: "dark",
        },
      },
      {
        id: "2",
        username: "worker2",
        passwordHash:
          "$2a$10$BYpMbfJsPSOXVptfwCvau..UaLHkJgEE/LJxoYcineNRNOrc3sN3O",
        permissions: ["get_all_tasks"],
        role: "employee",
        businessId: "coffe-to-go",
        themeSetting: {
          theme: "green",
          mod: "light",
        },
      },
    ],
    tasks: [
      {
        id: 1,
        title: "Order coffee beans",
        description:
          "Order coffee beans that meet the company's quality standards",
        status: true,
      },
      {
        id: 2,
        title: "Take the coffee beans to the coffee shop",
        description:
          "Take the coffee beans to the coffee shop in a company car",
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
        "$2a$10$BYpMbfJsPSOXVptfwCvau..UaLHkJgEE/LJxoYcineNRNOrc3sN3O",
      permissions: ["get_team", "create_worker", "get_all_tasks"],
      role: "owner",
      businessId: "build-the-house",
      themeSetting: {
        theme: "standart",
        mod: "dark",
      },
    },
    team: [
      {
        id: "1",
        username: "workerA",
        passwordHash:
          "$2a$10$BYpMbfJsPSOXVptfwCvau..UaLHkJgEE/LJxoYcineNRNOrc3sN3O",
        permissions: ["get_team", "get_all_tasks"],
        role: "admin",
        businessId: "build-the-house",
        themeSetting: {
          theme: "green",
          mod: "dark",
        },
      },
      {
        id: "2",
        username: "workerB",
        passwordHash:
          "$2a$10$BYpMbfJsPSOXVptfwCvau..UaLHkJgEE/LJxoYcineNRNOrc3sN3O",
        permissions: ["get_all_tasks"],
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
        title: "Count the number of completed projects",
        description: "Calculate the number of completed projects per quarter",
        status: true,
      },
      {
        id: 2,
        title: "Send the report to the accountant",
        description:
          "Send a report on completed projects to a full-time accountant",
        status: false,
      },
      {
        id: 3,
        title: "Process new orders",
        description: "Process new orders received from the site",
        status: false,
      },
    ],
  },
];
