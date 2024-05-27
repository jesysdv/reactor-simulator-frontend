// layouts

import Reactor from "@/layouts/Reactor.vue";

// views for Admin layout
import Settings from "@/views/reactor/Settings.vue";

// routes

const routes = [
	{
    path: "/reactor",
    redirect: "/reactor/dashboard",
    component: Reactor,
    children: [
      {
        path: "/reactor/dashboard",
        component: Settings,
      },
      {
        path: "/reactor/settings",
        component: Settings,
      }
		]
	}
];

export const reactorRoutes = routes;