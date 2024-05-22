// layouts

import Reactor from "@/layouts/Reactor.vue";

// views for Admin layout

import Dashboard from "@/views/admin/Dashboard.vue";

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
      }
		]
	}
];

export const reactorRoutes = routes;