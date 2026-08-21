import { Response } from "express";

declare module "express-serve-static-core" {
   interface Response {
      tarakKey: string | undefined;
      tarakSend(json: any): void;
   }
}

export function tarakParser(
   req: import("express").Request,
   res: import("express").Response,
   next: import("express").NextFunction,
): void;
