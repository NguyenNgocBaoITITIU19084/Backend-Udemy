import { Router } from "express";

export function getEndPoint(router: Router):  { path: string; method: string; }[] {
  const availableRoutes:  { path: string; method: string; }[] = router.stack
    .map(layer => {
      if (layer.route) {
        return {
            path: layer.route?.path,
            method: layer.route?.stack[0].method,
        };
      }
    })
    .filter(item => item !== undefined);
  return availableRoutes
}