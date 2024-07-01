import { Response } from 'express';

export function SuccessResponse(
  res: Response,
  data: any = {},
  code = 200,
  metadata: null | object = null,
  count?: number
) {
  const statusCode = code;
  res.status(statusCode);

  res.json({
    success: true,
    ...(metadata && { ...metadata }),
    statusCode,
    data,
    count: count !== undefined ? count : undefined,
  });
}
