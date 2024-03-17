export default function errorMiddleware(err, req, res, next) {
  console.error("Ein Fehler ist aufgetreten:", err.message);

  // HTTP-Statuscode setzen. Wenn im Error ein Statuscode definiert ist, verwenden wir diesen, sonst 500
  const statusCode = err.statusCode || 500;

  res.status(statusCode).json({
    message: err.message || "Ein unerwarteter Fehler ist aufgetreten.",
  });
}
