import { getPriceByArticleNo } from "../models/priceModel.js";

export const getPrice = async (req, res) => {
  const { customerID, mandantenID, articleNos } = req.query;

  try {
    const articleNoArray = articleNos.split(","); // Annahme: articleNos kommt als kommaseparierte Liste
    const prices = await getPriceByArticleNo(
      customerID,
      mandantenID,
      articleNoArray
    );
    res.json(prices);
  } catch (error) {
    console.error("Fehler beim Abrufen der Preisinformationen:", error);
    res
      .status(500)
      .send("Interner Serverfehler beim Abrufen der Preisinformationen.");
  }
};
