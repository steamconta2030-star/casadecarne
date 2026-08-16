/* eslint-disable */
// Árvore mínima de rotas. O plugin do TanStack Router regenera este arquivo no dev/build.
import { Route as rootRoute } from './routes/__root'
import { Route as IndexRouteImport } from './routes/index'
import { Route as PdvRouteImport } from './routes/pdv'
import { Route as ProdutosRouteImport } from './routes/produtos'

const IndexRoute = IndexRouteImport.update({ id: '/', path: '/', getParentRoute: () => rootRoute } as any)
const PdvRoute = PdvRouteImport.update({ id: '/pdv', path: '/pdv', getParentRoute: () => rootRoute } as any)
const ProdutosRoute = ProdutosRouteImport.update({ id: '/produtos', path: '/produtos', getParentRoute: () => rootRoute } as any)

export const routeTree = rootRoute._addFileChildren({
  IndexRoute,
  PdvRoute,
  ProdutosRoute,
} as any)
