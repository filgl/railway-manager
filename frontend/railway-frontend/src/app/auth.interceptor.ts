import { HttpInterceptorFn } from "@angular/common/http";

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const token: string | null = localStorage.getItem("token");

  if (token) {
    const clonedReq = req.clone({
      setHeaders: {
        Authorization: `Token ${token}`,
      },
    });
    return next(clonedReq);
  }

  return next(req);
};
