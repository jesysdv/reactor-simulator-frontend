// layouts

import Reactor from "@/layouts/Reactor.vue";

// views for Admin layout
import Settings from "@/views/reactor/Settings.vue";

// routes

const routes = [
  {
    path: "/",
    redirect: "/reactor",
  },
	{
    path: "/reactor",
    redirect: "/reactor/simulate",
    component: Reactor,
    children: [
      {
        path: "/reactor/simulate",
        component: Settings,
      }
		]
	}
];

export const reactorRoutes = routes;