const path = require(`path`);
const { promises : fs } = require("fs");

const authorize = (req, res, next) => {
  const { admin } = req.query;
  const method = req.method;
  const url = req.originalUrl;
  const adminResponse = async () => {
    let adminSesion;
    if(!admin) {
      const sesionFind = await fs.readFile(path.resolve(__dirname, `../data/sesion.txt`), "utf-8");
      const sesionFound = JSON.parse(sesionFind);
      adminSesion = sesionFound.admin;
    } else adminSesion = admin;
    if(adminSesion == "false") {
      if(method === "POST" || method === "PUT" || method === "DELETE") {
        return res.status(403).json({ success: false, error: `The route ${url} with method ${method} was not authorized` });
      } else return next();
    } else if(adminSesion == "true") return next();
  }
  adminResponse();
}

module.exports = authorize;
