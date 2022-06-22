import { Request } from "express-serve-static-core";

export type AlignmentRequest = Request & { requestId: string };
