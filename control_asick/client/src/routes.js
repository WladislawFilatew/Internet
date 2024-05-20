import Auth from "./pages/Auth";
import Mainer from "./pages/Mainer";
import Server from "./pages/Server";
import {MAINER_ROUTER, SERVER_ROUTER, LOGIN_ROUTER,
         REGISTRATION_ROUTER} from "./utils/consts"

export const authRoutes = [
    {
        patch: MAINER_ROUTER + '/:id',
        Component: Mainer
    },
    {
        patch: SERVER_ROUTER,
        Component: Server
    }
]

export const publicRoutes = [
    {
        patch: LOGIN_ROUTER,
        Component: Auth
    },
    {
        patch: REGISTRATION_ROUTER,
        Component: Auth
    }
]