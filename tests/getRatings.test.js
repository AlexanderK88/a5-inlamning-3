// import { describe, test, expect } from "@jest/globals;";
import getRecentRatings from "./getRecentRatings";

describe("getAverageRatings()", () => {
  test("includes a review with 5 rating", async () => {
    const data = await getRecentRatings({
      loadAllRatings: async () => {
        [
          {
            id: 801,
            attributes: {
              rating: 1,
              author: "Leif-Gunnel",
              movie: {
                data: {
                  id: 801,
                  attributes: {
                    title: "Pulp Fiction",
                  },
                },
              },
            },
          },
          {
            id: 802,
            attributes: {
              rating: 5,
              author: "Leif",
              movie: {
                data: {
                  id: 802,
                  attributes: {
                    title: "Pulp Fiction",
                  },
                },
              },
            },
          },
          {
            id: 803,
            attributes: {
              rating: 4,
              author: "Lasse",
              movie: {
                data: {
                  id: 803,
                  attributes: {
                    title: "Pulp Fiction",
                  },
                },
              },
            },
          },
          {
            id: 804,
            attributes: {
              rating: 3,
              author: "Lillen",
              movie: {
                data: {
                  id: 804,
                  attributes: {
                    title: "Pulp Fiction",
                  },
                },
              },
            },
          },
          {
            id: 805,
            attributes: {
              rating: 4,
              author: "Liftar-Johnny",
              movie: {
                data: {
                  id: 805,
                  attributes: {
                    title: "Pulp Fiction",
                  },
                },
              },
            },
          },
          {
            id: 806,
            attributes: {
              rating: 5,
              author: "Håkan",
              movie: {
                data: {
                  id: 806,
                  attributes: {
                    title: "Encanto",
                  },
                },
              },
            },
          },
          {
            id: 807,
            attributes: {
              rating: 2,
              author: "Henke",
              movie: {
                data: {
                  id: 807,
                  attributes: {
                    title: "Encanto",
                  },
                },
              },
            },
          },
          {
            id: 808,
            attributes: {
              rating: 1,
              author: "Skön-Mats",
              movie: {
                data: {
                  id: 808,
                  attributes: {
                    title: "Encanto",
                  },
                },
              },
            },
          },
          {
            id: 809,
            attributes: {
              rating: 4,
              author: "Fiskar-Bengt",
              movie: {
                data: {
                  id: 809,
                  attributes: {
                    title: "Encanto",
                  },
                },
              },
            },
          },
          {
            id: 810,
            attributes: {
              rating: 2,
              author: "Johan",
              movie: {
                data: {
                  id: 810,
                  attributes: {
                    title: "Fire Walk With Me",
                  },
                },
              },
            },
          },
          {
            id: 811,
            attributes: {
              rating: 5,
              author: "Mange",
              movie: {
                data: {
                  id: 801,
                  attributes: {
                    title: "Isle of dogs",
                  },
                },
              },
            },
          },
          {
            id: 812,
            attributes: {
              rating: 4,
              author: "Anders",
              movie: {
                data: {
                  id: 812,
                  attributes: {
                    title: "Isle of dogs",
                  },
                },
              },
            },
          },
          {
            id: 813,
            attributes: {
              rating: 5,
              author: "Sport-Leffe",
              movie: {
                data: {
                  id: 813,
                  attributes: {
                    title: "Isle of dogs",
                  },
                },
              },
            },
          },
          {
            id: 814,
            attributes: {
              rating: 3,
              author: "Kjell",
              movie: {
                data: {
                  id: 814,
                  attributes: {
                    title: "Isle of dogs",
                  },
                },
              },
            },
          },
          {
            id: 815,
            attributes: {
              rating: 3,
              author: "Smet-Mats",
              movie: {
                data: {
                  id: 815,
                  attributes: {
                    title: "Min granne Totoro",
                  },
                },
              },
            },
          },
          {
            id: 816,
            attributes: {
              rating: 3,
              author: "Linda",
              movie: {
                data: {
                  id: 816,
                  attributes: {
                    title: "Min granne Totoro",
                  },
                },
              },
            },
          },
          {
            id: 817,
            attributes: {
              rating: 4,
              author: "Linnea",
              movie: {
                data: {
                  id: 817,
                  attributes: {
                    title: "The Shawshank Redemption",
                  },
                },
              },
            },
          },
          {
            id: 818,
            attributes: {
              rating: 4,
              author: "Martin",
              movie: {
                data: {
                  id: 818,
                  attributes: {
                    title: "The Shawshank Redemption",
                  },
                },
              },
            },
          },
          {
            id: 819,
            attributes: {
              rating: 5,
              author: "Michael",
              movie: {
                data: {
                  id: 819,
                  attributes: {
                    title: "The Shawshank Redemption",
                  },
                },
              },
            },
          },
          {
            id: 820,
            attributes: {
              rating: 5,
              author: "Sture",
              movie: {
                data: {
                  id: 820,
                  attributes: {
                    title: "The Shawshank Redemption",
                  },
                },
              },
            },
          },
          {
            id: 821,
            attributes: {
              rating: 4,
              author: "Kurt",
              movie: {
                data: {
                  id: 821,
                  attributes: {
                    title: "The Shawshank Redemption",
                  },
                },
              },
            },
          },
          {
            id: 822,
            attributes: {
              rating: 4,
              author: "Bengan",
              movie: {
                data: {
                  id: 822,
                  attributes: {
                    title: "The Shawshank Redemption",
                  },
                },
              },
            },
          },
          {
            id: 823,
            attributes: {
              rating: 5,
              author: "Låne-Lars",
              movie: {
                data: {
                  id: 823,
                  attributes: {
                    title: "The Shawshank Redemption",
                  },
                },
              },
            },
          },
          {
            id: 824,
            attributes: {
              rating: 2,
              author: "Markus",
              movie: {
                data: {
                  id: 824,
                  attributes: {
                    title: "The Shawshank Redemption",
                  },
                },
              },
            },
          },
        ];
      },
    });
  });
});
