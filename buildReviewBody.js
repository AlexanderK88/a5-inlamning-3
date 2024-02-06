export function builder(attributes) {
  const body = {
    data: {
      comment: "string",
      rating: 0,
      author: "string",
      movie: "string or id",
      ...attributes,
    },
  };
  return body;
}
