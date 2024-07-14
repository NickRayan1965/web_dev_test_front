export const bodyParser = ({ body }) => {
  Object.keys(body).map(key => {
    if (body[key] === '') body[key] = null;
  });
  return body;
};
