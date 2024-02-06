export function builder(attributes) {
  const body = {
    data: {
      comment: "mats test test test",
      rating: 2,
      author: "mats",
      verified: false,
      movie: "1",
      createdAt: date,
      updatedAt: date,
      createdBy: "string or id",
      updatedBy: "string or id",
      ...attributes,
    },
  };
  return body;
}
