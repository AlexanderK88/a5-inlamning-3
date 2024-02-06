export function builder(attributes) {
  const date = new Date().toISOString();
  const body = {
    data: {
      comment: "mats test test test",
      rating: 2,
      author: "mats",
      verified: false,
      movie: "1",
      createdAt: "2024-02-05T17:38:47.770Z",
      updatedAt: "2024-02-05T17:38:47.770Z",
      createdBy: "string or id",
      updatedBy: "string or id",
      ...attributes,
    },
  };
  return body;
}
