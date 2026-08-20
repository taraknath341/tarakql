function tarakSend(json) {
   if (this.tarakKey === undefined) {
      return this.json(json);
   }
   if (this.tarakKey.includes(",")) {
      const responseArray = [];
      const tarakKeys = this.tarakKey.split(",");
      tarakKeys.forEach((tarakKey) => {
         tarakKey = tarakKey.trim();
         if (!tarakKey.includes(".")) {
            responseArray.push(json[tarakKey]);
         } else {
            tarakKey = tarakKey.split(".");
            let requiredData = json;
            try {
               for (let c = 0; c < tarakKey.length; c++) {
                  requiredData = requiredData[tarakKey[c]];
               }
            } catch (err) {
               requiredData = null;
            }
            responseArray.push(requiredData);
         }
      });
      this.json(responseArray);
      return;
   }
   if (!this.tarakKey.includes(".")) {
      let selectedDataValue = json[this.tarakKey.trim()];
      this.json([selectedDataValue]);
      return;
   }
   const tarakKey = this.tarakKey.split(".");
   let requiredData = json;
   try {
      for (let c = 0; c < tarakKey.length; c++) {
         requiredData = requiredData[tarakKey[c].trim()];
      }
   } catch (err) {
      requiredData = null;
   }
   this.json([requiredData]);
}

export function tarakParser(req, res, next) {
   res.tarakKey = req.query.tarakQL;
   res.tarakSend = tarakSend;
   next();
}
