// layouts

import Reactor from "@/layouts/Reactor.vue";

// views for Admin layout

import Dashboard from "@/views/admin/Dashboard.vue";
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
        component: Dashboard,
      },
      {
        path: "/reactor/settings",
        component: Settings,
      }
		]
	}
];

export const reactorRoutes = routes;