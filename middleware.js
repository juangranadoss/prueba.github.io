import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

// Define las rutas permitidas para cada rol
const roleRoutes = {
  Admin: ["/products", "/invoices", "/ingresos", "/ajustes", "/", "/ventas"],
  mantenimiento: ["/ingreso", "/productos", "/"],
  Nuevo: ["/", "/products"],
};
export async function middleware(req) {
  // Obtén la sesión del usuario
  // console.log("🚀 ~ middleware ~ req:", req)
  const token = await getToken({ req });
  console.log("🚀 ~ middleware ~ token:", token)

  if (!token) {
    // Si no hay token, redirigir a la página de login
    return NextResponse.redirect(new URL('/auth/login', req.url));
  }

  const userRole = token?.role;
  const pathname = req.nextUrl.pathname;

  const allowedRoutes = roleRoutes[userRole] || [];
  console.log("🚀 ~ middleware ~ allowedRoutes:", allowedRoutes)

  const isAllowed = allowedRoutes.some(route => pathname === route || pathname.startsWith(route + '/'));

  if (!isAllowed) {
    return NextResponse.redirect(new URL('/403', req.url)); // Redirige a una página de acceso denegado
  }

  // Si la ruta está permitida, continua con la solicitud
  return NextResponse.next();
}

export const config = {
  matcher: ["/products/:path*", "/invoices/:path*"] // Lista de rutas protegidas
};
