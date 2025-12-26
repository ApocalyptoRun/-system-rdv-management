import { HttpInterceptorFn } from '@angular/common/http';

export const jwtInterceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem('access_token');
  // const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzY2NzM1NzY3LCJpYXQiOjE3NjY3MzIxNjcsImp0aSI6IjA2YWIxMTFjODZiMTRkMTk4NmUwNmVkZTM5YjBhODU2IiwidXNlcl9pZCI6IjIwIiwidXNlcm5hbWUiOiJzb3ciLCJyb2xlIjoiUEFUSUVOVCJ9.C9WwLWGstj5UnMBlWcqWbVohkGYIi43Tt16LX2NNkSQ"

  if (token) {
    const cloned = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
    return next(cloned);
  }

  return next(req);
};