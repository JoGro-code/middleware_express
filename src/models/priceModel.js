import sql from "mssql";
import { dbConfig } from "../../config/config.js";

export const getPriceByArticleNo = async (
  customerID,
  mandantenID,
  articleNos
) => {
  const pool = await sql.connect(dbConfig);
  let prices = [];

  for (const articleNo of articleNos) {
    const result = await pool
      .request()
      .input("CustomerID", sql.Int, customerID)
      .input("MandantenID", sql.Int, mandantenID)
      .input("ArticleNo", sql.NVarChar, articleNo)
      .execute("get_prices"); // Angenommen, dies ist der Name Ihrer Stored Procedure

    // Hier nehmen wir an, dass die Stored Procedure relevante Preisdaten für jeden Artikel zurückgibt
    if (result.recordset.length > 0) {
      prices.push({
        articleNo,
        priceData: result.recordset[0], // Anpassung basierend auf der tatsächlichen Antwort Ihrer Stored Procedure
      });
    }
  }

  return prices;
};
