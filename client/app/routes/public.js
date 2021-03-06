import HomePage from '../containers/HomePage';
import LoginAdminPage from '../containers/LoginAdminPage/Loadable';
import LoginUserPage from '../containers/LoginUserPage/Loadable';
import ForgotPasswordUserPage from '../containers/ForgotPasswordUserPage/Loadable';
import SignupUserPage from '../containers/SignupUserPage/Loadable';
import FaqPage from '../containers/FAQPage/Loadable';
// import BlogListPage from '../containers/BlogList/Loadable';
// import CategoryListingPage from '../containers/CategoryListingPage/Loadable';
// import CategoryDetailPage from '../containers/CategoryDetailPage/Loadable';
// import BlogDetailPage from '../containers/Blog/Pages/Loadable';
import ContactUsPage from '../containers/ContactUs/Loadable';
import SubscribePage from '../containers/SubscriberPage/Loadable';
import AboutUsPage from '../containers/AboutUsPage/Loadable';
// import BlogListDatePage from '../containers/BlogList/BlogDate';
import BlogPages from '../containers/Blog';

const publicRoutes = [
  {
    exact: true,
    path: '/',
    component: HomePage,
  },
  {
    exact: true,
    path: '/login-admin',
    component: LoginAdminPage,
  },
  {
    exact: true,
    path: '/login-user',
    component: LoginUserPage,
  },
  {
    exact: true,
    path: '/signup-user',
    component: SignupUserPage,
  },
  {
    exact: true,
    path: '/forgot-password-user',
    component: ForgotPasswordUserPage,
  },
  {
    exact: true,
    path: '/faq',
    component: FaqPage,
  },
  {
    exact: false,
    path: '/blog',
    component: BlogPages,
  },
  {
    exact: true,
    path: '/subscribe',
    component: SubscribePage,
  },
  {
    exact: true,
    path: '/contact-us',
    component: ContactUsPage,
  },
  {
    exact: true,
    path: '/about-us',
    component: AboutUsPage,
  },
];

export default publicRoutes;
