import xss from "xss";

export function parser(request) {
  const id = request.body.id;
  const comment = xss(request.body.comment);
  const rating = request.body.rating;
  const author = xss(request.body.author);

  const data = {
    movie: id,
    comment: comment,
    rating: rating,
    author: author,
    createdAt: "2024-02-05T16:45:17.078Z",
    updatedAt: "2024-02-05T16:45:17.078Z",
    createdBy: author,
    updatedBy: author,
  };

  return data;
}
